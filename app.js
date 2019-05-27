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
    items: [],
    currentItem: null,
    totalCalories: 0
  };

  // Public Methods
  return {
    getItems: function() {
      return data.items;
    },
    addItem: function(name, calories) {
      //   console.log(name, calories);
      let ID;
      if (data.items.length > 0) {
        ID = data.items[data.items.length - 1].id + 1;
      } else {
        ID = 0;
      }

      // Calories to number
      calories = parseInt(calories);
      newItem = new Item(ID, name, calories);
      data.items.push(newItem);
      return newItem;
    },
    logData: function() {
      return data;
    },
    getTotalCalories: function() {
      let total = 0;
      data.items.forEach(function(item) {
        total += item.calories;
      });
      data.totalCalories = total;
      return data.totalCalories;
    }
  };
})();

// UI Contoller
const UICtrl = (function() {
  const UISelectors = {
    itemList: "#item-list",
    addBtn: ".add-btn",
    itemNameInput: "#item-name",
    itemCaloriesInput: "#item-calories",
    totalCalories: ".total-calories"
  };
  return {
    populateItemList: function(items) {
      let html = "";
      items.forEach(function(item) {
        html += `
        <li class="collection-item" id="item-${item.id}">
        <strong>${item.name}: </strong><em>${item.calories} Calories</em>
        <a href="#" class="secondary-content">
          <i class="edit-item fa fa-pencil"></i>
        </a>
      </li>`;
      });
      // Insert list Items
      document.querySelector(UISelectors.itemList).innerHTML = html;
      return {};
    },
    getSelectors: function() {
      return UISelectors;
    },
    addListItem: function(item) {
      // Show the list
      document.querySelector(UISelectors.itemList).style.display = "block";
      // Create li element
      const li = document.createElement("li");
      li.className = "collection-item";
      li.id = `item-${item.id}`;
      li.innerHTML = `
      <strong>${item.name}: </strong><em>${item.calories} Calories</em>
      <a href="#" class="secondary-content">
        <i class="edit-item fa fa-pencil"></i>
      </a>`;
      document
        .querySelector(UISelectors.itemList)
        .insertAdjacentElement("beforeend", li);
    },
    getItemInput: function() {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value
      };
    },
    showTotalCalories: function(totCal) {
      const totalCalories = document.querySelector(UISelectors.totalCalories);
      totalCalories.textContent = totCal;
    },
    hideList: function() {
      document.querySelector(UISelectors.itemList).style.display = "none";
    }
  };
})();

// App Controller
const App = (function(ItemCtrl, UICtrl) {
  // Load Event Listeners
  const loadEventListeners = function() {
    const UISelectors = UICtrl.getSelectors();

    // Add Item Event
    document
      .querySelector(UISelectors.addBtn)
      .addEventListener("click", itemAddSubmit);
  };

  const itemAddSubmit = function(e) {
    // Get form input from UI Controller
    const input = UICtrl.getItemInput();
    if (input.name != "" && input.calories != "") {
      const newItem = ItemCtrl.addItem(input.name, input.calories);
      UICtrl.addListItem(newItem);
      // Get Total Calories
      const totalCalories = ItemCtrl.getTotalCalories();
      UICtrl.showTotalCalories(totalCalories);

      document.querySelector("#item-name").value = "";
      document.querySelector("#item-calories").value = "";
    }
    e.preventDefault();
  };
  // Public Methods
  return {
    init: function() {
      // Fetch Items from Data Structure
      const items = ItemCtrl.getItems();
      if (items.length == 0) {
        UICtrl.hideList();
      } else {
        UICtrl.populateItemList(items);
      }
      const totalCalories = ItemCtrl.getTotalCalories();
      UICtrl.showTotalCalories(totalCalories);

      // Load Event Listeners
      loadEventListeners();
    }
  };
})(ItemCtrl, UICtrl);

// Initializing the Web App
App.init();
