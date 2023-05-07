import React from 'react';
import { motion,useViewportScroll } from "framer-motion"
import { useEffect,useState } from "react";
import { Bounce,Fade, Flip, Reveal, Roll, Rotate, Slide, Zoom} from 'react-reveal';
import Menustyle from'../Styles/Menu.module.css'
import SideMenu from './SideMenu';
import { connect } from 'react-redux';
import Autosuggest from 'react-autosuggest';
import { userBlogLike } from '../Services/BlogService';
import { useNavigate } from 'react-router-dom';
const Nav = (props)=>{
  const navigate = useNavigate();
const [search,setSearch] =useState("");
const [suggestions,setSuggestions] = useState([]);
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
      const variants2 = {
        open: {
          clipPath: "inset(0% 0% 0% 0% round 10px)",
          transition: {
            type: "spring",
            bounce: 0,
            duration: 0.7,
            delayChildren: 0.3,
            staggerChildren: 0.05
          }
        },
        closed: {
          clipPath: "inset(10% 50% 90% 50% round 10px)",
          transition: {
            type: "spring",
            bounce: 0,
            duration: 0.3
          }
        }
      }
const {scrollY} = useViewportScroll();
useEffect(()=>{
    return scrollY.onChange(()=>update());
})
function update(){
if(scrollY.current<=20/*scrollY.current<scrollY.prev*/){
setHidden(false);
}
else if(scrollY.current > 30 && scrollY.current > scrollY.prev){
    setHidden(true);
}
}
const getFolllowsByTitle = (title)=>{
  console.log( props.followedblogs.filter((obj)=>obj.title == title));
  return props.followedblogs.filter((obj)=>obj.title == title);
}
const rotateAndOpen = ()=>{
    if(myslide.isanimated == false){
    setmyslide({isanimated:true});
  document.body.style.overflow = "hidden";
    }
    else{
      setmyslide({isanimated:false});
    document.body.style.overflow = "";
    }
  }
return(
    <React.Fragment>
    <motion.div style={{width:"100%",height:"200px",backgroundColor:'black',borderRadius:'0px 0px 30px 30px'}} variants={variants} animate={hidden ? 'hidden':'visible'} transition={{ ease: [0.1, 0.25, 0.3, 1], duration: 0.6 }}></motion.div>
    <nav className={Menustyle.menu}>
      <Bounce left delay={200}>
      <div className ={Menustyle.bouncelogo}>
      <div className={Menustyle.logo}/>
      <div className={Menustyle.appname}></div>
      </div>
      </Bounce>
        <motion.div className={Menustyle.hamburger}onClick={rotateAndOpen} id = "hamburgerim" animate={{transform:myslide.isanimated ? "rotate(90deg)":"rotate(0deg)"}}>
        </motion.div>
        </nav>
        <div style={{ position: "fixed", top: "68px", right: "30px", zIndex: 1,display: "flex",justifyContent: "center",left: "50%",transform: "translateX(-50%)"}}>
        <Autosuggest inputProps={{
          placeholder:"Search",
          autoComplete:"abcd",
          name:"search",
          id:"search",
          value:search,
          onChange:(_event,{newValue})=>{
            setSearch(newValue);
          },
          className: Menustyle.searchInput
        }}
        suggestions={suggestions}
        onSuggestionsFetchRequested={async({value})=>{
          if(!value){
            setSuggestions([]);
            return;
          }
          try{
         let request = await userBlogLike(`${process.env.REACT_APP_ROOT_URL}/blogs/userbloglike?`,props.jwtsession,value);
         setSuggestions(request.map(row=>({
          name:row.name,
          type:row.type
         })));
          }
          catch{
            setSuggestions([]);
          }
        }}
        onSuggestionsClearRequested={()=>{
          setSuggestions([]);
        }}
        getSuggestionValue={suggestion => suggestion.name}
        renderSuggestion={suggestion=><div>{suggestion.name}</div>}
        renderSuggestionsContainer={({ containerProps, children }) => (
          <div {...containerProps} className={Menustyle.suggestionsContainer}>
            {children}
          </div>
        )}
        onSuggestionSelected={(event,{suggestion,method})=>{
          if(suggestion.name.slice(-2)=="/B"){
            let title = suggestion.name.slice(0, -2);
            navigate("/blog",{state:{
              follows:getFolllowsByTitle(title)[0]
            }});
          }
          else{
            navigate("/user",{state:{
              username:suggestion.name
            }})
          }
        }}
        theme={{
          suggestion: Menustyle.suggestionItem
        }}
        />
        </div>
        <SideMenu side={myslide.isanimated}/>
        </React.Fragment>
);

}
const mapDispatchToProps = dispatch=>{

}
const mapStateToProps = (state)=>{
  return{
    username:state.username,
    jwtsession:state.jwtsession,
    followedblogs:state.followedblogs
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Nav);