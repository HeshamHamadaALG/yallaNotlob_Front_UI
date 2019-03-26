$('document').ready(function () {

    $('#login_btn').click(function (e) {
        $('#al').remove();
        e.preventDefault();
        var u = {};
        u.email = $('#email').val();
        u.password = $('#password').val();

        let uJSON = JSON.stringify(u);

        // start Validation 

        if (u.email == '' || u.password == '') {
            $('#alert').append("<div id=\"al\" class=\"alert\"><span> Please Fill All Fields</span><div>");
        } else {

            jQuery.ajax({
                type: "POST",
                // url: "http://localhost:3000/login",
                url: "http://yallanotlobapi.herokuapp.com/login",
                data: uJSON,
                contentType: "application/json",
                cache: false,
                success: function (response) {
                    // console.log(response)
                    if (response.status == "success") {
                        var Uid = response.user.id;
                        var Uname = response.user.name;
                        // var access = response.token;

                        sessionStorage.setItem("userId", Uid);
                        sessionStorage.setItem("userName", Uname);
                        // sessionStorage.setItem("axs", access);

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
