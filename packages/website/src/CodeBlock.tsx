import React from 'react'
import Highlight from 'react-syntax-highlighter'
import CodeColor from 'react-syntax-highlighter/dist/cjs/styles/hljs/vs2015'

interface CodeBlockProps {
    lang?: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    style?: any
}

const codeBlock: React.FC<CodeBlockProps> = ({ children, lang, style }) =>
    (
        <Highlight language={lang ?? 'typescript'} style={CodeColor} customStyle={style}>
            {children}
        </Highlight>
    )

export default codeBlock