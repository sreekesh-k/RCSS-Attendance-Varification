const prisma = require('../prismaClient');

const getAllCourses = async (req, res) => {
    try {
        const courses = await prisma.course.findMany();
        res.json(courses);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching courses.' });
    }
};

const createCourse = async (req, res) => {
    const { cname, level } = req.body;
    try {
        const newCourse = await prisma.course.create({
            data: { cname, level }
        });
        res.status(201).json(newCourse);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while creating the course.' });
    }
};

const getCourseById = async (req, res) => {
    const { level } = req.params;
    try {
        const course = await prisma.course.findMany({ where: { level: String(level) } });
        if (course) {
            res.json(course);
        } else {
            res.status(404).json({ error: 'Course not found.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the course.' });
    }
};

const updateCourse = async (req, res) => {
    const { id } = req.params;
    const { cname, level } = req.body;
    try {
        const updatedCourse = await prisma.course.update({
            where: { cid: Number(id) },
            data: { cname, level }
        });
        res.json(updatedCourse);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the course.' });
    }
};

const deleteCourse = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.course.delete({ where: { cid: Number(id) } });
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the course.' });
    }
};

module.exports = {
    getAllCourses,
    createCourse,
    getCourseById,
    updateCourse,
    deleteCourse
};
