import { ChatMessage } from "./App";

const url = "https://us-central1-aiplatform.googleapis.com/v1/projects/parksnrec-hackathon/locations/us-central1/publishers/google/models/chat-bison@001:predict";
const google_api_key = "ya29.a0AfB_byC-0AgOavDh0xpUE83OsylLAwxHeO62PHxg1NglEflsWMSSiJJkcd26gSuBDniLBjL_kd1eI2gsoGIOMU_OnypXr-uT4FKaTCDpEc9kylZU1U5zRIrRGoUf_3EzgHlRj0xUkb0AD4hiM_QMsisJMk0-kEkjc0kV-QaCgYKAfwSARASFQHsvYlsXncNQk7SQlw9XXDF8mzxWg0173"

export async function fetchAIChatResponse(apiKey: string, messages: ChatMessage[]) {
  const resp = await fetch(new Request(url, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${google_api_key}`,
    },
    method: "POST",
    body: JSON.stringify(getBody(apiKey, messages)),
  }));

  const data = await resp.json();
  return data;
}

function getBody (apiKey: string, messages: ChatMessage[]) {
  return {
      instances: [
        {
          context: `You are an API assistant designed to help Yext users manage their Yext Content through the use of the Yext APIs. You should follow the Yext Open API specification to format the api requests. You should use the users given api key as the authorization token. For the account ID you can use 'me'. Your response output should be parsable JSON data that includes the api request url with necessary query parameters, the request method, an optional request body if the request method is a POST or PUT request, and a message to the user describing what actions you just performed. If you need more information from the user before you can perform an action, ask them for it and then use the values they provide. The API Key to use for all requests will be: ${apiKey}. Make sure that you add the required api_key query parameter to the url. Also make sure you add the required v query parameter with the value 20230808. You must always return a message describing what you did or replying to the users question. If a PREV_ID value is provided, only use it if you are doing a PUT or DELETE request. Don't use the PREV_ID value if it is a POST or GET request.`,
          examples: [
            {
              input: {
                author: "user",
                content: "Hello, what can you help me with?"
              },
              output: {
                author: "bot",
                content: JSON.stringify({
                  message: "Hi! I'm the Yext Content Management bot. I can help help you easily perform operations on your Yext content."
                })
              }
            },
            {
              input: {
                author: "user",
                content: "Get all. Get all entities."
              },
              output: {
                author: "bot",
                content: JSON.stringify({
                  message: "Here are all the entities in your account",
                  url: `https://api.yextapis.com/v2/accounts/me/entities?v=20230808&api_key=${apiKey}`,
                  method: "GET"
                })
              }
            },
            {
              input: {
                author: "user",
                content: "Get entities named NYC"
              },
              output: {
                author: "bot",
                content: JSON.stringify({
                  message: "Here are the entities named 'NYC'",
                  url: `https://api.yextapis.com/v2/accounts/me/entities/yext-miami?v=20230808&api_key=${apiKey}&filter={'name':{'$eq':'NYC'}}`,
                  method: "GET",
                })
              }
            },
            {
              input: {
                author: "user",
                content: "Create a new location. PREV_ID=yext-nyc"
              },
              output: {
                author: "bot",
                content: JSON.stringify({
                  message: "Creating a new location requires a name and address. Please provide these values.",
                })
              }
            },
            {
              input: {
                author: "user",
                content: "Get entity yext-miami. Find location yext-miami. Find yext-miami."
              },
              output: {
                author: "bot",
                content: JSON.stringify({
                  message: "Here's the entity with id 'yext-miami'",
                  url: `https://api.yextapis.com/v2/accounts/me/entities/yext-miami?v=20230808&api_key=${apiKey}`,
                  method: "GET",
                })
              }
            },
            {
              input: {
                author: "user",
                content: "Update that entities name to be Yext Miami! PREV_ID=yext-miami"
              },
              output: {
                author: "bot",
                content: JSON.stringify({
                  message: "Ok I updates the yext-miami entity to have the name: 'Yext Miami!'",
                  url: `https://api.yextapis.com/v2/accounts/me/entities/yext-miami?v=20230808&api_key=${apiKey}`,
                  method: "PUT",
                  body: {
                    name: "Yext Miami"
                  }
                })
              }
            },
            {
              input: {
                author: "user",
                content: "Get me the entity where the name is Yext Austin"
              },
              output: {
                author: "bot",
                content: JSON.stringify({
                  message: "Here are the entities where the name is 'Yext Austin'",
                  url: `https://api.yextapis.com/v2/accounts/me/entities?v=20230808&api_key=${apiKey}&filter={'name':{'$eq':'Yext Austin'}}`,
                  method: "GET",
                })
              }
            },
            {
              input: {
                author: "user",
                content: "How about where the name is not Yext Austin."
              },
              output: {
                author: "bot",
                content: JSON.stringify({
                  message: "Here's the entities where the name is not 'Yext Austin'",
                  url: `https://api.yextapis.com/v2/accounts/me/entities?v=20230808&api_key=${apiKey}&filter={'name':{'!$eq':'Yext Austin'}}`,
                  method: "GET",
                })
              }
            },
            {
              input: {
                author: "user",
                content: "Find locations where the boolean c_flagged is true"
              },
              output: {
                author: "bot",
                content: JSON.stringify({
                  message: "Here's the entities where the c_flagged field is true",
                  url: "https://api.yextapis.com/v2/accounts/me/entities?v=20230808&api_key=XXXXXXXXXX&filter={'c_flagged':{'$eq':true}}",
                  method: "GET",
                })
              }
            },
            {
              input: {
                author: "user",
                content: "Delete entity with id yext-spokane"
              },
              output: {
                author: "bot",
                content: JSON.stringify({
                  message: "Ok I've deleted entity 'yext-spokane'.",
                  url: `https://api.yextapis.com/v2/accounts/me/entities/yext-spokane?v=20230808&api_key=${apiKey}`,
                  method: "DELETE",
                })
              }
            },
            {
              input: {
                author: "user",
                content: "Create a new location."
              },
              output: {
                author: "bot",
                content: JSON.stringify({
                  message: "Creating a new location requires a name and address. Please provide these values.",
                })
              }
            },
            {
              input: {
                author: "user",
                content: "Ok name it Yext Jackson Hole and have the address be Jackson Hole, WY."
              },
              output: {
                author: "bot",
                content: JSON.stringify({
                  message: "Creating new location 'Yext Jackson Hole'. Setting the c_flagged field to true for your review.",
                  url: `https://api.yextapis.com/v2/accounts/me/entities?v=20230808&api_key=${apiKey}&entityType=location`,
                  method: "POST",
                  body: {
                    name: "Yext Jackson Hole",
                    address: {
                      "line1": "165 E Broadway Ave",
                      "city": "Jackson Hole",
                      "region": "WY",
                      "postalCode": "83001"
                    },
                    c_flagged: true,
                    meta: {
                      id: 'yext-jackson-hole'
                    }
                  }
                })
              }
            },
            {
              input: {
                author: "user",
                content: "Looks good, unflag the entity."
              },
              output: {
                author: "bot",
                content: JSON.stringify({
                  message: "Ok setting c_flagged to false for entity 'yext-jackson-hole'",
                  url: `https://api.yextapis.com/v2/accounts/me/entities/yext-jackson-hole?v=20230808&api_key=${apiKey}`,
                  method: "PUT",
                  body: {
                    c_flagged: false
                  }
                })
              }
            },
            {
              input: {
                author: "user",
                content: "Create a new location in San Diego CA named Yext Party."
              },
              output: {
                author: "bot",
                content: JSON.stringify({
                  message: "Creating new location 'Yext Party' in San Diego, CA. Setting the c_flagged field to true for your review.",
                  url: `https://api.yextapis.com/v2/accounts/me/entities?v=20230808&api_key=${apiKey}&entityType=location`,
                  method: "POST",
                  body: {
                    name: "Yext Party",
                    address: {
                      "line1": "1222 First Ave",
                      "city": "San Diego",
                      "region": "CA",
                      "postalCode": "92101"
                    },
                    c_flagged: true,
                    meta: {
                      id: 'yext-san-deigo'
                    }
                  }
                })
              }
            },
          ],
          messages: messages
        }
      ],
      parameters: {
        "temperature": 0.2,
        "maxOutputTokens": 256,
        "topP": 0.8,
        "topK": 40
    }
  }
}

const example = {
  input: {
    author: "user",
    content: "XXXXXXX"
  },
  output: {
    author: "bot",
    content: JSON.stringify({
      message: "XXXXXXXXX",
      url: `XXXXXXXX`,
      method: "XXXX",
      body: {}
    })
  }
}