
var access = sessionStorage.getItem("axs");
var Uid = sessionStorage.getItem("userId");

function displayFriendsActivity(){

    fetch("https://yallanotlobapi.herokuapp.com/users/"+Uid+"/friends",{headers:{"Authorization": access}})
    .then(function(response) {
        return response.json();
    })
    .then(function(friends) {  // Getting this user friend 
        friends.forEach(function (friend){
            fetch('https://yallanotlobapi.herokuapp.com/users/'+friend.id+'/orders',{headers:{"Authorization": access}})
                .then(function(response) {
                    return response.json();
                })
                .then(function(result) {
                    orders=result.orders;
                    console.log(orders);
                    //orders.forEach(addOrderToHtml);
                });
        });
    });
}

