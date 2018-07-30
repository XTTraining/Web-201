import jsdom from 'jsdom';
import fs from 'fs';
//import { renderLoader, clearLoader } from '../../src/js/views/base';
//import * as Data from '../../src/js/views/loadData';
const index = fs.readFileSync('C:/Astha/Web201Assignments/src/index.html', 'utf-8');
const { JSDOM } = jsdom;

const { document } = (new JSDOM(index)).window;




var logo = document.querySelector('.header__logo');
var navigation = document.querySelector('.header__navigation');
var carousel = document.querySelector('.carousel');
var accordian = document.querySelector('.categories__accordian');
var filter =document.querySelector('.filter');
var footer= document.querySelector('.footer');
var checkoutButton = document.querySelector('.checkout');
describe("Dom elements testing", function() {
     
    it("logo element loads", function() {
        expect(logo).not.toBeNull();
      });

    it("logo element loads", function() {
        expect(navigation).not.toBeNull();
      });
    
    it("logo element loads", function() {
        expect(carousel).not.toBeNull();
      });

    it("logo element loads", function() {
        expect(accordian).not.toBeNull();
      }); 
    
    it("logo element loads", function() {
        expect(filter).not.toBeNull();
      });
      
    it("logo element loads", function() {
        expect(footer).not.toBeNull();
      });   

    it("logo element loads", function() {
        expect(checkoutButton).not.toBeNull();
      });

  });



  