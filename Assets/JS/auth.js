$(document).ready(function(){
    var Uname = sessionStorage.getItem("userName");
    var Uid = sessionStorage.getItem("userId");
    var access = sessionStorage.getItem("axs");
    console.log(access);

    if (Uname == null || Uid == null || access == null){
      window.location.href = "./login.html";
  } else {
      $('#navbarDropdownMenuLink').html("Welcome " + Uname);
  }


  $('#logOut').click(function(){
    sessionStorage.clear();
  });
  })