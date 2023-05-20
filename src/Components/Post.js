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
const Post = (props)=>{
const quillRef = useRef(null);
const animationVariants = {
  hidden: { opacity: 0, y: -200 },
  visible: { opacity: 1, y: 0 },
};
const [body,setBody] = useState(props.post);
const [backgroundImage, setBackgroundImage] = useState(noLikeImage);
const [comment,setComment] = useState(false);
const [userphoto,setUserPhoto] = useState(props.userphoto);
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
    const response = await createLike(`${process.env.REACT_APP_ROOT_URL}/like/create`,props.jwtsession,props.postid);
    props.likes+=1;
  }
  else{
    setBackgroundImage(noLikeImage);
    const response = await deleteLike(`${process.env.REACT_APP_ROOT_URL}/like/delete`,props.jwtsession,props.postid);
    props.likes-=1;
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
return(
<React.Fragment>
<div className={style.all}>
<div className={style.postBackground}>
        <div className={style.photoName}>
        <img className={style.userphoto} src={userphoto}/>
        <h1 className={style.name}>{props.user}</h1>
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
      <textarea rows={4} cols={50} className={style.writecomment}></textarea>
      <motion.button className='btn btn-outline-dark' style={{fontSize:'large',fontWeight:'bold',alignSelf:'center',marginTop:'10px'}}>SEND</motion.button>
      <div className={style.likecomment}>
      <motion.div className={style.likeandcount} whileHover={{scale:1.1}} whileTap={{scale:0.9}} onClick={handleBackgroundImageChange}>
    <div className={style.like} style={{ backgroundImage: `url(${backgroundImage})` }}></div>
    <p className={style.count}>{props.likes}</p>
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
              const comments = [];
              for(let i = 0;i<3;i++){
              comments.push(<Comment/>);}
            return comments;})()}
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
