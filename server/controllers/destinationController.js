const { Destination } = require('../models/postgres');

exports.getAllDestinations = async (req, res) => {
  try {
    const destinations = await Destination.findAll();
    res.json(destinations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createDestination = async (req, res) => {
  try {
    const destination = await Destination.create(req.body);
    res.status(201).json(destination);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateDestination = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Destination.update(req.body, { where: { id } });
    if (updated) {
      const updatedDestination = await Destination.findOne({ where: { id } });
      res.json(updatedDestination);
    } else {
      res.status(404).json({ message: 'Destination not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteDestination = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Destination.destroy({ where: { id } });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Destination not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};