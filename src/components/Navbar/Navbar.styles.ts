import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
	root: {
		position: 'relative',
		zIndex: 1,
	},
	header: {
		paddingTop: theme.spacing.sm,
		backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
		borderBottom: `1px solid ${
			theme.colorScheme === 'dark' ? 'transparent' : theme.colors.gray[2]
		}`,
		marginBottom: 10,
	},

	mainSection: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
	},

	user: {
		color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
		padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
		borderRadius: theme.radius.sm,
		transition: 'background-color 100ms ease',

		'&:hover': {
			backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
		},

		[theme.fn.smallerThan('sm')]: {
			display: 'none',
		},
	},

	burger: {
		[theme.fn.largerThan('sm')]: {
			display: 'none',
		},
	},

	dropdownTabs: {
		display: 'flex',
		flexDirection: 'column',
	},

	link: {
		display: 'block',
		lineHeight: 1,
		cursor: 'pointer',
		padding: '8px 12px',
		borderRadius: theme.radius.sm,
		textDecoration: 'none',
		color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
		fontSize: theme.fontSizes.sm,
		fontWeight: 500,

		'&:hover': {
			backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
		},

		[theme.fn.smallerThan('sm')]: {
			borderRadius: 0,
			padding: theme.spacing.md,
		},
	},

	userActive: {
		backgroundColor: theme.fn.lighten(
			theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background,
			0.1
		),
	},

	tabs: {
		[theme.fn.smallerThan('sm')]: {
			display: 'none',
		},
	},

	tabsList: {
		borderBottom: '0 !important',
	},
	logo: {
		marginLeft: theme.spacing.sm,
	},

	logout: {
		cursor: 'pointer',
		color: theme.colors.red[7],
	},
	login: {
		cursor: 'pointer',
		color: theme.colors.indigo[9],
	},

	dropdown: {
		position: 'absolute',
		top: 60,
		left: 0,
		right: 0,
		zIndex: 0,
		borderTopRightRadius: 0,
		borderTopLeftRadius: 0,
		borderTopWidth: 0,
		overflow: 'hidden',
		[theme.fn.largerThan('sm')]: {
			display: 'none',
		},
	},

	logoThemeContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 10,
	},

	tab: {
		fontWeight: 500,
		height: 38,
		backgroundColor: 'transparent',

		'&:hover': {
			backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
		},

		'&[data-active]': {
			backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
			borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[2],
		},
	},
}));
