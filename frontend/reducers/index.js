//루트 리듀서임. 흩어져있는 리듀서를 묶어줌
import {combineReducers} from 'redux';
import user from './user';
import post from './post';

const rootReducer = combineReducers({ //자식 리듀서들의 초기화된 리듀스를 여기서 묶어줌.
    user, post
});

export default rootReducer;