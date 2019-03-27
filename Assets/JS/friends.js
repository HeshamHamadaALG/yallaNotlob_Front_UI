var Uid = sessionStorage.getItem("userId");
var access = sessionStorage.getItem("axs");
//add friend
function addFriend(){
    let friendEmail = document.getElementById("friendName").value;
    console.log(friendEmail);
    if(friendEmail !== '') {
        let Friend={email:friendEmail,user_id:Uid};
        fetch("https://yallanotlobapi.herokuapp.com/friendships" ,{
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": access
            },
            body: JSON.stringify(Friend)
        })

        .then((response) => {

            console.log(response)
            return response.json()
        })

        .then((newFriend) => {
            console.log(newFriend);
            if(newFriend.id) {
                document.location.reload();
            }
        })

        .catch(function(error) {
            console.log('Request failed', error)
        });
    }
}

//remove friend from the list
function unFriend(event,friendID){
        console.log(friendID);
        fetch("https://yallanotlobapi.herokuapp.com/friendships",{
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "Authorization": access
            
        },
        body: JSON.stringify({friend_id:friendID,user_id:Uid})
    })

    .then((response) => {
        document.location.reload();
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
        <a href=''>" + friend.name + "</a>\
        <div class='pull-right pullight'>\
            <button class='btn btn-primary pullight' onclick='unFriend(event,\""+friend.id+"\")'>UnFriend</button>\
        </div>\
    </div>";
}


function displayUserFriendsInSelect(currentUserID){
    fetch("https://yallanotlobapi.herokuapp.com/users/"+currentUserID+"/friends",{headers:{"Authorization": access}})
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




