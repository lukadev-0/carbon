import React from 'react'
import Header from '../src/Header'
import Head from '../src/Head'

export default function index(): JSX.Element {
    return (
        <div>
            <Head title="Carbon" name="Main Carbon page" description="The main page for Carbon" />
            <Header />
        </div>
    )
}