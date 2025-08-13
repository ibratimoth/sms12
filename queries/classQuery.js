const Class = require('../models/classModel')();

exports.getAll = () => Class.findAll();
exports.getById = (id) => Class.findByPk(id);
exports.create = (data) => Class.create(data);
exports.update = (id, data) => Class.update(data, { where: { id } });
exports.remove = (id) => Class.destroy({ where: { id } });
        