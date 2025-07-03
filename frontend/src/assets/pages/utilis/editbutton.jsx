import { useState } from "react";
import Icon from "../../icon/icon";

const EditButton = ({currentData, handleEdit,subType='', editType, index = -1, className,children }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleMouseEnter = () => setIsVisible(true);
  const handleMouseLeave = () => setIsVisible(false);

  return (
    <div
      className={className} // Wrapper to scope hover events
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ position: "relative" }} // Ensure the button is positioned relative to the parent
    >
      {children}
      <button
        className="edit-text-btn"
        title="Edit Text"
        style={{
          visibility: isVisible ? "visible" : "hidden",
        }}
        onClick={() => handleEdit(editType,index,subType,currentData)}
      >
        <Icon icon="pencil" />
      </button>
    </div>
  );
};

export default EditButton;
