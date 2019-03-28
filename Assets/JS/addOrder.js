let invitedFriends = [];
let userGroups = [];
let userFriends = [];
let groupUsers = [];
let target;
let group_id = null;
let targetFriend;
var access = sessionStorage.getItem("axs");
var Uid = sessionStorage.getItem("userId");

window
  .fetch("https://yallanotlobapi.herokuapp.com/users/" + Uid + "/groups/", {
    headers: {
      "Content-Type": "application/json",
      "Authorization": access
    },
  })
  .then(res => res.json())
  .then(res => {
    userGroups = res;
  });


window
  .fetch("https://yallanotlobapi.herokuapp.com/users/" + Uid + "/friends", {
    headers: {
      "Content-Type": "application/json",
      "Authorization": access
    },
  })
  .then(res => res.json())
  .then(res => {
    userFriends = res;
  });

function addFriendOrGroup() {
  target = document.getElementById("friendName").value;
  userGroups.forEach(group => {
    if (group.name == target) {
      group_id = group.id;
    }
  });

  userFriends.forEach(friend => {
    if (friend.name == target) {
      targetFriend = friend;
    }
  });

  if (group_id != null) {
    window
      .fetch(`https://yallanotlobapi.herokuapp.com/groups/${group_id}/users`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": access
        },
      })
      .then(res => res.json())
      .then(res => {
        groupUsers = res;
        res.forEach(element => {
          if (invitedFriends.length != 0) {
            let invitedNames = [];
            invitedFriends.forEach(friend => {
              invitedNames.push(friend.name);
            })
            if (!invitedNames.includes(element.name)) {
              invitedFriends = [...invitedFriends, element];
              showInvitedFriends();
              group_id = null;
            }
          } else {
            invitedFriends = [...invitedFriends, element];
            showInvitedFriends();
            group_id = null;
          }
        });
      });
  }
  if (targetFriend != null) {
    let found = 0;
    invitedFriends.forEach(friend => {
      if (targetFriend.name == friend.name) {
        found = 1;
      }
    });
    if (!found) {
      invitedFriends = [...invitedFriends, targetFriend];
      showInvitedFriends();
      targetFriend = null;
    }
  }
}

function showInvitedFriends() {
  document.getElementById("invitedFriends").innerHTML = "";
  invitedFriends.forEach(friend => {
    document.getElementById("invitedFriends").innerHTML +=
      "\
    <div class='col-md-6'> \
      <div class='media'> \
        <div class='media-left'> \
          <img src='http://rs775.pbsrc.com/albums/yy35/PhoenyxStar/link-1.jpg~c200' \
          class='media-object' style='width:60px'> \
        </div> \
        <div class='media-body'> \
          <button type='button' class='btn btn-link'>" +
      friend.name +
      "</button> \
          <button type='button' class='btn btn-link' onclick='cancelFriend(" + friend.id + ")' id=" + friend.id +
      ">remove</button> \
        </div> \
      </div> \
    </div> ";
  });
}

function cancelFriend(id) {
  let cxlElement = document.getElementById(id).parentNode.parentNode.parentNode;
  let deleted = document.getElementById(id).parentNode.firstElementChild.innerHTML;
  invitedFriends = invitedFriends.filter(item => item.name != deleted);
  cxlElement.parentNode.removeChild(cxlElement);
}


function addOrder() {
  let meal = document.getElementById("meal").value,
    restaurantName = document.getElementById("restaurantName").value,
    menuImage = "";
  console.log("menuImage" + menuImage);

  let order = {
    order_type: meal,
    restaurant: restaurantName,
    invited: invitedFriends,
    menu_image: menuImage,
  };
  console.log(order);
  window
    .fetch(`https://yallanotlobapi.herokuapp.com/users/${Uid}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": access
        // "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify(order)
    })
    .then(result => result.json())
    .then(res => {

    })
    .catch(err => console.log({ err }));
  window.location.href = './Orders.html';
}
