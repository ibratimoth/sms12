const Year = require('../models/yearModel')();

exports.getAll = () => Year.findAll();
exports.getById = (id) => Year.findByPk(id);
exports.create = (data) => Year.create(data);
exports.update = (id, data) => Year.update(data, { where: { id } });
exports.remove = (id) => Year.destroy({ where: { id } });

