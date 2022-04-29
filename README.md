#### Env

```
yarn 1.22.18
node 16.14.2
react ^18.0.0
```

- Wrote a bash script which is run every time the app is run locally or built. The script checks whether node modules exists and also calls another file that I wrote down for aliasing, thus making life easy for the developer. :)
- Set up prettier and eslint for code formatting and coding standards. Set up the json files and the script for it.
- Set up a pre-commit hook using husky. This hook is used to run the tests on every commit.
- Used React 18 and hence createRoot and batching out of the box.
- Used react-router-dom for routing. Set up authenticated and unauthenticated routes.
- Used Chakra UI and scss for css and other custom components.
- Used redux-persist for persisting store.
- Used redux and redux-thunk for state management.
- Used ContextAPI as well for showcasing the usage.
- Used reselect package for structuring the raw data received from the api for rendering purposes.
- Created custom hooks and HOC for certain purposes in the application.
- Used Formik and Yup for forms and form validation.
- Used Jest and React Testing Library for testing. Eventhough I already knew Jest and Enzyme, I found out while researching that the enzyme adapter for react 18 is not available. Even the adapter for react 17 is an open PR. There were articles stating that it's better to move away from enzyme, This is why I learnt about React Testing Library from scratch and implemented it instead of downgrading the react version.
