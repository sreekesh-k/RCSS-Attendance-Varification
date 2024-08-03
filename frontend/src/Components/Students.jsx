import { useState } from "react";

function Students() {
    const [selectedStudents, setSelectedStudents] = useState([]);
    const handleStudentChange = (event) => {
        const student = event.target.value;
        if (event.target.checked) {
            setSelectedStudents([...selectedStudents, student]);
        } else {
            setSelectedStudents(selectedStudents.filter(s => s !== student));
        }
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

    return (<div>
        <h3>Absenties RollNo:</h3>
        <ul className='grid grid-cols-9 gap-1'>
            {renderCheckboxes()}
        </ul>
    </div>)
}

export default Students