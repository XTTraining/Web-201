import React from 'react';
import { CarouselData } from '../data/carouselData';
import {
    ParentCarouselSection,
    CarouselImage,
    CarouselSection,
    ControlWrapper,
    NavigationButton,
    CarouselIndicatorWrapper,
    CarouselIndicator,
    Indicator
} from './carouselStyle';

class Carousel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            position: 0
        }
    };

    rotateCarousel = (direction) => {
        const { position } = this.state;
        const { totalItems } = this.props;
        if (direction === 'next') {
            this.slider(direction, position === totalItems - 1 ? 0 : position + 1);
        } else {
            this.slider(direction, position === 0 ? totalItems - 1 : position - 1);
        }
    };

    getCarouselItemPosition = (itemIndex) => {
        const { position } = this.state;
        const { totalItems } = this.props;
        if (itemIndex - position < 0) {
            return totalItems - Math.abs(itemIndex - position);
        }
        return itemIndex - position;
    };

    slider = (direction, position) => {
        this.setState({
            sliding: true,
            direction,
            position
        });
        setTimeout(() => {
            this.setState({
                sliding: false
            });
        }, 50);
    };

    autoRotate = (direction) => {
        setInterval(() => {
            this.rotateCarousel(direction);
        }, 3000);
    };

    getCarousel = () => {
        const carouselHtml = [];
        const carouselInfo = CarouselData;
        for (let i = 0; i < this.props.totalItems; i++) {
            carouselHtml.push(
                <CarouselImage order={this.getCarouselItemPosition(i)} key={i}>
                    <p>{carouselInfo[i].description}</p>
                    <img src={carouselInfo[i].image.src} alt={carouselInfo[i].image.alt} />
                </CarouselImage>
            );
        };
        return carouselHtml;
    };

    getCarouselIndicators = () => {
        const indicators = [];
        for (let i = 0; i < this.props.totalItems; i++) {
            indicators.push(
                <Indicator key={i} isCurrent={i === this.state.position}></Indicator>
            );
        };
        return indicators;
    };

    render() {
        return (
            <ParentCarouselSection>
                <CarouselSection sliding>
                    {this.getCarousel()}
                </CarouselSection>
                <ControlWrapper>
                    <NavigationButton previous onClick={() => this.rotateCarousel('previous')}>
                    </NavigationButton>
                    <NavigationButton next onClick={() => this.rotateCarousel('next')}>
                    </NavigationButton>
                </ControlWrapper>
                <CarouselIndicatorWrapper>
                    <CarouselIndicator>
                        {this.getCarouselIndicators()}
                    </CarouselIndicator>
                </CarouselIndicatorWrapper>
            </ParentCarouselSection>
        );
    };
};

Carousel.defaultProps = {
    totalItems: CarouselData.length
}

export default Carousel