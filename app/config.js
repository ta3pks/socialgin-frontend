module.exports = {
  api_url : "http://socialgin.com:8080/",
  facebook : {
    register : "register/fb",
    authenticate : "authenticate/fb",
    addAccount : "accounts/add/fb",
    addPage : "accounts/add/fb/page",
    addGroup : "accounts/add/fb/group",
  },
  twitter : {
    register : "register/tw",
    request_token : "twitter/requesttoken",
    authenticate : "authenticate/tw",
    addAccount : "accounts/add/tw",
    access_token : "twitter/accesstoken"
  },
  email : {
    register : "register",
    authenticate : "authenticate"
  },
  removeAccount : "accounts/remove",
  authorize : "authorize",
  dashboard_uri : "dashboard.html",
  getUserData : "user/get",
  getAccounts : "user/getaccounts"
};