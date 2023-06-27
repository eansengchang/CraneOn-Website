const express = require('express');

const {
  getEquipments,
  getEquipment,
  createEquipment,
  deleteEquipment,
  updateEquipment,
} = require('../controllers/equipmentController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

//need authentication for all the requests
router.use(requireAuth)

//GET all equipments
router.get('/', getEquipments);

//GET a equipment
router.get('/:id', getEquipment);

//POST equipment
router.post('/', createEquipment);

//DELETE equipment
router.delete('/:id', deleteEquipment);

//UPDATE equipment
router.patch('/:id', updateEquipment);

module.exports = router;
