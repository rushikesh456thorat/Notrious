import { useState, useMemo } from "react";
import  Icon  from '../../icon/icon'; // Replace with actual icon import
import "./dashboard.css"; // Import your CSS
import { useNavigate } from "react-router-dom";

const Tabs = ["All", "Published", "Not Published"];

const DataTable = ({ pages = [], onDelete, onGeneratePage }) => {
  const [activeTab, setActiveTab] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate()

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setSelectedItems([]);
  };

  const handleSearch = () => {
    setSelectedItems([]);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setSelectedItems([]);
  };

  const handleSelectAll = () => {
    if (selectedItems.length === filteredPages.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredPages.map((_, idx) => idx));
    }
  };

  const handleSelectItem = (index) => {
    if (selectedItems.includes(index)) {
      setSelectedItems(selectedItems.filter((i) => i !== index));
    } else {
      setSelectedItems([...selectedItems, index]);
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      const itemsToDelete = filteredPages.filter((_, i) =>
        selectedItems.includes(i)
      );
      onDelete(itemsToDelete);
      setSelectedItems([]);
    }
  };

  const handleGeneratePage = () => {
    if (onGeneratePage) {
      onGeneratePage();
    }
  };

  const filteredPages = useMemo(() => {
    let result = pages;
    if (activeTab === "Published") {
      result = result.filter((page) => page.published);
    } else if (activeTab === "Not Published") {
      result = result.filter((page) => !page.published);
    }
    if (searchTerm.trim() !== "") {
      result = result.filter((page) =>
        page.product.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return result;
  }, [pages, activeTab, searchTerm]);

  const handlePageClick = (index) => {
    const page = filteredPages[index];
    if (page?.id) {
      navigate(`/p/${page.id}`);
    }
  };

  // Empty state for no pages at all
  const EmptyPagesState = () => (
    <tr>
      <td colSpan="4" className="empty-state-cell">
        <div className="empty-state-container">
          <div className="empty-state-icon">
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
              <circle cx="60" cy="60" r="50" fill="#1a1a1a" stroke="#2440cc" strokeWidth="2" strokeDasharray="5,5"/>
              <path d="M40 60h40M60 40v40" stroke="#2440cc" strokeWidth="3" strokeLinecap="round"/>
              <circle cx="60" cy="60" r="25" fill="none" stroke="#2440cc" strokeWidth="1" opacity="0.3"/>
            </svg>
          </div>
          <div className="empty-state-content">
            <h2>No Pages Yet</h2>
            <p>Start building your product pages to showcase your items</p>
            <button className="generate-page-btn" onClick={handleGeneratePage}>
              <Icon icon="plus" />
              Generate Page
            </button>
          </div>
        </div>
      </td>
    </tr>
  );

  // Empty state for no search results
  const NoResultsState = () => (
    <tr>
      <td colSpan="4" className="empty-state-cell">
        <div className="empty-state-container">
          <div className="empty-state-icon">
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
              <circle cx="50" cy="50" r="20" fill="none" stroke="#666" strokeWidth="3"/>
              <path d="65 65L85 85" stroke="#666" strokeWidth="3" strokeLinecap="round"/>
              <circle cx="50" cy="50" r="8" fill="none" stroke="#666" strokeWidth="2"/>
              <path d="M35 35L65 65" stroke="#cf2006" strokeWidth="2" strokeLinecap="round"/>
              <path d="M65 35L35 65" stroke="#cf2006" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="empty-state-content">
            <h2>No Results Found</h2>
            <p>We couldn't find any pages matching "{searchTerm}"</p>
            <div className="empty-state-actions">
              <button className="clear-search-btn" onClick={handleClearSearch}>
                Clear Search
              </button>
              <button className="generate-page-btn" onClick={handleGeneratePage}>
                <Icon icon="plus" />
                Generate Page
              </button>
            </div>
          </div>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="pages-table-wrapper">
      {/* Tabs */}
      <div className="data-tabs">
        {Tabs.map((tab) => (
          <div
            key={tab}
            className={`tab-item ${activeTab === tab ? "active-txt" : ""}`}
            onClick={() => handleTabClick(tab)}
          >
            <div className="tab-name">{tab}</div>
            <div className="tab-count">
              {tab === "All"
                ? pages.length
                : tab === "Published"
                ? pages.filter((p) => p.published).length
                : pages.filter((p) => !p.published).length}
            </div>
          </div>
        ))}
      </div>

      {/* Search and Delete */}
      <div className="table-tools">
        <div className="search-item">
          <input
            className="search-bx"
            placeholder="Search products..."
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-btn" onClick={handleSearch}>
            Search
          </button>
        </div>
        <div className="delete-tool">
          <button className="delete" onClick={handleDelete}>
            <Icon icon="trash" />
            <span>Delete</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={
                    selectedItems.length === filteredPages.length &&
                    filteredPages.length > 0
                  }
                  onChange={handleSelectAll}
                  className="check-box"
                />
              </th>
              <th>Product</th>
              <th>Store</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {filteredPages.length === 0 ? (
              // Show different empty states based on whether user is searching or not
              searchTerm.trim() !== "" ? <NoResultsState /> : <EmptyPagesState />
            ) : (
              filteredPages.map((page, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="checkbox"
                      className="check-box"
                      checked={selectedItems.includes(index)}
                      onChange={() => handleSelectItem(index)}
                    />
                  </td>
                  <td className="product" onClick={() => handlePageClick(index)}>
                    <img
                      src={page.image || "/placeholder.jpg"}
                      alt={page.product}
                    />
                    <span>{page.product}</span>
                  </td>
                  <td className="store">{page.store}</td>
                  <td className="category">{page.category}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;