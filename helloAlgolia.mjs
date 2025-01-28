// File: helloAlgolia.mjs
import { algoliasearch } from "algoliasearch";

const appID = process.env.NEXT_PUBLIC_APPLICATION_ID;
// API key with `addObject` and `editSettings` ACL
const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const indexName = "PlatformNX-docs-main";

const client = algoliasearch(appID, apiKey);

const record = { objectID: "object-1", name: "test record" };

// Add record to an index
const { taskID } = await client.saveObject({
  indexName,
  body: record,
});

// Wait until indexing is done
await client.waitForTask({
  indexName,
  taskID,
});

// Search for "test"
const { results } = await client.search({
  requests: [
    {
      indexName,
      query: "test",
    },
  ],
});

console.log(JSON.stringify(results));
