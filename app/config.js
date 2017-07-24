const api_url = "http://api.socialgin.com/"
const api = {
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
  share: api_url + "accounts/share",
  getUserData: api_url + "user/get",
  getAccounts: api_url + "user/getaccounts",
  setSettings: api_url + "user/settings/set",
  getNotifications : api_url + "user/notifications/get",
  calendar : api_url + "calendar",
  graph : {
    facebook : {
      fans : api_url + "graph/facebook/page/fans",
      gender_age : api_url + "graph/facebook/page/fans/gender_age",
      country : api_url + "graph/facebook/page/fans/country"
    }
  },
  accountTypes : {
    0 : "facebook",
    1 : "twitter"
  }
};

module.exports = api;