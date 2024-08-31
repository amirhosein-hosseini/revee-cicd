import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { CustomNextArrow, CustomPrevArrow } from "./customArrow";
import { domain, image_url } from "@/api/domain";


export default function HeroSlider({data}) {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />
  };
  return (
    <Slider {...settings}>
      {data?.map((item) => (
        <div className="w-full overflow-hidden">
          <img className="object-cover w-full" src={image_url + item?.banner} />
        </div>
      ))}
    </Slider>
  );
}