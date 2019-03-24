
//add friend
function addFriend(){
    let friendEmail = document.getElementById("friendName").value;
    if(friendEmail !== '') {
        let Friend={email:friendEmail,user_id:1};
        fetch("https://yallanotlobapi.herokuapp.com/friendships" ,{
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(Friend)
        })

        .then((response) => response.json()).then((newFriend) => {
            if(newFriend.id) {
                addFriendToHtml(newFriend);
            }
        })

        .catch(function(error) {
            log('Request failed', error)
        });
    }
}

//remove friend from the list
function unFriend(event,friendID){
    friendID = document.getElementById("friendList");
    //document.getElementById("friendList").removeChild(event.target.parentElement.parentElement);
    fetch("https://yallanotlobapi.herokuapp.com/friendships",{
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({friend_id:friendID,user_id:1})
    })

    .catch(function(error) {
        log('Delete failed', error)
    });
}


function addFriendToHtml(friend){
    document.getElementById("friendList").innerHTML = document.getElementById("friendList").innerHTML + "\
    <div class='media-body media-disp'>\
        <div class='media-left'>\
        <img src='http://rs775.pbsrc.com/albums/yy35/PhoenyxStar/link-1.jpg~c200' class='media-object' style='width:60px'></img>\
        </div>\
        <a href=''>" + friend.email + "</a>\
        <div class='pull-right pullight'>\
            <button class='btn btn-primary pullight' onclick='unFriend(event,this.id)'>UnFriend</button>\
        </div>\
    </div>";
}


function displayUserFriendsInSelect(currentUserID){
    fetch("https://yallanotlobapi.herokuapp.com/users/"+currentUserID+"/friends")
    .then(function(response) {
        return response.json();
    })
    .then(function(friends) {
        document.getElementById("friendName").innerHTML="<option disabled selected>Choose Friend</option>"
        friends.forEach(addFriendToHtml);
    })
    .catch(function(error) {
        log('Request failed', error)
    });
}




