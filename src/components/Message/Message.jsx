import React from 'react';
import { getCovertedTime } from '../../services/times';
import styles from './Message.module.css';

const Message = ({ content, isMine, sendDate }) => {
    return(
        <li className={`${styles.message} ${isMine ? styles.my_message : styles.opponent_message}`}>
            <div className={styles.message_content}>
                {content}
                <p className={styles.send_date}>{getCovertedTime(sendDate)}</p>
            </div>
        </li>
    )
}

export default Message;