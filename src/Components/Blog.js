import React, { useState,useEffect } from "react";
import { useLocation } from "react-router-dom";
import formdesign from'../Styles/FormDesign.module.css'
import style from "../Styles/BlogPage.module.css";
import Nav from './Nav';
import {useNavigate} from 'react-router-dom';
import { Oval } from 'react-loader-spinner';
import { Fade,Bounce } from "react-reveal";
import { connect } from 'react-redux';
import { checkOwner, createOrDeleteAdmin, followBlog, unFollowBlog } from "../Services/BlogService";
import { useReducer } from "react";
import {GetWithAuth ,GetWithRefresh,beforeRegister,registerWithMail, beforeLogin} from '../Services/HttpServices';
import { DeletePostById } from "../Services/PostService";
import { deleteBlog } from "../Services/BlogService";
import swal from 'sweetalert';
import Post from "./Post";
const Blog = (props)=>{
    const location = useLocation();
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
    const [bounce,setBounce] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isOwner,setIsOwner] = useState(false);
    const [isFollower,setIsFollower] = useState(false);
    const [isAdmin,setIsAdmin] = useState(false);
    const [isNone,setIsNone] = useState(false);
    const [posts,setPosts] = useState(location?.state?.follows?.postLikeIdList);
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
      setIsOwner(false);
        setIsAdmin(false);
        setIsFollower(false);
        setIsNone(false);
        setIsLoading(true);
        console.log(props.username);
        let response = await GetWithAuth(`${process.env.REACT_APP_ROOT_URL}/auth/route`,"/blog",props.jwtsession);
        if(response.route == "/"){
        props.setJwtSession("");
        localStorage.removeItem("jwtsession");
        navigate(response.route);
        }
        else{
          props.setUserName(response.username);
          props.setFollowedBlogs(response.followedblogs);
          props.setUserPicPath(response.location);
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
            else if(response2.admin == true){
                setIsAdmin(true);
            }
            else if(response2.follower == true){
              setIsFollower(true);
              console.log("merhaba");
          }
            else{
            setIsNone(true);
            console.log("is owner"+isOwner);
            console.log(isLoading);
            }
            console.log(response2);
            console.log(location.state.follows.id);
          }
          setIsLoading(false);
        }
      }
    useEffect(() =>{
        beforeLoad();
        setBounce(false);
        setPosts(location?.state?.follows?.postLikeIdList);
      },[location.key]);

    const deletePost = async (postId)=>{
      let response = await DeletePostById(`${process.env.REACT_APP_ROOT_URL}/post/delete`,postId,props.jwtsession);
      if(response.route!=undefined){
        props.setJwtSession("");
        navigate(response.route);
      }
    else if(response.error){
      console.log("error")
      swal({
        title:"Error",
        text:response.error,
        icon:"error",
        button:"Close This Alert"
      });
    }
    else if(response.success){
      console.log("success");
      swal({
        title:"Success",
        text:response.success,
        icon:"success",
        button:"Close This Alert"
      });
      setPosts(posts.filter(post => post.id !== postId));
    }
    }
    const followABlog = async()=>{
      let response = await followBlog(`${process.env.REACT_APP_ROOT_URL}/blogs/followblog?`,location.state.follows.id,props.jwtsession);
      if(response.route == "/"){
        props.setJwtSession("");
        localStorage.removeItem("jwtsession");
        navigate(response.route);
        }
        else{
          console.log(response);
          setIsFollower(true);
          setIsNone(false);
          let newFollowedBlogs = props.followedblogs.concat(response.object);
          props.setFollowedBlogs(newFollowedBlogs);
          console.log("followed blogs"+props.followedBlogs);
          console.log(response);
          swal({
            title:"Success",
            text:response.success,
            icon:"success",
            buttons:"Close"
          });
        }
    }
    const unFollowThisBlog = async()=>{
      let response = await unFollowBlog(`${process.env.REACT_APP_ROOT_URL}/blogs/unfollowblog?`,location.state.follows.id,props.jwtsession);
      if(response.route == "/"){
        props.setJwtSession("");
        localStorage.removeItem("jwtsession");
        navigate(response.route);
        }
        else{
          setIsNone(true);
          setIsFollower(false);
          props.setFollowedBlogs(props.followedblogs.filter(follow=>follow.title !=location?.state?.follows?.title));
          console.log(response)
          swal({
            title:"Success",
            text:response.success,
            icon:"success",
            buttons:"Close"
          });
        }
    }
    const Leave = async()=>{
      let response = await createOrDeleteAdmin(`${process.env.REACT_APP_ROOT_URL}/blogs/removeadmin?`,location.state.follows.id,props.username,props.jwtsession);
      if(response.route == "/"){
        props.setJwtSession("");
        localStorage.removeItem("jwtsession");
        navigate(response.route);
        }
        else if(response.error){
          swal({
            title:"Error",
            text:response.error,
            icon:"error",
            buttons:"Close"
          });
        }
        else{
          setIsNone(true);
          setIsFollower(false);
          setIsAdmin(false);
          props.setFollowedBlogs(props.followedblogs.filter(follow=>follow.title !=location?.state?.follows?.title));
          console.log(response)
          swal({
            title:"Success",
            text:response.success,
            icon:"success",
            buttons:"Close"
          });
        }
    }
    const deleteThisBlog = async()=>{
      let response = await deleteBlog(`${process.env.REACT_APP_ROOT_URL}/blogs/delete?`,location.state.follows.id,props.jwtsession);
      if(response.route == "/"){
        props.setJwtSession("");
        localStorage.removeItem("jwtsession");
        navigate(response.route);
        }
        else if(response.error){
          swal({
            title:"Error",
            text:response.error,
            icon:"error",
            buttons:"Close"
          });
        }
        else{
          setIsAdmin(false);
          setIsFollower(false);
          setIsOwner(false);
          setIsNone(false);
          props.setFollowedBlogs(props.followedblogs.filter(follow=>follow.title !=location?.state?.follows?.title));
          navigate("/");
          swal({
            title:"Success",
            text:response.success,
            icon:"success",
            buttons:"Close"
          });
        }
    }
      if (isLoading) {
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
        <h1>If Page Is Not Loading Something Went Wrong Please Try Again</h1>
        </React.Fragment>
        )
      }
    return(
        <React.Fragment>
        <Nav/>
        <div>
        <Bounce key={location.key} left>
        <div className={style.nav}>
            <div className={style.title}>
                <p className={style.titlecontent}>{`Blog:${location?.state?.follows?.title}`}</p>
                 {!isLoading&&isOwner && (
                    <div className={style.buttons}>
                         <button className={`btn btn-sm btn-outline-dark ${style.follow}`} onClick={deleteThisBlog}>Delete</button>                 
                         <button className={`btn btn-sm btn-outline-danger ${style.subject}`} onClick={subjectClicked}>Subject</button>
                         </div>
                 )}
                  {!isLoading&&isAdmin && (
                    <div className={style.buttons}>
                         <button className={`btn btn-sm btn-outline-dark ${style.follow}`} onClick={Leave}>Leave</button>                 
                         <button className={`btn btn-sm btn-outline-danger ${style.subject}`} onClick={subjectClicked}>Subject</button>
                         </div>
                 )}
                    {!isLoading&&isFollower && (
                    <div className={style.buttons}>
                         <button className={`btn btn-sm btn-outline-dark ${style.follow}`} onClick={unFollowThisBlog}>Unfollow</button>                 
                         <button className={`btn btn-sm btn-outline-danger ${style.subject}`} onClick={subjectClicked}>Subject</button>
                         </div>
                 )}
                    {!isLoading&&isNone && (
                    <div className={style.buttons}>
                         <button className={`btn btn-sm btn-outline-dark ${style.follow}`} onClick={followABlog}>Follow</button>                 
                         <button className={`btn btn-sm btn-outline-danger ${style.subject}`} onClick={subjectClicked}>Subject</button>
                         </div>
                 )}
                
            </div>
        </div>
        
            <Bounce left opposite when={bounce}>
            <div className={style.subjectinside}>
                <p className={style.subjectwriting}>{`${location?.state?.follows?.subject}`}</p>
            </div>
            </Bounce>
            {
              posts.map((item,index) => (
                <Post
                key={item.id}
                postid = {item.id}
                userphoto={item.userPhoto}
                user={item.userName}
                likes={item.likes}
                post={item.post}
                comments={item.comments}
                admin = {isAdmin? true:false}
                owner = {isOwner? true:false}
                deletePost = {deletePost}
            />
              ))
            }
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