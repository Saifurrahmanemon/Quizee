# 💻 Application Overview

The application is pretty complex.

Users can play ready made quizzes and won exciting prices. There are two types of quizzes free and paid. for paid user have to pay certain amount of money and ask for refund if user wants. user also can manage all of there paid quiz.Quiz it self have some distinct features(will be discussed later).

Admin can create quizzes(with distinct features will be discussed later),manage quizzes, manage users, make refund if he think user's refund application is valid and also can work with revenue data.

[Demo]('not available yet')

## Data model

The application contains the following models:

- User - can have one of these roles:

  - `ADMIN` can:
    - create/edit/delete quizzes
    - create/edit/delete quiz question
    - create/delete admins
    - update user's refund
    - read revenue data
  - `USER` - can:
    - read quizzes and quiz
    - create/delete purchase quizzes

## Get Started

Prerequisites:

- Node 14+
- Yarn 1.22+


To set up the app execute the following commands.

```bash
git clone https://github.com/Saifurrahmanemon/Quizee
cd Quizee
cd backend
npm i
cp .env.example .env
npm run start-dev
cd ..
cp .env.example .env
yarn install
```

##### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

##### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
