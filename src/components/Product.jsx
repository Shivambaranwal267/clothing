import React, { useContext, useEffect, useState } from "react";
import Layout from "./common/Layout";
import { Rating } from "react-simple-star-rating";
import { Link, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, FreeMode, Navigation } from "swiper/modules";
import { apiUrl } from "../components/common/http";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { CartContext } from "./context/Cart";
import { toast } from "react-toastify";

const Product = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [rating, setRating] = useState(4);
  const [product, setProduct] = useState([]);
  const [productImages, setProductImages] = useState([]);
  const [productSizes, setProductSizes] = useState([]);
  const [sizeSelected, setSizeSelected] = useState(null);
  const params = useParams();
  const { addToCart } = useContext(CartContext);

  const fetchProduct = () => {
    fetch(`${apiUrl}/get-product/${params.id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.status == 200) {
          setProduct(result.data);
          setProductImages(result.data.product_images);
          setProductSizes(result.data.product_sizes);
        } else {
          console.log("Something went wrong");
        }
      });
  };

  const handleAddToCart = () => {
    if (productSizes.length > 0) {
      if (sizeSelected == null) {
        toast.error("Please select a size");
      } else {
        addToCart(product, sizeSelected);
        toast.success("Product successfully added to cart");
      }
    } else {
      addToCart(product, null);
      toast.success("Product successfully added to cart");
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <Layout>
      <div className="container product-detail">
        <div className="row">
          <div className="col-md-12">
            <nav aria-label="breadcrumb" className="py-4">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item" aria-current="page">
                  <Link to="/shop">Shop</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Dummy Product Title
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <div className="row mb-5">
          <div className="col-md-5">
            <div className="row">
              <div className="col-2">
                <Swiper
                  style={{
                    "--swiper-navigation-color": "#000",
                    "--swiper-pagination-color": "#000",
                  }}
                  onSwiper={setThumbsSwiper}
                  loop={false} // Disabled loop
                  direction={`vertical`}
                  spaceBetween={10}
                  slidesPerView={3} // Adjusted to match number of slides
                  freeMode={true}
                  watchSlidesProgress={true}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className="mySwiper mt-2"
                >
                  {productImages &&
                    productImages.map((product_image) => {
                      return (
                        <SwiperSlide key={`image-sm-${product_image.id}`}>
                          <div className="content">
                            <img
                              src={product_image.image_url}
                              alt="product_images"
                              height={100}
                              className="w-100"
                            />
                          </div>
                        </SwiperSlide>
                      );
                    })}
                </Swiper>
              </div>
              <div className="col-10">
                <Swiper
                  style={{
                    "--swiper-navigation-color": "#000",
                    "--swiper-pagination-color": "#000",
                  }}
                  loop={true}
                  spaceBetween={0}
                  navigation={true}
                  thumbs={{
                    swiper:
                      thumbsSwiper && !thumbsSwiper.destroyed
                        ? thumbsSwiper
                        : null,
                  }}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className="mySwiper2 mt-2"
                >
                  {productImages &&
                    productImages.map((product_image) => {
                      return (
                        <SwiperSlide key={`image-${product_image.id}`}>
                          <div className="content">
                            <img
                              src={product_image.image_url}
                              alt="product_images"
                              className="w-100"
                            />
                          </div>
                        </SwiperSlide>
                      );
                    })}
                </Swiper>
              </div>
            </div>
          </div>
          <div className="col-md-7">
            <h2>{product.title}</h2>

            <div className="d-flex ">
              <Rating size={20} r readonly initialValue={rating} />
              <span className="pt-1 ps-2">10 Reviews</span>
            </div>

            <div className="price h3 py-3">
              ${product.price} &nbsp;
              {product.compare_price && (
                <span className="text-decoration-line-through">
                  ${product.compare_price}
                </span>
              )}
            </div>

            <div className="">{product.short_description}</div>

            <div className="pt-3">
              <strong className="">Select Size</strong>
              <div className="sizes pt-2">
                {productSizes &&
                  productSizes.map((product_size) => {
                    return (
                      <button
                        onClick={() => setSizeSelected(product_size.size.name)}
                        key={`p-size-${product_size.id}`}
                        className={`btn btn-size me-2 ${
                          sizeSelected == product_size.size.name ? "active" : ""
                        }`}
                      >
                        {product_size.size.name}
                      </button>
                    );
                  })}
              </div>
            </div>

            <div className="add-to-cart my-4">
              <button
                onClick={() => handleAddToCart()}
                className="btn btn-primary text-uppercase"
              >
                Add To Cart
              </button>
            </div>

            <hr />

            <div className="">
              <strong>SKU: </strong>
              {product.sku}
            </div>
          </div>
        </div>

        <div className="row pb-5">
          <div className="col-md-12">
            <Tabs
              defaultActiveKey="description"
              id="uncontrolled-tab-example"
              className="mb-3"
            >
              <Tab eventKey="description" title="Description">
                <div
                  dangerouslySetInnerHTML={{ __html: product.description }}
                ></div>
              </Tab>
              <Tab eventKey="reviews" title="Reviews (10)">
                Reviews Area
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Product;
