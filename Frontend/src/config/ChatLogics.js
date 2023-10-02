
// returning another user which is done latest message

export const getSender = (loggedUser, users) => {
    return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
}

// export const getSenderImage = (loggedUser, users) => {
//     return users[0]._id === loggedUser._id ? users[1].pic : users[0].pic;
// }

export const getSenderImage = (loggedUser, users) => {
    if (!users || users.length === 0) {
        // Handle the case where users array is undefined or empty
        return "./Images/default_image.png"; // Show a default image
    }

    if (users.length === 1) {
        // Handle one-on-one chat where there's only one user in the array
        const otherUser = users[0];

        if (!otherUser || !otherUser.pic) {
            // Handle the scenario where the other user or their pic is missing
            return "./Images/default_user.png"; // Show a default user image
        }

        if (otherUser._id === loggedUser._id) {
            return loggedUser.pic || "./Images/default_user.png"; // Show logged-in user's pic or default user image
        } else {
            return otherUser.pic; // Return the other user's pic
        }
    }

    // Handle group chat or other scenarios
    const otherUser = users.find(user => user && user._id !== loggedUser._id);

    if (!otherUser || !otherUser.pic) {
        // Handle cases where the other user or their pic is missing
        return "./Images/default_user.jpg"; // Show a default user image
    }

    return otherUser.pic; // Return the other user's pic
};



export const getSenderFull = (loggedUser, users) => {
    return users[0]._id === loggedUser._id ? users[1] : users[0];
}

export const isSameSender = (messages, m, i, userId) => {
    return (
        i < messages.length - 1 &&
        (messages[i + 1].sender._id !== m.sender._id ||
            messages[i + 1].sender._id === undefined) &&
        messages[i].sender._id !== userId
    );
};

export const isLastMessage = (messages, i, userId) => {
    return (
        i === messages.length - 1 &&
        messages[messages.length - 1].sender._id !== userId &&
        messages[messages.length - 1].sender._id
    );
};