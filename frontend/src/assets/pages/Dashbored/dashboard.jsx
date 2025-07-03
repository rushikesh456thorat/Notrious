/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Icon from "../../icon/icon.jsx";
import "./dashboard.css";
import useGlobalBxStore from "../../zustand/useGlobalBxStore.js";
import DataTable from "./datatable.jsx";
import { toast } from "react-toastify";
import { useAuthStore } from "../../zustand/useAuthStore.js";

const Dashboard = () => {
  const { setIsVisible, setBoxType } = useGlobalBxStore();
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { authUser } = useAuthStore();

  const fetchPages = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_DOMAIN}/api/retrive/user/pages`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch pages");
      }

      const data = await res.json();
      setPages(data.pages || []);
    } catch (error) {
      console.error("Error fetching pages:", error.message);
      toast.error("Failed to load pages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const handleGenerate = () => {
    setIsVisible(true);
    setBoxType("generatebox");
  };

  const handleDeletePages = async (pagesToDelete) => {
    const publicIds = pagesToDelete.map((page) => page.id);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_DOMAIN}/api/user/delete/pages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ publicIds }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to delete pages");
      }

      const updatedPages = pages.filter((page) => !publicIds.includes(page.id));
      setPages(updatedPages);
      toast.success("Pages deleted successfully");
    } catch (error) {
      console.error("Error deleting pages:", error);
      toast.error("Something went wrong while deleting pages");
    }
  };

  const total = pages.length;
  const published = pages.filter((p) => p.published).length;
  const notPublished = total - published;

  // Loading overlay component
  const LoadingOverlay = () => (
    <div className="loading-overlay">
      <div className="loading-content">
        <div className="loading-spinner"></div>
        <div className="loading-text">Loading your dashboard...</div>
      </div>
    </div>
  );

  // Skeleton loader for content
  const SkeletonLoader = () => (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <section className="quick-overview">
          <div className="skeleton skeleton-header"></div>
          <div className="generate">
            <button className="btn-generate" disabled>
              <Icon icon="plus" />
              <span>Generate</span>
            </button>
          </div>
        </section>

        <section className="data-shower skeleton-shower">
          <div className="shower-item skeleton-item"></div>
          <div className="shower-item skeleton-item"></div>
          <div className="shower-item skeleton-item"></div>
        </section>

        <section className="data-table">
          <div className="skeleton skeleton-table"></div>
        </section>
      </div>
    </div>
  );

  if (loading) {
    return (
      <>
        <LoadingOverlay />
        <SkeletonLoader />
      </>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <section className="quick-overview">
          <div className="user-greating">
            <h1>Welcome, {authUser['email'].split("@")[0]}!</h1>
          </div>
          <div className="generate">
            <button
              className="btn-generate"
              title="Generate Page and Ads"
              onClick={handleGenerate}
            >
              <Icon icon="plus" />
              <span>Generate</span>
            </button>
          </div>
        </section>

        <section className="data-shower">
          <div className="shower-item">
            <div className="item-icon">
              <Icon icon="duplicatedoc" />
            </div>
            <div className="item-description">
              <div className="item-name">Total Pages</div>
              <div className="item-count">{total}</div>
            </div>
          </div>
          <div className="shower-item">
            <div className="item-icon">
              <Icon icon="airplane" />
            </div>
            <div className="item-description">
              <div className="item-name">Published Pages</div>
              <div className="item-count">{published}</div>
            </div>
          </div>
          <div className="shower-item">
            <div className="item-icon">
              <Icon icon="warning" />
            </div>
            <div className="item-description">
              <div className="item-name">Not Published Pages</div>
              <div className="item-count">{notPublished}</div>
            </div>
          </div>
        </section>

        <section className="data-table">
          <DataTable pages={pages} onDelete={handleDeletePages} />
        </section>
      </div>
    </div>
  );
};

export default Dashboard;