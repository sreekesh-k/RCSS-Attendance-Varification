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
    <div>
      <label>
        Select Course:
        <select value={selectedCourse} onChange={handleCourseChange}>
          <option value="">--Select Course--</option>
          {courses.map((course, index) => (
            <option key={index} value={course}>{course}</option>
          ))}
        </select>
      </label>

      {selectedCourse && (
        <label>
          Select Teacher:
          <select value={selectedTeacher} onChange={handleTeacherChange}>
            <option value="">--Select Teacher--</option>
            {teachers.map((teacher, index) => (
              <option key={index} value={teacher}>{teacher}</option>
            ))}
          </select>
        </label>
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
  );
}

export default App;
