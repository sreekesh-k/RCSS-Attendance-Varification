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
    for (let i = 1; i <= 75; i++) {
      checkboxes.push(
        <li key={i} className='relative flex items-center'>
          <label
            htmlFor={`checkbox-${i}`}
            className={`flex items-center justify-center border border-mybl rounded-md cursor-pointer p-3
                ${selectedStudents.includes(i.toString()) ? 'bg-mybl text-white' : 'hover:bg-gray-200'} ${selectedTimeSlot ? '' : 'bg-slate-500 hover:bg-slate-500'}`}
          >
            <input
              id={`checkbox-${i}`}
              type="checkbox"
              value={i}
              disabled={!selectedTimeSlot}
              onChange={handleStudentChange}
              checked={selectedStudents.includes(i.toString())}
              className='hidden'
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

      <main className='relative w-full min-h-[88svh] grid place-items-center overflow-hidden py-5'>
        <div className='absolute h-full w-full left-[-75%] top-[-20%] bg-mybl rounded-full z-[-10] bg-opacity-10'></div>
        <div className='absolute h-full w-full right-[-75%] bottom-[-50%] bg-mybl rounded-full z-[-10] bg-opacity-10'></div>
        <div className=" grid w-11/12 h-full place-items-center grid-rows-2 md:grid-cols-2 md:grid-rows-1 text-black p-10 min-h-[25%] border-2 border-mybl rounded-xl">
          <div className=' w-full h-full flex flex-col items-center justify-between border-b-2 md:border-b-0 border-b-mybl md:border-r-2 md:border-r-mybl p-5'>
            <div className='flex gap-5 w-full'>
              <label htmlFor="date" className=' font-bold'>Date:</label>
              <input
                type="date"
                id="date"
                value={selectedDate}
                onChange={handleDateChange}
                className='bg-transparent border border-mybl rounded-lg px-1 w-full text-center'
              />
            </div>
            <div className=' w-full flex gap-5'>
              <div className=' font-bold'>Level:</div>
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
            <div className='flex gap-5 w-full'>
              <label htmlFor="sem" className=' font-bold'>Sem:</label>
              <select id="sem" disabled={!level} value={sem} onChange={(e) => setSem(e.target.value)} className='bg-transparent border border-mybl rounded-lg px-1 w-full text-center'>
                <option value="" >--Select Sem--</option>
                {[...Array(6)].map((_, i) => (
                  <option key={i + 1} value={i + 1} className='text-black'>{i + 1}</option>
                ))}
              </select>
            </div>
            <div className='flex gap-5 w-full'>
              <label htmlFor="course" className=' font-bold'>Course:</label>
              <select id="course" disabled={!sem} value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)} className='bg-transparent border border-mybl rounded-lg px-1 w-full text-center'>
                <option value="" className='text-black'>--Select Course--</option>
                {courses.map(course => (
                  <option key={course.cid} value={course.cid} className='text-black'>{course.cname}</option>
                ))}
              </select>
            </div>

            <div className='flex gap-5 w-full'>
              <label htmlFor="timeslot" className=' font-bold'>Timeslot:</label>
              <select id="timeslot" disabled={!selectedCourse} value={selectedTimeSlot} onChange={(e) => setSelectedTimeSlot(e.target.value)} className='bg-transparent border border-mybl rounded-lg px-1 w-full text-center'>
                <option value="" className='text-black'>--Select Timeslot--</option>
                {
                  timeSlots.map((timeslot, index) => (
                    <option key={timeslot.tsid} value={index} className='text-black'>{timeslot.starttime} - {timeslot.endtime}</option>
                  ))}
              </select>
            </div>
            <div className='flex gap-5 w-full'>
              <label htmlFor="teacher" className=' font-bold'>Teacher</label>
              <input type="text" name="teacher" id="teacher" disabled={!selectedTimeSlot} value={selectedTeacher} onChange={e => { setSelectedTeacher(e.target.value) }} className='bg-transparent border border-mybl rounded-lg px-1 w-full text-center' />
            </div>
            <div className='flex gap-5 w-full'>
              <label htmlFor="subject" className=' font-bold'>Subject</label>
              <input type="text" name="subject" id="subject" disabled={!selectedTimeSlot} value={selectedSubject} onChange={e => { setSelectedSubject(e.target.value) }} className='bg-transparent border border-mybl rounded-lg px-1 w-full text-center' />
            </div>
          </div>
          <div className='w-full h-full flex flex-col p-5'>

            <div>
              <h3 className=' font-bold'>Absenties RollNo:</h3>
              <ul className='flex flex-wrap gap-2 mt-5'>
                {renderCheckboxes()}
              </ul>
            </div>
            <div>
              <button type='button' disabled={!selectedTimeSlot} className={`${selectedTimeSlot ? 'bg-mybl cursor-pointer' : 'bg-slate-500'} mt-5 px-4 py-2 rounded-lg w-full`} onClick={handleSubmit}>SUBMIT</button>
            </div>
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div></main >
      <Download /></>

  );
}

export default Crud;
