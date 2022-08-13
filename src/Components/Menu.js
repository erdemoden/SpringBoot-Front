import React from 'react';
import '../Styles/Menu.scss'
import {useNavigate} from 'react-router-dom';
import { useState ,useEffect } from 'react';
import { connect } from 'react-redux';
import {GetWithAuth ,GetWithRefresh} from '../Services/HttpServices';
const axios = require('axios');
const Menu = (props)=>{
    const navigate = useNavigate();
        const beforeLoad = async()=>{
          let response = await GetWithAuth("http://localhost:1998/auth/route");
          if(response.route == "/"){
          localStorage.removeItem("jwtsession");
          navigate(response.route);
          }
          else{
            props.setUserName(response.username);
            navigate(response.route);
          }
           }

    useEffect(() =>{
        beforeLoad();
      },[]);
    
    return ( 
        <nav className='navbar navbar-dark bg-dark fixed-top shadow flex ortalamenu'>
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