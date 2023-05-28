import React,{useEffect, useRef} from 'react';
import { useState } from 'react';
import style from "../Styles/Post.module.css";
const Comment = (props)=>{
    let deneme = "merhaba";
return(
<React.Fragment>
<div className={style.showcomment}>
    <div className={style.commentBackground}>
    <div className={style.photonamecom}>
        <img className={style.userphotocom} src={props.userphoto}/>
        <h1 className={style.namecom}>{props.username}</h1>
        </div>
        <div className={style.textareadis}>
            <textarea rows={4} cols={50} disabled>{props.comment}</textarea>
        </div>
    </div>
  </div>
</React.Fragment>
)
}
export default Comment;