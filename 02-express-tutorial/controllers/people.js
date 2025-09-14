let { people } = require('../data');

// GET all
const getPeople = (req, res) => {
  res.status(200).json({ success: true, data: people });
};

// POST add person
const addPerson = (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ success: false, message: 'Please provide a name' });
  }
  const newPerson = { id: people.length + 1, name };
  people.push(newPerson);
  res.status(201).json({ success: true, data: newPerson });
};

// GET by ID
const getPersonById = (req, res) => {
  const id = parseInt(req.params.id);
  const person = people.find((p) => p.id === id);
  if (!person) {
    return res
      .status(404)
      .json({ success: false, message: `No person with id ${id}` });
  }
  res.status(200).json({ success: true, data: person });
};

// PUT update person
const updatePerson = (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;
  const person = people.find((p) => p.id === id);
  if (!person) {
    return res
      .status(404)
      .json({ success: false, message: `No person with id ${id}` });
  }
  person.name = name || person.name;
  res.status(200).json({ success: true, data: person });
};

// DELETE person
const deletePerson = (req, res) => {
  const id = parseInt(req.params.id);
  const person = people.find((p) => p.id === id);
  if (!person) {
    return res
      .status(404)
      .json({ success: false, message: `No person with id ${id}` });
  }
  people = people.filter((p) => p.id !== id);
  res.status(200).json({ success: true, message: `Deleted person ${id}` });
};

module.exports = {
  getPeople,
  addPerson,
  getPersonById,
  updatePerson,
  deletePerson,
};