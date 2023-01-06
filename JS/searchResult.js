
{
    // accessing html elemnts 

  const resultDiv = document.getElementById("result-heading");
  const searchResultContainer = document.getElementById(
    "search-results-container"
  );
  const myFavourites = document.getElementById("my-Fav-List");
  const favContainer = document.getElementById("my-favourites-container");

  //getting value 
        let value =(localStorage.getItem("searchValue"))
    
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.meals === null) {
          resultDiv.innerHTML = `<h1 style="text-align:center;"> No Results found,try again!</h1>`;
        } else {
          resultDiv.innerHTML = `<h1 style="text-align:center;">Search Results for "${value}"</h1>`;
          searchResultContainer.innerHTML = data.meals
            .map(
              (meal) =>
                `          
                    <div class="Meal-img">
                        <a href="">
                            <img
                            class="card-img" style=""
                            src="${meal.strMealThumb}"
                            alt="${meal.strMeal}"
                            />
                            <h4>${meal.strMeal}</h4>
                        </a>
                        <button id="${meal.idMeal}" data-like class="result-like-btn">Like</button>
                    </div>
                `
            )
            .join("");
          const like = document.querySelectorAll("[data-like]");

          likeElement(like);
        }
      });
    
       // likeelement function and storing it in local storage

  let favMeal = [];

  function likeElement(like) {
    like.forEach((element) => {
      let favBool = false;
      let localFav = JSON.parse(localStorage.getItem("favourite"));
      if (localFav != null) {
        favMeal = localFav;
      }
      element.addEventListener("click", function () {
        const id = element.getAttribute("id");
        if (favBool) {
          favBool = false;
          favMeal.splice(favMeal.indexOf(id, 1));
          element.innerHTML ="Like"
          //setlocalstorage the favMeal array in the local storage
          localStorage.setItem("favourite", JSON.stringify(favMeal));
        } else {
          favBool = true;
          favMeal.push(id);
          element.innerHTML ="Unlike"
          //setlocalstorage the favMeal array in the local storage
          localStorage.setItem("favourite", JSON.stringify(favMeal));
        }
      });
    });
  }
}
