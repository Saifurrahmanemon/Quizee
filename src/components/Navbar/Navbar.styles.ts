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
         backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
      },

      [theme.fn.smallerThan('sm')]: {
         borderRadius: 0,
         padding: theme.spacing.md,
      },
   },

   userActive: {
      backgroundColor: theme.fn.lighten(
         theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background,
         0.1,
      ),
   },

   tabs: {},

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
      [theme.fn.smallerThan('xs')]: {
         fontSize: theme.spacing.xs,
      },
   },
}));
