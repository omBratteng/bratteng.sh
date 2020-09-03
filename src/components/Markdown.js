import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Section from 'components/layout/Section'

const Content = styled.article`
	font-size: 1.125rem;
	line-height: 1.625;

	p,
	ul,
	ol,
	blockquote {
		margin: 1.5rem 0;
	}

	h1 {
		font-size: 2.4rem;
		margin-bottom: 0;
	}

	h2 {
		font-size: 1.875rem;
		margin-top: 3rem;
	}

	h3 {
		font-size: 1.5rem;
		margin-top: 2rem;
	}

	h2,
	h3 {
		line-height: 1.375;
		margin-bottom: 1rem;
	}
`

const Markdown = ({ title, content, ...props }) => {
	return (
		<Section {...props} title={title}>
			<Content dangerouslySetInnerHTML={{ __html: content }} />
		</Section>
	)
}

Markdown.propTypes = {
	title: PropTypes.string,
	content: PropTypes.string,
}

export default Markdown
