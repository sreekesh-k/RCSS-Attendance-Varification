import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';

function App() {
  const [data, setData] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [startDate, setStartDate] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0]); 
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/courses')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setData(data);
        setCourses([...new Set(data.map(item => item.name))]);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleCourseChange = (event) => {
    const course = event.target.value;
    setSelectedCourse(course);

    const courseData = data.filter(item => item.name === course);
    setTeachers([...new Set(courseData.map(item => item.teacher))]);
  };

  const handleTeacherChange = (event) => {
    const teacher = event.target.value;
    setSelectedTeacher(teacher);

    const studentsData = data
      .filter(item => item.name === selectedCourse && item.teacher === teacher)
      .flatMap(item => item.students);

    setStudents(studentsData);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleStudentChange = (event) => {
    const student = event.target.value;
    if (event.target.checked) {
      setSelectedStudents([...selectedStudents, student]);
    } else {
      setSelectedStudents(selectedStudents.filter(s => s !== student));
    }
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
        setStudents([]);
        setSelectedStudents([]);
        setDate(new Date().toISOString().split('T')[0]);
      })
      .catch(error => { window.alert("Error"); console.error('Error creating log entry:', error) });
  };

  const handleDownloadLogs = () => {
    setShowConfirmation(true);
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
    <main className='w-full h-[88svh] grid place-items-center'>
      <div className='grid place-items-center gap-5 text-white p-10 border border-slate-100 rounded-md min-h-[25%]'>

        <input
          type="date"
          value={date}
          onChange={handleDateChange}
          className='bg-transparent border border-slate-400 rounded-lg px-2'
        />
        <select value={selectedCourse} onChange={handleCourseChange} className='bg-transparent border border-slate-400 rounded-lg'>
          <option value="" className='text-black'>--Select Course--</option>
          {courses.map((course, index) => (
            <option key={index} value={course} className='text-black'>{course}</option>
          ))}
        </select>

        {selectedCourse && (
          <select value={selectedTeacher} onChange={handleTeacherChange} className='bg-transparent border border-slate-400 rounded-lg'>
            <option value="" className='text-black'>--Select Teacher--</option>
            {teachers.map((teacher, index) => (
              <option key={index} value={teacher} className='text-black'>{teacher}</option>
            ))}
          </select>
        )}

        {selectedTeacher && (
          <div>
            <h3>Students:</h3>
            <ul>
              {students.map((student, index) => (
                <li key={index}>
                  <label>
                    <input
                      type="checkbox"
                      value={student}
                      onChange={handleStudentChange}
                      checked={selectedStudents.includes(student)}
                    />
                    {student}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        )}

        {selectedCourse && selectedTeacher && (
          <div>
            <button type='button' className='bg-mybl px-4 py-2 rounded-lg' onClick={handleSubmit}>SUBMIT</button>
          </div>
        )}

        <div>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className='bg-transparent border border-slate-400 rounded-lg px-2'
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className='bg-transparent border border-slate-400 rounded-lg px-2'
          />
          <button type='button' className='bg-mybl px-4 py-2 rounded-lg' onClick={handleDownloadLogs}>Download Logs as Excel</button>
        </div>

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
      </div>
    </main>
  );
}

export default App;
