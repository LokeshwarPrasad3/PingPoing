import React from 'react'


// user List items which is show when search username

const UserListItem = ({ user, handleFunction }) => {
    return (
        <>
            {/* a small card */}
            <div
                onClick={handleFunction}
                className="user_card cursor-pointer flex items-center  py-1 rounded-md px-3 pl-4 bg-green-600 gap-3 w-72 ">
                <div className="user_card_image flex items-center ">
                    {/* image section of card */}
                    <img className='w-9 h-9 rounded-full' src={user ? user.pic : ""} alt={user ? user.name : ""} srcSet='' />
                </div>
                <div className="info font-signika text-gray-100">
                    <h3 className="user_name text-sm font-500 ">{user.name}</h3>
                    <h4 className="user_email text-[13px] "> <span className='font-300' >Email : </span> {user.email}</h4>
                </div>
            </div>
        </>
    )
}

export default UserListItem
