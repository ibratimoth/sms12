const StaffRepository = require('../repositories/staffRepository');
const HashHelper = require('../helper/hashHelper');
const tokenUtil = require('../utils/generateTokens');

class StaffServices {
    constructor() {
        this.staffRepository = new StaffRepository();
        this.hashHelper = new HashHelper();
        this.tokenUtil = new tokenUtil();
    }

    async getAllStaffs() {
        try {
            const results = await this.staffRepository.getAllStaffs();

            if (results.length > 0) {
                return { success: true, message: 'Staff fetched successfully', data: results }
            }

            return { success: true, message: 'No Staff found', data: [] }
        } catch (error) {
            console.log('erorr while fetching:', error);
            return { success: false, message: 'erorr while fetching', error: error }
        }

    }

    async createStaff(StaffData) {
        try {

            const { form_four_index_no, first_name, last_name, email, dob, mobile_number, gender_id, disability_id, password } = StaffData;

            const existingUser = await this.staffRepository.getStaffByEmail(email);
            if (existingUser) {
                return { success: false, message: 'User with this email already exists' };
            }

            const hashedPassword = await this.hashHelper.hashPassword(password);

            const results = await this.staffRepository.createStaff({ form_four_index_no, first_name, last_name, email, dob, mobile_number, gender_id, disability_id, password: hashedPassword });

            if (results) {
                return { success: true, message: 'Staff created successfully', data: results }
            }

            return { success: false, message: 'Staff was not created', data: null }
        } catch (error) {
            console.log('erorr while creating:', error);
            return { success: false, message: 'erorr while creating', error: error }
        }

    }

    async getStaffById(StaffId) {
        try {
            const results = await this.staffRepository.getStaffById(StaffId);

            return { success: true, message: 'Staffs fetched successfully', data: results }

        } catch (error) {
            console.log('erorr while fetching:', error);
            return { success: false, message: 'Staff not found', error: error }
        }

    }

    async deleteStaff(StaffId) {
        try {
            const results = await this.staffRepository.deleteStaff(StaffId);

            if (results) {
                return { success: true, message: 'Staff deleted successfully', data: results }
            }

            return { success: false, message: 'Failed to delete Staff data', data: null }
        } catch (error) {
            console.log('erorr while deleting:', error);
            return { success: false, message: 'erorr while deleting', error: error }
        }
    }

    async updateStaff(StaffId, StaffData) {
        try {

            const currentUser = await this.staffRepository.getStaffById(StaffId);
            if (!currentUser) {
                return { success: false, message: 'User not found' };
            }

            if (!StaffData.password || StaffData.password.trim() === '') {
                StaffData.password = currentUser.password;
            } else {
                StaffData.password = await this.hashHelper.hashPassword(StaffData.password);
            }

            const results = await this.staffRepository.updateStaff(StaffId, StaffData);

            if (results) {
                return { success: true, message: 'Staff updated successfully', data: results }
            }

            return { success: true, message: 'Failed to update Staff data', data: null }
        } catch (error) {
            console.log('erorr while updating:', error);
            return { success: false, message: 'erorr while updating', error: error }
        }
    }

    async loginStaff(email, password, res) {
        const user = await this.staffRepository.getStaffByEmail(email);

        if (!user) {
            return { success: false, message: 'Invalid email' };
        }

        const isPasswordValid = await this.hashHelper.comparePassword(password, user.password);

        if (!isPasswordValid) {
            return { success: false, message: 'Invalid password' };
        }

        const { accessToken, refreshToken } = await this.tokenUtil.generateTokensAndSetCookies(res, user.id);


        const userResponse = {
            id: user.id,
            first_name: user.first_name,
            email: user.email,
            mobile_number: user.mobile_number,
            last_name: user.last_name,
        };

        return { success: true, user: userResponse, accessToken, refreshToken };
    }

    async getAllDisabilities() {
        try {
            const results = await this.staffRepository.getAllDisabilities();

            if (results.length > 0) {
                return { success: true, message: 'Disability fetched successfully', data: results }
            }

            return { success: true, message: 'No Disability found', data: [] }
        } catch (error) {
            console.log('erorr while fetching:', error);
            return { success: false, message: 'erorr while fetching', error: error }
        }

    }

    async createDisability(DisabilityData) {
        try {
            const results = await this.staffRepository.createDisability(DisabilityData);

            if (results) {
                return { success: true, message: 'Disability created successfully', data: results }
            }

            return { success: false, message: 'Disability was not created', data: null }
        } catch (error) {
            console.log('erorr while creating:', error);
            return { success: false, message: 'erorr while creating', error: error }
        }

    }

    async getDisabilityById(DisabilityId) {
        try {
            const results = await this.staffRepository.getDisabilityById(DisabilityId);

            return { success: true, message: 'Disabilitys fetched successfully', data: results }

        } catch (error) {
            console.log('erorr while fetching:', error);
            return { success: false, message: 'Disability not found', error: error }
        }

    }

    async deleteDisability(DisabilityId) {
        try {
            const results = await this.staffRepository.deleteDisability(DisabilityId);

            if (results) {
                return { success: true, message: 'Disability deleted successfully', data: results }
            }

            return { success: false, message: 'Failed to delete Disability data', data: null }
        } catch (error) {
            console.log('erorr while deleting:', error);
            return { success: false, message: 'erorr while deleting', error: error }
        }
    }

    async updateDisability(DisabilityId, DisabilityData) {
        try {
            const results = await this.staffRepository.updateDisability(DisabilityId, DisabilityData);

            if (results) {
                return { success: true, message: 'Disability updated successfully', data: results }
            }

            return { success: true, message: 'Failed to update Disability data', data: null }
        } catch (error) {
            console.log('erorr while updating:', error);
            return { success: false, message: 'erorr while updating', error: error }
        }
    }

    async getAllRoles() {
        try {
            const results = await this.staffRepository.getAllRoles();

            if (results.length > 0) {
                return { success: true, message: 'Role fetched successfully', data: results }
            }

            return { success: true, message: 'No Role found', data: [] }
        } catch (error) {
            console.log('erorr while fetching:', error);
            return { success: false, message: 'erorr while fetching', error: error }
        }

    }

    async createRole(RoleData) {
        try {
            const results = await this.staffRepository.createRole(RoleData);

            if (results) {
                return { success: true, message: 'Role created successfully', data: results }
            }

            return { success: false, message: 'Role was not created', data: null }
        } catch (error) {
            console.log('erorr while creating:', error);
            return { success: false, message: 'erorr while creating', error: error }
        }

    }

    async getRoleById(RoleId) {
        try {
            const results = await this.staffRepository.getRoleById(RoleId);

            return { success: true, message: 'Roles fetched successfully', data: results }

        } catch (error) {
            console.log('erorr while fetching:', error);
            return { success: false, message: 'Role not found', error: error }
        }

    }

    async deleteRole(RoleId) {
        try {
            const results = await this.staffRepository.deleteRole(RoleId);

            if (results) {
                return { success: true, message: 'Role deleted successfully', data: results }
            }

            return { success: false, message: 'Failed to delete Role data', data: null }
        } catch (error) {
            console.log('erorr while deleting:', error);
            return { success: false, message: 'erorr while deleting', error: error }
        }
    }

    async updateRole(RoleId, RoleData) {
        try {
            const results = await this.staffRepository.updateRole(RoleId, RoleData);

            if (results) {
                return { success: true, message: 'Role updated successfully', data: results }
            }

            return { success: true, message: 'Failed to update Role data', data: null }
        } catch (error) {
            console.log('erorr while updating:', error);
            return { success: false, message: 'erorr while updating', error: error }
        }
    }

    async getAllPermissions() {
        try {
            const results = await this.staffRepository.getAllPermissions();

            if (results.length > 0) {
                return { success: true, message: 'Permission fetched successfully', data: results }
            }

            return { success: true, message: 'No Permission found', data: [] }
        } catch (error) {
            console.log('erorr while fetching:', error);
            return { success: false, message: 'erorr while fetching', error: error }
        }

    }

    async createPermission(PermissionData) {
        try {
            const results = await this.staffRepository.createPermission(PermissionData);

            if (results) {
                return { success: true, message: 'Permission created successfully', data: results }
            }

            return { success: false, message: 'Permission was not created', data: null }
        } catch (error) {
            console.log('erorr while creating:', error);
            return { success: false, message: 'erorr while creating', error: error }
        }

    }

    async getPermissionById(PermissionId) {
        try {
            const results = await this.staffRepository.getPermissionById(PermissionId);

            return { success: true, message: 'Permissions fetched successfully', data: results }

        } catch (error) {
            console.log('erorr while fetching:', error);
            return { success: false, message: 'Permission not found', error: error }
        }

    }

    async deletePermission(PermissionId) {
        try {
            const results = await this.staffRepository.deletePermission(PermissionId);

            if (results) {
                return { success: true, message: 'Permission deleted successfully', data: results }
            }

            return { success: false, message: 'Failed to delete Permission data', data: null }
        } catch (error) {
            console.log('erorr while deleting:', error);
            return { success: false, message: 'erorr while deleting', error: error }
        }
    }

    async updatePermission(PermissionId, PermissionData) {
        try {
            const results = await this.staffRepository.updatePermission(PermissionId, PermissionData);

            if (results) {
                return { success: true, message: 'Permission updated successfully', data: results }
            }

            return { success: true, message: 'Failed to update Permission data', data: null }
        } catch (error) {
            console.log('erorr while updating:', error);
            return { success: false, message: 'erorr while updating', error: error }
        }
    }

    async getAllTypes() {
        try {
            const results = await this.staffRepository.getAllTypes();

            if (results.length > 0) {
                return { success: true, message: 'Type fetched successfully', data: results }
            }

            return { success: true, message: 'No Type found', data: [] }
        } catch (error) {
            console.log('erorr while fetching:', error);
            return { success: false, message: 'erorr while fetching', error: error }
        }

    }

    async createType(TypeData) {
        try {
            const results = await this.staffRepository.createType(TypeData);

            if (results) {
                return { success: true, message: 'Type created successfully', data: results }
            }

            return { success: false, message: 'Type was not created', data: null }
        } catch (error) {
            console.log('erorr while creating:', error);
            return { success: false, message: 'erorr while creating', error: error }
        }

    }

    async getTypeById(TypeId) {
        try {
            const results = await this.staffRepository.getTypeById(TypeId);

            return { success: true, message: 'Types fetched successfully', data: results }

        } catch (error) {
            console.log('erorr while fetching:', error);
            return { success: false, message: 'Type not found', error: error }
        }

    }

    async deleteType(TypeId) {
        try {
            const results = await this.staffRepository.deleteType(TypeId);

            if (results) {
                return { success: true, message: 'Type deleted successfully', data: results }
            }

            return { success: false, message: 'Failed to delete Type data', data: null }
        } catch (error) {
            console.log('erorr while deleting:', error);
            return { success: false, message: 'erorr while deleting', error: error }
        }
    }

    async updateType(TypeId, TypeData) {
        try {
            const results = await this.staffRepository.updateType(TypeId, TypeData);

            if (results) {
                return { success: true, message: 'Type updated successfully', data: results }
            }

            return { success: true, message: 'Failed to update Type data', data: null }
        } catch (error) {
            console.log('erorr while updating:', error);
            return { success: false, message: 'erorr while updating', error: error }
        }
    }

    async getAllDesignations() {
        try {
            const results = await this.staffRepository.getAllDesignations();

            if (results.length > 0) {
                return { success: true, message: 'Designation fetched successfully', data: results }
            }

            return { success: true, message: 'No Designation found', data: [] }
        } catch (error) {
            console.log('erorr while fetching:', error);
            return { success: false, message: 'erorr while fetching', error: error }
        }

    }

    async createDesignation(DesignationData) {
        try {
            const results = await this.staffRepository.createDesignation(DesignationData);

            if (results) {
                return { success: true, message: 'Designation created successfully', data: results }
            }

            return { success: false, message: 'Designation was not created', data: null }
        } catch (error) {
            console.log('erorr while creating:', error);
            return { success: false, message: 'erorr while creating', error: error }
        }

    }

    async getDesignationById(DesignationId) {
        try {
            const results = await this.staffRepository.getDesignationById(DesignationId);

            return { success: true, message: 'Designations fetched successfully', data: results }

        } catch (error) {
            console.log('erorr while fetching:', error);
            return { success: false, message: 'Designation not found', error: error }
        }

    }

    async deleteDesignation(DesignationId) {
        try {
            const results = await this.staffRepository.deleteDesignation(DesignationId);

            if (results) {
                return { success: true, message: 'Designation deleted successfully', data: results }
            }

            return { success: false, message: 'Failed to delete Designation data', data: null }
        } catch (error) {
            console.log('erorr while deleting:', error);
            return { success: false, message: 'erorr while deleting', error: error }
        }
    }

    async updateDesignation(DesignationId, DesignationData) {
        try {
            const results = await this.staffRepository.updateDesignation(DesignationId, DesignationData);

            if (results) {
                return { success: true, message: 'Designation updated successfully', data: results }
            }

            return { success: true, message: 'Failed to update Designation data', data: null }
        } catch (error) {
            console.log('erorr while updating:', error);
            return { success: false, message: 'erorr while updating', error: error }
        }
    }

    async assignDesignations(staff_id, DesignationIds) {
        try {
            const staffDesignations = await this.staffRepository.assignDesignations(staff_id, DesignationIds);
            if (staffDesignations.addedDesignationsIds.length > 0) {
                return { success: true, message: 'staffDesignations assigned successfully', data: staffDesignations };
            }

            console.log('staffDesignations:', staffDesignations);
            return { success: true, message: 'staffDesignations already assigned', data: staffDesignations };
        } catch (error) {
            console.log('error:', error);
            return { success: false, message: 'Error assigning staffDesignations', error };
        }
    }

    async assignPermissions(roleId, permissionIds) {
        try {
            const rolesPermission = await this.staffRepository.assignPermissions(roleId, permissionIds);
            if (rolesPermission.addedPermissionIds.length > 0) {
                return { success: true, message: 'RolesPermission assigned successfully', data: rolesPermission };
            }

            console.log('rolesPermission:', rolesPermission);
            return { success: true, message: 'RolesPermission already assigned', data: rolesPermission };
        } catch (error) {
            console.log('error:', error);
            return { success: false, message: 'Error assigning RolesPermission', error };
        }
    }

    async getPermissionByRole(roleId) {
        try {
            const permission = await this.staffRepository.getPermissionByRole(roleId);
            if (permission) {
                return { success: true, data: permission };
            }
            return { success: false, message: 'Permission not found' };
        } catch (error) {
            return { success: false, message: 'Error getting Permission by Id', error };
        }
    };

    async getPermissionsByRoles(roleIds) {
        try {
            const permission = await this.staffRepository.getPermissionsByRoles(roleIds);
            if (permission) {
                return { success: true, data: permission };
            }
            return { success: false, message: 'Permission not found' };
        } catch (error) {
            return { success: false, message: 'Error getting Permission by Id', error };
        }
    };

    async getRolesByStaff(staffId) {
        try {
            const role = await this.staffRepository.getRolesByStaff(staffId);
            if (role) {
                return { success: true, data: role };
            }
            return { success: false, message: 'role not found' };
        } catch (error) {
            return { success: false, message: 'Error getting role by Id', error };
        }
    };

    async assignRoles(staff_id, roleIds) {
        try {
            const staffRoles = await this.staffRepository.assignRole(staff_id, roleIds);
            if (staffRoles.addedRoleIds.length > 0) {
                return { success: true, message: 'staffRoles assigned successfully', data: staffRoles };
            }

            console.log('staffRoles:', staffRoles);
            return { success: true, message: 'staffRoles already assigned', data: staffRoles };
        } catch (error) {
            console.log('error:', error);
            return { success: false, message: 'Error assigning staffRoles', error };
        }
    }

    async getAllAttendances() {
        try {
            const results = await this.staffRepository.getAllAttendances();

            if (results.length > 0) {
                return { success: true, message: 'Attendances fetched successfully', data: results };
            }

            return { success: true, message: 'No attendance records found', data: [] };
        } catch (error) {
            console.error('Error while fetching attendances:', error);
            return { success: false, message: 'Error while fetching attendances', error };
        }
    }

    async createAttendances(attendanceArray) {
        try {
            // Just call repository directly with array
            const results = await this.staffRepository.createAttendances(attendanceArray);
            return {
                success: true,
                message: 'Attendances created successfully',
                data: results
            };
        } catch (error) {
            console.error('Error while creating bulk attendances:', error);
            return { success: false, message: 'Error while creating bulk attendances', error };
        }
    }

    async getAttendanceById(attendanceId) {
        try {
            const result = await this.staffRepository.getAttendanceById(attendanceId);
            if (!result) return { success: false, message: 'Attendance not found' };

            return { success: true, message: 'Attendance fetched successfully', data: result };
        } catch (error) {
            console.error('Error while fetching attendance by ID:', error);
            return { success: false, message: 'Error while fetching attendance', error };
        }
    }

    async getAttendanceByDate(date) {
        try {
            const results = await this.staffRepository.getAttendanceByDate(date);

            if (results.length > 0) {
                return { success: true, message: 'Attendances fetched successfully', data: results };
            }

            return { success: true, message: 'No attendance records found for this date', data: [] };
        } catch (error) {
            console.error('Error while fetching attendances by date:', error);
            return { success: false, message: 'Error while fetching attendances', error };
        }
    }

    async deleteAttendance(attendanceId) {
        try {
            const result = await this.staffRepository.deleteAttendance(attendanceId);
            if (!result) return { success: false, message: 'Attendance not found' };

            return { success: true, message: 'Attendance deleted successfully', data: result };
        } catch (error) {
            console.error('Error while deleting attendance:', error);
            return { success: false, message: 'Error while deleting attendance', error };
        }
    }

    async getAttendanceSummary() {
        try {
            const results = await this.staffRepository.getAttendanceSummary();
            return { success: true, data: results, message: 'Attendance summary fetched successfully' };
        } catch (error) {
            console.error('Error fetching attendance summary:', error);
            return { success: false, message: 'Failed to fetch attendance summary', error };
        }
    }

}

module.exports = StaffServices;