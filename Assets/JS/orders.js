var Uid = sessionStorage.getItem("userId");
var access = sessionStorage.getItem("axs");
 
//initilaization 
myOrderJoined = [];
myOrderInvited = [];
OrderJoined = [];
OrderInvited = [];

function addOrderToHtml(order,index) {
    if(order.order_status === "finished") {
        document.getElementById("showOrders").innerHTML = document.getElementById("showOrders").innerHTML + "\
        <tr class='bg-success'>\
        <td>" +
        order.order_type +
        "</td>\
        <td>" +
        order.restaurant +
        "</td>\
        <td>" +
        myOrderInvited[index] +
        "</td>\
        <td>" +
        myOrderJoined[index] +
        "</td>\
        <td>" +
        order.order_status +
        "</td>\
        <td> \
            <div class='btn-group'>\
            <button id='viewOrder' type='button' class='btn btn-warning btn-sm' onclick='viewOrder(\""+order.id+"\")'>View</button>\
            </div>\
        </td>\
        </tr>";    
    }
    else {
        document.getElementById("showOrders").innerHTML = document.getElementById("showOrders").innerHTML + "\
        <tr class='bg-success'>\
        <td>" +
        order.order_type +
        "</td>\
        <td>" +
        order.restaurant +
        "</td>\
        <td>" +
        myOrderInvited[index] +
        "</td>\
        <td>" +
        myOrderJoined[index] +
        "</td>\
        <td>" +
        order.order_status +
        "</td>\
        <td> \
            <div class='btn-group'>\
            <button id='viewOrder' type='button' class='btn btn-warning btn-sm' onclick='viewOrder(\""+order.id+"\")'>View</button>\
            <button id='finishOrder' type='button' class='btn btn-warning btn-sm' onclick='finishOrder(\""+order.id+"\")'>Finish</button>\
            <button id='cancelOrder' type='button' class='btn btn-warning btn-sm' onclick='cancelOrder(\""+order.id+"\")'>Cancel</button>\
            </div>\
        </td>\
        </tr>";
    }
}

function addInvited_Finished_OrderToHtml(order,index) {
    document.getElementById("showOrders").innerHTML = document.getElementById("showOrders").innerHTML + "\
    <tr class='bg-success'>\
    <td>" +
    order.order_type +
    "</td>\
    <td>" +
    order.restaurant +
    "</td>\
    <td>" +
    OrderInvited[index] +
    "</td>\
    <td>" +
    OrderJoined[index] +
    "</td>\
    <td>" +
    order.order_status +
    "</td>\
    <td> \
        <div class='btn-group'>\
        <button id='viewOrder' type='button' class='btn btn-warning btn-sm' onclick='viewOrder(\""+order.id+"\")'>View</button>\
    </td>\
    </tr>";
}

function viewOrder(orderID) {
    window.location.href = "../pages/orderdetails.html?"+orderID;
}


function finishOrder(orderID) {
    console.log(orderID);
    fetch("https://yallanotlobapi.herokuapp.com/orders/"+orderID+"/finished" ,{
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "Authorization": access
        },
    })

    .then((response) => {  
        document.location.reload();
    })

    .catch(function(error) {
        console.log('Request failed', error)
    });
}


function cancelOrder(orderID) {
    fetch("https://yallanotlobapi.herokuapp.com/orders/"+orderID ,{
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "Authorization": access
        },
    })

    .then((response) => {
        document.location.reload();
    })

    .catch(function(error) {
        console.log('Request failed', error)
    });
}


function displayOrders(){
    fetch("https://yallanotlobapi.herokuapp.com/users/"+Uid+"/orders",{
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": access
        }
    })

    .then(function(response) {
        return response.json();
    })

    .then(function(result) {
        myOrderJoined = result.orders.joined;
        myOrderInvited = result.orders.invited;
        OrderJoined = result.invites.joined;
        OrderInvited = result.invites.invited;
        result.orders.orders.forEach((item,index) => {
            addOrderToHtml(item,index)
        });

        result.invites.invitedAt.forEach((item,index) => {
        addInvited_Finished_OrderToHtml(item,index)
        });
    })
    
    .catch(function(error) {
        console.log('Request failed', error)
    });
}                 

