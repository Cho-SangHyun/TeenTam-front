import React from 'react';
import styles from './Message.module.css';

const Message = ({ content, isMine }) => {
    return(
        <li className={`${styles.message} ${isMine ? styles.my_message : styles.opponent_message}`}>
            <div className={styles.message_content}>
                {content}
            </div>
        </li>
    )
}

export default Message;