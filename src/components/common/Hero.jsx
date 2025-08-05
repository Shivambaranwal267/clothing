import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// import Swiper styles
import "swiper/css";
import SliderOneImg from "../../assets/images/banner-1.jpg";
import SliderTwoImg from "../../assets/images/banner-2.jpg";
import { apiUrl } from "./http";

const Hero = () => {
  const [images, setImages] = useState([]);

  const fetchBanner = async () => {
    fetch(`${apiUrl}/admin/banner`, {
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
          console.log("banner", result.data);

          setImages(result.data);
        } else {
          console.log("Something went wrong");
        }
      });
  };

  useEffect(() => {
    fetchBanner();
  }, []);

  return (
    <section className="section-1">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        breakpoints={{
          1024: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
        }}
      >
        {images.map((data) => {
          return (
            <SwiperSlide>
              <div
                className="content d-flex flex-column justify-content-center align-items-center "
                style={{
                  backgroundImage: `url(http://localhost:8000/storage/bannerimage/${data.image})`,
                }}
              >
                {/* <img className="content" src={`http://localhost:8000/storage/bannerimage/${data.image}`} /> */}
                <h1>{data.description}</h1>
                <a href={data.link}><button>click me</button></a>
              </div>
            </SwiperSlide>
          );
        })}
        {/* <SwiperSlide>
          <div
            className="content"
            style={{ backgroundImage: `url(${SliderOneImg})` }}
          ></div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="content"
            style={{ backgroundImage: `url(${SliderTwoImg})` }}
          ></div>
        </SwiperSlide> */}
      </Swiper>
    </section>
  );
};

export default Hero;
