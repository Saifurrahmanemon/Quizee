import {
   Anchor,
   Button,
   Checkbox,
   Container,
   Divider,
   Group,
   Loader,
   Paper,
   PaperProps,
   PasswordInput,
   Stack,
   Text,
   TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { upperFirst, useToggle } from '@mantine/hooks';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import GoogleButton from '../../../components/SocialButtons';
import auth from '../../../firebase.init';

function AuthenticationForm(props: PaperProps) {
   const [type, toggle] = useToggle(['login', 'register']);
   const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

   const form = useForm({
      initialValues: {
         email: '',
         name: '',
         password: '',
         terms: true,
      },

      validate: {
         email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
         password: (val) =>
            val.length <= 6 ? 'Password should include at least 6 characters' : null,
      },
   });

   const submitButton = loading ? <Loader /> : <Button type='submit'>{upperFirst(type)}</Button>;

   const submitGoogleButton = loading ? (
      <Loader />
   ) : (
      <GoogleButton onClick={() => signInWithGoogle()} radius='xl'>
         Google
      </GoogleButton>
   );

   return (
      <Container size={500} my={40}>
         <Paper radius='md' p='xl' withBorder {...props}>
            <Text size='lg' weight={500}>
               Welcome to Quizee, {type} with
            </Text>

            <Group grow mb='md' mt='md'>
               {submitGoogleButton}
            </Group>

            <Divider label='Or continue with email' labelPosition='center' my='lg' />

            <form
               onSubmit={form.onSubmit(() => {
                  'helo';
               })}
            >
               <Stack>
                  {type === 'register' && (
                     <TextInput
                        label='Name'
                        placeholder='Your name'
                        value={form.values.name}
                        onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
                     />
                  )}

                  <TextInput
                     required
                     label='Email'
                     placeholder='hello@Quizee.dev'
                     value={form.values.email}
                     onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                     error={form.errors.email && 'Invalid email'}
                  />

                  <PasswordInput
                     required
                     label='Password'
                     placeholder='Your password'
                     value={form.values.password}
                     onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                     error={form.errors.password && 'Password should include at least 6 characters'}
                  />

                  {type === 'register' && (
                     <Checkbox
                        label='I accept terms and conditions'
                        checked={form.values.terms}
                        onChange={(event) =>
                           form.setFieldValue('terms', event.currentTarget.checked)
                        }
                     />
                  )}
               </Stack>

               <Group position='apart' mt='xl'>
                  <Anchor
                     component='button'
                     type='button'
                     color='dimmed'
                     onClick={() => toggle()}
                     size='xs'
                  >
                     {type === 'register'
                        ? 'Already have an account? Login'
                        : 'Don not have an account? Register'}
                  </Anchor>
                  {submitButton}
               </Group>
            </form>
         </Paper>
      </Container>
   );
}

export default AuthenticationForm;
