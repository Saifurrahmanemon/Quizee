import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
	label: {
		textAlign: 'center',
		fontWeight: 900,
		fontSize: 40,
		lineHeight: 1,
		marginBottom: theme.spacing.xl * 1.5,
		marginTop: theme.spacing.xl * 5,
		color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[4],

		[theme.fn.smallerThan('sm')]: {
			fontSize: 20,
		},
	},
}));
