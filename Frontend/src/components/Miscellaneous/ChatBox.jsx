import React from 'react'

const ChatBox = () => {
    return (
        <>
            <div className="all_chat_containers w-[130%] min-h-screen flex flex-col  m-2 rounded py-2 px-4 bg-slate-200 ">

                {/* display name of user */}
                <div className="chat_heading_user p-2">
                    <h1 className="text-black font-bold font-signika opacity-80 text-3xl ">Lokeshwar </h1>
                </div>

                {/* container where all chat is visible */}
                <div className="user_all_chat_contaienr min-h-[90vh] bg-slate-400 rounded">
                </div>

            </div>
        </>
    )
}

export default ChatBox
