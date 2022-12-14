import {
  Anchor,
  Button,
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
import GoogleButton from 'components/SocialButtons';
import auth from 'config/firebase.init';
import useToken from 'hooks/useToken';
import { useEffect } from 'react';
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
  useUpdateProfile,
} from 'react-firebase-hooks/auth';
import { useLocation, useNavigate } from 'react-router-dom';

type FormProps = {
  email: string;
  name?: string;
  password: string;
};

interface LocationType {
  from: { pathname: string };
  myState: string;
}

function AuthenticationForm(props: PaperProps) {
  const [type, toggle] = useToggle(['register', 'login']);
  const [signInWithGoogle, googleUser, loadingGoogle] = useSignInWithGoogle(auth);
  const [createUserWithEmailAndPassword, signUpUser, loadingSignUp, errorSignUp] =
    useCreateUserWithEmailAndPassword(auth);
  const [updateProfile] = useUpdateProfile(auth);
  const [signInWithEmailAndPassword, loginUser, loadingLogin, errorLogin] =
    useSignInWithEmailAndPassword(auth);

  const [token] = useToken(googleUser || signUpUser || loginUser);

  const navigate = useNavigate();

  // did not find type for this one in react router might see later
  const myState = useLocation().state as LocationType;
  const from = myState?.from?.pathname || '/';

  useEffect(() => {
    if (token) {
      navigate(from, { replace: true });
    }
  }, [from, navigate, token]);

  if (errorSignUp || errorLogin) {
    console.log(errorSignUp || errorLogin);
  }

  // 🔑 for form validation 🔑
  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
    },

    validate: ({ email, password }) => ({
      email: /^\S+@\S+$/.test(email) ? null : 'Please Provide a valid email',
      password:
        password.length < 6 ? 'Password should include at least 6 characters' : null,
    }),
  });

  const handleSignUpOnSubmit = async ({ name, password, email }: FormProps) => {
    await createUserWithEmailAndPassword(email, password);
    await updateProfile({ displayName: name });
  };

  const handleLoginOnSubmit = async ({ email, password }: FormProps) => {
    await signInWithEmailAndPassword(email, password);
  };

  const submitGoogleButton =
    loadingGoogle || loadingSignUp || loadingLogin ? (
      <Loader />
    ) : (
      <GoogleButton onClick={() => signInWithGoogle()} radius='xl'>
        Google
      </GoogleButton>
    );

  const handleAuthOnSubmit =
    type === 'login' ? handleLoginOnSubmit : handleSignUpOnSubmit;

  const buttonDisabled = loadingGoogle || loadingLogin || loadingSignUp;

  return (
    <Container size={500} my={40}>
      <Paper radius='md' p='xl' withBorder {...props}>
        <Text size='lg' weight={700}>
          Welcome to Quizee, {type} with
        </Text>

        <Group grow mb='md' mt='md'>
          {submitGoogleButton}
        </Group>

        <Divider label='Or continue with email' labelPosition='center' my='lg' />

        <form onSubmit={form.onSubmit(handleAuthOnSubmit)}>
          <Stack>
            {type === 'register' && (
              <TextInput
                label='Name'
                placeholder='Your name'
                value={form.values.name}
                {...form.getInputProps('name')}
              />
            )}

            <TextInput
              required
              label='Email'
              placeholder='hello@Quizee.dev'
              value={form.values.email}
              {...form.getInputProps('email')}
              error={form.errors.email && 'Invalid email'}
            />

            <PasswordInput
              required
              label='Password'
              placeholder='Your password'
              value={form.values.password}
              {...form.getInputProps('password')}
              error={
                form.errors.password && 'Password should include at least 6 characters'
              }
            />
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
            <Button
              onClick={() => console.log(type)}
              disabled={buttonDisabled}
              type='submit'
            >
              {upperFirst(type)}
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
}

export default AuthenticationForm;
