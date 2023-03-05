import React,{useRef} from 'react';
import CreateStyle from'../Styles/Create_R.module.css'
import "../App.css"
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import { useState } from 'react';
import Nav from './Nav';
const Create_Post = (props)=>{
const [body,setBody] = useState("");
const quillRef = useRef(null);
const handleBody = (e)=>{
    setBody(e);
    quillRef.current.getEditor().root.style.textAlign="center";
    console.log(quillRef.current.getEditor().root.outerHTML);
}
return(
<React.Fragment>
<Nav username={props.username}/>
<ReactQuill placeholder='Write Something You Want To Write....'
modules={Create_Post.modules}
formats={Create_Post.formats}
onChange={handleBody}
value={body}
ref={quillRef}
style={{ backgroundColor: 'white', color: 'black' }}
/>
</React.Fragment>
);
}
Create_Post.modules = {
    toolbar:[
        [{header:"1"},{header:"2"},{header:[3,4,5,6]},{font:[]}],
        [{size:[]}],
        ["bold","italic","underline","strike","blockquote"],
        [{list:"ordered"},{list:"bullet"}],
        ["link","image","video"],
        ["clean"],
        ["code-block"],
        [{ align: 'center' }]
    ],
};
Create_Post.formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
    "video",
    "code-block",
    "align"
];

export default Create_Post;