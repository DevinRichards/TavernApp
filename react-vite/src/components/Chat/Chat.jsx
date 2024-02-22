import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { io } from 'socket.io-client';
import { sendMessage, receiveMessage } from "../../redux/chat";
let socket;

const Chat = () => {
    const [chatInput, setChatInput] = useState("");
    const [messages, setMessages] = useState([]);
    const displayMessages = useSelector(state => state.messages.messages);
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch();

    useEffect(() => {
        // open socket connection
        // create websocket
        socket = io();

        socket.on("chat", (chat) => {
            setMessages(messages => [...messages, chat])
        })
        // when component unmounts, disconnect
        return (() => {
            socket.disconnect()
        })
    }, [])

    const updateChatInput = (e) => {
        setChatInput(e.target.value)
    };

    const sendChat = (e) => {
        e.preventDefault()
        socket.emit("chat", { user: user.username, msg: chatInput });
        dispatch(sendMessage({ user: user.username, msg: chatInput }));
        setChatInput("")
    }

    return (user && (
        <div>
            <h1>Hello from Chat</h1>
            <div>
                {displayMessages.map((message, ind) => (
                    <div key={ind}>{`${message.user}: ${message.msg}`}</div>
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
    )
};


export default Chat;
