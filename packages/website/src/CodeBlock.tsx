import React from 'react'
import Highlight from 'react-syntax-highlighter'
import CodeColor from 'react-syntax-highlighter/dist/cjs/styles/hljs/vs2015'

interface CodeBlockProps {
    lang?: string
}

const codeBlock: React.FC<CodeBlockProps> = ({ children, lang }) =>
    (
        <Highlight language={lang ?? 'typescript'} style={CodeColor}>
            {children}
        </Highlight>
    )

export default codeBlock