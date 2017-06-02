export function setText(text) {
    return {
        type: "SET_TEXT",
        payload: text
    }
}

export function setLink(uri) {
    //var urlRegex = '^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$';
    //var url = new RegExp(urlRegex, 'i');
    //if (uri.length < 2083 && url.test(uri)) {}
    return {
        type: "SET_LINK",
        payload: uri
    }
}

export function setDate(date) {
    return {
        type: "SET_DATE",
        payload: date
    }
}

export function addImage(image) {
    return {
        type: "ADD_IMAGE",
        payload: image
    }
}

export function removeImage(i) {
    return {
        type: "REMOVE_IMAGE",
        payload: i
    }
}