import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from '../src/theme'
import { Provider as AuthProvider } from 'next-auth/client'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function MyApp(props) {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { Component, pageProps } = props

    const getLayout = Component.layout ?? (children => children)

    React.useEffect(() => {
    // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side')
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles)
        }
    }, [])

    return (
        <React.Fragment>
            <Head>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
            </Head>
            <AuthProvider session={pageProps.session}>
                <ThemeProvider theme={theme}>
                    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                    <CssBaseline />

                    {getLayout(
                        <Component {...pageProps} />,
                    )}
                </ThemeProvider>
            </AuthProvider>
        </React.Fragment>
    )
}

MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object.isRequired,
}