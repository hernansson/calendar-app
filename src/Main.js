import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import appRoutes from './routes';
import { ThemeProvider } from '@mui/material/styles';
import { themeContext } from './context/themeContext';
import NavBar from './components/navbar/Navbar';
function Main() {
  const { theme } = useContext(themeContext);
  return (
    <div className='main'>
      <ThemeProvider theme={theme}>
        <NavBar />
        <Routes>
          {appRoutes.map((route, idx) => (
            <Route path={route.path} element={route.component} key={idx} />
          ))}
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default Main;
