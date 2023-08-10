# Yext API Assistant

## Note
Google Cloud is difficult as it doesn't give you a permanent API Key. To get this to work you have to run `gcloud auth print-access-token` and then add that as the `google_api_key` in the src/fetchDataChat file.

## Goal
Create a content management assistant that uses generative AI to help users find and make updates to their Yext Content. It should allow users to fetch all entities, apply specific filters, make updates, create new entities, and delete old ones. It will enhance the user experience with managing their content letting them talk to a chat bot instead of manually going into the platform, finding the entities they want, and then making the desired update.

## Special Condsiderations
- With `POST`, `PUT`, and `DELETE` requests there is no "sandbox" mode for the AI to test it's queries without making changes.
  - Look into if this is something that can be done?
  - Use `c_flagged` boolean field to indicate that a change was made by the AI.

## Future Improvements
- Teach AI to make only valid request based on openAPI specification.
- Use the same kind of logic to build out saved search filters.
- Have the AI generate types for a given API request.
- Sandbox mode if not already possible.
- Add for CaC resources to make it easier to create fields, entities, etc.
