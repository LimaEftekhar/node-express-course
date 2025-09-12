const express = require('express');
const router = express.Router();

// import the controller functions
const {
  getPeople,
  addPerson,
  getPersonById,
  updatePerson,
  deletePerson,
} = require('../controllers/people');

// GET all people
router.get('/', getPeople);

// POST add a person
router.post('/', addPerson);

// GET a single person by id
router.get('/:id', getPersonById);

// PUT update a person by id
router.put('/:id', updatePerson);

// DELETE a person by id
router.delete('/:id', deletePerson);

module.exports = router;