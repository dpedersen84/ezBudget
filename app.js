// BUDGET CONTROLLER
const budgetController = (() => {






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

    let DOM = uiCtrl.getDOMStrings();

    let ctrlAddItem = () => {

        // 1. Get the field input data
            let input = uiCtrl.getInput();
            console.log(input)
        // 2. Add the item to budget controller

        // 3. Add the new item to UI

        // 4. Calculate budget

        // 5. Display budget

    }

    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem)

    document.addEventListener('keypress', (event) => {
        if (event.keyCode === 13 || event.which === 13) {
            ctrlAddItem();
        } 
    })

})(budgetController, uiController);