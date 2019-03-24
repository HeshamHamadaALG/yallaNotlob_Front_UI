let invitedFriends = [];
let userGroups = [];
let userFriends = [];
let target;
let group_id;
let targetFriend;
var Uid = sessionStorage.getItem("userId");

window
  .fetch("https://yallanotlobapi.herokuapp.com/users/" + Uid + "/groups/")
  .then(res => res.json())
  .then(res => {
    userGroups = res;
  });

window
  .fetch("https://yallanotlobapi.herokuapp.com/users/" + Uid + "/friends")
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
      .fetch(`https://yallanotlobapi.herokuapp.com/groups/${group_id}/users`)
      .then(res => res.json())
      .then(res => {
        res.forEach(element => {
          if (invitedFriends.length != 0) {
            invitedFriends.forEach(friend => {
              if (friend.name != element.name) {
                invitedFriends = [...invitedFriends, element];
                showInvitedFriends();
                group_id = null;
              }
            });
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
          <button type='button' class='btn btn-link'>remove</button> \
        </div> \
      </div> \
    </div> ";
  });
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
    menu_image: menuImage
  };
  window
    .fetch(`https://yallanotlobapi.herokuapp.com/users/${Uid}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
        // "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify(order)
    })
    .then(result => result.json)
    .then(res => {
      console.log(res);
      invitedFriends = [...invitedFriends, res];
      showInvitedFriends();
    });
}
