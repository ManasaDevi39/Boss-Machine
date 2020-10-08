const express = require('express');
const minionsRouter = express.Router();

const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId} = require('./db');

minionsRouter.param('minionId',(req,res,next,id) => {
    const minion = getFromDatabaseById('minions',id);
    if(minion){
        req.minion = minion;
        next();
    }
    res.status(404).send();
})

minionsRouter.get('/',(req,res,next) => {
    res.status(200).send(getAllFromDatabase('minions'));
})

minionsRouter.get('/:minionId',(req,res,next) => {
    res.status(200).send(req.minion);
})

minionsRouter.post('/', (req,res,next) => {
    if(req.body){
        const minion = addToDatabase('minions',req.body);
       return res.status(201).send(minion);
    }
    res.status(500).send();
})

minionsRouter.put('/:minionId',(req,res,next) => {
    const upt = updateInstanceInDatabase('minions',req.body);
    if(upt){
        return res.status(200).send(upt);
    }
    res.status(404).send();
})

minionsRouter.delete('/:minionsId',(req,res,next) => {
    const bool = deleteFromDatabasebyId('minions',req.params.minionsId);
    if(bool){
        return res.status(204).send();
    }
    res.status(404).send();
})

module.exports = minionsRouter;