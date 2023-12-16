import React from 'react';
import { Carousel, Card } from 'antd';
// import { LeftOutlined, RightOutlined } from '@ant-design/icons'; // Import the arrow icons
import Simon from '../static/images/Simon.png'

const contentStyle = {
  height: '660px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#FFB6C1',
};
// const customPrevArrow = (onClickHandler) => (
//     <div
//         style={{
//             fontSize: '24px',
//             color: '#fff',
//             cursor: 'pointer',
//             position: 'absolute',
//             top: '50%',
//             left: '16px',
//             transform: 'translateY(-50%)',
//             }}
//             onClick={onClickHandler}
//     >
//         <LeftOutlined />
//     </div>
// );
// const customNextArrow = (onClickHandler) => (
//     <div
//     style={{
//       fontSize: '24px',
//       color: 'white',
//       cursor: 'pointer',
//       position: 'absolute',
//       top: '50%',
//       right: '16px',
//       transform: 'translateY(-50%)',
//     }}
//     onClick={onClickHandler}
//   >
//     <RightOutlined />
//   </div>
// );  
// const onChange = (currentSlide) => {
//     console.log(currentSlide);
// }
export default function Slider() {
    return(
        <Carousel 
            autoplay
            // prevArrow={customPrevArrow}
            // nextArrow={customNextArrow}
        >
            <div>
                {/* <h3 style={contentStyle}>1</h3> */}
                <Card style={{ ...contentStyle }}>
         
                    <img src={Simon} alt="Card 1" />
                </Card>
            </div>
            <div>
                {/* <h3 style={contentStyle}>2</h3> */}

                <Card style={{ ...contentStyle }}>
         
                    <img src={Simon} alt="Card 1" />
                </Card>
            </div>
            <div>
                {/* <h3 style={contentStyle}>3</h3> */}
                <Card style={{ ...contentStyle }}>
         
                    <img src={Simon} alt="Card 1" />
                </Card>
            </div>
            <div>
                {/* <h3 style={contentStyle}>4</h3> */}
                <Card style={{ ...contentStyle }}>
         
                    <img src={Simon} alt="Card 1" />
                </Card>
            </div>
        </Carousel>
        
    )
};
