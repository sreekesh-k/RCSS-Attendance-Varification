const prisma = require('../prismaClient');

const getAllTimeSlots = async (req, res) => {
    try {
        const timeSlots = await prisma.timeSlots.findMany();
        res.json(timeSlots);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching time slots.' });
    }
}
const createTimeSlot = async (req, res) => {
    const { starttime, endtime } = req.body;
    try {
        const newTimeSlot = await prisma.timeSlots.create({
            data: { 
                starttime: starttime, 
                endtime:endtime 
            }
        });
        res.status(201).json(newTimeSlot);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while creating the time slot.' });
    }
}
const getTimeSlotById = async (req, res) => {
    const { id } = req.params;
    try {
        const timeSlot = await prisma.timeSlots.findUnique({ where: { tsid: Number(id) } });
        if (timeSlot) {
            res.json(timeSlot);
        } else {
            res.status(404).json({ error: 'Time slot not found.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the time slot.' });
    }
}

const updateTimeSlot = async (req, res) => {
    const { id } = req.params;
    const { starttime, endtime } = req.body;
    try {
        const updatedTimeSlot = await prisma.timeSlots.update({
            where: { tsid: Number(id) },
            data: { starttime, endtime }
        });
        res.json(updatedTimeSlot);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the time slot.' });
    }
}
const deleteTimeSlot = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.timeSlots.delete({ where: { tsid: Number(id) } });
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the time slot.' });
    }
}

module.exports = {
    getAllTimeSlots,
    createTimeSlot,
    getTimeSlotById,
    updateTimeSlot,
    deleteTimeSlot
};
