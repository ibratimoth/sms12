const AcademicRepository = require('../repositories/academicRepository');

class academicService {
    constructor() {
        this.academicRepository = new AcademicRepository();
    }

    async getAllClasses() {
        try {
            const results = await this.academicRepository.getAllClasses();

            if (results.length > 0) {
                return { success: true, message: 'Class fetched successfully', data: results }
            }

            return { success: true, message: 'No Class found', data: [] }
        } catch (error) {
            console.log('erorr while fetching:', error);
            return { success: false, message: 'erorr while fetching', error: error }
        }

    }

    async createClass(ClassData) {
        try {
            const results = await this.academicRepository.createClass(ClassData);

            if (results) {
                return { success: true, message: 'Class created successfully', data: results }
            }

            return { success: false, message: 'Class was not created', data: null }
        } catch (error) {
            console.log('erorr while creating:', error);
            return { success: false, message: 'erorr while creating', error: error }
        }

    }

    async getClassById(ClassId) {
        try {
            const results = await this.academicRepository.getClassById(ClassId);

            return { success: true, message: 'Classs fetched successfully', data: results }

        } catch (error) {
            console.log('erorr while fetching:', error);
            return { success: false, message: 'Class not found', error: error }
        }

    }
    async deleteClass(ClassId) {
        try {
            const results = await this.academicRepository.deleteClass(ClassId);

            if (results) {
                return { success: true, message: 'Class deleted successfully', data: results }
            }

            return { success: false, message: 'Failed to delete Class data', data: null }
        } catch (error) {
            console.log('erorr while deleting:', error);
            return { success: false, message: 'erorr while deleting', error: error }
        }

    }
    async updateClass(ClassId, ClassData) {
        try {
            const results = await this.academicRepository.updateClass(ClassId, ClassData);

            if (results) {
                return { success: true, message: 'Class updated successfully', data: results }
            }

            return { success: true, message: 'Failed to update Class data', data: null }
        } catch (error) {
            console.log('erorr while updating:', error);
            return { success: false, message: 'erorr while updating', error: error }
        }
    }

    async getAllGenders() {
        try {
            const results = await this.academicRepository.getAllGenders();

            if (results.length > 0) {
                return { success: true, message: 'Gender fetched successfully', data: results }
            }

            return { success: true, message: 'No Gender found', data: [] }
        } catch (error) {
            console.log('erorr while fetching:', error);
            return { success: false, message: 'erorr while fetching', error: error }
        }

    }

    async createGender(GenderData) {
        try {
            const results = await this.academicRepository.createGender(GenderData);

            if (results) {
                return { success: true, message: 'Gender created successfully', data: results }
            }

            return { success: false, message: 'Gender was not created', data: null }
        } catch (error) {
            console.log('erorr while creating:', error);
            return { success: false, message: 'erorr while creating', error: error }
        }

    }

    async getGenderById(GenderId) {
        try {
            const results = await this.academicRepository.getGenderById(GenderId);

            return { success: true, message: 'Genders fetched successfully', data: results }

        } catch (error) {
            console.log('erorr while fetching:', error);
            return { success: false, message: 'Gender not found', error: error }
        }

    }
    async deleteGender(GenderId) {
        try {
            const results = await this.academicRepository.deleteGender(GenderId);

            if (results) {
                return { success: true, message: 'Gender deleted successfully', data: results }
            }

            return { success: false, message: 'Failed to delete Gender data', data: null }
        } catch (error) {
            console.log('erorr while deleting:', error);
            return { success: false, message: 'erorr while deleting', error: error }
        }

    }
    async updateGender(GenderId, GenderData) {
        try {
            const results = await this.academicRepository.updateGender(GenderId, GenderData);

            if (results) {
                return { success: true, message: 'Gender updated successfully', data: results }
            }

            return { success: true, message: 'Failed to update Gender data', data: null }
        } catch (error) {
            console.log('erorr while updating:', error);
            return { success: false, message: 'erorr while updating', error: error }
        }
    }

    async getAllStreams() {
        try {
            const results = await this.academicRepository.getAllStreams();

            if (results.length > 0) {
                return { success: true, message: 'Stream fetched successfully', data: results }
            }

            return { success: true, message: 'No Stream found', data: [] }
        } catch (error) {
            console.log('erorr while fetching:', error);
            return { success: false, message: 'erorr while fetching', error: error }
        }

    }

    async createStream(StreamData) {
        try {
            const results = await this.academicRepository.createStream(StreamData);

            if (results) {
                return { success: true, message: 'Stream created successfully', data: results }
            }

            return { success: false, message: 'Stream was not created', data: null }
        } catch (error) {
            console.log('erorr while creating:', error);
            return { success: false, message: 'erorr while creating', error: error }
        }

    }

    async getStreamById(StreamId) {
        try {
            const results = await this.academicRepository.getStreamById(StreamId);

            return { success: true, message: 'Streams fetched successfully', data: results }

        } catch (error) {
            console.log('erorr while fetching:', error);
            return { success: false, message: 'Stream not found', error: error }
        }

    }

    async deleteStream(StreamId) {
        try {
            const results = await this.academicRepository.deleteStream(StreamId);

            if (results) {
                return { success: true, message: 'Stream deleted successfully', data: results }
            }

            return { success: false, message: 'Failed to delete Stream data', data: null }
        } catch (error) {
            console.log('erorr while deleting:', error);
            return { success: false, message: 'erorr while deleting', error: error }
        }

    }
    
    async updateStream(StreamId, StreamData) {
        try {
            const results = await this.academicRepository.updateStream(StreamId, StreamData);

            if (results) {
                return { success: true, message: 'Stream updated successfully', data: results }
            }

            return { success: true, message: 'Failed to update Stream data', data: null }
        } catch (error) {
            console.log('erorr while updating:', error);
            return { success: false, message: 'erorr while updating', error: error }
        }
    }

    async getAllSubjects() {
        try {
            const results = await this.academicRepository.getAllSubjects();

            if (results.length > 0) {
                return { success: true, message: 'Subject fetched successfully', data: results }
            }

            return { success: true, message: 'No Subject found', data: [] }
        } catch (error) {
            console.log('erorr while fetching:', error);
            return { success: false, message: 'erorr while fetching', error: error }
        }

    }

    async createSubject(SubjectData) {
        try {
            const results = await this.academicRepository.createSubject(SubjectData);

            if (results) {
                return { success: true, message: 'Subject created successfully', data: results }
            }

            return { success: false, message: 'Subject was not created', data: null }
        } catch (error) {
            console.log('erorr while creating:', error);
            return { success: false, message: 'erorr while creating', error: error }
        }

    }

    async getSubjectById(SubjectId) {
        try {
            const results = await this.academicRepository.getSubjectById(SubjectId);

            return { success: true, message: 'Subjects fetched successfully', data: results }

        } catch (error) {
            console.log('erorr while fetching:', error);
            return { success: false, message: 'Subject not found', error: error }
        }

    }

    async deleteSubject(SubjectId) {
        try {
            const results = await this.academicRepository.deleteSubject(SubjectId);

            if (results) {
                return { success: true, message: 'Subject deleted successfully', data: results }
            }

            return { success: false, message: 'Failed to delete Subject data', data: null }
        } catch (error) {
            console.log('erorr while deleting:', error);
            return { success: false, message: 'erorr while deleting', error: error }
        }

    }

    async updateSubject(SubjectId, SubjectData) {
        try {
            const results = await this.academicRepository.updateSubject(SubjectId, SubjectData);

            if (results) {
                return { success: true, message: 'Subject updated successfully', data: results }
            }

            return { success: true, message: 'Failed to update Subject data', data: null }
        } catch (error) {
            console.log('erorr while updating:', error);
            return { success: false, message: 'erorr while updating', error: error }
        }
    }

    async getAllTerms() {
        try {
            const results = await this.academicRepository.getAllTerms();

            if (results.length > 0) {
                return { success: true, message: 'Term fetched successfully', data: results }
            }

            return { success: true, message: 'No Term found', data: [] }
        } catch (error) {
            console.log('erorr while fetching:', error);
            return { success: false, message: 'erorr while fetching', error: error }
        }

    }

    async createTerm(TermData) {
        try {
            const results = await this.academicRepository.createTerm(TermData);

            if (results) {
                return { success: true, message: 'Term created successfully', data: results }
            }

            return { success: false, message: 'Term was not created', data: null }
        } catch (error) {
            console.log('erorr while creating:', error);
            return { success: false, message: 'erorr while creating', error: error }
        }

    }

    async getTermById(TermId) {
        try {
            const results = await this.academicRepository.getTermById(TermId);

            return { success: true, message: 'Terms fetched successfully', data: results }

        } catch (error) {
            console.log('erorr while fetching:', error);
            return { success: false, message: 'Term not found', error: error }
        }

    }

    async deleteTerm(TermId) {
        try {
            const results = await this.academicRepository.deleteTerm(TermId);

            if (results) {
                return { success: true, message: 'Term deleted successfully', data: results }
            }

            return { success: false, message: 'Failed to delete Term data', data: null }
        } catch (error) {
            console.log('erorr while deleting:', error);
            return { success: false, message: 'erorr while deleting', error: error }
        }

    }

    async updateTerm(TermId, TermData) {
        try {
            const results = await this.academicRepository.updateTerm(TermId, TermData);

            if (results) {
                return { success: true, message: 'Term updated successfully', data: results }
            }

            return { success: true, message: 'Failed to update Term data', data: null }
        } catch (error) {
            console.log('erorr while updating:', error);
            return { success: false, message: 'erorr while updating', error: error }
        }
    }
    
    async getAllYears() {
        try {
            const results = await this.academicRepository.getAllYears();

            if (results.length > 0) {
                return { success: true, message: 'Year fetched successfully', data: results }
            }

            return { success: true, message: 'No Year found', data: [] }
        } catch (error) {
            console.log('erorr while fetching:', error);
            return { success: false, message: 'erorr while fetching', error: error }
        }

    }

    async createYear(YearData) {
        try {
            const results = await this.academicRepository.createYear(YearData);

            if (results) {
                return { success: true, message: 'Year created successfully', data: results }
            }

            return { success: false, message: 'Year was not created', data: null }
        } catch (error) {
            console.log('erorr while creating:', error);
            return { success: false, message: 'erorr while creating', error: error }
        }

    }

    async getYearById(YearId) {
        try {
            const results = await this.academicRepository.getYearById(YearId);

            return { success: true, message: 'Years fetched successfully', data: results }

        } catch (error) {
            console.log('erorr while fetching:', error);
            return { success: false, message: 'Year not found', error: error }
        }

    }

    async deleteYear(YearId) {
        try {
            const results = await this.academicRepository.deleteYear(YearId);

            if (results) {
                return { success: true, message: 'Year deleted successfully', data: results }
            }

            return { success: false, message: 'Failed to delete Year data', data: null }
        } catch (error) {
            console.log('erorr while deleting:', error);
            return { success: false, message: 'erorr while deleting', error: error }
        }

    }

    async updateYear(YearId, YearData) {
        try {
            const results = await this.academicRepository.updateYear(YearId, YearData);

            if (results) {
                return { success: true, message: 'Year updated successfully', data: results }
            }

            return { success: true, message: 'Failed to update Year data', data: null }
        } catch (error) {
            console.log('erorr while updating:', error);
            return { success: false, message: 'erorr while updating', error: error }
        }
    }

    async getAllEntities() {
        try {
            const results = await this.academicRepository.getAllEntities();

            if (results.length > 0) {
                return { success: true, message: 'Entity fetched successfully', data: results }
            }

            return { success: true, message: 'No Entity found', data: [] }
        } catch (error) {
            console.log('erorr while fetching:', error);
            return { success: false, message: 'erorr while fetching', error: error }
        }

    }

    async createEntity(EntityData) {
        try {
            const results = await this.academicRepository.createEntity(EntityData);

            if (results) {
                return { success: true, message: 'Entity created successfully', data: results }
            }

            return { success: false, message: 'Entity was not created', data: null }
        } catch (error) {
            console.log('erorr while creating:', error);
            return { success: false, message: 'erorr while creating', error: error }
        }

    }

    async getEntityById(EntityId) {
        try {
            const results = await this.academicRepository.getEntityById(EntityId);

            return { success: true, message: 'Entitys fetched successfully', data: results }

        } catch (error) {
            console.log('erorr while fetching:', error);
            return { success: false, message: 'Entity not found', error: error }
        }

    }

    async deleteEntity(EntityId) {
        try {
            const results = await this.academicRepository.deleteEntity(EntityId);

            if (results) {
                return { success: true, message: 'Entity deleted successfully', data: results }
            }

            return { success: false, message: 'Failed to delete Entity data', data: null }
        } catch (error) {
            console.log('erorr while deleting:', error);
            return { success: false, message: 'erorr while deleting', error: error }
        }

    }

    async updateEntity(EntityId, EntityData) {
        try {
            const results = await this.academicRepository.updateEntity(EntityId, EntityData);

            if (results) {
                return { success: true, message: 'Entity updated successfully', data: results }
            }

            return { success: true, message: 'Failed to update Entity data', data: null }
        } catch (error) {
            console.log('erorr while updating:', error);
            return { success: false, message: 'erorr while updating', error: error }
        }
    }
}

module.exports = academicService;