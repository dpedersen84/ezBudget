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

    const calculateTotal = (type) => {
        let sum = 0;

        data.allItems[type].forEach((item) => {
            sum += item.value;
        });
        data.totals[type] = sum;
    }

    // Object to hold all of the data in the budget
    let data = {
        allItems: {
            exp: [],
            inc: [],
        },
        totals: {
            exp: 0,
            inc: 0,
        },
        budget: 0,
        percentage: -1 // set to -1 because it is nonexistent at the beginning
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

        calculateBudget: () => {

            // 1. Calculate total income and expense
            calculateTotal('exp');
            calculateTotal('inc');

            // 2. Calculate the budget: income - expenses
            data.budget = data.totals.inc - data.totals.exp;

            // 3. Calculate the percentage of income spent
            if(data.totals.inc > 0) {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100); 
            } else {
                data.percentage = -1;
            }
            
        },

        getBudget: () => {
            return {
                budget: data.budget,
                totalIncome: data.totals.inc,
                totalExpenses: data.totals.exp,
                percentage: data.percentage
            };
        },

        // View the data within console
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
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list',
    }

    return {
        getInput: () => {
            return {
                type: document.querySelector(domStrings.inputType).value, // either inc or exp
                description: document.querySelector(domStrings.inputDescription).value,
                value: parseFloat(document.querySelector(domStrings.inputValue).value), // Convert the value to a number
            };
        },

        addListItem: (obj, type) => {

            let html, newHTML, element;

            // Create HTML string with placeholder text
            if (type === 'inc') {
                element = domStrings.incomeContainer;
                html = `<div class="item clearfix" id="income-%id%"> <div class="item__description">%description%</div>
                <div class="right clearfix"><div class="item__value">%value%</div><div 
                class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i>
                </button></div></div></div>`;
            } else if (type === 'exp') {
                element = domStrings.expenseContainer;
                html = `<div class="item clearfix" id="expense-%id%"> <div class="item__description">%description%</div>
                <div class="right clearfix"><div class="item__value">%value%</div><div 
                class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i>
                </button></div></div></div>`;
            }
            
            // Replace placeholder text with actual data
            newHTML = html.replace('%id%', obj.id);
            newHTML = newHTML.replace('%description%', obj.description);
            newHTML = newHTML.replace('%value%', obj.value);

            // Insert HTML into DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHTML);

        },

        clearFields: () => {
            let fields, fieldsArr;

            fields = document.querySelectorAll(domStrings.inputDescription + ', ' + domStrings.inputValue); // document.querySelectorAll('.add__description, .add__value')

            // Convert list returned from querySelectorAll method to an array
            fieldsArr = Array.prototype.slice.call(fields);

            // Clear each of the input fields
            fieldsArr.forEach((input) => {
                input.value = '';
            });

            // Put cursor back into the first input field
            fieldsArr[0].focus();
        },

        getDOMStrings: () => {
            return domStrings;
        },
    };
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

        // Add the item only if the fields contain a description, a number, and a number greater than 0
        if (input.description !== '' && !isNaN(input.value) && input.value > 0) {
            // 2. Add the item to budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            // 3. Add the new item to UI
            uiCtrl.addListItem(newItem, input.type);

            // 4. Clear the fields
            uiCtrl.clearFields();

            // 5. Calculate and update budget
            updateBudget();
        ;}
    };

    const updateBudget = () => {

        // 1. Calculate budget
        budgetCtrl.calculateBudget();

        // 2. Return the budget
        let budget = budgetCtrl.getBudget();

        // 3. Display budget on the UI
        console.log(budget);
    }

    return {
        init: () => {
            console.log('You may begin adding to your budget. >8]');
            setupEventListeners();
        }
    }
})(budgetController, uiController);

// Start the application
controller.init();