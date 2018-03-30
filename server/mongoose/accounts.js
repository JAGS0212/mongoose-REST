const mongoose = require('./mongoose');

//Schema
let accounts = new mongoose.Schema({
    name:String,
    balance:Number
})

//Static methods
accounts.static({
    getAccounts(){
        return this.find({}).exec();
    },
    updateAccount(newAccount){
        async function asyncUpdateAccount(){
            let account = await this.findById(newAccount._id).exec();
            account.name = newAccount.name;
            account.balance = newAccount.balance;
            account = await account.save();
            return account;
        };
        return asyncUpdateAccount.call(this);
    }
})

//Instance methods



//Middleware
    //save
    accounts.pre('save',function(next){
        next();
    })



//Model
module.exports = mongoose.model('accounts',accounts);