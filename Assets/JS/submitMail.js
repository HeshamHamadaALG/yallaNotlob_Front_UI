

function submitMailBtn() {
    let mail=document.getElementById("email").value;
    if(mail){
        document.getElementById("alert").innerHTML="";
        

        fetch('https://yallanotlobapi.herokuapp.com/password_reset', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({email:mail})

        }).then(function (response) {
        return response;}
         ).then((response) =>  {
            document.getElementById("msg").innerHTML="Please check your mail";
         })


    }
    
    else
    $('#alert').append("<div id=\"al\" class=\"alert\"><span> Please Enter valid mail</span><div>");
}
