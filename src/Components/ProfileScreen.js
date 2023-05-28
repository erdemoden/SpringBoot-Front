import React from 'react';
import { motion,useViewportScroll } from "framer-motion"
import {useNavigate} from 'react-router-dom';
import { useEffect, useState } from "react";
import Design from '../Styles/ProfileScreen.module.css';
import {GetWithAuth} from '../Services/HttpServices';
import { uploadPhoto,getUserPhoto } from '../Services/UserPrefs';
import { connect } from 'react-redux';
import Nav from './Nav';
import Post from './Post';
import swal from 'sweetalert';
import { GetLikesByUser, GetPostsByUser } from '../Services/PostService';
import { Bounce } from 'react-reveal';
const ProfileScreen = (props)=>{
    const navigate = useNavigate();
    const [imageUrl, setImageUrl] = useState(props.userpicpath);
    const [posts,setPosts] = useState(undefined);
    const [userpost,setUserPost] = useState(false);
    const [userlike,setUserLike] = useState(false);
    const beforeLoad = async()=>{
        console.log(props.username);
        let response = await GetWithAuth(`${process.env.REACT_APP_ROOT_URL}/auth/route`,"/profile",props.jwtsession);
        if(response.route == "/"){
        //localStorage.removeItem("jwtsession");
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
                postid = {item.id}
                userphoto={item.userPhoto}
                user={item.userName}
                likes={item.likes}
                post={item.post}
                comments={item.comments}
                admin = {false}
                owner = {false}
            />
        )
      });
      setPosts(postsArray);
      setUserPost(true);
      setUserLike(false);
    }
    const getLikes = async ()=>{
      let response = await GetLikesByUser(`${process.env.REACT_APP_ROOT_URL}/user/getlikedposts`,props.jwtsession);
      let postsArray = [];
      response.forEach(item =>{
        postsArray.push(
          <Post
          postid = {item.id}
          userphoto={item.userPhoto}
          user={item.userName}
          likes={item.likes}
          post={item.post}
          comments={item.comments}
          admin = {false}
          owner = {false}
      />
        )
      });
      setPosts(postsArray);
      setUserLike(true);
      setUserPost(false);
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
        <motion.button whileHover={{scale:1.1}} whileTap={{scale:0.9}} className="btn btn-outline-dark" style={{marginTop:30,borderWidth:3,fontWeight:'bolder',display:'inline-block'}}>30 Minute Block</motion.button>
        </div>
        </div>
        <div style={{position:'relative'}}>
        <Bounce left opposite when={userpost}>
        <div style={{position: 'absolute',left: 0,right:0,margin: '0 auto'}}>
        {posts}
       </div>
        </Bounce>
        <Bounce left opposite when={userlike}>
        <div style={{position: 'absolute',left: 0,right:0,margin: '0 auto'}}>
        {posts}
       </div>
        </Bounce>
        </div>
        </React.Fragment>
    );
}
const mapStateToProps = (state)=>{
  return{
    userpicpath:state.userpicpath,
    jwtsession:state.jwtsession,
    username:state.username
  }
}
const mapDispatchToProps = (dispatch) =>{
  return{
    setJwtSession: (jwtsession) => (dispatch({'type':'SET_JWTSESSION',jwtsession})),
    setUserPicPath:(userpicpath) =>{ dispatch({'type':'SET_USERPIC',userpicpath})},
    setFollowedBlogs:(followedblogs) =>{ dispatch({'type':'SET_FOLLOWEDBLOGS',followedblogs})},
    setUserName: (username) =>{ dispatch({'type':'SET_NAME',username})}
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(ProfileScreen);