/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import { Link, Navigate} from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import axios from 'axios'

class Login extends Component{

  state = {
    credentials: {email: '', password: ''},
    loggedin: false,
    users: []
}

login = () =>{
    // console.log(this.state.credentials);
    // fetch('http://127.0.0.1:8000/account/log-in/',{
    //     method: 'POST',
    //     headers: {'Content-Type': 'application/json'},
    //     body: JSON.stringify(this.state.credentials)
    // })
    // .then( data => data.json() )
    // .then(
    //     data =>{
    //         this.props.userLogin(data.token);
    //         // this.props.userRole(data.user.profile.role);
    //         if(data.token){
    //           this.setState({users: data.user});
    //           this.setState(prevState => ({
    //           loggedin: !prevState.loggedin
    //         }));
    //         }
            
    //     }
    // ).catch( error => console.error(error))
    let data;
    axios.post('http://127.0.0.1:8000/account/api/token/',this.state.credentials,
    { headers: { Authorization:localStorage.getItem('access') }, })
    .then(res=>{
      data = res.data;
      if(res.data.access){
        this.setState({
        users: data,
      });
      this.setState(prevState => ({
        loggedin: !prevState.loggedin
      }));
      }
      
      localStorage.setItem('access',JSON.stringify(res.data.access))
      localStorage.setItem('refresh',JSON.stringify(res.data.refresh))
    })
    .catch(err=>{})
    
}

register = () =>{
    // console.log(this.state.credentials);
    fetch('http://127.0.0.1:8000/account/users/list/',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(this.state.credentials)
    })
    .then( data => data.json() )
    .then(
        data =>{
            console.log(data.token);
        }
    )
    .catch( error => console.error(error))
}

inputChanged = event => {
    const cred = this.state.credentials;
    cred[event.target.name] = event.target.value;
    this.setState({credentials: cred});
}

render(){
  if(this.state.loggedin){
    console.log(this.state.users)
    return (
      <Navigate to='/'></Navigate>
    )
  }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput placeholder="Username" autoComplete="username" type='email' name='email'
                    value={this.state.credentials.email}
                    onChange={this.inputChanged} />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        name='password' 
                        value={this.state.credentials.password}
                        onChange={this.inputChanged}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" onClick={this.login}>
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1} onClick={this.register}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}
}




  




export default Login
