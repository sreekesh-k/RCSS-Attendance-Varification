import React, { useState, useEffect } from 'react';

function Crud() {
    const [level, setLevel] = useState();
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [timeSlots, setTimeslots] = useState([]);
    const [selectedTimeslot, setselectedTimeslot] = useState('')
    const [teachers, setTeachers] = useState([]);
    const [day, setDay] = useState('Monday');
    const [selectedDate, setSelectedDate] = useState('');
    const [error, setError] = useState(null);
    const handleDateChange = (event) => {
        const date = new Date(event.target.value);
        const options = { weekday: 'long' };
        const dayOfWeek = new Intl.DateTimeFormat('en-US', options).format(date);
        setDay(dayOfWeek);
        setSelectedDate(event.target.value);
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

    return (
        <div className=" text-white grid place-items-center">
            <div>
                <label htmlFor="date">Select Date:</label>
                <input
                    type="date"
                    id="date"
                    value={selectedDate}
                    onChange={handleDateChange}
                />
                <p>Selected Day: {day}</p>
            </div>
            <div>
                <label>
                    <input
                        type="radio"
                        name="level"
                        value="UG"

                        onChange={() => setLevel('UG')}
                    />
                    UG
                </label>
                <label>
                    <input
                        type="radio"
                        name="level"
                        value="PG"

                        onChange={() => setLevel('PG')}
                    />
                    PG
                </label>
            </div>
            <div className=' text-black'>
                <label htmlFor="course">Course:</label>
                <select id="course" disabled={!level} value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
                    <option value="">--Select Course--</option>
                    {courses.map(course => (
                        <option key={course.cid} value={course.cid}>{course.cname}</option>
                    ))}
                </select>
            </div>

            <div className='text-black'>
                <label htmlFor="timeslot">Timeslot:</label>
                <select id="timeslot" disabled={!selectedCourse} value={selectedTimeslot} onChange={(e) => setselectedTimeslot(e.target.value)}>
                    <option value="">--Select Timeslot--</option>
                    {
                        timeSlots.map((timeslot, index) => (
                            <option key={timeslot.tsid} value={index}>{timeslot.starttime} - {timeslot.endtime}</option>
                        ))}
                </select>
            </div>
            <div className='text-black'>
                <label htmlFor="teacher">Teacher</label>
                <input type="text" name="teacher" id="teacher" disabled={!selectedTimeslot} defaultValue={teachers[selectedTimeslot]} />
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default Crud;
