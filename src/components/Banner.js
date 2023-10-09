import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

function Banner() {
  return (
    <div className="relative">
        <div className=' absolute w-full h-32 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-10'/>
        <Carousel autoPlay infiniteLoop showStatus={false} showIndicators={false} swipeAnimationHandler={true} showThumbs={false} interval={5000}>
            <div>
                <img src='https://res.cloudinary.com/dp8l8uxgr/image/upload/v1693864141/AmazonClone/9_ixnn54.jpg' loading='lazy' alt='img1'/>
            </div>
            <div>
                <img src='https://res.cloudinary.com/dp8l8uxgr/image/upload/v1693864139/AmazonClone/8_ypeu0b.jpg' loading='lazy' alt='img2'/>
            </div>
            <div>
                <img src='https://res.cloudinary.com/dp8l8uxgr/image/upload/v1693864140/AmazonClone/10_ayxy1i.jpg' loading='lazy' alt='img3'/>
            </div>
            <div>
                <img src='https://res.cloudinary.com/dp8l8uxgr/image/upload/v1693864139/AmazonClone/2_vrj0uc.jpg' loading='lazy' alt='img4'/>
            </div>
            <div>
                <img src='https://res.cloudinary.com/dp8l8uxgr/image/upload/v1693864139/AmazonClone/5_lesnmg.jpg' loading='lazy' alt='img5'/>
            </div>
            <div>
                <img src='https://res.cloudinary.com/dp8l8uxgr/image/upload/v1693864141/AmazonClone/1_stdlrv.jpg' loading='lazy' alt='img6'/>
            </div>
            <div>
                <img src='https://res.cloudinary.com/dp8l8uxgr/image/upload/v1693864139/AmazonClone/7_yqsgxo.jpg' loading='lazy' alt='img7'/>
            </div>
            <div>
                <img src='https://res.cloudinary.com/dp8l8uxgr/image/upload/v1693864139/AmazonClone/3_s6hc0q.jpg' loading='lazy' alt='img8'/>
            </div>
            <div>
                <img src='https://res.cloudinary.com/dp8l8uxgr/image/upload/v1693864139/AmazonClone/6_ga01z0.jpg' loading='lazy' alt='img9'/>
            </div>
            <div>
                <img src='https://res.cloudinary.com/dp8l8uxgr/image/upload/v1693864139/AmazonClone/4_ncuc57.jpg' loading='lazy' alt='img10'/>
            </div>
        </Carousel>
    </div>
  )
}

export default Banner