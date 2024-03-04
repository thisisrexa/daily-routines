import { useContext, useState } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CircleIcon from '@mui/icons-material/Circle';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Paper from '@mui/material/Paper';
import Menu from '@mui/material/Menu';

import { TasksDispatchContext } from '../../context/TasksContext';
import TaskDialog from '../TaskDialog';

export default function Task({ task }) {
  const dispatch = useContext(TasksDispatchContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  const handleChange = () => {
    setTimeout(() => {
      dispatch({ type: 'completed', task: task });
    }, 300);
  };

  const handleOpenMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleEditTask = () => {
    setOpen(true);
  };

  const handleDeleteTask = () => {
    dispatch({ type: 'deleted', task: task });
  };

  return (
    <>
      <ListItem sx={{ borderBottom: '1px rgba(0, 0, 0, 0.1) solid' }}>
        <ListItemIcon sx={{ minWidth: '0' }}>
          <Checkbox
            edge='start'
            tabIndex={-1}
            icon={<CircleOutlinedIcon />}
            checkedIcon={<CircleIcon />}
            onChange={handleChange}
          />
        </ListItemIcon>
        <ListItemText primary={task.name} secondary='description' />
        <IconButton onClick={handleOpenMenu}>
          <MoreHorizIcon />
        </IconButton>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
          <MenuList>
            <Paper sx={{ width: '12rem' }} elevation={0}>
              <MenuItem onClick={handleEditTask}>
                <ListItemIcon>
                  <EditIcon fontSize='small' color='inherit' />
                </ListItemIcon>
                <ListItemText>
                  <Typography component='span'>Edit</Typography>
                </ListItemText>
              </MenuItem>
              <MenuItem onClick={handleDeleteTask}>
                <ListItemIcon>
                  <DeleteIcon fontSize='small' color='inherit' />
                </ListItemIcon>
                <ListItemText>
                  <Typography component='span'>Delete</Typography>
                </ListItemText>
              </MenuItem>
            </Paper>
          </MenuList>
        </Menu>
      </ListItem>
      <TaskDialog open={open} setOpen={setOpen} editMode task={task} />
    </>
  );
}
