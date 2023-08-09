const url = "https://us-central1-aiplatform.googleapis.com/v1/projects/parksnrec-hackathon/locations/us-central1/publishers/google/models/text-bison@001:predict";
const apiKey = "ya29.a0AfB_byBURJU0bUOsj6MsNc9GzUpp0YHclB7K_WdtirJ0CJCIjMT0DGfr-5uvt3xIfFRhjsI8DFZDyLU2xhy_HL4DF7rPnTZ-kUjhIRsExlN4SeMf13cLIrysy-QWiEHaE7cxCMjFsHTB89i-qpuBvLwWQqHS60vnqVEzHwaCgYKAdYSARASFQHsvYlsrZ3RDrJXs92JCc1VPDURZQ0173"

export async function fetchAIResponse(prompt: string) {
  const resp = await fetch(new Request(url, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    method: "POST",
    body: getBody(prompt),
  }));

  const data = await resp.json();
  return data;
}

function getBody (prompt: string) {
  return `{
    "instances": [
        {
            "content": "You are an API assistant designed to help Yext users generate api requests to the Yext APIs. You should follow the Yext Open API specification to format the api requests. You should use the users given api key as the authorization token. For the account ID you can use \\"me\\". Your response output should be parsable JSON data that includes the api request url with necessary query parameters, the request method, an optional request body if the request method is a POST or PUT request, and an optional boolean create intent that represents if the user wants to create or update an entity. The Intent property should be true if the user wants to create or update an entity, but has not provided explicit or inferable values to the address and name field.

input: Give me entity with id \\"helloWorld\\". APIKEY=1234567
JSON: {
  \\"url\\":\\"https://api.yextapis.com/v2/accounts/me/entities/helloWorld?v=20230808&api_key=1234567\\",
  \\"method\\":\\"GET
}

input: Get me all the entities in my account. Filter by entities with the name is \\"Test Location\\". APIKEY=9999999
JSON: {
  \\"url\\":\\"https://api.yextapis.com/v2/accounts/me/entities?v=20230808&api_key=9999999&filter={\'name\':{\'$eq\':\'Test Location\'}}\\",
  \\"method\\":\\"GET\\"
}

input: Entities where name is not Test Location. APIKEY=hello_world
JSON: {
  \\"url\\":\\"https://api.yextapis.com/v2/accounts/me/entities?v=20230808&api_key=hello_world&filter={\'name\':{\'!$eq\':\'Test%20Location\'}}\\",
  \\"method\\":\\"GET\\"
}

input: create a new entity with name Yext Miami, 2545 N Miami Ave. APIKEY=key
JSON: {
  \\"url\\":\\"https://api.yextapis.com/v2/accounts/me/entities?v=20230808&api_key=key&entityType=location\\",
  \\"method\\":\\"POST\\",
  \\"body\\":{
    \\"name\\":\\" Yext Miami.\\",
    \\"address\\": {
        \\"line1\\": \\"2545 N Miami Ave\\",
        \\"city\\": \\"Miami\\",
        \\"region\\": \\"FL\\",
        \\"postalCode\\": \\"33127\\"
    }
  }
}

input: create a new location in San Fransisco, CA. APIKEY=key
JSON: {
  \\"url\\":\\"https://api.yextapis.com/v2/accounts/me/entities?v=20230808&api_key=key&entityType=location\\",
  \\"method\\":\\"POST\\",
  \\"body\\":{
    \\"name\\":\\"Yext San Francisco\\",
    \\"address\\": {
        \\"line1\\": \\"32 St Louis Alley\\",
        \\"city\\": \\"San Francisco\\",
        \\"region\\": \\"CA\\",
        \\"postalCode\\": \\"94133\\"
    }
  }
}

input: create a new location named Yext Jackson
JSON: {
  \\"url\\":\\"https://api.yextapis.com/v2/accounts/me/entities?v=20230808&api_key=key&entityType=location\\",
  \\"method\\":\\"POST\\",
  \\"body\\":{
    \\"name\\":\\"Yext Jackson\\",
  },
  \\"intent\\": true
  }
}

input: entities where c_flagged is true
JSON: {
  \\"url\\":\\"https://api.yextapis.com/v2/accounts/me/entities?v=20230808&api_key=key&filter={\'c_flagged\':{\'$eq\':true}}\\",
  \\"method\\":\\"GET\\"
}

input: ${prompt}
JSON:
"
        }
    ],
    "parameters": {
        "temperature": 0.2,
        "maxOutputTokens": 1024,
        "topP": 0.8,
        "topK": 40
    }
}`
}