import React from 'react';
import { Box, Paper } from '@mui/material';
export default function Day({ number }) {
  return (
    <Box>
      <Paper
        elevation={3}
        sx={{
          width: 128,
          height: 128,
        }}
      >
        {number}
      </Paper>
    </Box>
  );
}
