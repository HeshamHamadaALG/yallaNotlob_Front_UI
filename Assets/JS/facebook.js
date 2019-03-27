



//   window.fbAsyncInit = function() {
//     FB.init({
//       appId      : '{your-app-id}',
//       cookie     : true,
//       xfbml      : true,
//       version    : '{api-version}'
//     });

//     FB.AppEvents.logPageView();   

//   };

//   (function(d, s, id){
//      var js, fjs = d.getElementsByTagName(s)[0];
//      if (d.getElementById(id)) {return;}
//      js = d.createElement(s); js.id = id;
//      js.src = "https://connect.facebook.net/en_US/sdk.js";
//      fjs.parentNode.insertBefore(js, fjs);
//    }(document, 'script', 'facebook-jssdk'));

$(document).ready(function () {
    $("#facebook").click(function (e) {
        e.preventDefault();
        $.ajaxSetup({ cache: true });
        $.getScript('https://connect.facebook.net/en_US/sdk.js', function () {
            FB.init({
                appId: '464468604305431',
                version: 'v2.7'
            });
            //   $('#loginbutton,#feedbutton').removeAttr('disabled');
            FB.getLoginStatus(function (response) {
                statusChangeCallback(response);
            });
        });
    });
});
