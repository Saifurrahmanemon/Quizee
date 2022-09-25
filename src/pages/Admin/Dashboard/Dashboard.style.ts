import { createStyles } from '@mantine/core';

const PRIMARY_COL_HEIGHT = 500;
//
export const useStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
  },

  halfHeight: {
    height: PRIMARY_COL_HEIGHT / 3 - theme.spacing.md / 2,
    marginTop: 20,
    marginLeft: 10,
  },

  fullHeight: {
    height: (PRIMARY_COL_HEIGHT / 3 - theme.spacing.md / 2) * 2,
  },
}));
