module.exports = {
    "/authenticate": {
        success : {
            data : "123456789"
        },
        error : {
            error : "/authenticate de hata var !"
        }
    },
    "/authorize": {
        success : {
            data : "123456789"
        },
        error : {
            error : "/authorize de hata var !"
        }
    },
    "/user/get": {
        success : {
            data : {
                name : "Muhammed Furkan",
                surname : "AYDIN",
                profile_picture : "/public/img/default_profile.png"
            }
        },
        error : {
            error : "/user/get de hata var !"
        }
    },
    "/user/getaccounts": {
        success : {
            data : [
                {
                    id : "123",
                    name : "Jone Facebookkafali",
                    surname : "",
                    profile_picture : "/public/img/default_profile.png",
                    type : "facebook"
                },
                {
                    id : "1234",
                    name : "Jone Twittermanyagi",
                    surname : "",
                    profile_picture : "/public/img/default_profile.png",
                    type : "twitter"
                },
                {
                    id : "12345",
                    name : "Jone Doe",
                    surname : "",
                    profile_picture : "/public/img/default_profile.png",
                    type : "facebook"
                }
            ]
        },
        error : {
            error : "/user/getaccounts de hata var !"
        }
    }
}