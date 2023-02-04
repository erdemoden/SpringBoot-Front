import CreateStyle from'../Styles/Create_R.module.css'
const Create_Post = (props)=>{

return(
<div className={[CreateStyle.center, CreateStyle.design].join(' ')} style={{marginTop:200}}>
<div>
<h1>Create A Post</h1>
</div>
</div>
);
}

export default Create_Post;