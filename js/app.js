
// VARIABLES
const form = document.getElementById('request-quote');

const html = new HTMLUI();


// EVENT LISTENERS
eventListeners();

function eventListeners() {
   document.addEventListener('DOMContentLoaded', function () {
      // create options for the years
      html.displayYears();
   })

   // when form is submitted
   form.addEventListener('submit', function (e) {
      e.preventDefault();

      // read the values from the selects
      const make = document.getElementById('make').value;
      const year = document.getElementById('year').value;
      // read the values from the radio buttons
      const level = document.querySelector('input[name="level"]:checked').value;

      // check that all the fields are not empty
      if (make === '' || year === '' || level === '') {
         // print error message above the form
         const message = 'All the fields are mandatory.';
         html.displayError(message)

      } else {

         // clear the previous quote
         const prevResult = document.querySelector('#result div');
         if (prevResult !== null) {
               prevResult.remove();
         }
         // make the quotation
         const insurance = new Insurance(make, year, level);
         const price = insurance.calculateQuotation(insurance);

         // print result from the HTMLUI();
         html.showResult(price, insurance);
      }
   })
}



// OBJECTS FOR THE QUOTATION AND THE CALCULATIONS
class Insurance {
   constructor(make, year, level) {
      this.make = make;
      this.year = year;
      this.level = level;
   }
   // method for the calculations
   calculateQuotation(insurance) {
      let price;
      // our base for the insurance calculation
      const base = 2000;

      // get the make
      const make = insurance.make;
      /*
         our insurances calculation basis is..
         American 15%
         Asian 05%
         European 35%
      */
      // thus lets make our calculations with the case of the different makes
      switch (make) {
         case '1':
               price = base * 1.15;
               // price = (base * 0.15) + base;
               break;
         case '2':
               price = base * 1.05;
               // price = (base * 0.05) + base;
               break;
               case '3':
                  price = base * 1.35;
                  // price = (base * 0.35) + base;
               break;
      }

      // get the year
      const year = insurance.year;

      // get the difference between years
      const difference = this.getYearDifference(year);

      // calculate 3% cheaper price based on the year difference
      price = price - (((difference * 3) * price) / 100);

      // check the level of protection
      const level = insurance.level;

      price = this.calculateLevel(price, level);
      return price;

   }
   // gets the difference between years
   getYearDifference(year) {
      return new Date().getFullYear() - year;
   }
   // adds the price based on level of protection
   calculateLevel(price, level) {
      /*
            the basic level of protection is going to increase the value by 30%
            the complete level of protection is going to increase the value by 50%
      */
      if (level === 'basic') {
            price = price * 1.30;
      } else {
            price = price * 1.50;
      }
      return price;
   }
}
