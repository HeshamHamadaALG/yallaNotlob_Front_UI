$(document).ready(function () {

    // var Uname = sessionStorage.getItem("userName");
    var Uid = sessionStorage.getItem("userId");
    var access = sessionStorage.getItem("axs");
    var data = [];
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
            var no = response.notifications.length;
            console.log("Number of not : " + no);
            $('#noti_Counter')
                .css({ opacity: 0 })
                .text(no)  // ADD DYNAMIC VALUE (YOU CAN EXTRACT DATA FROM DATABASE OR XML).
                .css({ top: '-10px' })
                .animate({ top: '-2px', opacity: 1 }, 500);

            if (response.notifications.length == 0) {
                $('#noti_Counter').fadeOut('slow');
                $('#noti_Button').css('background-color', '#2E467C');
            } else {
                $('#noti_Button').css('background-color', '#FFF');
            }
        },
        error: function (response) {
            console.log("ERROR  ++ ", response);
        }

    })
    // // ANIMATEDLY DISPLAY THE NOTIFICATION COUNTER.


    // $('#noti_Button').click(function () {

    //     // TOGGLE (SHOW OR HIDE) NOTIFICATION WINDOW.
    //     $('#notifications').fadeToggle('fast', 'linear', function () {
    //         if ($('#notifications').is(':hidden')) {
    //             $('#noti_Button').css('background-color', '#2E467C');

    //         }
    //         // CHANGE BACKGROUND COLOR OF THE BUTTON.
    //         else $('#noti_Button').css('background-color', '#FFF');
    //     });

    //     $('#noti_Counter').fadeOut('slow');     // HIDE THE COUNTER.

    //     return false;
    // });

    // // HIDE NOTIFICATIONS WHEN CLICKED ANYWHERE ON THE PAGE.
    // $(document).click(function () {
    //     $('#notifications').hide();

    //     // CHECK IF NOTIFICATION COUNTER IS HIDDEN.
    //     if ($('#noti_Counter').is(':hidden')) {
    //         // CHANGE BACKGROUND COLOR OF THE BUTTON.
    //         $('#noti_Button').css('background-color', '#2E467C');
    //     }
    // });

    // $('#notifications').click(function () {
    //     return false;       // DO NOTHING WHEN CONTAINER IS CLICKED.
    // });
});