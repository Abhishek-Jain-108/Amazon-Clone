import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [length, setlength] = useState(8);
  const [numberAllowed,setnumberAllowed] = useState(false);
  const [charAllowed,setcharAllowed] = useState(false);
  const [password,setpassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() =>
  {
    let pass = "";
    let str = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm";

    if(numberAllowed) str+="0123456789";
    if(charAllowed) str+="!@#$%^&*(){}[]~";

    for (let i = 1; i <= length; i++) {
      
      let char = Math.floor(Math.random()*str.length+1);
      pass+=str[char];        
    }

    setpassword(pass);


  },[length,numberAllowed,charAllowed,setpassword])

  const copyPassword = useCallback(()=>
    {
      passwordRef.current?.select();
      window.navigator.clipboard.writeText(password)
    } ,[password])

  useEffect(() => {passwordGenerator()},[length,numberAllowed,charAllowed,passwordGenerator] )
  
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-500'>
        <h1 className='text-center text-white my-3'>Password Generator</h1>

        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input
            type='text'
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='Password'
            readOnly
            ref={passwordRef}
          />
          <button 
          onClick={copyPassword}
          className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>
        </div>

        <div className='flex text-sm gap-x-2'>

          <div className='flex items-center gap-x-1'>
            <input 
            type="range"
            min={8}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e) => {setlength(e.target.value)}}
            />
            <label htmlFor="">Length: {length}</label>
          </div>            

          <div className='flex items-center gap-x-1'>
            <input 
            type="checkbox"
            defaultChecked={numberAllowed}
            id="nunberInput"
            onChange={() => {setnumberAllowed((prev) => !prev)}}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>    

          <div className='flex items-center gap-x-1'>
            <input 
            type="checkbox"
            defaultChecked={charAllowed}
            id="charInput"
            onChange={() => {setcharAllowed((prev) => !prev)}}
            />
            <label htmlFor="charInput">Characters</label>
          </div>  


        </div>
      </div>
    </>
  )
}

export default App
