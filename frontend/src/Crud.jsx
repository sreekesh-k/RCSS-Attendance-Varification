import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';

function Crud() {
    const [level, setLevel] = useState();
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [timeSlots, setTimeslots] = useState([]);
    const [selectedTimeslot, setselectedTimeslot] = useState('')
    const [teachers, setTeachers] = useState([]);
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [day, setDay] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [error, setError] = useState(null);
    const [startDate, setStartDate] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0]);
    const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const handleDateChange = (event) => {
        const date = new Date(event.target.value);
        const options = { weekday: 'long' };
        const dayOfWeek = new Intl.DateTimeFormat('en-US', options).format(date);
        setDay(dayOfWeek);
        setSelectedDate(event.target.value);
    };

    const handleStudentChange = (event) => {
        const student = event.target.value;
        if (event.target.checked) {
            setSelectedStudents([...selectedStudents, student]);
        } else {
            setSelectedStudents(selectedStudents.filter(s => s !== student));
        }
    };
    const renderCheckboxes = () => {
        let checkboxes = [];
        for (let i = 1; i <= 72; i++) {
            checkboxes.push(
                <li key={i} className='relative flex items-center'>
                    <label
                        htmlFor={`checkbox-${i}`}
                        className={`flex items-center justify-center w-10 h-10 border border-slate-500 rounded-md cursor-pointer 
                ${selectedStudents.includes(i.toString()) ? 'bg-mybl text-white' : 'bg-transparent hover:bg-gray-200'}`}
                    >
                        <input
                            id={`checkbox-${i}`}
                            type="checkbox"
                            value={i}
                            onChange={handleStudentChange}
                            checked={selectedStudents.includes(i.toString())}
                            className='absolute opacity-0 w-0 h-0'
                        />
                        {i.toString().padStart(2, '0')}
                    </label>
                </li>
            );
        }
        return checkboxes;
    };

    useEffect(() => {
        if (level) {
            fetch(`http://localhost:5000/college/courses?level=${level}`)
                .then(response => response.json())
                .then((data) => { setCourses(data) })
                .catch(error => setError('Error fetching courses: ' + error.message));
        }
    }, [level]);


    useEffect(() => {
        if (selectedCourse) {
            fetch(`http://localhost:5000/college/timetables?cid=${selectedCourse}&day=${day}`)
                .then(response => response.json())
                .then(data => {
                    const ts = data.map(tt => tt.TimeSlots)
                    setTimeslots(ts)
                    const tr = data.map(tt => tt.Teachers.tname)
                    setTeachers(tr)
                }
                )
                .catch(error => setError('Error fetching timeslots: ' + error.message));
        }
    }, [selectedCourse, day]);


    const handleDownloadLogs = () => {
        setShowConfirmation(true);
    };

    const handleSubmit = () => {
        const logEntry = {
            date: date,
            courseName: selectedCourse,
            teacherName: selectedTeacher,
            students: selectedStudents,
        };

        fetch('http://localhost:5000/logs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(logEntry),
        })
            .then(response => response.json())
            .then(data => {
                window.alert("Success");
                console.log('Log entry created:', data);
                setSelectedCourse('');
                setSelectedTeacher('');
                setSelectedStudents([]);
                setDate(new Date().toISOString().split('T')[0]);
            })
            .catch(error => { window.alert("Error"); console.error('Error creating log entry:', error) });
    };

    const confirmDownload = () => {
        fetch(`http://localhost:5000/logs/all?startDate=${startDate}&endDate=${endDate}`)
            .then(response => response.json())
            .then(logs => {
                const processedLogs = logs.map(log => ({
                    ...log,
                    students: log.students.join(', '),
                }));

                const worksheet = XLSX.utils.json_to_sheet(processedLogs);
                const workbook = XLSX.utils.book_new();

                XLSX.utils.book_append_sheet(workbook, worksheet, 'Logs');
                XLSX.writeFile(workbook, 'logs.xlsx');
                setShowConfirmation(false);
            })
            .catch(error => console.error('Error fetching logs:', error));
    };

    const handleCancel = () => {
        setShowConfirmation(false);
    };

    return (
        <>
            <header className='w-full text-white flex justify-center items-center gap-5 mt-5 p-4 relative bg-black bg-opacity-35'>
                <div className='relative w-fit'>
                    <label htmlFor="from">From :</label>
                    <input
                        id='from'
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className='bg-transparent border border-slate-400 rounded-lg px-2 w-fit'
                    />
                </div>
                <div className='relative w-fit'>
                    <label htmlFor="to">To :</label>
                    <input
                        id='to'
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className='bg-transparent border border-slate-400 rounded-lg px-2 w-fit'
                    />
                </div>
                <button type='button' className='bg-mybl px-4 py-2 rounded-lg block' onClick={handleDownloadLogs}>Excel</button>
            </header>
            {showConfirmation && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
                    <div className='bg-white p-5 rounded-lg text-black'>
                        <h3 className='mb-4'>Confirm Download</h3>
                        <p>Are you sure you want to download logs between {startDate} and {endDate}?</p>
                        <div className='mt-4 flex justify-end gap-2'>
                            <button type='button' className='bg-mybl px-4 py-2 rounded-lg' onClick={confirmDownload}>Confirm</button>
                            <button type='button' className='bg-red-500 px-4 py-2 rounded-lg' onClick={handleCancel}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
            <main className='w-full mt-10 relative grid place-items-center'><div className=" grid place-items-start gap-5 text-white p-10 rounded-md min-h-[25%]">
                <div>
                    <label htmlFor="date">Date:</label>
                    <input
                        type="date"
                        id="date"
                        value={selectedDate}
                        onChange={handleDateChange}
                        className='bg-transparent border border-slate-400 rounded-lg px-1'
                    />
                </div>
                <div className=' w-full grid grid-cols-2'>
                    <label>
                        <input
                            type="radio"
                            name="level"
                            value="UG"
                            disabled={!day}
                            onChange={() => setLevel('UG')}
                        />
                        UG
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="level"
                            value="PG"
                            disabled={!day}
                            onChange={() => setLevel('PG')}
                        />
                        PG
                    </label>
                </div>
                <div>
                    <label htmlFor="course">Course:</label>
                    <select id="course" disabled={!level} value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)} className='bg-transparent border border-slate-400 rounded-lg'>
                        <option value="" className='text-black'>--Select Course--</option>
                        {courses.map(course => (
                            <option key={course.cid} value={course.cid} className='text-black'>{course.cname}</option>
                        ))}
                    </select>
                </div>

                <div >
                    <label htmlFor="timeslot">Timeslot:</label>
                    <select id="timeslot" disabled={!selectedCourse} value={selectedTimeslot} onChange={(e) => setselectedTimeslot(e.target.value)} className='bg-transparent border border-slate-400 rounded-lg'>
                        <option value="" className='text-black'>--Select Timeslot--</option>
                        {
                            timeSlots.map((timeslot, index) => (
                                <option key={timeslot.tsid} value={index} className='text-black'>{timeslot.starttime} - {timeslot.endtime}</option>
                            ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="teacher">Teacher</label>
                    <input type="text" name="teacher" id="teacher" disabled={!selectedTimeslot} defaultValue={teachers[selectedTimeslot]} className='bg-transparent border border-slate-400 rounded-lg text-white' />
                </div>
                {selectedCourse && selectedTimeslot && (
                    <div>
                        <h3>Absenties RollNo:</h3>
                        <ul className='grid grid-cols-9 gap-1'>
                            {renderCheckboxes()}
                        </ul>
                    </div>
                )}
                {selectedCourse && selectedTimeslot && (
                    <div>
                        <button type='button' className='bg-mybl px-4 py-2 rounded-lg' onClick={handleSubmit}>SUBMIT</button>
                    </div>
                )}
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div></main></>
    );
}

export default Crud;
