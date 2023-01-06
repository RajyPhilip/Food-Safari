{
  let aboutMeal = 53010 ;
  localStorage.setItem("mealID",`${aboutMeal}`) ;
  // accessing html elements

  const pageContent = document.getElementById("page-content-container");
  const searchButton = document.getElementById("search-btn");
  const inputValue = document.getElementById("search-input");
  const resultDiv = document.getElementById("result-heading");
  const searchResultContainer = document.getElementById(
    "search-results-container"
  );
  const myFavourites = document.getElementById("my-Fav-List");
  const favContainer = document.getElementById("my-favourites-container");

  // event listener
  
  searchButton.addEventListener("click", searchMeal);


  // Search function

  function searchMeal(e) {
    let value = inputValue.value;
    localStorage.setItem("searchValue", `${value}`)
  }
}
