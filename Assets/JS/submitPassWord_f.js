const urlParams = new URLSearchParams(window.location.search);



function submitNewPassWordBtn(){
    let token = urlParams.get('token');
    let newPassWord=document.getElementById("password").value;
    if (newPassWord.length>=8){
        document.getElementById("alert").innerHTML="";
        fetch('https://yallanotlobapi.herokuapp.com/password_reset/'+token, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({password:newPassWord,password_confirmation:newPassWord})
    }).then(function (response) {
        return response.json();}
    ).then((response) =>  {
        window.location.href="/";

    })
    }
    else 
    document.getElementById("alert").innerHTML="<div id=\"al\" class=\"alert\"><span> Password length must be 8 charachters or more</span><div>";
    
}