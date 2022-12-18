import React from 'react';
import Message from '../Message/Message';
import { FiSend } from "react-icons/fi";
import { IoMdRefresh } from "react-icons/io";
import styles from './MessageBoard.module.css';

const MessageBoard = ({ opponent, messages, openModal, user, refreshMessages }) => {
    return(
        <section className={styles.message_board}>
            {
                opponent && (
                    <div className={styles.board_header}>
                        <span className={styles.opponent_name}>{opponent}</span>
                        <span className={styles.icons}>
                            <FiSend className={styles.send_icon} onClick={openModal} />
                            <IoMdRefresh className={styles.refresh_icon} onClick={refreshMessages} />
                        </span>
                    </div>
                )
            }
            <ul className={styles.message_list_board}>
                {
                    messages.map((message, index) => {
                        return <Message 
                            key={index} 
                            content={message.content} 
                            isMine={message.sender === user.id} 
                            sendDate={message.send_date}
                        />
                    })
                }
            </ul>
            
        </section>
    )
}

export default MessageBoard;