import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "../ui/dialog";
function SubjectCreator() {
  const [subjectname, setSubjectName] = useState("");

  function handleSubmit() {
    const subject = { sname: subjectname };
    fetch("http://localhost:5000/college/subjects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(subject),
    })
      .then((response) => response.json())
      .then((data) => {
        window.alert("Success");
        console.log("Log entry created:", data);
        window.location.reload();
      })
      .catch((error) => {
        window.alert("Error");
        console.error("Error creating log entry:", error);
      });
  }

  return (
    <Dialog>
      <DialogTrigger className="bg-mybl px-4 py-2 rounded-lg text-white m-3 w-full">
        Add New Subject
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter Subject Details</DialogTitle>
          <DialogDescription>Re-check before submission</DialogDescription>

          <label htmlFor="subject" className=" font-bold">
            SubjectName:
          </label>
          <input
            type="text"
            name="subject"
            id="subject"
            value={subjectname}
            onChange={(e) => {
              setSubjectName(e.target.value);
            }}
            placeholder="Enter A Subject Name"
            className="bg-transparent border border-mybl rounded-lg px-1 w-full"
          />
        </DialogHeader>
        <DialogFooter>
          <button
            type="button"
            disabled={!subjectname}
            className=" bg-mybl px-4 py-2 rounded-lg text-white"
            onClick={handleSubmit}
          >
            SUBMIT
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default SubjectCreator;
