import { useState } from "react";
import useEditStore from "../../zustand/useEditStore";
import "./edittextbox.css";
import Icon from "../../icon/icon";
import useGlobalBxStore from "../../zustand/useGlobalBxStore";
import useUpdatePageData from "../../hooks/useUpdatePageData";
import { useParams } from "react-router-dom";
import useRewriterWithAi from "../../hooks/useRewriteWithAi";
import usePageStore from "../../zustand/usePageStore";

const EditTextBox = () => {
  const { editType, elementIndex,subType ,currentData } = useEditStore();
  const { setIsVisible } = useGlobalBxStore();
  const [data, setData] = useState(currentData);
  const [numberOfChar, setNumberOfChar] = useState(currentData.length);
  const { updatePageData, loading } = useUpdatePageData();
  const { rewriterWithAi } = useRewriterWithAi();
  const pageId = useParams().id;
  const { productTitle } = usePageStore();
  const [rLoading,setRLoading] = useState(false)

  const NumberOfLettersPermitable = {
    paragraph: 500,
    title: 50,
    description: 100,
    featuresLine: 30,
    footerTitle: 100,
    footerDesc: 200,
    paragraphTitles: 50,
    review: 300,
  };

  const handleCloseBox = () => {
    setIsVisible(false);
  };
  const handleSave = async () => {
    if (data) {
      await updatePageData({
        pageId: pageId,
        type: editType,
        index: elementIndex,
        newData: data,
        subField:subType,
      });
    }
    handleCloseBox();
    window.location.reload();
  };
  const handleRewriteWithAi = async () => {
    try {
      setRLoading(true)
      const res = await rewriterWithAi(data, productTitle );
      if (res) setData(res);
    } catch (error) {
      console.log(error)
    }finally{
      setRLoading(false)
    }
  };

  return (
    <>
      <div className="edit-bx">
        <div className="edit-bx-nav">
          <div className="left-side">
            <span>Edit Text</span>
          </div>
          <div className="right-side">
            <button className="edit-close-btn" onClick={handleCloseBox}>
              <Icon icon={"plus"} />
            </button>
          </div>
        </div>
        <div>
          <textarea
            className="edit-bx-txtarea"
            placeholder="Write your Own..."
            value={data}
            onChange={(e) => {
              setData(e.target.value);
              setNumberOfChar(e.target.value.length);
            }}
          />
        </div>

        <div className="edit-bx-toolbar">
          <button
            className="edit-ai-btn"
            onClick={handleRewriteWithAi}
            data-text="AI rewriting available once you've written 10+ words"
            disabled={numberOfChar <= 20 || rLoading}
          >
            <Icon icon="sparkales" />
            <span>{rLoading ? 'Generating....':'Rewrite with Ai'}</span>
          </button>
          <div>
            <span>
              {numberOfChar}/{NumberOfLettersPermitable[editType]}
            </span>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", height: "45px" }}>
          {!loading ? (
            <button className="edit-bx-save-btn" onClick={handleSave}>
              Save Changes
            </button>
          ) : (
            <button className="edit-bx-save-btn" disabled>
              Saving....
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default EditTextBox;
