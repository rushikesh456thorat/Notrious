
import Icon from "../../icon/icon";
import { useState } from "react";
import {useNavigate} from 'react-router-dom'
import usePageStore from "../../zustand/usePageStore.js";
import useCreatePage from "../../hooks/useCreatePage.js";
import { toast } from "react-toastify";
import useGlobalBxStore from "../../zustand/useGlobalBxStore.js";

const GenerateBox = () => {
  const [selected, setSelected] = useState("id5");
  const [url, setUrl] = useState("");
  const {createPage,loading} = useCreatePage()
  const {productUrl,setProductUrl} = usePageStore()
  const navigate = useNavigate()
  const {setIsVisible} = useGlobalBxStore()

  const handleSelection = (id) => {
    if(id=='id6'){
      
      toast.error('This feature is not available yet!')
      setSelected("id5");
      return
    }
    setSelected(id);
  };


  const handleGeneratePage = async () => {
    if (!url){
      console.log('No Url!')
      return
    }
    
    await setProductUrl(url)

    if (!productUrl){
      return
    }
    const pageId = await createPage()

    if (pageId) {
      navigate('/p/'+pageId)
      setIsVisible(false)
    } else {
      console.error("Failed to generate page.");
    }
  };
  return (
    <div className="generate-box">
      <div className="box-header">
        <div>Generate a Product Page</div>
      </div>
      <div className="source-panel">
        <div
          className={`source-item ${selected === "id5" ? "selected" : ""}`}
          onClick={() => handleSelection("id5")}
          
        >
          <div className="radio-button">
            <div className="source-icon">
              <Icon icon={"shopify"} />
            </div>
            <div className="source-name">Shopify</div>
          </div>
        </div>
        <div
          className={`source-item ${selected === "id6" ? "selected" : ""}`}
          onClick={() => handleSelection("id6")}
          style={{opacity:'0.6'}}
        >
          <div className="radio-button">
            <div className="source-icon">
              <Icon icon={"amazon"} />
            </div>
            <div className="source-name">Amazon (<span style={{color:'#F44336'}}>comming soon</span>)</div>
          </div>
        </div>
      </div>
      <div className="url-feild">
        <label className="box-label">Enter a Shopify Product Url</label>
        <input
          className="input-bx"
          type="text"
          id="url"
          name="url"
          placeholder="Enter URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
      <div className="description-feild">
        <label className="box-label">
          Write a Description for your product. (Optional)
        </label>
        <input
          id="description"
          name="description"
          placeholder="Enter Description"
          className="input-bx"
        />
      </div>
      <div className="language-feild">
        <label className="box-label">Select the Language</label>
        <select className="language-select" title="Select the language">
          <option className="option-select" defaultValue={true}>
            English
          </option>
        </select>
      </div>
      <div className="box-controls">
        <button className="btn-generate" onClick={handleGeneratePage}>
          {loading ? (
            <>
              <span className="spinner"></span>
              <span>Loading...</span>
            </>
          ) : (
            <span>Generate</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default GenerateBox;
