import { Button, ButtonProps } from '@mantine/core';
import { GoogleIcon } from './GoogleIcon';

interface GoogleButtonProps extends ButtonProps {
  onClick: () => Promise<void>;
}

export default function GoogleButton(props: GoogleButtonProps) {
  return <Button leftIcon={<GoogleIcon />} variant='default' color='gray' {...props} />;
}

// ? for future use
// export function FacebookButton(props: ButtonProps) {
//    return (
//       <Button
//          leftIcon={<FacebookIcon />}
//          sx={(theme) => ({
//             backgroundColor: '#4267B2',
//             color: '#fff',
//             '&:hover': {
//                backgroundColor: theme.fn.darken('#4267B2', 0.1),
//             },
//          })}
//          {...props}
//       />
//    );
// }

// Twitter button as anchor

// export default function SocialButtons() {
//    return (
//       <Group position='center' sx={{ padding: 15 }}>
//          <GoogleButton>Continue with Google</GoogleButton>
//          {/* <FacebookButton>Sign in with Facebook</FacebookButton> */}
//       </Group>
//    );
// }
