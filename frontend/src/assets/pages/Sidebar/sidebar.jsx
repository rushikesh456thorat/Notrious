import { Link, useLocation } from "react-router-dom";
import Icon from "../../icon/icon";
import "./sidebar.css";
import { useState } from "react";
import { toast } from "react-toastify";
import { useAuthStore } from "../../zustand/useAuthStore";

// eslint-disable-next-line react/prop-types
const Sidebar = ({ close }) => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation(); // Get the current location
  const [loading, setLoading] = useState(false);
    const logout = useAuthStore((state) => state.logout);

  // Function to toggle sidebar
  const closeOpenSidebar = () => {
    setIsOpen(!isOpen);
    close(!isOpen); // Pass the updated sidebar state to the parent component
  };

  // Define your sidebar items and their corresponding paths
  const sidebarItems = [
    { path: "/dashboard", label: "Dashboard", icon: "home" },
    { path: "/accounts", label: "Account Integration", icon: "link" },
    { path: "/advertise", label: "Advertise", icon: "megaphone" },
    { path: "/templates", label: "Template Library", icon: "template" },
    { path: "/subscription", label: "Subscription", icon: "rupay" },
    { path: "/helpandsupport", label: "Help & Support", icon: "doublechat" },
    // Add more items as needed
  ];

  const handleLogout = async () => {
    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_DOMAIN}/api/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json()
      if(data.status != 'success'){

        toast.error('Something went wrong!')
        return
      }
      toast(data.message)
      logout()

    } catch (err) {
      toast.error('Intenal Server Error!')
      console.error(err)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`sidebar ${isOpen ? "" : "closed"}`}>
      <button className="bt-sidebar" onClick={closeOpenSidebar}>
        <Icon icon="cosidebar" /> {/* Icon changes when closed */}
      </button>
      <div className="company-name">
        <img src="/notrious.jpg" alt="Company Logo" />
        <label>Notrious</label>
      </div>
      <div className="horizontal-line"></div>
      <ul className="sidebar-list">
        {sidebarItems.map((item) => {
          const isActive = location.pathname === item.path; // Check if the current path matches the item path
          return (
            <li
              key={item.path}
              id={item.label.toLowerCase()}
              className={`sidebar-item ${isActive ? "active" : "notactive"}`}
            >
              <Link to={item.path} className="item-link">
                <Icon icon={item.icon} />
                <label>{item.label}</label>
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="horizontal-line"></div>
      <div className="sidebar-logout-bt">
        <button className="logout-bt" onClick={handleLogout}>
          <Icon icon="outarrow" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
