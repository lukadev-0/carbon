import React from 'react'
import { GetStaticPropsResult, GetStaticPropsContext, GetStaticPathsResult } from 'next'
import { getDoc, getDocs } from '../../util/developerDocs'

interface Props {
    content: string
}

export default function DeveloperDoc({ content }: Props): JSX.Element {
    return (
        <pre>{content}</pre>
    )
}

export async function getStaticProps(
    context: GetStaticPropsContext,
): Promise<GetStaticPropsResult<Props>> {
    console.log('getStaticProps')

    const { content } = await getDoc(context.params.id as string)

    console.log('getDoc finished')

    return {
        props: {
            content,
        },
    }
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
    console.log('getStaticPaths')

    const docs = await getDocs()

    console.log('getDocs finished')

    return {
        paths: Object.values(docs).map(doc => ({
            params: {
                id: doc.id,
            },
        })),
        fallback: false,
    }
}