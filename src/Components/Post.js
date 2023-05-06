import ReactQuill from 'react-quill';
import Nav from './Nav';
import React,{useEffect, useRef} from 'react';
import { useState } from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import { connect } from 'react-redux';
import 'react-quill/dist/quill.snow.css';
import style from "../Styles/Post.module.css";
import noLikeImage from '../Images/nolike.png';
import likeImage from '../Images/like.png';
import Comment from './Comment';
const Post = (props)=>{
const quillRef = useRef(null);
const animationVariants = {
  hidden: { opacity: 0, y: -200 },
  visible: { opacity: 1, y: 0 },
};
const [body,setBody] = useState("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dolor sit amet consectetur adipiscing elit duis tristique sollicitudin. Sagittis orci a scelerisque purus semper eget duis. Placerat in egestas erat imperdiet sed euismod nisi porta lorem. Augue eget arcu dictum varius duis at. Odio facilisis mauris sit amet massa vitae tortor condimentum. Leo vel fringilla est ullamcorper eget. Tortor pretium viverra suspendisse potenti nullam ac tortor vitae. Donec et odio pellentesque diam volutpat. Tincidunt ornare massa eget egestas purus viverra. Non pulvinar neque laoreet suspendisse interdum. Purus non enim praesent elementum facilisis leo. Nibh mauris cursus mattis molestie. Sagittis id consectetur purus ut faucibus pulvinar elementum. Sit amet cursus sit amet dictum sit amet justo. Montes nascetur ridiculus mus mauris vitae ultricies. In tellus integer feugiat scelerisque varius morbi enim nunc. Vel orci porta non pulvinar neque laoreet suspendisse. Amet mauris commodo quis imperdiet massa tincidunt nunc. Sit amet aliquam id diam maecenas ultricies mi eget mauris. Vitae sapien pellentesque habitant morbi tristique senectus et. Est ullamcorper eget nulla facilisi etiam. Faucibus ornare suspendisse sed nisi. Scelerisque viverra mauris in aliquam. Felis bibendum ut tristique et egestas quis ipsum. A diam sollicitudin tempor id eu nisl nunc mi. Donec massa sapien faucibus et molestie ac feugiat sed lectus. Est ultricies integer quis auctor elit. Maecenas ultricies mi eget mauris pharetra et ultrices neque. Volutpat lacus laoreet non curabitur gravida arcu ac tortor dignissim. Orci eu lobortis elementum nibh tellus molestie nunc non blandit. Ac turpis egestas maecenas pharetra. Enim tortor at auctor urna nunc id cursus. Lorem donec massa sapien faucibus et molestie. Magna ac placerat vestibulum lectus mauris ultrices eros in cursus. Lobortis scelerisque fermentum dui faucibus in ornare quam viverra orci. Tincidunt tortor aliquam nulla facilisi. In vitae turpis massa sed elementum. Ullamcorper morbi tincidunt ornare massa eget egestas. Augue lacus viverra vitae congue eu consequat. Viverra suspendisse potenti nullam ac tortor vitae purus faucibus. Eros in cursus turpis massa tincidunt dui ut. Bibendum est ultricies integer quis auctor elit sed. Neque laoreet suspendisse interdum consectetur libero id faucibus. Turpis in eu mi bibendum neque egestas congue. In eu mi bibendum neque egestas. Etiam sit amet nisl purus in. Mattis vulputate enim nulla aliquet porttitor. Viverra nibh cras pulvinar mattis. Vivamus arcu felis bibendum ut tristique et egestas quis. Scelerisque in dictum non consectetur a erat. Facilisis magna etiam tempor orci eu. Et malesuada fames ac turpis egestas integer eget aliquet. Ultricies mi quis hendrerit dolor magna eget est lorem. Augue mauris augue neque gravida in. Est placerat in egestas erat imperdiet sed euismod nisi porta. Cras semper auctor neque vitae tempus quam pellentesque nec nam. Dignissim enim sit amet venenatis urna cursus eget nunc scelerisque. Faucibus purus in massa tempor nec feugiat nisl. Nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper sit. Suscipit adipiscing bibendum est ultricies. Aliquam id diam maecenas ultricies mi eget mauris pharetra. Sagittis eu volutpat odio facilisis. Natoque penatibus et magnis dis. Pretium quam vulputate dignissim suspendisse in est ante in. Vitae semper quis lectus nulla at volutpat diam ut. Tellus in metus vulputate eu scelerisque felis imperdiet. Cras fermentum odio eu feugiat pretium nibh. Pretium lectus quam id leo in vitae turpis massa sed. Elit ut aliquam purus sit amet luctus venenatis lectus. Sem integer vitae justo eget magna fermentum iaculis eu. Ut porttitor leo a diam sollicitudin tempor. Justo eget magna fermentum iaculis eu. Ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at augue eget. Semper risus in hendrerit gravida rutrum quisque non. Etiam tempor orci eu lobortis elementum nibh tellus molestie nunc. Viverra tellus in hac habitasse. Mi bibendum neque egestas congue. Convallis convallis tellus id interdum velit laoreet id donec ultrices. Neque viverra justo nec ultrices. Sollicitudin aliquam ultrices sagittis orci a. Aliquam ultrices sagittis orci a scelerisque purus semper. Eget arcu dictum varius duis at consectetur. Facilisis volutpat est velit egestas dui id ornare. Semper risus in hendrerit gravida rutrum quisque non. Auctor urna nunc id cursus metus aliquam eleifend mi. Massa eget egestas purus viverra accumsan in nisl nisi scelerisque. Et leo duis ut diam quam nulla. Malesuada bibendum arcu vitae elementum. Ut pharetra sit amet aliquam id diam maecenas. Sed euismod nisi porta lorem mollis aliquam ut porttitor. Venenatis cras sed felis eget velit aliquet sagittis. In vitae turpis massa sed elementum. Malesuada proin libero nunc consequat. Morbi leo urna molestie at elementum eu facilisis sed odio. Vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare massa. Nibh tortor id aliquet lectus proin nibh. Elit pellentesque habitant morbi tristique senectus et. Rhoncus dolor purus non enim. Non enim praesent elementum facilisis leo vel fringilla est. Mi bibendum neque egestas congue. Donec pretium vulputate sapien nec sagittis aliquam malesuada bibendum. Varius quam quisque id diam vel. Scelerisque eleifend donec pretium vulputate. Quam pellentesque nec nam aliquam. Eget nunc scelerisque viverra mauris in aliquam. Vulputate odio ut enim blandit volutpat maecenas volutpat blandit aliquam. Nisl pretium fusce id velit ut tortor pretium viverra suspendisse. Nisl condimentum id venenatis a condimentum vitae sapien. Massa sed elementum tempus egestas sed sed risus. Non sodales neque sodales ut etiam sit amet nisl. Non sodales neque sodales ut etiam sit amet. Et ultrices neque ornare aenean euismod elementum. Ridiculus mus mauris vitae ultricies leo integer malesuada nunc. Augue interdum velit euismod in. Consectetur a erat nam at. Venenatis urna cursus eget nunc scelerisque viverra. Dolor sit amet consectetur adipiscing elit pellentesque. Mauris nunc congue nisi vitae. Ultrices in iaculis nunc sed augue. At auctor urna nunc id. Turpis cursus in hac habitasse platea dictumst. Tincidunt ornare massa eget egestas purus viverra accumsan in nisl. Sagittis orci a scelerisque purus semper eget duis at tellus. Facilisi cras fermentum odio eu feugiat pretium nibh. Ante in nibh mauris cursus mattis molestie. Pellentesque habitant morbi tristique senectus et. Nibh nisl condimentum id venenatis a. Risus nullam eget felis eget nunc lobortis. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim. Turpis tincidunt id aliquet risus feugiat in ante metus. Ultrices sagittis orci a scelerisque. Id diam vel quam elementum pulvinar etiam non. Dignissim cras tincidunt lobortis feugiat vivamus at. Id neque aliquam vestibulum morbi blandit cursus risus. Felis imperdiet proin fermentum leo vel orci porta non pulvinar. Tellus id interdum velit laoreet id. Metus vulputate eu scelerisque felis imperdiet. Phasellus egestas tellus rutrum tellus. Euismod quis viverra nibh cras pulvinar. Pulvinar neque laoreet suspendisse interdum consectetur libero id faucibus. Sed viverra ipsum nunc aliquet bibendum enim facilisis gravida. Ut morbi tincidunt augue interdum velit euismod. Euismod lacinia at quis risus sed vulputate odio ut enim. Magna fermentum iaculis eu non diam phasellus vestibulum. Ut venenatis tellus in metus. Tortor posuere ac ut consequat. Id aliquet risus feugiat in ante metus dictum at tempor. Id interdum velit laoreet id donec ultrices tincidunt. Sit amet venenatis urna cursus eget nunc. Id aliquet risus feugiat in ante metus. Convallis a cras semper auctor neque vitae. Platea dictumst quisque sagittis purus sit amet volutpat. Integer eget aliquet nibh praesent. Praesent semper feugiat nibh sed pulvinar. Mauris sit amet massa vitae tortor condimentum lacinia quis. Fames ac turpis egestas integer eget aliquet. Molestie nunc non blandit massa enim nec. Ut porttitor leo a diam sollicitudin tempor. Et malesuada fames ac turpis egestas sed tempus urna et. Porta non pulvinar neque laoreet suspendisse interdum consectetur. Nascetur ridiculus mus mauris vitae ultricies leo. Tempus urna et pharetra pharetra massa. In dictum non consectetur a. Sem fringilla ut morbi tincidunt. Feugiat nibh sed pulvinar proin gravida. Euismod lacinia at quis risus sed vulputate odio. Enim blandit volutpat maecenas volutpat. Ac odio tempor orci dapibus ultrices. Eget egestas purus viverra accumsan in nisl nisi. Ultrices dui sapien eget mi proin sed libero. Nunc mattis enim ut tellus elementum. Sem nulla pharetra diam sit amet. Nulla pellentesque dignissim enim sit amet venenatis urna cursus eget. Ac turpis egestas maecenas pharetra convallis posuere morbi leo urna. Sodales ut etiam sit amet nisl purus. Egestas fringilla phasellus faucibus scelerisque eleifend. Laoreet non curabitur gravida arcu. Ac orci phasellus egestas tellus rutrum tellus pellentesque eu. Elementum curabitur vitae nunc sed velit dignissim. Ac turpis egestas integer eget. Luctus venenatis lectus magna fringilla urna. Tortor id aliquet lectus proin nibh nisl condimentum. Scelerisque in dictum non consectetur a erat nam. Justo laoreet sit amet cursus sit. Amet justo donec enim diam vulputate ut. Natoque penatibus et magnis dis parturient montes nascetur ridiculus mus. Congue eu consequat ac felis donec. Platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras. Non pulvinar neque laoreet suspendisse interdum. Habitant morbi tristique senectus et netus. Ullamcorper velit sed ullamcorper morbi tincidunt ornare massa. Porta nibh venenatis cras sed felis. Lacus vel facilisis volutpat est velit. Non tellus orci ac auctor augue mauris. Id interdum velit laoreet id donec ultrices tincidunt arcu. Viverra tellus in hac habitasse platea dictumst vestibulum. Placerat vestibulum lectus mauris ultrices eros. Tellus molestie nunc non blandit massa enim. Neque sodales ut etiam sit amet nisl purus in mollis. Consectetur adipiscing elit pellentesque habitant morbi tristique senectus et netus. Eu turpis egestas pretium aenean. Viverra justo nec ultrices dui sapien eget mi proin. Quam lacus suspendisse faucibus interdum posuere lorem ipsum. Integer eget aliquet nibh praesent tristique magna. Commodo viverra maecenas accumsan lacus vel. Justo donec enim diam vulputate ut pharetra sit amet. Eget mauris pharetra et ultrices neque ornare aenean. Nulla facilisi cras fermentum odio eu feugiat pretium nibh ipsum. Sit amet tellus cras adipiscing enim eu turpis egestas pretium. Lectus mauris ultrices eros in cursus turpis massa tincidunt. Sit amet luctus venenatis lectus magna. Cras semper auctor neque vitae tempus quam pellentesque. Amet purus gravida quis blandit turpis cursus. Pellentesque dignissim enim sit amet. Sit amet cursus sit amet dictum sit amet. Sed id semper risus in. Nam aliquam sem et tortor consequat id porta nibh venenatis. Vitae turpis massa sed elementum tempus egestas sed sed risus. Senectus et netus et malesuada fames ac turpis egestas integer. Vitae congue eu consequat ac felis donec et odio. Viverra nibh cras pulvinar mattis nunc. Augue eget arcu dictum varius duis at. Elementum nisi quis eleifend quam adipiscing. Nulla aliquet porttitor lacus luctus accumsan tortor posuere. Platea dictumst vestibulum rhoncus est pellentesque. Lacus sed viverra tellus in hac habitasse. Nunc mattis enim ut tellus elementum sagittis. Neque ornare aenean euismod elementum nisi quis eleifend. Tortor at auctor urna nunc. Neque vitae tempus quam pellentesque nec nam aliquam sem et. Proin fermentum leo vel orci porta non pulvinar neque laoreet. Magna eget est lorem ipsum dolor sit amet. Eget mi proin sed libero enim sed faucibus turpis in. Eros donec ac odio tempor orci dapibus. Ac tincidunt vitae semper quis lectus nulla at. Molestie at elementum eu facilisis sed odio morbi quis commodo. Nisl vel pretium lectus quam id leo in. Sem fringilla ut morbi tincidunt augue. Turpis massa sed elementum tempus. Quam nulla porttitor massa id neque aliquam vestibulum. Diam volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque. Pellentesque diam volutpat commodo sed egestas. Ultrices sagittis orci a scelerisque purus semper. Amet commodo nulla facilisi nullam vehicula. Hendrerit dolor magna eget est lorem ipsum. In fermentum et sollicitudin ac orci phasellus. Placerat in egestas erat imperdiet sed euismod nisi porta lorem. Proin fermentum leo vel orci porta. Netus et malesuada fames ac turpis egestas. Eu ultrices vitae auctor eu augue. Nunc lobortis mattis aliquam faucibus purus in massa tempor. Turpis cursus in hac habitasse. Quis auctor elit sed vulputate mi sit amet. Eu scelerisque felis imperdiet proin fermentum leo vel. Diam volutpat commodo sed egestas egestas fringilla phasellus faucibus. Pretium aenean pharetra magna ac placerat. Diam vel quam elementum pulvinar. Mi quis hendrerit dolor magna eget est lorem ipsum dolor. Ultrices gravida dictum fusce ut. Iaculis nunc sed augue lacus viverra vitae. Ornare quam viverra orci sagittis eu volutpat odio. Eu consequat ac felis donec et odio pellentesque. Accumsan lacus vel facilisis volutpat. Orci porta non pulvinar neque laoreet. Arcu vitae elementum curabitur vitae nunc sed velit. Magna sit amet purus gravida quis blandit. Tempor commodo ullamcorper a lacus. Non nisi est sit amet facilisis. Vulputate odio ut enim blandit volutpat maecenas volutpat. Non diam phasellus vestibulum lorem. Urna neque viverra justo nec ultrices. Iaculis urna id volutpat lacus laoreet non curabitur gravida arcu. Faucibus nisl tincidunt eget nullam non nisi est sit. Auctor neque vitae tempus quam pellentesque nec nam aliquam. Eu lobortis elementum nibh tellus molestie nunc. Libero volutpat sed cras ornare arcu dui. Accumsan in nisl nisi scelerisque eu ultrices. Pellentesque habitant morbi tristique senectus et netus. Faucibus turpis in eu mi bibendum. Feugiat vivamus at augue eget arcu. Enim facilisis gravida neque convallis. Varius quam quisque id diam. In hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Tellus id interdum velit laoreet id donec ultrices tincidunt arcu. Eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis orci. Metus vulputate eu scelerisque felis imperdiet proin fermentum. Ridiculus mus mauris vitae ultricies leo. Nunc non blandit massa enim nec dui nunc. Nulla posuere sollicitudin aliquam ultrices sagittis. At lectus urna duis convallis convallis. erdem");
const [backgroundImage, setBackgroundImage] = useState(noLikeImage);
const [comment,setComment] = useState(false);
useEffect(()=>{
  const disabled = document.getElementsByClassName("ql-disabled")[0];
const editor = document.getElementsByClassName("ql-editor")[0];
  if(disabled){
    disabled.style.overflowY = 'scroll';
  }
  if(editor){
    editor.style.overflowY = 'scroll';
  }
},[]);
const handleBackgroundImageChange = ()=>{
  if(backgroundImage == noLikeImage){
    setBackgroundImage(likeImage);
    setComment(true);
  }
  else{
    setBackgroundImage(noLikeImage);
    setComment(false);
  }
}
return(
<React.Fragment>
<Nav username={props.username}/>
<div className={style.all}>
<div className={style.postBackground}>
        <div className={style.photoName}>
        <div className={style.userphoto}></div>
        <h1 className={style.name}>deneme123456789</h1>
        </div>
        <ReactQuill
          placeholder='Write Something You Want To Write....'
          modules={Post.module}
          readOnly={true}
          value={body}
          ref={quillRef}
          style={{backgroundColor:'white',color:'black'}}
        />
      <p className={style.commentp}>Write Comment</p>
      <textarea rows={4} cols={50} className={style.writecomment}></textarea>
      <motion.button className='btn btn-outline-dark' style={{fontSize:'large',fontWeight:'bold',alignSelf:'center',marginTop:'10px'}}>SEND</motion.button>
      <div className={style.likecomment}>
      <motion.div className={style.likeandcount} whileHover={{scale:1.1}} whileTap={{scale:0.9}} onClick={handleBackgroundImageChange}>
    <div className={style.like} style={{ backgroundImage: `url(${backgroundImage})` }}></div>
    <p className={style.count}>1</p>
    </motion.div>
    <motion.div className={style.commentandstring} whileHover={{scale:1.1}} whileTap={{scale:0.9}}>
      <div className={style.comment}><p className={style.commentstring}>Comments</p></div>
    </motion.div>
    </div>
 {/*
 <AnimatePresence>
   {comment && (
    <motion.div>

    </motion.div>
   )
   }
  </AnimatePresence>
 */}
</div>
<AnimatePresence>
  {comment && (
    <motion.div 
    initial = "hidden"
    exit={{ opacity: 0, y: -200, transition: { duration: 0.5 } }}
    animate="visible"
    variants={animationVariants}
    transition={{ duration: 0.5 }}
    className={style.covercomment}
    >
      {( ()=>{
              const comments = [];
              for(let i = 0;i<3;i++){
              comments.push(<Comment/>);}
            return comments;})()}
    </motion.div>
  )
  }
</AnimatePresence>
</div>

<div className={style.postBackground}>
        <ReactQuill
          placeholder='Write Something You Want To Write....'
          modules={Post.module}
          readOnly={true}
          value={body}
          ref={quillRef}
          style={{backgroundColor:'white',color:'black'}}
        />
</div>
</React.Fragment>
)

}
Post.module = {
    toolbar:false
}

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
  export default connect(mapStateToProps,mapDispatchToProps) (Post);
