const {Individual} = require('../../model/Models');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const individualLogin = async(mobileNo,password,secretKeyForJwt) =>{
    const user = await Individual.findOne({mobileNo:mobileNo});
    if(user){
        const passwordCheck = await bcrypt.compare(password,user.password);
        if(passwordCheck){
            const accessToken = jwt.sign({userId:user.userId,username:user.username},secretKeyForJwt,{expiresIn:'30m'});
            return {status:"success",accessToken,user};
        }else{
            return {status:"incorrect password"};
        }
    }else{
        return {status:"invalid user"};
    }
}

const individualRegister = async(username,mobileNo,password,email,secretKeyForJwt)=>{
    try {
        const check = await Individual.find({mobileNo:mobileNo});
        if(check.length>0){
            return {status:"user already found"};
        }
        const user = await Individual.create({
            userId: uuidv4(),
            username: username,
            mobileNo: mobileNo,
            password: password,
            email: email,
        });
        const accessToken = jwt.sign({ userId: user.userId, username: user.username }, secretKeyForJwt, { expiresIn: '30m' });
        return { status: "success", accessToken, user };
    } catch (err) {
        console.log(err.message);
        return { status: "error in register", err: err.message };
    }
}

module.exports = {individualLogin,individualRegister}