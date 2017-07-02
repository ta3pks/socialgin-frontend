const api_url = "http://localhost:8000/"
module.exports = {
  dashboard_uri: "/dashboard.html",
  facebook: {
    register: api_url + "register/fb",
    authenticate: api_url + "authenticate/fb",
    addAccount: api_url + "accounts/add/fb",
    addPage: api_url + "accounts/add/fb/page",
    addGroup: api_url + "accounts/add/fb/group",
  },
  twitter: {
    register: api_url + "register/tw",
    request_token: api_url + "twitter/requesttoken",
    authenticate: api_url + "authenticate/tw",
    addAccount: api_url + "accounts/add/tw",
    access_token: api_url + "twitter/accesstoken"
  },
  email: {
    register: api_url + "register",
    authenticate: api_url + "authenticate"
  },
  removeAccount: api_url + "accounts/remove",
  share: api_url + "accounts/share/upload",
  authorize: api_url + "authorize",
  getUserData: api_url + "user/get",
  getAccounts: api_url + "user/getaccounts",
};