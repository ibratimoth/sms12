const Staff = require('../models/staffModel');
const Disability = require('../models/disabilitiesModel');
const Role = require('../models/rolesModel');
const Permission = require('../models/permissionsModel');
const Type = require('../models/typesModel');
const Designation = require('../models/designationModel');
const StaffDesignation = require('../models/staffDesignationModel');
const RolePermission = require('../models/rolesPermissionsModel');
const StaffRole = require('../models/staffRoles');
const { RelationStaffDesignation } = require('../models/relationshipModel');
const StaffAttendance = require('../models/staffAttendanceModel');
const { sequelize } = require('../config/db');


class StaffRepository {
    async getAllStaffs() {
        return await Staff.findAll(
            {
                order: [['created_at', 'DESC']],
                include: [
                    {
                        model: RelationStaffDesignation,
                        include: [
                            {
                                model: Designation,
                                attributes: ['name']
                            }
                        ]
                    }
                ]
            });
    }

    async createStaff(StaffData) {
        return await Staff.create(StaffData);
    }

    async getStaffById(StaffId) {
        const staff = await Staff.findByPk(StaffId);

        if (!staff) {
            throw new Error('staff not found');
        }
        return staff;
    }

    async getStaffByEmail(email) {
        return await Staff.findOne({
            where: { email }
        });
    };

    async updateStaff(StaffId, StaffData) {
        const staff = await Staff.findByPk(StaffId);

        if (!staff) {
            throw new Error('staff not found');
        }

        await staff.update(StaffData)
        return staff;
    }

    async deleteStaff(StaffId) {
        const staff = await Staff.findByPk(StaffId);

        if (!staff) {
            throw new Error('staff not found');
        }

        return await staff.destroy({ where: { id: StaffId } });
    }

    async getAllDisabilities() {
        return await Disability.findAll({ order: [['created_at', 'DESC']] });
    }

    async createDisability(DisabilityData) {
        return await Disability.create(DisabilityData);
    }

    async getDisabilityById(DisabilityId) {
        const disability = await Disability.findByPk(DisabilityId);

        if (!disability) {
            throw new Error('disability not found');
        }
        return disability;
    }

    async updateDisability(DisabilityId, DisabilityData) {
        const disability = await Disability.findByPk(DisabilityId);

        if (!disability) {
            throw new Error('Disability not found');
        }

        await disability.update(DisabilityData)
        return disability;
    }

    async deleteDisability(DisabilityId) {
        const disability = await Disability.findByPk(DisabilityId);

        if (!disability) {
            throw new Error('disability not found');
        }

        return await Disability.destroy({ where: { id: DisabilityId } });
    }

    async getAllRoles() {
        return await Role.findAll({ order: [['created_at', 'DESC']] });
    }

    async createRole(RoleData) {
        return await Role.create(RoleData);
    }

    async getRoleById(RoleId) {
        const role = await Role.findByPk(RoleId);

        if (!role) {
            throw new Error('role not found');
        }

        return role;
    }

    async updateRole(RoleId, RoleData) {
        const role = await Role.findByPk(RoleId);

        if (!role) {
            throw new Error('Role not found');
        }

        await role.update(RoleData)
        return role;
    }

    async deleteRole(RoleId) {
        const role = await Role.findByPk(RoleId);

        if (!role) {
            throw new Error('Role not found');
        }

        return await Role.destroy({ where: { id: RoleId } });
    }

    async getAllPermissions() {
        return await Permission.findAll({ order: [['created_at', 'DESC']] });
    }

    // async createPermission(PermissionData) {
    //     return await Permission.create(PermissionData);
    // }
    async createPermission(baseData) {
        const actions = ["list", "view", "create", "edit", "delete"];

        const permissionsToInsert = actions.map(action => ({
            name: `${action}_${baseData.name}`,
            label: `${action} ${baseData.label}`,
            group: baseData.group
        }));

        return await Permission.bulkCreate(permissionsToInsert);
    }

    async getPermissionById(PermissionId) {
        const permission = await Permission.findByPk(PermissionId);

        if (!permission) {
            throw new Error('Permission not found');
        }

        return permission;
    }

    async updatePermission(PermissionId, PermissionData) {
        const permission = await Permission.findByPk(PermissionId);

        if (!permission) {
            throw new Error('Permission not found');
        }

        await permission.update(PermissionData)
        return permission;
    }

    async deletePermission(PermissionId) {
        const permission = await Permission.findByPk(PermissionId);

        if (!permission) {
            throw new Error('Permission not found');
        }

        return await Permission.destroy({ where: { id: PermissionId } });
    }

    async getAllTypes() {
        return await Type.findAll({ order: [['created_at', 'DESC']] });
    }

    async createType(TypeData) {
        return await Type.create(TypeData);
    }

    async getTypeById(TypeId) {
        const type = await Type.findByPk(TypeId);

        if (!type) {
            throw new Error('type not found');
        }

        return type;
    }

    async updateType(TypeId, TypeData) {
        const type = await Type.findByPk(TypeId);

        if (!type) {
            throw new Error('type not found');
        }

        await type.update(TypeData)
        return type;
    }

    async deleteType(TypeId) {
        const type = await Type.findByPk(TypeId);

        if (!type) {
            throw new Error('Type not found');
        }

        return await Type.destroy({ where: { id: TypeId } });
    }

    async getAllDesignations() {
        return await Designation.findAll({
            order: [['created_at', 'DESC']], include: [
                { model: Type, attributes: ['name'] }
            ]
        });
    }

    async createDesignation(DesignationData) {
        return await Designation.create(DesignationData);
    }

    async getDesignationById(DesignationId) {
        const designation = await Designation.findByPk(DesignationId);

        if (!designation) {
            throw new Error('Designation not found');
        }

        return designation;
    }

    async updateDesignation(DesignationId, DesignationData) {
        const designation = await Designation.findByPk(DesignationId);

        if (!designation) {
            throw new Error('Designation not found');
        }

        await designation.update(DesignationData)
        return designation;
    }

    async deleteDesignation(DesignationId) {
        const designation = await Designation.findByPk(DesignationId);

        if (!designation) {
            throw new Error('Designation not found');
        }

        return await Designation.destroy({ where: { id: DesignationId } });
    }

    async assignDesignations(staff_id, DesignationsIds) {
        const transaction = await sequelize.transaction(); // Begin transaction

        try {
            // Step 1: Find existing role-permission links
            const existing = await StaffDesignation.findAll({
                where: {
                    staff_id,
                    designation_id: DesignationsIds,
                },
                transaction
            });

            const existingDesignationsIds = new Set(existing.map(d => d.designation_id));
            const newDesignationLinks = [];
            const skippedDesignationsIds = [];

            for (const designation_id of DesignationsIds) {
                if (!existingDesignationsIds.has(designation_id)) {
                    newDesignationLinks.push({ staff_id, designation_id });
                } else {
                    skippedDesignationsIds.push(designation_id);
                }
            }

            // Step 2: Add new Designations
            if (newDesignationLinks.length > 0) {
                await StaffDesignation.bulkCreate(newDesignationLinks, { transaction });
            }

            // Step 3: Remove unlisted Designations
            const allExisting = await StaffDesignation.findAll({
                where: { staff_id },
                transaction
            });

            const newDesignationsIdsSet = new Set(DesignationsIds);
            const DesignationsToRemove = allExisting.filter(d => !newDesignationsIdsSet.has(d.designation_id));

            if (DesignationsToRemove.length > 0) {
                const removeIds = DesignationsToRemove.map(d => d.id);
                await StaffDesignation.destroy({
                    where: { id: removeIds },
                    transaction
                });
                console.log(`[Audit] Removed Designations for Role ${staff_id}:`, DesignationsToRemove.map(d => d.designation_id));
            }

            if (skippedDesignationsIds.length > 0) {
                console.log(`[Audit] Skipped already-assigned Designations for Role ${staff_id}:`, skippedDesignationsIds);
            }

            // Commit the transaction
            await transaction.commit();

            return {
                staff_id,
                addedDesignationsIds: newDesignationLinks.map(d => d.designation_id),
                skippedDesignationsIds,
                removedDesignationsIds: DesignationsToRemove.map(d => d.designation_id)
            };

        } catch (error) {
            // Rollback the transaction on error
            await transaction.rollback();
            console.error(`[Error] Failed to assign Designations to Role ${staff_id}:`, error);
            throw error;
        }
    }

    async assignPermissions(role_id, permissionIds) {
        const transaction = await sequelize.transaction(); // Begin transaction

        try {
            // Step 1: Find existing role-permission links
            const existing = await RolePermission.findAll({
                where: {
                    role_id,
                    permission_id: permissionIds,
                },
                transaction
            });

            const existingPermissionIds = new Set(existing.map(p => p.permission_id));
            const newPermissionLinks = [];
            const skippedPermissionIds = [];

            for (const permission_id of permissionIds) {
                if (!existingPermissionIds.has(permission_id)) {
                    newPermissionLinks.push({ role_id, permission_id });
                } else {
                    skippedPermissionIds.push(permission_id);
                }
            }

            // Step 2: Add new permissions
            if (newPermissionLinks.length > 0) {
                await RolePermission.bulkCreate(newPermissionLinks, { transaction });
            }

            // Step 3: Remove unlisted permissions
            const allExisting = await RolePermission.findAll({
                where: { role_id },
                transaction
            });

            const newPermissionIdsSet = new Set(permissionIds);
            const permissionsToRemove = allExisting.filter(p => !newPermissionIdsSet.has(p.permission_id));

            if (permissionsToRemove.length > 0) {
                const removeIds = permissionsToRemove.map(p => p.id);
                await RolePermission.destroy({
                    where: { id: removeIds },
                    transaction
                });
                console.log(`[Audit] Removed permissions for Role ${role_id}:`, permissionsToRemove.map(p => p.permission_id));
            }

            if (skippedPermissionIds.length > 0) {
                console.log(`[Audit] Skipped already-assigned permissions for Role ${role_id}:`, skippedPermissionIds);
            }

            // Commit the transaction
            await transaction.commit();

            return {
                role_id,
                addedPermissionIds: newPermissionLinks.map(p => p.permission_id),
                skippedPermissionIds,
                removedPermissionIds: permissionsToRemove.map(p => p.permission_id)
            };

        } catch (error) {
            // Rollback the transaction on error
            await transaction.rollback();
            console.error(`[Error] Failed to assign permissions to Role ${role_id}:`, error);
            throw error;
        }
    }

    async getPermissionByRole(roleId) {
        return await RolePermission.findAll({
            where: { role_id: roleId },
            include: [
                {
                    model: Permission,
                    attributes: ['name', 'label', 'group']
                }
            ],
            order: [['created_at', 'DESC']]
        });
    };

    async getPermissionsByRoles(roleIds) {

        return await RolePermission.findAll({
            where: {
                role_id: roleIds,
            },
            include: [
                {
                    model: Permission,
                    attributes: ['id', 'name', 'label', 'group'],
                },
            ],
            order: [['created_at', 'DESC']],
        });
    }

    async getRolesByStaff(staffId) {
        return await StaffRole.findAll({
            where: { staff_id: staffId },
            include: [
                {
                    model: Role,
                    attributes: ['name']
                }
            ],
            order: [['created_at', 'DESC']]
        });
    };

    async assignRole(staff_id, roleIds) {
        const transaction = await sequelize.transaction();

        try {

            const existing = await StaffRole.findAll({
                where: {
                    staff_id,
                    role_id: roleIds,
                },
                transaction
            });

            const existingRoleIds = new Set(existing.map(r => r.role_id));
            const newRoleLinks = [];
            const skippedRoleIds = [];

            for (const role_id of roleIds) {
                if (!existingRoleIds.has(role_id)) {
                    newRoleLinks.push({ staff_id, role_id });
                } else {
                    skippedRoleIds.push(role_id);
                }
            }

            if (newRoleLinks.length > 0) {
                await StaffRole.bulkCreate(newRoleLinks, { transaction });
            }

            const allExisting = await StaffRole.findAll({
                where: { staff_id },
                transaction
            });

            const newRoleIdsSet = new Set(roleIds);
            const RolesToRemove = allExisting.filter(r => !newRoleIdsSet.has(r.role_id));

            if (RolesToRemove.length > 0) {
                const removeIds = RolesToRemove.map(r => r.id);
                await StaffRole.destroy({
                    where: { id: removeIds },
                    transaction
                });
                console.log(`[Audit] Removed Roles for Role ${staff_id}:`, RolesToRemove.map(r => r.role_id));
            }

            if (skippedRoleIds.length > 0) {
                console.log(`[Audit] Skipped already-assigned Roles for Role ${staff_id}:`, skippedRoleIds);
            }

            await transaction.commit();

            return {
                staff_id,
                addedRoleIds: newRoleLinks.map(r => r.role_id),
                skippedRoleIds,
                removedRoleIds: RolesToRemove.map(r => r.role_id)
            };

        } catch (error) {
            await transaction.rollback();
            console.error(`[Error] Failed to assign Roles to Role ${staff_id}:`, error);
            throw error;
        }
    }

    async getAllAttendances() {
        return await StaffAttendance.findAll({
            order: [['date', 'DESC']],
            include: [
                {
                    model: Staff,
                    attributes: ['id', 'first_name', 'last_name', 'form_four_index_no']
                }
            ]
        });
    }

    async getAttendanceById(attendanceId) {
        const attendance = await StaffAttendance.findByPk(attendanceId, {
            include: [
                {
                    model: Staff,
                    attributes: ['id', 'first_name', 'last_name']
                }
            ]
        });

        if (!attendance) {
            throw new Error('Attendance record not found');
        }
        return attendance;
    }

    async deleteAttendance(attendanceId) {
        const attendance = await StaffAttendance.findByPk(attendanceId);

        if (!attendance) {
            throw new Error('Attendance record not found');
        }

        await attendance.destroy();
        return { success: true, message: 'Attendance deleted successfully' };
    }

    async getAttendancesByStaffId(staffId) {
        return await StaffAttendance.findAll({
            where: { staff_id: staffId },
            order: [['date', 'DESC']],
            include: [
                {
                    model: Staff,
                    attributes: ['id', 'first_name', 'last_name']
                }
            ]
        });
    }

    async getAttendanceByDate(date) {
        try {
            const attendances = await StaffAttendance.findAll({
                where: { date },
                include: [
                    {
                        model: Staff,
                        attributes: ['id', 'first_name', 'last_name', 'form_four_index_no']
                    }
                ],
                order: [['created_at', 'ASC']]
            });

            return attendances;
        } catch (error) {
            console.error('Error fetching attendance by date:', error);
            throw error;
        }
    }

    async createAttendances(attendanceArray) {

        console.log('what received in repository: ', attendanceArray);
        const transaction = await sequelize.transaction();

        try {
            const date = attendanceArray[0].date;
            const staffIds = attendanceArray.map(a => a.staff_id);

            const existingAttendances = await StaffAttendance.findAll({
                where: {
                    staff_id: staffIds,
                    date
                },
                transaction
            });

            const existingStaffIds = new Set(existingAttendances.map(a => a.staff_id));
            const newAttendances = [];
            const skippedStaffIds = [];

            for (const record of attendanceArray) {
                if (!existingStaffIds.has(record.staff_id)) {
                    newAttendances.push(record);
                } else {
                    skippedStaffIds.push(record.staff_id);
                }
            }

            if (newAttendances.length > 0) {
                await StaffAttendance.bulkCreate(newAttendances, { transaction });
            }

            await transaction.commit();

            return {
                addedStaffIds: newAttendances.map(a => a.staff_id),
                skippedStaffIds
            };

        } catch (error) {
            await transaction.rollback();
            console.error('Error marking attendance:', error);
            throw error;
        }
    }

    async getAttendanceSummary() {
        return await StaffAttendance.findAll({
            attributes: [
                'date',
                [sequelize.fn('COUNT', sequelize.col('staff_id')), 'staffCount'],
                [sequelize.fn('ARRAY_AGG', sequelize.col('id')), 'ids'] // collect all IDs
            ],
            group: ['date'],
            order: [['date', 'DESC']]
        });
    }

}

module.exports = StaffRepository