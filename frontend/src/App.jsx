import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [students, setStudents] = useState([]);

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

  return (
    <main className=' w-full h-[88svh] grid place-items-center'>
      <div className=' grid place-items-center gap-5 text-white p-10 border border-slate-100 rounded-md min-h-[25%]'>

        <select value={selectedCourse} onChange={handleCourseChange} className=' bg-transparent border border-slate-400 rounded-lg'>
          <option value="" className=' text-black'>--Select Course--</option>
          {courses.map((course, index) => (
            <option key={index} value={course} className=' text-black'>{course}</option>
          ))}
        </select>


        {selectedCourse && (
          <select value={selectedTeacher} onChange={handleTeacherChange} className=' bg-transparent border border-slate-400 rounded-lg'>
            <option value="" className=' text-black'>--Select Teacher--</option>
            {teachers.map((teacher, index) => (
              <option key={index} value={teacher} className=' text-black' >{teacher}</option>
            ))}
          </select>

        )}

        {selectedTeacher && (
          <div>
            <h3>Students:</h3>
            <ul>
              {students.map((student, index) => (
                <li key={index}>{student}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
