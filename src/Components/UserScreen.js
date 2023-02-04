
import Design from '../Styles/UserScreen.module.css';
const UserScreen = (props)=>{

    return(
        <React.Fragment>
        <div className={Design.image}/>
        <div className={Design.flex}>
        <motion.button whileHover={{scale:1.1}} whileTap={{scale:0.9}} className="btn btn-outline-dark" style={{marginTop:30,borderWidth:3,fontWeight:'bolder'}}>Posts</motion.button>
        <motion.button whileHover={{scale:1.1}} whileTap={{scale:0.9}} className="btn btn-outline-dark" style={{marginTop:30,borderWidth:3,fontWeight:'bolder'}}>Likes</motion.button>
        <motion.button whileHover={{scale:1.1}} whileTap={{scale:0.9}} className="btn btn-outline-dark" style={{marginTop:30,borderWidth:3,fontWeight:'bolder'}}>Comments</motion.button>
        <motion.button whileHover={{scale:1.1}} whileTap={{scale:0.9}} className="btn btn-outline-dark" style={{marginTop:30,borderWidth:3,fontWeight:'bolder'}}>Change Image</motion.button>
        </div>
        </React.Fragment>
    );
}
export default UserScreen;