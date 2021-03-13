import { FullFileBrowser,FileToolbar, FileSearch, FileList } from 'chonky';
import { setChonkyDefaults } from 'chonky';
import { ChonkyIconFA } from 'chonky-icon-fontawesome';


function Portal() {
    setChonkyDefaults({ iconComponent: ChonkyIconFA })
    
const user = JSON.parse(localStorage.getItem('userdata'));
    console.log(user)
  return (
    <div className="App">
      <FullFileBrowser files={[
          { id: 'lht', name: 'Projects', isDir: true },
          {
              id: 'mcd',
              name: 'chonky-sphere-v2.png',
              thumbnailUrl: 'https://chonky.io/chonky-sphere-v2.png',
          }
      ]}>
      <FileToolbar>
            <FileSearch/>
          <FileList/>
      </FileToolbar>
      </FullFileBrowser>
       
  
    </div>
  );
}

export default Portal;
