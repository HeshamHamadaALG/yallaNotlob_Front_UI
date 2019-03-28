var Uid = sessionStorage.getItem("userId");
var access = sessionStorage.getItem("axs");
 

function addOrderToHtml() {
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
        <button type='button' class='btn btn-warning' onclick='viewOrder()'>View</button>\
        <button type='button' class='btn btn-warning' onclick='finishOrder()'>Finish</button>\
        <button type='button' class='btn btn-warning' onclick='cancelOrder()'>Cancel</button>\
        </div>\
    </td>\
    </tr>";
}
  

function viewOrder() {
    window.location.href = "../pages/orderdetails.html";
}


function finishOrder() {
    fetch("https://yallanotlobapi.herokuapp.com/orders/"+ +"/finished" ,{
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "Authorization": access
        },
        body: JSON.stringify({user_id:Uid})
    })

    .then((response) => {
        return response.json()
    })

    .catch(function(error) {
        console.log('Request failed', error)
    });
}


function cancelOrder() {
    fetch("https://yallanotlobapi.herokuapp.com/orders/"+Uid ,{
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "Authorization": access
        },
    })
    
    .then(response => {
        return response.json()
    })

    .catch(function(error) {
        console.log('Request failed', error)
    });
}






// let orders = [
//     {
//         id: "12",
//         order_type: "breakfast",
//         restaurant: "shabrawy",
//         invited: "15",
//         joined: "5",
//         order_status: "waiting"
//     },
//     {
//         id: "12",
//         order_type: "breakfast",
//         restaurant: "shabrawy",
//         invited: "15",
//         joined: "5",
//         order_status: "waiting"
//     }
// ];