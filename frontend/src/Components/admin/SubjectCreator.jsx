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
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function validateName(name) {
    const regex = /^[A-Za-z\s]+$/;
    return regex.test(name);
  }

  function handleChange(e) {
    const { value } = e.target;
    if (success) setSuccess("");
    if (validateName(value) || value === "") {
      setError("");
    } else {
      setError("Subject name should only contain letters and spaces.");
    }
    setSubjectName(value);
  }

  function handleSubmit() {
    const subject = { sname: subjectname };
    fetch(`${import.meta.env.REACT_APP_API_BASE_URL}/college/subjects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(subject),
    })
      .then((response) => response.json())
      .then((data) => {
        setSuccess("New Subject Created");
        setSubjectName("");
      })
      .catch((error) => {
        setError("Error: Could not Create New Subject");
      })
      .finally(() => {
        setIsLoading(false);
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
            disabled={isLoading}
            onChange={handleChange}
            placeholder="Enter A Subject Name"
            className="bg-transparent border border-mybl rounded-lg px-1 w-full"
          />
        </DialogHeader>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <DialogFooter>
          <button
            type="button"
            disabled={!subjectname || error || isLoading}
            className="bg-mybl px-4 py-2 rounded-lg text-white"
            onClick={handleSubmit}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white inline mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  ></path>
                </svg>
                <span>Submiting...</span>
              </>
            ) : (
              "SUBMIT"
            )}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default SubjectCreator;
