import { useEffect, useState, useCallback } from 'react'

export default function useFetch(url, options, func) {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const refetch = useCallback(async () => {
        setLoading(true)
        try {
            const response = await func()
            setData(response?.json)
        } catch (error) {
            setError(error)
        }
        setLoading(false)
    }, [url, options])

    useEffect(() => {
        refetch()
    }, [url]) // eslint-disable-line

    return {
        data,
        loading,
        error,
        refetch,
    }
}
