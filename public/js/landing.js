
function menu(){
    document.querySelector(".mobil-menu").classList.toggle("active")
}

document.querySelector(".social-button.facebook").addEventListener("click", function () {
    FB.login(function (response) {
        if (response.status == "connected") {
            FB.api("/me", "get", {
                fields: "id,name,picture, email"
            }, function (res) {
                var access_token = FB.getAuthResponse()['accessToken'];
                var ajax = new XMLHttpRequest()
                ajax.open("POST", "/api/login/facebook", true);
                ajax.onload = function () {
                    var res = JSON.parse(ajax.response);
                    if (res.code == 0) return swal("Error !", res.error || "", "error");
                    window.location.href = "/dashboard"
                }
                ajax.send(JSON.stringify({
                    access_token: access_token
                }))
            })
        }
    }, {
        scope: 'public_profile, email'
    });
})

document.querySelector(".social-button.twitter").addEventListener("click", function (e) {
    var ajax = new XMLHttpRequest();
    ajax.open("POST", "/auth/twitter/request_token", true);
    ajax.onreadystatechange = function () {
        if (ajax.readyState != 4 || ajax.status != 200) return;
        try {
            var res = JSON.parse(ajax.response);
            console.log(res)
            if (res.code == 0) return swal(res.error, "", "error");
            window.location.href = res.data;
        } catch (err) {
            swal("Error !", "Somethins wrong. Please try again.", "error")
        }
    };
    ajax.send(JSON.stringify({
        state: "login"
    }));
})

window.addEventListener("DOMContentLoaded", function () {
    if (window.location.search) {
        var queryString = window.location.search.substr(1);
        var query = queryString.split("=")
        if (query[0] == "error") {
            swal("Error !", decodeURIComponent(query[1]), "error")
            history.pushState(null, null, "/login");
        }
    }
})