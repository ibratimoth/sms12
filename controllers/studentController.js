const query = require('../queries/studentQuery');

exports.getAll = async (req, res) => {
  try {
    const students = await query.getAll();
    res.status(200).json({ message: 'Data fetched Successfully', success: true, statusCode: 200, data: students});
  } catch (err) {
    res.status(500).json({ message: 'failed to fetch Data', success: false, statusCode: 500, error: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const student = await query.getById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Data not found', success: false, statusCode: 404 });
    res.status(200).json({ message: 'Data fetched Successfully', success: true, statusCode: 200, data: student});
  } catch (err) {
    res.status(500).json({ message: 'failed to fetch Data', success: false, statusCode: 500, error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const newStudent = await query.create(req.body);
    res.status(201).json({  message: 'Data Created Successfully', success: true, statusCode: 201, data: newStudent});
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

exports.getByParent = async (req, res) => {
  try {
    const students = await query.getByParent(req.params.parentId);
    if (!students.length) {
      return res.status(404).json({
        message: 'No Data found for this parent',
        success: false,
        statusCode: 404
      });
    }
    res.status(200).json({
      message: 'Data fetched successfully',
      success: true,
      statusCode: 200,
      data: students
    });
  } catch (err) {
    res.status(500).json({
      message: 'Failed to fetch data',
      success: false,
      statusCode: 500,
      error: err.message
    });
  }
};