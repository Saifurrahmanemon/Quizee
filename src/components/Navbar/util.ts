export const user = {
	name: 'Saifur Rahman',
	email: 'saif@fighter.dev',
	image: '',
};

/*
* in manageusers  route:
  * - admin can see total number of users
  * - See quiz payments transactions and refund someone fully if needed.

* in createquizzes  route:
  * - admin can create quizzes
  * - Quiz will have these data : Quiz name, quiz picture, descriptions, free or paid and quiz questions with their options.
  * admin can Add n number of quizzes with n number of options
  * Mark one or more options as answers. If there are more than one answer, user have to choose all the answers to get it right.
  * Quiz can have 2 types of timing. A. Per question wise timing B. Whole quiz wise timing. For example, if admin choose per question based timing then he can set a timer per question. All questions then will have same timer. If admin set 5min per question then all questions should have same timing. Timing will reset for every new question fetched. If timer is set whole quiz wise then it will be more like exam hall where you have to submit your paper within the time. If time becomes 0 for both cases question must be auto submitted

* in managequizzes route:
 * -  Admin can set up if user can see answers as they submit the quiz or they need to wait until the end of the quiz questions
 * - Admin can set if user can see their correct answers as they submit a quiz answer or they have to wait until the end of the all questions
 TODO: * - Admin can set number of retake a user can take. this point is a bit confusing wether this option go inside manage user or not we will see in the future
 * - Admin can set if users should see the answer at the end of submission, or as they answer the question or they cannot see until all retake is taken
 * Answer can be revealed after all the retake is taken or user can choose himself to reveal the answer at the end of the quiz and this will have make a user’s available retake to 0 so that he cannot take any retake
*/

export const adminTabs = [
	{
		value: 'home',
		label: 'Home',
	},
	{
		value: 'manageusers',
		label: 'Manage Users',
	},
	{
		value: 'createquizzes',
		label: 'Create Quizzes',
	},
	{
		value: 'managequizzes',
		label: 'Manage Quizzes',
	},
];

/*


@desc this routes are for admins
* in quizzes route:
  * - user can see See available quiz lists and free or paid
  * - See total number of user took this quiz with the quiz listing
  * - User can enrol to a quiz and start submitting quiz answers based on the settings from admin

* in settings route:
  * - User can see their transactions and refunds if they have any
*/

export const tabs = [
	{
		value: 'home',
		label: 'Home',
	},
	{
		value: 'quizzes',
		label: 'Quizzes',
	},
	{
		value: 'settings',
		label: 'Settings',
	},
];
