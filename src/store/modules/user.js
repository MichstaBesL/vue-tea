import {USER_LOGIN,USER_INIT,LOGIN_OUT} from './mutaions-types'
export default {
    state:{
        LoginStatus:false,  //登录状态
        token:null,         //token
        userInfo:{},        //用户信息 
    },
    getters:{

    },
    mutations:{
        [USER_LOGIN](state,user){
            state.LoginStatus = true;
            state.token = user.token
            state.userInfo = user;
            localStorage.setItem("userInfo",JSON.stringify(state.userInfo))
        },
        [USER_INIT](state){
            let userInfo = JSON.parse(localStorage.getItem("userInfo"))
            if(userInfo){
                state.LoginStatus = true;
                state.token = userInfo.token
                state.userInfo = userInfo;
            }
        },
        [LOGIN_OUT](state){
            state.LoginStatus = false;
            state.token = null;
            state.userInfo = {};
            localStorage.removeItem("userInfo")
        }

    },
    actions:{

    }
}