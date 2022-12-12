import React from 'react';
import styles from './MessageBoard.module.css';

const MessageBoard = ({messages}) => {
    return(
        <section className={styles.message_board}>
            {
                messages.map((message, index) => {
                    return(
                        <li key={index}>
                            {message.content}
                        </li>
                    )
                })
            }
        </section>
    )
}

export default MessageBoard;