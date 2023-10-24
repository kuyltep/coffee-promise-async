// "https://api.sampleapis.com/coffee/hot"
/*
<li class="ingridients-item"></li>
*/

//Constants
const coffeeInput = document.querySelector(".coffee-input");
const coffeeList = document.querySelector(".coffee-list");
coffeeList.innerHTML = `Loading coffee list...`;
const layer = document.querySelector(".layer");
const modalImg = document.querySelector(".modal-img");
const modalTitle = document.querySelector(".modal-title");
const modalDescripiton = document.querySelector(".modal-description");
const ingridientsList = document.querySelector(".ingridients-list");
const closeBtn = document.querySelector(".close");
let coffeeItems;

function renderCoffeeItems(arr) {
  coffeeList.innerHTML = "";
  arr.forEach((item) => {
    const coffeeElement = `
    <li class="coffee-item">${item.title}</li>
    `;
    coffeeList.insertAdjacentHTML("beforeend", coffeeElement);
    coffeeItems = document.querySelectorAll(".coffee-item");
  });
}
//Code
function loadCoffeItems() {
  return new Promise((resolve, reject) => {
    const coffeeItems = fetch("https://api.sampleapis.com/coffee/hot");
    setTimeout(function () {
      coffeeItems
        .then((res) => res.json())
        .then((result) => {
          if (result.length === 0) {
            reject("Incorrect adress of API");
          }
          resolve(result);
        });
    }, 2000);
  });
}
loadCoffeItems()
  .then((result) => {
    renderCoffeeItems(result);
    return result;
  })
  .then((result) => {
    window.addEventListener("click", function (event) {
      if (event.target.classList.contains("coffee-item")) {
        const targetObject = result.find(
          (item) => item.title === event.target.innerHTML
        );

        modalImg.src = targetObject.image;
        modalDescripiton.innerHTML = targetObject.description;
        modalTitle.innerHTML = targetObject.title;
        targetObject.ingredients.forEach((ingridient, index) =>
          ingridientsList.insertAdjacentHTML(
            "beforeend",
            `<li class="ingridients-item">${index + 1}. ${ingridient}</li>`
          )
        );
        setTimeout(() => {
          layer.classList.remove("none");
        }, 500);
      }
    });
    return result;
  });
closeBtn.addEventListener("click", function () {
  layer.classList.add("none");
  modalDescripiton.innerHTML = "";
  modalTitle.innerHTML = "";
  ingridientsList.innerHTML = "";
});

coffeeInput.addEventListener("input", function (event) {
  coffeeList.innerHTML = "";
  const inputValue = event.target.value.toLowerCase();
  [...coffeeItems]
    .filter((item) => item.innerHTML.toLowerCase().includes(inputValue))
    .forEach((item) => coffeeList.appendChild(item));
});
