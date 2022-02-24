import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import appRoutes from './routes';
import { ThemeProvider } from '@mui/material/styles';
import { themeContext } from './context/themeContext';
import CalendarContextProvider from './context/calendarContext';
import NavBar from './components/navbar/Navbar';
function Main() {
  const { theme } = useContext(themeContext);

  return (
    <div
      className='main'
      style={{
        backgroundColor: theme.palette.mode == 'light' ? 'white' : '#121212',
      }}
    >
      <ThemeProvider theme={theme}>
        <CalendarContextProvider>
          <NavBar />
          <Routes>
            {appRoutes.map((route, idx) => (
              <Route path={route.path} element={route.component} key={idx} />
            ))}
          </Routes>
        </CalendarContextProvider>
      </ThemeProvider>
    </div>
  );
}

export default Main;
