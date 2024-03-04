import { forwardRef, useContext, useState } from 'react';
import Slide from '@mui/material/Slide';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import { CategoriesDispatchContext } from '../../context/CategoriesContext';
import { TasksDispatchContext, TasksContext } from '../../context/TasksContext';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export default function CategoryDialog({ open, setOpen, category, editMode }) {
  const dispatch = useContext(CategoriesDispatchContext);
  const dispatchTasks = useContext(TasksDispatchContext);
  const tasks = useContext(TasksContext);

  const [name, setName] = useState(editMode ? category.name : '');

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(false);
    editMode ? dispatch({ type: 'changed', category: category, name: name }) : dispatch({ type: 'added', name: name });
    setName('');
    editMode &&
      tasks
        .filter((task) => {
          return task.category.name === category.name;
        })
        .map((task) => {
          dispatchTasks({ type: 'changed', task: task, name: task.name, category: { name: name } });
        });
  };

  const handleCancel = () => {
    setOpen(false);
    setName(editMode ? category.name : '');
  };

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  return (
    <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition} keepMounted>
      <AppBar sx={{ position: 'relative' }} color='secondary'>
        <Toolbar>
          <Typography sx={{ flex: 1 }} variant='h6' component='div'>
            {editMode ? 'Edit the Category' : 'Add a new Category'}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component='form'
        action=''
        display='flex'
        flexDirection='column'
        justifyContent='space-between'
        sx={{ p: '1rem', height: '100%' }}
        onSubmit={handleSubmit}
        autoComplete='off'>
        <TextField
          label='Category Name'
          variant='outlined'
          sx={{ width: '100%', mb: '1rem' }}
          value={name}
          onChange={(e) => handleChangeName(e)}
          required
        />
        <Box display='flex' columnGap='0.5rem'>
          <Button onClick={handleCancel} variant='outlined' color='secondary' sx={{ flexGrow: '1' }}>
            Cancel
          </Button>
          <Button type='submit' variant='contained' sx={{ flexGrow: '1', color: 'white' }}>
            {editMode ? 'Save' : 'Add'}
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}
