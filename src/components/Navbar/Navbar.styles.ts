import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
   header: {
      backgroundColor: theme.fn.variant({ variant: 'filled', color: theme.primaryColor })
         .background,
      borderBottom: `1px solid ${
         theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background
      }`,
      marginBottom: 10,
   },

   mainSection: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
   },

   user: {
      color: theme.white,
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      transition: 'background-color 100ms ease',

      '&:hover': {
         backgroundColor: theme.fn.lighten(
            theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background,
            0.1,
         ),
      },

      [theme.fn.smallerThan('xs')]: {
         display: 'none',
      },
   },

   burger: {
      [theme.fn.largerThan('xs')]: {
         display: 'none',
      },
   },

   userActive: {
      backgroundColor: theme.fn.lighten(
         theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background,
         0.1,
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
      color: theme.colors.red[9],
   },
   login: {
      cursor: 'pointer',
      color: theme.white,
   },

   tab: {
      fontWeight: 500,
      height: 38,
      color: theme.white,
      backgroundColor: 'transparent',
      borderColor: theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background,

      '&:hover': {
         backgroundColor: theme.fn.lighten(
            theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background,
            0.1,
         ),
      },

      '&[data-active]': {
         backgroundColor: theme.fn.lighten(
            theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background,
            0.1,
         ),
         borderColor: theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background,
      },
   },
}));
