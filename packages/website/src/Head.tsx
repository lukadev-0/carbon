import React from 'react'
import NextHead from 'next/head'

export default function Head({ title, name, description }: { title: string, name: string, description: string }): JSX.Element {
    return (
        <NextHead>
            <title>{title}</title>
            <meta content={name} property="og:title" />
            <meta
                content={description}
                property="og:description"
            />
            <meta
                content="https://raw.githubusercontent.com/CO-org/branding/master/carbon.png"
                property="og:image"
            />
            <meta content="#7F39FB" data-react-helmet="true" name="theme-color" />
            <link rel="icon" href="https://raw.githubusercontent.com/CO-org/branding/master/carbon.png" sizes="32x32" type="image/png"></link>
        </NextHead>
    )
}