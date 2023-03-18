import React from "react";
import style from "../Styles/CreateBlog.module.css";
import Nav from './Nav';
const CreateBlog = (props)=>{
    const Create = async ()=>{
        let title = document.getElementById("title").value;
        let subject = document.getElementById("subject").value;
        alert(title+" : "+subject);

    }

    return(
    <React.Fragment>
    <Nav/>
    <div>
        <h2 className={style.titles}>TITLE</h2>
        <input type="text" placeholder="Title Max 30 Characters" className={style.titles} id="title"/>
        <h2 className={style.titles}>SUBJECT</h2>
        <textarea className={style.textarea} placeholder="Please Explain Your Blog...   Max 350 Characters!" id="subject"/>
        <button className="btn btn-success" style={{display:"block",margin:"0 auto",marginTop:30}} onClick={Create}>CREATE</button>
    </div>
    </React.Fragment>
    );
}

export default CreateBlog;