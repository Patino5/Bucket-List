import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
 
const Gallery = ({ gallery }) => {

    return (
    <Swiper
      modules={[Navigation, Pagination]}
      navigation
      pagination={{ clickable: true }}
      spaceBetween={20}
      slidesPerView={1}
      className="w-full max-w-3xl mx-auto rounded-2xl shadow-lg"
    >
      {gallery.map((src, index) => (
        <SwiperSlide key={index}>
          <img
            src={src}
            alt={`Memory ${index + 1}`}
            className="w-full h-[70vh] max-h-screen object-cover rounded-lg"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
} 

export default Gallery;