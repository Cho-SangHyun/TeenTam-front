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
        {name: "jofe", id:4},
        {name: "test111", id:3},
        {name: "dkuDKU", id:10}
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
                {name: "dkuDKU", content: "혹시 궁금한 거 물어봐도 될까요?혹시 궁금한 거 물어봐도 될까요?혹시 궁금한 거 물어봐도 될까요?"},
                {name: "me", content: "뭔데요?"},
                {name: "dkuDKU", content: "다른 게 아니라 제가 요즘 대학을 어디 갈지가 고민인데요..당장 내년에 고3인데 성적이 진짜 개판이에요. 수능 이번에 잘 보셨다고 하니까 공부방법좀 물어볼라구요!"},
                {name: "me", content: "아 저는 교과서 위주로 공부했어요ㅎㅎ 어차피 다 교과서에 나오는 내용이니까 그것만 파시면 돼요. 재수할 각오로 하시면 될 것 같네요"},
                {name: "me", content: "저도 고2 끝나고나서 공부시작했어요!"},
                {name: "me", content: "포기하지 말고 화이팅합시다~!"},
                {name: "dkuDKU", content: "혹시 궁금한 거 물어봐도 될까요?혹시 궁금한 거 물어봐도 될까요?혹시 궁금한 거 물어봐도 될까요?"},
                {name: "me", content: "뭔데요?"},
                {name: "dkuDKU", content: "다른 게 아니라 제가 요즘 대학을 어디 갈지가 고민인데요..당장 내년에 고3인데 성적이 진짜 개판이에요. 수능 이번에 잘 보셨다고 하니까 공부방법좀 물어볼라구요!"},
                {name: "me", content: "아 저는 교과서 위주로 공부했어요ㅎㅎ 어차피 다 교과서에 나오는 내용이니까 그것만 파시면 돼요. 재수할 각오로 하시면 될 것 같네요"},
                {name: "me", content: "저도 고2 끝나고나서 공부시작했어요!"},
                {name: "me", content: "포기하지 말고 화이팅합시다~!"},
                {name: "dkuDKU", content: "혹시 궁금한 거 물어봐도 될까요?혹시 궁금한 거 물어봐도 될까요?혹시 궁금한 거 물어봐도 될까요?"},
                {name: "me", content: "뭔데요?"},
                {name: "dkuDKU", content: "다른 게 아니라 제가 요즘 대학을 어디 갈지가 고민인데요..당장 내년에 고3인데 성적이 진짜 개판이에요. 수능 이번에 잘 보셨다고 하니까 공부방법좀 물어볼라구요!"},
                {name: "me", content: "아 저는 교과서 위주로 공부했어요ㅎㅎ 어차피 다 교과서에 나오는 내용이니까 그것만 파시면 돼요. 재수할 각오로 하시면 될 것 같네요"},
                {name: "me", content: "저도 고2 끝나고나서 공부시작했어요!"},
                {name: "me", content: "포기하지 말고 화이팅합시다~!"},
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
                    <MessageBoard opponent={opponent} messages={messages} />
                </section>
            </section>
        </section>
    );
}

export default MessagePage;