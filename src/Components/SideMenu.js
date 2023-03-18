import { motion,useViewportScroll } from "framer-motion"
import Menustyle from'../Styles/Menu.module.css'
import { connect } from 'react-redux';
import {useNavigate,useLocation} from 'react-router-dom';
const SideMenu = (props)=>{
    const navigate = useNavigate();
    return(
    <motion.div className = {Menustyle.sidemenu} initial = {{transform:"translate(170%)"}}animate={{transform: props.side ?"translate(20px)":"translate(170%)" }}>
        <motion.div style ={{backgroundImage:`url(http://192.168.0.13:1998/user/getphoto?location=${props.userpicpath})`}} className={`${Menustyle.userphoto} ${Menustyle.flexitems}`}whileHover={{scale:1.1}} whileTap={{scale:0.9}} onClick={()=>{document.body.style.overflow = ""; navigate("/profile")}}></motion.div>
        <h5 className={Menustyle.flexitems}>{props.username.toUpperCase()}</h5>
        <div className={Menustyle.sidescroll}>
        <motion.button whileHover={{scale:1.1}} whileTap={{scale:0.9}} className="btn btn-outline-dark" style={{marginTop:30,borderWidth:3,fontWeight:'bolder'}} onClick={()=>{document.body.style.overflow = ""; navigate("/homepage")}}>Home Page</motion.button>
        <motion.button whileHover={{scale:1.1}} whileTap={{scale:0.9}} className="btn btn-outline-dark" style={{marginTop:30,borderWidth:3,fontWeight:'bolder'}} onClick={()=>{navigate("/create-post")}}>Create Post</motion.button>
        <motion.button whileHover={{scale:1.1}} whileTap={{scale:0.9}} className="btn btn-outline-dark" style={{marginTop:30,borderWidth:3,fontWeight:'bolder'}}>Communities</motion.button>
        <motion.button whileHover={{scale:1.1}} whileTap={{scale:0.9}} className="btn btn-outline-dark" style={{marginTop:30,borderWidth:3,fontWeight:'bolder'}} onClick={()=>{navigate("/create-blog")}}>Create Community</motion.button>
        </div>
        <motion.button whileHover={{scale:1.1}} whileTap={{scale:0.9}} className="btn btn-outline-dark" style={{justifySelf:'flex-end',borderWidth:3,fontWeight:'bolder',marginTop:3}}>Log-Out</motion.button>
    </motion.div>
    );
}
const mapDispatchToProps = dispatch=>{
   
}
const mapStateToProps = state=>{
    return{
        username:state.username,
        userpicpath:state.userpicpath
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(SideMenu);