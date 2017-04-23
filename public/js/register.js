const regexler = {
    email: /^[\w\d\._\-\S]+@[\w\d\.\S]+\.\w{2,}$/
};

document.getElementById("register").addEventListener("click", function (e) {
    var name = document.getElementById("name").value || false;
    if (!name) return swal("Error !", "Please enter your name.", "error");
    var email = document.getElementById("email").value || false;
    if (!email) return swal("Error !", "Please enter your email address.", "error");
    if (!regexler.email.test(email)) return swal("Error !", "Unsuppoerted email address!", "error");
    var password = document.getElementById("password").value || false;
    if (!password) return swal("Error !", "Please enter your password.", "error");
    var password_again = document.getElementById("password_again").value || false;
    if (password != password_again) return swal("Error !", "Please check your password.", "error");
    document.getElementById("register").innerHTML = "Please wait."
    document.getElementById("register").disabled = true;
    var ajax = new XMLHttpRequest();
    ajax.open("POST", "/api/register", true)
    ajax.onload = function () {
        document.getElementById("register").innerHTML = "Register"
        document.getElementById("register").disabled = false;
        var res = JSON.parse(ajax.response);
        if (res.code == 0) return swal("Error !", res.error || "", "error");
        window.location.href = "/dashboard"
    }
    ajax.send(JSON.stringify({
        fullname: name,
        password: password,
        email: email
    }))
})

document.getElementById("login").addEventListener("click", function (e) {
    window.location.href = "/login"
})


document.querySelector(".btn-fb-login").addEventListener("click", function () {
    FB.login(function (response) {
        if (response.status == "connected") {
            FB.api("/me", "get", {
                fields: "id,name,picture, email"
            }, function (res) {
                var access_token = FB.getAuthResponse()['accessToken'];
                var ajax = new XMLHttpRequest()
                ajax.open("POST", "/api/register/facebook", true);
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

document.querySelector(".btn-tw-login").addEventListener("click", function (e) {
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
        state : "register"
    }));
})

window.addEventListener("DOMContentLoaded", function () {
    if (window.location.search) {
        var queryString = window.location.search.substr(1);
        var query = queryString.split("=")
        if (query[0] == "error") {
            swal("Error !", decodeURIComponent(query[1]), "error")
            history.pushState(null, null, "/register");
        }
    }
})