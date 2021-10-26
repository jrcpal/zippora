import React from 'react'
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel'
import ProductCard from "./ProductCard"
import "./Carousel.css"


function Carousel({products}) {

    return (
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={125}
        visibleSlides={5}
        totalSlides={10}
        infinite="true"
        isIntrinsicHeight="true"
      >
        <Slider className="slider">
          {products.map((product) => (
          <Slide className="slide"><ProductCard product={product} key={product.productId} /></Slide>
          ))}

        </Slider>
        <ButtonBack>Back</ButtonBack>
        <ButtonNext>Next</ButtonNext>
      </CarouselProvider>
    );
  }

export default Carousel