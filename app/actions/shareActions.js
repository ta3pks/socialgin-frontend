export function statusUpdate(user, message, date, notification) {
    if (!user || !message || !date) return swal("Error !", "Please write status.", "error")
    let notifications = notification;
    var ajax = new XMLHttpRequest();
    ajax.open("POST", "/api/social-media-share", true);
    ajax.onreadystatechange = function () {
        if (ajax.readyState != 4 || ajax.status != 200) return;
        if (notifications) {
            var res = JSON.parse(ajax.response);
            if (res.code == 0) return notifier.show('Sorry!', 'Could not complete your transaction for this account : ' + res.account, 'danger', '', 4000);
            notifier.show('Success!', 'Your content has been successfully shared on this account: ' + res.account, 'success', '', 4000);
        }
    };
    ajax.send(JSON.stringify({
        user: user,
        message: message,
        date: date,
        type: "status"
    }))
}

export function urlShare(user, message, date, link, notification) {
    if (!user || !date || !link) return swal("Error !", "Please enter url.", "error")
    let notifications = notification;
    var ajax = new XMLHttpRequest();
    ajax.open("POST", "/api/social-media-share", true);
    ajax.onreadystatechange = function () {
        if (ajax.readyState != 4 || ajax.status != 200) return;
        if (notifications) {
            var res = JSON.parse(ajax.response);
            if (res.code == 0) return notifier.show('Sorry!', 'Could not complete your transaction for this account : ' + res.account, 'danger', '', 4000);
            notifier.show('Success!', 'Your content has been successfully shared on this account: ' + res.account, 'success', '', 4000);
        }
    };
    ajax.send(JSON.stringify({
        user: user,
        message: message || "",
        date: date,
        url: link,
        type: "urlShare"
    }))
}

export function imageShare(user, message, date, image, notification) {
    if (!user || !date || !image) return swal("Error !", "Please add a photo.", "error");
    upload(image, (result) => {
        var ajax = new XMLHttpRequest();
        ajax.open("POST", "/api/social-media-share", true);
        const notifications = notification;
        ajax.onreadystatechange = function () {
            if (ajax.readyState != 4 || ajax.status != 200) return;
            var res = JSON.parse(ajax.response);
            if (notifications) {
                if (res.code == 0) return notifier.show('Sorry!', 'Could not complete your transaction for this account : ' + res.account, 'danger', '', 4000);
                notifier.show('Success!', 'Your content has been successfully shared on this account: ' + res.account, 'success', '', 4000);
            }
        };
        ajax.send(JSON.stringify({
            user: user,
            message: message || "",
            date: date,
            image: location.protocol + "//" + window.location.host + "/img/uploaded/" + result,
            imageName : result,
            type: "imageShare"
        }))
    })
}

function upload(image, callback) {
    let formData = new FormData();
    formData.append("image", image);
    var ajax = new XMLHttpRequest();
    ajax.open("POST", "/api/upload", true);
    ajax.onload = function () {
        var res = JSON.parse(ajax.response);
        if (res.code == 0) return notifier.show('Sorry!', 'Picture could not be uploaded. Please try again.', 'danger', '', 4000);
        callback(res.data)
    }
    ajax.send(formData)
}