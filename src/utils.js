function isValidHttpUrl(string) {
    let url;

    try {
        url = new URL(string);
    } catch (_) {
        return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
}

export function addProtocol(url) {
    if (!isValidHttpUrl(url)) return `https://${url}`;
    return url;
}
