import React, { useEffect } from "react";
import Combobox from "../Combobox";

function TeacherSelector({
  selectedTimeSlot,
  setTeachers,
  teachers,
  selectedTeacher,
  setSelectedTeacher,
  isLoading,
}) {
  useEffect(() => {
    if (selectedTimeSlot) {
      fetch(`${import.meta.env.REACT_APP_API_BASE_URL}/college/teachers`)
        .then((response) => response.json())
        .then((data) => {
          setTeachers(data);
        })
        .catch((error) => setError("Error fetching courses: " + error.message));
    }
  }, [selectedTimeSlot]);

  return (
    <div className="flex gap-5 w-full">
      <label htmlFor="course" className="font-bold">
        Faculty:
      </label>
      <Combobox
        data={teachers.map((teacher) => ({
          value: teacher.tid,
          label: teacher.tname,
        }))}
        defaultValue={selectedTeacher}
        placeholder="--Select Faculty--"
        noResultsMessage="No faculty found."
        onChange={({ id, name }) => setSelectedTeacher(id)}
        disabled={!selectedTimeSlot || isLoading}
      />
    </div>
  );
}

export default TeacherSelector;
