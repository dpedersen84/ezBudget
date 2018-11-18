module.exports = (sequelize, DataTypes) => {

    let Budgets = sequelize.define("Budgets", {
        allItems : {
            type: DataTypes.ARRAY,
                exp: DataTypes.ARRAY,
                inc: DataTypes.ARRAY
        },
        totals: {
            type: DataTypes.ARRAY,
                exp: DataTypes.ARRAY,
                inc: DataTypes.ARRAY
        },
        budget: {
            type: DataTypes.INTEGER
        },
        percentage: {
            type: DataTypes.INTEGER
        }
    });
    return Budgets;
};