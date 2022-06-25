import React from 'react';
import '../Styles/Menu.css'
import {useNavigate} from 'react-router-dom';
import { useState ,useEffect } from 'react';
import { connect } from 'react-redux';
const axios = require('axios');
const Menu = (props)=>{
    const navigate = useNavigate();
        const beforeLoad = ()=>{
            axios.get('http://localhost:1998/',{withCredentials:true})
            .then(function(response){
              if(response.data.route === "/homepage"){
                props.setUserName(response.data.username);
                navigate("/homepage");
              }
              else if(response.data.route === "/login"){
                navigate("/");
              }
              console.log(response.data.route);
            });
           }

    useEffect(() =>{
        beforeLoad();
      },[]);
    
    return ( 
        <nav className='navbar navbar-dark bg-dark fixed-top shadow flex'>
            <h1 className='white'>{"Welcome "+props.username}</h1>
            <button type="button" className='btn btn-success' id='buttons'>Your Writings</button>
            <button type="button" className='btn btn-success' id='buttons'>All Writings</button>
            <button type="button" className='btn btn-success' id='buttons'>Public Chat</button>
            <button type="button" className='btn btn-success' id='buttons'>Log-Out</button>         
            </nav>
    );
}
const mapStateToProps = (state)=>{
  return{
    username:state.username
  }
}
const mapDispatchToProps = (dispatch) =>{
  return{
    setUserName: (username) =>{ dispatch({'type':'SET_NAME',username})}
  }
}

export default connect(mapStateToProps,mapDispatchToProps) (Menu);