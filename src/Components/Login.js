import '../Styles/Background.css'
import '../Styles/FormDesign.css'
import Bounce from 'react-reveal/Bounce';
import cookies from 'js-cookie'
import {useNavigate} from 'react-router-dom';
import { useState ,useEffect } from 'react';
import swal from 'sweetalert';
import { connect } from 'react-redux';
import {GetWithAuth ,GetWithRefresh} from '../Services/HttpServices';
let number = 1;
const Login  = (props)=>{
  const navigate = useNavigate();
  const [allState,setAllState] = useState({
    title:props.title,
    message:props.message,
    button:props.button,
    show:true
  });
  //  const beforeLoad = async ()=>{
  //   let response = await GetWithAuth("http://localhost:1998/");
  //   if(response.route =="/Error"){
  //     let response2 = GetWithRefresh("http://localhost:1998/");
  //     if(response2.route == "/Error"){
  //       console.log("Merhaba");
  //     }
  //     else{
  //       navigate(response.route);
  //       console.log("Merhaba2");
  //     }
  //   }
  //   else{
  //     console.log("Merhaba3");
  //   }
  //    }
      const handleClick = ()=>{
          if(allState.show === false && number === 1){
              setAllState({show:true,message:"Have Account ?",title:"Sign-Up"});
            }
          else if(allState.show === false && number === 2){
            setAllState({show:true,message:"Don't Have Account ?",title:"Login"});
          }
          
      }
      const submit = async()=>{
        if(document.getElementById("password").value.trim().length ==0){
          swal({
            title: "Password Field Is Required!",
            text: "You Should Create A Password",
            icon: "error",
            button: "Close This Alert",
          });
        }
        else if(document.getElementById("username").value.trim().length ==0){
          swal({
            title: "Username Field Is Required!",
            text: "You Should Create A Username",
            icon: "error",
            button: "Close This Alert",
          });
        }
         else if(allState.title === "Sign-Up"){
          let post = await fetch('http://localhost:1998/auth/register',{
            method:'POST',
            headers:{
              'Content-Type': 'application/json'
            },
             credentials:'include',
            body: JSON.stringify({username:document.getElementById("username").value, password:document.getElementById("password").value})
          });
          let postres = await post.json();
          if(postres.created == true){
            localStorage.setItem("jwtsession",postres.accessToken);
            navigate('/homepage');
          }
          else if(postres.created == false){
            swal({
              title: postres.error,
              text: "Please Check And Try Again",
              icon: "error",
              button: "Close This Alert",
            });
          }
         }
         else if(allState.title === "Login"){
          let post = await fetch('http://localhost:1998/auth/login',{
            method:'POST',
            headers:{
              'Content-Type': 'application/json'
            },
             credentials:'include',
            body: JSON.stringify({username:document.getElementById("username").value, password:document.getElementById("password").value})
          });
          let postres = await post.json();
          if(postres.created == true){
            localStorage.setItem("jwtsession",postres.accessToken);
            navigate('/homepage');
          }
          else if(postres.created === false){
            swal({
              title: postres.error,
              text: "Please Check And Try Again",
              icon: "error",
              button: "Close This Alert",
            });
          }
         }
      }
      // useEffect(() =>{
      //   beforeLoad();
      // },[]);
      useEffect( ()=>{
        setTimeout(() => {
              if(allState.show === true && number === 1){
                setAllState({show:false,message:"Have Account ?",title:"Sign-Up"});
                number = 2;
                console.log(allState.message);
              }
              else if(allState.show === true && number === 2){
                setAllState({show:false,message:"Don't Have Account ?",title:"Login"});
                number = 1;
            }
          }, 300);
      },[allState]);
        return(
            <div>
            <Bounce left opposite when={!allState.show}>
            <div className='formBack'>
                <h1 className='Title'>{allState.title}</h1>
                <input type="text" name = "username" placeholder="Username" id='username'></input>
                <input type="password" name = "password" placeholder="Password" id='password'></input>
                <input type="button" value={allState.title} onClick = {submit} ></input>
                <p>{allState.message} <span style={{color:"blue",cursor:"pointer"}} onClick = {handleClick}>Click Here</span></p>
            </div>
            </Bounce>
            </div>
           
    );
        }
    



export default Login;