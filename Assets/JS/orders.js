var Uid = sessionStorage.getItem("userId");
var access = sessionStorage.getItem("axs");
 

function addOrderToHtml(order) {
    document.getElementById("showOrders").innerHTML = document.getElementById("showOrders").innerHTML + "\
    <tr class='bg-success'>\
    <td>" +
    order.order_type +
    "</td>\
    <td>" +
    order.restaurant +
    "</td>\
    <td>" +
    order.invited +
    "</td>\
    <td>" +
    order.joined +
    "</td>\
    <td>" +
    order.order_status +
    "</td>\
    <td> \
        <div class='btn-group'>\
        <button id='viewOrder' type='button' class='btn btn-warning btn-sm' onclick='viewOrder()'>View</button>\
        <button id='finishOrder' type='button' class='btn btn-warning btn-sm' onclick='finishOrder(\""+order.id+"\")'>Finish</button>\
        <button id='cancelOrder' type='button' class='btn btn-warning btn-sm' onclick='cancelOrder(\""+order.id+"\")'>Cancel</button>\
        </div>\
    </td>\
    </tr>";
}

function addInvited_Finished_OrderToHtml(order) {
    document.getElementById("showOrders").innerHTML = document.getElementById("showOrders").innerHTML + "\
    <tr class='bg-success'>\
    <td>" +
    order.order_type +
    "</td>\
    <td>" +
    order.restaurant +
    "</td>\
    <td>" +
    order.invited +
    "</td>\
    <td>" +
    order.joined +
    "</td>\
    <td>" +
    order.order_status +
    "</td>\
    <td> \
        <div class='btn-group'>\
        <button id='viewOrder' type='button' class='btn btn-warning btn-sm' onclick='viewOrder()'>View</button>\
    </td>\
    </tr>";
}

function viewOrder() {
    window.location.href = "../pages/orderdetails.html";
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
        $(document).ready(function(){
            $("#finishOrder").click(function(){
              $(".btn-group").removeAttr("finishOrder");
              $(".btn-group").removeAttr("cancelOrder");
            });
          });
          //document.getElementById("myAnchor").removeAttribute("href"); 

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
        result.orders.forEach((item) => {
            addOrderToHtml(item)
        });

        result.invitedAt.forEach((item) => {
        addInvited_Finished_OrderToHtml(item)
        });
    })
    
    .catch(function(error) {
        console.log('Request failed', error)
    });
}                 

