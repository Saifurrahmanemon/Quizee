import {
   Box,
   Button,
   Center,
   Container,
   Divider,
   MultiSelect,
   NumberInput,
   Select,
   SimpleGrid,
   Text,
   Textarea,
   TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDebouncedState } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import axios from 'axios';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useAuthState } from 'react-firebase-hooks/auth';
import { TEST_URL } from '../../../api/Api';
import axiosPrivate from '../../../api/AxiosPrivate';
import auth from '../../../firebase.init';
import { ICreateQuizes, QuizType } from '../../../Types/CreateQuizesTypes';
import { useStyles } from './CreateQuizes.style';

const url = `https://api.imgbb.com/1/upload?expiration=600&key=${process.env.REACT_APP_IMGBB_API_KEY}`;

/*
TODO: needs to refactor the code because this fil is becoming hugeee!
TODO: create different component for both dropzone and questions
*might use zustand for maintaining app state from a central place
*/

function CreateQuizes() {
   const [questions, setQuestions] = useDebouncedState<QuizType[] | []>([], 1000);
   const [question, setQuestion] = useState('');
   const [options, setOptions] = useState([{ value: '', label: '' }]);
   const [answers, setAnswers] = useState<string[] | []>([]);
   const [image, setImage] = useState('');
   const [loading, setLoading] = useState(false);
   const [user] = useAuthState(auth);
   const { classes } = useStyles();

   const form = useForm<ICreateQuizes>({
      initialValues: {
         name: '',
         description: '',
         img: '',
         status: '',
         retake: 0,
         countDownType: '',
         showAnswer: '',
         price: 0,
         time: 0,
         quiz: [
            {
               question: '',
               options: [
                  {
                     value: '',
                     label: '',
                  },
               ],
               correct: [''],
            },
         ],
      },
   });
   console.log(questions);

   const handleOnQuestionCreate = () => {
      setLoading(true);
      const getQuestion = {
         question,
         options,
         correct: answers,
      };
      const updatedQuestion = [...questions, getQuestion];
      setQuestions(updatedQuestion);
      setQuestion('');
      setOptions([
         {
            value: '',
            label: '',
         },
      ]);

      showNotification({
         title: 'Question Added successfully',
         message: 'Hey there, your question is added! 🤥',
      });
      setLoading(false);
   };

   // push question to our database

   const handleOnQuizCreate = async (values: ICreateQuizes) => {
      values.img = image;
      values.quiz = questions;
      console.log(values);
      const res = await axiosPrivate.post(`${TEST_URL}/quizes/${user?.email}`, values);
      console.log(res);
   };

   //* disable add question button
   const disableAddQuestion = question.length <= 2 || answers.length < 1;

   //* disable add quiz button until end user adds a question
   console.log(question.length);
   const disableAddQuiz = questions.length < 1;

   //* settings for dropzone
   const onDrop = useCallback(async (acceptedFiles: (string | Blob)[]) => {
      setLoading(true);
      const formData = new FormData();
      formData.append('image', acceptedFiles[0]); // has to be named 'image'!
      const res = await axios.post(url, formData);
      const imageUrl = res.data.data.url;
      console.log(imageUrl);
      setImage(imageUrl);
      setLoading(false);
   }, []);

   const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
      onDrop,
      accept: {
         'image/png': ['.png', '.jpeg', '.bmp', '.jpg', '.avif'],
      },
   });

   // add question our all questions state

   const questionInputs = (
      <div>
         <Textarea
            label='Question '
            placeholder='Type your Question here'
            value={question}
            onChange={(event) => setQuestion(event.currentTarget.value)}
            autosize
            my={10}
            minRows={2}
            maxRows={4}
         />
         <SimpleGrid mb={10} cols={2}>
            <MultiSelect
               label='Chose options for the question'
               data={options}
               placeholder='Select items'
               searchable
               creatable
               getCreateLabel={(query) => `+ Create ${query}`}
               onCreate={(query) => {
                  const item = { value: query, label: query };
                  setOptions((current) => [...current, item]);
                  return item;
               }}
            />{' '}
            <MultiSelect
               data={options}
               creatable
               onChange={(value) => setAnswers(value)}
               label='chose the answer'
               placeholder='chose multiple if answer is multiple'
            />
         </SimpleGrid>

         <Center>
            <Button
               disabled={disableAddQuestion}
               onClick={handleOnQuestionCreate}
               loading={loading}
               variant='filled'
               size='xs'
               mt='sm'
            >
               Add Question
            </Button>
         </Center>
      </div>
   );

   return (
      <Container>
         <Box my={20} px='xs'>
            <h1>Add Quizes:</h1>
            <form onSubmit={form.onSubmit(handleOnQuizCreate)}>
               <SimpleGrid cols={2}>
                  <div className='left'>
                     <TextInput
                        label='Quiz Name'
                        placeholder='Name of your Quiz'
                        classNames={classes}
                        required
                        {...form.getInputProps('name')}
                     />
                     <NumberInput
                        defaultValue={0}
                        classNames={classes}
                        max={10000}
                        min={0}
                        required
                        placeholder='price of the quiz'
                        label='Price'
                        {...form.getInputProps('price')}
                     />

                     <Select
                        label='Question Timer Type'
                        placeholder='Select How Count Time'
                        classNames={classes}
                        data={[
                           { value: 'question', label: 'Per Question' },
                           { value: 'full', label: 'Whole Quiz' },
                        ]}
                        {...form.getInputProps('countDownType')}
                     />
                  </div>
                  <div className='right'>
                     <Select
                        label='Status of the Quiz'
                        placeholder='Pick one'
                        classNames={classes}
                        required
                        data={[
                           { value: 'paid', label: 'Paid' },
                           { value: 'free', label: 'Free' },
                        ]}
                        {...form.getInputProps('status')}
                     />
                     <NumberInput
                        defaultValue={0}
                        classNames={classes}
                        max={10}
                        min={0}
                        required
                        placeholder='Number of retake for this quiz'
                        label='Retakes'
                        withAsterisk
                        {...form.getInputProps('retake')}
                     />
                     <NumberInput
                        defaultValue={0}
                        classNames={classes}
                        max={1000}
                        min={0}
                        required
                        placeholder='total or per quiz time in minute'
                        label='Time'
                        {...form.getInputProps('time')}
                     />
                  </div>
               </SimpleGrid>
               <Select
                  label='When to show answer?'
                  placeholder='Select When to show answer'
                  classNames={classes}
                  data={[
                     { value: 'perQuestion', label: 'After every question' },
                     { value: 'fullSubmission', label: 'After full submission' },
                  ]}
                  {...form.getInputProps('showAnswer')}
               />
               <TextInput
                  label='Description'
                  placeholder='About The Quiz'
                  classNames={{
                     input: classes.descriptionInput,
                     label: classes.label,
                  }}
                  required
                  {...form.getInputProps('description')}
               />

               <Divider my='lg' label='Add Quiz Question' labelPosition='center' />
               {questionInputs}
               <div className={classes.dropzone} {...getRootProps()}>
                  <input {...getInputProps()} />
                  {isDragActive ? (
                     <p>Drop the files here ...</p>
                  ) : (
                     <p>Drag and drop your image here, or click to select files</p>
                  )}
                  <Text>{acceptedFiles[0]?.name}</Text>
               </div>

               <Button
                  disabled={disableAddQuiz}
                  loading={loading}
                  type='submit'
                  mt='lg'
                  fullWidth
                  variant='gradient'
                  gradient={{ from: 'indigo', to: 'cyan' }}
               >
                  Add Quiz
               </Button>
            </form>
         </Box>
      </Container>
   );
}

export default CreateQuizes;
