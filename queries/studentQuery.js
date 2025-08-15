const Student = require('../models/studentModel')();

exports.getAll = () => Student.findAll();
exports.getById = (id) => Student.findByPk(id);
exports.create = (data) => Student.create(data);
exports.update = (id, data) => Student.update(data, { where: { id } });
exports.remove = (id) => Student.destroy({ where: { id } });
exports.getByParent = (parentId) => {
    return Student.findAll({
        where: { stream_id: parentId }
    });
};       