/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import "./product.css";
import Icon from "../../icon/icon";
import useGetPageData from "../../hooks/useGetPageData.js";
import EditButton from "../utilis/editbutton.jsx";
import useEditStore from "../../zustand/useEditStore.js";
import useGlobalBxStore from "../../zustand/useGlobalBxStore.js";
import useGeneratePage from "../../hooks/useGeneratePage.js";
import usePageStore from "../../zustand/usePageStore.js";
import { useParams } from "react-router-dom";
import PageStatus from "./pagestatus.jsx";
import ViewBox from "./viewBox.jsx";
import { toast } from "react-toastify";
import Msg from "../utilis/msg.jsx";

const Product = () => {
  const imageStackRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const { setEditType, elementIndex,setSubType, setElementIndex, setCurrentData } =
    useEditStore();
  const [pageData, setPageData] = useState({});
  const { generatePage } = useGeneratePage();
  const { getPageData } = useGetPageData();
  const [loading, setLoading] = useState(true);
  const { productUrl, setProductTitle } = usePageStore();
  const { setIsVisible, setBoxType } = useGlobalBxStore();
  const pageId = useParams().id;

  useEffect(() => {
    const fetchData = async () => {
      if (!pageId) return;
  
      try {
        const data = await getPageData(pageId);
        if (data) {
          setPageData(data);
          setProductTitle(data.title);
          setLoading(false)
        } else {
          console.log(productUrl)
          const generatedData = await generatePage(productUrl, pageId);
          if (generatedData) {
            setPageData(generatedData);
            setLoading(false)
          } else {
            toast(<Msg msg="Internal Server Error" action={()=>{window.location.reload()}}/>);
          }
        }
        
      } catch (error) {
        toast(<Msg msg={`Error fetching or generating page data:${error}`}/>);
      }
    };
  
    fetchData();
    
    if(!loading){
      
      toast("Page Loaded Successfly")
    }
  }, [productUrl, pageId]);
  

  const {
    title,
    description,
    price,
    featuresLine,
    paragraph,
    paragraphTitles,
    images,
    reviews,
    footerTitle,
    footerDesc,
  } = pageData;
  window.document.title = 'Notrious - ' +  pageData.title

  const scrollLeft = () => {
    if (imageStackRef.current) {
      imageStackRef.current.scrollBy({ left: -85, behavior: "smooth" });
    }
  };

 

  const scrollContainerRef = useRef(null);

  const scroll = (scrollOffset) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: scrollOffset,
        behavior: "smooth",
      });
    }
  };

  const handleImageClick = (index) => {
    setSelectedImage(index);
  };

  const scrollRight = () => {
    if (imageStackRef.current) {
      imageStackRef.current.scrollBy({ left: 85, behavior: "smooth" });
    }
  };

  const handleEdit = (editType,subType, index, currentData) => {
    setEditType(editType);
    setElementIndex(index);
    setSubType(subType)
    setCurrentData(currentData);
    setIsVisible(true);
    setBoxType("editTextBox");
  };

  return (loading) ? (
    <PageStatus />
  ) : (
    <ViewBox>
      <>
        <div className="product-container">
          <div className="product-content">
            <div className="product-head">
              <div className="head-left">
                <div className="product-main-img">
                  <img
                    className="img"
                    src={images[selectedImage] || ""}
                    alt="Product"
                  />
                </div>
              
                <div className="product-image-stack">
                  <button className="left-scroll" onClick={scrollLeft}>
                    <Icon icon="arrowleft"></Icon>
                  </button>
                  <ul className="img-stack-list" ref={imageStackRef}>
                    {images.map((src, index) => (
                      <li
                        key={index}
                        className={`img-stack-item ${
                          index === selectedImage ? "selected" : ""
                        }`}
                        onClick={() => handleImageClick(index)}
                      >
                        <img src={src} alt={`Product ${index}`} />
                      </li>
                    ))}
                  </ul>
                  <button className="right-scroll" onClick={scrollRight}>
                    <Icon icon="arrowright"></Icon>
                  </button>
                </div>
              </div>
              <div className="head-right">
                <EditButton
                  currentData={title}
                  handleEdit={handleEdit}
                  className="product-name"
                  editType={"title"}
                >
                  <h4 id="product-title">{title}</h4>
                </EditButton>

                <EditButton
                  currentData={description}
                  handleEdit={handleEdit}
                  className="prouct-des"
                  editType={"description"}
                >
                  <p>{description}</p>
                </EditButton>

                <div className="product-features">
                  <ul className="product-features-list">
                    {featuresLine.map((feature, index) => (
                      <li key={index} className="product-feature-item">
                        <span className="feature-icon">
                          <Icon icon="check" />
                        </span>

                        <EditButton
                          currentData={feature}
                          handleEdit={handleEdit}
                          className="feature-text"
                          editType={"featuresLine"}
                          index={index}
                        >
                          {feature}
                        </EditButton>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="cart-button">
                  <button className="cart-btn">Add to Cart</button>
                </div>
                <div className="product-delivery">
                  <div className="delivery-item">
                    <div className="delivery-icon">
                      <Icon icon="box" />
                    </div>
                    <div className="delivery-des">
                      <p>Free return</p>
                    </div>
                  </div>
                  <div className="delivery-item">
                    <div className="delivery-icon">
                      <Icon icon="truck" />
                    </div>
                    <div className="delivery-des">
                      <p>Secure Delivery</p>
                    </div>
                  </div>
                  <div className="delivery-item">
                    <div className="delivery-icon">
                      <Icon icon="gurentee" />
                    </div>
                    <div className="delivery-des">
                      <p>30 Days Money Back Gurentee</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="product-center">
            <div className="product-paragraph reverse">
              <div className="para-img">
                <img src={images[0]} alt="" />
              </div>
              <div className="para-content">
                <div className="para-heading">
                  <EditButton
                    currentData={title}
                    handleEdit={handleEdit}
                    className="para-heading"
                    editType={"paragraphTitles"}
                    index={0}
                  >
                    {" "}
                    <h2>{paragraphTitles[0]}</h2>
                  </EditButton>
                </div>

                <EditButton
                  currentData={paragraph[0]}
                  handleEdit={handleEdit}
                  className="para-des"
                  editType={"paragraph"}
                  index={0}
                >
                  {" "}
                  <p>{paragraph[0]}</p>
                </EditButton>
                <div className="cart-button">
                  <button className="cart-btn">Add to Cart</button>
                </div>
              </div>
            </div>
            <div className="product-paragraph">
              <div className="para-img">
                <img src={images[1]} alt="" />
              </div>
              <div className="para-content">
                <EditButton
                  currentData={title}
                  handleEdit={handleEdit}
                  className="para-heading"
                  editType={"paragraphTitles"}
                  index={1}
                >
                  {" "}
                  <h2>{paragraphTitles[1]}</h2>
                </EditButton>

                <EditButton
                  currentData={paragraph[1]}
                  handleEdit={handleEdit}
                  className="para-des"
                  editType={"paragraph"}
                  index={1}
                >
                  {" "}
                  <p>{paragraph[1]}</p>
                </EditButton>

                <div className="cart-button">
                  <button className="cart-btn">Add to Cart</button>
                </div>
              </div>
            </div>
          </div>

          <div className="product-review-section">
            <h5 className="section-heading">Our Customer Reviews</h5>
            <p className="review-star">⭐⭐⭐⭐⭐</p>
            <div style={{ display: "flex", alignItems: "center" }}>
              <button
                className="left-scroll"
                onClick={() => {
                  scroll(-200);
                }}
              >
                <Icon icon="arrowleft"></Icon>
              </button>
              <ul
                className="review-list"
                ref={scrollContainerRef}
                style={{ scrollSnapType: "x mandatory" }}
              >
                {reviews.map((review, index) => (
                  <li key={index} className="review-item">
                    <div className="review-item-img">
                      <img src={review.contentImage} alt="" />
                    </div>

                    <EditButton
                      currentData={review.content}
                      handleEdit={handleEdit}
                      className="review-des"
                      editType={"review"}
                      subType={'content'}
                      index={index}
                    >
                      <p>{review.content}</p>
                    </EditButton>

                    <p className="review-star">⭐⭐⭐⭐⭐</p>
                    <div className="customer-info">
                      <div className="profile-pic">
                        <img src={review.profilePic} alt="Customer" />
                      </div>
                      <div className="customer-name">
                        <p>{review.author}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <button
                className="right-scroll"
                onClick={() => {
                  scroll(200);
                }}
              >
                <Icon icon="arrowright"></Icon>
              </button>
            </div>
          </div>
        </div>
        <div className="footer-product">
          <div className="footer-heading">
            <EditButton
              currentData={footerTitle}
              handleEdit={handleEdit}
              className="foot-title"
              editType={"footerTitle"}
            >
              <h2>{footerTitle}</h2>
            </EditButton>
            <EditButton
              currentData={footerDesc}
              handleEdit={handleEdit}
              className="foot-des"
              editType={"footerDesc"}
            >
              <p>{footerDesc}</p>
            </EditButton>
          </div>
          <div className="cart-button">
            <button className="cart-btn">Add to Cart</button>
          </div>
        </div>
      </>
    </ViewBox>
  );
};

export default Product;
