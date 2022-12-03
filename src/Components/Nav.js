import React from 'react';
import { motion,useViewportScroll } from "framer-motion"
import { useEffect,useState } from "react";
import { Bounce,Fade, Flip, Roll, Rotate, Slide, Zoom} from 'react-reveal';
import Menustyle from'../Styles/Menu.module.css'
const Nav = (props)=>{
const [myslide,setmyslide] = useState(
        {
          isanimated:false
        }
      );
      const [hidden, setHidden] = useState(false);
      const variants = {
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: -85 }
      };
const {scrollY} = useViewportScroll();
useEffect(()=>{
    return scrollY.onChange(()=>update());
})
function update(){
if(scrollY.current<=50/*scrollY.current<scrollY.prev*/){
setHidden(false);
}
else if(scrollY.current > 30 && scrollY.current > scrollY.prev){
    setHidden(true);
}
}
const rotateAndOpen = ()=>{
    if(myslide.isanimated == false){
    setmyslide({isanimated:true});
    }
    else{
      setmyslide({isanimated:false});
    }
  }
return(
    <React.Fragment>
    <motion.div style={{width:"100%",height:"200px",backgroundColor:'black',borderRadius:'0px 0px 30px 30px'}} variants={variants} animate={hidden ? 'hidden':'visible'} transition={{ ease: [0.1, 0.25, 0.3, 1], duration: 0.6 }}></motion.div>
    <nav className={Menustyle.menu}>
        <h1 className={Menustyle.white}>{"Welcome "+props.username}</h1>
        <motion.div className={Menustyle.hamburger}onClick={rotateAndOpen} id = "hamburgerim" animate={{transform:myslide.isanimated ? "rotate(90deg)":"rotate(0deg)"}}></motion.div>
                 <Bounce left when = {myslide.isanimated}>
<div className={Menustyle.opened} id = "slidemenu" style={{display : myslide.isanimated ? 'block':'none'}}>
        <div>
        <button type="button" className='btn btn-success' id={Menustyle.buttons}>Your Writings</button>
        <button type="button" className='btn btn-success' id={Menustyle.buttons}>All Writings</button>
        <button type="button" className='btn btn-success' id={Menustyle.buttons}>Liked Writings</button>
        <button type="button" className='btn btn-success' id={Menustyle.buttons}>Write A Post</button>
        <button type="button" className='btn btn-success' id={Menustyle.buttons}>Public Chat</button>
        <button type="button" className='btn btn-success' id={Menustyle.buttons}>Log-Out</button>         
        </div>
        </div>
        </Bounce>
        </nav>
        </React.Fragment>
);

}
export default Nav;