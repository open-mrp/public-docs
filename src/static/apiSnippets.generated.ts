// THIS FILE IS AUTO-GENERATED. DO NOT EDIT DIRECTLY.
// Run 'bun run scripts/generate-sdk-snippets.ts' (via build:docs) to regenerate.

export type SdkLanguage = 'typescript' | 'python' | 'go' | 'curl';

export type SdkSnippetHighlightLanguage = 'typescript' | 'bash' | 'python' | 'go';

const HIGHLIGHT_MAP: Record<SdkLanguage, SdkSnippetHighlightLanguage> = {
    typescript: 'typescript',
    curl: 'bash',
    python: 'python',
    go: 'go',
};

/**
 * Snippets keyed by OpenAPI operationId (matches EndpointData.operationId).
 * Values are normalized at generation time for ApiKeyProvider placeholders.
 */
const RAW_SNIPPETS: Record<string, Partial<Record<SdkLanguage, string>>> = {
    "list-api-keys": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.listAPIKeys();\n\nconsole.log(response.data);",
        "curl": "curl API_HOST/v1/auth/api-keys \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.list_api_keys()\nprint(response.data)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.ListAPIKeys(context.TODO(), augno.AugnoPublicAPIListAPIKeysParams{\n\n  })\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.Data)\n}\n"
    },
    "create-api-key": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.createAPIKey({\n  name: 'Production API Key',\n  role_id: 'rl_01gf7a8200er3ar3pkfrb6kk29',\n});\n\nconsole.log(response.api_key_info);",
        "curl": "curl API_HOST/v1/auth/api-keys \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\" \\\n    -d '{\n          \"name\": \"Production API Key\",\n          \"role_id\": \"rl_01gf7a8200er3ar3pkfrb6kk29\"\n        }'",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.create_api_key(\n    name=\"Production API Key\",\n    role_id=\"rl_01gf7a8200er3ar3pkfrb6kk29\",\n)\nprint(response.api_key_info)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.NewAPIKey(context.TODO(), augno.AugnoPublicAPINewAPIKeyParams{\n    Name: augno.F(\"Production API Key\"),\n    RoleID: augno.F(\"rl_01gf7a8200er3ar3pkfrb6kk29\"),\n  })\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.APIKeyInfo)\n}\n"
    },
    "retrieve-api-key": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.retrieveAPIKey('apke_01jm4r6700e3kxb9w2nqh7g5fp');\n\nconsole.log(response.id);",
        "curl": "curl API_HOST/v1/auth/api-keys/$ID \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.retrieve_api_key(\n    id=\"apke_01jm4r6700e3kxb9w2nqh7g5fp\",\n)\nprint(response.id)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.GetAPIKey(\n    context.TODO(),\n    \"apke_01jm4r6700e3kxb9w2nqh7g5fp\",\n    augno.AugnoPublicAPIGetAPIKeyParams{\n\n    },\n  )\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.ID)\n}\n"
    },
    "revoke-api-key": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.revokeAPIKey('apke_01jm4r6700e3kxb9w2nqh7g5fp');\n\nconsole.log(response);",
        "curl": "curl API_HOST/v1/auth/api-keys/$ID \\\n    -X DELETE \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.revoke_api_key(\n    \"apke_01jm4r6700e3kxb9w2nqh7g5fp\",\n)\nprint(response)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.RevokeAPIKey(context.TODO(), \"apke_01jm4r6700e3kxb9w2nqh7g5fp\")\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response)\n}\n"
    },
    "rotate-api-key": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.rotateAPIKey('apke_01jm4r6700e3kxb9w2nqh7g5fp', {\n  expires_at: '2026-12-31T23:59:59Z',\n});\n\nconsole.log(response.api_key_info);",
        "curl": "curl API_HOST/v1/auth/api-keys/$ID/actions/rotate \\\n    -X POST \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from datetime import datetime\nfrom augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.rotate_api_key(\n    id=\"apke_01jm4r6700e3kxb9w2nqh7g5fp\",\n    expires_at=datetime.fromisoformat(\"2026-12-31T23:59:59\"),\n)\nprint(response.api_key_info)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n  \"time\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.RotateAPIKey(\n    context.TODO(),\n    \"apke_01jm4r6700e3kxb9w2nqh7g5fp\",\n    augno.AugnoPublicAPIRotateAPIKeyParams{\n      ExpiresAt: augno.F(time.Now()),\n    },\n  )\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.APIKeyInfo)\n}\n"
    },
    "list-item-categories": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.listItemCategories();\n\nconsole.log(response.data);",
        "curl": "curl API_HOST/v1/catalog/item-categories \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.list_item_categories()\nprint(response.data)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.ListItemCategories(context.TODO(), augno.AugnoPublicAPIListItemCategoriesParams{\n\n  })\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.Data)\n}\n"
    },
    "create-item-category": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.createItemCategory({\n  name: 'Electronics',\n  type: 'material_category',\n  unit_group_id: 'ug_01jm4r6700f8nwq3v5hx2d9ktp',\n});\n\nconsole.log(response.id);",
        "curl": "curl API_HOST/v1/catalog/item-categories \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\" \\\n    -d '{\n          \"name\": \"Electronics\",\n          \"type\": \"material_category\",\n          \"unit_group_id\": \"ug_01jm4r6700f8nwq3v5hx2d9ktp\"\n        }'",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.create_item_category(\n    name=\"Electronics\",\n    type=\"material_category\",\n    unit_group_id=\"ug_01jm4r6700f8nwq3v5hx2d9ktp\",\n)\nprint(response.id)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.NewItemCategory(context.TODO(), augno.AugnoPublicAPINewItemCategoryParams{\n    Name: augno.F(\"Electronics\"),\n    Type: augno.F(augno.AugnoPublicAPINewItemCategoryParamsTypeMaterialCategory),\n    UnitGroupID: augno.F(\"ug_01jm4r6700f8nwq3v5hx2d9ktp\"),\n  })\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.ID)\n}\n"
    },
    "retrieve-item-category": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.retrieveItemCategory('ic_01jm4r6700f8nwq3v5hx2d9ktp');\n\nconsole.log(response.id);",
        "curl": "curl API_HOST/v1/catalog/item-categories/$ID \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.retrieve_item_category(\n    id=\"ic_01jm4r6700f8nwq3v5hx2d9ktp\",\n)\nprint(response.id)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.GetItemCategory(\n    context.TODO(),\n    \"ic_01jm4r6700f8nwq3v5hx2d9ktp\",\n    augno.AugnoPublicAPIGetItemCategoryParams{\n\n    },\n  )\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.ID)\n}\n"
    },
    "update-item-category": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.updateItemCategory('ic_01jm4r6700f8nwq3v5hx2d9ktp', {\n  name: 'Electronic Components',\n});\n\nconsole.log(response.id);",
        "curl": "curl API_HOST/v1/catalog/item-categories/$ID \\\n    -X PATCH \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.update_item_category(\n    id=\"ic_01jm4r6700f8nwq3v5hx2d9ktp\",\n    name=\"Electronic Components\",\n)\nprint(response.id)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.UpdateItemCategory(\n    context.TODO(),\n    \"ic_01jm4r6700f8nwq3v5hx2d9ktp\",\n    augno.AugnoPublicAPIUpdateItemCategoryParams{\n      Name: augno.F(\"Electronic Components\"),\n    },\n  )\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.ID)\n}\n"
    },
    "delete-item-category": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.deleteItemCategory('ic_01jm4r6700f8nwq3v5hx2d9ktp');\n\nconsole.log(response);",
        "curl": "curl API_HOST/v1/catalog/item-categories/$ID \\\n    -X DELETE \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.delete_item_category(\n    \"ic_01jm4r6700f8nwq3v5hx2d9ktp\",\n)\nprint(response)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.DeleteItemCategory(context.TODO(), \"ic_01jm4r6700f8nwq3v5hx2d9ktp\")\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response)\n}\n"
    },
    "add-item-category-property": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.addItemCategoryProperty(\n  'pp_01jm4r6700f8nwq3v5hx2d9ktp',\n  { id: 'ic_01jm4r6700f8nwq3v5hx2d9ktp' },\n);\n\nconsole.log(response);",
        "curl": "curl API_HOST/v1/catalog/item-categories/$ID/properties/$PROPERTY_ID \\\n    -X PUT \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.add_item_category_property(\n    property_id=\"pp_01jm4r6700f8nwq3v5hx2d9ktp\",\n    id=\"ic_01jm4r6700f8nwq3v5hx2d9ktp\",\n)\nprint(response)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.AddItemCategoryProperty(\n    context.TODO(),\n    \"ic_01jm4r6700f8nwq3v5hx2d9ktp\",\n    \"pp_01jm4r6700f8nwq3v5hx2d9ktp\",\n  )\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response)\n}\n"
    },
    "remove-item-category-property": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.removeItemCategoryProperty(\n  'pp_01jm4r6700f8nwq3v5hx2d9ktp',\n  { id: 'ic_01jm4r6700f8nwq3v5hx2d9ktp' },\n);\n\nconsole.log(response);",
        "curl": "curl API_HOST/v1/catalog/item-categories/$ID/properties/$PROPERTY_ID \\\n    -X DELETE \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.remove_item_category_property(\n    property_id=\"pp_01jm4r6700f8nwq3v5hx2d9ktp\",\n    id=\"ic_01jm4r6700f8nwq3v5hx2d9ktp\",\n)\nprint(response)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.RemoveItemCategoryProperty(\n    context.TODO(),\n    \"ic_01jm4r6700f8nwq3v5hx2d9ktp\",\n    \"pp_01jm4r6700f8nwq3v5hx2d9ktp\",\n  )\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response)\n}\n"
    },
    "change-item-category-unit-group": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.changeItemCategoryUnitGroup(\n  'ug_01jm4r6700f8nwq3v5hx2d9ktp',\n  { id: 'ic_01jm4r6700f8nwq3v5hx2d9ktp' },\n);\n\nconsole.log(response);",
        "curl": "curl API_HOST/v1/catalog/item-categories/$ID/unit-groups/$UNIT_GROUP_ID \\\n    -X PUT \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.change_item_category_unit_group(\n    unit_group_id=\"ug_01jm4r6700f8nwq3v5hx2d9ktp\",\n    id=\"ic_01jm4r6700f8nwq3v5hx2d9ktp\",\n)\nprint(response)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.ChangeItemCategoryUnitGroup(\n    context.TODO(),\n    \"ic_01jm4r6700f8nwq3v5hx2d9ktp\",\n    \"ug_01jm4r6700f8nwq3v5hx2d9ktp\",\n  )\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response)\n}\n"
    },
    "list-items": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.listItems();\n\nconsole.log(response.data);",
        "curl": "curl API_HOST/v1/catalog/items \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.list_items()\nprint(response.data)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.ListItems(context.TODO(), augno.AugnoPublicAPIListItemsParams{\n\n  })\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.Data)\n}\n"
    },
    "retrieve-item": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.retrieveItem('it_01jm4r6700f8nwq3v5hx2d9ktp');\n\nconsole.log(response.id);",
        "curl": "curl API_HOST/v1/catalog/items/$ID \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.retrieve_item(\n    id=\"it_01jm4r6700f8nwq3v5hx2d9ktp\",\n)\nprint(response.id)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.GetItem(\n    context.TODO(),\n    \"it_01jm4r6700f8nwq3v5hx2d9ktp\",\n    augno.AugnoPublicAPIGetItemParams{\n\n    },\n  )\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.ID)\n}\n"
    },
    "add-item-attribute": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.addItemAttribute('at_01jm4r6700f8nwq3v5hx2d9ktp', {\n  id: 'it_01jm4r6700f8nwq3v5hx2d9ktp',\n});\n\nconsole.log(response.id);",
        "curl": "curl API_HOST/v1/catalog/items/$ID/attributes/$ATTRIBUTE_ID \\\n    -X PUT \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.add_item_attribute(\n    attribute_id=\"at_01jm4r6700f8nwq3v5hx2d9ktp\",\n    id=\"it_01jm4r6700f8nwq3v5hx2d9ktp\",\n)\nprint(response.id)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.AddItemAttribute(\n    context.TODO(),\n    \"it_01jm4r6700f8nwq3v5hx2d9ktp\",\n    \"at_01jm4r6700f8nwq3v5hx2d9ktp\",\n    augno.AugnoPublicAPIAddItemAttributeParams{\n\n    },\n  )\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.ID)\n}\n"
    },
    "remove-item-attribute": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.removeItemAttribute('at_01jm4r6700f8nwq3v5hx2d9ktp', {\n  id: 'it_01jm4r6700f8nwq3v5hx2d9ktp',\n});\n\nconsole.log(response.id);",
        "curl": "curl API_HOST/v1/catalog/items/$ID/attributes/$ATTRIBUTE_ID \\\n    -X DELETE \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.remove_item_attribute(\n    attribute_id=\"at_01jm4r6700f8nwq3v5hx2d9ktp\",\n    id=\"it_01jm4r6700f8nwq3v5hx2d9ktp\",\n)\nprint(response.id)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.RemoveItemAttribute(\n    context.TODO(),\n    \"it_01jm4r6700f8nwq3v5hx2d9ktp\",\n    \"at_01jm4r6700f8nwq3v5hx2d9ktp\",\n    augno.AugnoPublicAPIRemoveItemAttributeParams{\n\n    },\n  )\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.ID)\n}\n"
    },
    "change-item-category": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.changeItemCategory('ic_01jm4r6700f8nwq3v5hx2d9ktp', {\n  id: 'it_01jm4r6700f8nwq3v5hx2d9ktp',\n});\n\nconsole.log(response.id);",
        "curl": "curl API_HOST/v1/catalog/items/$ID/category/$CATEGORY_ID \\\n    -X PUT \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.change_item_category(\n    category_id=\"ic_01jm4r6700f8nwq3v5hx2d9ktp\",\n    id=\"it_01jm4r6700f8nwq3v5hx2d9ktp\",\n)\nprint(response.id)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.ChangeItemCategory(\n    context.TODO(),\n    \"it_01jm4r6700f8nwq3v5hx2d9ktp\",\n    \"ic_01jm4r6700f8nwq3v5hx2d9ktp\",\n    augno.AugnoPublicAPIChangeItemCategoryParams{\n\n    },\n  )\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.ID)\n}\n"
    },
    "retrieve-item-inventory": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.retrieveItemInventory('it_01jm4r6700f8nwq3v5hx2d9ktp');\n\nconsole.log(response.available_to_promise);",
        "curl": "curl API_HOST/v1/catalog/items/$ID/inventory \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.retrieve_item_inventory(\n    id=\"it_01jm4r6700f8nwq3v5hx2d9ktp\",\n)\nprint(response.available_to_promise)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.GetItemInventory(\n    context.TODO(),\n    \"it_01jm4r6700f8nwq3v5hx2d9ktp\",\n    augno.AugnoPublicAPIGetItemInventoryParams{\n\n    },\n  )\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.AvailableToPromise)\n}\n"
    },
    "list-materials": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.listMaterials();\n\nconsole.log(response.data);",
        "curl": "curl API_HOST/v1/catalog/materials \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.list_materials()\nprint(response.data)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.ListMaterials(context.TODO(), augno.AugnoPublicAPIListMaterialsParams{\n\n  })\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.Data)\n}\n"
    },
    "create-material": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.createMaterial({\n  category_id: 'ic_01jm4r6700f8nwq3v5hx2d9ktp',\n  sku: 'MAT-001',\n});\n\nconsole.log(response.id);",
        "curl": "curl API_HOST/v1/catalog/materials \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\" \\\n    -d '{\n          \"category_id\": \"ic_01jm4r6700f8nwq3v5hx2d9ktp\",\n          \"sku\": \"MAT-001\"\n        }'",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.create_material(\n    category_id=\"ic_01jm4r6700f8nwq3v5hx2d9ktp\",\n    sku=\"MAT-001\",\n)\nprint(response.id)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.NewMaterial(context.TODO(), augno.AugnoPublicAPINewMaterialParams{\n    CategoryID: augno.F(\"ic_01jm4r6700f8nwq3v5hx2d9ktp\"),\n    SKU: augno.F(\"MAT-001\"),\n  })\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.ID)\n}\n"
    },
    "retrieve-material": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.retrieveMaterial('ml_01jm4r6700f8nwq3v5hx2d9ktp');\n\nconsole.log(response.id);",
        "curl": "curl API_HOST/v1/catalog/materials/$ID \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.retrieve_material(\n    id=\"ml_01jm4r6700f8nwq3v5hx2d9ktp\",\n)\nprint(response.id)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.GetMaterial(\n    context.TODO(),\n    \"ml_01jm4r6700f8nwq3v5hx2d9ktp\",\n    augno.AugnoPublicAPIGetMaterialParams{\n\n    },\n  )\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.ID)\n}\n"
    },
    "update-material": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.updateMaterial('ml_01jm4r6700f8nwq3v5hx2d9ktp', {\n  sku: 'MAT-001-UPDATED',\n});\n\nconsole.log(response.id);",
        "curl": "curl API_HOST/v1/catalog/materials/$ID \\\n    -X PATCH \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.update_material(\n    id=\"ml_01jm4r6700f8nwq3v5hx2d9ktp\",\n    sku=\"MAT-001-UPDATED\",\n)\nprint(response.id)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.UpdateMaterial(\n    context.TODO(),\n    \"ml_01jm4r6700f8nwq3v5hx2d9ktp\",\n    augno.AugnoPublicAPIUpdateMaterialParams{\n      SKU: augno.F(\"MAT-001-UPDATED\"),\n    },\n  )\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.ID)\n}\n"
    },
    "delete-material": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.deleteMaterial('ml_01jm4r6700f8nwq3v5hx2d9ktp');\n\nconsole.log(response.id);",
        "curl": "curl API_HOST/v1/catalog/materials/$ID \\\n    -X DELETE \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.delete_material(\n    \"ml_01jm4r6700f8nwq3v5hx2d9ktp\",\n)\nprint(response.id)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.DeleteMaterial(context.TODO(), \"ml_01jm4r6700f8nwq3v5hx2d9ktp\")\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.ID)\n}\n"
    },
    "list-parts": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.listParts();\n\nconsole.log(response.data);",
        "curl": "curl API_HOST/v1/catalog/parts \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.list_parts()\nprint(response.data)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.ListParts(context.TODO(), augno.AugnoPublicAPIListPartsParams{\n\n  })\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.Data)\n}\n"
    },
    "create-part": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.createPart({\n  category_id: 'ic_01jm4r6700f8nwq3v5hx2d9ktp',\n  sku: 'BRG-6204-2RS',\n});\n\nconsole.log(response.id);",
        "curl": "curl API_HOST/v1/catalog/parts \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\" \\\n    -d '{\n          \"category_id\": \"ic_01jm4r6700f8nwq3v5hx2d9ktp\",\n          \"sku\": \"BRG-6204-2RS\"\n        }'",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.create_part(\n    category_id=\"ic_01jm4r6700f8nwq3v5hx2d9ktp\",\n    sku=\"BRG-6204-2RS\",\n)\nprint(response.id)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.NewPart(context.TODO(), augno.AugnoPublicAPINewPartParams{\n    CategoryID: augno.F(\"ic_01jm4r6700f8nwq3v5hx2d9ktp\"),\n    SKU: augno.F(\"BRG-6204-2RS\"),\n  })\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.ID)\n}\n"
    },
    "retrieve-part": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.retrievePart('pt_02kn5s7811g9qwce7cizr4e0mq');\n\nconsole.log(response.id);",
        "curl": "curl API_HOST/v1/catalog/parts/$ID \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.retrieve_part(\n    id=\"pt_02kn5s7811g9qwce7cizr4e0mq\",\n)\nprint(response.id)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.GetPart(\n    context.TODO(),\n    \"pt_02kn5s7811g9qwce7cizr4e0mq\",\n    augno.AugnoPublicAPIGetPartParams{\n\n    },\n  )\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.ID)\n}\n"
    },
    "update-part": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.updatePart('pt_02kn5s7811g9qwce7cizr4e0mq', {\n  sku: 'BRG-6204-2RS',\n});\n\nconsole.log(response.id);",
        "curl": "curl API_HOST/v1/catalog/parts/$ID \\\n    -X PATCH \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.update_part(\n    id=\"pt_02kn5s7811g9qwce7cizr4e0mq\",\n    sku=\"BRG-6204-2RS\",\n)\nprint(response.id)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.UpdatePart(\n    context.TODO(),\n    \"pt_02kn5s7811g9qwce7cizr4e0mq\",\n    augno.AugnoPublicAPIUpdatePartParams{\n      SKU: augno.F(\"BRG-6204-2RS\"),\n    },\n  )\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.ID)\n}\n"
    },
    "delete-part": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.deletePart('pt_02kn5s7811g9qwce7cizr4e0mq');\n\nconsole.log(response.id);",
        "curl": "curl API_HOST/v1/catalog/parts/$ID \\\n    -X DELETE \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.delete_part(\n    \"pt_02kn5s7811g9qwce7cizr4e0mq\",\n)\nprint(response.id)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.DeletePart(context.TODO(), \"pt_02kn5s7811g9qwce7cizr4e0mq\")\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.ID)\n}\n"
    },
    "list-product-lines": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.listProductLines();\n\nconsole.log(response.data);",
        "curl": "curl API_HOST/v1/catalog/product-lines \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.list_product_lines()\nprint(response.data)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.ListProductLines(context.TODO(), augno.AugnoPublicAPIListProductLinesParams{\n\n  })\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.Data)\n}\n"
    },
    "create-product-line": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.createProductLine({\n  commission_policy: 'commission_exempt',\n  freight_policy: 'billed_freight',\n  name: 'Industrial Fasteners',\n  unit_group_id: 'ug_01jm4r6700f8nwq3v5hx2d9ktp',\n});\n\nconsole.log(response.id);",
        "curl": "curl API_HOST/v1/catalog/product-lines \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\" \\\n    -d '{\n          \"commission_policy\": \"commission_exempt\",\n          \"freight_policy\": \"billed_freight\",\n          \"name\": \"Industrial Fasteners\",\n          \"unit_group_id\": \"ug_01jm4r6700f8nwq3v5hx2d9ktp\"\n        }'",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.create_product_line(\n    commission_policy=\"commission_exempt\",\n    freight_policy=\"billed_freight\",\n    name=\"Industrial Fasteners\",\n    unit_group_id=\"ug_01jm4r6700f8nwq3v5hx2d9ktp\",\n)\nprint(response.id)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.NewProductLine(context.TODO(), augno.AugnoPublicAPINewProductLineParams{\n    CommissionPolicy: augno.F(augno.AugnoPublicAPINewProductLineParamsCommissionPolicyCommissionExempt),\n    FreightPolicy: augno.F(augno.AugnoPublicAPINewProductLineParamsFreightPolicyBilledFreight),\n    Name: augno.F(\"Industrial Fasteners\"),\n    UnitGroupID: augno.F(\"ug_01jm4r6700f8nwq3v5hx2d9ktp\"),\n  })\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.ID)\n}\n"
    },
    "retrieve-product-line": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.retrieveProductLine('pl_01jm4r6700f8nwq3v5hx2d9ktp');\n\nconsole.log(response.id);",
        "curl": "curl API_HOST/v1/catalog/product-lines/$ID \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.retrieve_product_line(\n    id=\"pl_01jm4r6700f8nwq3v5hx2d9ktp\",\n)\nprint(response.id)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.GetProductLine(\n    context.TODO(),\n    \"pl_01jm4r6700f8nwq3v5hx2d9ktp\",\n    augno.AugnoPublicAPIGetProductLineParams{\n\n    },\n  )\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.ID)\n}\n"
    },
    "update-product-line": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.updateProductLine('pl_01jm4r6700f8nwq3v5hx2d9ktp', {\n  name: 'Updated Product Line',\n});\n\nconsole.log(response.id);",
        "curl": "curl API_HOST/v1/catalog/product-lines/$ID \\\n    -X PATCH \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.update_product_line(\n    id=\"pl_01jm4r6700f8nwq3v5hx2d9ktp\",\n    name=\"Updated Product Line\",\n)\nprint(response.id)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.UpdateProductLine(\n    context.TODO(),\n    \"pl_01jm4r6700f8nwq3v5hx2d9ktp\",\n    augno.AugnoPublicAPIUpdateProductLineParams{\n      Name: augno.F(\"Updated Product Line\"),\n    },\n  )\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.ID)\n}\n"
    },
    "delete-product-line": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.deleteProductLine('pl_01jm4r6700f8nwq3v5hx2d9ktp');\n\nconsole.log(response);",
        "curl": "curl API_HOST/v1/catalog/product-lines/$ID \\\n    -X DELETE \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.delete_product_line(\n    \"pl_01jm4r6700f8nwq3v5hx2d9ktp\",\n)\nprint(response)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.DeleteProductLine(context.TODO(), \"pl_01jm4r6700f8nwq3v5hx2d9ktp\")\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response)\n}\n"
    },
    "list-products": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.listProducts();\n\nconsole.log(response.data);",
        "curl": "curl API_HOST/v1/catalog/products \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.list_products()\nprint(response.data)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.ListProducts(context.TODO(), augno.AugnoPublicAPIListProductsParams{\n\n  })\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.Data)\n}\n"
    },
    "create-product": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.createProduct({\n  category_id: 'ic_01jm4r6700f8nwq3v5hx2d9ktp',\n  product_line_id: null,\n  sku: 'ALM-2024-1001',\n  type: 'sale',\n});\n\nconsole.log(response.id);",
        "curl": "curl API_HOST/v1/catalog/products \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\" \\\n    -d '{\n          \"category_id\": \"ic_01jm4r6700f8nwq3v5hx2d9ktp\",\n          \"product_line_id\": null,\n          \"sku\": \"ALM-2024-1001\",\n          \"type\": \"sale\"\n        }'",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.create_product(\n    category_id=\"ic_01jm4r6700f8nwq3v5hx2d9ktp\",\n    product_line_id=None,\n    sku=\"ALM-2024-1001\",\n    type=\"sale\",\n)\nprint(response.id)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.NewProduct(context.TODO(), augno.AugnoPublicAPINewProductParams{\n    CategoryID: augno.F(\"ic_01jm4r6700f8nwq3v5hx2d9ktp\"),\n    ProductLineID: augno.Null[string](),\n    SKU: augno.F(\"ALM-2024-1001\"),\n    Type: augno.F(augno.AugnoPublicAPINewProductParamsTypeSale),\n  })\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.ID)\n}\n"
    },
    "retrieve-product": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.retrieveProduct('pd_01jm4r6700f8nwq3v5hx2d9ktp');\n\nconsole.log(response.id);",
        "curl": "curl API_HOST/v1/catalog/products/$ID \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.retrieve_product(\n    id=\"pd_01jm4r6700f8nwq3v5hx2d9ktp\",\n)\nprint(response.id)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.GetProduct(\n    context.TODO(),\n    \"pd_01jm4r6700f8nwq3v5hx2d9ktp\",\n    augno.AugnoPublicAPIGetProductParams{\n\n    },\n  )\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.ID)\n}\n"
    },
    "update-product": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.updateProduct('pd_01jm4r6700f8nwq3v5hx2d9ktp', {\n  sku: 'SKU-002',\n});\n\nconsole.log(response.id);",
        "curl": "curl API_HOST/v1/catalog/products/$ID \\\n    -X PATCH \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.update_product(\n    id=\"pd_01jm4r6700f8nwq3v5hx2d9ktp\",\n    sku=\"SKU-002\",\n)\nprint(response.id)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.UpdateProduct(\n    context.TODO(),\n    \"pd_01jm4r6700f8nwq3v5hx2d9ktp\",\n    augno.AugnoPublicAPIUpdateProductParams{\n      SKU: augno.F(\"SKU-002\"),\n    },\n  )\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.ID)\n}\n"
    },
    "delete-product": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.deleteProduct('pd_01jm4r6700f8nwq3v5hx2d9ktp');\n\nconsole.log(response.id);",
        "curl": "curl API_HOST/v1/catalog/products/$ID \\\n    -X DELETE \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.delete_product(\n    id=\"pd_01jm4r6700f8nwq3v5hx2d9ktp\",\n)\nprint(response.id)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.DeleteProduct(\n    context.TODO(),\n    \"pd_01jm4r6700f8nwq3v5hx2d9ktp\",\n    augno.AugnoPublicAPIDeleteProductParams{\n\n    },\n  )\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.ID)\n}\n"
    },
    "change-product-product-line": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.changeProductProductLine(\n  'pl_01jm4r6700f8nwq3v5hx2d9ktp',\n  { id: 'pd_01jm4r6700f8nwq3v5hx2d9ktp' },\n);\n\nconsole.log(response.id);",
        "curl": "curl API_HOST/v1/catalog/products/$ID/product-line/$PRODUCT_LINE_ID \\\n    -X PUT \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.change_product_product_line(\n    product_line_id=\"pl_01jm4r6700f8nwq3v5hx2d9ktp\",\n    id=\"pd_01jm4r6700f8nwq3v5hx2d9ktp\",\n)\nprint(response.id)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.ChangeProductProductLine(\n    context.TODO(),\n    \"pd_01jm4r6700f8nwq3v5hx2d9ktp\",\n    \"pl_01jm4r6700f8nwq3v5hx2d9ktp\",\n    augno.AugnoPublicAPIChangeProductProductLineParams{\n\n    },\n  )\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.ID)\n}\n"
    },
    "list-properties": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.listProperties();\n\nconsole.log(response.data);",
        "curl": "curl API_HOST/v1/catalog/properties \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.list_properties()\nprint(response.data)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.ListProperties(context.TODO(), augno.AugnoPublicAPIListPropertiesParams{\n\n  })\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.Data)\n}\n"
    },
    "create-property": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.createProperty({ name: 'Color' });\n\nconsole.log(response.id);",
        "curl": "curl API_HOST/v1/catalog/properties \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\" \\\n    -d '{\n          \"name\": \"Color\"\n        }'",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.create_property(\n    name=\"Color\",\n)\nprint(response.id)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.NewProperty(context.TODO(), augno.AugnoPublicAPINewPropertyParams{\n    Name: augno.F(\"Color\"),\n  })\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.ID)\n}\n"
    },
    "retrieve-property": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.retrieveProperty('pp_01jm4r6700f8nwq3v5hx2d9ktp');\n\nconsole.log(response.id);",
        "curl": "curl API_HOST/v1/catalog/properties/$ID \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.retrieve_property(\n    id=\"pp_01jm4r6700f8nwq3v5hx2d9ktp\",\n)\nprint(response.id)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.GetProperty(\n    context.TODO(),\n    \"pp_01jm4r6700f8nwq3v5hx2d9ktp\",\n    augno.AugnoPublicAPIGetPropertyParams{\n\n    },\n  )\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.ID)\n}\n"
    },
    "update-property": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.updateProperty('pp_01jm4r6700f8nwq3v5hx2d9ktp', {\n  name: 'Size',\n});\n\nconsole.log(response.id);",
        "curl": "curl API_HOST/v1/catalog/properties/$ID \\\n    -X PATCH \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.update_property(\n    id=\"pp_01jm4r6700f8nwq3v5hx2d9ktp\",\n    name=\"Size\",\n)\nprint(response.id)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.UpdateProperty(\n    context.TODO(),\n    \"pp_01jm4r6700f8nwq3v5hx2d9ktp\",\n    augno.AugnoPublicAPIUpdatePropertyParams{\n      Name: augno.F(\"Size\"),\n    },\n  )\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.ID)\n}\n"
    },
    "delete-property": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.deleteProperty('pp_01jm4r6700f8nwq3v5hx2d9ktp');\n\nconsole.log(response);",
        "curl": "curl API_HOST/v1/catalog/properties/$ID \\\n    -X DELETE \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.delete_property(\n    \"pp_01jm4r6700f8nwq3v5hx2d9ktp\",\n)\nprint(response)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.DeleteProperty(context.TODO(), \"pp_01jm4r6700f8nwq3v5hx2d9ktp\")\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response)\n}\n"
    },
    "list-attributes": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.listAttributes('pp_01jm4r6700f8nwq3v5hx2d9ktp');\n\nconsole.log(response.data);",
        "curl": "curl API_HOST/v1/catalog/properties/$PROPERTY_ID/attributes \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.list_attributes(\n    property_id=\"pp_01jm4r6700f8nwq3v5hx2d9ktp\",\n)\nprint(response.data)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.ListAttributes(\n    context.TODO(),\n    \"pp_01jm4r6700f8nwq3v5hx2d9ktp\",\n    augno.AugnoPublicAPIListAttributesParams{\n\n    },\n  )\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.Data)\n}\n"
    },
    "create-attribute": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.createAttribute('pp_01jm4r6700f8nwq3v5hx2d9ktp', {\n  sort_order: 1,\n  value: 'Red',\n});\n\nconsole.log(response.id);",
        "curl": "curl API_HOST/v1/catalog/properties/$PROPERTY_ID/attributes \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\" \\\n    -d '{\n          \"sort_order\": 1,\n          \"value\": \"Red\"\n        }'",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.create_attribute(\n    property_id=\"pp_01jm4r6700f8nwq3v5hx2d9ktp\",\n    sort_order=1,\n    value=\"Red\",\n)\nprint(response.id)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.NewAttribute(\n    context.TODO(),\n    \"pp_01jm4r6700f8nwq3v5hx2d9ktp\",\n    augno.AugnoPublicAPINewAttributeParams{\n      SortOrder: augno.F(int64(1)),\n      Value: augno.F(\"Red\"),\n    },\n  )\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.ID)\n}\n"
    },
    "retrieve-attribute": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.retrieveAttribute('at_01jm4r6700f8nwq3v5hx2d9ktp', {\n  property_id: 'pp_01jm4r6700f8nwq3v5hx2d9ktp',\n});\n\nconsole.log(response.id);",
        "curl": "curl API_HOST/v1/catalog/properties/$PROPERTY_ID/attributes/$ID \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.retrieve_attribute(\n    id=\"at_01jm4r6700f8nwq3v5hx2d9ktp\",\n    property_id=\"pp_01jm4r6700f8nwq3v5hx2d9ktp\",\n)\nprint(response.id)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.GetAttribute(\n    context.TODO(),\n    \"pp_01jm4r6700f8nwq3v5hx2d9ktp\",\n    \"at_01jm4r6700f8nwq3v5hx2d9ktp\",\n  )\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.ID)\n}\n"
    },
    "update-attribute": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.updateAttribute('at_01jm4r6700f8nwq3v5hx2d9ktp', {\n  property_id: 'pp_01jm4r6700f8nwq3v5hx2d9ktp',\n  value: 'Blue',\n});\n\nconsole.log(response.id);",
        "curl": "curl API_HOST/v1/catalog/properties/$PROPERTY_ID/attributes/$ID \\\n    -X PATCH \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.update_attribute(\n    id=\"at_01jm4r6700f8nwq3v5hx2d9ktp\",\n    property_id=\"pp_01jm4r6700f8nwq3v5hx2d9ktp\",\n    value=\"Blue\",\n)\nprint(response.id)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.UpdateAttribute(\n    context.TODO(),\n    \"pp_01jm4r6700f8nwq3v5hx2d9ktp\",\n    \"at_01jm4r6700f8nwq3v5hx2d9ktp\",\n    augno.AugnoPublicAPIUpdateAttributeParams{\n      Value: augno.F(\"Blue\"),\n    },\n  )\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.ID)\n}\n"
    },
    "delete-attribute": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.deleteAttribute('at_01jm4r6700f8nwq3v5hx2d9ktp', {\n  property_id: 'pp_01jm4r6700f8nwq3v5hx2d9ktp',\n});\n\nconsole.log(response);",
        "curl": "curl API_HOST/v1/catalog/properties/$PROPERTY_ID/attributes/$ID \\\n    -X DELETE \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.delete_attribute(\n    id=\"at_01jm4r6700f8nwq3v5hx2d9ktp\",\n    property_id=\"pp_01jm4r6700f8nwq3v5hx2d9ktp\",\n)\nprint(response)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.DeleteAttribute(\n    context.TODO(),\n    \"pp_01jm4r6700f8nwq3v5hx2d9ktp\",\n    \"at_01jm4r6700f8nwq3v5hx2d9ktp\",\n  )\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response)\n}\n"
    },
    "list-unit-groups": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.listUnitGroups();\n\nconsole.log(response.data);",
        "curl": "curl API_HOST/v1/catalog/unit-groups \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.list_unit_groups()\nprint(response.data)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.ListUnitGroups(context.TODO(), augno.AugnoPublicAPIListUnitGroupsParams{\n\n  })\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.Data)\n}\n"
    },
    "create-unit-group": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.createUnitGroup({\n  base_unit_id: 'un_01jm4r6700f8nwq3v5hx2d9ktp',\n  name: 'Weight Units',\n  type: 'mass',\n  associated_units: [\n    {\n      unit_id: 'un_01jm4r6700f8nwq3v5hx2d9ktp',\n      discount_percentage: 1,\n      discount_fixed: 0,\n      customer_portal_visibility: 'visible',\n    },\n  ],\n});\n\nconsole.log(response.id);",
        "curl": "curl API_HOST/v1/catalog/unit-groups \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\" \\\n    -d '{\n          \"base_unit_id\": \"un_01jm4r6700f8nwq3v5hx2d9ktp\",\n          \"name\": \"Weight Units\",\n          \"type\": \"mass\"\n        }'",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.create_unit_group(\n    base_unit_id=\"un_01jm4r6700f8nwq3v5hx2d9ktp\",\n    name=\"Weight Units\",\n    type=\"mass\",\n    associated_units=[{\n        \"unit_id\": \"un_01jm4r6700f8nwq3v5hx2d9ktp\",\n        \"discount_percentage\": 1,\n        \"discount_fixed\": 0,\n        \"customer_portal_visibility\": \"visible\",\n    }],\n)\nprint(response.id)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.NewUnitGroup(context.TODO(), augno.AugnoPublicAPINewUnitGroupParams{\n    BaseUnitID: augno.F(\"un_01jm4r6700f8nwq3v5hx2d9ktp\"),\n    Name: augno.F(\"Weight Units\"),\n    Type: augno.F(augno.AugnoPublicAPINewUnitGroupParamsTypeMass),\n    AssociatedUnits: augno.F([]augno.AugnoPublicAPINewUnitGroupParamsAssociatedUnit{augno.AugnoPublicAPINewUnitGroupParamsAssociatedUnit{\n      UnitID: augno.F(\"un_01jm4r6700f8nwq3v5hx2d9ktp\"),\n      DiscountPercentage: augno.F(1.000000),\n      DiscountFixed: augno.F(0.000000),\n      CustomerPortalVisibility: augno.F(augno.AugnoPublicAPINewUnitGroupParamsAssociatedUnitsCustomerPortalVisibilityVisible),\n    }}),\n  })\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.ID)\n}\n"
    },
    "retrieve-unit-group": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.retrieveUnitGroup('ug_01jm4r6700f8nwq3v5hx2d9ktp');\n\nconsole.log(response.id);",
        "curl": "curl API_HOST/v1/catalog/unit-groups/$ID \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.retrieve_unit_group(\n    id=\"ug_01jm4r6700f8nwq3v5hx2d9ktp\",\n)\nprint(response.id)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.GetUnitGroup(\n    context.TODO(),\n    \"ug_01jm4r6700f8nwq3v5hx2d9ktp\",\n    augno.AugnoPublicAPIGetUnitGroupParams{\n\n    },\n  )\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.ID)\n}\n"
    },
    "update-unit-group": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.updateUnitGroup('ug_01jm4r6700f8nwq3v5hx2d9ktp', {\n  base_unit_id: 'un_01jm4r6700f8nwq3v5hx2d9ktp',\n  name: 'Weight Units (Updated)',\n});\n\nconsole.log(response.id);",
        "curl": "curl API_HOST/v1/catalog/unit-groups/$ID \\\n    -X PATCH \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.update_unit_group(\n    id=\"ug_01jm4r6700f8nwq3v5hx2d9ktp\",\n    base_unit_id=\"un_01jm4r6700f8nwq3v5hx2d9ktp\",\n    name=\"Weight Units (Updated)\",\n)\nprint(response.id)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.UpdateUnitGroup(\n    context.TODO(),\n    \"ug_01jm4r6700f8nwq3v5hx2d9ktp\",\n    augno.AugnoPublicAPIUpdateUnitGroupParams{\n      BaseUnitID: augno.F(\"un_01jm4r6700f8nwq3v5hx2d9ktp\"),\n      Name: augno.F(\"Weight Units (Updated)\"),\n    },\n  )\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.ID)\n}\n"
    },
    "delete-unit-group": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.deleteUnitGroup('ug_01jm4r6700f8nwq3v5hx2d9ktp');\n\nconsole.log(response);",
        "curl": "curl API_HOST/v1/catalog/unit-groups/$ID \\\n    -X DELETE \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.delete_unit_group(\n    \"ug_01jm4r6700f8nwq3v5hx2d9ktp\",\n)\nprint(response)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.DeleteUnitGroup(context.TODO(), \"ug_01jm4r6700f8nwq3v5hx2d9ktp\")\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response)\n}\n"
    },
    "list-unit-group-units": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.listUnitGroupUnits('ug_01jm4r6700f8nwq3v5hx2d9ktp');\n\nconsole.log(response.data);",
        "curl": "curl API_HOST/v1/catalog/unit-groups/$UNIT_GROUP_ID/units \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.list_unit_group_units(\n    unit_group_id=\"ug_01jm4r6700f8nwq3v5hx2d9ktp\",\n)\nprint(response.data)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.ListUnitGroupUnits(\n    context.TODO(),\n    \"ug_01jm4r6700f8nwq3v5hx2d9ktp\",\n    augno.AugnoPublicAPIListUnitGroupUnitsParams{\n\n    },\n  )\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.Data)\n}\n"
    },
    "create-unit-group-associated-unit": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.createUnitGroupAssociatedUnit(\n  'ug_01jm4r6700f8nwq3v5hx2d9ktp',\n  {\n    unit_id: 'un_01jm4r6700f8nwq3v5hx2d9ktp',\n    customer_portal_visibility: 'visible',\n    discount_percentage: 1,\n  },\n);\n\nconsole.log(response.id);",
        "curl": "curl API_HOST/v1/catalog/unit-groups/$UNIT_GROUP_ID/units \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\" \\\n    -d '{\n          \"unit_id\": \"un_01jm4r6700f8nwq3v5hx2d9ktp\"\n        }'",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.create_unit_group_associated_unit(\n    unit_group_id=\"ug_01jm4r6700f8nwq3v5hx2d9ktp\",\n    unit_id=\"un_01jm4r6700f8nwq3v5hx2d9ktp\",\n    customer_portal_visibility=\"visible\",\n    discount_fixed=0,\n    discount_percentage=1,\n)\nprint(response.id)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.NewUnitGroupAssociatedUnit(\n    context.TODO(),\n    \"ug_01jm4r6700f8nwq3v5hx2d9ktp\",\n    augno.AugnoPublicAPINewUnitGroupAssociatedUnitParams{\n      UnitID: augno.F(\"un_01jm4r6700f8nwq3v5hx2d9ktp\"),\n      CustomerPortalVisibility: augno.F(augno.AugnoPublicAPINewUnitGroupAssociatedUnitParamsCustomerPortalVisibilityVisible),\n      DiscountPercentage: augno.F(1.000000),\n    },\n  )\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.ID)\n}\n"
    },
    "retrieve-unit-group-unit": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.retrieveUnitGroupUnit(\n  'un_01jm4r6700f8nwq3v5hx2d9ktp',\n  { unit_group_id: 'ug_01jm4r6700f8nwq3v5hx2d9ktp' },\n);\n\nconsole.log(response.id);",
        "curl": "curl API_HOST/v1/catalog/unit-groups/$UNIT_GROUP_ID/units/$ID \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.retrieve_unit_group_unit(\n    id=\"un_01jm4r6700f8nwq3v5hx2d9ktp\",\n    unit_group_id=\"ug_01jm4r6700f8nwq3v5hx2d9ktp\",\n)\nprint(response.id)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.GetUnitGroupUnit(\n    context.TODO(),\n    \"ug_01jm4r6700f8nwq3v5hx2d9ktp\",\n    \"un_01jm4r6700f8nwq3v5hx2d9ktp\",\n    augno.AugnoPublicAPIGetUnitGroupUnitParams{\n\n    },\n  )\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.ID)\n}\n"
    },
    "update-unit-group-associated-unit": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.updateUnitGroupAssociatedUnit(\n  'un_01jm4r6700f8nwq3v5hx2d9ktp',\n  {\n    unit_group_id: 'ug_01jm4r6700f8nwq3v5hx2d9ktp',\n    discount_percentage: 0.9,\n    unit_id: 'un_01jm4r6700f8nwq3v5hx2d9ktp',\n  },\n);\n\nconsole.log(response.id);",
        "curl": "curl API_HOST/v1/catalog/unit-groups/$UNIT_GROUP_ID/units/$ID \\\n    -X PATCH \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.update_unit_group_associated_unit(\n    id=\"un_01jm4r6700f8nwq3v5hx2d9ktp\",\n    unit_group_id=\"ug_01jm4r6700f8nwq3v5hx2d9ktp\",\n    discount_percentage=0.9,\n    unit_id=\"un_01jm4r6700f8nwq3v5hx2d9ktp\",\n)\nprint(response.id)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.UpdateUnitGroupAssociatedUnit(\n    context.TODO(),\n    \"ug_01jm4r6700f8nwq3v5hx2d9ktp\",\n    \"un_01jm4r6700f8nwq3v5hx2d9ktp\",\n    augno.AugnoPublicAPIUpdateUnitGroupAssociatedUnitParams{\n      DiscountPercentage: augno.F(0.900000),\n      UnitID: augno.F(\"un_01jm4r6700f8nwq3v5hx2d9ktp\"),\n    },\n  )\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.ID)\n}\n"
    },
    "delete-unit-group-associated-unit": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.deleteUnitGroupAssociatedUnit(\n  'un_01jm4r6700f8nwq3v5hx2d9ktp',\n  { unit_group_id: 'ug_01jm4r6700f8nwq3v5hx2d9ktp' },\n);\n\nconsole.log(response);",
        "curl": "curl API_HOST/v1/catalog/unit-groups/$UNIT_GROUP_ID/units/$ID \\\n    -X DELETE \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.delete_unit_group_associated_unit(\n    id=\"un_01jm4r6700f8nwq3v5hx2d9ktp\",\n    unit_group_id=\"ug_01jm4r6700f8nwq3v5hx2d9ktp\",\n)\nprint(response)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.DeleteUnitGroupAssociatedUnit(\n    context.TODO(),\n    \"ug_01jm4r6700f8nwq3v5hx2d9ktp\",\n    \"un_01jm4r6700f8nwq3v5hx2d9ktp\",\n  )\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response)\n}\n"
    },
    "list-units": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.listUnits();\n\nconsole.log(response.data);",
        "curl": "curl API_HOST/v1/catalog/units \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.list_units()\nprint(response.data)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.ListUnits(context.TODO(), augno.AugnoPublicAPIListUnitsParams{\n\n  })\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.Data)\n}\n"
    },
    "create-unit": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.createUnit({\n  abbreviation: 'g',\n  name: 'Gram',\n  offset_denominator: '1',\n  offset_numerator: '0',\n  ratio_denominator: '1',\n  ratio_numerator: '1',\n  type: 'mass',\n});\n\nconsole.log(response.id);",
        "curl": "curl API_HOST/v1/catalog/units \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\" \\\n    -d '{\n          \"abbreviation\": \"g\",\n          \"name\": \"Gram\",\n          \"offset_denominator\": \"1\",\n          \"offset_numerator\": \"0\",\n          \"ratio_denominator\": \"1\",\n          \"ratio_numerator\": \"1\",\n          \"type\": \"mass\"\n        }'",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.create_unit(\n    abbreviation=\"g\",\n    name=\"Gram\",\n    offset_denominator=\"1\",\n    offset_numerator=\"0\",\n    ratio_denominator=\"1\",\n    ratio_numerator=\"1\",\n    type=\"mass\",\n)\nprint(response.id)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.NewUnit(context.TODO(), augno.AugnoPublicAPINewUnitParams{\n    Abbreviation: augno.F(\"g\"),\n    Name: augno.F(\"Gram\"),\n    OffsetDenominator: augno.F(\"1\"),\n    OffsetNumerator: augno.F(\"0\"),\n    RatioDenominator: augno.F(\"1\"),\n    RatioNumerator: augno.F(\"1\"),\n    Type: augno.F(augno.AugnoPublicAPINewUnitParamsTypeMass),\n  })\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.ID)\n}\n"
    },
    "retrieve-unit": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.retrieveUnit('un_01jm4r6700f8nwq3v5hx2d9ktp');\n\nconsole.log(response.id);",
        "curl": "curl API_HOST/v1/catalog/units/$ID \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.retrieve_unit(\n    id=\"un_01jm4r6700f8nwq3v5hx2d9ktp\",\n)\nprint(response.id)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.GetUnit(\n    context.TODO(),\n    \"un_01jm4r6700f8nwq3v5hx2d9ktp\",\n    augno.AugnoPublicAPIGetUnitParams{\n\n    },\n  )\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.ID)\n}\n"
    },
    "update-unit": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.updateUnit('un_01jm4r6700f8nwq3v5hx2d9ktp', {\n  abbreviation: 'kg',\n  name: 'Kilogram',\n});\n\nconsole.log(response.id);",
        "curl": "curl API_HOST/v1/catalog/units/$ID \\\n    -X PATCH \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.update_unit(\n    id=\"un_01jm4r6700f8nwq3v5hx2d9ktp\",\n    abbreviation=\"kg\",\n    name=\"Kilogram\",\n)\nprint(response.id)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.UpdateUnit(\n    context.TODO(),\n    \"un_01jm4r6700f8nwq3v5hx2d9ktp\",\n    augno.AugnoPublicAPIUpdateUnitParams{\n      Abbreviation: augno.F(\"kg\"),\n      Name: augno.F(\"Kilogram\"),\n    },\n  )\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.ID)\n}\n"
    },
    "delete-unit": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.deleteUnit('un_01jm4r6700f8nwq3v5hx2d9ktp');\n\nconsole.log(response);",
        "curl": "curl API_HOST/v1/catalog/units/$ID \\\n    -X DELETE \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.delete_unit(\n    \"un_01jm4r6700f8nwq3v5hx2d9ktp\",\n)\nprint(response)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.DeleteUnit(context.TODO(), \"un_01jm4r6700f8nwq3v5hx2d9ktp\")\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response)\n}\n"
    },
    "validate-address": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.validateAddress({\n  address_line_1: '123 Main St',\n  city: 'Springfield',\n  country: 'US',\n  postal_code: '62701',\n  state: 'IL',\n});\n\nconsole.log(response.validation_messages);",
        "curl": "curl API_HOST/v1/core/addresses/actions/validate \\\n    -X PUT \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\" \\\n    -d '{\n          \"address_line_1\": \"123 Main St\",\n          \"city\": \"Springfield\",\n          \"country\": \"US\",\n          \"postal_code\": \"62701\",\n          \"state\": \"IL\"\n        }'",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.validate_address(\n    address_line_1=\"123 Main St\",\n    city=\"Springfield\",\n    country=\"US\",\n    postal_code=\"62701\",\n    state=\"IL\",\n)\nprint(response.validation_messages)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.ValidateAddress(context.TODO(), augno.AugnoPublicAPIValidateAddressParams{\n    AddressLine1: augno.F(\"123 Main St\"),\n    City: augno.F(\"Springfield\"),\n    Country: augno.F(\"US\"),\n    PostalCode: augno.F(\"62701\"),\n    State: augno.F(\"IL\"),\n  })\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.ValidationMessages)\n}\n"
    },
    "list-address-suggestions": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.listAddressSuggestions({ input: 'input' });\n\nconsole.log(response.data);",
        "curl": "curl API_HOST/v1/core/addresses/suggestions \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.list_address_suggestions(\n    input=\"input\",\n)\nprint(response.data)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.ListAddressSuggestions(context.TODO(), augno.AugnoPublicAPIListAddressSuggestionsParams{\n    Input: augno.F(\"input\"),\n  })\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.Data)\n}\n"
    },
    "list-audit-events": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.listAuditEvents();\n\nconsole.log(response.data);",
        "curl": "curl API_HOST/v1/core/audit-events \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.list_audit_events()\nprint(response.data)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.ListAuditEvents(context.TODO(), augno.AugnoPublicAPIListAuditEventsParams{\n\n  })\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.Data)\n}\n"
    },
    "list-audit-event-resource-types": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.listAuditEventResourceTypes();\n\nconsole.log(response.data);",
        "curl": "curl API_HOST/v1/core/audit-events/resource-types \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.list_audit_event_resource_types()\nprint(response.data)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.ListAuditEventResourceTypes(context.TODO())\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.Data)\n}\n"
    },
    "retrieve-audit-event": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.retrieveAuditEvent('ae_01gq7s3f2m0y9h2t7z1w7q3v9k');\n\nconsole.log(response.id);",
        "curl": "curl API_HOST/v1/core/audit-events/$ID \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.retrieve_audit_event(\n    id=\"ae_01gq7s3f2m0y9h2t7z1w7q3v9k\",\n)\nprint(response.id)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.GetAuditEvent(\n    context.TODO(),\n    \"ae_01gq7s3f2m0y9h2t7z1w7q3v9k\",\n    augno.AugnoPublicAPIGetAuditEventParams{\n\n    },\n  )\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.ID)\n}\n"
    },
    "list-email-logs": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.listEmailLogs();\n\nconsole.log(response.data);",
        "curl": "curl API_HOST/v1/core/email-logs \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.list_email_logs()\nprint(response.data)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.ListEmailLogs(context.TODO(), augno.AugnoPublicAPIListEmailLogsParams{\n\n  })\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.Data)\n}\n"
    },
    "retrieve-email-log": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.retrieveEmailLog('eml_01jm4r6700f8nwq3v5hx2d9ktp');\n\nconsole.log(response.id);",
        "curl": "curl API_HOST/v1/core/email-logs/$ID \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.retrieve_email_log(\n    id=\"eml_01jm4r6700f8nwq3v5hx2d9ktp\",\n)\nprint(response.id)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.GetEmailLog(\n    context.TODO(),\n    \"eml_01jm4r6700f8nwq3v5hx2d9ktp\",\n    augno.AugnoPublicAPIGetEmailLogParams{\n\n    },\n  )\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.ID)\n}\n"
    },
    "list-request-logs": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.listRequestLogs();\n\nconsole.log(response.data);",
        "curl": "curl API_HOST/v1/core/request-logs \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.list_request_logs()\nprint(response.data)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.ListRequestLogs(context.TODO(), augno.AugnoPublicAPIListRequestLogsParams{\n\n  })\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.Data)\n}\n"
    },
    "retrieve-request-log": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.retrieveRequestLog('rq_01jm4r6700f8nwq3v5hx2d9ktp');\n\nconsole.log(response.id);",
        "curl": "curl API_HOST/v1/core/request-logs/$ID \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.retrieve_request_log(\n    id=\"rq_01jm4r6700f8nwq3v5hx2d9ktp\",\n)\nprint(response.id)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.GetRequestLog(\n    context.TODO(),\n    \"rq_01jm4r6700f8nwq3v5hx2d9ktp\",\n    augno.AugnoPublicAPIGetRequestLogParams{\n\n    },\n  )\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.ID)\n}\n"
    },
    "list-sandboxes": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.listSandboxes();\n\nconsole.log(response.data);",
        "curl": "curl API_HOST/v1/core/sandboxes \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.list_sandboxes()\nprint(response.data)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.ListSandboxes(context.TODO(), augno.AugnoPublicAPIListSandboxesParams{\n\n  })\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.Data)\n}\n"
    },
    "create-sandbox": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.createSandbox({ name: 'Integration Testing' });\n\nconsole.log(response.id);",
        "curl": "curl API_HOST/v1/core/sandboxes \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\" \\\n    -d '{\n          \"name\": \"Integration Testing\"\n        }'",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.create_sandbox(\n    name=\"Integration Testing\",\n)\nprint(response.id)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.NewSandbox(context.TODO(), augno.AugnoPublicAPINewSandboxParams{\n    Name: augno.F(\"Integration Testing\"),\n  })\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.ID)\n}\n"
    },
    "retrieve-sandbox": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.retrieveSandbox('sbac_01jm4r6700f8nwq3v5hx2d9ktp');\n\nconsole.log(response.id);",
        "curl": "curl API_HOST/v1/core/sandboxes/$ID \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.retrieve_sandbox(\n    id=\"sbac_01jm4r6700f8nwq3v5hx2d9ktp\",\n)\nprint(response.id)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.GetSandbox(\n    context.TODO(),\n    \"sbac_01jm4r6700f8nwq3v5hx2d9ktp\",\n    augno.AugnoPublicAPIGetSandboxParams{\n\n    },\n  )\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.ID)\n}\n"
    },
    "delete-sandbox": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.deleteSandbox('sbac_01jm4r6700f8nwq3v5hx2d9ktp');\n\nconsole.log(response);",
        "curl": "curl API_HOST/v1/core/sandboxes/$ID \\\n    -X DELETE \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.delete_sandbox(\n    \"sbac_01jm4r6700f8nwq3v5hx2d9ktp\",\n)\nprint(response)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.DeleteSandbox(context.TODO(), \"sbac_01jm4r6700f8nwq3v5hx2d9ktp\")\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response)\n}\n"
    },
    "list-payment-terms": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.listPaymentTerms();\n\nconsole.log(response.data);",
        "curl": "curl API_HOST/v1/finance/payment-terms \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.list_payment_terms()\nprint(response.data)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.ListPaymentTerms(context.TODO(), augno.AugnoPublicAPIListPaymentTermsParams{\n\n  })\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.Data)\n}\n"
    },
    "create-payment-term": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.createPaymentTerm({ name: 'Net 30' });\n\nconsole.log(response.id);",
        "curl": "curl API_HOST/v1/finance/payment-terms \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\" \\\n    -d '{\n          \"name\": \"Net 30\"\n        }'",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.create_payment_term(\n    name=\"Net 30\",\n)\nprint(response.id)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.NewPaymentTerm(context.TODO(), augno.AugnoPublicAPINewPaymentTermParams{\n    Name: augno.F(\"Net 30\"),\n  })\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.ID)\n}\n"
    },
    "retrieve-payment-term": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.retrievePaymentTerm('pytm_01jm4r6700f8nwq3v5hx2d9ktp');\n\nconsole.log(response.id);",
        "curl": "curl API_HOST/v1/finance/payment-terms/$ID \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.retrieve_payment_term(\n    id=\"pytm_01jm4r6700f8nwq3v5hx2d9ktp\",\n)\nprint(response.id)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.GetPaymentTerm(\n    context.TODO(),\n    \"pytm_01jm4r6700f8nwq3v5hx2d9ktp\",\n    augno.AugnoPublicAPIGetPaymentTermParams{\n\n    },\n  )\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.ID)\n}\n"
    },
    "update-payment-term": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.updatePaymentTerm('pytm_01jm4r6700f8nwq3v5hx2d9ktp', {\n  name: 'Net 60',\n});\n\nconsole.log(response.id);",
        "curl": "curl API_HOST/v1/finance/payment-terms/$ID \\\n    -X PATCH \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.update_payment_term(\n    id=\"pytm_01jm4r6700f8nwq3v5hx2d9ktp\",\n    name=\"Net 60\",\n)\nprint(response.id)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.UpdatePaymentTerm(\n    context.TODO(),\n    \"pytm_01jm4r6700f8nwq3v5hx2d9ktp\",\n    augno.AugnoPublicAPIUpdatePaymentTermParams{\n      Name: augno.F(\"Net 60\"),\n    },\n  )\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.ID)\n}\n"
    },
    "delete-payment-term": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.deletePaymentTerm('pytm_01jm4r6700f8nwq3v5hx2d9ktp');\n\nconsole.log(response);",
        "curl": "curl API_HOST/v1/finance/payment-terms/$ID \\\n    -X DELETE \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.delete_payment_term(\n    \"pytm_01jm4r6700f8nwq3v5hx2d9ktp\",\n)\nprint(response)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.DeletePaymentTerm(context.TODO(), \"pytm_01jm4r6700f8nwq3v5hx2d9ktp\")\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response)\n}\n"
    },
    "list-account-users": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.listAccountUsers();\n\nconsole.log(response.data);",
        "curl": "curl API_HOST/v1/identity/account-users \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.list_account_users()\nprint(response.data)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.ListAccountUsers(context.TODO(), augno.AugnoPublicAPIListAccountUsersParams{\n\n  })\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.Data)\n}\n"
    },
    "create-account-user": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.createAccountUser({\n  email: 'jdoe@augno.com',\n  name: 'John Doe',\n  password: 'QgS7Z8Hhj3&1',\n  username: 'jdoe',\n  preferences: [{ notification_type: 'order_acknowledgement', enabled: true }],\n});\n\nconsole.log(response.id);",
        "curl": "curl API_HOST/v1/identity/account-users \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\" \\\n    -d '{\n          \"email\": \"jdoe@augno.com\",\n          \"name\": \"John Doe\",\n          \"password\": \"QgS7Z8Hhj3&1\",\n          \"username\": \"jdoe\"\n        }'",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.create_account_user(\n    email=\"jdoe@augno.com\",\n    name=\"John Doe\",\n    password=\"QgS7Z8Hhj3&1\",\n    username=\"jdoe\",\n    preferences=[{\n        \"notification_type\": \"order_acknowledgement\",\n        \"enabled\": True,\n    }],\n)\nprint(response.id)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.NewAccountUser(context.TODO(), augno.AugnoPublicAPINewAccountUserParams{\n    Email: augno.F(\"jdoe@augno.com\"),\n    Name: augno.F(\"John Doe\"),\n    Password: augno.F(\"QgS7Z8Hhj3&1\"),\n    Username: augno.F(\"jdoe\"),\n    Preferences: augno.F([]augno.AugnoPublicAPINewAccountUserParamsPreference{augno.AugnoPublicAPINewAccountUserParamsPreference{\n      NotificationType: augno.F(augno.AugnoPublicAPINewAccountUserParamsPreferencesNotificationTypeOrderAcknowledgement),\n      Enabled: augno.F(true),\n    }}),\n  })\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.ID)\n}\n"
    },
    "retrieve-account-user": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.retrieveAccountUser('acus_01gf7a8200er3ar3pkfrb6kk29');\n\nconsole.log(response.id);",
        "curl": "curl API_HOST/v1/identity/account-users/$ID \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.retrieve_account_user(\n    id=\"acus_01gf7a8200er3ar3pkfrb6kk29\",\n)\nprint(response.id)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.GetAccountUser(\n    context.TODO(),\n    \"acus_01gf7a8200er3ar3pkfrb6kk29\",\n    augno.AugnoPublicAPIGetAccountUserParams{\n\n    },\n  )\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.ID)\n}\n"
    },
    "update-account-user": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.updateAccountUser('acus_01gf7a8200er3ar3pkfrb6kk29', {\n  name: 'John Doe',\n});\n\nconsole.log(response.id);",
        "curl": "curl API_HOST/v1/identity/account-users/$ID \\\n    -X PATCH \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.update_account_user(\n    id=\"acus_01gf7a8200er3ar3pkfrb6kk29\",\n    name=\"John Doe\",\n)\nprint(response.id)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.UpdateAccountUser(\n    context.TODO(),\n    \"acus_01gf7a8200er3ar3pkfrb6kk29\",\n    augno.AugnoPublicAPIUpdateAccountUserParams{\n      Name: augno.F(\"John Doe\"),\n    },\n  )\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.ID)\n}\n"
    },
    "activate-account-user": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.activateAccountUser('acus_01gf7a8200er3ar3pkfrb6kk29');\n\nconsole.log(response);",
        "curl": "curl API_HOST/v1/identity/account-users/$ID/actions/activate \\\n    -X PUT \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.activate_account_user(\n    \"acus_01gf7a8200er3ar3pkfrb6kk29\",\n)\nprint(response)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.ActivateAccountUser(context.TODO(), \"acus_01gf7a8200er3ar3pkfrb6kk29\")\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response)\n}\n"
    },
    "disable-account-user": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.disableAccountUser('acus_01gf7a8200er3ar3pkfrb6kk29');\n\nconsole.log(response);",
        "curl": "curl API_HOST/v1/identity/account-users/$ID/actions/disable \\\n    -X PUT \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.disable_account_user(\n    \"acus_01gf7a8200er3ar3pkfrb6kk29\",\n)\nprint(response)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.DisableAccountUser(context.TODO(), \"acus_01gf7a8200er3ar3pkfrb6kk29\")\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response)\n}\n"
    },
    "remove-account-user": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.removeAccountUser('acus_01gf7a8200er3ar3pkfrb6kk29');\n\nconsole.log(response);",
        "curl": "curl API_HOST/v1/identity/account-users/$ID/actions/remove \\\n    -X PUT \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.remove_account_user(\n    \"acus_01gf7a8200er3ar3pkfrb6kk29\",\n)\nprint(response)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.RemoveAccountUser(context.TODO(), \"acus_01gf7a8200er3ar3pkfrb6kk29\")\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response)\n}\n"
    },
    "list-roles": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.listRoles();\n\nconsole.log(response.data);",
        "curl": "curl API_HOST/v1/identity/roles \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.list_roles()\nprint(response.data)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.ListRoles(context.TODO(), augno.AugnoPublicAPIListRolesParams{\n\n  })\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.Data)\n}\n"
    },
    "create-role": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.createRole({\n  name: 'Warehouse Manager',\n  permissions: ['customers:create', 'customers:read', 'customers:update', 'invoices:read'],\n});\n\nconsole.log(response.id);",
        "curl": "curl API_HOST/v1/identity/roles \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\" \\\n    -d '{\n          \"name\": \"Warehouse Manager\",\n          \"permissions\": [\n            \"customers:create\",\n            \"customers:read\",\n            \"customers:update\",\n            \"invoices:read\"\n          ]\n        }'",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.create_role(\n    name=\"Warehouse Manager\",\n    permissions=[\"customers:create\", \"customers:read\", \"customers:update\", \"invoices:read\"],\n)\nprint(response.id)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.NewRole(context.TODO(), augno.AugnoPublicAPINewRoleParams{\n    Name: augno.F(\"Warehouse Manager\"),\n    Permissions: augno.F([]string{\"customers:create\", \"customers:read\", \"customers:update\", \"invoices:read\"}),\n  })\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.ID)\n}\n"
    },
    "retrieve-role": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.retrieveRole('rl_01gf7a8200er3ar3pkfrb6kk29');\n\nconsole.log(response.id);",
        "curl": "curl API_HOST/v1/identity/roles/$ID \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.retrieve_role(\n    id=\"rl_01gf7a8200er3ar3pkfrb6kk29\",\n)\nprint(response.id)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.GetRole(\n    context.TODO(),\n    \"rl_01gf7a8200er3ar3pkfrb6kk29\",\n    augno.AugnoPublicAPIGetRoleParams{\n\n    },\n  )\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.ID)\n}\n"
    },
    "update-role": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.updateRole('rl_01gf7a8200er3ar3pkfrb6kk29', {\n  name: 'Updated Manager',\n  permissions: ['customers:read', 'customers:update'],\n});\n\nconsole.log(response.id);",
        "curl": "curl API_HOST/v1/identity/roles/$ID \\\n    -X PATCH \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.update_role(\n    id=\"rl_01gf7a8200er3ar3pkfrb6kk29\",\n    name=\"Updated Manager\",\n    permissions=[\"customers:read\", \"customers:update\"],\n)\nprint(response.id)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.UpdateRole(\n    context.TODO(),\n    \"rl_01gf7a8200er3ar3pkfrb6kk29\",\n    augno.AugnoPublicAPIUpdateRoleParams{\n      Name: augno.F(\"Updated Manager\"),\n      Permissions: augno.F([]string{\"customers:read\", \"customers:update\"}),\n    },\n  )\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.ID)\n}\n"
    },
    "delete-role": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.deleteRole('rl_01gf7a8200er3ar3pkfrb6kk29');\n\nconsole.log(response);",
        "curl": "curl API_HOST/v1/identity/roles/$ID \\\n    -X DELETE \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.delete_role(\n    \"rl_01gf7a8200er3ar3pkfrb6kk29\",\n)\nprint(response)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.DeleteRole(context.TODO(), \"rl_01gf7a8200er3ar3pkfrb6kk29\")\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response)\n}\n"
    },
    "list-carriers": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.listCarriers();\n\nconsole.log(response.data);",
        "curl": "curl API_HOST/v1/operations/carriers \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.list_carriers()\nprint(response.data)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.ListCarriers(context.TODO(), augno.AugnoPublicAPIListCarriersParams{\n\n  })\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.Data)\n}\n"
    },
    "create-carrier": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.createCarrier({\n  account_number: '1234567890',\n  code: 'fedex',\n  name: 'FedEx',\n  customer_portal_visibility: 'visible',\n});\n\nconsole.log(response.id);",
        "curl": "curl API_HOST/v1/operations/carriers \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\" \\\n    -d '{\n          \"account_number\": \"1234567890\",\n          \"code\": \"fedex\",\n          \"name\": \"FedEx\"\n        }'",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.create_carrier(\n    account_number=\"1234567890\",\n    code=\"fedex\",\n    name=\"FedEx\",\n    customer_portal_visibility=\"visible\",\n)\nprint(response.id)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.NewCarrier(context.TODO(), augno.AugnoPublicAPINewCarrierParams{\n    AccountNumber: augno.F(\"1234567890\"),\n    Code: augno.F(augno.AugnoPublicAPINewCarrierParamsCodeFedex),\n    Name: augno.F(\"FedEx\"),\n    CustomerPortalVisibility: augno.F(augno.AugnoPublicAPINewCarrierParamsCustomerPortalVisibilityVisible),\n  })\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.ID)\n}\n"
    },
    "list-service-levels": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.listServiceLevels('cr_01jm4r6700f8nwq3v5hx2d9ktp');\n\nconsole.log(response.data);",
        "curl": "curl API_HOST/v1/operations/carriers/$CARRIER_ID/service-levels \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.list_service_levels(\n    carrier_id=\"cr_01jm4r6700f8nwq3v5hx2d9ktp\",\n)\nprint(response.data)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.ListServiceLevels(\n    context.TODO(),\n    \"cr_01jm4r6700f8nwq3v5hx2d9ktp\",\n    augno.AugnoPublicAPIListServiceLevelsParams{\n\n    },\n  )\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.Data)\n}\n"
    },
    "create-service-level": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.createServiceLevel('cr_01jm4r6700f8nwq3v5hx2d9ktp', {\n  code: 'ground',\n  is_default: false,\n  name: 'Ground Shipping',\n});\n\nconsole.log(response.id);",
        "curl": "curl API_HOST/v1/operations/carriers/$CARRIER_ID/service-levels \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\" \\\n    -d '{\n          \"code\": \"ground\",\n          \"is_default\": false,\n          \"name\": \"Ground Shipping\"\n        }'",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.create_service_level(\n    carrier_id=\"cr_01jm4r6700f8nwq3v5hx2d9ktp\",\n    code=\"ground\",\n    is_default=False,\n    name=\"Ground Shipping\",\n)\nprint(response.id)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.NewServiceLevel(\n    context.TODO(),\n    \"cr_01jm4r6700f8nwq3v5hx2d9ktp\",\n    augno.AugnoPublicAPINewServiceLevelParams{\n      Code: augno.F(\"ground\"),\n      IsDefault: augno.F(false),\n      Name: augno.F(\"Ground Shipping\"),\n    },\n  )\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.ID)\n}\n"
    },
    "retrieve-service-level": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.retrieveServiceLevel(\n  'crop_01jm4r6700f8nwq3v5hx2d9ktp',\n  { carrier_id: 'cr_01jm4r6700f8nwq3v5hx2d9ktp' },\n);\n\nconsole.log(response.id);",
        "curl": "curl API_HOST/v1/operations/carriers/$CARRIER_ID/service-levels/$ID \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.retrieve_service_level(\n    id=\"crop_01jm4r6700f8nwq3v5hx2d9ktp\",\n    carrier_id=\"cr_01jm4r6700f8nwq3v5hx2d9ktp\",\n)\nprint(response.id)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.GetServiceLevel(\n    context.TODO(),\n    \"cr_01jm4r6700f8nwq3v5hx2d9ktp\",\n    \"crop_01jm4r6700f8nwq3v5hx2d9ktp\",\n    augno.AugnoPublicAPIGetServiceLevelParams{\n\n    },\n  )\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.ID)\n}\n"
    },
    "update-service-level": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.updateServiceLevel('crop_01jm4r6700f8nwq3v5hx2d9ktp', {\n  carrier_id: 'cr_01jm4r6700f8nwq3v5hx2d9ktp',\n  name: 'Express Shipping',\n});\n\nconsole.log(response.id);",
        "curl": "curl API_HOST/v1/operations/carriers/$CARRIER_ID/service-levels/$ID \\\n    -X PATCH \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.update_service_level(\n    id=\"crop_01jm4r6700f8nwq3v5hx2d9ktp\",\n    carrier_id=\"cr_01jm4r6700f8nwq3v5hx2d9ktp\",\n    name=\"Express Shipping\",\n)\nprint(response.id)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.UpdateServiceLevel(\n    context.TODO(),\n    \"cr_01jm4r6700f8nwq3v5hx2d9ktp\",\n    \"crop_01jm4r6700f8nwq3v5hx2d9ktp\",\n    augno.AugnoPublicAPIUpdateServiceLevelParams{\n      Name: augno.F(\"Express Shipping\"),\n    },\n  )\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.ID)\n}\n"
    },
    "delete-service-level": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.deleteServiceLevel('crop_01jm4r6700f8nwq3v5hx2d9ktp', {\n  carrier_id: 'cr_01jm4r6700f8nwq3v5hx2d9ktp',\n});\n\nconsole.log(response);",
        "curl": "curl API_HOST/v1/operations/carriers/$CARRIER_ID/service-levels/$ID \\\n    -X DELETE \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.delete_service_level(\n    id=\"crop_01jm4r6700f8nwq3v5hx2d9ktp\",\n    carrier_id=\"cr_01jm4r6700f8nwq3v5hx2d9ktp\",\n)\nprint(response)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.DeleteServiceLevel(\n    context.TODO(),\n    \"cr_01jm4r6700f8nwq3v5hx2d9ktp\",\n    \"crop_01jm4r6700f8nwq3v5hx2d9ktp\",\n  )\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response)\n}\n"
    },
    "retrieve-carrier": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.retrieveCarrier('cr_01jm4r6700f8nwq3v5hx2d9ktp');\n\nconsole.log(response.id);",
        "curl": "curl API_HOST/v1/operations/carriers/$ID \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.retrieve_carrier(\n    id=\"cr_01jm4r6700f8nwq3v5hx2d9ktp\",\n)\nprint(response.id)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.GetCarrier(\n    context.TODO(),\n    \"cr_01jm4r6700f8nwq3v5hx2d9ktp\",\n    augno.AugnoPublicAPIGetCarrierParams{\n\n    },\n  )\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.ID)\n}\n"
    },
    "update-carrier": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.updateCarrier('cr_01jm4r6700f8nwq3v5hx2d9ktp', {\n  name: 'FedEx Express',\n});\n\nconsole.log(response.id);",
        "curl": "curl API_HOST/v1/operations/carriers/$ID \\\n    -X PATCH \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.update_carrier(\n    id=\"cr_01jm4r6700f8nwq3v5hx2d9ktp\",\n    name=\"FedEx Express\",\n)\nprint(response.id)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.UpdateCarrier(\n    context.TODO(),\n    \"cr_01jm4r6700f8nwq3v5hx2d9ktp\",\n    augno.AugnoPublicAPIUpdateCarrierParams{\n      Name: augno.F(\"FedEx Express\"),\n    },\n  )\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.ID)\n}\n"
    },
    "delete-carrier": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.deleteCarrier('cr_01jm4r6700f8nwq3v5hx2d9ktp');\n\nconsole.log(response);",
        "curl": "curl API_HOST/v1/operations/carriers/$ID \\\n    -X DELETE \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.delete_carrier(\n    \"cr_01jm4r6700f8nwq3v5hx2d9ktp\",\n)\nprint(response)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.DeleteCarrier(context.TODO(), \"cr_01jm4r6700f8nwq3v5hx2d9ktp\")\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response)\n}\n"
    },
    "list-location-types": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.listLocationTypes();\n\nconsole.log(response.data);",
        "curl": "curl API_HOST/v1/operations/location-types \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.list_location_types()\nprint(response.data)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.ListLocationTypes(context.TODO(), augno.AugnoPublicAPIListLocationTypesParams{\n\n  })\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.Data)\n}\n"
    },
    "retrieve-location-type": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.retrieveLocationType('lc_01gf7a8200er3ar3pkfrb6kk31');\n\nconsole.log(response.id);",
        "curl": "curl API_HOST/v1/operations/location-types/$ID \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.retrieve_location_type(\n    \"lc_01gf7a8200er3ar3pkfrb6kk31\",\n)\nprint(response.id)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.GetLocationType(context.TODO(), \"lc_01gf7a8200er3ar3pkfrb6kk31\")\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.ID)\n}\n"
    },
    "list-locations": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.listLocations();\n\nconsole.log(response.data);",
        "curl": "curl API_HOST/v1/operations/locations \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.list_locations()\nprint(response.data)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.ListLocations(context.TODO(), augno.AugnoPublicAPIListLocationsParams{\n\n  })\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.Data)\n}\n"
    },
    "create-location": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.createLocation({\n  name: 'Warehouse A',\n  type: 'building',\n});\n\nconsole.log(response.id);",
        "curl": "curl API_HOST/v1/operations/locations \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\" \\\n    -d '{\n          \"name\": \"Warehouse A\",\n          \"type\": \"building\"\n        }'",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.create_location(\n    name=\"Warehouse A\",\n    type=\"building\",\n)\nprint(response.id)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.NewLocation(context.TODO(), augno.AugnoPublicAPINewLocationParams{\n    Name: augno.F(\"Warehouse A\"),\n    Type: augno.F(augno.AugnoPublicAPINewLocationParamsTypeBuilding),\n  })\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.ID)\n}\n"
    },
    "retrieve-location": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.retrieveLocation('lc_01gf7a8200er3ar3pkfrb6kk30');\n\nconsole.log(response.id);",
        "curl": "curl API_HOST/v1/operations/locations/$ID \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.retrieve_location(\n    id=\"lc_01gf7a8200er3ar3pkfrb6kk30\",\n)\nprint(response.id)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.GetLocation(\n    context.TODO(),\n    \"lc_01gf7a8200er3ar3pkfrb6kk30\",\n    augno.AugnoPublicAPIGetLocationParams{\n\n    },\n  )\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.ID)\n}\n"
    },
    "update-location": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.updateLocation('lc_01gf7a8200er3ar3pkfrb6kk30', {\n  name: 'Warehouse B',\n});\n\nconsole.log(response.id);",
        "curl": "curl API_HOST/v1/operations/locations/$ID \\\n    -X PATCH \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.update_location(\n    id=\"lc_01gf7a8200er3ar3pkfrb6kk30\",\n    name=\"Warehouse B\",\n)\nprint(response.id)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.UpdateLocation(\n    context.TODO(),\n    \"lc_01gf7a8200er3ar3pkfrb6kk30\",\n    augno.AugnoPublicAPIUpdateLocationParams{\n      Name: augno.F(\"Warehouse B\"),\n    },\n  )\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.ID)\n}\n"
    },
    "delete-location": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.deleteLocation('lc_01gf7a8200er3ar3pkfrb6kk30');\n\nconsole.log(response);",
        "curl": "curl API_HOST/v1/operations/locations/$ID \\\n    -X DELETE \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.delete_location(\n    \"lc_01gf7a8200er3ar3pkfrb6kk30\",\n)\nprint(response)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.DeleteLocation(context.TODO(), \"lc_01gf7a8200er3ar3pkfrb6kk30\")\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response)\n}\n"
    },
    "list-scanning-stations": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.listScanningStations();\n\nconsole.log(response.data);",
        "curl": "curl API_HOST/v1/operations/scanning-stations \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.list_scanning_stations()\nprint(response.data)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.ListScanningStations(context.TODO(), augno.AugnoPublicAPIListScanningStationsParams{\n\n  })\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.Data)\n}\n"
    },
    "create-scanning-station": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.createScanningStation({\n  department_id: 'dp_01gf7a8200er3ar3pkfrb6kk30',\n  name: 'Packaging Line 1',\n  operator_requirement: 'none',\n  type: 'init_batch',\n  label_size: '1x1',\n  label_type: 'tag',\n});\n\nconsole.log(response.id);",
        "curl": "curl API_HOST/v1/operations/scanning-stations \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\" \\\n    -d '{\n          \"department_id\": \"dp_01gf7a8200er3ar3pkfrb6kk30\",\n          \"name\": \"Packaging Line 1\",\n          \"operator_requirement\": \"none\",\n          \"type\": \"init_batch\"\n        }'",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.create_scanning_station(\n    department_id=\"dp_01gf7a8200er3ar3pkfrb6kk30\",\n    name=\"Packaging Line 1\",\n    operator_requirement=\"none\",\n    type=\"init_batch\",\n    label_size=\"1x1\",\n    label_type=\"tag\",\n)\nprint(response.id)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.NewScanningStation(context.TODO(), augno.AugnoPublicAPINewScanningStationParams{\n    DepartmentID: augno.F(\"dp_01gf7a8200er3ar3pkfrb6kk30\"),\n    Name: augno.F(\"Packaging Line 1\"),\n    OperatorRequirement: augno.F(augno.AugnoPublicAPINewScanningStationParamsOperatorRequirementNone),\n    Type: augno.F(augno.AugnoPublicAPINewScanningStationParamsTypeInitBatch),\n    LabelSize: augno.F(augno.AugnoPublicAPINewScanningStationParamsLabelSize1x1),\n    LabelType: augno.F(augno.AugnoPublicAPINewScanningStationParamsLabelTypeTag),\n  })\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.ID)\n}\n"
    },
    "retrieve-scanning-station": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.retrieveScanningStation(\n  'scst_01jm4r6700f8nwq3v5hx2d9ktp',\n);\n\nconsole.log(response.id);",
        "curl": "curl API_HOST/v1/operations/scanning-stations/$ID \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.retrieve_scanning_station(\n    id=\"scst_01jm4r6700f8nwq3v5hx2d9ktp\",\n)\nprint(response.id)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.GetScanningStation(\n    context.TODO(),\n    \"scst_01jm4r6700f8nwq3v5hx2d9ktp\",\n    augno.AugnoPublicAPIGetScanningStationParams{\n\n    },\n  )\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.ID)\n}\n"
    },
    "update-scanning-station": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.updateScanningStation(\n  'scst_01jm4r6700f8nwq3v5hx2d9ktp',\n  { name: 'Station B' },\n);\n\nconsole.log(response.id);",
        "curl": "curl API_HOST/v1/operations/scanning-stations/$ID \\\n    -X PATCH \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.update_scanning_station(\n    id=\"scst_01jm4r6700f8nwq3v5hx2d9ktp\",\n    name=\"Station B\",\n)\nprint(response.id)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.UpdateScanningStation(\n    context.TODO(),\n    \"scst_01jm4r6700f8nwq3v5hx2d9ktp\",\n    augno.AugnoPublicAPIUpdateScanningStationParams{\n      Name: augno.F(\"Station B\"),\n    },\n  )\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.ID)\n}\n"
    },
    "delete-scanning-station": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.deleteScanningStation(\n  'scst_01jm4r6700f8nwq3v5hx2d9ktp',\n);\n\nconsole.log(response);",
        "curl": "curl API_HOST/v1/operations/scanning-stations/$ID \\\n    -X DELETE \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.delete_scanning_station(\n    \"scst_01jm4r6700f8nwq3v5hx2d9ktp\",\n)\nprint(response)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.DeleteScanningStation(context.TODO(), \"scst_01jm4r6700f8nwq3v5hx2d9ktp\")\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response)\n}\n"
    },
    "list-shipping-terms": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.listShippingTerms();\n\nconsole.log(response.data);",
        "curl": "curl API_HOST/v1/operations/shipping-terms \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.list_shipping_terms()\nprint(response.data)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.ListShippingTerms(context.TODO(), augno.AugnoPublicAPIListShippingTermsParams{\n\n  })\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.Data)\n}\n"
    },
    "create-shipping-term": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.createShippingTerm({\n  name: 'Prepaid',\n  type: 'carrier_rate_freight',\n  free_shipping_service_level_ids: [],\n});\n\nconsole.log(response.id);",
        "curl": "curl API_HOST/v1/operations/shipping-terms \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\" \\\n    -d '{\n          \"name\": \"Prepaid\",\n          \"type\": \"carrier_rate_freight\"\n        }'",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.create_shipping_term(\n    name=\"Prepaid\",\n    type=\"carrier_rate_freight\",\n    free_shipping_service_level_ids=[],\n)\nprint(response.id)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.NewShippingTerm(context.TODO(), augno.AugnoPublicAPINewShippingTermParams{\n    Name: augno.F(\"Prepaid\"),\n    Type: augno.F(augno.AugnoPublicAPINewShippingTermParamsTypeCarrierRateFreight),\n    FreeShippingServiceLevelIDs: augno.F([]string{}),\n  })\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.ID)\n}\n"
    },
    "retrieve-shipping-term": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.retrieveShippingTerm(\n  'shtm_01jm4r6700f8nwq3v5hx2d9ktp',\n);\n\nconsole.log(response.id);",
        "curl": "curl API_HOST/v1/operations/shipping-terms/$ID \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.retrieve_shipping_term(\n    id=\"shtm_01jm4r6700f8nwq3v5hx2d9ktp\",\n)\nprint(response.id)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.GetShippingTerm(\n    context.TODO(),\n    \"shtm_01jm4r6700f8nwq3v5hx2d9ktp\",\n    augno.AugnoPublicAPIGetShippingTermParams{\n\n    },\n  )\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.ID)\n}\n"
    },
    "update-shipping-term": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.updateShippingTerm('shtm_01jm4r6700f8nwq3v5hx2d9ktp', {\n  name: 'Collect',\n});\n\nconsole.log(response.id);",
        "curl": "curl API_HOST/v1/operations/shipping-terms/$ID \\\n    -X PATCH \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.update_shipping_term(\n    id=\"shtm_01jm4r6700f8nwq3v5hx2d9ktp\",\n    name=\"Collect\",\n)\nprint(response.id)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.UpdateShippingTerm(\n    context.TODO(),\n    \"shtm_01jm4r6700f8nwq3v5hx2d9ktp\",\n    augno.AugnoPublicAPIUpdateShippingTermParams{\n      Name: augno.F(\"Collect\"),\n    },\n  )\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.ID)\n}\n"
    },
    "delete-shipping-term": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.deleteShippingTerm('shtm_01jm4r6700f8nwq3v5hx2d9ktp');\n\nconsole.log(response);",
        "curl": "curl API_HOST/v1/operations/shipping-terms/$ID \\\n    -X DELETE \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.delete_shipping_term(\n    \"shtm_01jm4r6700f8nwq3v5hx2d9ktp\",\n)\nprint(response)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.DeleteShippingTerm(context.TODO(), \"shtm_01jm4r6700f8nwq3v5hx2d9ktp\")\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response)\n}\n"
    },
    "list-account-groups": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.listAccountGroups();\n\nconsole.log(response.data);",
        "curl": "curl API_HOST/v1/sales/account-groups \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.list_account_groups()\nprint(response.data)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.ListAccountGroups(context.TODO(), augno.AugnoPublicAPIListAccountGroupsParams{\n\n  })\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.Data)\n}\n"
    },
    "create-account-group": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.createAccountGroup({\n  name: 'Wholesale Customers',\n  type: 'type_group',\n});\n\nconsole.log(response.id);",
        "curl": "curl API_HOST/v1/sales/account-groups \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\" \\\n    -d '{\n          \"name\": \"Wholesale Customers\",\n          \"type\": \"type_group\"\n        }'",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.create_account_group(\n    name=\"Wholesale Customers\",\n    type=\"type_group\",\n)\nprint(response.id)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.NewAccountGroup(context.TODO(), augno.AugnoPublicAPINewAccountGroupParams{\n    Name: augno.F(\"Wholesale Customers\"),\n    Type: augno.F(augno.AugnoPublicAPINewAccountGroupParamsTypeTypeGroup),\n  })\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.ID)\n}\n"
    },
    "retrieve-account-group": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.retrieveAccountGroup(\n  'acgp_01jm4r6700f8nwq3v5hx2d9ktp',\n);\n\nconsole.log(response.id);",
        "curl": "curl API_HOST/v1/sales/account-groups/$ID \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.retrieve_account_group(\n    \"acgp_01jm4r6700f8nwq3v5hx2d9ktp\",\n)\nprint(response.id)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.GetAccountGroup(context.TODO(), \"acgp_01jm4r6700f8nwq3v5hx2d9ktp\")\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.ID)\n}\n"
    },
    "update-account-group": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.updateAccountGroup('acgp_01jm4r6700f8nwq3v5hx2d9ktp', {\n  name: 'Updated Wholesale Customers',\n});\n\nconsole.log(response.id);",
        "curl": "curl API_HOST/v1/sales/account-groups/$ID \\\n    -X PATCH \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.update_account_group(\n    id=\"acgp_01jm4r6700f8nwq3v5hx2d9ktp\",\n    name=\"Updated Wholesale Customers\",\n)\nprint(response.id)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.UpdateAccountGroup(\n    context.TODO(),\n    \"acgp_01jm4r6700f8nwq3v5hx2d9ktp\",\n    augno.AugnoPublicAPIUpdateAccountGroupParams{\n      Name: augno.F(\"Updated Wholesale Customers\"),\n    },\n  )\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.ID)\n}\n"
    },
    "delete-account-group": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.deleteAccountGroup('acgp_01jm4r6700f8nwq3v5hx2d9ktp');\n\nconsole.log(response);",
        "curl": "curl API_HOST/v1/sales/account-groups/$ID \\\n    -X DELETE \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.delete_account_group(\n    \"acgp_01jm4r6700f8nwq3v5hx2d9ktp\",\n)\nprint(response)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.DeleteAccountGroup(context.TODO(), \"acgp_01jm4r6700f8nwq3v5hx2d9ktp\")\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response)\n}\n"
    },
    "list-account-statuses": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.listAccountStatuses();\n\nconsole.log(response.data);",
        "curl": "curl API_HOST/v1/sales/account-statuses \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.list_account_statuses()\nprint(response.data)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.ListAccountStatuses(context.TODO(), augno.AugnoPublicAPIListAccountStatusesParams{\n\n  })\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.Data)\n}\n"
    },
    "retrieve-account-status": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.retrieveAccountStatus(\n  'acss_01jm4r6700f8nwq3v5hx2d9ktp',\n);\n\nconsole.log(response.id);",
        "curl": "curl API_HOST/v1/sales/account-statuses/$ID \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.retrieve_account_status(\n    id=\"acss_01jm4r6700f8nwq3v5hx2d9ktp\",\n)\nprint(response.id)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.GetAccountStatus(\n    context.TODO(),\n    \"acss_01jm4r6700f8nwq3v5hx2d9ktp\",\n    augno.AugnoPublicAPIGetAccountStatusParams{\n\n    },\n  )\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.ID)\n}\n"
    },
    "list-addresses": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.listAddresses();\n\nconsole.log(response.data);",
        "curl": "curl API_HOST/v1/sales/addresses \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.list_addresses()\nprint(response.data)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.ListAddresses(context.TODO(), augno.AugnoPublicAPIListAddressesParams{\n\n  })\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.Data)\n}\n"
    },
    "create-address": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.createAddress({ country: 'US', name: 'Headquarters' });\n\nconsole.log(response.id);",
        "curl": "curl API_HOST/v1/sales/addresses \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\" \\\n    -d '{\n          \"country\": \"US\",\n          \"name\": \"Headquarters\"\n        }'",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.create_address(\n    country=\"US\",\n    name=\"Headquarters\",\n)\nprint(response.id)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.NewAddress(context.TODO(), augno.AugnoPublicAPINewAddressParams{\n    Country: augno.F(\"US\"),\n    Name: augno.F(\"Headquarters\"),\n  })\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.ID)\n}\n"
    },
    "retrieve-address": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.retrieveAddress('ad_01jm4r6700f8nwq3v5hx2d9ktp');\n\nconsole.log(response.id);",
        "curl": "curl API_HOST/v1/sales/addresses/$ID \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.retrieve_address(\n    \"ad_01jm4r6700f8nwq3v5hx2d9ktp\",\n)\nprint(response.id)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.GetAddress(context.TODO(), \"ad_01jm4r6700f8nwq3v5hx2d9ktp\")\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.ID)\n}\n"
    },
    "update-address": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.updateAddress('ad_01jm4r6700f8nwq3v5hx2d9ktp', {\n  name: 'Warehouse',\n});\n\nconsole.log(response.id);",
        "curl": "curl API_HOST/v1/sales/addresses/$ID \\\n    -X PATCH \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.update_address(\n    id=\"ad_01jm4r6700f8nwq3v5hx2d9ktp\",\n    name=\"Warehouse\",\n)\nprint(response.id)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.UpdateAddress(\n    context.TODO(),\n    \"ad_01jm4r6700f8nwq3v5hx2d9ktp\",\n    augno.AugnoPublicAPIUpdateAddressParams{\n      Name: augno.F(\"Warehouse\"),\n    },\n  )\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.ID)\n}\n"
    },
    "delete-address": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.deleteAddress('ad_01jm4r6700f8nwq3v5hx2d9ktp');\n\nconsole.log(response);",
        "curl": "curl API_HOST/v1/sales/addresses/$ID \\\n    -X DELETE \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.delete_address(\n    \"ad_01jm4r6700f8nwq3v5hx2d9ktp\",\n)\nprint(response)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.DeleteAddress(context.TODO(), \"ad_01jm4r6700f8nwq3v5hx2d9ktp\")\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response)\n}\n"
    },
    "list-customers": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.listCustomers();\n\nconsole.log(response.data);",
        "curl": "curl API_HOST/v1/sales/customers \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.list_customers()\nprint(response.data)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.ListCustomers(context.TODO(), augno.AugnoPublicAPIListCustomersParams{\n\n  })\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.Data)\n}\n"
    },
    "create-customer": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.createCustomer({\n  bill_to_address: {\n    name: 'Acme Inc.',\n    type: null,\n    country: 'US',\n  },\n  customer_type_group_id: 'acgp_01jm4r6700f8nwq3v5hx2d9ktp',\n  default_carrier_id: 'cr_01jm4r6700f8nwq3v5hx2d9ktp',\n  default_payment_term_id: 'pytm_01jm4r6700f8nwq3v5hx2d9ktp',\n  default_shipping_term_id: 'shtm_01jm4r6700f8nwq3v5hx2d9ktp',\n  name: 'Acme Inc.',\n  ship_to_address: {\n    name: 'Acme Inc.',\n    type: null,\n    country: 'US',\n  },\n  note: 'Key enterprise account',\n});\n\nconsole.log(response.id);",
        "curl": "curl API_HOST/v1/sales/customers \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\" \\\n    -d '{\n          \"bill_to_address\": {\n            \"country\": \"US\",\n            \"name\": \"Acme Inc.\",\n            \"type\": \"standard\"\n          },\n          \"customer_type_group_id\": \"acgp_01jm4r6700f8nwq3v5hx2d9ktp\",\n          \"default_carrier_id\": \"cr_01jm4r6700f8nwq3v5hx2d9ktp\",\n          \"default_payment_term_id\": \"pytm_01jm4r6700f8nwq3v5hx2d9ktp\",\n          \"default_shipping_term_id\": \"shtm_01jm4r6700f8nwq3v5hx2d9ktp\",\n          \"name\": \"Acme Inc.\",\n          \"ship_to_address\": {\n            \"country\": \"US\",\n            \"name\": \"Acme Inc.\",\n            \"type\": \"standard\"\n          }\n        }'",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.create_customer(\n    bill_to_address={\n        \"name\": \"Acme Inc.\",\n        \"type\": None,\n        \"country\": \"US\",\n    },\n    customer_type_group_id=\"acgp_01jm4r6700f8nwq3v5hx2d9ktp\",\n    default_carrier_id=\"cr_01jm4r6700f8nwq3v5hx2d9ktp\",\n    default_payment_term_id=\"pytm_01jm4r6700f8nwq3v5hx2d9ktp\",\n    default_shipping_term_id=\"shtm_01jm4r6700f8nwq3v5hx2d9ktp\",\n    name=\"Acme Inc.\",\n    ship_to_address={\n        \"name\": \"Acme Inc.\",\n        \"type\": None,\n        \"country\": \"US\",\n    },\n    note=\"Key enterprise account\",\n)\nprint(response.id)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.NewCustomer(context.TODO(), augno.AugnoPublicAPINewCustomerParams{\n    BillToAddress: augno.F(augno.AugnoPublicAPINewCustomerParamsBillToAddress{\n      Name: augno.F(\"Acme Inc.\"),\n      Type: augno.Null[augno.AugnoPublicAPINewCustomerParamsBillToAddressType](),\n      Country: augno.F(\"US\"),\n    }),\n    CustomerTypeGroupID: augno.F(\"acgp_01jm4r6700f8nwq3v5hx2d9ktp\"),\n    DefaultCarrierID: augno.F(\"cr_01jm4r6700f8nwq3v5hx2d9ktp\"),\n    DefaultPaymentTermID: augno.F(\"pytm_01jm4r6700f8nwq3v5hx2d9ktp\"),\n    DefaultShippingTermID: augno.F(\"shtm_01jm4r6700f8nwq3v5hx2d9ktp\"),\n    Name: augno.F(\"Acme Inc.\"),\n    ShipToAddress: augno.F(augno.AugnoPublicAPINewCustomerParamsShipToAddress{\n      Name: augno.F(\"Acme Inc.\"),\n      Type: augno.Null[augno.AugnoPublicAPINewCustomerParamsShipToAddressType](),\n      Country: augno.F(\"US\"),\n    }),\n    Note: augno.F(\"Key enterprise account\"),\n  })\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.ID)\n}\n"
    },
    "retrieve-customer": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.retrieveCustomer('ac_01gf7a8200er3ar3pkfrb6kk29');\n\nconsole.log(response.id);",
        "curl": "curl API_HOST/v1/sales/customers/$ID \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.retrieve_customer(\n    id=\"ac_01gf7a8200er3ar3pkfrb6kk29\",\n)\nprint(response.id)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.GetCustomer(\n    context.TODO(),\n    \"ac_01gf7a8200er3ar3pkfrb6kk29\",\n    augno.AugnoPublicAPIGetCustomerParams{\n\n    },\n  )\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.ID)\n}\n"
    },
    "update-customer": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.updateCustomer('ac_01gf7a8200er3ar3pkfrb6kk29', {\n  default_carrier_id: 'cr_01jm4r6700f8nwq3v5hx2d9ktp',\n  freight_policy: 'billed_freight',\n  name: 'Acme Corp Updated',\n});\n\nconsole.log(response.id);",
        "curl": "curl API_HOST/v1/sales/customers/$ID \\\n    -X PATCH \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.update_customer(\n    id=\"ac_01gf7a8200er3ar3pkfrb6kk29\",\n    default_carrier_id=\"cr_01jm4r6700f8nwq3v5hx2d9ktp\",\n    freight_policy=\"billed_freight\",\n    name=\"Acme Corp Updated\",\n)\nprint(response.id)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.UpdateCustomer(\n    context.TODO(),\n    \"ac_01gf7a8200er3ar3pkfrb6kk29\",\n    augno.AugnoPublicAPIUpdateCustomerParams{\n      DefaultCarrierID: augno.F(\"cr_01jm4r6700f8nwq3v5hx2d9ktp\"),\n      FreightPolicy: augno.F(augno.AugnoPublicAPIUpdateCustomerParamsFreightPolicyBilledFreight),\n      Name: augno.F(\"Acme Corp Updated\"),\n    },\n  )\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.ID)\n}\n"
    },
    "delete-customer": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.deleteCustomer('ac_01gf7a8200er3ar3pkfrb6kk29');\n\nconsole.log(response);",
        "curl": "curl API_HOST/v1/sales/customers/$ID \\\n    -X DELETE \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.delete_customer(\n    \"ac_01gf7a8200er3ar3pkfrb6kk29\",\n)\nprint(response)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.DeleteCustomer(context.TODO(), \"ac_01gf7a8200er3ar3pkfrb6kk29\")\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response)\n}\n"
    },
    "merge-customers": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.mergeCustomers('ac_01gf7a8200er3ar3pkfrb6kk29', {\n  source_customer_ids: ['ac_01gf7a8200er3ar3pkfrb6kk29'],\n});\n\nconsole.log(response.id);",
        "curl": "curl API_HOST/v1/sales/customers/$ID/actions/merge \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\" \\\n    -d '{\n          \"source_customer_ids\": [\n            \"ac_01gf7a8200er3ar3pkfrb6kk29\"\n          ]\n        }'",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.merge_customers(\n    id=\"ac_01gf7a8200er3ar3pkfrb6kk29\",\n    source_customer_ids=[\"ac_01gf7a8200er3ar3pkfrb6kk29\"],\n)\nprint(response.id)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.MergeCustomers(\n    context.TODO(),\n    \"ac_01gf7a8200er3ar3pkfrb6kk29\",\n    augno.AugnoPublicAPIMergeCustomersParams{\n      SourceCustomerIDs: augno.F([]string{\"ac_01gf7a8200er3ar3pkfrb6kk29\"}),\n    },\n  )\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.ID)\n}\n"
    },
    "list-priorities": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.listPriorities();\n\nconsole.log(response.data);",
        "curl": "curl API_HOST/v1/sales/priorities \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.list_priorities()\nprint(response.data)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.ListPriorities(context.TODO(), augno.AugnoPublicAPIListPrioritiesParams{\n\n  })\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.Data)\n}\n"
    },
    "retrieve-priority": {
        "typescript": "import Augno from '@augno/sdk';\n\nconst client = new Augno({\n  augnoAPIKey: 'YOUR_API_KEY',\n});\n\nconst response = await client.retrievePriority('pi_01jm4r6700f8nwq3v5hx2d9ktp');\n\nconsole.log(response.id);",
        "curl": "curl API_HOST/v1/sales/priorities/$ID \\\n    -H \"Authorization: Bearer $BEARER_TOKEN\"",
        "python": "from augno_sdk import Augno\n\nclient = Augno(\n    augno_api_key=\"YOUR_API_KEY\",\n)\nresponse = client.retrieve_priority(\n    id=\"pi_01jm4r6700f8nwq3v5hx2d9ktp\",\n)\nprint(response.id)",
        "go": "package main\n\nimport (\n  \"context\"\n  \"fmt\"\n\n  \"github.com/stainless-sdks/augno-public-docs-go\"\n  \"github.com/stainless-sdks/augno-public-docs-go/option\"\n)\n\nfunc main() {\n  client := augno.NewClient(\n    option.WithBearerToken(\"My Bearer Token\"),\n  )\n  response, err := client.GetPriority(\n    context.TODO(),\n    \"pi_01jm4r6700f8nwq3v5hx2d9ktp\",\n    augno.AugnoPublicAPIGetPriorityParams{\n\n    },\n  )\n  if err != nil {\n    panic(err.Error())\n  }\n  fmt.Printf(\"%+v\\n\", response.ID)\n}\n"
    }
};

export function getEndpointSnippet(
    operationId: string,
    language: SdkLanguage,
): { code: string; highlightLanguage: SdkSnippetHighlightLanguage } | undefined {
    const raw = RAW_SNIPPETS[operationId]?.[language];
    if (raw === undefined || raw === '') return undefined;
    return {
        code: raw,
        highlightLanguage: HIGHLIGHT_MAP[language],
    };
}

export function hasAnySnippet(operationId: string): boolean {
    const row = RAW_SNIPPETS[operationId];
    if (!row) return false;
    return (
        Boolean(row.typescript?.trim()) ||
        Boolean(row.curl?.trim()) ||
        Boolean(row.python?.trim()) ||
        Boolean(row.go?.trim())
    );
}
