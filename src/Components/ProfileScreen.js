import React from 'react';
import { motion,useViewportScroll } from "framer-motion"
import {useNavigate} from 'react-router-dom';
import { useEffect, useState } from "react";
import Design from '../Styles/ProfileScreen.module.css';
import {GetWithAuth} from '../Services/HttpServices';
import { uploadPhoto,getUserPhoto, thirtyMinuteBlock, deleteTimeBlock } from '../Services/UserPrefs';
import { connect } from 'react-redux';
import Nav from './Nav';
import Post from './Post';
import swal from 'sweetalert';
import { GetLikesByUser, GetPostsByUser,DeletePostById } from '../Services/PostService';
import { Bounce } from 'react-reveal';
const ProfileScreen = (props)=>{
    const navigate = useNavigate();
    const [imageUrl, setImageUrl] = useState(props.userpicpath);
    const [posts,setPosts] = useState(undefined);
    const [userpost,setUserPost] = useState(false);
    const [userlike,setUserLike] = useState(false);
    const [animationKey,setAnimationKey] = useState(0);
    const beforeLoad = async()=>{
        console.log(props.username);
        let response = await GetWithAuth(`${process.env.REACT_APP_ROOT_URL}/auth/route`,"/profile",props.jwtsession);
        if(response.route == "/"){
        localStorage.removeItem("jwtsession");
        props.setJwtSession("");
        navigate(response.route);
        }
        else{
          navigate(response.route);
          props.setUserName(response.username);
          props.setUserPicPath(response.location);
          props.setFollowedBlogs(response.followedblogs);
        }
        console.log(props.userpicpath);
         }
  useEffect(() =>{
      beforeLoad();
    },[]);
    /*useEffect(() => {
      setImageUrl(props.userpicpath);
    }, [props.userpicpath]);*/
    const uploadFile = async ()=>{
      const choose = document.getElementById("choose");
      choose.click();
      choose.addEventListener("change",async()=>{
    //     const file = choose.files[0];
    // const imageUrl = URL.createObjectURL(file);
    // setImageUrl(imageUrl); 
    // props.setPhoto(imageUrl)
      const formData = new FormData();
      formData.append("userpic",choose.files[0]);
      console.log(formData);
      let response = await uploadPhoto(`${process.env.REACT_APP_ROOT_URL}/user/userpic`,formData,props.jwtsession);
        if(response.error !=null){
          swal({
            title: response.error,
            text: "Please Try After Some Time",
            icon: "error",
            button: "Close This Alert",
          });
        }
        else{
            props.setUserPicPath(response.picPath);
            console.log(response.picPath);
            setImageUrl(response.picPath);
        }
      });
    }
    const getPosts = async ()=>{
      let response = await GetPostsByUser(`${process.env.REACT_APP_ROOT_URL}/user/getuserposts`,props.jwtsession);
      let postsArray = [];
      response.forEach(item => {
        postsArray.push(
          <Post
                key={item.id}
                postid = {item.id}
                userphoto={item.userPhoto}
                user={item.userName}
                likes={item.likes}
                post={item.post}
                comments={item.comments}
                admin = {false}
                owner = {false}
                deletePost = {deletePost}
            />
        )
      });
      setPosts(postsArray);
      setUserPost(true);
      setUserLike(false);
      setAnimationKey(prewKey=>prewKey+1);
    }
    const getLikes = async ()=>{
      let response = await GetLikesByUser(`${process.env.REACT_APP_ROOT_URL}/user/getlikedposts`,props.jwtsession);
      let postsArray = [];
      response.forEach(item =>{
        postsArray.push(
          <Post
          key={item.id}
          postid = {item.id}
          userphoto={item.userPhoto}
          user={item.userName}
          likes={item.likes}
          post={item.post}
          comments={item.comments}
          admin = {false}
          owner = {false}
          deletePost = {deletePost}
      />
        )
      });
      setPosts(postsArray);
      setUserLike(true);
      setUserPost(false);
      setAnimationKey(prewKey=>prewKey+1);    
    }
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
    const blockActivePassive = async()=>{
      if(!props.blocked){
      props.setBlocked(true);
      await thirtyMinuteBlock(`${process.env.REACT_APP_ROOT_URL}/user/blockuser`,props.jwtsession);
      }
      else{
        props.setBlocked(false);
        await deleteTimeBlock(`${process.env.REACT_APP_ROOT_URL}/user/deleteblock`,props.jwtsession);
      }
    }
    return(
        <React.Fragment>
        <Nav username={props.username}/>
        <motion.div className={Design.image} id= "userphoto" whileHover={{scale:1.1}} whileTap={{scale:0.9}} onClick={uploadFile} style={{backgroundImage:`url(${props.userpicpath})`}}/>
        <input id='choose' type='file' style={{display:'none'}}/>
        <div className={Design.flexs}>
        <div className={Design.flex}>
        <motion.button whileHover={{scale:1.1}} whileTap={{scale:0.9}} className="btn btn-outline-dark" style={{marginTop:30,borderWidth:3,fontWeight:'bolder',display:'inline-block'}} onClick={()=>{getPosts()}}>Posts</motion.button>
        <motion.button whileHover={{scale:1.1}} whileTap={{scale:0.9}} className="btn btn-outline-dark" style={{marginTop:30,borderWidth:3,fontWeight:'bolder',display:'inline-block'}} onClick={()=>{getLikes()}}>Likes</motion.button>
        <motion.button whileHover={{scale:1.1}} whileTap={{scale:0.9}} className={props.blocked? "btn btn-outline-danger":"btn btn-outline-success"} style={{marginTop:30,borderWidth:3,fontWeight:'bolder',display:'inline-block'}} onClick={()=>{blockActivePassive()}}>30 Minute Block</motion.button>
        </div>
        </div>
        <Bounce left opposite when={userpost||userlike}>
          <div key={animationKey}>
            {posts}
        </div>
        </Bounce>
        </React.Fragment>
    );
}
const mapStateToProps = (state)=>{
  return{
    userpicpath:state.userpicpath,
    jwtsession:state.jwtsession,
    username:state.username,
    blocked:state.blocked
  }
}
const mapDispatchToProps = (dispatch) =>{
  return{
    setJwtSession: (jwtsession) => (dispatch({'type':'SET_JWTSESSION',jwtsession})),
    setUserPicPath:(userpicpath) =>{ dispatch({'type':'SET_USERPIC',userpicpath})},
    setFollowedBlogs:(followedblogs) =>{ dispatch({'type':'SET_FOLLOWEDBLOGS',followedblogs})},
    setUserName: (username) =>{ dispatch({'type':'SET_NAME',username})},
    setBlocked: (blocked) => { dispatch({'type':'SET_BLOCK',blocked})}
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(ProfileScreen);