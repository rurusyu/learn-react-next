import React,{useState, useCallback} from 'react';
import {Form, Input, Checkbox, Button} from 'antd';



// const TextInput = ({ value }) => {
//     return (
//       <div>{value}</div>
//     )
//   };
  
//   TextInput.propTypes = {
//     value: PropTypes.string,
//   };


//커스텀 훅 export 해놓으면 다른 곳에서 모듈처럼 재사용가능.
export const useInput = (initValue = null) => {
    const [value, setter] = useState(initValue);
    const handler = useCallback ((e) =>{
        setter(e.target.value);
    },[]);
    return [value, handler];
}

const Signup =() =>{
    // const [id, setId] = useState(''); 
    // const [nick, setNick] = useState('');
    // const [password, setPassword] = useState('');
    const [passwordChk, setPasswordChk] = useState('');
    const [term, setTerm] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [termError, setTermError] = useState(false);

    const [id, onChangeId] =useInput('');
    const [nick, onChangeNick] =useInput('');
    const [password, onChangePassword] =useInput('');


    const onSubmit =useCallback((e)=>{
        e.preventDefault();
        if( password !== passwordChk){
            return setPasswordError(true);
        }
        if(!term){
            return setTermError(true);
        }
        console.log({id,nick,password,passwordChk,term}); //여기서 찾으면됨. 실제 배포때는 console.log지워주면됨. 웹팩때 한번에 지워주는거있음.
    },[password,passwordChk,term]);

    //커스텀 훅으로 대체
    // const onChangeId =(e)=>{
    //     setId(e.target.value);
    // }

    // const onChangeNick =(e)=>{
    //     setNick(e.target.value);
    // }

    // const onChangePassword =(e)=>{
    //     setPassword(e.target.value);
    // }
    
    const onChangePasswordChk =useCallback((e)=>{
        setPasswordError(e.target.value !== password);
        setPasswordChk(e.target.value);
    },[password]);

    const onChangeTerm =useCallback((e)=>{
        setTermError(false);
        setTerm(e.target.checked); //약관동의 체크.
    },[]);

    return (
        <>
          <Form onSubmit={onSubmit} style={{padding : 10}}>
          <div>
              <label htmlFor="user-id">아이디</label>
              <br/>
              <Input name="user-id" value={id} required onChange={onChangeId} />
          </div>
          <div>
              <label htmlFor="user-nick">닉네임</label>
              <br/>
              <Input name="user-nick" value={nick} required onChange={onChangeNick} />
          </div>
          <div>
              <label htmlFor="user-password">비밀번호</label>
              <br/>
              <Input name="user-password" type="password" value={password} required onChange={onChangePassword} />
          </div>
          <div>
              <label htmlFor="user-password-chk">비밀번호 체크</label>
              <br/>
              <Input name="user-password-chk" type="password" value={passwordChk} required onChange={onChangePasswordChk} />
              {passwordError ? <div style = {{color : 'red'}}>비밀번호가 일치하지 않습니다.</div> : ''}
          </div>
          <div>
            <Checkbox name="user-term" value={term} onChange={onChangeTerm}>약관에 동의합니다.</Checkbox>
            {termError && <div style = {{color : 'red'}}>약관에 동의하셔야합니다</div>}
          </div>
          <div style={{marginTop : 10}}>
              <Button type="primary" htmlType ="submit">가입하기</Button>
          </div>
          </Form>
       
        </>
    )
}

export default Signup;