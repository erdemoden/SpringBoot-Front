import React, { useState,useEffect } from "react";
import { useLocation } from "react-router-dom";
import formdesign from'../Styles/FormDesign.module.css'
import style from "../Styles/BlogPage.module.css";
import Nav from './Nav';
import {useNavigate} from 'react-router-dom';
import { Oval } from 'react-loader-spinner';
import { Fade,Bounce } from "react-reveal";
import { connect } from 'react-redux';
import { checkOwner } from "../Services/BlogService";
import {GetWithAuth ,GetWithRefresh,beforeRegister,registerWithMail, beforeLogin} from '../Services/HttpServices';
const Blog = (props)=>{
    const location = useLocation();
    const [bounce,setBounce] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isOwner,setIsOwner] = useState(false);
    const [isFollower,setIsFollower] = useState(false);
    const [isAdmin,setIsAdmin] = useState(false);
    const [isNone,setIsNone] = useState(false);
    const navigate = useNavigate();
    const subjectClicked = ()=>{
        if(bounce == false){
        setBounce(true);
        }
        else{
        setBounce(false);
        }
    }
    const beforeLoad = async ()=>{
        console.log(props.username);
        let response = await GetWithAuth(`${process.env.REACT_APP_ROOT_URL}/auth/route`,"/blog",props.jwtsession);
        if(response.route == "/"){
        props.setJwtSession("");
        //localStorage.removeItem("jwtsession");
        navigate(response.route);
        }
        else{
          props.setUserName(response.username);
          props.setUserPicPath(response.location);
          props.setFollowedBlogs(response.followedblogs);
          let response2 = await checkOwner(`${process.env.REACT_APP_ROOT_URL}/user/isOwner?`,props.jwtsession,props.username,location.state.follows.title);
          console.log(response.route);
          if(response2.route != undefined){
            console.log("merhaba");
            console.log("response route : "+response2.route);
            props.setJwtSession("");
            navigate(response.route);
          }
          else {
            if(response2.owner == true){
                setIsOwner(true);
                console.log("is owner"+isOwner);
            }
            else if(response2.follower == true){
                setIsFollower(true);
            }
            else if(response2.admin == true){
                setIsAdmin(true);
            }
            else{
            setIsNone(true);
            console.log("is owner"+isOwner);
            }
          }
        }
        setIsLoading(true);
    }
    useEffect(() =>{
        beforeLoad();
      },[]);
      if (!isLoading) {
        return (
          <React.Fragment>  
            <Nav/>
        <div className={formdesign.loading}>
          <Oval
          width="100"
          height="100"
          color="black"
          ariaLabel='loading'
          />
        </div>
        </React.Fragment>
        )
      }
    return(
        <React.Fragment>
        <Nav/>
        <div>
        <Bounce left when={isAdmin == true||isFollower == true||isOwner == true||isNone == true}>
        <div className={style.nav}>
            <div className={style.title}>
                <p className={style.titlecontent}>{`Blog:${location.state.follows.title}`}</p>
                 {isOwner && (
                    <div className={style.buttons}>
                         <button className={`btn btn-sm btn-outline-dark ${style.follow}`}>Delete</button>                 
                         <button className={`btn btn-sm btn-outline-danger ${style.subject}`} onClick={subjectClicked}>Subject</button>
                         </div>
                 )}
                  {isAdmin && (
                    <div className={style.buttons}>
                         <button className={`btn btn-sm btn-outline-dark ${style.follow}`}>Leave</button>                 
                         <button className={`btn btn-sm btn-outline-danger ${style.subject}`} onClick={subjectClicked}>Subject</button>
                         </div>
                 )}
                    {isFollower && (
                    <div className={style.buttons}>
                         <button className={`btn btn-sm btn-outline-dark ${style.follow}`}>Unfollow</button>                 
                         <button className={`btn btn-sm btn-outline-danger ${style.subject}`} onClick={subjectClicked}>Subject</button>
                         </div>
                 )}
                    {isNone && (
                    <div className={style.buttons}>
                         <button className={`btn btn-sm btn-outline-dark ${style.follow}`}>Follow</button>                 
                         <button className={`btn btn-sm btn-outline-danger ${style.subject}`} onClick={subjectClicked}>Subject</button>
                         </div>
                 )}
                
            </div>
        </div>
        </Bounce>
            <Bounce top duration={500} delay={0} when={bounce}>
            <div className={style.subjectinside}>
                <p className={style.subjectwriting}>{`${location.state.follows.subject}`}</p>
            </div>
            </Bounce>
        </div>
        </React.Fragment>
    );
}
const mapDispatchToProps = dispatch=>{
    return{
        setUserName: (username) =>{ dispatch({'type':'SET_NAME',username})},
        setJwtSession: (jwtsession) =>{ dispatch({'type':'SET_JWTSESSION',jwtsession})},
        setUserPicPath:(userpicpath) =>{ dispatch({'type':'SET_USERPIC',userpicpath})},
        setFollowedBlogs:(followedblogs) =>{ dispatch({'type':'SET_FOLLOWEDBLOGS',followedblogs})}
      }
}
const mapStateToProps = state=>{
    return{
        username:state.username,
        userpicpath:state.userpicpath,
        followedblogs:state.followedblogs,
        jwtsession:state.jwtsession
    }
}
export default connect(mapStateToProps,mapDispatchToProps) (Blog);