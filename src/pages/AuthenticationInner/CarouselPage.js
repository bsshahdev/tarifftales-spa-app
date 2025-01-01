import React, { useState } from 'react';
import {
    Carousel,
    CarouselItem,
    CarouselIndicators,
    CarouselControl,
} from 'reactstrap';
import { auth_slider1, auth_slider2, auth_slider3, auth_slider4 } from '../../assets/images';


const items = [
    {
        id: 1,
        img: auth_slider1,
        title: "Simplified Rate Procurement",
        description: "Say goodbye to the hassle of dealing with diverse rate formats. Our cutting-edge Rate Upload Feature simplifies the process, making it incredibly easy for you to manage rates from carriers, without worrying about different formats."
    },
    {
        id: 2,
        img: auth_slider2,
        title: "Instant Rate Comparisons",
        description: "Quickly compare rates from multiple carriers in real-time. Our Platform’s intuitive interface allows you to make informed decisions with just a few clicks, saving you valuable time and effort."
    },
    {
        id: 3,
        img: auth_slider3,
        title: "Real-time Rate Updates",
        description: "Quickly compare rates from multiple carriers in real-time. Our Platform’s intuitive interface allows you to make informed decisions with just a few clicks, saving you valuable time and effort."
    },
    {
        id: 4,
        img: auth_slider4,
        title: "Integration Capabilities",
        description: "Seamlessly integrate with your transportation management system (TMS) or ERP."
    }
];

const CarouselPage = (props) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    }

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    }

    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    }

    const slides = items.map((item) => {
        return (
            <CarouselItem
                tag="div"
                key={item.id}
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}
            >
                <div className="carousel-item active">
                    <div className="testi-contain">
                        <img src={item.img} alt="Slider" className={`${item.title === 'Integration Capabilities' ? 'mx-auto' : ''}`} />

                        <div className="mt-2 px-3">
                            <h5 className="text-center">{item.title}</h5>
                            <h4 className="text-center">“{item.description}” </h4>
                        </div>
                    </div>
                </div>
            </CarouselItem>
        );
    });

    return (
        <React.Fragment>
            <div className="col-xxl-8 col-lg-8 col-md-7">
                <div className="auth-bg d-flex flex-column">
                    {/* <div className="bg-overlay bg-primary"></div> */}
                    {/* <ul className="bg-bubbles">
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul> */}
                    <div className="auth_slider_list">
                        <div id="reviewcarouselIndicators" className="carousel slide" data-bs-ride="carousel">
                            {/* <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} /> */}
                            <Carousel
                                activeIndex={activeIndex}
                                next={next}
                                previous={previous}
                                fade={true}
                                // interval={null}
                            >
                                {slides}

                            </Carousel>
                            <div className="carousel_arrow_wrap">
                                <CarouselControl
                                    direction="prev"
                                    directionText="Previous"
                                    onClickHandler={previous}
                                />
                                <CarouselControl
                                    direction="next"
                                    directionText="Next"
                                    onClickHandler={next}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default CarouselPage;