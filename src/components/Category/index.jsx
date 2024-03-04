import { useState, useContext } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import EditIcon from '@mui/icons-material/Edit';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import DeleteIcon from '@mui/icons-material/Delete';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Paper from '@mui/material/Paper';
import Menu from '@mui/material/Menu';
import Typography from '@mui/material/Typography';

import CategoryDialog from '../../components/CategoryDialog';
import { CategoriesDispatchContext } from '../../context/CategoriesContext';
import { TasksContext, TasksDispatchContext } from '../../context/TasksContext';

export default function Category({ category, categoryTasks }) {
  const dispatchCategories = useContext(CategoriesDispatchContext);
  const dispatchTasks = useContext(TasksDispatchContext);
  const tasks = useContext(TasksContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const handleOpenMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleEditCategory = () => {
    setOpen(true);
  };
  const handleDeleteCategory = () => {
    tasks
      .filter((task) => {
        return task.category.name === category.name;
      })
      .map((task) => {
        dispatchTasks({ type: 'deleted', task: task });
      });
    dispatchCategories({ type: 'deleted', category: category });
  };

  return (
    <>
      <ListItem
        sx={{
          bgcolor: 'gray.main',
          mb: '.5rem',
          borderRadius: '0.25rem',
          px: '1rem',
        }}
        disableGutters
        secondaryAction={
          <>
            <IconButton onClick={handleOpenMenu}>
              <MoreHorizIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu} elevation={1}>
              <MenuList>
                <Paper sx={{ width: '12rem' }} elevation={0}>
                  <MenuItem onClick={handleEditCategory}>
                    <ListItemIcon>
                      <EditIcon fontSize='small' color='inherit' />
                    </ListItemIcon>
                    <ListItemText>
                      <Typography component='span'>Edit</Typography>
                    </ListItemText>
                  </MenuItem>
                  <MenuItem onClick={handleDeleteCategory}>
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
          </>
        }
        data-id={category.id}>
        <ListItemText primary={`${category.name} (${categoryTasks.length})`} />
      </ListItem>
      <CategoryDialog open={open} setOpen={setOpen} category={category} editMode />
    </>
  );
}
