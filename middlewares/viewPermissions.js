const Permission = require('./../models/permissionsModel');
const RolePermission = require('./../models/rolesPermissionsModel');
const StaffRole = require('./../models/staffRoles');
const Role = require('./../models/rolesModel');

module.exports = async (req, res, next) => {
    const staffId = req.session.staffId;

    if (!staffId) {
        res.locals.can = () => false;
        return next();
    }

    try {

        const staffRoles = await StaffRole.findAll({
            where: { staff_id: staffId },
            include: [{ model: Role, attributes: ['id', 'name'] }]
        });

        const roleIds = staffRoles.map(sr => sr.role_id);
        if (!roleIds.length) {
            res.locals.can = () => false;
            return next();
        }

        const rolePermissions = await RolePermission.findAll({
            where: { role_id: roleIds },
            include: [{ model: Permission, attributes: ['name'] }]
        });

        const permissions = rolePermissions.map(rp => rp.Permission.name);

        res.locals.can = (permission) => permissions.includes(permission);

        next();
    } catch (err) {
        console.error('setPermissions error:', err);
        res.locals.can = () => false;
        next();
    }
};
