import { useState } from "react";
import Icon from "../../icon/icon";
import "./product.css";
import { Link, useParams } from "react-router-dom";
import usePublishPage from "../../hooks/usePublishPage";
import { useEffect } from "react";
import { toast } from "react-toastify";

const ViewBox = ({ children }) => {
  const [view, setView] = useState("pc");
  const [isAnimating, setIsAnimating] = useState(false);
  const [previewUrl, setPreviewUrl] = useState();
  const [isPublished, setIsPublished] = useState();

  const pageId = useParams().id;
  const { publishPage, loading } = usePublishPage();
  useEffect(() => {
    const checkPagePublish = async () => {
      try {
        const res = await fetch(
          `${
            import.meta.env.VITE_API_DOMAIN
          }/api/user/publish-page/status/${pageId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        const response = await res.json();

        if (response.status == "fail") {
          toast.error("Something went wrong");
        }
        await setIsPublished(response.isPublished);
        await setPreviewUrl(response.previewUrl);
      } catch (error) {
        console.error(error);
        toast.error("Application broke try after some time!");
      }
    };
    checkPagePublish();
  }, [pageId]);

  const handlePublish = async () => {
    
    setIsAnimating(true);

    const result = await publishPage(pageId);

    if (result && result.productUrl) {
      setPreviewUrl(result.productUrl);
    }

    setTimeout(() => setIsAnimating(false), 1000);
  };

  return (
    <div className="view-box-container">
      {/* Header with back button and publish */}
      <div className="view-box-header">
        <Link to="/dashboard" className="view-box-back-btn">
          <Icon icon="arrowleft" />
          <span>Go Back</span>
        </Link>

        <div className="view-box-center">
          <div className="view-selector-tabs">
            <button
              className={`view-tab ${view === "pc" ? "active" : ""}`}
              onClick={() => setView("pc")}
            >
              <Icon icon="desktop" />
              <span>Desktop View</span>
            </button>
            <button
              className={`view-tab ${view === "mobile" ? "active" : ""}`}
              onClick={() => setView("mobile")}
            >
              <Icon icon="mobile" />
              <span>Mobile View</span>
            </button>
          </div>
        </div>

        <div className="view-box-actions">
          {previewUrl && (
            <a
              href={`${previewUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="view-box-preview-btn"
            >
              <Icon icon="external" />
              <span>Preview</span>
            </a>
          )}

          <button
            className={`view-box-publish-btn 
              ${previewUrl ? "published" : ""} 
              ${isAnimating ? "pulse" : ""}
            `}
            onClick={handlePublish}
            title={previewUrl ? "Unpublish" : "Publish"}
            disabled={previewUrl}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
              </>
            ) : previewUrl ? (
              <>
                <Icon icon="check" />
                <span>Published</span>
              </>
            ) : (
              <>
                <Icon icon="upload" />
                <span>Publish</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Device frame container */}
      <div className={`device-frame ${view}-frame`}>
        {view === "mobile" && (
          <>
            <div className="mobile-notch"></div>
            <div className="mobile-speaker"></div>
          </>
        )}

        <div className={`view-content ${view}-content`}>{children}</div>

        {view === "mobile" && <div className="mobile-home-indicator"></div>}
      </div>
    </div>
  );
};

export default ViewBox;
