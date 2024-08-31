import React from 'react';

function CustomPrevArrow(props) {
  const { className, style, onClick } = props;
  return (
      <div
          className={className}
          style={{ ...style, display: 'block'}}
          onClick={onClick}
      >
          <svg className='max-md:w-6 max-md:h-6' xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56" fill="none">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M28.0002 51.3333C15.1135 51.3333 4.66683 40.8866 4.66683 28C4.66684 15.1133 15.1135 4.66665 28.0002 4.66665C40.8868 4.66665 51.3335 15.1133 51.3335 28C51.3335 40.8866 40.8868 51.3333 28.0002 51.3333ZM15.6086 28L25.6668 17.9418L28.1417 20.4166L22.3084 26.25L39.6668 26.25L39.6668 29.75L22.3084 29.75L28.1417 35.5833L25.6668 38.0582L15.6086 28Z" fill="#D2D2D2" />
          </svg>

      </div>
  );
}

function CustomNextArrow(props) {
  const { className, style, onClick } = props;
  return (
      <div
          className={className}
          style={{ ...style, display: 'block'}}
          onClick={onClick}
      >
          <svg className='max-md:w-6 max-md:h-6' xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56" fill="none">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M27.9998 4.66669C40.8865 4.66669 51.3332 15.1134 51.3332 28C51.3332 40.8867 40.8865 51.3334 27.9998 51.3334C15.1132 51.3334 4.6665 40.8867 4.6665 28C4.6665 15.1134 15.1132 4.66669 27.9998 4.66669ZM40.3914 28L30.3332 38.0582L27.8583 35.5834L33.6916 29.75H16.3332V26.25H33.6916L27.8583 20.4167L30.3332 17.9418L40.3914 28Z" fill="#D2D2D2" />
          </svg>
      </div>
  );
}

function CustomNextTestArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: 'block' }}
            onClick={onClick}
        >
            <svg className='max-md:w-3' xmlns="http://www.w3.org/2000/svg" width="27" height="51" viewBox="0 0 27 51" fill="none">
                <path d="M2.09912 1.24414L24.9999 25.2899L2.09912 49.3357" stroke="#333333" stroke-width="2.29008" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </div>
    );
}

function CustomPrevTestArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: 'block' }}
            onClick={onClick}
        >
            <svg className='max-md:w-3' xmlns="http://www.w3.org/2000/svg" width="27" height="51" viewBox="0 0 27 51" fill="none">
                <path d="M24.9008 1.24414L2 25.2899L24.9008 49.3357" stroke="#333333" stroke-width="2.29008" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </div>
    );
}


export { CustomPrevArrow, CustomNextArrow, CustomNextTestArrow , CustomPrevTestArrow };
