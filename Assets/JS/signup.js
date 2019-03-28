$('document').ready(function () {

    $('#submit_btn').click(function (e) {
        $('#al').remove();
        e.preventDefault();
        var data = {};
        data.name = $('#username').val();
        data.email = $('#email').val();
        data.password = $('#password').val();
        data.password_confirmation = $('#conPassword').val();
        data.avatar = '';

        let dataJSON = JSON.stringify(data);

        conPass = $('#conPassword').val();
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        // start Validation 

        if (data.name == '' || data.email == '' || data.password == '' || conPass == '') {
            $('#alert').append("<div id=\"al\" class=\"alert\"><span> Please Fill All Fields</span><div>");
        } else if (data.password != conPass) {
            $('#alert').append("<div id=\"al\" class=\"alert\"><span> Make Sure to Confirm Password</span><div>");
        } else if (!data.email.match(mailformat)) {
            $('#alert').append("<div id=\"al\" class=\"alertBlue\"><span>Please Enter a valid E-mail !!</span><div>");
        } else if (data.name.length < 4) {
            $('#alert').append("<div id=\"al\" class=\"alertYellow\"><span>Please Enter a valid Name (More than 3 Charachters) !</span><div>");
        } else if (data.password.length < 8) {
            $('#alert').append("<div id=\"al\" class=\"alertYellow\"><span>Make Sure That password more than 8 Charachters !</span><div>");
        } else {

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
                        window.location.href = "./index.html";
                    }
                },
                error: function () {
                    console.log("Hi from failed");
                    $('#alert').append("<div id=\"al\" class=\"alert\"><span>User Already Exist</span><div>");
                }

            });
        }
    });
});