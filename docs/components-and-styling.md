# 🧱 Components And Styling

#### Component library:

- This application uses Mantine UI for styling, which is based on [emotion](https://emotion.sh/docs/introduction). For almost all of the components' styles (unless the styles are minimal), it uses createStyles to separate the styles from the main component.[Reference](https://mantine.dev/styles/create-styles/)

[Example](../src/pages/Admin/CreateQuizzes/CreateQuizzes.style.ts)

Usage:

```typescript
//Example.style.ts

import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
  },
}));

// Example.tsx

import { useStyles } from './Example.style';

function Example() {
  const { classes } = useStyles();
  return <div className={classes.root}></div>;
}
```
