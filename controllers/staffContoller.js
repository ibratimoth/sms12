const StaffServices = require('../services/staffServices');
const redisClient = require('../config/redis');

class StaffController {

    constructor() {
        this.staffServices = new StaffServices();
    }

    async getAllStaffs(req, res) {
        try {
            const results = await this.staffServices.getAllStaffs();

            if (!results.success) {
                return res.status(500).json({
                    status: 500,
                    success: results.success,
                    message: results.message,
                    error: results.error
                })
            }

            if (results.success && results.data.length === 0) {
                return res.status(200).json({
                    status: 200,
                    success: results.success,
                    message: results.message,
                    data: results.data
                })
            }

            return res.status(200).json({
                status: 200,
                success: results.success,
                message: results.message,
                data: results.data
            })
        } catch (error) {
            console.log('error:', error);
            return res.status(500).json({
                status: 500,
                success: results.success,
                message: results.message,
                error: results.error
            })
        }
    }

    async getStaffById(req, res) {
        try {
            const { StaffId } = req.params

            if (!StaffId) {
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: 'StaffId is missing',
                })
            }
            const results = await this.staffServices.getStaffById(StaffId);

            if (!results.success) {
                return res.status(500).json({
                    status: 500,
                    success: results.success,
                    message: results.message,
                    error: results.error
                })
            }

            return res.status(200).json({
                status: 200,
                success: results.success,
                message: results.message,
                data: results.data
            })
        } catch (error) {
            console.log('error:', error);
            return res.status(500).json({
                status: 500,
                success: results.success,
                message: results.message,
                error: results.error
            })
        }
    }

    async createStaff(req, res) {
        try {

            const { form_four_index_no, first_name, last_name, email, dob, mobile_number, gender_id, disability_id, password } = req.body

            if (!form_four_index_no || !first_name || !last_name || !email || !dob || !mobile_number || !gender_id || !password) {
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: 'All field should be filled',
                })
            }

            const StaffData = {
                form_four_index_no, first_name, last_name, email, dob, mobile_number, gender_id, disability_id, password
            }
            const results = await this.staffServices.createStaff(StaffData);

            if (!results.success) {
                return res.status(500).json({
                    status: 500,
                    success: results.success,
                    message: results.message,
                    error: results.error
                })
            }

            if (!results.success && results.data === null) {
                return res.status(400).json({
                    status: 400,
                    success: results.success,
                    message: results.message,
                    data: results.data
                })
            }

            return res.status(200).json({
                status: 200,
                success: results.success,
                message: results.message,
                data: results.data
            })
        } catch (error) {
            console.log('error:', error);
            return res.status(500).json({
                status: 500,
                success: results.success,
                message: results.message,
                error: results.error
            })
        }
    }

    async deleteStaff(req, res) {
        try {
            const { StaffId } = req.params

            if (!StaffId) {
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: 'StaffId is missing',
                })
            }
            const results = await this.staffServices.deleteStaff(StaffId);

            if (!results.success) {
                return res.status(500).json({
                    status: 500,
                    success: results.success,
                    message: results.message,
                    error: results.error
                })
            }

            if (!results.success && results.data === null) {
                return res.status(400).json({
                    status: 400,
                    success: results.success,
                    message: results.message,
                    data: results.data
                })
            }

            return res.status(200).json({
                status: 200,
                success: results.success,
                message: results.message,
                data: results.data
            })
        } catch (error) {
            console.log('error:', error);
            return res.status(500).json({
                status: 500,
                success: results.success,
                message: results.message,
                error: results.error
            })
        }
    }

    async updateStaff(req, res) {
        try {
            const { form_four_index_no, first_name, last_name, email, dob, mobile_number, gender_id, disability_id, password } = req.body

            const { StaffId } = req.params

            if (!StaffId || !form_four_index_no || !first_name || !last_name || !email || !dob || !mobile_number || !gender_id) {
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: 'All field should be filled',
                })
            }

            const StaffData = {
                form_four_index_no, first_name, last_name, email, dob, mobile_number, gender_id, disability_id
            }
            const results = await this.staffServices.updateStaff(StaffId, StaffData);

            if (!results.success) {
                return res.status(500).json({
                    status: 500,
                    success: results.success,
                    message: results.message,
                    error: results.error
                })
            }

            if (results.success && results.data === null) {
                return res.status(400).json({
                    status: 400,
                    success: results.success,
                    message: results.message,
                    data: results.data
                })
            }

            return res.status(200).json({
                status: 200,
                success: results.success,
                message: results.message,
                data: results.data
            })
        } catch (error) {
            console.log('error:', error);
            return res.status(500).json({
                status: 500,
                success: results.success,
                message: results.message,
                error: results.error
            })
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;

            const { success, user, accessToken, refreshToken, message } = await this.staffServices.loginStaff(email, password, res);

            if (!success) {
                return res.status(400).json({
                    success: false,
                    status: 400,
                    message: message,
                    data: []
                })
            }

            req.session.staffId = user.id;
            req.session.staffEmail = user.email;
            user.id = undefined;
            req.session.phone = user.mobile_number
            req.session.lastname = user.last_name

            return res.status(200).json({
                success: true,
                status: 200,
                message: message,
                data: { user, accessToken, refreshToken }
            })

        } catch (error) {
            console.error('Error during login:', error);
            return res.status(500).json({
                success: false,
                status: 500,
                message: message,
                data: []
            })

        }
    }

    async getAllDisabilities(req, res) {
        try {
            const results = await this.staffServices.getAllDisabilities();

            if (!results.success) {
                return res.status(500).json({
                    status: 500,
                    success: results.success,
                    message: results.message,
                    error: results.error
                })
            }

            if (results.success && results.data.length === 0) {
                return res.status(200).json({
                    status: 200,
                    success: results.success,
                    message: results.message,
                    data: results.data
                })
            }

            return res.status(200).json({
                status: 200,
                success: results.success,
                message: results.message,
                data: results.data
            })
        } catch (error) {
            console.log('error:', error);
            return res.status(500).json({
                status: 500,
                success: results.success,
                message: results.message,
                error: results.error
            })
        }
    }

    async getDisabilityById(req, res) {
        try {
            const { DisabilityId } = req.params

            if (!DisabilityId) {
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: 'DisabilityId is missing',
                })
            }
            const results = await this.staffServices.getDisabilityById(DisabilityId);

            if (!results.success) {
                return res.status(500).json({
                    status: 500,
                    success: results.success,
                    message: results.message,
                    error: results.error
                })
            }

            return res.status(200).json({
                status: 200,
                success: results.success,
                message: results.message,
                data: results.data
            })
        } catch (error) {
            console.log('error:', error);
            return res.status(500).json({
                status: 500,
                success: results.success,
                message: results.message,
                error: results.error
            })
        }
    }

    async createDisability(req, res) {
        try {

            const { name } = req.body

            if (!name) {
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: 'All field should be filled',
                })
            }

            const DisabilityData = {
                name
            }
            const results = await this.staffServices.createDisability(DisabilityData);

            if (!results.success) {
                return res.status(500).json({
                    status: 500,
                    success: results.success,
                    message: results.message,
                    error: results.error
                })
            }

            if (!results.success && results.data === null) {
                return res.status(400).json({
                    status: 400,
                    success: results.success,
                    message: results.message,
                    data: results.data
                })
            }

            return res.status(200).json({
                status: 200,
                success: results.success,
                message: results.message,
                data: results.data
            })
        } catch (error) {
            console.log('error:', error);
            return res.status(500).json({
                status: 500,
                success: results.success,
                message: results.message,
                error: results.error
            })
        }
    }

    async deleteDisability(req, res) {
        try {
            const { DisabilityId } = req.params

            if (!DisabilityId) {
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: 'DisabilityId is missing',
                })
            }
            const results = await this.staffServices.deleteDisability(DisabilityId);

            if (!results.success) {
                return res.status(500).json({
                    status: 500,
                    success: results.success,
                    message: results.message,
                    error: results.error
                })
            }

            if (!results.success && results.data === null) {
                return res.status(400).json({
                    status: 400,
                    success: results.success,
                    message: results.message,
                    data: results.data
                })
            }

            return res.status(200).json({
                status: 200,
                success: results.success,
                message: results.message,
                data: results.data
            })
        } catch (error) {
            console.log('error:', error);
            return res.status(500).json({
                status: 500,
                success: results.success,
                message: results.message,
                error: results.error
            })
        }
    }

    async updateDisability(req, res) {
        try {
            const { name } = req.body
            const { DisabilityId } = req.params

            if (!name || !DisabilityId) {
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: 'All field should be filled',
                })
            }

            const DisabilityData = {
                name
            }
            const results = await this.staffServices.updateDisability(DisabilityId, DisabilityData);

            if (!results.success) {
                return res.status(500).json({
                    status: 500,
                    success: results.success,
                    message: results.message,
                    error: results.error
                })
            }

            if (results.success && results.data === null) {
                return res.status(400).json({
                    status: 400,
                    success: results.success,
                    message: results.message,
                    data: results.data
                })
            }

            return res.status(200).json({
                status: 200,
                success: results.success,
                message: results.message,
                data: results.data
            })
        } catch (error) {
            console.log('error:', error);
            return res.status(500).json({
                status: 500,
                success: results.success,
                message: results.message,
                error: results.error
            })
        }
    }

    async getAllRoles(req, res) {
        try {
            const results = await this.staffServices.getAllRoles();

            if (!results.success) {
                return res.status(500).json({
                    status: 500,
                    success: results.success,
                    message: results.message,
                    error: results.error
                })
            }

            if (results.success && results.data.length === 0) {
                return res.status(200).json({
                    status: 200,
                    success: results.success,
                    message: results.message,
                    data: results.data
                })
            }

            return res.status(200).json({
                status: 200,
                success: results.success,
                message: results.message,
                data: results.data
            })
        } catch (error) {
            console.log('error:', error);
            return res.status(500).json({
                status: 500,
                success: results.success,
                message: results.message,
                error: results.error
            })
        }
    }

    async getRoleById(req, res) {
        try {
            const { RoleId } = req.params

            if (!RoleId) {
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: 'RoleId is missing',
                })
            }
            const results = await this.staffServices.getRoleById(RoleId);

            if (!results.success) {
                return res.status(500).json({
                    status: 500,
                    success: results.success,
                    message: results.message,
                    error: results.error
                })
            }

            return res.status(200).json({
                status: 200,
                success: results.success,
                message: results.message,
                data: results.data
            })
        } catch (error) {
            console.log('error:', error);
            return res.status(500).json({
                status: 500,
                success: results.success,
                message: results.message,
                error: results.error
            })
        }
    }

    async createRole(req, res) {
        try {

            const { name } = req.body

            if (!name) {
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: 'All field should be filled',
                })
            }

            const RoleData = {
                name
            }
            const results = await this.staffServices.createRole(RoleData);

            if (!results.success) {
                return res.status(500).json({
                    status: 500,
                    success: results.success,
                    message: results.message,
                    error: results.error
                })
            }

            if (!results.success && results.data === null) {
                return res.status(400).json({
                    status: 400,
                    success: results.success,
                    message: results.message,
                    data: results.data
                })
            }

            return res.status(200).json({
                status: 200,
                success: results.success,
                message: results.message,
                data: results.data
            })
        } catch (error) {
            console.log('error:', error);
            return res.status(500).json({
                status: 500,
                success: results.success,
                message: results.message,
                error: results.error
            })
        }
    }

    async deleteRole(req, res) {
        try {
            const { RoleId } = req.params

            if (!RoleId) {
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: 'RoleId is missing',
                })
            }
            const results = await this.staffServices.deleteRole(RoleId);

            if (!results.success) {
                return res.status(500).json({
                    status: 500,
                    success: results.success,
                    message: results.message,
                    error: results.error
                })
            }

            if (!results.success && results.data === null) {
                return res.status(400).json({
                    status: 400,
                    success: results.success,
                    message: results.message,
                    data: results.data
                })
            }

            return res.status(200).json({
                status: 200,
                success: results.success,
                message: results.message,
                data: results.data
            })
        } catch (error) {
            console.log('error:', error);
            return res.status(500).json({
                status: 500,
                success: results.success,
                message: results.message,
                error: results.error
            })
        }
    }

    async updateRole(req, res) {
        try {
            const { name } = req.body
            const { RoleId } = req.params

            if (!name || !RoleId) {
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: 'All field should be filled',
                })
            }

            const RoleData = {
                name
            }
            const results = await this.staffServices.updateRole(RoleId, RoleData);

            if (!results.success) {
                return res.status(500).json({
                    status: 500,
                    success: results.success,
                    message: results.message,
                    error: results.error
                })
            }

            if (results.success && results.data === null) {
                return res.status(400).json({
                    status: 400,
                    success: results.success,
                    message: results.message,
                    data: results.data
                })
            }

            return res.status(200).json({
                status: 200,
                success: results.success,
                message: results.message,
                data: results.data
            })
        } catch (error) {
            console.log('error:', error);
            return res.status(500).json({
                status: 500,
                success: results.success,
                message: results.message,
                error: results.error
            })
        }
    }

    async getAllPermissions(req, res) {
        try {
            const results = await this.staffServices.getAllPermissions();

            if (!results.success) {
                return res.status(500).json({
                    status: 500,
                    success: results.success,
                    message: results.message,
                    error: results.error
                })
            }

            if (results.success && results.data.length === 0) {
                return res.status(200).json({
                    status: 200,
                    success: results.success,
                    message: results.message,
                    data: results.data
                })
            }

            return res.status(200).json({
                status: 200,
                success: results.success,
                message: results.message,
                data: results.data
            })
        } catch (error) {
            console.log('error:', error);
            return res.status(500).json({
                status: 500,
                success: results.success,
                message: results.message,
                error: results.error
            })
        }
    }

    async getPermissionById(req, res) {
        try {
            const { PermissionId } = req.params

            if (!PermissionId) {
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: 'PermissionId is missing',
                })
            }
            const results = await this.staffServices.getPermissionById(PermissionId);

            if (!results.success) {
                return res.status(500).json({
                    status: 500,
                    success: results.success,
                    message: results.message,
                    error: results.error
                })
            }

            return res.status(200).json({
                status: 200,
                success: results.success,
                message: results.message,
                data: results.data
            })
        } catch (error) {
            console.log('error:', error);
            return res.status(500).json({
                status: 500,
                success: results.success,
                message: results.message,
                error: results.error
            })
        }
    }

    async createPermission(req, res) {
        try {

            const { name, label, group } = req.body

            if (!name || !label || !group) {
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: 'All field should be filled',
                })
            }

            const PermissionData = {
                name, label, group
            }

            const results = await this.staffServices.createPermission(PermissionData);

            if (!results.success) {
                return res.status(500).json({
                    status: 500,
                    success: results.success,
                    message: results.message,
                    error: results.error
                })
            }

            if (!results.success && results.data === null) {
                return res.status(400).json({
                    status: 400,
                    success: results.success,
                    message: results.message,
                    data: results.data
                })
            }

            return res.status(200).json({
                status: 200,
                success: results.success,
                message: results.message,
                data: results.data
            })
        } catch (error) {
            console.log('error:', error);
            return res.status(500).json({
                status: 500,
                success: results.success,
                message: results.message,
                error: results.error
            })
        }
    }

    async deletePermission(req, res) {
        try {
            const { PermissionId } = req.params

            if (!PermissionId) {
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: 'PermissionId is missing',
                })
            }
            const results = await this.staffServices.deletePermission(PermissionId);

            if (!results.success) {
                return res.status(500).json({
                    status: 500,
                    success: results.success,
                    message: results.message,
                    error: results.error
                })
            }

            if (!results.success && results.data === null) {
                return res.status(400).json({
                    status: 400,
                    success: results.success,
                    message: results.message,
                    data: results.data
                })
            }

            return res.status(200).json({
                status: 200,
                success: results.success,
                message: results.message,
                data: results.data
            })
        } catch (error) {
            console.log('error:', error);
            return res.status(500).json({
                status: 500,
                success: results.success,
                message: results.message,
                error: results.error
            })
        }
    }

    async updatePermission(req, res) {
        try {
            const { name, label, group } = req.body
            const { PermissionId } = req.params

            if (!name || !label || !group || !PermissionId) {
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: 'All field should be filled',
                })
            }

            const PermissionData = {
                name, label, group
            }
            const results = await this.staffServices.updatePermission(PermissionId, PermissionData);

            if (!results.success) {
                return res.status(500).json({
                    status: 500,
                    success: results.success,
                    message: results.message,
                    error: results.error
                })
            }

            if (results.success && results.data === null) {
                return res.status(400).json({
                    status: 400,
                    success: results.success,
                    message: results.message,
                    data: results.data
                })
            }

            return res.status(200).json({
                status: 200,
                success: results.success,
                message: results.message,
                data: results.data
            })
        } catch (error) {
            console.log('error:', error);
            return res.status(500).json({
                status: 500,
                success: results.success,
                message: results.message,
                error: results.error
            })
        }
    }

    async getAllTypes(req, res) {
        try {
            const results = await this.staffServices.getAllTypes();

            if (!results.success) {
                return res.status(500).json({
                    status: 500,
                    success: results.success,
                    message: results.message,
                    error: results.error
                })
            }

            if (results.success && results.data.length === 0) {
                return res.status(200).json({
                    status: 200,
                    success: results.success,
                    message: results.message,
                    data: results.data
                })
            }

            return res.status(200).json({
                status: 200,
                success: results.success,
                message: results.message,
                data: results.data
            })
        } catch (error) {
            console.log('error:', error);
            return res.status(500).json({
                status: 500,
                success: results.success,
                message: results.message,
                error: results.error
            })
        }
    }

    async getTypeById(req, res) {
        try {
            const { TypeId } = req.params

            if (!TypeId) {
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: 'TypeId is missing',
                })
            }
            const results = await this.staffServices.getTypeById(TypeId);

            if (!results.success) {
                return res.status(500).json({
                    status: 500,
                    success: results.success,
                    message: results.message,
                    error: results.error
                })
            }

            return res.status(200).json({
                status: 200,
                success: results.success,
                message: results.message,
                data: results.data
            })
        } catch (error) {
            console.log('error:', error);
            return res.status(500).json({
                status: 500,
                success: results.success,
                message: results.message,
                error: results.error
            })
        }
    }

    async createType(req, res) {
        try {

            const { name } = req.body

            if (!name) {
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: 'All field should be filled',
                })
            }

            const TypeData = {
                name
            }

            const results = await this.staffServices.createType(TypeData);

            if (!results.success) {
                return res.status(500).json({
                    status: 500,
                    success: results.success,
                    message: results.message,
                    error: results.error
                })
            }

            if (!results.success && results.data === null) {
                return res.status(400).json({
                    status: 400,
                    success: results.success,
                    message: results.message,
                    data: results.data
                })
            }

            return res.status(200).json({
                status: 200,
                success: results.success,
                message: results.message,
                data: results.data
            })
        } catch (error) {
            console.log('error:', error);
            return res.status(500).json({
                status: 500,
                success: results.success,
                message: results.message,
                error: results.error
            })
        }
    }

    async deleteType(req, res) {
        try {
            const { TypeId } = req.params

            if (!TypeId) {
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: 'TypeId is missing',
                })
            }
            const results = await this.staffServices.deleteType(TypeId);

            if (!results.success) {
                return res.status(500).json({
                    status: 500,
                    success: results.success,
                    message: results.message,
                    error: results.error
                })
            }

            if (!results.success && results.data === null) {
                return res.status(400).json({
                    status: 400,
                    success: results.success,
                    message: results.message,
                    data: results.data
                })
            }

            return res.status(200).json({
                status: 200,
                success: results.success,
                message: results.message,
                data: results.data
            })
        } catch (error) {
            console.log('error:', error);
            return res.status(500).json({
                status: 500,
                success: results.success,
                message: results.message,
                error: results.error
            })
        }
    }

    async updateType(req, res) {
        try {
            const { name } = req.body
            const { TypeId } = req.params

            if (!name || !TypeId) {
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: 'All field should be filled',
                })
            }

            const TypeData = {
                name
            }
            const results = await this.staffServices.updateType(TypeId, TypeData);

            if (!results.success) {
                return res.status(500).json({
                    status: 500,
                    success: results.success,
                    message: results.message,
                    error: results.error
                })
            }

            if (results.success && results.data === null) {
                return res.status(400).json({
                    status: 400,
                    success: results.success,
                    message: results.message,
                    data: results.data
                })
            }

            return res.status(200).json({
                status: 200,
                success: results.success,
                message: results.message,
                data: results.data
            })
        } catch (error) {
            console.log('error:', error);
            return res.status(500).json({
                status: 500,
                success: results.success,
                message: results.message,
                error: results.error
            })
        }
    }

    async getAllDesignations(req, res) {
        try {
            const results = await this.staffServices.getAllDesignations();

            if (!results.success) {
                return res.status(500).json({
                    status: 500,
                    success: results.success,
                    message: results.message,
                    error: results.error
                })
            }

            if (results.success && results.data.length === 0) {
                return res.status(200).json({
                    status: 200,
                    success: results.success,
                    message: results.message,
                    data: results.data
                })
            }

            return res.status(200).json({
                status: 200,
                success: results.success,
                message: results.message,
                data: results.data
            })
        } catch (error) {
            console.log('error:', error);
            return res.status(500).json({
                status: 500,
                success: results.success,
                message: results.message,
                error: results.error
            })
        }
    }

    async getDesignationById(req, res) {
        try {
            const { DesignationId } = req.params

            if (!DesignationId) {
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: 'DesignationId is missing',
                })
            }
            const results = await this.staffServices.getDesignationById(DesignationId);

            if (!results.success) {
                return res.status(500).json({
                    status: 500,
                    success: results.success,
                    message: results.message,
                    error: results.error
                })
            }

            return res.status(200).json({
                status: 200,
                success: results.success,
                message: results.message,
                data: results.data
            })
        } catch (error) {
            console.log('error:', error);
            return res.status(500).json({
                status: 500,
                success: results.success,
                message: results.message,
                error: results.error
            })
        }
    }

    async createDesignation(req, res) {
        try {

            const { name, type_id } = req.body

            if (!name || !type_id) {
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: 'All field should be filled',
                })
            }

            const DesignationData = {
                name, type_id
            }

            const results = await this.staffServices.createDesignation(DesignationData);

            if (!results.success) {
                return res.status(500).json({
                    status: 500,
                    success: results.success,
                    message: results.message,
                    error: results.error
                })
            }

            if (!results.success && results.data === null) {
                return res.status(400).json({
                    status: 400,
                    success: results.success,
                    message: results.message,
                    data: results.data
                })
            }

            return res.status(200).json({
                status: 200,
                success: results.success,
                message: results.message,
                data: results.data
            })
        } catch (error) {
            console.log('error:', error);
            return res.status(500).json({
                status: 500,
                success: results.success,
                message: results.message,
                error: results.error
            })
        }
    }

    async deleteDesignation(req, res) {
        try {
            const { DesignationId } = req.params

            if (!DesignationId) {
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: 'DesignationId is missing',
                })
            }
            const results = await this.staffServices.deleteDesignation(DesignationId);

            if (!results.success) {
                return res.status(500).json({
                    status: 500,
                    success: results.success,
                    message: results.message,
                    error: results.error
                })
            }

            if (!results.success && results.data === null) {
                return res.status(400).json({
                    status: 400,
                    success: results.success,
                    message: results.message,
                    data: results.data
                })
            }

            return res.status(200).json({
                status: 200,
                success: results.success,
                message: results.message,
                data: results.data
            })
        } catch (error) {
            console.log('error:', error);
            return res.status(500).json({
                status: 500,
                success: results.success,
                message: results.message,
                error: results.error
            })
        }
    }

    async updateDesignation(req, res) {
        try {
            const { name, type_id } = req.body
            const { DesignationId } = req.params

            if (!name || !type_id || !DesignationId) {
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: 'All field should be filled',
                })
            }

            const DesignationData = {
                name, type_id
            }
            const results = await this.staffServices.updateDesignation(DesignationId, DesignationData);

            if (!results.success) {
                return res.status(500).json({
                    status: 500,
                    success: results.success,
                    message: results.message,
                    error: results.error
                })
            }

            if (results.success && results.data === null) {
                return res.status(400).json({
                    status: 400,
                    success: results.success,
                    message: results.message,
                    data: results.data
                })
            }

            return res.status(200).json({
                status: 200,
                success: results.success,
                message: results.message,
                data: results.data
            })
        } catch (error) {
            console.log('error:', error);
            return res.status(500).json({
                status: 500,
                success: results.success,
                message: results.message,
                error: results.error
            })
        }
    }

    async assignDesignations(req, res) {
        try {
            const staff_id = req.params.id;
            const { designationIds } = req.body;

            if (!Array.isArray(designationIds) || designationIds.length === 0) {
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: 'No designations selected.',
                })
            }

            const results = await this.staffServices.assignDesignations(staff_id, designationIds);

            if (!results.success) {
                return res.status(500).json({
                    status: 500,
                    success: results.success,
                    message: results.message,
                    error: results.error
                })
            }
            if (results.success && results.message === 'staffDesignations already assigned') {
                return res.status(400).json({
                    status: 400,
                    success: results.success,
                    message: results.message,
                    data: results.data
                })
            }

            return res.status(200).json({
                status: 200,
                success: results.success,
                message: results.message,
                data: results.data
            })
        } catch (error) {
            console.error('Assignsdesignation error:', error);
            return res.status(500).json({
                status: 500,
                success: results.success,
                message: results.message,
                error: results.error
            })
        }
    }

    async assignPermissions(req, res) {
        try {
            const roleId = req.params.id;
            const { permissionIds } = req.body;

            if (!Array.isArray(permissionIds) || permissionIds.length === 0) {
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: 'No permissions selected.',
                })
            }

            const results = await this.staffServices.assignPermissions(roleId, permissionIds);

            if (!results.success) {
                return res.status(500).json({
                    status: 500,
                    success: results.success,
                    message: results.message,
                    error: results.error
                })
            }

            if (results.success && results.message === 'RolesPermission already assigned') {
                return res.status(400).json({
                    status: 400,
                    success: results.success,
                    message: results.message,
                    data: results.data
                })
            }

            return res.status(200).json({
                status: 200,
                success: results.success,
                message: results.message,
                data: results.data
            })

        } catch (error) {
            console.error('AssignsPermissions error:', error);
            return res.status(500).json({
                status: 500,
                success: results.success,
                message: results.message,
                error: results.error
            })
        }
    }

    async getPermissionByRole(req, res) {
        try {
            const roleId = req.params.id;
            if (!roleId) {
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: 'Role Id is missing.',
                })
            }

            const results = await this.staffServices.getPermissionByRole(roleId);

            if (!results.success) {
                console.error('Error fetching RolesPermission by ID:', results.error);
                return res.status(500).json({
                    status: 500,
                    success: results.success,
                    message: results.message,
                    error: results.error
                })
            }
            return res.status(200).json({
                status: 200,
                success: results.success,
                message: results.message,
                data: results.data
            })
        } catch (error) {
            console.error('Error fetching RolesPermission by ID:', error);
            return res.status(500).json({
                status: 500,
                success: results.success,
                message: results.message,
                error: results.error
            })
        }
    };

    async getPermissionsByRoles(req, res) {
        try {
            const roleId = req.params.id;
            if (!roleId) {
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: 'Role Id is missing.',
                })
            }

            const results = await this.staffServices.getPermissionsByRoles(roleId);

            if (!results.success) {
                console.error('Error fetching RolesPermission by ID:', results.error);
                return res.status(500).json({
                    status: 500,
                    success: results.success,
                    message: results.message,
                    error: results.error
                })
            }
            return res.status(200).json({
                status: 200,
                success: results.success,
                message: results.message,
                data: results.data
            })
        } catch (error) {
            console.error('Error fetching RolesPermission by ID:', error);
            return res.status(500).json({
                status: 500,
                success: results.success,
                message: results.message,
                error: results.error
            })
        }
    };

    async getRolesByStaff(req, res) {
        try {
            const staffId = req.params.id;
            if (!staffId) {
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: 'staff Id is missing.',
                })
            }

            const results = await this.staffServices.getRolesByStaff(staffId);

            if (!results.success) {
                console.error('Error fetching staffRoles by ID:', results.error);
                return res.status(500).json({
                    status: 500,
                    success: results.success,
                    message: results.message,
                    error: results.error
                })
            }
            return res.status(200).json({
                status: 200,
                success: results.success,
                message: results.message,
                data: results.data
            })
        } catch (error) {
            console.error('Error fetching staffRoles by ID:', error);
            return res.status(500).json({
                status: 500,
                success: results.success,
                message: results.message,
                error: results.error
            })
        }
    };

    async assignRoles(req, res) {
        try {
            const staffId = req.params.id;
            const { RoleIds } = req.body;

            if (!Array.isArray(RoleIds) || RoleIds.length === 0) {
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: 'No Roles selected.',
                })
            }

            const results = await this.staffServices.assignRoles(staffId, RoleIds);

            if (!results.success) {
                return res.status(500).json({
                    status: 500,
                    success: results.success,
                    message: results.message,
                    error: results.error
                })
            }

            if (results.success && results.message === 'StaffRole already assigned') {
                return res.status(400).json({
                    status: 400,
                    success: results.success,
                    message: results.message,
                    data: results.data
                })
            }

            return res.status(200).json({
                status: 200,
                success: results.success,
                message: results.message,
                data: results.data
            })

        } catch (error) {
            console.error('AssignsRoles error:', error);
            return res.status(500).json({
                status: 500,
                success: results.success,
                message: results.message,
                error: results.error
            })
        }
    }

    async logout(req, res) {
        const refreshToken = req.cookies.refreshToken;

        try {
            const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
            await redisClient.del(`refresh:${decoded.userId}`);
        } catch (err) {
            console.log('Refresh token invalid or already expired on logout.', err);
        }

        if (req.session) {
            req.session.destroy(err => {
                if (err) {
                    console.error('Error destroying session:', err);
                }
            });
        }

        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        res.clearCookie('bo.sid', {
            path: '/',
            httpOnly: true,
            secure: false // true if HTTPS
        });

        return res.status(200).json({
            status: 200,
            success: true,
            message: 'Logged out successfully',
        });
    }

    async getAllAttendances(req, res) {
        try {
            const results = await this.staffServices.getAllAttendances();

            if (!results.success) {
                return res.status(500).json({
                    status: 500,
                    success: results.success,
                    message: results.message,
                    error: results.error
                });
            }

            return res.status(200).json({
                status: 200,
                success: results.success,
                message: results.message,
                data: results.data
            });
        } catch (error) {
            console.error('Error:', error);
            return res.status(500).json({
                status: 500,
                success: false,
                message: 'Internal server error',
                error
            });
        }
    }

    async getAttendanceById(req, res) {
        try {
            const { attendanceId } = req.params;
            if (!attendanceId) {
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: 'Attendance ID is missing'
                });
            }

            const results = await this.staffServices.getAttendanceById(attendanceId);

            if (!results.success) {
                return res.status(404).json({
                    status: 404,
                    success: results.success,
                    message: results.message,
                    error: results.error
                });
            }

            return res.status(200).json({
                status: 200,
                success: results.success,
                message: results.message,
                data: results.data
            });
        } catch (error) {
            console.error('Error:', error);
            return res.status(500).json({
                status: 500,
                success: false,
                message: 'Internal server error',
                error
            });
        }
    }

    async getAttendanceByDate(req, res) {
        try {
                  const email = req.session.staffEmail || '';
    const lastname = req.session.lastname || '';
            const { date } = req.params;
            if (!date) {
                return res.status(400).send('Date is missing');
            }

            const results = await this.staffServices.getAttendanceByDate(date);

            if (!results.success) {
                return res.status(500).send('Error fetching attendance');
            }


            return res.render('viewattendance', {
                email,
                lastname,
                date,
                attendance: results.data,
            });
        } catch (error) {
            console.error('Error:', error);
            return res.status(500).send('Internal server error');
        }
    }

    async createAttendances(req, res) {
        try {
            const attendanceData = req.body;


            if (!attendanceData || !Array.isArray(attendanceData) || attendanceData.length === 0) {
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: 'Attendance array is required'
                });
            }

            const results = await this.staffServices.createAttendances(attendanceData);

            if (!results.success) {
                return res.status(400).json({
                    status: 400,
                    success: results.success,
                    message: results.message
                });
            }

            return res.status(201).json({
                status: 201,
                success: results.success,
                message: results.message,
                data: results.data
            });
        } catch (error) {
            console.error('Error:', error);
            return res.status(500).json({
                status: 500,
                success: false,
                message: 'Internal server error',
                error
            });
        }
    }

    async deleteAttendance(req, res) {
        try {
            const { attendanceId } = req.params;

            if (!attendanceId) {
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: 'Attendance ID is missing'
                });
            }

            const results = await this.staffServices.deleteAttendance(attendanceId);

            if (!results.success) {
                return res.status(400).json({
                    status: 400,
                    success: results.success,
                    message: results.message
                });
            }

            return res.status(200).json({
                status: 200,
                success: results.success,
                message: results.message,
                data: results.data
            });
        } catch (error) {
            console.error('Error:', error);
            return res.status(500).json({
                status: 500,
                success: false,
                message: 'Internal server error',
                error
            });
        }
    }

    async getAttendanceSummary(req, res) {
        try {

            console.log('Inafika hapa');
            const results = await this.staffServices.getAttendanceSummary();

            if (!results.success) {
                return res.status(500).json({
                    status: 500,
                    success: results.success,
                    message: results.message,
                    error: results.error
                });
            }

            if (results.success && (!results.data || results.data.length === 0)) {
                return res.status(200).json({
                    status: 200,
                    success: results.success,
                    message: 'No attendance records found',
                    data: []
                });
            }

            return res.status(200).json({
                status: 200,
                success: results.success,
                message: results.message,
                data: results.data
            });
        } catch (error) {
            console.error('Error fetching attendance summary:', error);
            return res.status(500).json({
                status: 500,
                success: false,
                message: 'Internal server error',
                error
            });
        }
    }

}

module.exports = StaffController;