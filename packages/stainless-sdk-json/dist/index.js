import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import Worker from "web-worker";
import fs from "fs/promises";
import pathutils from "path";
//#region spec/languages.ts
const SpecLanguages = [
	"http",
	"node",
	"python",
	"go",
	"typescript",
	"terraform",
	"ruby",
	"java",
	"kotlin",
	"csharp",
	"php",
	"cli"
];
//#endregion
//#region spec/worker.ts
const __dirname = dirname(fileURLToPath(import.meta.url));
const workerPath = resolve(__dirname, "..", "vendor", "preview.worker.docs.js");
function runJob({ type, signal, data }) {
	const stainlessWorker = new Worker(workerPath, {
		type: "module",
		name: "Preview server"
	});
	return new Promise((resolve, reject) => {
		stainlessWorker.addEventListener("error", (e) => {
			e.preventDefault();
			reject(new Error(e.message || "Worker error"));
		});
		stainlessWorker.addEventListener("messageerror", () => {
			reject(/* @__PURE__ */ new Error("Worker message error"));
		});
		stainlessWorker.addEventListener("message", (event) => {
			const payload = event.data;
			if (payload.type === `${type}_done`) resolve(payload);
			else if (payload.type === `${type}_failed`) {
				const { name, message: errorMessage } = payload;
				const err = new Error(errorMessage);
				if (name) err.name = name;
				reject(err);
			}
		});
		if (signal) signal.onabort = () => reject(/* @__PURE__ */ new Error("aborted"));
		if (signal?.aborted) reject(/* @__PURE__ */ new Error("aborted"));
		stainlessWorker.postMessage({
			...data,
			type
		});
	}).finally(() => {
		stainlessWorker.terminate();
	});
}
async function parseInputs({ oas, config }) {
	return await runJob({
		type: "parse",
		data: {
			oas,
			config
		}
	});
}
async function transformOAS({ oas, config }) {
	return (await runJob({
		type: "transform",
		data: {
			oas,
			config
		}
	})).transformedOAS;
}
async function createSDKJSON({ oas, config, languages, projectName }) {
	const templatePath = resolve(__dirname, "../vendor/templates");
	const readmeLoader = await Promise.all(SpecLanguages.map(async (language) => {
		const mdfile = pathutils.join(templatePath, `${language}.md`);
		try {
			return [language, (await fs.readFile(mdfile)).toString()];
		} catch {
			return [language, null];
		}
	}));
	return (await runJob({
		type: "preview",
		data: {
			oas,
			config,
			languages,
			transform: false,
			projectName,
			readmeTemplates: Object.fromEntries(readmeLoader)
		}
	})).spec;
}
//#endregion
//#region spec/generateSpec.ts
const previewWorkerCode = readFileSync(resolve(dirname(fileURLToPath(import.meta.url)), "..", "vendor", "preview.worker.docs.js"), "utf8");
function getLanguagesFromStainlessConfig(config) {
	if (config.docs?.languages) return config.docs.languages;
	return Object.entries(config.targets).filter(([name, target]) => {
		if (!SpecLanguages.includes(name)) return false;
		if (target.skip) return false;
		return true;
	}).map(([name]) => name);
}
function applyLanguageOverrides(initialLanguages, languageOverrides) {
	if (!languageOverrides) return initialLanguages;
	if (languageOverrides.mode === "exclude") return initialLanguages.filter((language) => !languageOverrides.list.includes(language));
	return languageOverrides.list;
}
async function generateSpecFromStrings({ oasStr, configStr, stainlessProject, languageOverrides, versionInfo }) {
	const { oas, config } = await parseInputs({
		oas: oasStr,
		config: configStr
	});
	const transformedOAS = await transformOAS({
		oas,
		config
	});
	let languagesToGenerate = getLanguagesFromStainlessConfig(config);
	if (!languagesToGenerate.includes("http")) languagesToGenerate.push("http");
	languagesToGenerate = applyLanguageOverrides(languagesToGenerate, languageOverrides);
	const sdkJson = await createSDKJSON({
		oas: transformedOAS,
		config,
		languages: languagesToGenerate,
		projectName: stainlessProject
	});
	let languages = sdkJson.docs?.languages;
	if (!languages) throw new Error(`SDKJSON created without any languages`);
	languages = languages.filter((language) => languagesToGenerate.includes(language));
	if (versionInfo) for (const [lang, version] of Object.entries(versionInfo)) {
		const meta = sdkJson.metadata[lang];
		if (meta?.install && meta?.version) meta.install = meta.install.replace(meta.version, version);
		if (meta?.version) meta.version = version;
	}
	return {
		sdkJson,
		languages
	};
}
//#endregion
export { generateSpecFromStrings, previewWorkerCode };
