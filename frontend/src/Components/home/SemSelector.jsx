import React from "react";

function SemSelector({ sem, setSem, level, isLoading }) {
  return (
    <div className="flex gap-5 w-full">
      <label htmlFor="sem" className=" font-bold">
        Sem:
      </label>
      <select
        id="sem"
        disabled={!level || isLoading}
        value={sem}
        onChange={(e) => setSem(e.target.value)}
        className="bg-transparent border border-mybl rounded-lg px-1 w-full text-center"
      >
        <option value="">--Select Sem--</option>
        {[...Array(6)].map((_, i) => (
          <option key={i + 1} value={i + 1} className="text-black">
            {i + 1}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SemSelector;
