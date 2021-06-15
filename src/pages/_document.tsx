import type { DocumentContext, DocumentInitialProps } from 'next/document'
import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'

const displayStrategy = process.env.NODE_ENV === 'development' ? 'swap' : 'optional'

export default class Document extends NextDocument {
	static async getInitialProps(context: DocumentContext): Promise<DocumentInitialProps> {
		const sheet = new ServerStyleSheet()
		const originalRenderPage = context.renderPage

		try {
			context.renderPage = () =>
				originalRenderPage({
					enhanceApp: (App) => (props) =>
						sheet.collectStyles(
							<StyleSheetManager>
								<App {...props} />
							</StyleSheetManager>,
						),
				})

			const initialProps = await NextDocument.getInitialProps(context)
			return {
				...initialProps,
				styles: (
					<>
						{initialProps.styles}
						{sheet.getStyleElement()}
					</>
				),
			}
		} finally {
			sheet.seal()
		}
	}

	render(): JSX.Element {
		return (
			<Html lang="en" className="_fonts">
				<Head>
					<link
						rel="stylesheet"
						href={`https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=${displayStrategy}`}
					/>
				</Head>
				<body>
					<script
						dangerouslySetInnerHTML={{
							__html: `(()=>{const e=(()=>{const e=window.localStorage.getItem("theme");if("string"==typeof e)return e;const t=window.matchMedia("(prefers-color-scheme: dark)");return"boolean"==typeof t.matches&&t.matches?"dark":"light"})();document.documentElement.style.setProperty("--initial-color-mode",e),"dark"===e&&document.documentElement.setAttribute("data-theme","dark")})();`,
						}}
					></script>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}

/**
const setInitialColorMode = () => {
	const getInitialColorMode =  () => {
		const persistedColorPreference = window.localStorage.getItem('theme')
		const hasPersistedPreference =
			typeof persistedColorPreference === 'string'

		// If the user has explicitly chosen light or dark,
		// use it. Otherwise, this value will be null.
		if (hasPersistedPreference) {
			return persistedColorPreference
		}

		// If there is no saved preference, use a media query
		const mql = window.matchMedia('(prefers-color-scheme: dark)')
		const hasMediaQueryPreference = typeof mql.matches === 'boolean'

		if (hasMediaQueryPreference) {
			return mql.matches ? 'dark' : 'light'
		}

		// default to 'light'.
		return 'light'
	}

	const colorMode = getInitialColorMode()
	const root = document.documentElement
	root.style.setProperty('--initial-color-mode', colorMode)

	// add HTML attribute if dark mode
	if (colorMode === 'dark')
		document.documentElement.setAttribute('data-theme', 'dark')
}
**/
