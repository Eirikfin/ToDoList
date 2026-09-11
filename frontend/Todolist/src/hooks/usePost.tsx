

export async function postData<T>(url: string, body: unknown): Promise<T> {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    })

    if (!response.ok) {
        throw new Error(`Failed to send: ${response.status}`)
    }

    return response.json()
}