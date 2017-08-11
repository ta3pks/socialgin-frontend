const api = {
  baseURL : "http://localhost:8888/",
  timeout : 10000,
  dashboard_uri: "/dashboard.html",
  facebook: {
    register: "register/fb",
    authenticate: "authenticate/fb",
    addAccount: "accounts/add/fb",
    addPage: "accounts/add/fb/page",
    addGroup: "accounts/add/fb/group",
  },
  twitter: {
    register: "register/tw",
    request_token: "twitter/requesttoken",
    authenticate: "authenticate/tw",
    addAccount: "accounts/add/tw",
    access_token: "twitter/accesstoken"
  },
  email: {
    register: "register",
    authenticate: "authenticate"
  },
  removeAccount: "accounts/remove",
  share: "accounts/share",
  getUserData: "user/get",
  getAccounts: "user/getaccounts",
  setSettings: "user/settings/set",
  getNotifications : "user/notifications/get",
  calendar : "calendar",
  graph : {
    facebook : {
      fans : "graph/facebook/page/fans",
      gender_age : "graph/facebook/page/fans/gender_age",
      country : "graph/facebook/page/fans/country"
    }
  },
  accountTypes : {
    0 : "facebook",
    1 : "twitter"
  }
};

module.exports = api;