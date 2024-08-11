import React from "react";

function AbsentCheckboxList({
  selectedStudents,
  selectedTimeSlot,
  setSelectedStudents,
  setCount,
  count
}) {
  const handleStudentChange = (event) => {
    const student = event.target.value;
    if (event.target.checked) {
      setSelectedStudents([...selectedStudents, student]);
      setCount(count + 1);
    } else {
      setSelectedStudents(selectedStudents.filter((s) => s !== student));
      setCount(count - 1);
    }
  };

  const renderCheckboxes = () => {
    let checkboxes = [];
    for (let i = 1; i <= 75; i++) {
      checkboxes.push(
        <li key={i} className="relative flex items-center">
          <label
            htmlFor={`checkbox-${i}`}
            className={`flex items-center justify-center border border-mybl rounded-md cursor-pointer p-3
                ${
                  selectedStudents.includes(i.toString())
                    ? "bg-mybl text-white bg-opacity-75"
                    : "hover:bg-gray-200"
                } ${selectedTimeSlot ? "" : "bg-slate-500 hover:bg-slate-500"}`}
          >
            <input
              id={`checkbox-${i}`}
              type="checkbox"
              value={i}
              disabled={!selectedTimeSlot}
              onChange={handleStudentChange}
              checked={selectedStudents.includes(i.toString())}
              className="hidden"
            />
            {i.toString().padStart(2, "0")}
          </label>
        </li>
      );
    }
    return checkboxes;
  };

  return (
    <div>
      <h3 className=" font-bold">Absenties RollNo:</h3>
      <ul className="flex flex-wrap gap-2 mt-5">{renderCheckboxes()}</ul>
    </div>
  );
}

export default AbsentCheckboxList;
