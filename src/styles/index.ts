import { createGlobalStyle } from 'styled-components'
import { rgba } from 'polished'

// FontAwesome
// Add the css on the server side
import { config } from '@fortawesome/fontawesome-svg-core'
config.autoAddCss = false

import { lightTheme } from 'styles/lightTheme'
import { darkTheme } from 'styles/darkTheme'

const GlobalStyle = createGlobalStyle`
html {
	box-sizing: border-box;
	font-family: 'Space Mono', monospace;
	font-size: 16px;
	-moz-osx-font-smoothing: grayscale;
	-webkit-font-smoothing: antialiased;
	font-style: normal;
	font-weight: 400;
	letter-spacing: 1px;
	-ms-overflow-style: -ms-autohiding-scrollbar;
	text-rendering: optimizeLegibility;
	text-size-adjust: 100%;
}

html,
body,
#__next { height: 100%; }

* { box-sizing: border-box; }

::selection {
	background: ${(props) => rgba(props.theme.colors.linkColor, 0.15)};
}

body {
	background: var(--global-background-color);
	color: var(--global-font-color);
	font-feature-settings: "liga" 1, "lnum" 1, "tnum" 1;
	font-variant-ligatures: common-ligatures;
	line-height: ${(props) => props.theme.font.lineHeight};
	margin: 0;
	transition: background 0.5s ease, color 0.5s ease;

	@supports not (font-variant-ligatures: common-ligatures) {
		font-feature-settings: "liga";
	}

	--red: ${darkTheme.colors.red};

	&.dark-mode {
		--global-background-color: ${darkTheme.colors.background};
		--global-font-color: ${darkTheme.colors.font};
		--global-link-color: ${darkTheme.colors.linkColor};

		--github-hover-color: ${darkTheme.some.github};
		--twitter-hover-color: ${darkTheme.some.twitter};
		--linkedin-hover-color: ${darkTheme.some.linkedin};

		--contentLoader-bg: #353535;
		--contentLoader-fg: #424242;
	}

	&.light-mode {
		--global-background-color: ${lightTheme.colors.background};
		--global-font-color: ${lightTheme.colors.font};
		--global-link-color: ${lightTheme.colors.linkColor};

		--github-hover-color: ${lightTheme.some.github};
		--twitter-hover-color: ${lightTheme.some.twitter};
		--linkedin-hover-color: ${lightTheme.some.linkedin};

		--contentLoader-bg: #f3f3f3;
		--contentLoader-fg: #ecebeb;
	}
}

a {
	color: var(--global-link-color);
	text-decoration: none;

	&:hover:not(.no-bg) {
		background: ${(props) => rgba(props.theme.colors.linkColor, 0.15)};
	}
}

svg:not(:root).svg-inline--fa{overflow:visible;}
.svg-inline--fa{display:inline-block;font-size:inherit;height:1em;overflow:visible;vertical-align:-0.125em;}
.svg-inline--fa.fa-fw{width:1.25em;}

@font-face {
	font-display: swap;
	font-family: 'Space Mono';
	font-style: normal;
	font-weight: 400;
	src: url("data:application/x-font-woff2;base64,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") format("woff2");
}
@font-face {
	font-display: swap;
	font-family: 'Space Mono';
	font-style: normal;
	font-weight: 700;
	src: url("data:application/x-font-woff2;base64,d09GMgABAAAAAAN8AAwAAAAABgAAAAMsAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHCgGYABUEQgKgyCCegsQAAE2AiQDEAQgBYN0ByAb+wTIBB74vPL9P1klK7TOVFiKhThb4UTh5FNPwqmZuKb+0zjP6wMAMxe0p0VqNw54OMBI3GyUQTAaqE8BdgZrkX8eAlAZwK2RicmZhbiOqJswCkcYQdG9hhGjZKO8iFWJtMhSIENHiWr8xeCExNbOxBB4v8DYOiFZ19mKzkSl9v9GUGpFm45YW+4X3+RFWtQ7gBI06e6YOtvcUYjV7bEdEiOT46hnNBMXw6SACV8wPhrXjG3GemP1pDjpEIaBk2hDE1vibSlwqXwCUBVUlCYgdrdVujl6erp5NqiFao1WpZZr5aqmWmlSO/JG63z16hV5wpyXL1+qltvn93dTSzrfCDH3tWp5CXNejS4te/36tRBz37wh/19t54UrJ4SYe/zyedVy9uJRmHPs0rkKTWhoqMzRNFTLZWFSWzSpCvWlarl//bUwaXLOM63zjdi7/ot5vWX3hX+7L1h+up3KbXLlzKyLs9xdQzOGRQzLNofH9qmKdI0yV4XFZuvefXqmrJjjOt8ckZoaYx+TmhoRkZoeZR+Vmk7A9+jB1SmxleaAgEpzSuzg6mj7qMHVKXGV5gwQ90OUWNv9u19sb/fesX7fu0cfJ+br2oezHp6YcuJTr+6Lpjzvc6DPkLVs+jrr26xUV71oZP+/37ulBwTP6hHUzT8sMDXm8El75dpG+aDGKfK3rWb6XBR6MeLtaX/DqxXG0/+H5UalFoHd9ZMw9UxGko3GU+OR3HilOO+RjX6xE2H4Ekt27Wg2dGBNE1Yo9ZR8tjSHLsWOt1YLX0jgLnpAElvhDpnw5xOk0IubkBUTyIWs6UEg70juA61MYAJjCMcHH8bTwDjaGMME0ujN+HuNwJvRjKMFH3JIJpMCxlBHA01kMZpRjGY48WTxCBoppolxXYjSZB0/vPE1h0WQS0FOaP0KHhowdRIf9yYUPz55JHV00FS/rBlvRtBGPf4EGBQPJoBApTd4KarOG/S6qSafQDI6OhHLZ/ymQ/IJpD6GqQckthxcvo4/vvgRTBenMJrRtDAC59NIvoEmPn32CEagk99BHJ/Smxh/VMmTaKIR7z8JLg40TuH/RwoAAAAAAA==") format("woff2");
}
`

export { GlobalStyle, lightTheme, darkTheme }
