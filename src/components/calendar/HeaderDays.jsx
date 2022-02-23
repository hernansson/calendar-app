import { Box, StyledCard } from '@mui/material';

export default function HeaderDays() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
      <StyledCard
        elevation={3}
        sx={{
          width: 128,
          height: 128,
        }}
      ></StyledCard>
    </Box>
  );
}
