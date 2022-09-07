import { useForm } from '@mantine/form';
import { useAuthState } from 'react-firebase-hooks/auth';
import { TEST_URL } from '../../../api/Api';
import axiosPrivate from '../../../api/AxiosPrivate';
import auth from '../../../firebase.init';
import { ICreateQuizes } from '../../../Types/CreateQuizesTypes';

function CreateQuizes() {
   const [user] = useAuthState(auth);

   const form = useForm<ICreateQuizes>({
      initialValues: {
         name: 'test',
         description: 'hello',
         img: 'hello',
         status: 'hello',
         retake: 0,
         countDownType: 'hello',
         showAnswer: 'hello',
         quize: [
            {
               question: 'hello',
               options: ['hello', 'hello'],
               correct: 2,
            },
         ],
      },
   });

   const handleOnQuizCreate = async (values: ICreateQuizes) => {
      const res = await axiosPrivate.post(`${TEST_URL}/quizes/${user?.email}`, values);
      console.log(res);
   };
   return (
      <div>
         <h1>quize page</h1>
         <form onSubmit={form.onSubmit(handleOnQuizCreate)}>
            <button type='submit'>check</button>
         </form>
      </div>
   );
}

export default CreateQuizes;
