
let gID;
let gName;


function addGroupToHtml(group){
    document.getElementById("groupList").innerHTML = document.getElementById("groupList").innerHTML + "\
    <li class='list-group-item'>\
        <a href=''>" + group.name + "</a>\
        <div class='pull-right pullight'>\
            <button class='fas fa-user-plus' id='uA"+group.id+"' onclick='displayGroupMembers(this.id,\""+ group.name +"\",1)'></button>\
            <button class='fas fa-trash-alt' id='gD"+group.id+"' onclick='removeGroup(event,this.id)'></button>\
        </div>\
    </li>";
}

function removeUserFromGroup(event,userID,groupID){
    //Adding related part of removing this user from this group (backend) then delete it from html
    fetch('https://yallanotlobapi.herokuapp.com/group_users', {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({group_id:groupID,friend_id:userID.slice(2)})

            }).then((response) => console.log(response)
            ).then(() =>  {
                console.log("Deleted")
            })



    //Deleting from HTML
    document.getElementById("userDisp").removeChild(event.target.parentElement.parentElement.parentElement.parentElement);
}

function removeGroup(event,groupID){
    //Adding related part of removing this group then delete it from html
    fetch("https://yallanotlobapi.herokuapp.com/groups/"+groupID.slice(2), {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                    //     "Access-Control-Allow-Origin": "*",
                    //     //"Content-Type": "application/x-www-form-urlencoded",
                },
            }).then((response) => console.log(1)
            ).then((res) =>  {
                //console.log(res);

            })





    //Deleting group from html
    document.getElementById("groupList").removeChild(event.target.parentElement.parentElement);

    if(document.getElementById('g'+groupID.slice(2) ))
    {
        document.getElementById('groupMembersPanel').innerHTML="";
    }
}

function addGroup(userID){
    groupName=document.getElementById("groupName2").value;
    console.log(userID);

    if(groupName!==''){
        //make request to the api to add the new group to the data base then receive the response ok and get the id of that group
        let result={name:groupName,user_id:userID};
        fetch('https://yallanotlobapi.herokuapp.com/groups', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    //     "Access-Control-Allow-Origin": "*",
                    //     //"Content-Type": "application/x-www-form-urlencoded",
                },
                body: JSON.stringify(result)

            }).then((response) => response.json()
            ).then((newGroup) =>  {
                if(newGroup.id)
                 addGroupToHtml(newGroup);

            })

        //update the html with the new group 
        
    }
}
function addUserToGroupHtml(user){
    document.getElementById("userDisp").innerHTML = document.getElementById("userDisp").innerHTML + " \
    <div class='col-lg-6'> \
        <div class='thumbnail'>\
            <div class='media'> \
                <div class='media-left'> \
                    <img src='http://rs775.pbsrc.com/albums/yy35/PhoenyxStar/link-1.jpg~c200' \
                        class='media-object' style='width:60px'> \
                </div> \
                <div class='media-body media-disp'> \
                    <h4 class='media-heading'><a href=''>"+user.name+"</a></h4> \
                    <button type='submit' class='btn btn-primary' id='uR"+user.id+"' onclick='removeUserFromGroup(event,this.id,gID)'>Remove</button> \
                </div> \
            </div> \
        </div> \
    </div>" ;
}
function displayGroupMembers(groupID,groupName,currentUserID){
    gID=groupID.slice(2);
    gName=groupName;
    // First we need to get all users in this group using groupID
    fetch("https://yallanotlobapi.herokuapp.com/groups/"+groupID.slice(2)+"/users")
                                    .then(function(response) {
                                        return response.json();
                                    })
                                    .then(function(users) {
                                        //groups.forEach(addGroupToHtml);
                                        document.getElementById('groupMembersPanel').innerHTML= "\
                                        <div class='panel bondBox panel-primary' id='g"+groupID.slice(2)+"' >\
                                            <div class='panel-heading'>\
                                                    <h3 class='panel-title'>"+groupName+"</h3>\
                                            </div>\
                                            <div class='panel-body'>\
                                                <form class='form-inline'>\
                                                    <div class='form-group'>\
                                                        <label for='friendName'>Your Friend Name  </label>\
                                                        <select class='custom-select' id='friendName'>\
                                                        </select>\
                                                    </div>\
                                                    <button type='button' class='btn btn-primary bondBox' onclick='addFriendToGroup()'>Add</button>\
                                                    <button type='button' class='btn btn-primary pull-right bondBox' onclick='groupMembersUnvisible()'>collapse</button>\
                                                </form>\
                                                <br>\
                                                <div class='row' id='userDisp'>\
                                                </div>\
                                            </div>\
                                        </div>";
                                        users.forEach(addUserToGroupHtml);
                                        displayUserFriendsInSelect(currentUserID);
                                        document.getElementById('groupMembersPanel').style.visibility='visible';
                                    });
    
}

function groupMembersUnvisible(){
    document.getElementById('groupMembersPanel').style.visibility='hidden';
}

function addFriendToGroup(){
    if(document.getElementById("friendName").value)
    fetch('https://yallanotlobapi.herokuapp.com/group_users', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({group_id:gID,friend_id:document.getElementById("friendName").value})

            }).then(function (response) {
                return response;}
            ).then((response) =>  {
                if(response.status==201){
                    displayGroupMembers("uA"+gID,gName,1);//////// 1 should be replaced by user id later
                }

            })
}

function displayUserFriendsInSelect(currentUserID){

    fetch("https://yallanotlobapi.herokuapp.com/users/"+currentUserID+"/friends")
    .then(function(response) {
        return response.json();
    })
    .then(function(friends) {
        document.getElementById("friendName").innerHTML="<option disabled selected value=''>Choose Friend</option>"

        friends.forEach(function (friend){

            document.getElementById("friendName").innerHTML=document.getElementById("friendName").innerHTML+"\
            <option value='"+friend.id+"'>"+friend.name+"</option>"
        });
    });
}