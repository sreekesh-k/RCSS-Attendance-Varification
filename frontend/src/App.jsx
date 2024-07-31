import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';

function App() {
  const [data, setData] = useState([]);
  const [graduation, setGraduation] = useState('');
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [semesters, setSemesters] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState('');
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState('');
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
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleGraduationChange = (event) => {
    const graduation = event.target.value;
    setGraduation(graduation);

    const filteredData = data.filter(item => item.graduation === graduation);
    setCourses([...new Set(filteredData.map(item => item.name))]);
    setSelectedCourse('');
    setSelectedSemester('');

    // Set semesters based on graduation type
    if (graduation === 'UG') {
      setSemesters([1, 2, 3, 4, 5, 6]);
    } else if (graduation === 'PG') {
      setSemesters([1, 2, 3, 4]);
    }
  };

  const handleCourseChange = (event) => {
    const course = event.target.value;
    setSelectedCourse(course);

    const courseData = data.find(item => item.name === course);
    setTeachers(courseData ? courseData.teacher : []);
  };

  const handleSemesterChange = (event) => {
    setSelectedSemester(event.target.value);
  };

  const handleTeacherChange = (event) => {
    setSelectedTeacher(event.target.value);
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
      graduation: graduation,
      courseName: selectedCourse,
      semester: selectedSemester,
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
        setSelectedSemester('');
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
        // Process logs to ensure semester data is included
        const processedLogs = logs.map(log => ({
          date: log.date,
          courseName: log.courseName,
          semester: log.semester ? log.semester : 'N/A', // Ensure semester data is correctly mapped
          teacherName: log.teacherName,
          students: log.students.join(', '),
          createdAt: log.createdAt,
          updatedAt: log.updatedAt,
        }));
  
        // Create a worksheet and workbook
        const worksheet = XLSX.utils.json_to_sheet(processedLogs, {
          header: ["date", "courseName", "semester", "teacherName", "students", "createdAt", "updatedAt"]
        });
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
      <main className='w-full mt-10 relative grid place-items-center'>
        <div className='grid place-items-start gap-5 text-white p-10 rounded-md min-h-[25%]'>
          <div>
            <label htmlFor="date">Date:</label>
            <input
              id='date'
              type="date"
              value={date}
              onChange={handleDateChange}
              className='bg-transparent border border-slate-400 rounded-lg px-1'
            />
          </div>
          <div>
            <label htmlFor="graduation">Graduation:</label>
            <div id="graduation" className="flex gap-4">
              <label>
                <input
                  type="radio"
                  value="UG"
                  checked={graduation === 'UG'}
                  onChange={handleGraduationChange}
                />
                UG
              </label>
              <label>
                <input
                  type="radio"
                  value="PG"
                  checked={graduation === 'PG'}
                  onChange={handleGraduationChange}
                />
                PG
              </label>
            </div>
          </div>

          {graduation && (
            <div>
              <label htmlFor="course">Course:</label>
              <select id="course" value={selectedCourse} onChange={handleCourseChange} className='bg-transparent border border-slate-400 rounded-lg'>
                <option value="" className='text-black'>--Select Course--</option>
                {courses.map((course, index) => (
                  <option key={index} value={course} className='text-black'>{course}</option>
                ))}
              </select>
            </div>
          )}

          {selectedCourse && (
            <div>
              <label htmlFor="semester">Semester:</label>
              <select id="semester" value={selectedSemester} onChange={handleSemesterChange} className='bg-transparent border border-slate-400 rounded-lg'>
                <option value="" className='text-black'>--Select Semester--</option>
                {semesters.map((semester, index) => (
                  <option key={index} value={semester} className='text-black'>{semester}</option>
                ))}
              </select>
            </div>
          )}

          {selectedSemester && (
            <div>
              <label htmlFor="teachers">Teachers:</label>
              <select id="teachers" value={selectedTeacher} onChange={handleTeacherChange} className='bg-transparent border border-slate-400 rounded-lg'>
                <option value="" className='text-black'>--Select Teacher--</option>
                {teachers.map((teacher, index) => (
                  <option key={index} value={teacher} className='text-black'>{teacher}</option>
                ))}
              </select>
            </div>
          )}

          {selectedCourse && selectedTeacher && (
            <div>
              <h3>Students:</h3>
              <ul className='grid grid-cols-9 gap-1'>
                {renderCheckboxes()}
              </ul>
            </div>
          )}

          {selectedCourse && selectedTeacher && (
            <div>
              <button type='button' className='bg-mybl px-4 py-2 rounded-lg' onClick={handleSubmit}>SUBMIT</button>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export default App;
