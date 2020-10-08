const express = require('express');
const ideasRouter = express.Router();

const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId} = require('./db');

const checkMillionDollarIdea  = require('./checkMillionDollarIdea');

ideasRouter.param('ideaId',(req,res,next,id) => {
    const idea = getFromDatabaseById('ideas',id);
    if(idea){
        req.idea = idea;
        next();
    }
    res.status(404).send();
})

ideasRouter.get('/',(req,res,next) => {
    res.status(200).send(getAllFromDatabase('ideas'));
})

ideasRouter.get('/:ideaId',(req,res,next) => {
    res.status(200).send(req.idea);
})

ideasRouter.post('/', checkMillionDollarIdea, (req,res,next) => {
    if(req.body){
        const idea = addToDatabase('ideas',req.body);
       return res.status(201).send(idea);
    }
    res.status(500).send();
})

ideasRouter.put('/:ideaId', checkMillionDollarIdea, (req,res,next) => {
    const upt = updateInstanceInDatabase('ideas',req.body);
    if(upt){
        return res.status(200).send(upt);
    }
    res.status(404).send();
})

ideasRouter.delete('/:ideasId',(req,res,next) => {
    const bool = deleteFromDatabasebyId('ideas',req.params.ideasId);
    if(bool){
        return res.status(204).send();
    }
    res.status(404).send();
})

module.exports = ideasRouter;