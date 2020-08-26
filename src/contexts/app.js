import React, { createContext, useContext } from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider } from 'styled-components'

import { GlobalStyle, lightTheme, darkTheme } from 'styles'
import useDarkMode from 'use-dark-mode'

const AppContext = createContext(undefined)

const useApp = () => {
	const context = useContext(AppContext)

	if (context === undefined) {
		throw new Error('useContext must be used within a AppProvider')
	}

	return context
}

const AppProvider = ({ children }) => {
	const darkMode = useDarkMode(false)

	return (
		<AppContext.Provider value={{ darkMode }}>
			<ThemeProvider theme={darkMode.value ? darkTheme : lightTheme}>
				<GlobalStyle />
				{children}
			</ThemeProvider>
		</AppContext.Provider>
	)
}

AppProvider.propTypes = {
	children: PropTypes.node,
}

export default AppProvider
export { useApp }