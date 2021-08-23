export const handleRedirectInternal = (history, path) => {
    history.push(`/${path}`)
    window.scrollTo(0, 0)
}
