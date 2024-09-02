import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { CustomNextArrow, CustomPrevArrow } from "./customArrow";
import { domain, image_url } from "@/api/domain";


export default function HeroSlider({data}) {
  var settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />
  };
  return (
    <Slider {...settings}>
      {data?.map((item) => (
        <a target="_blank" href={item?.link} className="w-full overflow-hidden">
          <img className="object-cover w-full" src={image_url + item?.banner} />
        </a>
      ))}
    </Slider>
  );
}