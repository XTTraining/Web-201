require('jsdom');
require('fs');
constindex = fs.readFileSync('../index.html', 'utf-8');
const { JSDOM } = jsdom;

const { document } = (newJSDOM(index)).window; 




// testing functions
describe("Included matchers:", function() {

    it("The 'toBe' matcher compares with ===", function() {
      var a = 12;
      var b = a;
  
      expect(a).toBe(b);
      expect(a).not.toBe(null);
    });
});

describe('JavaScript addition operator', function () {
    it('adds two numbers together', function () {
        expect(1 + 2).toEqual(3);
    });
});

it("is defined", function () {
    var name = "Danish";
    expect(name).toBeDefined();
})

/*
describe("testing for percentCalculation()",function (){ 
   
    it("The Example of toEqual() method",function (){   
       //this will check whether the value of the variable  
       // currentVal is equal to 0 or not.  
       expect(myObject.percentCalculation(100,5)).toEqual(105);  
    }); 

   
 
 }); */


