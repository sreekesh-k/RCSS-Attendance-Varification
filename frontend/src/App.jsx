

function App() {
  const buttons = [];
  for (let i = 1; i <= 64; i++) {
    buttons.push(
      <button
        type="button"
        key={i}
        className="bg-transparent border border-slate-600 text-mybl p-2 hover:bg-cyan-950 focus:bg-cyan-950 flex items-center justify-center"
      >
        {i}
      </button>
    );
  }
  return (
    <main className=" relative mt-5 xl:mt-10 h-[88svh] min-h-[650px] w-full  flex flex-col xl:gap-10 justify-center items-center">
      <div className=" relative w-full text-center text-base xl:text-4xl text-mybl font-bold"><h1>ATTENDANCE VERIFICATION</h1></div>
      <form className=" relative w-full h-full flex flex-col gap-10 py-10 max-w-[80%] xl:max-w-[60%] px-5">
        <div className="w-full h-full grid grid-cols-1 grid-rows-2 xl:grid-cols-2 xl:grid-rows-1 gap-5  justify-center items-start">
          <div className=" w-full h-full flex flex-col gap-5 xl:gap-10">
            <div className=" w-full flex-1">
              <label htmlFor="course" className=" text-mybl">COURSE</label><br />
              <select id="course" name="course" className=" bg-transparent border border-slate-600 focus:border-mybl hover:border-mybl text-slate-600 px-5 rounded-lg w-full">
                <option value="MCA" className=" text-black">MCA</option>
                <option value="MSC" className=" text-black">MSC</option>
              </select>
            </div>
            <div className=" w-full flex-1">
              <label htmlFor="semester" className=" text-mybl">SEMESTER</label><br />
              <select id="semester" name="semester" className=" bg-transparent border border-slate-600 focus:border-mybl hover:border-mybl text-slate-600 px-5 rounded-lg w-full">
                <option value="1" className=" text-black">Sem 1</option>
                <option value="2" className=" text-black">Sem 2</option>
                <option value="3" className=" text-black">Sem 3</option>
                <option value="4" className=" text-black">Sem 4</option>
              </select>
            </div>
            <div className=" w-full flex-1">
              <label htmlFor="date" className=" text-mybl">DATE</label><br />
              <input type="date" id="date" name="date" className=" bg-transparent border border-slate-600 focus:border-mybl hover:border-mybl text-slate-600 px-5 rounded-lg w-full" />
            </div>
            <div className=" w-full flex-1">
              <label htmlFor="course" className=" text-mybl">TIME SLOT</label><br />
              <select id="course" name="course" className=" bg-transparent border border-slate-600 focus:border-mybl hover:border-mybl text-slate-600 px-5 rounded-lg w-full">
                <option value="9 - 11" className=" text-black">09 - 11</option>
                <option value="11 - 11" className=" text-black">11 - 01</option>
                <option value="2 - 4" className=" text-black">02 - 04</option>
              </select>
            </div>

          </div>

          <div className="w-full h-full relative grid grid-cols-8 grid-rows-8 ">
            {buttons}
          </div>
        </div>
        <button type="submit" className=" bg-blue-800 text-white rounded-lg">SUBMIT</button>
      </form>

    </main>
  )
}

export default App
