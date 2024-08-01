const prisma = require('../prismaClient');


const getAllCourseSubjects = async (req, res) => {
    try {
        const courseSubjects = await prisma.courseSubjects.findMany();
        res.json(courseSubjects);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching course subjects.' });
    }
}

const createCourseSubject = async (req, res) => {
    const { cid, sid } = req.body;
    try {
        const newCourseSubject = await prisma.courseSubjects.create({
            data: { cid, sid }
        });
        res.status(201).json(newCourseSubject);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while creating the course subject.' });
    }
}

const getCourseSubjectById = async (req, res) => {
    const { id } = req.params;
    try {
        const courseSubject = await prisma.courseSubjects.findUnique({ where: { csid: Number(id) } });
        if (courseSubject) {
            res.json(courseSubject);
        } else {
            res.status(404).json({ error: 'Course subject not found.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the course subject.' });
    }
}

const updateCourseSubject = async (req, res) => {
    const { id } = req.params;
    const { cid, sid } = req.body;
    try {
        const updatedCourseSubject = await prisma.courseSubjects.update({
            where: { csid: Number(id) },
            data: { cid, sid }
        });
        res.json(updatedCourseSubject);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the course subject.' });
    }
}
const deleteCourseSubject = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.courseSubjects.delete({ where: { csid: Number(id) } });
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the course subject.' });
    }
}

module.exports = {
    getAllCourseSubjects,
    createCourseSubject,
    getCourseSubjectById,
    updateCourseSubject,
    deleteCourseSubject
};
