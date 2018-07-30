import {
    selector
} from '../../common/common.js';

const moveRight = () => {
    if (selector.slider().scrollWidth < (selector.slider().scrollLeft + (window.innerWidth * 0.85))) {
        selector.slider().scrollBy({
            left: selector.slider().scrollWidth * -1,
            behavior: 'smooth'
        });
    } else {
        selector.slider().scrollBy({
            left: window.innerWidth * 0.85,
            behavior: 'smooth'
        });
    }
};

const moveLeft = () => {
    selector.slider().scrollBy({
        left: window.innerWidth * 0.85 * -1,
        behavior: 'smooth'
    });
};

export const carousel = {
    moveRight: moveRight,
    moveLeft: moveLeft,
};
