import { Avatar, Burger, Container, Group, Menu, Tabs, Text, UnstyledButton } from '@mantine/core';

import { useDisclosure } from '@mantine/hooks';
import {
   IconChevronDown,
   IconHeart,
   IconLogout,
   IconMessage,
   IconSettings,
   IconStar,
   IconSwitchHorizontal,
} from '@tabler/icons';
import { useState } from 'react';
import quizeLogo from '../../assets/svg/quizelogo.svg';
import { useStyles } from './Navbar.styles';
import { tabs, user } from './util';

function Navbar() {
   const { classes, theme, cx } = useStyles();
   const [opened, { toggle }] = useDisclosure(false);
   const [userMenuOpened, setUserMenuOpened] = useState(false);

   const items = tabs.map((tab) => (
      <Tabs.Tab value={tab} key={tab}>
         {tab}
      </Tabs.Tab>
   ));

   const userAccountInfo = (
      <Menu.Dropdown>
         <Menu.Item icon={<IconHeart size={14} stroke={1.5} color={theme.colors.red[6]} />}>
            Liked posts
         </Menu.Item>
         <Menu.Item icon={<IconStar size={14} stroke={1.5} color={theme.colors.yellow[6]} />}>
            Saved posts
         </Menu.Item>
         <Menu.Item icon={<IconMessage size={14} stroke={1.5} color={theme.colors.blue[6]} />}>
            Your comments
         </Menu.Item>

         <Menu.Label>Settings</Menu.Label>
         <Menu.Item icon={<IconSettings size={14} stroke={1.5} />}>Account settings</Menu.Item>
         <Menu.Item icon={<IconSwitchHorizontal size={14} stroke={1.5} />}>
            Change account
         </Menu.Item>
         <Menu.Item icon={<IconLogout size={14} stroke={1.5} />}>Logout</Menu.Item>
      </Menu.Dropdown>
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

               <Menu
                  width={260}
                  position='bottom-end'
                  transition='pop-top-right'
                  onClose={() => setUserMenuOpened(false)}
                  onOpen={() => setUserMenuOpened(true)}
               >
                  <Menu.Target>
                     <UnstyledButton
                        className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
                     >
                        <Group spacing={7}>
                           <Avatar src={user.image} alt={user.name} radius='xl' size={20} />
                           <Text
                              weight={500}
                              size='sm'
                              sx={{ lineHeight: 1, color: theme.white }}
                              mr={3}
                           >
                              {user.name}
                           </Text>
                           <IconChevronDown size={12} stroke={1.5} />
                        </Group>
                     </UnstyledButton>
                  </Menu.Target>
                  {userAccountInfo}
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
            >
               <Tabs.List>{items}</Tabs.List>
            </Tabs>
         </Container>
      </div>
   );
}

export default Navbar;
