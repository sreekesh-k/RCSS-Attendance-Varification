import React from "react";

function TeacherSubjects({
  selectedTimeSlot,
  selectedTeacher,
  setSelectedTeacher,
  selectedSubject,
  setSelectedSubject,
}) {
  return (
    <>
      <div className="flex gap-5 w-full">
        <label htmlFor="teacher" className=" font-bold">
          Teacher
        </label>
        <input
          type="text"
          name="teacher"
          id="teacher"
          disabled={!selectedTimeSlot}
          value={selectedTeacher}
          onChange={(e) => {
            setSelectedTeacher(e.target.value);
          }}
          className="bg-transparent border border-mybl rounded-lg px-1 w-full text-center"
        />
      </div>
      <div className="flex gap-5 w-full">
        <label htmlFor="subject" className=" font-bold">
          Subject
        </label>
        <input
          type="text"
          name="subject"
          id="subject"
          disabled={!selectedTimeSlot}
          value={selectedSubject}
          onChange={(e) => {
            setSelectedSubject(e.target.value);
          }}
          className="bg-transparent border border-mybl rounded-lg px-1 w-full text-center"
        />
      </div>
    </>
  );
}

export default TeacherSubjects;
