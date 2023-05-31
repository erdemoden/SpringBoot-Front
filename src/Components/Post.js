import ReactQuill from 'react-quill';
import Nav from './Nav';
import React,{useEffect, useRef} from 'react';
import { useState } from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import { connect } from 'react-redux';
import 'react-quill/dist/quill.snow.css';
import style from "../Styles/Post.module.css";
import noLikeImage from '../Images/nolike.png';
import likeImage from '../Images/like.png';
import Comment from './Comment';
import { createLike, deleteLike, isLikedByUser } from '../Services/LikeService';
import { createComment } from '../Services/CommentService';
import swal from 'sweetalert';
import { DeletePostById } from '../Services/PostService';
import { useNavigate } from 'react-router-dom';
const Post = (props)=>{
const quillRef = useRef(null);
const animationVariants = {
  hidden: { opacity: 0, y: -200 },
  visible: { opacity: 1, y: 0 },
};
const [likes,setLikes] = useState(props.likes);
const [comments,setComments] = useState(props.comments)
const [body,setBody] = useState(props.post);
const [backgroundImage, setBackgroundImage] = useState(noLikeImage);
const [comment,setComment] = useState(false);
const [userphoto,setUserPhoto] = useState(props.userphoto);
const navigate = useNavigate();
useEffect(async()=>{
  const disabled = document.getElementsByClassName("ql-disabled")[0];
const editor = document.getElementsByClassName("ql-editor")[0];
  if(disabled){
    disabled.style.overflowY = 'scroll';
  }
  if(editor){
    editor.style.overflowY = 'scroll';
  }
  const response = await isLikedByUser(`${process.env.REACT_APP_ROOT_URL}/like/isuserliked?`,props.jwtsession,props.postid);
  if(response == true){
    setBackgroundImage(likeImage);
  }
  else{
    setBackgroundImage(noLikeImage);
  }
},[]);
const handleBackgroundImageChange = async ()=>{
  if(backgroundImage == noLikeImage){
    setBackgroundImage(likeImage);
    setLikes(likes+1);
    const response = await createLike(`${process.env.REACT_APP_ROOT_URL}/like/create`,props.jwtsession,props.postid);
  }
  else{
    setBackgroundImage(noLikeImage);
    setLikes(likes-1);
    const response = await deleteLike(`${process.env.REACT_APP_ROOT_URL}/like/delete`,props.jwtsession,props.postid);
  }
}
const handleComment = ()=>{
  if(comment){
    setComment(false);
  }
  else{
    setComment(true);
  }
}
const sendComment = async ()=>{
  let comment = document.getElementById("commentitself").value;
let response = await createComment(`${process.env.REACT_APP_ROOT_URL}/comments/createcomment`,props.postid,comment,props.jwtsession);
if(response.errors){
  swal({
    title: "Error",
    text: response.errors[0].defaultMessage,
    icon: "error",
    button: "Close This Alert",
  });
}
else if(response.error){
  swal({
    title: "Error",
    text: response.error,
    icon: "error",
    button: "Close This Alert",
  });
}
else{
  setComments((prewState)=>[...prewState,response.object]);
  swal({
    title: "Success",
    text: response.success,
    icon: "success",
    button: "Close This Alert",
  });
}
}
return(
<React.Fragment>
<div className={style.all}>
<div className={style.postBackground}>
        <div className={style.photoName}>
        <img className={style.userphoto} src={userphoto}/>
        <h1 className={style.name}>{props.user}</h1>
        {(props.user == props.username || props.admin || props.owner)&& (
          <div style={{marginLeft:'auto',marginRight:'40px'}}>
        <button className='btn-sm btn-danger' onClick={()=>{props.deletePost(props.postid)}}>Delete Post</button>
        </div>
        )}
        </div>
        <ReactQuill
          placeholder='Write Something You Want To Write....'
          modules={Post.module}
          readOnly={true}
          value={body}
          ref={quillRef}
          style={{backgroundColor:'white',color:'black'}}
        />
      <p className={style.commentp}>Write Comment</p>
      <textarea rows={4} cols={50} className={style.writecomment} id='commentitself'></textarea>
      <motion.button className='btn btn-outline-dark' style={{fontSize:'large',fontWeight:'bold',alignSelf:'center',marginTop:'10px'}} onClick={sendComment}>SEND</motion.button>
      <div className={style.likecomment}>
      <motion.div className={style.likeandcount} whileHover={{scale:1.1}} whileTap={{scale:0.9}} onClick={handleBackgroundImageChange}>
    <div className={style.like} style={{ backgroundImage: `url(${backgroundImage})` }}></div>
    <p className={style.count}>{likes}</p>
    </motion.div>
    <motion.div className={style.commentandstring} whileHover={{scale:1.1}} whileTap={{scale:0.9}} onClick={handleComment}>
      <div className={style.comment}><p className={style.commentstring}>Comments</p></div>
    </motion.div>
    </div>
 {/*
 <AnimatePresence>
   {comment && (
    <motion.div>

    </motion.div>
   )
   }
  </AnimatePresence>
 */}
</div>
<AnimatePresence>
  {comment && (
    <motion.div 
    initial = "hidden"
    exit={{ opacity: 0, y: -200, transition: { duration: 0.5 } }}
    animate="visible"
    variants={animationVariants}
    transition={{ duration: 0.5 }}
    className={style.covercomment}
    >
      {( ()=>{
              const commentsreturn = [];
             comments.forEach(comment => {
              commentsreturn.push(<Comment username = {comment.user.username} comment = {comment.comment} userphoto={comment.user.userphoto}/>);
             });
            return commentsreturn;})()}
    </motion.div>
  )
  }
</AnimatePresence>
</div>
</React.Fragment>
)

}
Post.module = {
    toolbar:false
}

const mapStateToProps = (state)=>{
    return{
      username:state.username,
      jwtsession:state.jwtsession,
      userpicpath:state.userpicpath,
      followedblogs:state.followedblogs
    }
  }
  const mapDispatchToProps = (dispatch) =>{
    return{
      setUserName: (username) =>{ dispatch({'type':'SET_NAME',username})},
      setJwtSession: (jwtsession) =>{ dispatch({'type':'SET_JWTSESSION',jwtsession})},
      setUserPicPath:(userpicpath) =>{ dispatch({'type':'SET_USERPIC',userpicpath})},
      setFollowedBlogs:(followedblogs) =>{ dispatch({'type':'SET_FOLLOWEDBLOGS',followedblogs})}
    }
  }
  export default connect(mapStateToProps,mapDispatchToProps) (Post);
