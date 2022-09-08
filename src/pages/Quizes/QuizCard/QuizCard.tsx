import { Badge, Button, Paper, Text, Title } from '@mantine/core';
import { IQuize } from '../../../Types/Quizes';
import { useStyles } from './QuizCard.style';

type QuizCardProps = {
   item: IQuize;
};

function QuizCard({ item }: QuizCardProps) {
   const { classes } = useStyles();

   return (
      <Paper
         shadow='md'
         p='xl'
         radius='md'
         sx={{ backgroundImage: `url(${item.img})` }}
         className={classes.card}
      >
         <div>
            <Text className={classes.category} size='xs'>
               {item.name}
            </Text>
            <Title order={3} className={classes.title}>
               {item.description}
            </Title>
         </div>
         <div className={classes.footer}>
            <Button variant='white' color='dark'>
               Play Quiz
            </Button>
            <Badge size='lg' variant='gradient'>
               Paid
            </Badge>
         </div>
      </Paper>
   );
}

export default QuizCard;
