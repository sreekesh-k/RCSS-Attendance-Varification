import React, { useState } from "react";
import CourseCreator from "./Components/admin/CourseCreator";
import TeacherCreator from "./Components/admin/TeacherCreator";

function Admin() {
  return (
    <>
      <main className="px-5">
        <CourseCreator />
        <TeacherCreator />
        
      </main>
    </>
  );
}

export default Admin;
