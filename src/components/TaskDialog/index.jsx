import { forwardRef, useContext, useState } from 'react';
import Slide from '@mui/material/Slide';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import { TasksDispatchContext } from '../../context/TasksContext';
import { CategoriesContext } from '../../context/CategoriesContext';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export default function TaskDialog({ open, setOpen, editMode, task }) {
  const dispatchTasks = useContext(TasksDispatchContext);
  const categories = useContext(CategoriesContext);

  const [name, setName] = useState(editMode ? task.name : '');
  const [category, setCategory] = useState(editMode ? task.category : categories[0]);
  const [inputCategory, setInputCategory] = useState('');

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    const theCategory = categories.find((categoryValue) => {
      return category.name === categoryValue.name;
    });
    e.preventDefault();
    setOpen(false);
    editMode
      ? dispatchTasks({ type: 'changed', task: task, name: name, category: { name: category.name } })
      : dispatchTasks({
          type: 'added',
          id: Date.now(),
          name: name,
          category: { id: theCategory.id, name: theCategory.name },
        });
    setName(editMode ? task.name : '');
    setCategory(editMode ? task.category : categories[0]);
    setInputCategory('');
  };

  const handleCancelTask = () => {
    setOpen(false);
    setName(editMode ? task.name : '');
    setCategory(editMode ? task.category : categories[0]);
    setInputCategory('');
  };

  const handleChangeTitle = (e) => {
    setName(e.target.value);
  };

  const handleChangeCategory = (newValue) => {
    setCategory(newValue);
  };

  const handleChangeInputCategory = (newInputValue) => {
    setInputCategory(newInputValue);
  };

  return (
    <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition} keepMounted>
      <AppBar sx={{ position: 'relative' }} color='secondary'>
        <Toolbar>
          <Typography sx={{ flex: 1 }} variant='h6' component='div'>
            {editMode ? 'Edit the task' : 'Add a new task'}
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
        <div>
          <TextField
            label='Task Name'
            variant='outlined'
            sx={{ width: '100%', mb: '1rem' }}
            value={name}
            onChange={(e) => handleChangeTitle(e)}
            required
          />
          <Autocomplete
            value={category}
            onChange={(e, newValue) => handleChangeCategory(newValue)}
            inputValue={inputCategory}
            onInputChange={(e, newInputValue) => handleChangeInputCategory(newInputValue)}
            disablePortal
            getOptionLabel={(option) => option.name}
            options={categories}
            sx={{ width: '50%' }}
            renderInput={(params) => <TextField {...params} label='Category' />}
          />
        </div>
        <Box display='flex' columnGap='0.5rem'>
          <Button onClick={handleCancelTask} variant='outlined' color='secondary' sx={{ flexGrow: '1' }}>
            Cancel
          </Button>
          <Button type='submit' variant='contained' sx={{ flexGrow: '1', color: 'white' }}>
            {editMode ? 'Save' : 'Add Task'}
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}
