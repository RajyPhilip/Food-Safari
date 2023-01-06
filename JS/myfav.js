 {// accessing html elements

  const myFavourites = document.getElementById("my-Fav-List");
  const favContainer = document.getElementById("my-favourites-container");
  console.log(favContainer);

  let myfav = JSON.parse(localStorage.getItem("favourite"));

    if (myfav == null || myfav.length == 0) {
      favContainer.innerHTML =
        "<h2 style='width: 100%; text-align: center ; color:white;'> ADD your favourite meal  by searching and Liking it</h2>";
    }else{
            myfav.forEach((id) => {
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((res) => res.json())
        .then((data) => {
          addToDom(data);
        });
    });
    }



  function addToDom(data) {
    let meal = data.meals[0];
    // creating the elemtnts
    let div = document.createElement("div");
    let a = document.createElement("a");
    let img = document.createElement("img");
    let h4 = document.createElement("h4");
    let button = document.createElement("a");
    let deletebtn = document.createElement("button");
    //setting their class name id and src
    div.setAttribute("class", "Meal-img gap");
    img.setAttribute("class", "card-img");
    img.setAttribute("src", `${meal.strMealThumb}`);
    img.setAttribute("alt", `${meal.strMeal}`);
    button.setAttribute("id", `${meal.idMeal}`);
    button.setAttribute("href", `./mealDetails.html`);
    button.innerText = "More Details";
    button.setAttribute("class", `result-like-btn`);
    deletebtn.setAttribute("class", `result-unlike-btn`);
    deletebtn.setAttribute("id", `${meal.idMeal}`);

    deletebtn.innerHTML = "Unlike";
    h4.innerHTML = `${meal.strMeal}`;
    // adding them to their respected parents
    div.appendChild(a);
    a.appendChild(img);
    a.appendChild(h4);
    div.appendChild(button);
    div.appendChild(deletebtn);
    //adding more detailsevent
    button.addEventListener("click", function (e) {
      let mealid = button.getAttribute("id");
      localStorage.setItem("mealID", JSON.stringify(mealid));
    });
    //adding unlike event
    deletebtn.addEventListener("click", function (e) {
      let myfav = JSON.parse(localStorage.getItem("favourite"));
      const id = deletebtn.getAttribute("id");
      //find in local if id found then pull fr
      let index = myfav.indexOf(id);
      if (index !== -1) {
        myfav.splice(index, 1);
      }
      localStorage.setItem("favourite", JSON.stringify(myfav));
      //   location.reload();
      //   myFavourites.scrollIntoView();
      deletebtn.innerHTML = "Unliked";
      location.reload()
    });
    //adding it to the favlist container
    favContainer.appendChild(div);
  }

  };

