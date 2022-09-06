import { Avatar, Burger, Container, Group, Menu, Tabs, Text, UnstyledButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { Login, Logout } from 'tabler-icons-react';
import quizeLogo from '../../assets/svg/quizelogo.svg';
import auth from '../../firebase.init';
import { useStyles } from './Navbar.styles';
import { tabs } from './util';

function Navbar() {
   const { classes, theme, cx } = useStyles();
   const [opened, { toggle }] = useDisclosure(false);

   const navigate = useNavigate();
   const [user] = useAuthState(auth);

   const items = tabs.map((tab) => (
      <Tabs.Tab value={tab.value} key={tab.value}>
         {tab.value}
      </Tabs.Tab>
   ));

   const signoutUser = user ? (
      <Logout onClick={() => signOut(auth)} className={classes.logout} strokeOpacity={1} />
   ) : (
      <Login onClick={() => navigate('/register')} className={classes.login} strokeOpacity={1} />
   );

   return (
      <div className={classes.header}>
         <Container className={classes.mainSection}>
            <img src={quizeLogo} className={classes.logo} alt='' />
            <Group position='apart'>
               <Burger
                  opened={opened}
                  onClick={toggle}
                  className={classes.burger}
                  size='sm'
                  color={theme.white}
               />

               <Menu width={240} position='bottom-end' transition='pop-top-right'>
                  {signoutUser}
                  <Menu.Target>
                     <UnstyledButton className={cx(classes.user)}>
                        <Group spacing={7}>
                           <Avatar
                              src={user?.photoURL}
                              alt={user?.displayName || 'guest'}
                              radius='xl'
                              size={16}
                           />
                           <Text
                              weight={500}
                              size='xs'
                              sx={{ lineHeight: 1, color: theme.white }}
                              mr={3}
                           >
                              {user?.displayName || 'Guest'}
                           </Text>
                        </Group>
                     </UnstyledButton>
                  </Menu.Target>
               </Menu>
            </Group>
         </Container>
         <Container>
            <Tabs
               variant='outline'
               classNames={{
                  root: classes.tabs,
                  tabsList: classes.tabsList,
                  tab: classes.tab,
               }}
               onTabChange={(value) => navigate(`/${value?.toLocaleLowerCase()}`)}
            >
               <Tabs.List>{items}</Tabs.List>
            </Tabs>
         </Container>
      </div>
   );
}

export default Navbar;
