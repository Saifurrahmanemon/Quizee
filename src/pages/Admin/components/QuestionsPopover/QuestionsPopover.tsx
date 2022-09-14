import { ActionIcon, Button, createStyles, Popover, Text } from '@mantine/core';
import { IconTrash } from '@tabler/icons';
import { QuizType } from '../../../../types/CreateQuizesTypes';

export const useStyles = createStyles(() => ({
   actionIcon: {
      display: 'inline-block',
   },
}));

type QuestionPopoverProps = {
   item: QuizType;
   setQuestions: (newValue: [] | QuizType[]) => void;
   questions: QuizType[];
};

function QuestionsPopover({ item, setQuestions, questions }: QuestionPopoverProps) {
   const { classes } = useStyles();

   const handleOnDeleteQuestion = () => {
      const updatedQuestions = questions.filter((element) => element.question !== item.question);
      setQuestions(updatedQuestions);
   };
   return (
      <>
         <Popover position='bottom' withArrow shadow='md'>
            <Popover.Target>
               <Button variant='default' mx={5}>
                  {item.question?.split(' ').splice(0, 2)}...
               </Button>
            </Popover.Target>
            <ActionIcon onClick={handleOnDeleteQuestion} className={classes.actionIcon} color='red'>
               <IconTrash size={17} stroke={1.5} />
            </ActionIcon>
            <Popover.Dropdown>
               <>
                  <Text size='sm'>Question: {item?.question}</Text>
                  <Text>
                     Options:
                     {item.options.map((option) => (
                        <span key={option.value}> {option?.value},</span>
                     ))}
                  </Text>
                  <Text>
                     Answers:
                     {item.correct.map((correct) => (
                        <span key={correct}> {correct},</span>
                     ))}
                  </Text>
               </>
            </Popover.Dropdown>
         </Popover>
      </>
   );
}

export default QuestionsPopover;
