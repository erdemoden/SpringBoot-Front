import { AnimatePresence, motion,useViewportScroll } from "framer-motion"
import Menustyle from'../Styles/Menu.module.css'
import { connect } from 'react-redux';
import {useNavigate,useLocation} from 'react-router-dom';
import { useEffect, useState } from "react";
import { Bounce } from "react-reveal";
const SideMenu = (props)=>{
    const navigate = useNavigate();
    const [imageUrl, setImageUrl] = useState(props.userpicpath);
    const [follows,setFollows] = useState(false);
    const showFollows = ()=>{
        setFollows(follows === false ? true:false);
    }
    const animationVariants = {
        hidden: { opacity: 0, x: +200 },
        visible: { opacity: 1, x: 0 },
      };
    return(
    <motion.div className = {Menustyle.sidemenu} initial = {{transform:"translate(170%)"}}animate={{transform: props.side ?"translate(20px)":"translate(170%)" }}>
        <motion.div style ={{backgroundImage:`url(${props.userpicpath}`}} className={`${Menustyle.userphoto} ${Menustyle.flexitems}`}whileHover={{scale:1.1}} whileTap={{scale:0.9}} onClick={()=>{document.body.style.overflow = ""; navigate("/profile")}}></motion.div>
        <h5 className={Menustyle.flexitems}>{props.username.toUpperCase()}</h5>
        <div className={Menustyle.sidescroll}>
        <motion.button whileHover={{scale:1.1}} whileTap={{scale:0.9}} className="btn btn-outline-dark" style={{marginTop:30,borderWidth:3,fontWeight:'bolder'}} onClick={()=>{document.body.style.overflow = ""; navigate("/homepage")}}>Home Page</motion.button>
        <motion.button whileHover={{scale:1.1}} whileTap={{scale:0.9}} className="btn btn-outline-dark" style={{marginTop:30,borderWidth:3,fontWeight:'bolder'}} onClick={()=>{navigate("/create-post")}}>Create Post</motion.button>
        <motion.button whileHover={{scale:1.1}} whileTap={{scale:0.9}} className="btn btn-outline-dark" style={{marginTop:30,borderWidth:3,fontWeight:'bolder'}} onClick={()=>{showFollows()}}>Followed Communities</motion.button>
        <AnimatePresence>
        {follows && (
          <motion.div
            initial="hidden"
            exit={{ opacity: 0, x: -200, transition: { duration: 0.5 } }}
            animate="visible"
            variants={animationVariants}
            transition={{ duration: 0.5 }}
          >
             <motion.button whileHover={{scale:1.1}} whileTap={{scale:0.9}} className="btn btn-outline-dark" style={{marginTop:30,borderWidth:3,fontWeight:'bolder'}} onClick={()=>{navigate("/create-blog")}}>DENEME</motion.button>
          </motion.div>
        )}
        </AnimatePresence>
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