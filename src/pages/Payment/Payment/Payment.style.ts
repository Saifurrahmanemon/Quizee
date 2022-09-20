import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
	card: {
		backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
	},
	description: {
		fontWeight: 600,
		lineHeight: 1.2,
	},
	body: {
		padding: theme.spacing.md,
	},
}));
