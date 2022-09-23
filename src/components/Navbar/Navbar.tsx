import {
	ActionIcon,
	Avatar,
	Burger,
	Container,
	Group,
	Menu,
	Paper,
	ScrollArea,
	Tabs,
	Text,
	Transition,
	UnstyledButton,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import QuizLogo from 'assets/svg/quizelogo.svg';
import ToggleColorButton from 'components/ToggleColorButton';
import auth from 'config/firebase.init';
import { signOut } from 'firebase/auth';
import useAdmin from 'hooks/useAdmin';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { Login, Logout } from 'tabler-icons-react';
import { useStyles } from './Navbar.styles';
import { adminTabs, tabs } from './util';

function Navbar() {
	const { classes, cx } = useStyles();
	const [opened, { toggle, close }] = useDisclosure(false);
	const [user] = useAuthState(auth);
	const [admin] = useAdmin(user);

	const navigate = useNavigate();

	const navLinks = admin === true ? adminTabs : tabs;

	const handleOnDropDown = (value: string) => {
		navigate(`/${value}`);
		close();
	};

	const items = navLinks.map((tab) => (
		<Tabs.Tab value={tab.value} key={tab.value}>
			{tab.label}
		</Tabs.Tab>
	));

	const signOutUser = user ? (
		<ActionIcon color='red'>
			<Logout onClick={() => signOut(auth)} className={classes.logout} strokeOpacity={1} />
		</ActionIcon>
	) : (
		<ActionIcon color='blue'>
			<Login onClick={() => navigate('/register')} className={classes.login} strokeOpacity={1} />
		</ActionIcon>
	);

	return (
		<div className={classes.root}>
			<div className={classes.header}>
				<Container className={classes.mainSection}>
					<div className={classes.logoThemeContainer}>
						<img src={QuizLogo} className={classes.logo} alt='' />
						<ToggleColorButton />
					</div>
					<Group position='apart'>
						<Burger opened={opened} onClick={toggle} className={classes.burger} size='sm' />

						<Transition transition='pop-top-right' duration={200} mounted={opened}>
							{(styles) => (
								<Paper className={classes.dropdown} withBorder style={styles}>
									<ScrollArea>
										<Tabs
											variant='outline'
											classNames={{
												tab: classes.link,
											}}
											onTabChange={handleOnDropDown}
										>
											<Tabs.List>{items}</Tabs.List>
										</Tabs>
									</ScrollArea>
								</Paper>
							)}
						</Transition>

						<Menu width={240} position='bottom-end' transition='pop-top-right'>
							{signOutUser}
							<Menu.Target>
								<UnstyledButton className={cx(classes.user)}>
									<Group spacing={7}>
										<Avatar
											src={user?.photoURL}
											alt={user?.displayName || 'guest'}
											radius='xl'
											size={22}
										/>
										<Text weight={500} size='sm' sx={{ lineHeight: 1 }} mr={3}>
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
						onTabChange={(value) => navigate(`/${value}`)}
					>
						<Tabs.List>{items}</Tabs.List>
					</Tabs>
				</Container>
			</div>
		</div>
	);
}

export default Navbar;
