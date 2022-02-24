import { memo, useContext } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Switch,
  FormControlLabel,
} from '@mui/material';

import { themeContext } from '../../context/themeContext';
const NavBar = () => {
  const { theme, colorMode } = useContext(themeContext);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <Typography
            variant='h6'
            component='div'
            sx={{ flexGrow: 1, marginTop: '0' }}
          >
            Hernan's Calendar :D
          </Typography>
          <Box style={{ display: 'flex' }}>
            <FormControlLabel
              control={
                <Switch
                  checked={theme.palette.mode === 'dark'}
                  onChange={colorMode.toggleColorMode}
                  aria-label='login switch'
                />
              }
              label={theme.palette.mode === 'dark' ? 'Dark Mode' : 'Light Mode'}
            />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default memo(NavBar);
