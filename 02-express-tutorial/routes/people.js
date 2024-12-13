const express = require('express');
const {people} = require("../data");
const {getPeople, createPeople, createPersonPostman, updatePerson, deletePerson} = require("../controllers/people");


const router = express.Router();

/*router.get('/', getPeople);

router.post('/', createPeople);
router.post('/postman', createPersonPostman);

router.put('/:id', updatePerson)
router.delete('/:id', deletePerson)*/

router.route('/').get(getPeople).post(createPersonPostman);
router.route('/postman').post(createPersonPostman);
router.route('/:id').put(updatePerson).delete(deletePerson);
module.exports = router;