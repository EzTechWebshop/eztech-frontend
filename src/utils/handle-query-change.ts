export function HandleQueryChange(label: string, value: any) {
    let query = new URLSearchParams(window.location.search)
    if (!query.has(label)) {
        query.append(label, value)
        return query.toString()
    }
    query.set(label, value)
    return query.toString()
}

export function HandleQueryRemoval(label: string) {
    let query = new URLSearchParams(window.location.search)
    if (!query.has(label)) {
        return query.toString()
    }
    query.delete(label)
    return query.toString()
}
