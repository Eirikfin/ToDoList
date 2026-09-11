import { useEffect, useState } from "react";


export function useFetch<T>(url: string) {
    const [data, setData] = useState<T | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<Error | null>(null)

   useEffect(() => {
        setLoading(true)
        fetch(url)
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP error: ${res.status}`)
                return res.json()
            })
            .then((json: T) => setData(json))
            .catch((err) => setError(err))
            .finally(() => setLoading(false))
    }, [url])


    return {data, loading, error};
}