import { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import appRoutes from './routes'
import { themeContext } from './context/themeContext'
import CalendarContextProvider from './context/calendarContext'
import NavBar from './components/navbar/Navbar'

function Main() {
    const { theme } = useContext(themeContext)

    return (
        <div
            className="main"
            style={{
                height: '100vh',
                backgroundColor:
                    theme.palette.mode === 'light' ? 'white' : '#121212',
            }}
        >
            <ThemeProvider theme={theme}>
                <CalendarContextProvider>
                    <NavBar />
                    <Routes>
                        {appRoutes.map((route, idx) => (
                            <Route
                                path={route.path}
                                element={route.component}
                                key={idx}
                            />
                        ))}
                    </Routes>
                </CalendarContextProvider>
            </ThemeProvider>
        </div>
    )
}

export default Main
