const {Individual} = require('../../model/Models')

const getCurrentDate = () => {
    const currentDate = new Date();
    return currentDate;
}

const addExpense = async(userId,category,product_name,product_amount,description,date) =>{
    const currentDate = getCurrentDate();
    try{
        const res = await Individual.findOneAndUpdate(
            {userId:userId},
            {$push : {expenses: {category,product_name,product_amount,description,date,created_on:currentDate}}},
            {new: true}
            );
        if(res){
            return { status: "success", user:res};
        }
        else{
            return {status: "user not found"};
        }
    }catch(err){
        console.error(err);
        return { status: "error", error: err.message };
    }
}

const getExpense = async(userId) =>{
    try{
        const res = await Individual.findOne({userId:userId});
        return {status: "success",data : res.expenses};
    }catch(err){
        console.error(err);
        return { status: "error", error: err.message };
    }
}

module.exports = {addExpense,getExpense}