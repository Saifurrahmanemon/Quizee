import { createStyles } from '@mantine/core';

export const useStyles = createStyles(() => ({
  wrapper: {
    height: 300,
    paddingTop: 120,
    paddingBottom: 80,
    '@media (max-width: 755px)': {
      paddingTop: 80,
      paddingBottom: 60,
    },
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
}));
