import React, { useState, useCallback, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AUTH, CRUD } from '../../app';
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';
import TimeTableBoard from '../../components/TimeTableBoard/TimeTableBoard';
import TimeTableModal from '../../components/TimeTableModal/TimeTableModal';
import styles from './TimeTablePage.module.css';

const TimeTablePage = (props) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const authService = useContext(AUTH);
    const crudService = useContext(CRUD);
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const openModal = useCallback(() => {
        setShowModal(true);
    }, []);
    const closeModal = useCallback(() => {
        setShowModal(false);
    }, []);

    const [tableItems, setTableItems] = useState([]);

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
                crudService.getTimeTableItems(user.id, setTableItems);
            }
        }
        keepLogin();
    }, [authService, navigate, user, crudService]);
    
    return(
        <section className={styles.time_table_page}>
            <Navbar />
            {showModal && <TimeTableModal closeModal={closeModal} setTableItems={setTableItems} />}
            <TimeTableBoard 
                openModal={() => {setTimeout(openModal, 50)}} 
                tableItems={tableItems} 
                setTableItems={setTableItems}
            />
            <Footer />
        </section>
    );
}

export default TimeTablePage;