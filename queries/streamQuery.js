const Stream = require('../models/streamModel')();

exports.getAll = () => Stream.findAll();
exports.getById = (id) => Stream.findByPk(id);
exports.create = (data) => Stream.create(data);
exports.update = (id, data) => Stream.update(data, { where: { id } });
exports.remove = (id) => Stream.destroy({ where: { id } });
exports.getByParent = (parentId) => {
    return Stream.findAll({
        where: { class_id: parentId }
    });
};