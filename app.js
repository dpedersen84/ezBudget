// BUDGET CONTROLLER
const budgetController = (() => {






})();



// UI CONTROLLER
const uiController = (() => {





    
})();



// GLOBAL APP CONTROLLER
const controller = ((budgetCtrl, uiCtrl) => {

    let ctrlAddItem = () => {

        // 1. Get the field input data

        // 2. Add the item to budget controller

        // 3. Add the new item to UI

        // 4. Calculate budget

        // 5. Display budget

        console.log('adding item!')
    }

    document.querySelector('.add__btn').addEventListener('click', ctrlAddItem)

    document.addEventListener('keypress', (event) => {
        if (event.keyCode === 13 || event.which === 13) {
            ctrlAddItem();
        } 
    })

})(budgetController, uiController);