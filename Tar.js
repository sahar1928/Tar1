class Ingredient {
  constructor(name, id, image, calories) {
    this.name = name;
    this.id = id;
    this.image = image;
    this.calories = calories;
  }

  render = () => {
    return (
      "<div class='card' style='background-image: url(" +
      this.image +
      ");'>" +
      "<h1>Ingredient details: </h1>" +
      "<div class='info'>" +
      "<p class='description'>" +
      "<h1 class='title'>" +
      this.name +
      "</h1>" +
      "<p>Calories: " +
      this.calories +
      "</p>" +
      "</p>"
    );
  };
}

class DishRecipe extends Ingredient {
  constructor(name, time, cookingMethod, image) {
    super(name, id, image, calories);
    this.name = name;
    this.ingredients = [];
    this.time = time;
    this.cookingMethod = cookingMethod;
    this.image = image;
  }
  render = () => {
    return (
      "<div class='card' style='background-image: url(" +
      this.image +
      ");'>" +
      //"<div class='cardContainer'>" +
      "<div class='info'>" +
      "<p class='description'>" +
      "<h1 class='title'>" +
      this.name +
      "</h1>" +
      "<br>" +
      "Coocking method: " +
      this.cookingMethod +
      "<br>" +
      "Total cooking time: " +
      this.time +
      "minutes " +
      "</p>" +
      "Total calories: " +
      this.getTotalCalories()
    );
  };

  getTotalCalories() {
    let totalCalories = 0;
    this.ingredients.forEach((ingredient) => {
      totalCalories += parseInt(ingredient.calories);
    });
    return totalCalories;
  }
}

var ingredientJson = [
  {
    name: "Meat",
    id: 1,
    image: "http://cdn.firstwefeast.com/assets/2014/08/texture.jpg",
    calories: "165",
  },
  {
    name: "Broccoli",
    id: 2,
    image:
      "https://domf5oio6qrcr.cloudfront.net/medialibrary/5390/h1218g16207258089583.jpg",
    calories: 34,
  },
];

var dishJson = [
  {
    name: "Hamburger",
    ingredients: [
      {
        name: "Meat",
        id: "1",
        image: "http://cdn.firstwefeast.com/assets/2014/08/texture.jpg",
        calories: "165",
      },
      {
        name: "Broccoli",
        id: "2",
        image:
          "https://www.shefab.co.il/files/products/product90_image1_2020-08-30_18-13-31.jpg",
        calories: "34",
      },
    ],
    time: "35",
    cookingMethod: "Grilling",
    image:
      "https://www.aspicyperspective.com/wp-content/uploads/2020/07/best-hamburger-patties-1.jpg",
  },
];

function init() {
  if (!window.localStorage.length) {
    console.log("localStorage is NULL");
    localStorage.setItem("dishJson", [JSON.stringify(dishJson)]);
    localStorage.setItem("ingredientJson", [JSON.stringify(ingredientJson)]);
  }
  dishJson = JSON.parse(localStorage.getItem("dishJson"));
  var dishCon = document.getElementById("dishes");
  let str = "";
  for (var i in dishJson) {
    dish = new DishRecipe();
    dish.ingredients = dishJson[i].ingredients;
    dish.image = dishJson[i].image;
    dish.name = dishJson[i].name;
    dish.time = dishJson[i].time;
    dish.cookingMethod = dishJson[i].cookingMethod;
    str += dish.render();
    str +=
      "<br>" +
      "<button id='" +
      dish.name +
      "' value='" +
      dish.name +
      "' onclick='getIngredients(event)'><span id='" +
      dish.name +
      "'> Show ingredients </span><i></i></button>";
    str += "</div>";
    str += "</div>";
  }
  dishCon.innerHTML = str;
  show();
}

function submitIngredient() {
  var ing = new Ingredient();
  if (checkChar(document.getElementById("name").value)) {
    if (checkNum(document.getElementById("calories").value)) {
      ing.name = document.getElementById("name").value;
      ing.id = JSON.parse(localStorage.getItem("ingredientJson")).length + 1;
      ing.image = document.getElementById("image").value;
      ing.calories = document.getElementById("calories").value;
    } else return;
  } else return;

  ingredientJson.push(ing);
  localStorage.setItem("ingredientJson", JSON.stringify(ingredientJson));
  show();
  window.location.reload();
}

function submitDish() {
  if (!localStorage.dishJson) {
    localStorage.setItem("dishJson", JSON.stringify(dishJson));
  }
  ingredientJson = JSON.parse(localStorage.getItem("ingredientJson") || "[]");
  var dish = new DishRecipe();
  if (checkChar(document.getElementById("dname").value)) {
    if (checkChar(document.getElementById("cookingMethod").value)) {
      if (checkNum(document.getElementById("cookingTime").value)) {
        dish.name = document.getElementById("dname").value;
        dish.cookingMethod = document.getElementById("cookingMethod").value;
        dish.time = document.getElementById("cookingTime").value;
        dish.image = document.getElementById("dimage").value;
      } else return;
    } else return;
  } else return;

  for (var i in ingredientJson) {
    elIngredient = document.getElementById(i).value;
    elChecked = $("#" + i).is(":checked");
    if (
      elChecked &&
      ingredientJson.some((item) => JSON.stringify(item.name) == elIngredient)
    ) {
      ingredientObj = new Ingredient(
        ingredientJson[i].name,
        ingredientJson[i].id,
        ingredientJson[i].image,
        ingredientJson[i].calories
      );
      dish.ingredients.push(ingredientObj);
    }
  }
  dishJson.push(dish);
  localStorage.setItem("dishJson", JSON.stringify(dishJson));
  window.location.reload();
}

function show() {
  ingredientJson = JSON.parse(localStorage.getItem("ingredientJson") || "[]");
  var newRecipe = document.getElementById("ingredients");
  let str = "";
  let counter = 0;
  for (var i in ingredientJson) {
    ingredientObj = new Ingredient(
      ingredientJson[i].name,
      ingredientJson[i].id,
      ingredientJson[i].image,
      ingredientJson[i].calories
    );
    str += ingredientObj.render();
    str +=
      " <label class='toggler-wrapper style-20'>" +
      "  <input type='checkbox' id='" +
      JSON.stringify(counter++) +
      "' value='" +
      JSON.stringify(ingredientObj.name) +
      "'>" +
      "<div class='toggler-slider'>" +
      "<div class='toggler-knob'></div>" +
      " </div>" +
      "</label>";
    str += "</div>";
    str += "</div>";
  }
  newRecipe.innerHTML = str;
}

function getIngredients(e) {
  elIng = document.getElementById("showIngredients");
  elDetails = document.getElementById("details");
  dishName = e.target.id;
  dishJson = JSON.parse(localStorage.getItem("dishJson") || "[]");
  let str = "";
  for (var i in dishJson) {
    if (dishJson[i].name == dishName) {
      for (var j in dishJson[i].ingredients) {
        ingredientObj = new Ingredient(
          dishJson[i].ingredients[j].name,
          dishJson[i].ingredients[j].id,
          dishJson[i].ingredients[j].image,
          dishJson[i].ingredients[j].calories
        );
        str += ingredientObj.render();
        str += "</div>";
        str += "</div>";
      }
    }
  }
  elDetails.innerHTML = str;
  elIng.style.display = "block";
}

function checkChar(value) {
  if (!/[^a-z]/i.test(value)) {
    return true;
  } else {
    swal({
      icon: "error",
      title: "ERROR",
      text: "Enter a name/cooking method with alphabets only ",
      button: "close",
    });
    return false;
  }
}

function checkNum(value) {
  if (/^\d+$/.test(value)) {
    return true;
  } else {
    swal({
      icon: "error",
      title: "ERROR",
      text: "Enter calories/cooking time with digits only  ",
      button: "close",
    });
    return false;
  }
}
