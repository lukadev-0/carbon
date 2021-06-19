import React from 'react'

import AppBar from './AppBar'

export default function Layout({ children }: { children: React.ReactNode }): JSX.Element {
    return (
        <>
            <AppBar />
            {children}
        </>
    )
}

Layout.layout = (children) => (
    <Layout>
        {children}
    </Layout>
)