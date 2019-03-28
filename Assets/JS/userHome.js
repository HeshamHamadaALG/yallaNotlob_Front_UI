var access = sessionStorage.getItem("axs");
var Uid = sessionStorage.getItem("userId");


function displayUserOrders(userID){

    fetch('https://yallanotlobapi.herokuapp.com/users/'+userID+'/orders',{headers:{"Authorization": access}})
    .then(function(response) {
        return response.json();
    })
    .then(function(result) {
        orders=result.orders;
        console.log(orders);
        orders.forEach(addOrderToHtml);
    });
}

function addOrderToHtml(order){
    document.getElementById("userOrders").innerHTML=document.getElementById("userOrders").innerHTML+"\
    <li class='list-group-item'>\
        <a href='./orderdetails.html?order_id="+order.id+"'>"+order.order_type+" on "+order.created_at.slice(0,10)+"     "+order.created_at.slice(11,19)+" from "+order.restaurant+"</a>\
    </li>\
    "
}



function displayFriendsActivity(){

    fetch("https://yallanotlobapi.herokuapp.com/users/"+Uid+"/friends",{headers:{"Authorization": access}})
    .then(function(response) {
        return response.json();
    })
    .then(function(friends) {  // Getting this user friend 
        document.getElementById("friendsActivityList").innerHTML="";
        friends.forEach(function (friend){
            fetch('https://yallanotlobapi.herokuapp.com/users/'+friend.id+'/orders',{headers:{"Authorization": access}})
                .then(function(response) {
                    return response.json();
                })
                .then(function(result) {
                    orders=result.orders;
                    orders.forEach(function(order){
                        document.getElementById("friendsActivityList").innerHTML=document.getElementById("friendsActivityList").innerHTML+"\
                        <li class='list-group-item'>\
                            <a href=''>"+friend.name+"</a> created <a href=''>order</a> for <a href=''>"+order.order_type+"</a> from <a href=''>"+order.restaurant+"</a> on "+order.created_at.slice(0,10)+"\
                        </li>"
                    });
                    
                });
        });
    });
}

