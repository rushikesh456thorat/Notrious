import "./template.css";
import { useState } from "react";
import Icon from '../../icon/icon'
const Template = () => {
  const [isOpen, setIsOpen] = useState(false); // To toggle dropdown visibility
  const [selected, setSelected] = useState("Name"); // To store the selected option

  const handleSelect = (gender) => {
    setSelected(gender); // Update the selected option
    setIsOpen(false); // Close the dropdown
  };
  return (
    <div className="template-container">
      <section className="template-header">
        <div className="container-heading">
          <h1>Templates</h1>
        </div>
        <div className="content-sortby">
          <div>Sort By</div>
          <div className="dropdown">
            <div className="select" onClick={() => setIsOpen(!isOpen)}>
              <span>{selected}</span>
              <Icon icon="chevrondown"/>
            </div>
            <input type="hidden" name="gender" value={selected} />
            {isOpen && (
              <ul className="dropdown-menu">
                <li onClick={() => handleSelect("Name")} id="name">
                  Name
                </li>
                <li onClick={() => handleSelect("Released Date")} id="releasedate">
                  Released Date
                </li>
              </ul>
            )}
          </div>
        </div>
      </section>
      <section className="template-content">
        <div className="template-item">
          <div className="scroll-image">
            <img
              className="template-img"
              alt="jdk"
              src="/template1.jpeg"
            />
          </div>
          <div className="template-description">
            <div className="template-item-name">
              <h4>Consumer Electronic</h4>
            </div>
            <div className="equip-feild">
              <button className="equip-btn">Equiped</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Template;
