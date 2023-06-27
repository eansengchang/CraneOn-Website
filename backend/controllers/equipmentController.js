const equipmentModel = require('../models/equipmentModel');
const mongoose = require('mongoose');

// get equipments
const getEquipments = async (req, res) => {
  const user_id = req.user._id;
  const equipments = await equipmentModel.find({ user_id });

  res.status(200).json(equipments);
};

// get a single equipment
const getEquipment = async (req, res) => {
  const { id } = req.params;
  //if id isnt valid
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ error: 'No such equipment' });

  const equipment = await equipmentModel.findById(id);

  if (!equipment) {
    return res.status(404).json({ error: 'No such equipment' });
  }

  res.status(200).json(equipment);
};

// create a equipment
const createEquipment = async (req, res) => {
  try {
    const user_id = req.user._id;
    const equipment = await equipmentModel.create({
      ...req.body,
      user_id,
    });
    res.status(200).json(equipment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a equipment

const deleteEquipment = async (req, res) => {
  const { id } = req.params;
  //if id isnt valid
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ error: 'No such equipment' });

  const equipment = await equipmentModel.findOneAndDelete({ _id: id });

  if (!equipment) {
    return res.status(404).json({ error: 'No such equipment' });
  }
  res.status(200).json(equipment);
};

// update a equipment
const updateEquipment = async (req, res) => {
  const { id } = req.params;
  //if id isnt valid
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ error: 'No such equipment' });

  const equipment = await equipmentModel.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!equipment) {
    return res.status(404).json({ error: 'No such equipment' });
  }
  res.status(200).json(equipment);
};

module.exports = {
  getEquipments,
  getEquipment,
  createEquipment,
  deleteEquipment,
  updateEquipment,
};
