const query = require('../queries/termQuery');

exports.getAll = async (req, res) => {
  try {
    const terms = await query.getAll();
    res.status(200).json({ message: 'Data fetched Successfully', success: true, statusCode: 200, data: terms});
  } catch (err) {
    res.status(500).json({ message: 'failed to fetch Data', success: false, statusCode: 500, error: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const term = await query.getById(req.params.id);
    if (!term) return res.status(404).json({ message: 'Data not found', success: false, statusCode: 404 });
    res.status(200).json({ message: 'Data fetched Successfully', success: true, statusCode: 200, data: term});
  } catch (err) {
    res.status(500).json({ message: 'failed to fetch Data', success: false, statusCode: 500, error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const newTerm = await query.create(req.body);
    res.status(201).json({  message: 'Data Created Successfully', success: true, statusCode: 201, data: newTerm});
  } catch (err) {
    res.status(500).json({ message: 'failed to Create Data', success: false, statusCode: 500, error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const updated = await query.update(req.params.id, req.body);
    res.status(201).json({ message: 'Data Updated successfully', success: true, statusCode: 201, data: updated });
  } catch (err) {
    res.status(500).json({ message: 'failed to Update Data', success: false, statusCode: 500, error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await query.remove(req.params.id);
    res.status(200).json({ message: 'Data Deleted successfully', success: true, statusCode: 200 });
  } catch (err) {
    res.status(500).json({ message: 'failed to Delete Data', success: false, statusCode: 500, error: err.message });
  }
};
