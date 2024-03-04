import { useReducer } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { TasksContext, TasksDispatchContext } from './context/TasksContext';
import { CategoriesContext, CategoriesDispatchContext } from './context/CategoriesContext';
import tasksReducer from './context/TasksReducer';
import categoriesReducer from './context/CategoriesReducer';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import CalendarPage from './pages/CalendarPage';
import ProfilePage from './pages/ProfilePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'calendar',
        element: <CalendarPage />,
      },
      {
        path: 'profile',
        element: <ProfilePage />,
      },
    ],
  },
], {
  basename: '/daily-routines'
});

export default function App() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const initialCategories = [{ id: Date.now(), name: 'Personal' }];
  const initialTasks = [{ id: Date.now(), name: 'First Task', completed: false, category: initialCategories[0] }];
  const [tasks, dispatchTasks] = useReducer(tasksReducer, initialTasks);
  const [categories, dispatchCategories] = useReducer(categoriesReducer, initialCategories);

  return isMobile ? (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatchTasks}>
        <CategoriesContext.Provider value={categories}>
          <CategoriesDispatchContext.Provider value={dispatchCategories}>
            <RouterProvider router={router} />
          </CategoriesDispatchContext.Provider>
        </CategoriesContext.Provider>
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  ) : (
    <Container fixed>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Typography component='h1'>To using the app, rotate your phone.</Typography>
      </Box>
    </Container>
  );
}
