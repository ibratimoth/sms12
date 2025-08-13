const AcademicServices = require('../services/academicService');

class AcademicController {

    constructor() {
        this.academicServices = new AcademicServices();
    }

    async getAllClasses(req, res) {
        try {
            const results = await this.academicServices.getAllClasses();

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

    async getClassById(req, res) {
        try {
            const { ClassId } = req.params

            if (!ClassId) {
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: 'ClassId is missing',
                })
            }
            const results = await this.academicServices.getClassById(ClassId);

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

    async createClass(req, res) {
        try {

            const { name } = req.body

            if (!name) {
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: 'All field should be filled',
                })
            }

            const ClassData = {
                name
            }
            const results = await this.academicServices.createClass(ClassData);

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

    async deleteClass(req, res) {
        try {
            const { ClassId } = req.params

            if (!ClassId) {
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: 'ClassId is missing',
                })
            }
            const results = await this.academicServices.deleteClass(ClassId);

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

    async updateClass(req, res) {
        try {
            const { name } = req.body
            const { ClassId } = req.params

            if (!name || !ClassId) {
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: 'All field should be filled',
                })
            }

            const ClassData = {
                name
            }
            const results = await this.academicServices.updateClass(ClassId, ClassData);

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

    async getAllGenders(req, res) {
        try {
            const results = await this.academicServices.getAllGenders();

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

    async getGenderById(req, res) {
        try {
            const { GenderId } = req.params

            if (!GenderId) {
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: 'GenderId is missing',
                })
            }
            const results = await this.academicServices.getGenderById(GenderId);

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

    async createGender(req, res) {
        try {

            const { name } = req.body

            if (!name) {
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: 'All field should be filled',
                })
            }

            const GenderData = {
                name
            }
            const results = await this.academicServices.createGender(GenderData);

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

    async deleteGender(req, res) {
        try {
            const { GenderId } = req.params

            if (!GenderId) {
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: 'GenderId is missing',
                })
            }
            const results = await this.academicServices.deleteGender(GenderId);

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

    async updateGender(req, res) {
        try {
            const { name } = req.body
            const { GenderId } = req.params

            if (!name || !GenderId) {
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: 'All field should be filled',
                })
            }

            const GenderData = {
                name
            }
            const results = await this.academicServices.updateGender(GenderId, GenderData);

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

    async getAllStreams(req, res) {
        try {
            const results = await this.academicServices.getAllStreams();

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

    async getStreamById(req, res) {
        try {
            const { StreamId } = req.params

            if (!StreamId) {
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: 'StreamId is missing',
                })
            }
            const results = await this.academicServices.getStreamById(StreamId);

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

    async createStream(req, res) {
        try {

            const { name } = req.body

            if (!name) {
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: 'All field should be filled',
                })
            }

            const StreamData = {
                name
            }
            const results = await this.academicServices.createStream(StreamData);

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

    async deleteStream(req, res) {
        try {
            const { StreamId } = req.params

            if (!StreamId) {
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: 'StreamId is missing',
                })
            }
            const results = await this.academicServices.deleteStream(StreamId);

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

    async updateStream(req, res) {
        try {
            const { name } = req.body
            const { StreamId } = req.params

            if (!name || !StreamId) {
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: 'All field should be filled',
                })
            }

            const StreamData = {
                name
            }
            const results = await this.academicServices.updateStream(StreamId, StreamData);

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

    async getAllSubjects(req, res) {
        try {
            const results = await this.academicServices.getAllSubjects();

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

    async getSubjectById(req, res) {
        try {
            const { SubjectId } = req.params

            if (!SubjectId) {
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: 'SubjectId is missing',
                })
            }
            const results = await this.academicServices.getSubjectById(SubjectId);

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

    async createSubject(req, res) {
        try {

            const { name } = req.body

            if (!name) {
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: 'All field should be filled',
                })
            }

            const SubjectData = {
                name
            }
            const results = await this.academicServices.createSubject(SubjectData);

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

    async deleteSubject(req, res) {
        try {
            const { SubjectId } = req.params

            if (!SubjectId) {
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: 'SubjectId is missing',
                })
            }
            const results = await this.academicServices.deleteSubject(SubjectId);

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

    async updateSubject(req, res) {
        try {
            const { name } = req.body
            const { SubjectId } = req.params

            if (!name || !SubjectId) {
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: 'All field should be filled',
                })
            }

            const SubjectData = {
                name
            }
            const results = await this.academicServices.updateSubject(SubjectId, SubjectData);

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

    async getAllTerms(req, res) {
        try {
            const results = await this.academicServices.getAllTerms();

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

    async getTermById(req, res) {
        try {
            const { TermId } = req.params

            if (!TermId) {
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: 'TermId is missing',
                })
            }
            const results = await this.academicServices.getTermById(TermId);

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

    async createTerm(req, res) {
        try {

            const { name } = req.body

            if (!name) {
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: 'All field should be filled',
                })
            }

            const TermData = {
                name
            }
            const results = await this.academicServices.createTerm(TermData);

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

    async deleteTerm(req, res) {
        try {
            const { TermId } = req.params

            if (!TermId) {
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: 'TermId is missing',
                })
            }
            const results = await this.academicServices.deleteTerm(TermId);

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

    async updateTerm(req, res) {
        try {
            const { name } = req.body
            const { TermId } = req.params

            if (!name || !TermId) {
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: 'All field should be filled',
                })
            }

            const TermData = {
                name
            }
            const results = await this.academicServices.updateTerm(TermId, TermData);

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

    async getAllYears(req, res) {
        try {
            const results = await this.academicServices.getAllYears();

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

    async getYearById(req, res) {
        try {
            const { YearId } = req.params

            if (!YearId) {
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: 'YearId is missing',
                })
            }
            const results = await this.academicServices.getYearById(YearId);

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

    async createYear(req, res) {
        try {

            const { year } = req.body

            if (!year) {
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: 'All field should be filled',
                })
            }

            const YearData = {
                year
            }
            const results = await this.academicServices.createYear(YearData);

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

    async deleteYear(req, res) {
        try {
            const { YearId } = req.params

            if (!YearId) {
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: 'YearId is missing',
                })
            }
            const results = await this.academicServices.deleteYear(YearId);

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

    async updateYear(req, res) {
        try {
            const { year } = req.body
            const { YearId } = req.params

            if (!year || !YearId) {
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: 'All field should be filled',
                })
            }

            const YearData = {
                year
            }
            const results = await this.academicServices.updateYear(YearId, YearData);

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

    async getAllEntities(req, res) {
        try {
            const results = await this.academicServices.getAllEntities();

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

    async getEntityById(req, res) {
        try {
            const { EntityId } = req.params

            if (!EntityId) {
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: 'EntityId is missing',
                })
            }
            const results = await this.academicServices.getEntityById(EntityId);

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

    async createEntity(req, res) {
        try {

            const { name } = req.body

            if (!name) {
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: 'All field should be filled',
                })
            }

            const EntityData = {
                name
            }
            const results = await this.academicServices.createEntity(EntityData);

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

    async deleteEntity(req, res) {
        try {
            const { EntityId } = req.params

            if (!EntityId) {
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: 'EntityId is missing',
                })
            }
            const results = await this.academicServices.deleteEntity(EntityId);

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

    async updateEntity(req, res) {
        try {
            const { name } = req.body
            const { EntityId } = req.params

            if (!name || !EntityId) {
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: 'All field should be filled',
                })
            }

            const EntityData = {
                name
            }
            const results = await this.academicServices.updateEntity(EntityId, EntityData);

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

}

module.exports = AcademicController;