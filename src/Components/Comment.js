import React,{useEffect, useRef} from 'react';
import { useState } from 'react';
import style from "../Styles/Post.module.css";
const Comment = ()=>{
    let deneme = "merhaba";
return(
<React.Fragment>
<div className={style.showcomment}>
    <div className={style.commentBackground}>
    <div className={style.photonamecom}>
        <div className={style.userphotocom}></div>
        <h1 className={style.namecom}>deneme123456789</h1>
        </div>
        <div className={style.textareadis}>
            <textarea rows={4} cols={50} disabled>{deneme}</textarea>
        </div>
    </div>
  </div>
</React.Fragment>
)
}
export default Comment;