const Assessment = require('../models/assessmentModel')();

exports.getAll = () => Assessment.findAll();
exports.getById = (id) => Assessment.findByPk(id);
exports.create = (data) => Assessment.create(data);
exports.update = (id, data) => Assessment.update(data, { where: { id } });
exports.remove = (id) => Assessment.destroy({ where: { id } });
exports.getByParent = (parentId) => {
    return Assessment.findAll({
        where: { term_id: parentId }
    });
};
