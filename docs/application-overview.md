# 💻 Application Overview



https://user-images.githubusercontent.com/70877552/192110518-abbeaca0-f4cd-4b38-8a4f-209ce1bca049.mp4


https://user-images.githubusercontent.com/70877552/192110514-2cbaca61-8a2b-4ab3-9fd3-ae38a892cf44.mp4


The application is a bit hard explain(I highly reccomend to go and play with the app).

Users can play ready made quizzes and won exciting prices. There are two types of quizzes free and paid. for paid quizzes, user have to pay certain amount of money in order to access those quiz and user can ask for refund if user wants. User also can manage all of there paid quiz.

Quiz it self have some distinct features.

Every Quiz has 2 types of timing:
A. Per question wise timing
B. Whole quiz wise timing.

For example, if admin choose per question based timing then he can set a fix time per question. All questions will have same time.Timing will reset for every new question.

If admin choose Whole quiz wise time then timer will be based on entire quiz.

If time is over all answer is auto submitted

Admin can create quizzes(with distinct features will be discussed later),manage quizzes, manage users, make refund if he think user's refund application is valid and also can work with revenue data.

Quiz answers can be shown in 3 ways:
A/ After Question
B/ After submission
C/ After all retakes

for after all retakes type, user will have choice to see the answers but their retakes will become zero and won't be able play this quiz again.



## Data model

The application contains the following models:

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
