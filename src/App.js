import './App.css';
import Minter from './Minter';


function App() {
  return (
    <div className="App">
      <div className="page-width banner-photo">
        <img src="logo.png" loading="lazy" sizes=""  alt="" className="image-2 desktop-img"></img>
      </div>
      
      <div className="page-width main-content wf-section">
        <div className="redirect-section parent">
          <Minter></Minter>
        </div>
      </div>
      <div className="footer wf-section">
        <div className="footer-main-content">
          <img src="footer-asset.png" loading="lazy" sizes=""  alt="" className="footer-img"></img>
        </div> 
        
      </div>
    </div>
  );
}

export default App;

