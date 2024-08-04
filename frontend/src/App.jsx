import React, { useState, useEffect } from 'react';
import Download from './Components/Download';
function Crud() {
  const [day, setDay] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const [level, setLevel] = useState();
  const [sem, setSem] = useState('');

  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');

  const [timeSlots, setTimeSlots] = useState([]);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('')




  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  useEffect(() => {
    if (selectedTimeSlot) {
      setSelectedTeacher(teachers[selectedTimeSlot]);
      setSelectedSubject(subjects[selectedTimeSlot]);
      setStartTime(timeSlots[selectedTimeSlot].starttime);
      setEndTime(timeSlots[selectedTimeSlot].endtime);
    }
  }, [selectedTimeSlot, teachers, subjects]);

  const [selectedStudents, setSelectedStudents] = useState([]);
  const [count, setCount] = useState(0);

  const [error, setError] = useState(null);

  const handleDateChange = (event) => {
    const date = new Date(event.target.value);
    const options = { weekday: 'long' };
    const dayOfWeek = new Intl.DateTimeFormat('en-US', options).format(date);
    setDay(dayOfWeek);
    setSelectedDate(event.target.value);
  };

  useEffect(() => {
    if (level && sem) {
      fetch(`http://localhost:5000/college/courses?level=${level}&sem=${sem}`)
        .then(response => response.json())
        .then((data) => { setCourses(data) })
        .catch(error => setError('Error fetching courses: ' + error.message));
    }
  }, [level, sem]);

  useEffect(() => {
    if (selectedCourse) {
      fetch(`http://localhost:5000/college/timetables?cid=${selectedCourse}&day=${day}`)
        .then(response => response.json())
        .then(data => {
          const ts = data.map(tt => tt.timeslots)
          setTimeSlots(ts)
          const tr = data.map(tt => tt.teachers.tname)
          setTeachers(tr)
          const sb = data.map(tt => tt.subjects.sname)
          setSubjects(sb)
        }
        )
        .catch(error => setError('Error fetching timeslots: ' + error.message));
    }
  }, [selectedCourse, day]);


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

  const handleStudentChange = (event) => {
    const student = event.target.value;
    if (event.target.checked) {
      setSelectedStudents([...selectedStudents, student]);
      setCount(count + 1)
    } else {
      setSelectedStudents(selectedStudents.filter(s => s !== student));
      setCount(count - 1)
    }
  };
  const handleSubmit = () => {
    const logEntry = {
      date: selectedDate,
      start_time: startTime,
      end_time: endTime,
      programme: selectedCourse,
      sem: sem,
      subject: selectedSubject,
      faculty_Name: selectedTeacher,
      total_no_of_absenties: count,
      students: selectedStudents
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
        window.location.reload();
      })
      .catch(error => { window.alert("Error"); console.error('Error creating log entry:', error) });
  };


  return (
    <>
      <Download />
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
        {/* {selectedTeacher && selectedSubject && (
                    <> < h1 > {selectedSubject}</h1>
                        < h1 > {selectedTeacher}</h1>
                        < h1 > {startTime}</h1>
                        < h1 > {endTime}</h1></>)} */}
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
          <label htmlFor="sem">Sem:</label>
          <select id="sem" disabled={!level} value={sem} onChange={(e) => setSem(e.target.value)} className='bg-transparent border border-slate-400 rounded-lg'>
            <option value="" className='text-black'>--Select Sem--</option>
            {[...Array(6)].map((_, i) => (
              <option key={i + 1} value={i + 1} className='text-black'>{i + 1}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="course">Course:</label>
          <select id="course" disabled={!sem} value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)} className='bg-transparent border border-slate-400 rounded-lg'>
            <option value="" className='text-black'>--Select Course--</option>
            {courses.map(course => (
              <option key={course.cid} value={course.cid} className='text-black'>{course.cname}</option>
            ))}
          </select>
        </div>

        <div >
          <label htmlFor="timeslot">Timeslot:</label>
          <select id="timeslot" disabled={!selectedCourse} value={selectedTimeSlot} onChange={(e) => setSelectedTimeSlot(e.target.value)} className='bg-transparent border border-slate-400 rounded-lg'>
            <option value="" className='text-black'>--Select Timeslot--</option>
            {
              timeSlots.map((timeslot, index) => (
                <option key={timeslot.tsid} value={index} className='text-black'>{timeslot.starttime} - {timeslot.endtime}</option>
              ))}
          </select>
        </div>
        <div>
          <label htmlFor="teacher">Teacher</label>
          <input type="text" name="teacher" id="teacher" disabled={!selectedTimeSlot} value={selectedTeacher} onChange={e => { setSelectedTeacher(e.target.value) }} className='bg-transparent border border-slate-400 rounded-lg text-white' />
        </div>
        <div>
          <label htmlFor="subject">Subject</label>
          <input type="text" name="subject" id="subject" disabled={!selectedTimeSlot} value={selectedSubject} onChange={e => { setSelectedSubject(e.target.value) }} className='bg-transparent border border-slate-400 rounded-lg text-white' />
        </div>
        {selectedCourse && selectedTimeSlot && (
          <div>
            <h3>Absenties RollNo:</h3>
            <ul className='grid grid-cols-9 gap-1'>
              {renderCheckboxes()}
            </ul>
          </div>
        )}
        {selectedCourse && selectedTimeSlot && (
          <div>
            <button type='button' className='bg-mybl px-4 py-2 rounded-lg' onClick={handleSubmit}>SUBMIT</button>
          </div>
        )}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div></main ></>
  );
}

export default Crud;
