//Storage controller
const StorageCtrl = (function(){
  return{
    storeItem: function(item){
      let items;
      if(localStorage.getItem('items') === null){
        let items = [];
        items.push(item);
        localStorage.setItem('items', JSON.stringify(items));
      }else{
        items = JSON.parse(localStorage.getItem('items'));
        items.push(item);
        localStorage.setItem('items', JSON.stringify(items));
      }
    },
    getStoredItems: function(){
      let items;
      if(localStorage.getItem('items') === null){
        items = [];
      }else{
        items = JSON.parse(localStorage.getItem('items'));
      }
      return items;
    },
    updateStoredItem: function(updatedItem){
      let items = JSON.parse(localStorage.getItem('items'));
      items.forEach(function(item, index){
        if(item.id === updatedItem.id){
          items.splice(index, 1, updatedItem);
        }
      });
      localStorage.setItem('items', JSON.stringify(items));
    },
    deleteStoredItem: function(id){
      let items = JSON.parse(localStorage.getItem('items'));
      items.forEach(function(item, index){
        if(item.id === id){
          items.splice(index, 1);
        }
      })
      localStorage.setItem('items', JSON.stringify(items));
    },
    clearAllStoredItems: function(){
      localStorage.removeItem('items');
    }
  }
})();

//Item controller
const ItemCtrl = (function(){
  //Item constructor
  const Item = function(id,name,calories){
    this.id=id;
    this.name=name;
    this.calories=calories;
  }

  //data structure - State
  const data = {
    items: StorageCtrl.getStoredItems(),
    currentItem: null,
    totalCalories: 0
  }

  //public methods
  return {
    logData: function(){
      return data;
    },
    getItems: function(){
      return data.items;
    },
    addItem: function(name,calories){
      let ID;
      if(data.items.length > 0){
        ID = data.items[data.items.length - 1].id + 1;
      }else{
        ID = 0;
      }
      calories = parseInt(calories);
      newItem = new Item(ID, name, calories)
      data.items.push(newItem);
      return newItem;
    },
    updateItem: function(name, calories){
      calories = parseInt(calories);
      let found = null;
      data.items.forEach(function(item){
        if(item.id === data.currentItem.id){
          item.name = name;
          item.calories = calories;
          found = item;
        }
      });
      return found;
    },
    clearAllItems: function(){
      data.items = [];
    },
    getTotalCalories: function(){
      let total = 0;
      data.items.forEach(function(item){
        total += item.calories;
      });
      data.totalCalories = total;
      return data.totalCalories;
    },
    getItemByID: function(id){
      let found = null;
      data.items.forEach(function(item){
        if(item.id === id){
          found = item;
        }
      });
      return found;
    },
    deleteItemByID: function(id){
      const ids = data.items.map(function(item){
        return item.id;
      });
      const idx = ids.indexOf(id);
      data.items.splice(idx, 1);
    },
    setCurrentItem: function(item){
      data.currentItem = item;
    },
    getCurrentItem: function(){
      return data.currentItem;
    }
  }
})();

//UI controller
const UICtrl = (function(){
  const UISelectors = {
    itemList: '#item-list',
    addBtn: '.add-btn',
    updateBtn: '.update-btn',
    deleteBtn: '.delete-btn',
    backBtn: '.back-btn',
    clearBtn: '.clear-btn',
    itemName: '#item-name',
    itemCalories: '#item-calories',
    totalCalories: '.total-calories',
    editItem: '.edit-item'
  }

  //public methods
  return {
    populateItemsList: function(items){
      let output='';

      items.forEach(function(item){
        output += `
        <li class="collection-item" id="item-${item.id}">
        <strong>${item.name}: </strong><em>${item.calories} Calories</em><a href="#" class="secondary-content"><i class="fa fa-pencil edit-item"></i></a>
        </li>
        `;
      });

      document.querySelector(UISelectors.itemList).innerHTML = output;
    },
    getSelectors: function(){
      return UISelectors;
    },
    getItemInput: function(){
      return {
        name: document.querySelector(UISelectors.itemName).value,
        calories: document.querySelector(UISelectors.itemCalories).value
      }
    },
    addListItem: function(item){
      //Unhide list
      document.querySelector(UISelectors.itemList).style.display = 'block';

      const li = document.createElement('li');
      li.className = "collection-item";
      li.id = `item-${item.id}`;
      li.innerHTML = `<strong>${item.name}: </strong><em>${item.calories} Calories</em><a href="#" class="secondary-content"><i class="fa fa-pencil edit-item"></i></a>`;
      document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend',li);
    },
    updateListItem: function(updatedItem){
      document.getElementById(`item-${updatedItem.id}`).innerHTML = `<strong>${updatedItem.name}: </strong><em>${updatedItem.calories} Calories</em><a href="#" class="secondary-content"><i class="fa fa-pencil edit-item"></i></a>`;
    },
    deleteListItem: function(id){
      document.getElementById(`item-${id}`).remove();
    },
    clearItemList: function(){
      document.querySelector(UISelectors.itemList).innerHTML = '';
    },
    clearInputs: function(){
      document.querySelector(UISelectors.itemName).value = '';
      document.querySelector(UISelectors.itemCalories).value = '';
    },
    hideList: function(){
      document.querySelector(UISelectors.itemList).style.display = 'none';
    },
    displayTotalCalories: function(totalCalories){
      document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
    },
    clearEditState: function(){
      UICtrl.clearInputs();
      document.querySelector(UISelectors.updateBtn).style.display = 'none';
      document.querySelector(UISelectors.deleteBtn).style.display = 'none';
      document.querySelector(UISelectors.backBtn).style.display = 'none';
      document.querySelector(UISelectors.addBtn).style.display = 'inline';
    },
    displayEditState: function(){
      UICtrl.displayInputs();
      document.querySelector(UISelectors.updateBtn).style.display = 'inline';
      document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
      document.querySelector(UISelectors.backBtn).style.display = 'inline';
      document.querySelector(UISelectors.addBtn).style.display = 'none';
    },
    displayInputs: function(){
      document.querySelector(UISelectors.itemName).value = ItemCtrl.getCurrentItem().name;
      document.querySelector(UISelectors.itemCalories).value = ItemCtrl.getCurrentItem().calories;
    }
  }
})();

//App controller
const App = (function(ItemCtrl, UICtrl, StorageCtrl){
  //Load event listeners
  const loadEventListeners = function(){
    const UISelectors = UICtrl.getSelectors();

    document.addEventListener('keypress', function(e){
      if(e.key === "Enter"){
        e.preventDefault();
      }
    });

    document.querySelector(UISelectors.addBtn).addEventListener('click', addItemSubmit);

    document.querySelector(UISelectors.itemList).addEventListener('click', editItemClick);

    document.querySelector(UISelectors.updateBtn).addEventListener('click', updateItemSubmit);

    document.querySelector(UISelectors.deleteBtn).addEventListener('click', deleteItemSubmit);

    document.querySelector(UISelectors.backBtn).addEventListener('click', backSubmit);

    document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllSubmit);
  }

  const addItemSubmit = function(e){
    const input = UICtrl.getItemInput();
    if(input.name !=='' && input.calories !== ''){
      const newItem = ItemCtrl.addItem(input.name, input.calories);
      
      UICtrl.addListItem(newItem);

      const totalCalories = ItemCtrl.getTotalCalories();
      UICtrl.displayTotalCalories(totalCalories);
      
      StorageCtrl.storeItem(newItem);
      UICtrl.clearInputs();
    }
    e.preventDefault();
  }

  const editItemClick = function(e){
    if(e.target.classList.contains('edit-item')){
      const listID = e.target.parentElement.parentElement.id;
      const id = parseInt(listID.split('-')[1]);
      const itemToEdit = ItemCtrl.getItemByID(id);
      ItemCtrl.setCurrentItem(itemToEdit);
      UICtrl.displayEditState();      
    }
    e.preventDefault();
  } 

  const updateItemSubmit = function(e){
    const input = UICtrl.getItemInput();
    const updatedItem = ItemCtrl.updateItem(input.name,input.calories);
    UICtrl.updateListItem(updatedItem);

    StorageCtrl.updateStoredItem(updatedItem);
    
    totalCalories = ItemCtrl.getTotalCalories();
    UICtrl.displayTotalCalories(totalCalories);
    UICtrl.clearEditState();
    e.preventDefault();
  }

  const deleteItemSubmit = function(e){
    const item = ItemCtrl.getCurrentItem();
    ItemCtrl.deleteItemByID(item.id);
    UICtrl.deleteListItem(item.id);
    
    totalCalories = ItemCtrl.getTotalCalories();
    UICtrl.displayTotalCalories(totalCalories);
    UICtrl.clearEditState();

    StorageCtrl.deleteStoredItem(item.id);

    const items = ItemCtrl.getItems();
    if(!items.length){
      UICtrl.hideList();
    }
    e.preventDefault();
  }

  const backSubmit = function(e){
    UICtrl.clearEditState();
    e.preventDefault();
  }

  const clearAllSubmit = function(){
    ItemCtrl.clearAllItems();
    UICtrl.clearItemList();
    StorageCtrl.clearAllStoredItems();
    totalCalories = ItemCtrl.getTotalCalories();
    UICtrl.displayTotalCalories(totalCalories);
    UICtrl.hideList();
  }

  //public methods
  return {
    init: function(){
      UICtrl.clearEditState();
      const items = ItemCtrl.getItems();
      if(!items.length){
        UICtrl.hideList();
      }else{
        UICtrl.populateItemsList(items);
        const totalCalories = ItemCtrl.getTotalCalories();
        UICtrl.displayTotalCalories(totalCalories);
      }

      loadEventListeners();
    }
  }
})(ItemCtrl, UICtrl, StorageCtrl);

//Initializing app
App.init();