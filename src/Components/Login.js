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
import { Oval } from 'react-loader-spinner';
import {GetWithAuth ,GetWithRefresh,beforeRegister,registerWithMail, beforeLogin} from '../Services/HttpServices';
let number = 1;
const Login  = (props)=>{
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [allState,setAllState] = useState({
    title:props.title,
    message:props.message,
    button:props.button,
    show:true
  });
   const beforeLoad = async ()=>{ 
    console.log(process.env.REACT_APP_ROOT_URL);
    let response = await GetWithAuth(`${process.env.REACT_APP_ROOT_URL}/auth/route`,"/homepage",props.jwtsession);
    if(response.route == "/"){
      document.body.className = background.deneme;
      props.setJwtSession("");
      //localStorage.removeItem("jwtsession");
    }
    else{
      document.body.className = Menustyle.deneme;
    }
    setIsLoading(false);
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
          let postres = await beforeRegister(`${process.env.REACT_APP_ROOT_URL}/auth/beforeregister`,document.getElementById("username").value.trim(),document.getElementById("email").value,document.getElementById("password").value); 
          if(postres.created == true){
             Swal.fire({
              html:`<h1>Please Write The Code We Sent To Your Email</h1>
              <input type="text" id="code" class="swal2-input" placeholder="CODE" style="width:50%;">
              <button id="send" class="btn btn-success">
      SEND
    </button><br/><br/>
    You Have <strong></strong> seconds.<br/><br/>
              `,
              timer:90000,
              icon: "success",
              allowOutsideClick:false,
              showCancelButton:true,
              didOpen: ()=>{
                const content = Swal.getHtmlContainer()
                const $ = content.querySelector.bind(content)
                const send = $('#send');
                const code = $('#code');
                send.addEventListener("click",async()=>{
                  let postres2 =  await registerWithMail(`${process.env.REACT_APP_ROOT_URL}/auth/registerwithmail`,code.value.trim().toLowerCase());
          if(postres2.created == true){
            props.setJwtSession(postres2.accessToken);
            //localStorage.setItem("jwtsession",postres2.accessToken);
            navigate('/homepage');
            Swal.close();
          }
          else if(postres2.created == false){
            Swal.close();
            swal({
              title: postres2.error,
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
         else{
          swal({
            title: postres.error,
            text: "Please Check And Try Again",
            icon: "error",
            button: "Close This Alert",
          });
         }
        }
         else if(allState.title === "Login"){
          let postres = await beforeLogin(`${process.env.REACT_APP_ROOT_URL}/auth/beforelogin`,document.getElementById("username").value.trim(),document.getElementById("password").value);
          if(postres.created == true){
            Swal.fire({
              html:`<h1>Please Write The Code We Sent To Your Email</h1>
              <input type="text" id="code" class="swal2-input" placeholder="CODE" style="width:90%; margin-left:0px;">
              <button id="send" class="btn btn-success">
              SEND
              </button>
              <button id="close" class="btn btn-secondary">
      CLOSE
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
                let postres2 =  await registerWithMail(`${process.env.REACT_APP_ROOT_URL}/auth/loginwithmail`,code.value.trim().toLowerCase());
          if(postres2.created == true){
            props.setJwtSession(postres.accessToken.toString());
            console.log(postres.accessToken);
            //localStorage.setItem("jwtsession",postres.accessToken);
           navigate('/homepage');
            Swal.close();
          }
          else if(postres2.created == false){
            Swal.close();
            swal({
              title: postres2.error,
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
          else if(postres.created === false){
            swal({
              title: postres.error,
              text: "Please Check And Try Again",
              icon: "error",
              button: "Close This Alert",
            });
            console.log(postres);
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
      if (isLoading) {
        return <div className={formdesign.loading}>
          <Oval
          width="100"
          height="100"
          color="black"
          ariaLabel='loading'
          />
        </div>;
      }
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
              
    );}
    const mapStateToProps = (state)=>{
      return{
        jwtsession:state.jwtsession
      }
    }
    const mapDispatchToProps = (dispatch) =>{
      return{
        setJwtSession: (jwtsession) =>{ dispatch({'type':'SET_JWTSESSION',jwtsession})}
      }
    }
              
export default connect(mapStateToProps,mapDispatchToProps) (Login);