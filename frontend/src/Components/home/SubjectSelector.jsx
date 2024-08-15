import React, { useEffect } from "react";
import Combobox from "../Combobox";

function SubjectSelector({
  selectedTeacher,
  setSubjects,
  subjects,
  selectedSubject,
  setSelectedSubject,
  isLoading,
}) {
  useEffect(() => {
    if (selectedTeacher) {
      fetch(`${import.meta.env.REACT_APP_API_BASE_URL}/college/subjects`)
        .then((response) => response.json())
        .then((data) => {
          setSubjects(data);
        })
        .catch((error) => setError("Error fetching courses: " + error.message));
    }
  }, [selectedTeacher]);

  return (
    <div className="flex gap-5 w-full">
      <label htmlFor="course" className="font-bold">
        Subjects:
      </label>
      <Combobox
        data={subjects.map((subject) => ({
          value: subject.sid,
          label: subject.sname,
        }))}
        defaultValue={selectedSubject}
        placeholder="--Select Subject--"
        noResultsMessage="No faculty found."
        onChange={({ id, name }) => setSelectedSubject(id)}
        disabled={!selectedTeacher || isLoading}
      />
    </div>
  );
}

export default SubjectSelector;
