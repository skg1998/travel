const {Router} = require('express')
const LogEntry = require('../Modals/LogEntrys')
const router = Router()


router.get('/',async (req,res,next)=>{
    try{
        const entries = await LogEntry.find();
        res.json(entries);
    }catch(error){
        console.log(error)
    }
})


router.post('/', async (req,res,next)=>{
    try{
        const logEntry = new LogEntry(req.body)
        const creatLogEntry = await logEntry.save();
        res.json(creatLogEntry);
    }catch(err){
        console.log(error.name)
        if(error.name ==='ValidationError'){
            res.status(422)
        }
        next(error)
    }
   
})


module.exports = router;