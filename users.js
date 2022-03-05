const users = [];

function joinedUser(id, userName) {
    const user = { id, userName };
  
    users.push(user);
  
    return user;
}
  
//get the cuurent user
function currentUser(id) {

    return users.find(user => user.id === id);
}

//remove the user from the array when the user leaves
function removeUser(id){
    const hasLeft = users.findIndex(user=>user.id===id);
    if(hasLeft !== -1){ //if hasLeft == -1 that means we have not find that user 
        return users.splice(hasLeft,1)[0];
    }
}

module.exports = {
    joinedUser,
    currentUser,
    removeUser
}