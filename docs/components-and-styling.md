# 🧱 Components And Styling

#### Component library:

- [Mantine UI](https://mantine.dev/) - This application use Mantine UI for styling. Mantine UI is based on [emotion](https://emotion.sh/docs/introduction). And for almost all of the components style(if styles is not small), it uses createStyles to separate styles from markup.[Reference](https://mantine.dev/styles/create-styles/)

[Example](../src/pages/Admin/CreateQuizes/CreateQuizes.style.ts)

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
