import React, { useState, useEffect } from 'react';

function Crud() {
    const [level, setLevel] = useState('');
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [timeslots, setTimeslots] = useState([]);
    const [selectedTimeslot, setSelectedTimeslot] = useState('');
    const [teachers, setTeachers] = useState([]);
    const [day, setDay] = useState('Monday');
    const [error, setError] = useState(null);
    useEffect(() => {
        if (level) {
            fetch(`http://localhost:5000/college/courses/${level}`)
                .then(response => response.json())
                .then((data) => { setCourses(data) })
                .catch(error => setError('Error fetching courses: ' + error.message));
        }
    }, [level]);


    useEffect(() => {
        if (selectedCourse) {
            fetch(`http://localhost:5000/college/timetables?cid=${selectedCourse}&day=${day}`)
                .then(response => response.json())
                .then(data => setTimeslots(data))
                .catch(error => setError('Error fetching timeslots: ' + error.message));
        }
    }, [selectedCourse, day]);


    useEffect(() => {
        if (selectedTimeslot) {
            fetch(`http://localhost:5000/college/timetables?timeslot=${selectedTimeslot}`)
                .then(response => response.json())
                .then(data => setTeachers(data))
                .catch(error => setError('Error fetching teachers: ' + error.message));
        }
    }, [selectedTimeslot]);

    return (
        <div className=" text-white grid place-items-center">
            <div>
                <label>
                    <input
                        type="radio"
                        name="level"
                        value="UG"
                        checked={level === 'UG'}
                        onChange={() => setLevel('UG')}
                    />
                    UG
                </label>
                <label>
                    <input
                        type="radio"
                        name="level"
                        value="PG"
                        checked={level === 'PG'}
                        onChange={() => setLevel('PG')}
                    />
                    PG
                </label>
            </div>

            {level && (
                <div className=' text-black'>
                    <label htmlFor="course">Course:</label>
                    <select id="course" value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
                        <option value="">--Select Course--</option>
                        {courses.map(course => (
                            <option key={course.cid} value={course.cid}>{course.cname}</option>
                        ))}
                    </select>
                </div>
            )}

            {selectedCourse && (
                <div className='text-black'>
                    <label htmlFor="timeslot">Timeslot:</label>
                    <select id="timeslot" value={selectedTimeslot} onChange={(e) => setSelectedTimeslot(e.target.value)}>
                        <option value="">--Select Timeslot--</option>
                        {timeslots.map(timeslot => (
                            <option key={timeslot.tsid} value={timeslot.tsid}>{timeslot.starttime} - {timeslot.endtime}</option>
                        ))}
                    </select>
                </div>
            )}

            {selectedTimeslot && (
                <div>
                    <label htmlFor="teacher">Teacher:</label>
                    <select id="teacher">
                        <option value="">--Select Teacher--</option>
                        {teachers.map(teacher => (
                            <option key={teacher.tid} value={teacher.tid}>{teacher.tname}</option>
                        ))}
                    </select>
                </div>
            )}

            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default Crud;
