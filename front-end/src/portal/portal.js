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
     filesobj : [{ id: 'xWbZ', name: 'Instructions.txt' }]
    }

  }

    //var user = JSON.parse(localStorage.getItem('userdata'));
    //console.log(user)

    handleFileAction =(FileAction,  FileActionData)=>{

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
        formData.append('user_id', "704d2243aafbfa26063d8b28");
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
        
//        this.setState({count: this.state.count + 1});


    //    var files = [this.state.filesobj,{id:file[0].lastModified, name:file[0].name, thumbnailUrl: 'https://chonky.io/chonky-sphere-v2.png'}]
  //      this.setState(filesobj=files);
        

       // fileAdd(files)
      ///  files.push()
        //fileAdd(files)

     /*   // Post to server
        fetch('/uploadImage', {
            method: 'POST',
            body: data
        })
       
    })
  }*/

    
//files={fileobj}

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
