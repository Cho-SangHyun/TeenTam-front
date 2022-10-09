class CRUDService {
    constructor(axiosApi){
        this.axiosApi = axiosApi;
    }
    // 게시글 생성
    createPost(boards_category, boards_writer, title, content){
        const data = {
            boards_category: 1,
            boards_writer: parseInt(boards_writer),
            title,
            content
        };

        this.axiosApi.post("/boards/create-board/", data)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            })
    }
    // 게시글 불러오기
    getPost(boardsCategory, boardsId, setPost, setCommentsList){
        this.axiosApi.get(`/boards/${boardsCategory}/id/${boardsId}/`)
            .then(response => {
                const data = response.data.data[0];
                setCommentsList(data.comments);

                const { boards_writer, content, title, like,
                    delete_date, writer_username, pub_date } = data;
                
                setPost({
                    boards_id: boardsId, boards_writer, comments_num: data.comments.length, content, 
                    title, like, delete_date, writer_username, pub_date
                })
            })
            .catch(error => {
                console.log(error);
            })
    }

    getPostList(boardsCategory, order, setPostList, setPostCount){
        this.axiosApi.get(`/boards/${boardsCategory}?page=1&offset=5&order=${order}`)
            .then(response => {
                setPostList(response.data.data);
                setPostCount(response.data.boards_num);
            })
            .catch(error => {
                console.log(error);
            })
    }

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
}

export default CRUDService;
  