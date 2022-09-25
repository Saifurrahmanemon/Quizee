import {
  Center,
  Group,
  Text,
  UnstyledButton,
  useMantineColorScheme,
} from '@mantine/core';
import { upperFirst } from '@mantine/hooks';
import { IconMoon, IconSun } from '@tabler/icons';
import { useStyles } from './ToggleColorButton.style';

function ToggleColorButton() {
  const { classes } = useStyles();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const Icon = colorScheme === 'dark' ? IconSun : IconMoon;

  return (
    <Group position='center'>
      <UnstyledButton
        aria-label='Toggle theme'
        className={classes.control}
        onClick={() => toggleColorScheme()}
      >
        <Text size='sm' className={classes.value}>
          {upperFirst(colorScheme === 'light' ? 'dark' : 'light')} theme
        </Text>

        <Center className={classes.iconWrapper}>
          <Icon size={16} stroke={1.5} />
        </Center>
      </UnstyledButton>
    </Group>
  );
}

export default ToggleColorButton;
