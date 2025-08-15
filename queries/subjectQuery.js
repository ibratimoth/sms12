const Subject = require('../models/subjectModel')();

exports.getAll = () => Subject.findAll();
exports.getById = (id) => Subject.findByPk(id);
exports.create = (data) => Subject.create(data);
exports.update = (id, data) => Subject.update(data, { where: { id } });
exports.remove = (id) => Subject.destroy({ where: { id } });
exports.getByParent = (parentId) => {
    return Subject.findAll({
        where: { class_id: parentId }
    });
};