import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import Login from './Login';
import { Redirect } from 'react-router';


class Register extends Component {
  constructor(props){
    super(props);
    this.state={
      email:'',
      password:'',
      isLogin:''
    }
  }
  handleClick(event){
    var self = this;
    var apiBaseUrl = "http://localhost:3000/";
    //To be done:check for empty values before hitting submit
    if(this.state.email.length>0 && this.state.password.length>0){ 
      console.log("if ke ander")
      var payload={
      "email":this.state.email,
      "password":this.state.password,
      }
     
      axios.post(apiBaseUrl+'users/register', payload)
     .then(function (response) {
       console.log(response);
       if(response.status === 200){
        window.location.href="/"
        window.alert("Register successful login now!")
 /*        var loginscreen=[];
         loginscreen.push(<Login parentContext={this} appContext={self.props.appContext}/>);
         var loginmessage = "Not Registered yet.Go to registration";
         self.props.parentContext.setState({loginscreen:loginscreen,
         loginmessage:loginmessage,
         buttonLabel:"Register",
         isLogin:true
          });*/
       }
       else{
         console.log("some error ocurred",response.status);
       }
     })
     .catch(function (error) {
       console.log(error);
     });
    }
    else{
      alert("Input field value is missing");
    }

  }
  render() {
    // console.log("props",this.props);
    var  userhintText="Enter your email id";
     var  userLabel="Email id";
    return (
      <div>
        <MuiThemeProvider>
          <div>
          <AppBar
             title="Register"
           />
           <TextField
             hintText={userhintText}
             floatingLabelText={userLabel}
             onChange = {(event,newValue) => this.setState({email:newValue})}
             />
           <br/>
           <TextField
             type = "password"
             hintText="Enter your Password"
             floatingLabelText="Password"
             onChange = {(event,newValue) => this.setState({password:newValue})}
             />
           <br/>
           <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event,this.props.role)}/>
          </div>
         </MuiThemeProvider>
      </div>
    );
  }
}

const style = {
  margin: 15,
};

export default Register;