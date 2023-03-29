import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import style from "../Styles/BlogPage.module.css";
import Nav from './Nav';
import { Fade,Bounce } from "react-reveal";
const Blog = ()=>{
    const location = useLocation();
    const [bounce,setBounce] = useState(false);
    const subjectClicked = ()=>{
        if(bounce == false){
        setBounce(true);
        }
        else{
        setBounce(false);
        }
    }
    return(
        <React.Fragment>
        <Nav/>
        <div>
        <Bounce left>
        <div className={style.nav}>
            <div className={style.title}>
                <p className={style.titlecontent}>Blog: derglsenfledjse</p>
                <div className={style.buttons}>
                <button className={`btn btn-sm btn-outline-dark ${style.follow}`}>Follow</button>
                <button className={`btn btn-sm btn-outline-danger ${style.subject}`} onClick={subjectClicked}>Subject</button>
                </div>
            </div>
        </div>
        </Bounce>
            <Bounce top duration={500} delay={0} when={bounce}>
            <div className={style.subjectinside}>
                <p className={style.subjectwriting}>aasdasdadqwdd2qwDASDS</p>
            </div>
            </Bounce>
        </div>
        </React.Fragment>
    );
}
export default Blog;