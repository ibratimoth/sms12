const Section = require('../models/sectionModel');
const Class = require('../models/ClasssModel');
const Gender = require('../models/genderModel');
const Stream = require('../models/streamModel');
const Subject = require('../models/SubjectsModel');
const Term = require('../models/TermsModel');
const Year = require('../models/YearsModel');
const Entity = require('../models/entityModel');

class academicRepository {
    async getAllSections() {
        return await Section.findAll({ order: [['created_at', 'DESC']] });
    }

    async createSection(SectionData) {
        return await Section.create(SectionData);
    }

    async getSectionById(SectionId) {
        const section = await Section.findByPk(SectionId);

        if (!section) {
            throw new Error('section not found');
        }
        return section;
    }

    async updateSection(SectionId, SectionData) {
        const section = await Section.findByPk(SectionId);

        if (!section) {
            throw new Error('Section not found');
        }

        await section.update(SectionData)
        return section;
    }

    async deleteSection(SectionId) {
        const section = await Section.findByPk(SectionId);

        if (!section) {
            throw new Error('Section not found');
        }

        return await Section.destroy({ where: { id: SectionId } });
    }

    async getAllClasses() {
        return await Class.findAll({ order: [['created_at', 'DESC']] });
    }

    async createClass(ClassData) {
        return await Class.create(ClassData);
    }

    async getClassById(ClassId) {
        const classes = await Class.findByPk(ClassId);

        if (!classes) {
            throw new Error('classes not found');
        }
        return classes;
    }

    async updateClass(ClassId, ClassData) {
        const classes = await Class.findByPk(ClassId);

        if (!classes) {
            throw new Error('classes not found');
        }

        await classes.update(ClassData)
        return classes;
    }

    async deleteClass(ClassId) {
        const classes = await Class.findByPk(ClassId);

        if (!classes) {
            throw new Error('classes not found');
        }

        return await Class.destroy({ where: { id: ClassId } });
    }

    async getAllGenders() {
        return await Gender.findAll({ order: [['created_at', 'DESC']] });
    }

    async createGender(GenderData) {
        return await Gender.create(GenderData);
    }

    async getGenderById(GenderId) {
        const gender = await Gender.findByPk(GenderId);

        if (!gender) {
            throw new Error('gender not found');
        }
        return gender;
    }

    async updateGender(GenderId, GenderData) {
        const gender = await Gender.findByPk(GenderId);

        if (!gender) {
            throw new Error('gender not found');
        }

        await gender.update(GenderData)
        return gender;
    }

    async deleteGender(GenderId) {
        const gender = await Gender.findByPk(GenderId);

        if (!gender) {
            throw new Error('gender not found');
        }

        return await Gender.destroy({ where: { id: GenderId } });
    }

    async getAllStreams() {
        return await Stream.findAll({ order: [['created_at', 'DESC']] });
    }

    async createStream(StreamData) {
        return await Stream.create(StreamData);
    }

    async getStreamById(StreamId) {
        const stream = await Stream.findByPk(StreamId);

        if (!stream) {
            throw new Error('stream not found');
        }
        return stream;
    }

    async updateStream(StreamId, StreamData) {
        const stream = await Stream.findByPk(StreamId);

        if (!stream) {
            throw new Error('Stream not found');
        }

        await stream.update(StreamData)
        return stream;
    }

    async deleteStream(StreamId) {
        const stream = await Stream.findByPk(StreamId);

        if (!stream) {
            throw new Error('Stream not found');
        }

        return await Stream.destroy({ where: { id: StreamId } });
    }

    async getAllSubjects() {
        return await Subject.findAll({ order: [['created_at', 'DESC']] });
    }

    async createSubject(SubjectData) {
        return await Subject.create(SubjectData);
    }

    async getSubjectById(SubjectId) {
        const subject = await Subject.findByPk(SubjectId);

        if (!subject) {
            throw new Error('Subject not found');
        }
        return subject;
    }

    async updateSubject(SubjectId, SubjectData) {
        const subject = await Subject.findByPk(SubjectId);

        if (!subject) {
            throw new Error('Subject not found');
        }

        await subject.update(SubjectData)
        return subject;
    }

    async deleteSubject(SubjectId) {
        const subject = await Subject.findByPk(SubjectId);

        if (!subject) {
            throw new Error('Subject not found');
        }

        return await Subject.destroy({ where: { id: SubjectId } });
    }

    async getAllTerms() {
        return await Term.findAll({ order: [['created_at', 'DESC']] });
    }

    async createTerm(TermData) {
        return await Term.create(TermData);
    }

    async getTermById(TermId) {
        const term = await Term.findByPk(TermId);

        if (!term) {
            throw new Error('Term not found');
        }
        return term;
    }

    async updateTerm(TermId, TermData) {
        const term = await Term.findByPk(TermId);

        if (!term) {
            throw new Error('Term not found');
        }

        await term.update(TermData)
        return term;
    }

    async deleteTerm(TermId) {
        const term = await Term.findByPk(TermId);

        if (!term) {
            throw new Error('Term not found');
        }

        return await Term.destroy({ where: { id: TermId } });
    }

    async getAllYears() {
        return await Year.findAll({ order: [['created_at', 'DESC']] });
    }

    async createYear(YearData) {
        return await Year.create(YearData);
    }

    async getYearById(YearId) {
        const year = await Year.findByPk(YearId);

        if (!year) {
            throw new Error('Year not found');
        }
        return year;
    }

    async updateYear(YearId, YearData) {
        const year = await Year.findByPk(YearId);

        if (!year) {
            throw new Error('Year not found');
        }

        await year.update(YearData)
        return year;
    }

    async deleteYear(YearId) {
        const year = await Year.findByPk(YearId);

        if (!year) {
            throw new Error('Year not found');
        }

        return await Year.destroy({ where: { id: YearId } });
    }

    async getAllEntities() {
        return await Entity.findAll({ order: [['created_at', 'DESC']] });
    }

    async createEntity(EntityData) {
        return await Entity.create(EntityData);
    }

    async getEntityById(EntityId) {
        const entity = await Entity.findByPk(EntityId);

        if (!entity) {
            throw new Error('entity not found');
        }
        return entity;
    }

    async updateEntity(EntityId, EntityData) {
        const entity = await Entity.findByPk(EntityId);

        if (!entity) {
            throw new Error('Entity not found');
        }

        await entity.update(EntityData)
        return entity;
    }

    async deleteEntity(EntityId) {
        const entity = await Entity.findByPk(EntityId);

        if (!entity) {
            throw new Error('entity not found');
        }

        return await Entity.destroy({ where: { id: EntityId } });
    }


}

module.exports = academicRepository