import React from 'react';
import Message from '../Message/Message';
import styles from './MessageBoard.module.css';

const MessageBoard = ({ opponent, messages }) => {
    return(
        <section className={styles.message_board}>
            {
                opponent && (
                    <div className={styles.board_header}>
                        <span className={styles.opponent_name}>{opponent}</span>
                    </div>
                )
            }
            <ul className={styles.message_list_board}>
                {
                    messages.map((message, index) => {
                        // isMine판별은 수정 필요
                        return <Message key={index} content={message.content} isMine={message.name === "me"} />
                    })
                }
            </ul>
            
        </section>
    )
}

export default MessageBoard;