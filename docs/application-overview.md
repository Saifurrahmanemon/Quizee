# 💻 Application Overview

https://user-images.githubusercontent.com/70877552/192136630-ea795124-d47b-4e65-b94f-26bc03ae2a7a.mp4

https://user-images.githubusercontent.com/70877552/192136632-a25f3665-1350-4daf-9f86-4ed1e7988d5f.mp4

The application is a bit hard to explain(I highly recommend playing with the app).

Users can play ready-made quizzes and win exciting prizes. There are two types of quizzes free and paid. for paid quizzes, user has to pay a certain amount of money in order to access those quizzes and the user can ask for a refund if the user wants. Users also can manage all of their paid quizzes.

The quiz itself has some distinct features.

Every Quiz has 2 types of timing: <br>
A. Per question-wise timing. <br>
B. Whole quiz-wise timing.<br>

For example, if the admin chooses question-based timing then he can set a fixed time for a question. All questions will have the same time. Timing will reset for every new question.

If the admin chooses the whole quiz-wise time then the timer will be based on the entire quiz.

If time is over the answer is auto-submitted

Admin can create quizzes(with distinct features that will be discussed later), manage quizzes, manage users, make a refund if he thinks user's refund application is valid and also can work with revenue data.

Quiz answers can be shown in 3 ways: <br>
A/ After Question.<br>
B/ After submission.<br>
C/ After all retakes. <br>

For 'after all retakes' types, users will have the choice to see the answers but their retakes will become zero and won't be able to play this quiz again.

## Data model

Application contains the following models:

- User - can have one of these roles:

  - `ADMIN` can:
    - create/edit/delete quizzes
    - create/edit/delete quiz question
    - create/delete admins
    - update user's refund status
    - read revenue, total submission, total paid and unpaid users.
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
