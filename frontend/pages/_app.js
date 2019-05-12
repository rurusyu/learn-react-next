//자동으로 이 컴포넌트를 부모컴포넌트로 사용한다. 페이지별 공통된 부분 이걸로 뺐음. 그래야 리랜더링 잡을 수 있음.
import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper'; //아래 store를 props로 받아야하는 부분을 처리해주기 위해서 설치함.
import {createStore, compose, applyMiddleware} from 'redux';
import AppLayout from "../components/AppLayout";
import rootReducer from '../reducers';

//컴포넌트가 모이는 곳에다가 리액트와 리덕스를  연결시켜주면, 모든 컴포넌트가 리덕스안의 state를 공유하게됨.
//app.js가 가장 root였는데, Provider를 가장 밖에 사용함으로써  root 컴포넌트가 된다. store= state + action + reducer
import {Provider} from 'react-redux';

const NodeBird =({Component, store})=>{
    return (
       <Provider store = {store}>
         <Head>
            <title>노드버드</title>     
            <link rel ="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css" />
            <script src ="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.js" />
        </Head>   
        <AppLayout>
           <Component />
        </AppLayout>
       </Provider>       
    )
}

NodeBird.propTypes ={
    Component : PropTypes.elementType,
    store : PropTypes.object,
}

export default withRedux((initialState, options)=>{ //이건 외우면 됨. 똑같음.
    //여기는 스토어 커스텀할수있음.
    const middlewares = []; // 리덕스 devtool쓰려면 미들웨어 해주어야함(리덕스에 없는 기능쓰려면), 액션과 스토어사이에서 사용됨.
    const enhancer = compose( //미들웨어 합성
        applyMiddleware(...middlewares),  //위에 미들웨어 뭐적용할지 적고 아래에 그거에 대한거 쓰면됨.
        typeof window !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f)=> f, //리덕스 데브툴즈에서 가져옴. 이건그냥 외우면됨.
        ); //typeof window 이부분은 서버쪽에서할때 options.isServer로 할수있음.

    const store = createStore(rootReducer, initialState,enhancer); //rootReducer 넣어줌.
    return store; //여기서 리턴해주면 위에서 props로 받을 수있음.
})(NodeBird); //HOC, 기능확장해줌.