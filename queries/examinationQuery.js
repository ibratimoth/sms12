const Examination = require('../models/examinationModel')();

exports.getAll = () => Examination.findAll();
exports.getById = (id) => Examination.findByPk(id);
exports.create = (data) => Examination.create(data);
exports.update = (id, data) => Examination.update(data, { where: { id } });
exports.remove = (id) => Examination.destroy({ where: { id } });

