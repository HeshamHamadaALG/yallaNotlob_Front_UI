$(document).ready(function () {

    // var Uname = sessionStorage.getItem("userName");
    var Uid = sessionStorage.getItem("userId");
    var access = sessionStorage.getItem("axs");
    var data = [];


    jQuery.ajax({
        type: "GET",
        url: "https://yallanotlobapi.herokuapp.com/users/" + Uid + "/notifications",
        data: data,
        beforeSend: function (xhr) {
            /* Authorization header */
            xhr.setRequestHeader("Authorization", access);

        },
        success: function (result) {
            var no = result.notifications.length;
            console.log("Number of not : " + no);
            $('#noti_Counter')
                .css({ opacity: 0 })
                .text(no)
                .css({ top: '-10px' })
                .animate({ top: '-2px', opacity: 1 }, 500);

            if (result.notifications.length == 0) {
                // $('#notifi').append("<p>no Notifications Here<p>");
                $('#noti_Counter').fadeOut('slow');
                $('#noti_Button').css('background-color', '#2E467C');
            } else if (result.notifications.length > 0) {
                $('#noti_Button').css('background-color', '#FFF');
            }

        },
        error: function (result) {
            console.log("ERROR New ++ ", result);
        }
    });




    jQuery.ajax({
        type: "GET",
        url: "https://yallanotlobapi.herokuapp.com/users/" + Uid + "/allnotifications",
        data: data,
        beforeSend: function (xhr) {
            /* Authorization header */
            xhr.setRequestHeader("Authorization", access);

        },
        success: function (response) {
            console.log("Notifications  ++ ", response);


           




            for (i = 0; i <= response.notifications.length; i++) {

                if (response.notifications[i].action == "invite") {
                    $('#notifi').append("<div id=\"nottt\" class=\"list-group-item\"><span>" + response.notifications[i].sender + "  "
                        + response.notifications[i].action + "You To Order <span><input type=\"button\" id=\""
                        + response.notifications[i].id + "\" class=\" btn btn-info\" value=\"Join\"> </div>");
                } else {

                    $('#notifi').append("<div id=\"nottt\" class=\"list-group-item\"><span>" + response.notifications[i].sender + "  "
                        + response.notifications[i].action + "You To Order <span><a href=\"./orderdetails.html?"
                        + response.notifications[i].notifiable_id + "\"></a></div>");
                }




                // ###########################################################################################################
                $("#" + response.notifications[i].id).click(function () {
                    jQuery.ajax({
                        type: "POST",
                        url: "https://yallanotlobapi.herokuapp.com/users/" + Uid + "/orders/" + response.notifications[i].id + "/join",
                        data: data,
                        beforeSend: function (xhr) {
                            /* Authorization header */
                            xhr.setRequestHeader("Authorization", access);

                        },
                        success: function (response) {
                            console.log(">>>>>>>>", response);
                        },
                        error: function (response) {
                            console.log(">>>EEE>>>> ", response);
                        }

                    });


                });
                // #############################################################################################################


            }
        },
        error: function (response) {
            console.log("ERROR  ++ ", response);
        }

    })

    $('#noti_Button').click(function () {

        // TOGGLE (SHOW OR HIDE) NOTIFICATION WINDOW.
        $('#notifications').fadeToggle('fast', 'linear', function () {
            if ($('#notifications').is(':hidden')) {
                $('#noti_Button').css('background-color', '#2E467C');

            }
            // CHANGE BACKGROUND COLOR OF THE BUTTON.
            else $('#noti_Button').css('background-color', '#FFF');
        });

        jQuery.ajax({
            type: "GET",
            url: "https://yallanotlobapi.herokuapp.com/users/" + Uid + "/markasread",
            data: data,
            beforeSend: function (xhr) {
                /* Authorization header */
                xhr.setRequestHeader("Authorization", access);

            },
            success: function (response) {
                console.log("mark as read " + response);
            },
            error: function (response) {
                console.log("ERROR click  ++ ", response);
            }


        });

        $('#noti_Counter').fadeOut('slow');     // HIDE THE COUNTER.

        return false;
    });

    // HIDE NOTIFICATIONS WHEN CLICKED ANYWHERE ON THE PAGE.
    $(document).click(function () {
        $('#notifications').hide();

        // CHECK IF NOTIFICATION COUNTER IS HIDDEN.
        if ($('#noti_Counter').is(':hidden')) {
            // CHANGE BACKGROUND COLOR OF THE BUTTON.
            $('#noti_Button').css('background-color', '#2E467C');
        }
    });

    $('#notifications').click(function () {
        return false;       // DO NOTHING WHEN CONTAINER IS CLICKED.
    });



});