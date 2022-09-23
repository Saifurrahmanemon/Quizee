import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
	card: {
		height: 440,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		backgroundSize: 'cover',
		backgroundPosition: 'center',
	},

	title: {
		fontFamily: `Greycliff CF, ${theme.fontFamily}`,
		fontWeight: 900,
		color: theme.white,
		lineHeight: 1.2,
		fontSize: 32,
		marginTop: theme.spacing.xs,
	},

	category: {
		color: theme.white,
		opacity: 0.7,
		fontWeight: 700,
		textTransform: 'uppercase',
	},

	footer: {
		display: 'flex',
		width: '100%',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	bodyText: {
		color: theme.white,
		marginLeft: 7,
	},
}));
