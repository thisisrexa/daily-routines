import { useContext } from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import { keyframes } from '@mui/system';

import TaskNotFound from '../../assets/task-not-found.svg';
import Task from '../Task';
import { TasksContext } from '../../context/TasksContext';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, 5%, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

export default function TaskList({ category }) {
  const tasks = useContext(TasksContext);

  const filterCategories = category
    ? tasks.filter((task) => {
        return task.category.name === category.name && task.completed === false;
      })
    : tasks.filter((task) => {
        return task.completed === false;
      });

  return (
    <>
      {filterCategories.length ? (
        <List>
          {filterCategories.map((task) => {
            return <Task task={task} key={task.id} />;
          })}
        </List>
      ) : (
        <Box
          sx={{
            textAlign: 'center',
            pt: '6rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            animation: `${fadeInUp} 0.5s ease-in`,
          }}>
          <img src={TaskNotFound} style={{ width: '65%', margin: '0 0 2rem' }} />
          <Typography component='p' variant='subtitle1'>
            No tasks in this category.
            <br />
            Click + to create your task.
          </Typography>
        </Box>
      )}
    </>
  );
}
