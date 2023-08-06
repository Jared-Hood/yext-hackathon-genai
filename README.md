# Yext API Assistant

## Goal
Create a generative AI assistant to help users create API requests to the Yext platform. The AI will use the openAPI specification in order to structure the requests. It will also take a input from the user as to what data they want to retrieve from the request. Once it has constructed the request it will fetch the data and display it for the user.

## Logic Flow
1. Get api_key value from user (just manual input for now) to use in requests.
2. Get input about the types of data / filters the user wants to retrieve.
3. Construct API request that meets the users requirements
4. Fetch the data:
   1. If URL is not valid try to construct it again (x3). Restart if it doesn't. Indicate error type.
   2. If request returns an error, also try again (3x). Restart if it doesn't work. Indicate error type.
   3. If request successfully returns, continue.
5. Display the data retrieved from the request. Also display the request URL that the user can use to run it themselves in the browser.

## Special Condsiderations
- With `POST`, `PUT`, and `DELETE` requests there is no "sandbox" mode for the AI to test it's queries without making changes.
  - Look into if this is something that can be done?


## Training
- Teach AI to make only valid request based on openAPI specification.
- Give AI lots of examples about certain user desires and how to build a request to meet them.

## Future Features
- Use the same kind of logic to build out saved search filters.
- Have the AI generate types for a given API request.
- Sandbox mode if not already possible.
- Add for CaC resources to make it easier to create fields, entities, etc.
