import { motion,useViewportScroll } from "framer-motion"
import Menustyle from'../Styles/Menu.module.css'
const SideMenu = (props)=>{

    return(
    <motion.div className = {Menustyle.sidemenu} initial = {{transform:"translate(170%)"}}animate={{transform: props.side ?"translate(20px)":"translate(170%)" }}>
        <div className={Menustyle.userphoto}></div>
        <h3>ERDEM</h3>
    </motion.div>
    );
}

export default SideMenu;