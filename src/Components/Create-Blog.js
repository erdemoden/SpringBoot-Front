import React from "react";
import { CreateNewBlog } from "../Services/BlogService";
import { connect } from 'react-redux';
import style from "../Styles/CreateBlog.module.css";
import swal from "sweetalert";
import Nav from './Nav';
const CreateBlog = (props)=>{
    const Create = async ()=>{
        let title = document.getElementById("title").value.trim();
        let subject = document.getElementById("subject").value.trim();
        let response = await CreateNewBlog(`${process.env.REACT_APP_ROOT_URL}/blogs/save`,title,subject,props.jwtsession);
        if(response.error && !response.errors){
          swal({
            title: "Error",
            text: response.error,
            icon: "error",
            button: "Close This Alert",
          });
        }
        else if(response.errors){
          swal({
            title: "Error",
            text: response.errors[0].defaultMessage,
            icon: "error",
            button: "Close This Alert",
          });
        }
        else{
            alert("title : "+response.title);
            console.log(response);
        }
    }

    return(
    <React.Fragment>
    <Nav/>
    <div>
        <h2 className={style.titles}>TITLE (Must Be Unique)</h2>
        <input type="text" placeholder="Title Max 15 Characters" className={style.titles} id="title"/>
        <h2 className={style.titles}>SUBJECT</h2>
        <textarea className={style.textarea} placeholder="Please Explain Your Blog...   Max 350 Characters!" id="subject"/>
        <button className="btn btn-success" style={{display:"block",margin:"0 auto",marginTop:30}} onClick={Create}>CREATE</button>
    </div>
    </React.Fragment>
    );
}
const mapStateToProps = (state)=>{
    return{
      username:state.username,
      jwtsession:state.jwtsession,
      userpicpath:state.userpicpath
    }
  }
  const mapDispatchToProps = (dispatch) =>{
    return{
      setUserName: (username) =>{ dispatch({'type':'SET_NAME',username})},
      setJwtSession: (jwtsession) =>{ dispatch({'type':'SET_JWTSESSION',jwtsession})},
      setUserPicPath:(userpicpath) =>{ dispatch({'type':'SET_USERPIC',userpicpath})}
    }
  }
  export default connect(mapStateToProps,mapDispatchToProps) (CreateBlog);