const Permission = require('./../models/permissionsModel');
const RolePermission = require('./../models/rolesPermissionsModel');
const StaffRole = require('./../models/staffRoles');
const Role = require('./../models/rolesModel');

function rbac(requiredPermission) {
    return async (req, res, next) => {
        const staffId = req.session.staffId;

        if (!staffId) {
            return res.status(403).json({ success: false, message: 'Access denied: No staff ID found' });
        }

        try {
            const staffRoles = await StaffRole.findAll({
                where: { staff_id: staffId },
                include: [{ model: Role, attributes: ['id', 'name'] }],
                order: [['created_at', 'DESC']]
            });

            // console.log(
            //     'staffRoles plain:',
            //     staffRoles.map(rp => rp.get({ plain: true }))
            // );

            const roleIds = staffRoles.map(sr => sr.role_id);
            if (!roleIds.length) {
                return res.status(403).json({ success: false, message: 'Access denied: No roles assigned' });
            }

            const rolePermissions = await RolePermission.findAll({
                where: { role_id: roleIds },
                include: [{ model: Permission, attributes: ['name'] }],
                order: [['created_at', 'DESC']]
            });

            // console.log(
            //     'rolePermissions plain:',
            //     rolePermissions.map(rp => rp.get({ plain: true }))
            // );
            const permissions = rolePermissions
                .map(rp => rp.permission?.name)
                .filter(Boolean);

            console.log('permissions array:', permissions);
            if (permissions.includes(requiredPermission)) {
                return next();
            }

            return res.render('forbidden');
        } catch (err) {
            console.error('RBAC error:', err);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    };
}

module.exports = rbac;
