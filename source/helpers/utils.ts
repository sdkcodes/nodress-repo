export function generateUrl(path?: string): string{
    let base_url = `${process.env.APP_URL}`;
    if (path == "" || path == null || path == "undefined" || path=="/"){

        return base_url;
    }
    else{
        return `${base_url}/${path}`
    }
}