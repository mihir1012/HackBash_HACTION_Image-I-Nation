import { FullFileBrowser,FileToolbar, FileSearch, FileList, ChonkyActions } from 'chonky';
import { setChonkyDefaults } from 'chonky';
import { ChonkyIconFA } from 'chonky-icon-fontawesome';
import React, { Component } from 'react';
import fileDialog from 'file-dialog'  
import axios from 'axios'

class Portal extends Component  {

  constructor(props){
    super(props);
    setChonkyDefaults({ iconComponent: ChonkyIconFA })
    this.state={
     filesobj : []
    }

    
  
  }

  getData=()=>{
    var user = JSON.parse(localStorage.getItem('userdata'));
  console.log(user)
  
   fetch("http://localhost:3000/images/"+user._id+"/")
      .then(res => res.json())
      .then(
        (result) => {
          var files = []
          console.log(result)
          for(var i=0;i<result.length;i++){
            files = [...this.state.filesobj,{id:result[i]._id, name:result[i].urls.split("/")[4].split("%").join(" "), thumbnailUrl: result[i].urls}]
            this.setState({
              filesobj: files
            });
          }
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {

        }
      )
  }

  componentWillMount(){
    this.getData()
    
}

    

    handleFileAction =(FileAction,  FileActionData)=>{

      var user = JSON.parse(localStorage.getItem('userdata'));
      console.log(user)

              console.log('Action definition:', FileAction);
              console.log('Action data:', FileActionData);
              if(FileAction.id=="upload_files"){
                fileDialog({ multiple: true, accept: 'image/*' })
    .then(file  => {
  
      for(var i=0;i<file.length;i++){
      var files = [...this.state.filesobj,{id:file[i].lastModified, name:file[i].name, thumbnailUrl: 'https://chonky.io/chonky-sphere-v2.png'}]
        this.setState(this.state.filesobj=files)
        console.log(file[i])
        const formData = new FormData();
        formData.append('image', file[i]);
        formData.append('user_id', user._id);
        axios.post('http://localhost:3000/images/upload', formData, {})
            .catch(() => {
                console.log("Failed")
                // // If error, display a message on the upload modal
                // uploadRef.current.innerHTML = <span class="error">Error Uploading File(s)</span>;
                // // set progress bar background color to red
                // progressRef.current.style.backgroundColor = 'red';
            }).then(()=>{
            console.log("Success")
        });
  
      }

      
       
    });
  }
  
}

render(){
  return (
    <div className="App">
      <FullFileBrowser 
      files={this.state.filesobj}
      fileActions={[ChonkyActions.UploadFiles, ChonkyActions.enableDragAndDrop]}
      onFileAction={this.handleFileAction}
      enableDragAndDrop={true} 
      >
      <FileToolbar>
            <FileSearch/>
          <FileList/>
      </FileToolbar>
      </FullFileBrowser>
       
  
    </div>
  );
}
    }


export default Portal;
