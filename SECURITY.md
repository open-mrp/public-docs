# Security policy

## Reporting a vulnerability

Please **do not** open a public GitHub issue for security problems.

Report vulnerabilities privately to **security@augno.com**, or through [GitHub private vulnerability reporting](https://github.com/open-mrp/public-docs/security/advisories/new).

Include:

- What you found and where (URL, file, or endpoint)
- Steps to reproduce
- What an attacker could do with it

We'll acknowledge your report within 3 business days and keep you updated as we investigate. Please give us a reasonable window to ship a fix before disclosing publicly.

## Scope

This repository is the source of the OpenMRP documentation site at [docs.openmrp.ai](https://docs.openmrp.ai). In scope:

- Vulnerabilities in this site's code (XSS, injection, dependency issues)
- Documentation that instructs readers to do something insecure
- Credentials or internal information accidentally committed here

Vulnerabilities in the OpenMRP API or application itself are also welcome at the same address — they're just not tracked in this repository.

## Please don't

- Run automated scanners against production infrastructure
- Access, modify, or exfiltrate data belonging to other OpenMRP accounts
- Perform denial-of-service testing

## A note on secrets in the docs

Documentation examples use placeholder credentials such as `mrp_sk_test_AM4Bjfakeapikey_fakeapikeyUWNXD`. These are not real keys. If you believe you've found a **real** credential in this repository or on the docs site, report it privately using the process above.
