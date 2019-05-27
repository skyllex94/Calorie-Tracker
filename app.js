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
    },
    getCurrentItem: function() {
      return data.currentItem;
      // const name = data.currentItem.name;
      // const calories = data.currentItem.calories;
      // return {
      //   name: name,
      //   calories: calories
      // };
    },
    getItemById: function(id) {
      let found = null;
      data.items.forEach(function(item) {
        if (item.id === id) {
          found = item;
        }
      });
      return found;
    },
    updateItem: function(name, calories) {
      calories = parseInt(calories);
      let found = null;
      data.items.forEach(function(item) {
        if (item.id === data.currentItem.id) {
          item.name = name;
          item.calories = calories;
          found = item;
        }
      });
      return found;
    },
    setCurrentItem: function(curItem) {
      data.currentItem = curItem;
    },
    deleteItem: function(id) {
      const ids = data.items.map(function(item) {
        return item.id;
      });

      // Get Index
      const index = ids.indexOf(id);
      data.items.splice(index, 1);
    },
    clearAllItems: function() {
      data.items = [];
    }
  };
})();

// UI Contoller
const UICtrl = (function() {
  const UISelectors = {
    itemList: "#item-list",
    addBtn: ".add-btn",
    updateBtn: ".update-btn",
    deleteBtn: ".delete-btn",
    backBtn: ".back-btn",
    itemNameInput: "#item-name",
    itemCaloriesInput: "#item-calories",
    totalCalories: ".total-calories",
    listItems: "#item-list li",
    clearBtn: ".clear-btn"
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
    addItemToForm: function() {
      document.querySelector(
        UISelectors.itemNameInput
      ).value = ItemCtrl.getCurrentItem().name;
      document.querySelector(
        UISelectors.itemCaloriesInput
      ).value = ItemCtrl.getCurrentItem().calories;
      UICtrl.showEditState();
    },
    showTotalCalories: function(totCal) {
      const totalCalories = document.querySelector(UISelectors.totalCalories);
      totalCalories.textContent = totCal;
    },
    clearEditState: function() {
      document.querySelector(UISelectors.itemNameInput).value = "";
      document.querySelector(UISelectors.itemCaloriesInput).value = "";
      document.querySelector(UISelectors.updateBtn).style.display = "none";
      document.querySelector(UISelectors.deleteBtn).style.display = "none";
      document.querySelector(UISelectors.backBtn).style.display = "none";
      document.querySelector(UISelectors.addBtn).style.display = "inline";
    },
    showEditState: function() {
      document.querySelector(UISelectors.updateBtn).style.display = "inline";
      document.querySelector(UISelectors.deleteBtn).style.display = "inline";
      document.querySelector(UISelectors.backBtn).style.display = "inline";
      document.querySelector(UISelectors.addBtn).style.display = "none";
    },
    updateListItem: function(updatedItem) {
      let listItems = document.querySelectorAll(UISelectors.listItems);
      // Turn Node list into an Array
      listItems = Array.from(listItems);
      listItems.forEach(function(listItem) {
        const itemID = listItem.getAttribute("id");
        if (itemID === `item-${updatedItem.id}`) {
          document.querySelector(`#${itemID}`).innerHTML = `
          <strong>${updatedItem.name}: </strong><em>${
            updatedItem.calories
          } Calories</em>
          <a href="#" class="secondary-content">
            <i class="edit-item fa fa-pencil"></i>
          </a>`;
        }
      });
    },
    deleteListItem: function(id) {
      const itemID = `#item-${id}`;
      const item = document.querySelector(itemID);
      item.remove();
    },
    removeAllItems: function() {
      let items = document.querySelectorAll(UISelectors.listItems);
      items = Array.from(items);
      items.forEach(function(item) {
        item.remove();
      });
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

    // Disable Submit on Enter
    document.addEventListener("keypress", function(e) {
      if (e.keyCode === 13 || e.which === 13) {
        e.preventDefault();
        return false;
      }
    });

    // Edit Icon Click Event
    document
      .querySelector(UISelectors.itemList)
      .addEventListener("click", itemEditClick);

    // Update Item Event
    document
      .querySelector(UISelectors.updateBtn)
      .addEventListener("click", itemUpdateSubmit);

    // Delete Item Event
    document
      .querySelector(UISelectors.deleteBtn)
      .addEventListener("click", itemDeleteSubmit);

    // Clear All Items Event
    document
      .querySelector(UISelectors.clearBtn)
      .addEventListener("click", clearAllItemsClick);

    // Back Button Event
    document
      .querySelector(UISelectors.backBtn)
      .addEventListener("click", UICtrl.clearEditState);
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

  // Clicked item
  const itemEditClick = e => {
    if (e.target.classList.contains("edit-item")) {
      const listId = e.target.parentNode.parentNode.id;
      const listIdArr = listId.split("-");
      const id = parseInt(listIdArr[1]);
      const itemToEdit = ItemCtrl.getItemById(id);
      ItemCtrl.setCurrentItem(itemToEdit);

      // Add Item to the input fields
      UICtrl.addItemToForm();
    }
    e.preventDefault();
  };

  // Update item Submit
  const itemUpdateSubmit = function(e) {
    const input = UICtrl.getItemInput();
    const updatedItem = ItemCtrl.updateItem(input.name, input.calories);
    UICtrl.updateListItem(updatedItem);

    const totalCalories = ItemCtrl.getTotalCalories();
    UICtrl.showTotalCalories(totalCalories);
    UICtrl.clearEditState();
    e.preventDefault();
  };

  // Delete selected Item
  const itemDeleteSubmit = function(e) {
    const currentItem = ItemCtrl.getCurrentItem();
    ItemCtrl.deleteItem(currentItem.id);
    UICtrl.deleteListItem(currentItem.id);

    const totalCalories = ItemCtrl.getTotalCalories();
    UICtrl.showTotalCalories(totalCalories);
    UICtrl.clearEditState();
    e.preventDefault();
  };

  // Clear Items Event
  const clearAllItemsClick = function() {
    ItemCtrl.clearAllItems();
    UICtrl.removeAllItems();
    const totalCalories = ItemCtrl.getTotalCalories();
    UICtrl.showTotalCalories(totalCalories);
    UICtrl.hideList();
  };

  // Public Methods
  return {
    init: function() {
      // Clear Edit State
      UICtrl.clearEditState();
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
