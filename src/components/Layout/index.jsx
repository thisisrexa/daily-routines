import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import FabButton from '../FabButton';
import Navbar from '../Navbar';
import Header from '../Header';

export default function Layout() {
  return (
    <Container fixed>
      <FabButton />
      <Box>
        <Header />
        <Outlet />
      </Box>
      <Navbar />
    </Container>
  );
}
