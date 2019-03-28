const urlParams = new URLSearchParams(window.location.search);
let order_id = urlParams.get('order_id');
var access = sessionStorage.getItem("axs");
var Uid = sessionStorage.getItem("userId");
var Uname = sessionStorage.getItem("userName");
let counter = 1;
let orders = [];
let invitedFriends = [];
let acceptedFriends = [];

window
  .fetch("https://yallanotlobapi.herokuapp.com/orders/" + order_id + "/invited", {
    headers: {
      "Content-Type": "application/json",
      "Authorization": access
    },
  })
  .then(res => res.json())
  .then(res => {
    invitedFriends = res.allInvitated;
    acceptedFriends = res.accepted;
    showAcceptedFriends();
    showInvitedFriends();
    getNoAcceptedFriends();
    getNoInvitedFriends();
  });



window
  .fetch("https://yallanotlobapi.herokuapp.com/orders/" + order_id + "/order_items", {
    headers: {
      "Content-Type": "application/json",
      "Authorization": access
    },
  })
  .then(res => res.json())
  .then(res => {
    orders = res.order_details;
    displayOrder();
    console.log(orders)
  });


function displayOrder() {
  orders.forEach(order => {
    document.getElementById("tableBody").innerHTML =
      document.getElementById("tableBody").innerHTML +
      "\
      <tr>\
      <td>" +
      order.username +
      "</td>\
      <td>" +
      order.item +
      "</td>\
      <td>" +
      order.amount +
      "</td>\
      <td>" +
      order.price +
      "</td>\
      <td>" +
      order.comment +
      "</td>\
    <td> \
    <button type='button' class='btn btn-primary' onclick='cancelItem(" +
      order.id +
      ")' id=" +
      order.id +
      ">X</button>\
    </td>\
      </tr>";
    counter++;
    console.log(order.id);
  });
}


function cancelItem(id) {
  console.log(id);
  let cxlElement = document.getElementById(id).parentNode.parentNode;
  console.log(orders);
  orders = orders.filter(order => order.id != id);
  window
    .fetch("https://yallanotlobapi.herokuapp.com/orders/" + order_id + "/order_items/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": access
      },
    })
    .then(res => res.json())
    .then(res => {
      orders = orders.filter(order => order.id != id);
      cxlElement.parentNode.removeChild(cxlElement);
    });
  console.log(orders);
}

function addOrder() {
  let newItem = document.getElementById("newItem").value,
    newAmount = document.getElementById("newAmount").value,
    newPrice = document.getElementById("newPrice").value,
    newComment = document.getElementById("newComment").value;
  let newOrder = {
    user_id: Uid,
    item: newItem,
    amount: newAmount,
    price: newPrice,
    comment: newComment,
    order_id: order_id
  }

  window
    .fetch('https://yallanotlobapi.herokuapp.com/users/' + Uid + "/orders/" + order_id + "/order_items", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": access
      },
      body: JSON.stringify(newOrder)
    }).then((response) => response.json()
    ).then((res) => {
      console.log(res);
      newOrder.id = res.id;
      orders.push(newOrder);
      document.getElementById("tableBody").innerHTML =
        document.getElementById("tableBody").innerHTML +
        "\
      <tr>\
      <td>" +
        Uname +
        "</td>\
      <td>" +
        newItem +
        "</td>\
      <td>" +
        newAmount +
        "</td>\
      <td>" +
        newPrice +
        "</td>\
      <td>" +
        newComment +
        "</td>\
    <td>\
    <button type='button' class='btn btn-primary' onclick='cancelItem(" +
        res.id +
        ")' id=" +
        res.id +
        ">X</button>\
    </td>\
      </tr>";
      console.log(orders);
    })


}


function showInvitedFriends() {
  invitedFriends.forEach(friend => {
    document.getElementById("popUpInvited").innerHTML =
      document.getElementById("popUpInvited").innerHTML +
      "\
        <div class='col-lg-6'> \
            <div class='media'> \
                <div class='media-left'> \
                    <img src='http://rs775.pbsrc.com/albums/yy35/PhoenyxStar/link-1.jpg~c200' \
                        class='media-object' style='width:60px'> \
                </div> \
                <div class='media-body'> \
                    <button type='button' \
                    class='btn btn-link'>" +
      friend.name +
      "</button> <br> \
                    <button type='button' \
                    class='btn btn-link'> remove</button> \
                </div> \
            </div> \
        </div>  ";
  });
}

function getNoAcceptedFriends() {
  document.getElementById("acceptedButton").innerHTML =
    acceptedFriends.length + " friends accepted the invitation!";
}

function getNoInvitedFriends() {
  document.getElementById('invitedButton').innerHTML = invitedFriends.length + " fiends were invited!";
}

function showAcceptedFriends() {
  acceptedFriends.forEach(friend => {
    let key = Object.keys(friend);
    document.getElementById("popUpAccepted").innerHTML =
      document.getElementById("popUpAccepted").innerHTML +
      "\
    <div class='col-lg-6'> \
        <div class='media'> \
            <div class='media-left'> \
                <img src='http://rs775.pbsrc.com/albums/yy35/PhoenyxStar/link-1.jpg~c200 ' \
                    class='media-object' style='width:60px'> \
            </div> \
            <div class='media-body'> \
                <button type='button' \
                    class='btn btn-link'>" +
      key[0] +
      "</button> <br>\
                <button type='button' \
                    class='btn btn-link'>remove</button> \
            </div> \
        </div> \
    </div> ";
  });
}
