export default function typeToIcon(mimeType: string): {icon: string, color: string} {

    let res = {
        icon: 'bi bi-file-earmark-fill',
        color: 'text-black-300'
    }

    // vídeo
    if (/^video\//.test(mimeType)){
        res.icon    = 'bi bi-file-earmark-play-fill'
        res.color = 'text-teal-base'
    }
    // áudio
    else if (/^audio\//.test(mimeType)) {
        res.icon = 'bi bi-file-earmark-music-fill';
        res.color = 'text-teal-base';
    }

    // texto
    else if (/^text\//.test(mimeType)) {
        res.icon = 'bi bi-file-earmark-text-fill';
    }

    // pdf
    else if (/pdf/.test(mimeType)) {
        res.icon = 'bi bi-file-earmark-pdf-fill';
        res.color = 'text-red-base';
    }

    // word
    else if (/word|wordprocessingml/.test(mimeType)) {
        res.icon = 'bi bi-file-earmark-word-fill';
        res.color = 'text-blue-base';
    }

    // excel / planilhas
    else if (/excel|spreadsheetml/.test(mimeType)) {
        res.icon = 'bi bi-file-earmark-spreadsheet-fill';
        res.color = 'text-green-base';
    }

    // powerpoint
    else if (/powerpoint|presentationml/.test(mimeType)) {
        res.icon = 'bi bi-file-earmark-slides-fill';
        res.color = 'text-orange-300';
    }

    // compactados
    else if (
        /zip|rar|7z|gzip|tar|compressed/.test(mimeType)
    ) {
        res.icon = 'bi bi-file-earmark-zip-fill';
        res.color = 'text-orange-base';
    }

    // código / scripts
    else if (
        /javascript|typescript|python|php|json|xml|html|css|java|x-c/.test(mimeType)
    ) {
        res.icon = 'bi bi-file-earmark-code-fill';
        res.color = 'text-blue-500';
    }

    // executáveis
    else if (
        /x-msdownload|octet-stream|x-executable/.test(mimeType)
    ) {
        res.icon = 'bi bi-file-earmark-binary-fill';
        res.color = 'text-teal-500';
    }

    return res
}