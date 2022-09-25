import { Group, Paper, Text, ThemeIcon } from '@mantine/core';
import { IconArrowDownRight, IconArrowUpRight } from '@tabler/icons';
import Loading from 'components/Loading';

type StatisticsProps = {
  title: string;
  value: string;
  diff: number;
  isLoading?: boolean;
};

function Statistics({ title, value, diff, isLoading }: StatisticsProps) {
  const DiffIcon = diff > 0 ? IconArrowUpRight : IconArrowDownRight;

  if (isLoading) return <Loading />;

  return (
    <Paper withBorder p='md' radius='md'>
      <Group position='apart'>
        <div>
          <Text
            color='dimmed'
            transform='uppercase'
            weight={700}
            size='xs'
            // className={classes.label}
          >
            {title}
          </Text>
          <Text weight={700} size='xl'>
            {value}
          </Text>
        </div>
        <ThemeIcon
          color='gray'
          variant='light'
          sx={(theme) => ({
            color: diff > 0 ? theme.colors.teal[6] : theme.colors.red[6],
          })}
          size={38}
          radius='md'
        >
          <DiffIcon size={28} stroke={1.5} />
        </ThemeIcon>
      </Group>
      <Text color='dimmed' size='sm' mt='md'>
        <Text component='span' color={diff > 0 ? 'teal' : 'red'} weight={700}>
          {diff}%
        </Text>{' '}
        {diff > 0 ? 'increase' : 'decrease'} compared to last month
      </Text>
    </Paper>
  );
}

export default Statistics;
