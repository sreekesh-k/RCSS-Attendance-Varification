const prisma = require('../prismaClient');

const getAllTeacherSubjects = async (req, res) => {
    try {
        const teacherTeachesSubjects = await prisma.teacherTeachesSubject.findMany();
        res.json(teacherTeachesSubjects);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching teacher-teaches-subjects records.' });
    }
}
const createTeacherSubject = async (req, res) => {
    const { tid, sid } = req.body;
    try {
        const newTeacherTeachesSubject = await prisma.teacherTeachesSubject.create({
            data: { tid, sid }
        });
        res.status(201).json(newTeacherTeachesSubject);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while creating the teacher-teaches-subject record.' });
    }
}
const getTeacherSubjectById = async (req, res) => {
    const { id } = req.params;
    try {
        const teacherTeachesSubject = await prisma.teacherTeachesSubject.findUnique({ where: { ttsid: Number(id) } });
        if (teacherTeachesSubject) {
            res.json(teacherTeachesSubject);
        } else {
            res.status(404).json({ error: 'Teacher-teaches-subject record not found.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the teacher-teaches-subject record.' });
    }
}

const updateTeacherSubject = async (req, res) => {
    const { id } = req.params;
    const { tid, sid } = req.body;
    try {
        const updatedTeacherTeachesSubject = await prisma.teacherTeachesSubject.update({
            where: { ttsid: Number(id) },
            data: { tid, sid }
        });
        res.json(updatedTeacherTeachesSubject);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the teacher-teaches-subject record.' });
    }
}
const deleteTeacherSubject = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.teacherTeachesSubject.delete({ where: { ttsid: Number(id) } });
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the teacher-teaches-subject record.' });
    }
}

module.exports = {
    getAllTeacherSubjects,
    createTeacherSubject,
    getTeacherSubjectById,
    updateTeacherSubject,
    deleteTeacherSubject
};
