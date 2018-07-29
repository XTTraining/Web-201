import React from 'react';
import '../theme/globalStyle';
import Header from '../component/header';
import Carousel from '../component/carousel';
import RestaurantGallery from '../component/restaurantGallery';
import Footer from '../component/footer';

class Home extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <Header />
                <Carousel />
                <RestaurantGallery />
                <Footer />
                </div>
        )
    }
};

export default Home;