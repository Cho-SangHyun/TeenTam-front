import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AUTH, CRUD } from '../../app';
import MessageBoard from '../../components/MessageBoard/MessageBoard';
import MessageList from '../../components/MessageList/MessageList';
import MessageModal from '../../components/MessageModal/MessageModal';
import Navbar from '../../components/Navbar/Navbar';
import styles from './MessagePage.module.css';

const MessagePage = (props) => {
    const authService = useContext(AUTH);
    const crudService = useContext(CRUD);
    const navigate = useNavigate();
    const [oppenentList, setOppenentList] = useState([]);
    const [opponent, setOpponent] = useState("");
    const [opponentId, setOpponentId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const openModal = useCallback(() => {
        setShowModal(true);
    }, []);
    const closeModal = useCallback(() => {
        setShowModal(false);
    }, []);

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

    const refreshMessages = () => {
        crudService.getMessages(user.id, opponentId, setMessages);
    }
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
        crudService.getOpponents(user.id, setOppenentList);
    }, [crudService, user]);

    useEffect(() => {
        crudService.getMessages(user.id, opponentId, setMessages);
    }, [opponentId, user, crudService])
    
    return(
        <section className={styles.message_page}>
            <Navbar />
            {showModal && <MessageModal closeModal={closeModal} receiver={opponentId} refreshMessages={refreshMessages} />}
            <section className={styles.message_box}>
                <h1 className={styles.message_box_title}>쪽지함</h1>
                <section className={styles.message_container}>
                    <MessageList oppenentList={oppenentList} setOpponent={setOpponent} setOpponentId={setOpponentId} />
                    <MessageBoard 
                        opponent={opponent}
                        messages={messages} 
                        openModal={() => {setTimeout(openModal, 50)}} 
                        user={user}
                        refreshMessages={refreshMessages} 
                    />
                </section>
            </section>
        </section>
    );
}

export default MessagePage;