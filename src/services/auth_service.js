import { setRefreshToken, getRefreshToken, removeRefreshToken } from "./cookie.js";

class AuthService {
    constructor(axiosApi){
        this.axiosApi = axiosApi;
    }

    login({ email, password }, onLogin, printErrorMessage) {
        const data = {
            email,
            password,
        };
        
        this.axiosApi.post("/account/login/", data)
            .then(response => {
                const { access_token, refresh_token } = response.data.jwt_token;
                // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
                this.axiosApi.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
                // Refresh Token 저장
                setRefreshToken(refresh_token);

                const userData = response.data.user;
                // localStorage에도 유저 정보 추가
                localStorage.setItem("user", JSON.stringify(userData));
                onLogin();
            })
            .catch(error => {
                if(error.response.data.non_field_errors[0] === "wrong password"){
                    printErrorMessage("password", "비밀번호를 다시 확인해주세요");
                }
                else{
                    printErrorMessage("email", "이메일을 다시 확인해주세요");
                };
            })
    }

    logout(onLogout) {
        const res = window.confirm("정말로 로그아웃하시겠습니까?");
        if(res){
            const refresh_token = getRefreshToken();
            const data = {
                refresh_token
            };
    
            this.axiosApi.post("/account/logout/", data)
            .then(response => {
                removeRefreshToken();
                // localStorage 정보 삭제
                localStorage.clear();
                onLogout();
            })
            .catch(error => {
                console.log(error);
            })
        }
    }

    signup({ email, password, username, phone_number, birth }, onSignup, printErrorMessage){
        const data = {
            email,
            password,
            username,
            birth,
            phone_number
        };

        this.axiosApi.post("/account/signup/", data)
            .then(response => {
                const { access_token, refresh_token } = response.data.jwt_token;
                // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
                this.axiosApi.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
                // Refresh Token 저장
                setRefreshToken(refresh_token);
                
                const userData = response.data.user;
                // localStorage에도 유저 정보 추가
                localStorage.setItem("user", JSON.stringify(userData));
                onSignup();
            })
            .catch(error => {
                const errorData = error.response.data;
                if(errorData.birth){
                    printErrorMessage("birth", "생년월일을 정확히 입력해주세요");
                }
                else if(errorData.phone_number){
                    printErrorMessage("phoneNumber", "이 번호를 사용중인 유저가 있습니다");
                }
            })
    }

    // refresh_token으로 새 access_token을 발급받는 함수
    async refreshAccessToken(){
        const refresh_token = getRefreshToken();
        const data = {
            refresh: refresh_token
        };

        if(!refresh_token){
            console.log("Not exists RT");
            return false;
        }

        try{
            const response = await this.axiosApi.post("/api/token/refresh/", data);
            const access_token = response.data.access;
            this.axiosApi.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
            return true;
        }catch(error){
            console.log(error);
            localStorage.removeItem("user");
            return false;
        }
    }

    async checkUsername(username){
        const data = {
            username
        };
        
        let checkResult;

        await this.axiosApi.post(`${process.env.REACT_APP_BASE_API_URL}/account/username-validate/`, data)
            .then(response => {
                checkResult = true;
            })
            .catch(error => {
                checkResult = false;
            })
        
        return checkResult;
    }
}

export default AuthService;
  