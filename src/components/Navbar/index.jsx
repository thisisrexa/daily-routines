import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

export default function Navbar() {
  const [value, setValue] = useState('tasks');
  const theme = useTheme();

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation
        sx={{ backgroundColor: theme.palette.common.white, justifyContent: 'space-around' }}
        value={value}
        onChange={handleChange}>
        <NavLink to='/'>
          {({ isActive }) => (
            <BottomNavigationAction
              label='Tasks'
              value='tasks'
              icon={<ChecklistOutlinedIcon />}
              sx={{
                color: theme.palette.text.secondary,
              }}
              className={isActive ? 'Mui-selected' : ''}
            />
          )}
        </NavLink>
        <NavLink to='/calendar'>
          {({ isActive }) => (
            <BottomNavigationAction
              label='Calendar'
              value='calendar'
              icon={<CalendarMonthOutlinedIcon />}
              sx={{
                color: theme.palette.text.secondary,
              }}
              className={isActive ? 'Mui-selected' : ''}
            />
          )}
        </NavLink>
        <NavLink to='/profile'>
          {({ isActive }) => (
            <BottomNavigationAction
              label='Profile'
              value='profile'
              icon={<AccountCircleOutlinedIcon />}
              sx={{
                color: theme.palette.text.secondary,
              }}
              className={isActive ? 'Mui-selected' : ''}
            />
          )}
        </NavLink>
      </BottomNavigation>
    </Paper>
  );
}
