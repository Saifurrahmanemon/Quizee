# 🧱 Components And Styling

## Components Best Practices

#### Avoid large components with nested rendering functions

Do not add multiple rendering functions inside your application, this gets out of control pretty quickly. What you should do instead is if there is a piece of UI that can be considered as a unit, is to extract it in a separate component.

```javascript
// this is very difficult to maintain as soon as the component starts growing
function Component() {
	function renderItems() {
		return <ul>...</ul>;
	}
	return <div>{renderItems()}</div>;
}

// extract it in a separate component
function Items() {
	return <ul>...</ul>;
}

function Component() {
	return (
		<div>
			<Items />
		</div>
	);
}
```

#### Fully featured component library:

-  [Mantine UI](https://mantine.dev/) - This application uses Mantine UI for styling. Mantine UI is based on emotion. And for almost all of the components style(if styles is not small), it uses createStyles to separate styles from markup.[Reference](https://mantine.dev/styles/create-styles/)

[Example](../src/pages/Admin/CreateQuizes/CreateQuizes.style.ts)

Usage:

```
function Check(){
  const { classes } = useStyles();
  return <div className={classes.container}></div>
}

```
