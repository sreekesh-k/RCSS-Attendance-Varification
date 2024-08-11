const prisma = require('../prismaClient');

const getAllTeachers = async (req, res) => {
    try {
        const teachers = await prisma.teachers.findMany();
        res.json(teachers);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching teachers.' });
    }
}

const createTeacher = async (req, res) => {
    const { tname } = req.body;
    try {
        const newTeacher = await prisma.teachers.create({
            data: { tname }
        });
        res.status(201).json(newTeacher);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while creating the teacher.' });
    }
}
const getTeacherById = async (req, res) => {
    const { id } = req.params;
    try {
        const teacher = await prisma.teacher.findUnique({ where: { tid: Number(id) } });
        if (teacher) {
            res.json(teacher);
        } else {
            res.status(404).json({ error: 'Teacher not found.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the teacher.' });
    }
}

const updateTeacher = async (req, res) => {
    const { id } = req.params;
    const { tname } = req.body;
    try {
        const updatedTeacher = await prisma.teacher.update({
            where: { tid: Number(id) },
            data: { tname }
        });
        res.json(updatedTeacher);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the teacher.' });
    }
}
const deleteTeacher = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.teacher.delete({ where: { tid: Number(id) } });
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the teacher.' });
    }
}

module.exports = {
    getAllTeachers,
    createTeacher,
    getTeacherById,
    updateTeacher,
    deleteTeacher
};
