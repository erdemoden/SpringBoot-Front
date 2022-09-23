import CreateStyle from'../Styles/Create_R.module.css'
const Create_Post = (props)=>{

return(

<div className={[CreateStyle.center, CreateStyle.design].join(' ')}>
<h1>Create A Post</h1>
</div>
);
}

export default Create_Post;