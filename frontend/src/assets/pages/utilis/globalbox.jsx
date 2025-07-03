import useGlobalBxStore from '../../zustand/useGlobalBxStore.js';
import ConnectionGuide from '../Accounts/connectionguide.jsx';
import GenerateBox from '../Dashbored/generatebox.jsx';
import EditTextBox from '../Product/edittextbox.jsx';
import './globalbox.css'; // You will write the styles here

const boxes = {
    generatebox:<GenerateBox/>,
    editTextBox:<EditTextBox/>,
    connectionGuide:<ConnectionGuide/>
} 

const GlobalBox = () => {
  const{setIsVisible,isVisible,boxType}= useGlobalBxStore()
  if (!isVisible){
    return null
  }
  
  return (
    <>
      <div className="backdrop" onClick={()=>{setIsVisible(false)}}></div> {/* For the blur */}
      <div className="global-box">
        {boxes[boxType]}
      </div>
    </>
  );
};

export default GlobalBox;
