import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import {  AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import useStyles from './styles';
import decode from 'jwt-decode';
import memoriesLogo from '../../images/memories-Logo.png';
import memoriesText from '../../images/memories-Text.png';

import { connect } from 'react-redux';
import * as actions from '../../actions/index';


const Navbar = (props) => {
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'))

    useEffect(()=>{
        if(user){
            const token = user.token;
            const decodedToken = token ? decode(token) : null;
            decodedToken.exp * 1000 < new Date().getTime() ? logout() : null;
        }
    }, [user])

    const logout = () =>{
        props.onLLogout()
        window.location.reload();
        localStorage.clear()
    }

    return (
        <AppBar className={classes.appBar} position='static' color='inherit'>
            <Link className={classes.brandContainer} to="/">
                <img src={memoriesText} alt='icon' height='45'/>
                <img className={classes.image} src={memoriesLogo} alt='memories' height='60'/>
            </Link>
            <Toolbar classNaem={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        {/* <Avatar className={classes.purple} alt={user.result.name} src={user?.imageUrl}>{user.result.name.charAt(0)}</Avatar> */}
                        <Typography className={classes.userName} variant="h6">{user.user.name}</Typography>
                        <Button variant="contained" className={classes.logout} onClick={logout} color="secondary">Logout</Button>
                    </div>
                ):(
                    <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                )}
            </Toolbar>
        </AppBar>
  )
}

const mapStateToProps = (state) =>{
    return{
        data: state.auth
    }
}
const mapDispatchToProps = dispatch =>{
    return{
        onLLogout:()=> dispatch(actions.onLogout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);