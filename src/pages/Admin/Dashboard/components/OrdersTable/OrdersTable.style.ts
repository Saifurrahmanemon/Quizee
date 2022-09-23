import { createStyles } from '@mantine/core';

//
export const useStyles = createStyles((theme) => ({
	fullHeight: {
		height: (500 / 3 - theme.spacing.md / 2) * 2,
	},

	header: {
		position: 'sticky',
		top: 0,
		backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
		transition: 'box-shadow 150ms ease',

		'&::after': {
			content: '""',
			position: 'absolute',
			left: 0,
			right: 0,
			bottom: 0,
			borderBottom: `1px solid ${
				theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[2]
			}`,
		},
	},

	scrolled: {
		boxShadow: theme.shadows.sm,
	},

	badge: {
		cursor: 'pointer',
		'&:active': {
			transform: 'scale(1.1)',
		},
	},
}));
