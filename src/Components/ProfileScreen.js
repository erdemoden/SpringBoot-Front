import React from 'react';
import { motion,useViewportScroll } from "framer-motion"
import {useNavigate} from 'react-router-dom';
import { useEffect, useState } from "react";
import Design from '../Styles/ProfileScreen.module.css';
import {GetWithAuth} from '../Services/HttpServices';
import { uploadPhoto,getUserPhoto } from '../Services/UserPrefs';
import { connect } from 'react-redux';
import Nav from './Nav';
import swal from 'sweetalert';
const ProfileScreen = (props)=>{
    const navigate = useNavigate();
    const [imageUrl, setImageUrl] = useState(props.userpicpath);
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
            props.setPhoto(response.picPath);
            console.log(response.picPath);
            setImageUrl(response.picPath);
        }
      });
    }
    return(
        <React.Fragment>
        <Nav username={props.username}/>
        <motion.div className={Design.image} id= "userphoto" whileHover={{scale:1.1}} whileTap={{scale:0.9}} onClick={uploadFile} style={{backgroundImage:`url(${props.userpicpath})`}}/>
        <input id='choose' type='file' style={{display:'none'}}/>
        <div className={Design.flexs}>
        <div className={Design.flex}>
        <motion.button whileHover={{scale:1.1}} whileTap={{scale:0.9}} className="btn btn-outline-dark" style={{marginTop:30,borderWidth:3,fontWeight:'bolder',display:'inline-block'}}>Posts</motion.button>
        <motion.button whileHover={{scale:1.1}} whileTap={{scale:0.9}} className="btn btn-outline-dark" style={{marginTop:30,borderWidth:3,fontWeight:'bolder',display:'inline-block'}}>Likes</motion.button>
        <motion.button whileHover={{scale:1.1}} whileTap={{scale:0.9}} className="btn btn-outline-dark" style={{marginTop:30,borderWidth:3,fontWeight:'bolder',display:'inline-block'}}>Comments</motion.button>
        <motion.button whileHover={{scale:1.1}} whileTap={{scale:0.9}} className="btn btn-outline-dark" style={{marginTop:30,borderWidth:3,fontWeight:'bolder',display:'inline-block'}}>Change Image</motion.button>
        <motion.button whileHover={{scale:1.1}} whileTap={{scale:0.9}} className="btn btn-outline-dark" style={{marginTop:30,borderWidth:3,fontWeight:'bolder',display:'inline-block'}}>30 Minute Block</motion.button>
        </div>
        </div>
        </React.Fragment>
    );
}
const mapStateToProps = (state)=>{
  return{
    userpicpath:state.userpicpath,
    jwtsession:state.jwtsession
  }
}
const mapDispatchToProps = (dispatch) =>{
  return{
    setPhoto: (userpicpath) =>{dispatch({'type':'SET_USERPIC',userpicpath})},
    setJwtSession: (jwtsession) => (dispatch({'type':'SET_JWTSESSION',jwtsession}))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(ProfileScreen);