import { useMemo, useState, createContext } from 'react'
import { createTheme } from '@mui/material/styles'

export const themeContext = createContext({ toggleColorMode: () => {} })

function ThemeContextProvider({ children }) {
    const [mode, setMode] = useState('light')

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
            },
        }),
        []
    )

    const theme = useMemo(() => createTheme({ palette: { mode } }), [mode])

    return (
        <themeContext.Provider
            value={{
                theme,
                colorMode,
            }}
        >
            {children}
        </themeContext.Provider>
    )
}

export default ThemeContextProvider
