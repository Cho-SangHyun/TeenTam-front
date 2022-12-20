import { convertCategoryName } from "./util";

class CRUDService {
    constructor(axiosApi){
        this.axiosApi = axiosApi;
    }
    // 게시글 생성
    createPost(boards_category, boards_writer, title, content, onCreate){
        const data = {
            boards_category,
            boards_writer: parseInt(boards_writer),
            title,
            content
        };

        this.axiosApi.post("/boards/create-board/", data)
            .then(response => {
                const newBoardsId = response.data.boards_id;
                onCreate(`/boards/${boards_category}/id/${newBoardsId}/`);
            })
            .catch(error => {
                console.log(error);
            })
    }
    // 게시글 불러오기
    getPost(boardsCategory, boardsId, userId, setPost, setCommentsList){
        this.axiosApi.get(`/boards/${boardsCategory}/id/${boardsId}/?user_id=${userId}`)
            .then(response => {
                const data = response.data.data;
                setCommentsList(data.comments);

                const { boards_writer, content, title, like,
                    hit, delete_date, writer_username, pub_date } = data;
                
                setPost({
                    boards_id: parseInt(boardsId), boards_writer, comments_num: data.comments.length, content, 
                    title, like, hit, delete_date, writer_username, pub_date
                })
            })
            .catch(error => {
                console.log(error);
            })
    }
    // 게시글 불러오기 - 수정을 위해
    getOldPost(boardsCategory, boardsId, userId, setTitle, setContent){
        this.axiosApi.get(`/boards/${boardsCategory}/id/${boardsId}/?user_id=${userId}`)
            .then(response => {
                const data = response.data.data;
                const { content, title } = data;
                
                setTitle(title);
                setContent(content);
            })
            .catch(error => {
                console.log(error);
            })
    }
    // 게시글 수정
    updatePost(boards_id, user_id, title, content, onUpdate){
        const data = {
            title,
            content,
            user_id
        };

        this.axiosApi.post(`/boards/board-modify/${boards_id}/`, data)
            .then(response => {
                onUpdate(-1);
            })
            .catch(error => {
                console.log(error);
            })
    }
    // 게시글 삭제하기
    deletePost(userId, boardsId, onDelete){
        const data = {
            user_id: userId
        };

        const res = window.confirm("이 글을 삭제하시겠습니까?");
        if(res){
            this.axiosApi.delete(`/boards/delete-board/${boardsId}/`, {data})
                .then(response => {
                    // 삭제 이후엔 바로 이전 페이지로 이동
                    onDelete(-1);
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }
    // 게시글 목록 불러오기
    getPostList(boardsCategory, order, page, offset, setPostList, setPostCount){
        this.axiosApi.get(`/boards/${boardsCategory}?page=${page}&offset=${offset}&order=${order}`)
            .then(response => {
                setPostList(response.data.data);
                // 전체 게시글 개수 받아오기
                setPostCount && setPostCount(response.data.boards_num);
            })
            .catch(error => {
                console.log(error);
            })
    }
    getPostListBySearch(order, page, offset, keyword, writerName, categoryName, setPostList, setPostCount){
        const convertedCategoryName = convertCategoryName(categoryName);
        const categoryNameQuery = categoryName === "전체 게시판" ? "" : `&category_name=${convertedCategoryName}`;
        const searchWay = keyword ? `&keyword=${keyword}` : `&writer_name=${writerName}`;
        const url = `/boards/search-boards/?page=${page}&offset=${offset}&order=${order}${searchWay}${categoryNameQuery}`;
        this.axiosApi.get(url)
            .then(response => {
                setPostList(response.data.data);
                // 전체 게시글 개수 받아오기
                setPostCount && setPostCount(response.data.boards_num);
            })
            .catch(error => {
                setPostList([]);
                console.log(error);
            })
    }
    // 게시글 좋아요
    updatePostLike(userId, boardsId, onLike){
        const res = window.confirm("이 글을 공감하시겠습니까?");
        if(res){
            const data = {
                likes_user: userId,
                likes_board: boardsId
            };
    
            this.axiosApi.post("/boards/like-board/", data)
                .then(response => {
                    if(response.data.message === "like success"){
                        alert("이 글을 공감하였습니다");
                        onLike(prev => {
                            return {
                                ...prev,
                                like: response.data.likes
                            };
                        })
                    }
                    else{
                        alert("이미 공감한 글입니다.")
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }
    // 댓글 생성
    createComment(userId, boardsId, content, onCreate){
        const data = {
            comments_writer: userId,
            comments_board: boardsId,
            content
        };

        this.axiosApi.post("/boards/create-comment/", data)
            .then(response => {
                onCreate(response.data.data);
            })
            .catch(error => {
                console.log(error);
            })
    }
    // 댓글 삭제하기
    deleteComment(userId, commentsId, onDelete){
        const data = {
            user_id: userId
        };

        const res = window.confirm("이 댓글을 삭제하시겠습니까?");
        if(res){
            this.axiosApi.delete(`/boards/delete-comment/${commentsId}/`, {data})
                .then(response => {
                    onDelete(commentsId);
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }

    changePassword(userId, oldPassword, newPassword) {
        const data = {
            user_id: userId,
            password: oldPassword,
            new_password: newPassword
        };

        const res = window.confirm("정말 비밀번호를 변경하시겠습니까?");
        if(res){
            this.axiosApi.post("/mypage/change-password/", data)
                .then(response => {
                    alert("변경되었습니다");
                    window.location.replace("/mypage");
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }

    getMyPostsList(userId, page, setPostList, setPostCount) {
        this.axiosApi.get(`/mypage/myboardslists/?user_id=${userId}&page=${page}`)
            .then(response => {
                setPostList(response.data.data);
                // 전체 게시글 개수 받아오기
                setPostCount && setPostCount(response.data.boards_num);
            })
            .catch(error => {
                console.log(error);
            })
        
    }

    getMyInfo(userId, setMyInfo, setUsername, setSchool, setGrade) {
        this.axiosApi.get(`/mypage/${userId}/`)
            .then(response => {
                const myInfo = response.data.data;
                const { username, school, grade } = myInfo;
                setMyInfo(myInfo);
                setUsername(username);
                setSchool(school || "");
                setGrade(grade || "");
            })
            .catch(error => {
                console.log(error);
            })
        
    }

    uploadProfileImage(userId, profileImage) {
        const form = new FormData();
        form.append("user_id", userId);
        form.append("profile_image", profileImage);
        
        this.axiosApi.post("/mypage/profile-image-upload/", form, {
            headers: {'Content-Type': 'multipart/form-data'}
        })
            .then(response => {
                window.location.replace("/mypage");
            })
            .catch(error => {
                console.log(error);
            })
    }

    getProfileImageURL(userId, setImageURL) {
        this.axiosApi.get(`/mypage/profile-image-url/?user_id=${userId}`)
            .then(response => {
                const imageURL = process.env.REACT_APP_BASE_API_URL + response.data.data.profile_image;
                setImageURL(imageURL);
            })
            .catch(error => {
                console.log(error);
            })
    }

    sendMessage(receiver, sender, content, closeModal, refreshMessages) {
        const data = {
            sender,
            receiver,
            content
        }

        const res = window.confirm("쪽지를 보내시겠습니까?");
        if (res) {
            this.axiosApi.post("/notes/", data)
                .then(response => {
                    closeModal();
                    refreshMessages && refreshMessages();
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }

    getOpponents(userId, setOpponents) {
        this.axiosApi.get(`/notes/?user_id=${userId}`)
            .then(response => {
                setOpponents(response.data.data);
            })
            .catch(error => {
                console.log(error);
            })
        
    }

    getMessages(userId, opponentId, setMessages) {
        this.axiosApi.get(`/notes/content/?user_id=${userId}&notes_user_id=${opponentId}`)
            .then(response => {
                setMessages(response.data.data);
            })
            .catch(error => {
                console.log(error);
            })
    }

    getTimeTableItems(userId, setTableItems) {
        this.axiosApi.get(`/timetable/?user_id=${userId}`)
            .then(response => {
                setTableItems(response.data.data);
            })
            .catch(error => {
                console.log(error);
            })
    }

    createTimeTableItem(userId, period, day, subject, setTableItems, closeModal) {
        const data = {
            user_id: userId,
            timetable: [
                {
                    timetable_user: userId,
                    period,
                    day,
                    subject
                }
            ]
        }
        this.axiosApi.post(`/timetable/`, data)
            .then(response => {
                setTableItems(tableItems => {
                    return [
                        ...tableItems,
                        {
                            timetable_user: parseInt(userId),
                            period: parseInt(period),
                            day: parseInt(day),
                            subject
                        }
                    ]
                });
                closeModal();
            })
            .catch(error => {
                console.log(error);
            })
    }

    removeTimeTableItem(userId, period, day, subject, setTableItems) {
        if (window.confirm("삭제하시겠습니까?")) {
            const data = {
                user_id: userId,
                timetable: [
                    {
                        timetable_user: userId,
                        period,
                        day,
                        subject
                    }
                ]
            }
            this.axiosApi.delete(`/timetable/`, {data})
                .then(response => {
                    setTableItems(tableItems => {
                        return tableItems.filter(item => !(parseInt(period) === item.period && parseInt(day) === day && subject === item.subject));
                    });
                })
                .catch(error => {
                    console.log(error);
                })
        };
    }

    modifyTimeTableItem(userId, subject, oldPeriod, oldDay, newPeriod, newDay, setTableItems) {
        const data = {
            user_id: userId,
            timetable: [
                {
                    timetable_user: userId,
                    period: oldPeriod,
                    day: oldDay,
                    subject: null
                },
                {
                    timetable_user: userId,
                    period: newPeriod,
                    day: newDay,
                    subject
                }
            ]
        }
        this.axiosApi.post(`/timetable/`, data)
            .then(response => {
                setTableItems(tableItems => {
                    const newTimeTableItems = tableItems.filter(item => !(parseInt(oldPeriod) === item.period && parseInt(oldDay) === item.day && subject === item.subject));
                    return [
                        ...newTimeTableItems,
                        {
                            timetable_user: parseInt(userId),
                            period: parseInt(newPeriod),
                            day: parseInt(newDay),
                            subject
                        }
                    ]
                });
            })
            .catch(error => {
                console.log(error);
            })
    }
}

export default CRUDService;
  