const equipmentModel = require('../models/equipmentModel');
const mongoose = require('mongoose');

const postcodes = require('node-postcodes.io');

// get all equipments
const getAllEquipments = async (req, res) => {
  const equipments = await equipmentModel.find({});

  res.status(200).json(equipments);
};

// get equipments of a user
const getUserEquipments = async (req, res) => {
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

    //get coordinates
    const postcodeInfo = await postcodes.lookup(req.body.postcode);
    const { latitude, longitude } = postcodeInfo.result;

    const equipment = await equipmentModel.create({
      ...req.body,
      user_id,
      geocode: [latitude, longitude],
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

  const equipment = await equipmentModel.findById(id);
  if (equipment.user_id != req.user._id) {
    res.status(401).json({ error: 'Request not authorized' });
  }

  const deletedEquipment = await equipmentModel.findOneAndDelete({ _id: id });

  if (!equipment) {
    return res.status(404).json({ error: 'No such equipment' });
  }
  res.status(200).json(deletedEquipment);
};

// update a equipment
const updateEquipment = async (req, res) => {
  const { id } = req.params;
  //if id isnt valid
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ error: 'No such equipment' });

  const equipment = await equipmentModel.findById(id);
  if (!equipment) {
    return res.status(404).json({ error: 'No such equipment' });
  }
  if (equipment.user_id != req.user._id) {
    res.status(401).json({ error: 'Request not authorized' });
  }

  const updatedEquipment = await equipmentModel.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  res.status(200).json(updatedEquipment);
};

module.exports = {
  getAllEquipments,
  getUserEquipments,
  getEquipment,
  createEquipment,
  deleteEquipment,
  updateEquipment,
};
