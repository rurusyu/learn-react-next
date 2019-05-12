import React,{useEffect} from 'react';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import {useDispatch, useSelector} from 'react-redux'; //react-redux@next 설치하면 쓸수 있음
import {loginAction, LOG_OUT} from '../reducers/user';

//useDispatch, useSelector 이 훅스 나오기전에는 Connect를 HOC로 사용해서 mapStateToProps 해서 썼음.

//메인화면
const dummy = {
  isLoggedIn: true,
  imagePaths: [],
  mainPosts: [{
    User: {
      id: 1,
      nickname: '제로초',
    },
    content: '첫 번째 게시글',
    img: 'https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?udate=20180726',
  }],
};

const Home = () => {  
    //디스패치 설정.
    const dispatch = useDispatch(); //디스패치로 실행하고
    const {isLoggedIn, user} = useSelector(state => state.user); //useSelector 리덕스 state 가져올 수 있음.   
    useEffect(()=>{
        dispatch(loginAction), //어떤것을 reducers > user에서 어떤것을 export 하냐에따라서 다양하게 사용하면 됨.
        dispatch({
            type : LOG_OUT,
            data : {
                nickname : ""
            }
        }) 
        
    },[]);

  return (
    <div>
      {user ? <div>로그인 했습니다 : {user.nickname} </div> : <div>로그아웃 했습니다.</div>}
      {dummy.isLoggedIn && <PostForm />}
      {dummy.mainPosts.map((c) => {
        return (
          <PostCard key={c} post={c} />
        );
      })}
    </div>
  );
};

export default Home;