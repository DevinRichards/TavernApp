import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { io } from 'socket.io-client';
import { sendMessage } from "../../redux/chat";
let socket;

const Chat = (props) => {
    console.log("This is props from chat", props)
    const [chatInput, setChatInput] = useState("");
    const displayMessages = useSelector(state => state.messages.messages);
    const user = useSelector(state => state.session.user);
    const channel = useSelector(state => state.channel?.currentChannel) || {};
    const dispatch = useDispatch();

    useEffect(() => {
        // open socket connection
        // create websocket
        socket = io();

        socket.on("chat", (chat) => {
            // Handle receiving messages from the server
            dispatch(sendMessage(chat)); // Dispatch the received message to update the state
        });

        // When component unmounts, disconnect
        return () => {
            socket.disconnect();
        };
    }, [dispatch]);

    const updateChatInput = (e) => {
        setChatInput(e.target.value);
    };

    const sendChat = (e) => {
        e.preventDefault();
        const messageData = {
            msg: chatInput,
            senderId: user.username,
            channelId: channel
        };
        // Dispatch action to send message to server
        dispatch(sendMessage(messageData));
        // Clear chat input after sending
        setChatInput("");
    };

    return (
        user && (
            <div>
                <h1>Hello from {props.channel}</h1>
                <div>
                    {displayMessages.map((message, ind) => (
                        <div key={ind}>{`${message.senderId}: ${message.msg}`}</div>
                    ))}
                </div>
                <form onSubmit={sendChat}>
                    <input
                        value={chatInput}
                        onChange={updateChatInput}
                    />
                    <button type="submit">Send</button>
                </form>
            </div>
        )
    );
};

export default Chat;
