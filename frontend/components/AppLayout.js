import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import LoginFrom from "../components/LoginForm";
import {Menu, Input , Button,Row, Col, Avatar, Card, Form } from 'antd';
//{children}은 부모컴포넌트에서 AppLayout 컴포넌트 밑에 jsx사용하는데 그 jsx들을 통째로 children이라고함.

const dummy ={
    nickname : "레오",
    Post : [],
    Followings : [],
    Followers : [],
    isLoggedIn : false,
}

const AppLayout =({children}) =>{
    return (
        <div>
            <Menu mode="horizontal">
                <Menu.Item key="home"><Link href="/"><a>노드버드</a></Link></Menu.Item>
                <Menu.Item key="profile"><Link href="/profile"><a>프로필</a></Link></Menu.Item>
                <Menu.Item key="mail">
                <Input.Search enterButton style={{verticalAlign : 'middle'}}/>                  
                </Menu.Item>
            </Menu>
           
            <Row gutter={10}> {/*자동으로 반응형이 됨. 반응형 xs는 모바일. 데탑 : sm(작은),md(중간),lg(큰). gutter={10}는 col사이 간격조정 */}
                <Col xs={24} md={6} >
                {dummy.isLoggedIn                 
                   ? <Card
                        actions={[
                            <div key="twit">짹짹<br/> {dummy.Post.length}</div>,
                            <div key="following">팔로잉<br/> {dummy.Followings.length}</div>,
                            <div key="follower">팔로워 <br/> {dummy.Followers.length}</div>
                        ]}
                    >
                       <Card.Meta   
                       avatar={<Avatar>{dummy.nickname[0]}</Avatar>}   
                       title ={dummy.nickname}
                       />
                    </Card>
                    :     
                    <LoginFrom/>
                   
                }
                </Col>
                <Col xs={24} md={12}>
                  {children}
                </Col>
                <Col xs={24} md={6} >
                
                </Col>
            </Row>
           
        </div>
    )
}

AppLayout.propTypes = {
    children : PropTypes.node,
}

export default AppLayout;