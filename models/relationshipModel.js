const RelationStaff = require('../models/staffModel');
const RelationDesignation = require('../models/designationModel');
const RelationStaffDesignation = require('../models/staffDesignationModel');
const RelationType = require('../models/typesModel');
const RelationClass = require('./ClasssModel');
const RelationClassTeacher = require('../models/classTeacherModel');
const RelationRole = require('../models/rolesModel');
const RelationStaffRole = require('../models/staffRoles');
const RelationRolesPermission = require('../models/rolesPermissionsModel');
const RelationPermission = require('../models/permissionsModel');
const RelationDisability = require('../models/disabilitiesModel');
const RelationGender = require('../models/genderModel');
const RelationStaffAttendance = require('../models/staffAttendanceModel');

RelationStaff.hasMany(RelationStaffAttendance, {foreignKey: 'staff_id'});
RelationStaffAttendance.belongsTo(RelationStaff, {foreignKey: 'staff_id'});

RelationDisability.hasMany(RelationStaff, {foreignKey: 'disability_id'});
RelationStaff.belongsTo(RelationDisability, {foreignKey: 'disability_id'});

RelationGender.hasMany(RelationStaff, {foreignKey: 'gender_id'});
RelationStaff.belongsTo(RelationGender, {foreignKey: 'gender_id'});

RelationType.hasMany(RelationDesignation, {foreignKey: 'type_id'});
RelationDesignation.belongsTo(RelationType, {foreignKey: 'type_id'});

RelationStaff.hasMany(RelationStaffDesignation, {foreignKey: 'staff_id'});
RelationStaffDesignation.belongsTo(RelationStaff, {foreignKey: 'staff_id'})

RelationDesignation.hasMany(RelationStaffDesignation, {foreignKey: 'designation_id'});
RelationStaffDesignation.belongsTo(RelationDesignation, {foreignKey: 'designation_id'});

RelationStaff.hasMany(RelationStaffRole, {foreignKey: 'staff_id'});
RelationStaffRole.belongsTo(RelationStaff, {foreignKey: 'staff_id'});

RelationRole.hasMany(RelationStaffRole, {foreignKey: 'role_id'});
RelationStaffRole.belongsTo(RelationRole, {foreignKey: 'role_id'});

RelationClass.hasMany(RelationClassTeacher, {foreignKey: 'class_id'});
RelationClassTeacher.belongsTo(RelationClass, {foreignKey: 'class_id'});

RelationStaff.hasMany(RelationClassTeacher, {foreignKey: 'staff_id'});
RelationClassTeacher.belongsTo(RelationStaff, {foreignKey: 'staff_id'});

RelationPermission.hasMany(RelationRolesPermission, {foreignKey: 'permission_id'});
RelationRolesPermission.belongsTo(RelationPermission, {foreignKey: 'permission_id'});

RelationRole.hasMany(RelationRolesPermission, {foreignKey: 'role_id'});
RelationRolesPermission.belongsTo(RelationRole, {foreignKey: 'role_id'});

module.exports = {
    RelationStaff,
    RelationDesignation,
    RelationStaffDesignation,
    RelationType,
    RelationClass,
    RelationClassTeacher,
    RelationRole,
    RelationStaffRole,
    RelationRolesPermission,
    RelationPermission,
    RelationDisability,
    RelationGender
}