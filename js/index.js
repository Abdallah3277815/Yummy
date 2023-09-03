$(document).ready(() => {
  searchByName("").then(() => {
    $(".loaderContainer").fadeOut(500);
    $("body").css("overflow", "visible");
  });
});
// =====Side nav Start=====//
const tabWidth = $(".nav-tab").outerWidth();
closeSideNav();
function openSideNav() {
  $(".side-nav-menu").animate({ left: 0 }, 500);
  $(".side-nav-menu i.open-close-icon").removeClass("fa-align-justify");
  $(".side-nav-menu i.open-close-icon").addClass("fa-x");
  for (let i = 0; i < 5; i++) {
    $(".links ul li")
      .eq(i)
      .animate({ top: 0 }, (i + 5) * 100);
  }
}
function closeSideNav() {
  $(".side-nav-menu").animate({ left: -tabWidth }, 500);
  $(".side-nav-menu i.open-close-icon").addClass("fa-align-justify");
  $(".side-nav-menu i.open-close-icon").removeClass("fa-x");
  $(".links ul li").animate({ top: 300 }, 500);
}
$(".side-nav-menu").css("left", -tabWidth);
$(".side-nav-menu i.open-close-icon").click(() => {
  if ($(".side-nav-menu").css("left") == "0px") {
    closeSideNav();
  } else {
    openSideNav();
  }
});
// =====Side nav End=====//
const mealsContainer = document.getElementById("mealsContainer");
async function searchByName(mealName) {
  $(".loaderContainer").fadeIn(500);
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`
  );
  let data = await response.json();
  displayData(data.meals);
  $(".loaderContainer").fadeOut(500);
}

function displayData(arr) {
  let rowData = ``;
  for (let i = 0; i < arr.length; i++) {
    rowData += `
    <div class="col-md-3">
                <div onclick="getMealId(${arr[i].idMeal})" class="meal rounded-2 overflow-hidden position-relative">
                    <img class="w-100" src="${arr[i].strMealThumb}" alt="meal">
                    <div class="meal-layer position-absolute">
                        <h3>${arr[i].strMeal}</h3>
                    </div>
                </div>
            </div>
    `;
  }

  mealsContainer.innerHTML = rowData;
}
// searchByName("");
//==========

async function getCategories() {
  $(".loaderContainer").fadeIn(500);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  let data = await response.json();
  console.log(data);
  displayCategories(data.categories);
  $(".loaderContainer").fadeOut(500);
}
function displayCategories(arr) {
  let rowData = ``;
  for (let i = 0; i < arr.length; i++) {
    rowData += `
    <div class="col-md-4">
                <div onclick="getCategoryMeals('${arr[i].strCategory}')" class="meal rounded-2 overflow-hidden position-relative">
                    <img class="w-100" src="${arr[i].strCategoryThumb}" alt="meal">
                    <div class="meal-layer position-absolute text-center">
                        <h3>${arr[i].strCategory}</h3>
                        <p class="p-2">${arr[i].strCategoryDescription}</p>
                    </div>
                </div>
            </div>
    `;
  }
  mealsContainer.innerHTML = rowData;
}
//==========

async function getArea() {
  $(".loaderContainer").fadeIn(500);

  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
  );
  let data = await response.json();
  console.log(data);
  displayAreas(data.meals);
  $(".loaderContainer").fadeOut(500);
}
function displayAreas(arr) {
  let rowData = ``;
  for (let i = 0; i < arr.length; i++) {
    rowData += `
    <div class="col-md-4">
                <div onclick="displayAreaMeal('${arr[i].strArea}')" class="meal rounded-2 overflow-hidden position-relative text-center">
                        <i class="fa-solid fa-house-laptop fa-3x"></i>
                        <h3>${arr[i].strArea}</h3>
                    
                </div>
            </div>
    `;

    mealsContainer.innerHTML = rowData;
  }
}
//========

async function getIngredients() {
  $(".loaderContainer").fadeIn(500);
  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
  );
  let data = await response.json();
  console.log(data);
  displayIngredients(data.meals.slice(0, 20));
  $(".loaderContainer").fadeOut(500);
}
function displayIngredients(arr) {
  let rowData = ``;
  for (let i = 0; i < arr.length; i++) {
    rowData += `
    <div class="col-md-4">
                <div onclick="displayGridThing('${
                  arr[i].strIngredient
                }')" class="meal rounded-2 overflow-hidden position-relative text-center pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x "></i>
                        <h3>${arr[i].strIngredient}</h3>
                        <p>${arr[i].strDescription
                          .split(" ")
                          .slice(0, 20)
                          .join(" ")}</p>
                    
                </div>
            </div>
    `;
  }
  mealsContainer.innerHTML = rowData;
}

async function getCategoryMeals(category) {
  $(".loaderContainer").fadeIn(500);
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
  let data = await response.json();
  console.log(data);
  displayData(data.meals);
  $(".loaderContainer").fadeOut(500);
}

async function displayAreaMeal(area) {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
  let data = await response.json();
  console.log(data);
  displayData(data.meals);
}
async function displayGridThing(test) {
  $(".loaderContainer").fadeIn(500);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${test}`
  );
  let data = await response.json();
  console.log(test);
  // console.log(test);
  displayData(data.meals);
  $(".loaderContainer").fadeOut(500);
}
async function getMealId(id) {
  $(".loaderContainer").fadeIn(500);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  let data = await response.json();
  console.log(data);
  displayMealDetails(data.meals[0]);
  $(".loaderContainer").fadeOut(500);
}
function displayMealDetails(meal) {
  let ingredients = ``;
  for (let i = 0; i < 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients += `<li class="alert alert-info p-1 mx-2">${
        meal[`strMeasure${i}`]
      } ${meal[`strIngredient${i}`]}</li>  `;
    }
  }
  // console.log(meal[`strIngredients${0}`]);
  // console.log(meal[`strIngredient${2}`]);
  console.log(ingredients);
  let tags;
  let tagsCartoona = ``;
  if (meal.strTags) {
    tags = meal.strTags.split(",");
    for (let i = 0; i < tags.length; i++) {
      tagsCartoona += `<span class="alert alert-danger p-1 mx-2">${tags[i]}</span>`;
    }

    console.log(tags);
  } else {
    tagsCartoona = "No Tags";
  }

  console.log("tags", tags);

  let cartoona = `
<div class="col-md-4">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                    alt="">
                    <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : ${meal.strArea} </span>    </h3>
                <h3><span class="fw-bolder">Category : ${meal.strCategory} </span>Desert</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsCartoona}
                </ul>

                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>
`;
  mealsContainer.innerHTML = cartoona;
}

function displaySearch() {
  
  closeSideNav();
  const searchDesign = `
  <div class="container w-75">
        <div class="row py-4 search">
            <div class="col-md-6">
                <input onkeyup="searchByName(this.value)" type="text" name="" class="form-control" id="" placeholder="Search By Name">
            </div>
            <div class="col-md-6">
                <input onkeyup="searchByLetter(this.value)" type="text" name="" class="form-control" id=""  placeholder="Search By First Letter">
            </div>
        </div>
    </div>
  `;
  searchCont.innerHTML = searchDesign;
}
async function searchByName(value) {
  $(".loaderContainer").fadeIn(500);

  
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`
  );
  let data = await response.json();
  console.log(data);
  data.meals ? displayData(data.meals) : displayData([]);
  $(".loaderContainer").fadeOut(500);

}
async function searchByLetter(value) {
  $(".loaderContainer").fadeIn(500);

  if (value.split("").length == 1) {
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?f=${value}`
    );
    let data = await response.json();
    console.log(data);

    displayData(data.meals);
    $(".loaderContainer").fadeOut(500);

  } else {
  }
}
function showContacts() {
  let cartoona = `
  <form action="">
        <div class="container px-5 p-3 contact  vh-100 d-flex justify-content-center align-items-center flex-column ">
            <div class="row w-75 g-4">
                <div class="col-md-6">
                    <input id="name" onkeyup="inputValidation()" class="form-control" type="text" placeholder="Enter Your Name">
                    <div id="nameAlert" class="alert alert-danger d-block">Special characters and number not allowed</div>
                </div>
                <div class="col-md-6">
                    <input id="email" onkeyup="inputValidation()" class="form-control" type="text" placeholder="Enter Your Email">
                    <div id="emailAlert" class="alert alert-danger d-block">invalid Email</div>
                </div>
                <div class="col-md-6">
                    <input id="phone" onkeyup="inputValidation()" class="form-control" type="number" placeholder="Enter Your Phone">
                    <div id="phoneAlert" class="alert alert-danger d-block">invalid phone number</div>
                </div>
                <div class="col-md-6">
                    <input id="age" onkeyup="inputValidation()" class="form-control" type="number" placeholder="Enter Your Age">
                    <div id="ageAlert" class="alert alert-danger d-block">age must be from 10</div>
                </div>
                <div class="col-md-6">
                    <input  id="password" onkeyup="inputValidation()" class="form-control" type="password" placeholder="Enter Your Password">
                    <div id="passwordAlert" class="alert alert-danger d-block">At least one digit (0-9).
                    At least one special character from the set [!@#$%^&*].
                    At least one lowercase letter (a-z).
                    At least one uppercase letter (A-Z).
                    The password must be at least 8 characters long. </div>
                </div>
                <div class="col-md-6">
                    <input id="rePassword" onkeyup="inputValidation()" class="form-control" type="password" placeholder="Enter Your Repassword">
                    <div id="rePasswordAlert" class="alert alert-danger d-block">password not matched </div>
                </div>
                
            </div>
            <button disabled class="btn btn-danger my-4" type="submit" id="submit">Submit</button>

        </div>
    </form>
  `;
  mealsContainer.innerHTML = cartoona;
}
function inputValidation() {
  if(nameValidation()){
    nameAlert.classList.replace("d-block","d-none")
  }else{
    nameAlert.classList.replace("d-none","d-block")
  }
  if(emailValidation()){
    emailAlert.classList.replace("d-block","d-none")
  }else{
    emailAlert.classList.replace("d-none","d-block")
  }
  if( phoneValidation()){
    phoneAlert.classList.replace("d-block","d-none")
  }else{
    phoneAlert.classList.replace("d-none","d-block")
  }
  if( ageValidation()){
    document.getElementById("ageAlert").classList.replace("d-block","d-none")
  }else{
    document.getElementById("ageAlert").classList.replace("d-none","d-block")
  }
  if( passwordValidation()){
    document.getElementById("passwordAlert").classList.replace("d-block","d-none")
  }else{
    document.getElementById("passwordAlert").classList.replace("d-none","d-block")
  }
  if( rePasswordValidation()){
    document.getElementById("rePasswordAlert").classList.replace("d-block","d-none")
  }else{
    document.getElementById("rePasswordAlert").classList.replace("d-none","d-block")
  }
  
 if( nameValidation()&&
  emailValidation()&&
  phoneValidation()&&
  ageValidation()&&
  passwordValidation()&&
  rePasswordValidation()
 ){
  submit.removeAttribute("disabled")
}
}



function nameValidation() {
  return /^[a-zA-Z]+$/.test(document.getElementById("name").value);
}
function emailValidation() {
  return /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
    document.getElementById("email").value
  );
}
function phoneValidation() {
  return /^[+]?(\d{1,2})?[\s.-]?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(
    document.getElementById("phone").value
  );
}
function ageValidation() {
  return /^(?:10[0-9]|100|[1-9][0-9])$/.test(document.getElementById("age").value);
}

function passwordValidation() {
  return /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(
    document.getElementById("password").value
  );
}
function rePasswordValidation() {
  return (
    document.getElementById("rePassword").value ==
    document.getElementById("password").value
  );
}
