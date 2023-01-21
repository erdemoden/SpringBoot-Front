import background from'../Styles/Background.module.css'
import formdesign from'../Styles/FormDesign.module.css'
import Bounce from 'react-reveal/Bounce';
import cookies from 'js-cookie'
import Menustyle from'../Styles/Menu.module.css'
import {useNavigate} from 'react-router-dom';
import { useState ,useEffect } from 'react';
import swal from 'sweetalert';
import Swal from 'sweetalert2'
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
   const beforeLoad = async ()=>{ 
    let response = await GetWithAuth("http://localhost:1998/auth/route");
    if(response.route == "/"){
      document.body.className = background.deneme;
      localStorage.removeItem("jwtsession");
    }
    if(response.route == "homepage"){
      document.body.className = Menustyle.deneme;
    }
    navigate(response.route);
     }
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
            text: "Please Write Your Password",
            icon: "error",
            button: "Close This Alert",
          });
        }
        else if(document.getElementById("username").value.trim().length ==0){
          swal({
            title: "Username Field Is Required!",
            text: "Please Write Your Username",
            icon: "error",
            button: "Close This Alert",
          });
        }
        else if(document.getElementById("username").value.trim().length >=15&&allState.title!="Login"){
          swal({
            title: "Username Can Not More Than 15 Characters",
            text: "Please Try Another Username",
            icon: "error",
            button: "Close This Alert",
          });
         }
       else if(document.getElementById("email")!=null && document.getElementById("email").value.trim().length ==0){
        swal({
          title: "E-Mail Field Is Required!",
          text: "Please Write Your E-Mail",
          icon: "error",
          button: "Close This Alert",
        });
     
       }
         else if(allState.title === "Sign-Up"){
          let post = await fetch('http://localhost:1998/auth/beforeregister',{
            method:'POST',
            headers:{
              'Content-Type': 'application/json'
            },
             credentials:'include',
            body: JSON.stringify({username:document.getElementById("username").value.trim(), email:document.getElementById("email").value,password:document.getElementById("password").value})
          });
          let postres = await post.json();
          if(postres.created == true){
             Swal.fire({
              html:`<h1>Please Write The Code We Sent To Your Email</h1>
              <input type="text" id="code" class="swal2-input" placeholder="CODE">
              <button id="send" class="btn btn-success">
      SEND
    </button><br/><br/>
    You Have <strong></strong> seconds.<br/><br/>
              `,
              timer:90000,
              icon: "success",
              allowOutsideClick:false,
              didOpen: ()=>{
                const content = Swal.getHtmlContainer()
                const $ = content.querySelector.bind(content)
                const send = $('#send');
                const code = $('#code');
                send.addEventListener("click",async()=>{
                  let post2 = await fetch('http://localhost:1998/auth/registerwithmail',{
                    method:'POST',
                    headers:{
                      'Content-Type': 'application/json'
                    },
                     credentials:'include',
                    body:JSON.stringify({key:code.value})
                });
              let postres2 = await post2.json();
          if(postres2.created == true){
            localStorage.setItem("jwtsession",postres2.accessToken);
            navigate('/homepage');
            Swal.close();
          }
          else if(postres2.created == false){
            Swal.close();
            swal({
              title: postres.error,
              text: "Please Check And Try Again",
              icon: "error",
              button: "Close This Alert",
            });
          }
              });
                Swal.showLoading();
                setInterval(() => {
                  Swal.getHtmlContainer().querySelector('strong')
                    .textContent = (Swal.getTimerLeft() / 1000)
                      .toFixed(0)
                }, 100)
             
            }})
         }
         else if(allState.title === "Login"){
          let post = await fetch('http://localhost:1998/auth/login',{
            method:'POST',
            headers:{
              'Content-Type': 'application/json'
            },
             credentials:'include',
            body: JSON.stringify({username:document.getElementById("username").value.trim(), password:document.getElementById("password").value})
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
    }
      useEffect(() =>{
        beforeLoad();
      },[]);
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
            <div className={allState.title =="Login" ? formdesign.formBack : formdesign.formBackSignUp}>
                <h1 className={formdesign.Title}>{allState.title}</h1>
                <input type="text" name = "username" placeholder={allState.title == 'Login' ? 'Username Or Email' : 'Username'} id='username'></input>
                {allState.title =="Sign-Up" &&
                <input type="text" name = "email" placeholder="E-Mail" id='email'></input>
                }
                <input type="password" name = "password" placeholder="Password" id='password'></input>
                <input type="button" value={allState.title} onClick = {submit} ></input>
                <p>{allState.message} <span style={{color:"blue",cursor:"pointer"}} onClick = {handleClick}>Click Here</span></p>
            </div>
            </Bounce>
            </div>
           
    );
        }


export default Login;