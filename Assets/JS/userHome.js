


function displayUserOrders(userID){

    fetch('https://yallanotlobapi.herokuapp.com/users/'+userID+'/orders')
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