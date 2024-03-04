import { useEffect, useContext, useState } from 'react';
import Sortable from 'sortablejs/modular/sortable.core.esm.js';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

import { CategoriesContext } from '../../context/CategoriesContext';
import { TasksContext } from '../../context/TasksContext';
import Category from '../../components/Category';
import CategoryDialog from '../../components/CategoryDialog';

export default function ProfilePage() {
  const categories = useContext(CategoriesContext);
  const tasks = useContext(TasksContext);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    Sortable.create(document.querySelector('#list'), {
      group: 'localStorage-example',
      ghostClass: 'dragged',
      store: {
        get: function (sortable) {
          var order = localStorage.getItem(sortable.options.group.name);
          return order ? order.split('|') : [];
        },
        set: function (sortable) {
          var order = sortable.toArray();
          localStorage.setItem(sortable.options.group.name, order.join('|'));
        },
      },
    });
  }, []);

  const handleAddCategory = () => {
    setOpen(true);
  };

  return (
    <Box sx={{ pt: '1rem' }}>
      <Divider sx={{ mb: '1rem', color: 'text.primary' }}>Categories</Divider>
      <List
        sx={{
          width: '100%',
          '.dragged': {
            bgcolor: '#ccc',
          },
        }}
        id='list'>
        {categories.map((category) => {
          const filteredTasks = tasks.filter((task) => {
            return task.category.name === category.name;
          });
          return <Category category={category} categoryTasks={filteredTasks} key={category.id} />;
        })}
      </List>
      <Button variant='outlined' sx={{ width: '100%' }} onClick={handleAddCategory}>
        Add Category
      </Button>
      <CategoryDialog open={open} setOpen={setOpen} />
      <Divider sx={{ my: '1.5rem', color: 'text.primary' }}>Example</Divider>
    </Box>
  );
}
