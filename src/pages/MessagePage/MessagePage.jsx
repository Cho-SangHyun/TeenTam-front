import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AUTH } from '../../app';
import MessageBoard from '../../components/MessageBoard/MessageBoard';
import MessageList from '../../components/MessageList/MessageList';
import Navbar from '../../components/Navbar/Navbar';
import styles from './MessagePage.module.css';

const MessagePage = (props) => {
    const authService = useContext(AUTH);
    const navigate = useNavigate();
    const [oppenentList, setOppenentList] = useState([
        {name: "jofe"},
        {name: "test111"},
        {name: "dkuDKU"}
    ])
    const [opponent, setOpponent] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        async function keepLogin(){
            const userData = localStorage.getItem("user");
            if (!userData) {
                alert("로그인이 필요한 페이지입니다");
                navigate("/login");
            } else if(userData) {
                const res = await authService.refreshAccessToken();
                if(!res){
                    alert("로그인이 만료됐습니다. 다시 로그인해주세요");
                    navigate("/login");
                }
            }
        }
        keepLogin();
    }, [authService, navigate]);

    useEffect(() => {
        if (opponent === "dkuDKU") {
            setMessages([
                {name: "dkuDKU", content: "혹시 궁금한 거 물어봐도 될까요?"},
                {name: "me", content: "뭔데요?"}
            ])
        } else {
            setMessages([]);
        }
    }, [opponent])
    
    return(
        <section className={styles.message_page}>
            <Navbar />
            <section className={styles.message_box}>
                <h1 className={styles.message_box_title}>쪽지함</h1>
                <section className={styles.message_container}>
                    <MessageList oppenentList={oppenentList} setOpponent={setOpponent} />
                    <MessageBoard messages={messages} />
                </section>
            </section>
        </section>
    );
}

export default MessagePage;