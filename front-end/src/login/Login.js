import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
var apiBaseUrl = "http://localhost:3000/"


class Login extends Component {
  constructor(props){
    super(props);
    var localloginComponent=[];
    localloginComponent.push(
      <MuiThemeProvider key={"theme"}>
        <div>
         <TextField
           hintText="Enter your username/email id"
           floatingLabelText="email id/username"
           onChange={(event,newValue) => this.setState({username:newValue})}
           />
         <br/>
           <TextField
             type="password"
             hintText="Enter your Password"
             floatingLabelText="Password"
             onChange = {(event,newValue) => this.setState({password:newValue})}
             />
           <br/>
           <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
       </div>
       </MuiThemeProvider>
    )
    this.state={
      username:'',
      password:'',
      loginComponent:localloginComponent,
    }
  }
  
//   componentWillMount(){
//   // console.log("willmount prop values",this.props);
//       console.log("in student componentWillMount");
//       var localloginComponent=[];
//       localloginComponent.push(
//         <MuiThemeProvider>
//           <div>
//            <TextField
//              hintText="Enter your College Rollno"
//              floatingLabelText="Student Id"
//              onChange = {(event,newValue) => this.setState({username:newValue})}
//              />
//            <br/>
//              <TextField
//                type="password"
//                hintText="Enter your Password"
//                floatingLabelText="Password"
//                onChange = {(event,newValue) => this.setState({password:newValue})}
//                />
//              <br/>
//              <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
//          </div>
//          </MuiThemeProvider>
//       )
//       this.setState({menuValue:1,loginComponent:localloginComponent,loginRole:'student'})
//     }

  handleClick(event){
    var self = this;
    var payload={
      "email":this.state.username,
	    "password":this.state.password,
    }
    axios.post(apiBaseUrl+'users/login', payload)
   .then(function (response) {
     console.log(response);
     if(response.status == 200 && response.data.email!=undefined){
       console.log(response.data)
      localStorage.setItem('userdata',JSON.stringify(response.data))  
       window.location.href="/portal"

     }
     else if(response.data.code == 204){
       console.log("Username password do not match");
       alert(response.data.success)
     }
     else{
       console.log("Username does not exists");
       alert("Username does not exist");
     }
   })
   .catch(function (error) {
     console.log(error);
   });
  }
  
  render() {
    return (
      <div>
        <MuiThemeProvider>
        <AppBar
             title="Login"
           />
        </MuiThemeProvider>
        {this.state.loginComponent}
      </div>
    );
  }
}

const style = {
  margin: 15,
};

export default Login;