# 🗄️ Project Structure

Most of the code lives in the `src` folder and looks like this:

```sh
src
|
+-- api               # api related configs such as custom axios, api urls
|
+-- assets            # assets folder can contain all the static files such as images,svg's, fonts, etc
|
+-- components        # shared components used across the entire application
|
+-- config            # all the global configuration for example, firebase.init config
|
+-- pages             # pages based on routes
|
+-- hooks             # shared hooks used across the entire application
|
+-- routes            # routes configuration
|
+-- stores            # global store for state management
|
+-- theme             # custom theme configuration
|
+-- types             # base types used across the application
|
+-- utils             # shared utility functions
```

In order to scale the application in the easiest and most maintainable way, most of the codes are inside the `pages` folder, which contains views for different routes. Routes with only `admin` access, are inside the `Admin` folder. Every `pages` folder contains domain-specific code for a given page and `shared` folder inside `pages` contains shared code across these components such as types, styles, and components.

A page could have the following structure:

```sh
src/pages/Quizzes
|
+-- components  # components that can be shared through the page
|
+-- hooks       # hooks scoped to a specific feature
|
+-- AnyPage     # Any type of bigger component related to the route
|
+-- utils       # utils only used across this page
|
+-- index.ts    # entry point for the page, it should serve as the public API of the given page and exports everything that should be used outside the page
```

A component could have the following structure:

```sh
src/components/Navbar
|
+-- components  # helper components for this component(hardly used)
|
+-- Navbar.styles.ts  # styles for this component
|
+-- Navbar.tsx        # component itself.
|
+-- util.ts           # util for only this component
|
+-- index.ts          # entry point for the component.
|
+-- README.md         # doc if logic is complex.

```
