# 🗄️ Project Structure

Most of the code lives in the `src` folder and looks like this:

```sh
src
|
+-- api               # api related configs such as custom axios, api urls

+-- assets            # assets folder can contain all the static files such as images,svgs, fonts, etc
|
+-- components        # shared components used across the entire application
|
+-- config            # all the global configuration for example, firebase.init config
|
+-- pages             #  pages based on routes
|
+-- hooks             # shared hooks used across the entire application
|
+-- routes            # routes configuration
|
+-- stores            # for future use
|
+-- theme              # custom theme configuration
|
+-- types             # base types used across the application
|
+-- utils             # shared utility functions
```

In order to scale the application in the easiest and most maintainable way, keep most of the code inside the `pages` folder, which contain pages for different routes. Every `pages` folder contain domain specific code for a given page.

A page could have the following structure:

```sh
src/pages/Quizes
|
+-- components  # components that can be shared through the page
|
+-- hooks       # hooks scoped to a specific feature
|
+-- AnyPage       # Any type of bigger component related to the route
|
+-- index.ts    # entry point for the page, it should serve as the public API of the given page and exports everything that should be used outside the page
```
