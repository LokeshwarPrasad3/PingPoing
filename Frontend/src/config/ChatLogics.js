
// returning another user which is done latest message

export const getSender = (loggedUser, users) => {
    return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
}

// export const getSenderImage = (loggedUser, users) => {
//     return users[0]._id === loggedUser._id ? users[1].pic : users[0].pic;
// }

export const getSenderImage = (loggedUser, users) => {
    if (!users || users.length > 2) {
        // If it's a group chat (more than two users) or users are undefined
        return "./Images/default_group.png"; // Show default group image
    }

    if (users.length === 2) {
        // If it's a one-on-one chat
        if (users[0]._id === loggedUser._id) {
            return users[1].pic;
        } else if (users[1]._id === loggedUser._id) {
            return users[0].pic;
        }
    }

    // If none of the above conditions are met (fallback)
    return "./Images/default_user.png"; // Show default user image
};



export const getSenderFull = (loggedUser, users) => {
    return users[0]._id === loggedUser._id ? users[1] : users[0];
}