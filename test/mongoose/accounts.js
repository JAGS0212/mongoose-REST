
const chai = require('chai');
const mocha = require('mocha');
const fetch = require('node-fetch');
const mongoose = require('./../../server/mongoose');

mocha.describe('/accounts functionality',function(){
    mocha.describe('-X GET /accounts',function(){
        it('Should return an array of objects',function(){

            async function getAccounts(){
                let res = await fetch('http://localhost:3000/accounts');
                let accounts = await res.json();
                chai.expect(accounts).to.be.an('array','-X GET /accounts is not returning an array');
                if(accounts.length === 0)
                    return;
                for(var i = 0; i < accounts.length; i++){
                    chai.expect(accounts[i]).to.be.an('object','-X GET /accounts is not returning an array of objects');
                    chai.expect(accounts[i]).to.have.any.key('name');
                    chai.expect(accounts[i].name).to.be.a('string');
                    chai.expect(accounts[i]).to.have.any.key('balance');
                    chai.expect(accounts[i].balance).to.be.a('number');
                }
            }

            return getAccounts();
        })

        
    })

    mocha.describe('-X POST /accounts',function(){
        let db = null;
        let documentsInserted = [];
        
        before(function(){
            db = mongoose.accounts;
        })
        
        it('Account validators tests',async function(){
            let initObj = {
                method:'POST',
                headers:{'Content-Type': 'application/json'}
            }

            initObj.body = JSON.stringify({name:'Jorge',balance:100.282362732});
            let res = await fetch('http://localhost:3000/accounts',initObj);
            chai.expect(res.status).has.to.be.eq(200,'Response status code should be 200, since a valid object has been provided {name:"Jorge",balance:100.282362732}.');

            res = await db.find({name:'Jorge',balance:100.282362732}).exec();
            
            console.log(res);
            


        })

    })
})