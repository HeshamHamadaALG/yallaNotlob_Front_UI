var Uid = sessionStorage.getItem("userId");

let orders = [
    {
        id: "12",
        order_type: "breakfast",
        restaurant: "shabrawy",
        invited: "15",
        joined: "5",
        order_status: "waiting"
    },
    {
        id: "13",
        order_type: "lunch",
        restaurant: "mac",
        invited: "20",
        joined: "2",
        order_status: "finish"
    }
  ];
  

function addOrderToHtml() {
    orders.forEach(order => {
      document.getElementById("showOrders").innerHTML = document.getElementById("showOrders").innerHTML + "\
        <tr>\
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
            <a id='viewOrder' class='view' title='View' data-toggle='tooltip'><i class='material-icons'>&#xE417;</i></a> \
            <a class='finish' title='Finish' data-toggle='tooltip'><i class='material-icons'>&#xE03B;</i></a> \
            <a class='delete' title='Cancel' data-toggle='tooltip'><i class='material-icons'>&#xE872;</i></a> \
        </td>\
        </tr>";
    });
}
  

function viewOrder() {
    $('#viewOrder').load('../functions/Addorder.html');
}


function finishOrder() {
    fetch("https://yallanotlobapi.herokuapp.com/users/:"+Uid+"/orders" ,{
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": access
        },
        body: JSON.stringify({user_id:Uid})
    })
}


function cancelOrder() {
    fetch("https://yallanotlobapi.herokuapp.com/users/:"+Uid+"/orders" ,{
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "Authorization": access
        },
        body: JSON.stringify({user_id:Uid})
    })
}

