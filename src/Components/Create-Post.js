import React,{useRef} from 'react';
import style from'../Styles/Create_R.module.css';
import "../App.css"
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import { CreateOnePost } from '../Services/PostService';
import {useNavigate} from 'react-router-dom';
import { useState } from 'react';
import Nav from './Nav';
import { connect } from 'react-redux';
import swal from "sweetalert";
const Create_Post = (props)=>{
const navigate = useNavigate();
const [body,setBody] = useState("");
const quillRef = useRef(null);
const handleBody = (e)=>{
    setBody(e);
    console.log(body);
}
const sendPost = async(select,body)=>{
  let response = await CreateOnePost(`${process.env.REACT_APP_ROOT_URL}/post/save`,select,body,props.jwtsession);
  if(response.route!=undefined){
    console.log("redux silindi"+response.route);
    props.setJwtSession("");
    navigate(response.route);
  }
  else if(response.error){
    swal({
      title: "Error",
      text: response.error,
      icon: "error",
      button: "Close This Alert",
    })
  }
  else{
    swal({
      title:"Post Created",
      text:response.message,
      icon:"success",
      button:"Close"
    })
  }
}
return(
<React.Fragment>
<Nav username={props.username}/>
<h2 className={style.blog}>CHOOSE A BLOG YOU ARE FOLLOWING</h2>
<select class="form-select"style={{ display:'block',width:'50%',margin:'0 auto'}} aria-label="Default select example" id='select'>
  { props.followedblogs &&(
    props.followedblogs.map(follow=>{
        return  <option value={follow.title}>{follow.title}</option>
    })
  )
  }
</select>
<div className='arka'>
<ReactQuill placeholder='Write Something You Want To Write....'
modules={Create_Post.modules}
formats={Create_Post.formats}
onChange={handleBody}
value={body}
ref={quillRef}
/>
<button className='btn btn-success' style={{display:"block",margin:"0 auto",marginTop:"30px"}} onClick={()=>{sendPost(document.getElementById("select").value,body)}}>Send</button>
</div>
<ReactQuill placeholder='Write Something You Want To Write....'
modules={Create_Post.module2}
readOnly={true}
value={body}
ref={quillRef}
style={{ backgroundColor: 'white', color: 'black' }}
/>
</React.Fragment>
);
}
Create_Post.modules = {
    toolbar:[
        [{header:"1"},{header:"2"},{header:[3,4,5,6]},{font:[]}],
        [{size:[]}],
        ["bold","italic","underline","strike","blockquote"],
        [{list:"ordered"},{list:"bullet"}],
        ["link","image","video"],
        ["clean"],
        ["code-block"],
        [{ align: 'center' }]
    ],
};
Create_Post.module2 = {
    toolbar:false
}
Create_Post.formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
    "video",
    "code-block",
    "align"
];
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
export default connect(mapStateToProps,mapDispatchToProps) (Create_Post);