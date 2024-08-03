import { useState } from "react";

function Levels() {
    const [level, setLevel] = useState();


    return (
        <div className=' w-full grid grid-cols-2'>
            <label>
                <input
                    type="radio"
                    name="level"
                    value="UG"
                    disabled={!day}
                    onChange={() => setLevel('UG')}
                />
                UG
            </label>
            <label>
                <input
                    type="radio"
                    name="level"
                    value="PG"
                    disabled={!day}
                    onChange={() => setLevel('PG')}
                />
                PG
            </label>
        </div>);
}


export default Levels