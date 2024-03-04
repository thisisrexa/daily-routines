import { useState } from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

import TaskDialog from '../TaskDialog';

export default function FabButton() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <Box sx={{ position: 'fixed', bottom: '5rem', right: '1.5rem' }}>
        <Fab color='primary' onClick={handleOpen}>
          <AddIcon sx={{ color: 'common.white' }} />
        </Fab>
      </Box>
      <TaskDialog open={open} setOpen={setOpen} />
    </>
  );
}
