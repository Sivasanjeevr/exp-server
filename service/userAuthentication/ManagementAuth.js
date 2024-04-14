const {Management} = require('../../model/Models');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const managementLogin = async(mobileNo,password,secretKeyForJwt)=>{
    try{
        const user = await Management.findOne({mobileNo:mobileNo});
        if(user=={}){
            return {status:"invalid user"};
        }
        const passwordCheck = await bcrypt.compare(password,user.password);
        if(passwordCheck){
            const accessToken = jwt.sign({userId:user.userId,username:user.username},secretKeyForJwt,{expiresIn:'30m'});
            return {status:"success",accessToken,user};
        }else{
            return {status:"incorrect password"};
        }
    }catch(err){
        console.log(err.message);
        return {status:"error",err};
    }
}

const managementRegister = async(username,mobileNo,hashPassword,email,secretKeyForJwt)=>{
    try{
        const user = await Management.create({
            username: username,
            mobileNo: mobileNo,
            password: hashPassword,
            email: email,
        });
        const accessToken = jwt.sign({userId: user.userId,username: user.username},secretKeyForJwt, {expiresIn:'30m'})
        return {status:"success",accessToken,user};
    }catch(err){
        console.log(err.message);
        return {status:"error in register", err:err.message};
    }
}

module.exports = {managementLogin,managementRegister}