const express = require('express');
const router = express.Router();
const {check,validationResult} = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');
const myError = require('./../error');


const validators = {
    getAccounts(req,res,next){
    },
    addAccount: [
            check('name').exists().withMessage('Name attribute has to exist').not().isEmpty().withMessage('Name attribute cannot be empty').not().isNumeric().withMessage('Name attribute cannot be numeric').toString(),
            check('balance').exists().withMessage('Balance attribute has to exist').not().isEmpty().withMessage('Balance attribute can not be empty').not().isNumeric().withMessage('Balance has to be numeric').toFloat()
        ],
    updateAccount:[
        check('name').exists().withMessage('Name attribute has to exist').not().isEmpty().withMessage('Name attribute cannot be empty').not().isNumeric().withMessage('Name attribute cannot be numeric').toString(),
        check('balance').exists().withMessage('Balance attribute has to exist').not().isEmpty().withMessage('Balance attribute can not be empty').not().isNumeric().withMessage('Balance has to be numeric').toFloat(),
        check('_id').exists().withMessage('Id attribute has to exists').not().isEmpty().withMessage('Id cannot be empty').isAlphanumeric().withMessage('Id has to be alphanumeric'),
    ],
    deleteAccounts:[
        check('_id').exists().withMessage('Id attribute has to exists').not().isEmpty().withMessage('Id cannot be empty').isAlphanumeric().withMessage('Id has to be alphanumeric')
    ]
}

const functionality = {
    getAccounts(req,res,next){

        (async function(){
            let accounts = await req.db.accounts.getAccounts();
            return accounts;
        })().then((val)=>{
            res.send(val);
        }).catch((err)=>{
            next(new myError(err,500));
        })

    },
    addAccount(req,res,next){
        
        (async function(){
            let errors = validationResult(req);
            if(!errors.isEmpty())
                return Promise.reject(new myError(errors.mapped(),400));
            
            let newAccount = new req.db.accounts(req.body);
            let res = await newAccount.save();
            return {id:res._id};
        })().then((val)=>{
            res.send(val);
        }).catch((err)=>{
            if(err instanceof myError){
                next(err)
                return;
            }
            next(new myError(err,500));
        })
        

    },
    updateAccount(req,res,next){
        let errors = validationResult(req);
        if(!errors.isEmpty()){
            next(new myError(errors.mapped(),400));
            return;
        }
        
        async function asyncUpdateAccount(){
            let account = await req.db.accounts.updateAccount(req.body);
            return account._id;
        }
        asyncUpdateAccount().then((val)=>{
            res.send(val);
        }).catch((err)=>{
            if(err instanceof myError){
                next(err);
                return;
            }
            next(new myError(err,500));
        })

    },
    deleteAccounts(req,res,next){
        let errors = validationResult(req);
        if(!errors.isEmpty()){
            next(new myError(errors.mapped(),400));
            return;
        }

        async function asyncDeleteAccount(){
            let account = await req.db.accounts.findById(req.params._id).exec();
            if(account === null)
                return Promise.reject(new myError('Not found',404));

             let res = await account.remove();
            return req.params._id;
        }
        asyncDeleteAccount().then((val)=>{
            res.send(val);
        }).catch((err)=>{
            if(err instanceof myError){
                next(err);
                return;
            }
            next(new myError(err,500));     
        });
    }
}


router.get('/',functionality.getAccounts);
router.post('/',validators.addAccount,functionality.addAccount);
router.put('/',validators.updateAccount,functionality.updateAccount);
router.delete('/:_id',functionality.deleteAccounts);

router.use((err,req,res,next)=>{
    res.status(err.code).send(err);
})

module.exports = router;
