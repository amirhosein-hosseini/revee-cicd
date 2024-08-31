import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { CustomNextArrow, CustomNextTestArrow, CustomPrevArrow, CustomPrevTestArrow } from "./customArrow";


export default function TestimonialSlider({data}) {
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <CustomNextTestArrow />,
    prevArrow: <CustomPrevTestArrow />
  };
  return (
    <Slider {...settings}>
        {data?.map((item) => (
            <div className="w-full overflow-hidden bg-white">
                <div className="w-[70%] flex flex-col mx-auto">
                    <div className="mb-3">
                        <svg className="max-md:w-8" xmlns="http://www.w3.org/2000/svg" width="55" height="55" viewBox="0 0 55 55" fill="none">
                            <g clip-path="url(#clip0_1065_19020)">
                                <path d="M12.0779 21.7558C14.4558 21.7558 16.7803 22.461 18.7574 23.7821C20.7346 25.1032 22.2756 26.9809 23.1856 29.1778C24.0956 31.3747 24.3337 33.7921 23.8697 36.1243C23.4058 38.4565 22.2608 40.5988 20.5793 42.2802C18.8979 43.9617 16.7556 45.1067 14.4234 45.5706C12.0912 46.0345 9.6738 45.7964 7.4769 44.8865C5.28 43.9765 3.40228 42.4355 2.08119 40.4583C0.760093 38.4812 0.0549618 36.1566 0.0549618 33.7787L0 32.0612C0 25.6838 2.53339 19.5677 7.04285 15.0582C11.5523 10.5488 17.6685 8.01538 24.0458 8.01538V14.8856C21.7893 14.8795 19.5539 15.3209 17.469 16.1841C15.3841 17.0473 13.4911 18.3152 11.8992 19.9146C11.2806 20.5321 10.7098 21.1959 10.192 21.9001C10.8069 21.8039 11.4355 21.7524 12.0744 21.7524L12.0779 21.7558ZM42.9939 21.7558C45.3718 21.7558 47.6963 22.461 49.6735 23.7821C51.6506 25.1032 53.1916 26.9809 54.1016 29.1778C55.0116 31.3747 55.2497 33.7921 54.7858 36.1243C54.3219 38.4565 53.1768 40.5988 51.4954 42.2802C49.8139 43.9617 47.6717 45.1067 45.3394 45.5706C43.0072 46.0345 40.5898 45.7964 38.3929 44.8865C36.196 43.9765 34.3183 42.4355 32.9972 40.4583C31.6761 38.4812 30.971 36.1566 30.971 33.7787L30.916 32.0612C30.916 25.6838 33.4494 19.5677 37.9589 15.0582C42.4683 10.5488 48.5845 8.01538 54.9618 8.01538V14.8856C52.7053 14.8795 50.47 15.3209 48.3851 16.1841C46.3002 17.0473 44.4071 18.3152 42.8153 19.9146C42.1966 20.5321 41.6259 21.1959 41.108 21.9001C41.7229 21.8039 42.3515 21.7524 42.9939 21.7524V21.7558Z" fill="black" fill-opacity="0.8" />
                            </g>
                            <defs>
                                <clipPath id="clip0_1065_19020">
                                    <rect width="54.9618" height="54.9618" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                    </div>
                    <div className="mb-5">
                        <p className="relative max-md:text-xs bg-white" style={{zIndex: "100"}}>
                            {item?.comment}
                        </p>
                    </div>
                    <div>
                        <p className="font-bold text-xl max-md:text-sm">
                            {item?.name}
                        </p>
                    </div>
                </div>
            </div>
        ))}
    </Slider>
  );
}