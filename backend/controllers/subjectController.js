const prisma = require('../prismaClient');


const getAllSubjects = async (req, res) => {
    try {
        const subjects = await prisma.subjects.findMany();
        res.json(subjects);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching subjects.' });
    }
}

const createSubject = async (req, res) => {
    const { sname } = req.body;
    try {
        const newSubject = await prisma.subjects.create({
            data: { 
                sname: sname.toUpperCase(),
            }
        });
        res.status(201).json(newSubject);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while creating the subject.' });
    }
}


const getSubjectById = async (req, res) => {
    const { id } = req.params;
    try {
        const subject = await prisma.subjects.findUnique({ where: { sid: Number(id) } });
        if (subject) {
            res.json(subject);
        } else {
            res.status(404).json({ error: 'Subject not found.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the subject.' });
    }
}


const updateSubject = async (req, res) => {
    const { id } = req.params;
    const { sname } = req.body;
    try {
        const updatedSubject = await prisma.subjects.update({
            where: { sid: Number(id) },
            data: { sname }
        });
        res.json(updatedSubject);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the subject.' });
    }
}

const deleteSubject = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.subjects.delete({ where: { sid: Number(id) } });
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the subject.' });
    }
}

module.exports = {
    getAllSubjects,
    createSubject,
    getSubjectById,
    updateSubject,
    deleteSubject
};
