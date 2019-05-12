//리액트 붙이기 전에 이 구조먼저 다 짜고할 수도 있고, 연결하면서 같이할수도이 있음.

//초기값을 해주어야함.
const initialState ={
    isLoggedIn : false,
    user: {},
    signUpData: {},
    loginData: {},
};

//액션먼저 만들기.
const SIGN_UP = 'SIGN_UP';
const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const LOG_IN = 'LOG_IN'; // 액션의 이름 이걸export 해도되고 밑에 loginAction를 이걸export해도됨
const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS'; // 액션의 이름
const LOG_IN_FAILURE = 'LOG_IN_FAILURE'; // 액션의 이름
export const LOG_OUT = 'LOG_OUT';

//액션타입은 반드시 지정해야함.
export const loginAction = {
    type:LOG_IN,
    data:{
        nickname : "제로초",
    }
}
//리듀서 
const reducer = (state = initialState, action) => {
    switch(action.type){
        case LOG_IN :{
            return {
                ...state,
                isLoggedIn : true,
                user : action.data,
            }
        }
        case LOG_OUT :{
            return {
              ...state,
              isLoggedIn:false,
              user: null,
            }
        }

        case SIGN_UP: {
            return {
              ...state,
              signUpData: action.data,
            };
          }
        default: {
            return {
              ...state,
            }
          }
    }

}

export default reducer;