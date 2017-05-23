module.exports = {
  api_url : "http://socialgin.com:8080/",
  facebook : {
    register : "register/fb",
    authenticate : "authenticate/fb",
    addAccount : "accounts/add/fb"
  },
  twitter : {
    register : "register/tw",
    request_token : "twitter/requesttoken",
    authenticate : "authenticate/tw",
    addAccount : "accounts/add/tw",
    access_token : "twitter/accesstoken"
  },
  authenticate_email : "authenticate",
  authorize : "authorize",
  dashboard_uri : "dashboard.html",
  getUserData : "user/get"
};