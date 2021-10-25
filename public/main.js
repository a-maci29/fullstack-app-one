//event listeners, api fetch, etc

//event listener for 'click' onto the month to grab the requested values month

const monthButtons = document.getElementsByClassName("monthButton"); //querySelectorAll does need the '.' before a class name, .getElementsbyClassame does


/* function getMonthlyProduce(){
    //fetching value from the server side req.res
    fetch('/array', { //fetching back from server NOTE: CHANGE NAME
  method: 'POST', // a "get" http method because the corresponding event handler in the server.js file is a "get" -> requesting data
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({month : "january"}), //the month is the property : "january" is the value
})
.then(response => response.json())
.then(data => {
  console.log('Success:', data); 
}) 
    //render into browser
} */

Array.from(monthButtons).forEach(function(button) { //sending the month to the server, (the forEach looping through each button). NOTE: the for.Each requires a function, in this case an anon function will work
  button.addEventListener('click', function(){ //anon function 
    console.log('clickedonmonth', button.id)
    fetch('/array', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({month : button.id}) //sending the month to the server
    })
    .then(response => {
      if (response.ok) return response.json()
    })
    .then(data => {
      console.log(data.products.join(", "))
      document.getElementById(button.id + "_produce").innerText=data.products.join(", ")
    })
  });
});
//fetch values from array in db

//render out back to the DOM

/*

each product in the array will have a number value, so each month variable will have its own array with the corresponding value/produce

another click onto the produce will let it be added to a shopping list


*/


















/* From https://www.thespruceeats.com/the-cheapest-fruits-and-vegetables-month-by-month-1388345

January: broccoli, brussel sprouts, cabbage, cauliflower, grapefruit, kale, leeks, lemons, oranges, parsnips, rutabagas, tangerines, turnips

February: broccoli, brussel sprouts, cabbaga, cauliflower, grapefuit, kale, leek, lemon, oranges, parsnips, rutabagas, turnips

March: artichoke, broccoli, brussel sprouts, cauliflowers, leeks, lettuce, mushrooms, parsnips, pineapples, radishes, rutabagas, turnips

April: artichoke, asparagus, broccoli, cauliflower, leeks, lettuce, mushrooms, pineapples, radishes, rhubarb, spring peas

May: apricots, artcihokes, asparagus, cherries, lettuce, mango, okra, pineapple, radish, rhubarb, spring peas, strawberries, zucchini

June: apricots, blueberries, cantaloupe, cherries, corn, kiwi, lettuce, mango, peaches, strawberries, watermelon, zucchini

July: apricot, blackberry, blueberry, cantaloupe, corn, cucumber, green bean, kiwi, lettuce, mango, okra, peach, peppers, plums, raspberry, strawberry, summer squash, tomato, watermelon, zucchini

August: acorn squash, apples, apricot, blueberry, butternut squash, cantaloupe, corn, cucumber, eggplan, fig, green bean, kiwi, lettuce, mango, okra, peach, pepper, plums, raspberry, strawberry, summer squash, tomato, winter squash, zucchini

September: acorn squash, apple, beets, butternut squash, cantaloupe, cauliflower, eggplant, fig, grapes, green beans, lettuce, mango, mushrooms, okra, pepper, persimmon, pomegranate, pumpkin, spinach, sweet potato, tomato

October: acorn squash, apple, beet, broccoli, brussel sprout, butternut squash, cabbaga, cauliflower, cranberry, grapes, leek, lettuce, mushrooms, parsnips, persimmons, pomegranates, pumpkin, rutabaga, spinach, sweet potato, turnip, winter squash

November: beet, broccoli, brussel sprout, cabbage, cauliflower, cranberry, leek, mushroom, orange, parsnip, pear, perimmon, pomegranate, pumpkin, rutabaga, spinach, sweet potato, tangerine, turnip, winter squash

December: broccoli, brussel sprout, cabbaga, cauliflower, grapefruit, kale, leek, mushroom, oranges, papaya, parsnip, pears, pomegranate, rutabaga, sweet potato, tangerine, turnip */