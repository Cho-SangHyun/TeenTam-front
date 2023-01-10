import React, { useState, useEffect } from 'react';
import { getSchoolLunch } from '../../services/school_lunch';
import { BiErrorCircle } from "react-icons/bi";
import styles from './SchoolLunchCard.module.css';

const FoodList = ({menu, foodList}) => {
    // 보통 key에 index를 넣는 건 권장되지 않지만 급식리스트는 우리가 수정하는 게 아니라 api로 받아오는 거니까 상관없다.
    return(
        <ul className={styles.food_list}>
            {
                menu in foodList ? (
                    foodList[menu].map((food, index) => {
                        return <li key={index} className={styles.food}>{food}</li>
                    })
                ) : (
                    <li className={styles.food}>- 정보 없음 -</li>
                )
            }
        </ul>
    )
}

const SchoolLunchCard = ({user}) => {
    const [menu, setMenu] = useState("lunch");
    const [foodList, setFoodList] = useState({});

    const handleClickMenu = (e) => {
        if(e.target.tagName === "LI"){
            setMenu(e.target.dataset.value);
            for(const li of e.target.parentNode.children){
                li.classList.remove(styles.selected_menu);
            }
            e.target.classList.add(styles.selected_menu);
        }
    }

    useEffect(() => {
        async function getSchoolFoodList(){
            if (user.school) {
                const fList = await getSchoolLunch(user.school);
                setFoodList(fList);
            }
        }
        getSchoolFoodList();
    }, [setFoodList, user]);

    return(
        <div className={styles.school_lunch_card}>
            {
                user === null ? <div className={styles.backdrop}>
                    <BiErrorCircle className={styles.warning} />
                    <span className={styles.login_message}>로그인 후 이용 가능합니다.</span>
                </div> : null
            }
            <h2 className={styles.school_lunch_title}>🍱 오늘 우리학교 급식</h2>
            <ul className={styles.menu_select_list} onClick={handleClickMenu}>
                <li className={`${styles.menu} ${styles.selected_menu}`} data-value="lunch">점심</li>
                <li className={styles.menu} data-value="dinner">저녁</li>
            </ul>
            <FoodList menu={menu} foodList={foodList} />
        </div>
    )
}

export default SchoolLunchCard;