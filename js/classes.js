// OBJECTS FOR THE HTML: the class HTMLUI cannot be called before the initiolization..
class HTMLUI {
   constructor() { }
   // displays the latest 20 years in the select

   displayYears() {
      // max and min years
      const max = new Date().getFullYear();
      const min = max - 20;

      // generate the list with the latest years
      const selectYears = document.getElementById('year');
      // print the values of the option of years into the select
      for (let i = max; i > min; i--) {
         // create the option element
         const option = document.createElement('option');
         option.value = i;
         option.textContent = i;
         // append the option into the select years
         selectYears.appendChild(option);
      }
   }

   // prints an error message in the Form
   displayError(message) {
      // create a div
      const errorMessage = document.createElement('div');
      errorMessage.innerHTML = `
      <p>${message}</p>
   `;
      errorMessage.classList.add('error');

      // add error message into the form
      form.insertBefore(errorMessage, document.querySelector('.form-group'));

      // remove errorMessage after 3 secs
      setTimeout(() => {
         errorMessage.remove();
      }, 3000);
   }

   // prints the results into the dom
   showResult(price, insurance) {
      // get the result div from the dom
      const result = document.getElementById('result');

      // create div and pass in the price;
      const div = document.createElement('div');
      div.classList.add('mt-4');

      // get make from the object and assign a readable name
      let make = insurance.make;
      switch (make) {
         case '1':
            make = 'American';
            break;
         case '2':
            make = 'Asian';
            break;
         case '3':
            make = 'European';
            break;
      }

      div.innerHTML = `
         <p class="header">Summary</p>
         <p>Make: ${make}</p>
         <p>Year: ${insurance.year}</p>
         <p>Level: ${insurance.level}</p>
         <p class="total">Total: $${price}</p>

      `;
      
      // load spinner
      const spinner = document.querySelector('#loading img');
      spinner.style.display = 'block';

      // remove spinner after 3s
      setTimeout(() => {
         spinner.style.display = 'none';
         // append div into the result
         result.appendChild(div);

      }, 2000);
   }
}
