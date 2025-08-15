const Term  = require('../models/termModel')();

exports.getAll = () => Term.findAll();
exports.getById = (id) => Term.findByPk(id);
exports.create = (data) => Term.create(data);
exports.update = (id, data) => Term.update(data, { where: { id } });
exports.remove = (id) => Term.destroy({ where: { id } });
exports.getByParent = (parentId) => {
    return Term.findAll({
        where: { year_id: parentId }
    });
};
