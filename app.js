// Storage Controller

// Item Controller
const ItemCtrl = (function() {
  // Item Constructor
  const Item = function(id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  };

  // Data Structure / State
  const data = {
    items: [
      {
        id: 0,
        name: "Steak Dinner",
        calories: 1200
      },
      {
        id: 1,
        name: "Eggs",
        calories: 1200
      },
      {
        id: 2,
        name: "Brocolli",
        calories: 1200
      }
    ],
    currentItem: null,
    totalCalories: 0
  };
})();

// UI Contoller
const UICtrl = (function() {})();

// App Controller
const App = (function(ItemCtrl, UICtrl) {})(ItemCtrl, UICtrl);
