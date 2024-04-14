const {Individual} = require('../../model/Models');

const addIncome = async(userId,source,amount,description,date)=>{
    try{
        const res = await Individual.findOneAndUpdate(
            {userId: userId},
            {$push : {incomes : {source,amount,description,date,created_on:new Date()}}},
            {new: true}
        );
        if(res){
            return { status: "success", user:res};
        }else{
            return {status:"not found"}
        }
    }catch(err){
        console.log(err);
        return {status: "error", message: err.message};
    }
}

const getIncome = async(userId)=>{
    try{
        const res = await Individual.findOne({userId})
        return {status:"success",res};
    }catch(err){
        console.log(err);
        return {status:"error",message: err.message};
    }

}

module.exports = {addIncome,getIncome};