// window
//   .fetch("https://yallanotlobapi.herokuapp.com/users/1/groups/")
//   .then(res => res.json())
//   .then(res => {
//     userGroups = res;
//   });
const urlParams = new URLSearchParams(window.location.search);
let order_id = urlParams.get('order_id');
let counter = 1;
let orders = [
  {
    person: "john",
    Item: "t3meya",
    amount: "2 sandwichs",
    price: "20 L.E.",
    comment: "hot"
  },
  {
    person: "ted",
    Item: "fol",
    amount: "2 sandwichs",
    price: "15 L.E.",
    comment: "spicy"
  }
];

function displayOrder() {
  orders.forEach(order => {
    document.getElementById("tableBody").innerHTML =
      document.getElementById("tableBody").innerHTML +
      "\
      <tr>\
      <td>" +
      order.person +
      "</td>\
      <td>" +
      order.Item +
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
      counter +
      ")' id=" +
      counter +
      ">X</button>\
    </td>\
      </tr>";
    counter++;
  });
}

function cancelItem(id) {
  let cxlElement = document.getElementById(id).parentNode.parentNode;
  console.log(cxlElement);
  cxlElement.parentNode.removeChild(cxlElement);
}

function addOrder() {
  let newItem = document.getElementById("newItem").value,
    newAmount = document.getElementById("newAmount").value,
    newPrice = document.getElementById("newPrice").value,
    newComment = document.getElementById("newComment").value;
  orders.push({
    person: "amr",
    Item: newItem,
    amount: newAmount,
    price: newPrice,
    comment: newComment
  });
  document.getElementById("tableBody").innerHTML =
    document.getElementById("tableBody").innerHTML +
    "\
      <tr>\
      <td>" +
    "Amr" +
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
    counter +
    ")' id=" +
    counter +
    ">X</button>\
    </td>\
      </tr>";
  counter++;
}

function showInvitedFriends() {
  invitedFriends.forEach(friend => {
    let key = Object.keys(friend);
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
      key[0] +
      "</button> <br> \
                    <button type='button' \
                    class='btn btn-link'> remove</button> \
                </div> \
            </div> \
        </div>  ";
  });
}

let acceptedFriends = [];
function getNoAcceptedFriends() {
  invitedFriends.forEach(friend => {
    let value = Object.values(friend);
    if (value == 1) {
      acceptedFriends.push(friend);
    }
  });
  document.getElementById("acceptedButton").innerHTML =
    acceptedFriends.length + " friends accepted the invitation!";
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
