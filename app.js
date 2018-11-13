// BUDGET CONTROLLER
const budgetController = (() => {

    class Expense {
        constructor(id, description, value) {
            this.id = id;
            this.description = description;
            this.value = value;
        }
    };

    class Income {
        constructor(id, description, value) {
            this.id = id;
            this.description = description;
            this.value = value;
        }
    };

    let data = {
        allItems: {
            exp: [],
            inc: [],
        },
        totals: {
            exp: 0,
            inc: 0,
        }
    };

    return {
        addItem: (type, des, val) => {

            let newItem, id;

            // Create new ID
            if (data.allItems[type].length > 0) {
                id = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                id = 0;
            }

            // Create new item based on 'inc' or 'exp' type
            if (type === 'exp') {
                newItem = new Expense(id, des, val);
            } else if (type === 'inc') {
                newItem = new Income(id, des, val);
            }
            
            // Push into data structure
            data.allItems[type].push(newItem);

            // Return new item
            return newItem;
        },

        testing: () => {
            console.log(data)
        }
    };

})();

// UI CONTROLLER
const uiController = (() => {

    let domStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'
    }

    return {
        getInput: () => {
            return {
                type: document.querySelector(domStrings.inputType).value, // either inc or exp
                description: document.querySelector(domStrings.inputDescription).value,
                value: document.querySelector(domStrings.inputValue).value,
            };
        },

        getDOMStrings: () => {
            return domStrings;
        }
    }



    
})();

// GLOBAL APP CONTROLLER
const controller = ((budgetCtrl, uiCtrl) => {

    let setupEventListeners = () => {

        let DOM = uiCtrl.getDOMStrings();
        
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem)

        document.addEventListener('keypress', (event) => {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            } 
        });
    };

    

    let ctrlAddItem = () => {

        let input, newItem;

        // 1. Get the field input data
        input = uiCtrl.getInput();

        // 2. Add the item to budget controller
        newItem = budgetCtrl.addItem(input.type, input.description, input.value)

        // 3. Add the new item to UI

        // 4. Calculate budget

        // 5. Display budget

    };

    return {
        init: () => {
            console.log('You may begin adding to your budget. >8]');
            setupEventListeners();
        }
    }
})(budgetController, uiController);

controller.init();