const prisma = require('../prismaClient');

const getAllTimeTables = async (req, res) => {
    try {
        const timetables = await prisma.timetable.findMany();
        res.json(timetables);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching timetables.' });
    }
}

const createTimeTable = async (req, res) => {
    const { day, cid, tsid, ttsid } = req.body;
    try {
        const newTimetable = await prisma.timetable.create({
            data: { day, cid, tsid, ttsid }
        });
        res.status(201).json(newTimetable);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while creating the timetable entry.' });
    }
};

const getTimeTableById = async (req, res) => {
    const { id } = req.params;
    try {
        const timetable = await prisma.timetable.findUnique({ where: { ttid: Number(id) } });
        if (timetable) {
            res.json(timetable);
        } else {
            res.status(404).json({ error: 'Timetable entry not found.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the timetable entry.' });
    }
}

const updateTimeTable = async (req, res) => {
    const { id } = req.params;
    const { day, cid, tsid, ttsid } = req.body;
    try {
        const updatedTimetable = await prisma.timetable.update({
            where: { ttid: Number(id) },
            data: { day, cid, tsid, ttsid }
        });
        res.json(updatedTimetable);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the timetable entry.' });
    }
}
const deleteTimeTable = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.timetable.delete({ where: { ttid: Number(id) } });
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the timetable entry.' });
    }
}
module.exports = {
    getAllTimeTables,
    createTimeTable,
    getTimeTableById,
    updateTimeTable,
    deleteTimeTable
};
