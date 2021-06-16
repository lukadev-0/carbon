import router from 'next/router'
import React from 'react'

export default function Index(): JSX.Element {
    if (typeof window !== 'undefined') router.push('/')
    return (
        <div>
            Redirecting...
        </div>
    )
}