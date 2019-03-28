

let mail=document.getElementById("email").value;
const urlParams = new URLSearchParams(window.location.search);
let token = urlParams.get('token');
let newPassWord=document.getElementById("password").value;


function submitMail(){

    fetch('https://yallanotlobapi.herokuapp.com/password_reset', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({email:mail})

    }).then(function (response) {
        return response;}
    ).then((response) =>  {
    })
}

function submitNewPassWord(){

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