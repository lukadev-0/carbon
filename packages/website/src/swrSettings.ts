import { Configuration } from 'swr/dist/types'

export const fetcher = (url: string): unknown => fetch(url).then(r => r.json())
export const options: Partial<Configuration> = {
    onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        if (retryCount >= 20) return
        setTimeout(() => revalidate({ retryCount }), 2000)
    },
}