var name;
var email;
var password;
var confirmation;
var avatar;
var data = {};

function onSignIn(googleUser) {
    data.name = googleUser.getBasicProfile().getName();
    data.email = googleUser.getBasicProfile().getEmail();
    data.password = googleUser.getBasicProfile().getId();
    data.confirmation = googleUser.getBasicProfile().getId();
    data.avatar = googleUser.getBasicProfile().getImageUrl();
    // datalogin.email = googleUser.getBasicProfile().getEmail();
    // datalogin.password = googleUser.getBasicProfile().getId();

    var dataJSON = JSON.stringify(data);

    // console.log(data);
    // console.log(dataJSON);

    $('#signIn').click(function (e) {
        e.preventDefault();
        // console.log(data);
        console.log("test test fuck mark " + dataJSON);

        jQuery.ajax({
            type: "POST",
            // url: "http://localhost:3000/users",
            url: "http://yallanotlobapi.herokuapp.com/users",
            data: dataJSON,
            contentType: "application/json",
            cache: false,
            success: function (response) {
                console.log(response)
                if (response.status == "success") {
                    var Uid = response.user.id;
                            var Uname = response.user.name;
                            var access = response.token;

                            sessionStorage.setItem("userId", Uid);
                            sessionStorage.setItem("userName", Uname);
                            sessionStorage.setItem("axs", access);

                            window.location.href = "./userHome.html";
                }
            },

            error: function () {
                console.log("Hi from failed");
                // $('#alert').append("<div id=\"al\" class=\"alert\"><span>User Already Exist</span><div>");


                console.log("Hello from login 2222" + dataJSON);
                jQuery.ajax({
                    type: "POST",
                    // url: "http://localhost:3000/login",
                    url: "http://yallanotlobapi.herokuapp.com/auth/login",
                    data: dataJSON,
                    contentType: "application/json",
                    cache: false,
                    success: function (response) {
                        // console.log(response)
                        if (response.status == "success") {
                            var Uid = response.user.id;
                            var Uname = response.user.name;
                            var access = response.token;

                            sessionStorage.setItem("userId", Uid);
                            sessionStorage.setItem("userName", Uname);
                            sessionStorage.setItem("axs", access);

                            window.location.href = "./userHome.html";
                        } else if (response.status == "failed") {
                            $('#alert').append("<div id=\"al\" class=\"alert\"><span>Invalid Mail Or Password</span><div>");
                        }
                        console.log("Id =  " + sessionStorage.getItem("userId") + "  Name : " + sessionStorage.getItem("userName"))
                    }

                });



            }

        });
    });




}

