import { Badge, Button, Paper, Text, Title } from '@mantine/core';
import { useStyles } from './QuizCard.style';

interface CardProps {
   image: string;
   title: string;
   category: string;
}

function QuizCard({ image, title, category }: CardProps) {
   const { classes } = useStyles();

   return (
      <Paper
         shadow='md'
         p='xl'
         radius='md'
         sx={{ backgroundImage: `url(${image})` }}
         className={classes.card}
      >
         <div>
            <Text className={classes.category} size='xs'>
               {category}
            </Text>
            <Title order={3} className={classes.title}>
               {title}
            </Title>
         </div>
         <div className={classes.footer}>
            <Button variant='white' color='dark'>
               Play Quize
            </Button>
            <Badge size='lg' variant='gradient'>
               Paid
            </Badge>
         </div>
      </Paper>
   );
}

export default QuizCard;
