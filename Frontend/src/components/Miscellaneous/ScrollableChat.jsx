import React from 'react'
import '../../CSS/style.css';
import { ChatState } from '../../Context/ChatProvider';

const ChatMessages = ({ chatMessages }) => {

    const { user, selectedChat } = ChatState();

    let currentDate = new Date().toLocaleDateString();


    return (
        <>
            {/* <div className={`message_box_right w-full flex ${message.sender === 'user' ? 'justify-end' : ''} my-2`}> */}

            {
                chatMessages && chatMessages.map((chat, index) => {

                    const [year, month, day] = chat.chat.createdAt.slice(0, 10).split("-"); // Split the input date by hyphens
                    const messageDate = `${parseInt(month)}/${parseInt(day)}/${year}`;

                    {/* const messageDate = ''; */}

                    // Check if the date has changed since the last message
                    const showDate = currentDate !== messageDate;

                    // Update currentDate with the new date
                    currentDate = messageDate;



                    return (
                        <React.Fragment key={index} >
                            {showDate && (
                                <div className="date_show flex items-center justify-center py-3">
                                    <div className="date bg-slate-900 opacity-80 px-2 py-[1px] rounded-md">
                                        <p>{messageDate}</p>
                                    </div>
                                </div>
                            )}

                            <div
                                key={index}
                                className={`message_box_right w-full flex ${user?.name === chat?.sender?.name ? 'justify-end' : ''
                                    } my-2 gap-1`}
                            >
                                <div
                                    className={`message flex ${user?.name === chat?.sender?.name ? 'bg-green-700' : 'bg-slate-800'} px-2 py-[1px] w-fit max-w-[60%] rounded-md rounded-tr-none`}>
                                    <p className="message_name text-[1.2rem] text-gray-100">
                                        {chat.content}
                                    </p>
                                </div>
                                <img className={`w-7 h-7 ${selectedChat.isGroupChat ? '' : 'hidden'} rounded-full border-[1px] border-gray-800`} src="./Images/lokeshwar.jpg" srcSet="" />
                            </div>

                        </React.Fragment>
                    )
                })
            }

        </>
    )
}

export default ChatMessages
