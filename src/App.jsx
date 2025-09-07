import { useState } from 'react'
import './App.css'
import { set } from 'mongoose';

function App() {
  const [preText, setPreText] = useState('');
  const [text, setText] = useState('0');

  const handleNumberClick = ( e ) => {
    //console.log(e.target.value + ' is clicked ' + text);
    if(text == '0' && e.target.value != '.'){
      setText(e.target.value);
      return;
    } 
    if(e.target.value == '.' && text == '0'){
      console.log('0.');
      setText('0' + e.target.value);
      return;
    } 
    if (e.target.value === '.') {
      const parts = text.split(/[\+\-\*\/%]/);
      const currentNumber = parts[parts.length - 1];
      if (currentNumber.includes('.')) {
      return;
      }
    }
    setText(text+e.target.value);
  };

  const handleSymbolClick = ( e ) => {
    //console.log(e.target.value + ' is clicked ' + text);
    if(e.target.value == '-' && text == '0'){
      setText('-');
      return;
    }
    if(text == '0'){
      return;
    } 
    // if(e.target.value == '-'){
    //   setText(text + '(' + e.target.value);
    // }
    let text2 = (String(text));
    //console.log(text2);
    if(text2.slice(-1) == '+' || text2.slice(-1) == '*' || text2.slice(-1) == '/'){
      return;
    }
    if(e.target.value == '%'){
      setText(text+e.target.value);
      return;
    }
    setText(text+e.target.value);
  };

  const handleC = ( e ) => {
    if(text == '0'){
      setPreText(''); 
    } 
    setText(0);
  };

  const handlePM = () => {
    setText(text * -1);
    console.log(text);
  }; 

  const handleBackspace = ( e ) => {
    console.log(e.target.value);
    if(text.length == 1){
      setText('0');
      return;
    } 
    setText(text.slice(0, -1));
  };

  const handleEqual = () => {
    let expression = text.replace(/%/g, '/100*');
    try { 
      const result = eval(expression);
      setPreText(expression);
      setText(result.toString());
    } catch (error) {
      setText('Error');
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <img src="/Vector 1.png" alt="Calculator" className="absolute top-0 left-0 object-cover z-0 ml-[10%]" />
      <div className="bg-[#323232] text-[#323232] w-[414px] h-[736px] p-4 shadow-xl z-10"> 
       
       <div className="flex flex-col justify-end h-[150px] mb-2">
          <div className="text-3xl text-gray-300 pr-4 overflow-hidden whitespace-nowrap flex justify-end">
            {preText}
          </div>
          <div className="flex items-end justify-end mt-2 pr-4 overflow-hidden">
            <span className="text-4xl text-white">=</span>
            <div className="ml-4 w-full flex justify-end overflow-hidden">
              <span className="text-6xl text-white whitespace-nowrap">
                {text}
              </span>
           </div>
          </div>
        </div>


        <div className='h-[1px] w-[100%] bg-[#74EBD5] mt-2 mb-[20px] item-center justify-center'></div>
        
        <div className="grid grid-cols-4 gap-4 mt-2">
          <button onClick={handleC} className="bg-[#74EBD5] text-white h-20 rounded-full text-3xl hover:bg-[#3D8073] transition duration-200">C</button>
          <button onClick={handlePM} className="bg-[#74EBD5] text-white h-20 rounded-full text-3xl hover:bg-[#3D8073] transition duration-200">±</button>
          <button onClick={handleSymbolClick} value={"%"} className="bg-[#74EBD5] text-white h-20 rounded-full text-3xl hover:bg-[#3D8073] transition duration-200">%</button>
          <button onClick={handleSymbolClick} value={"/"} className="bg-[#74EBD5] text-white h-20 rounded-full text-3xl hover:bg-[#3D8073] transition duration-200">÷</button>

          <button onClick={handleNumberClick} value={"7"} className="bg-[#F8F8F8] h-20 rounded-full text-3xl hover:bg-gray-400 transition duration-200">7</button>
          <button onClick={handleNumberClick} value={"8"} className="bg-[#F8F8F8] h-20 rounded-full text-3xl hover:bg-gray-400 transition duration-200">8</button>
          <button onClick={handleNumberClick} value={"9"} className="bg-[#F8F8F8] h-20 rounded-full text-3xl hover:bg-gray-400 transition duration-200">9</button>
          <button onClick={handleSymbolClick} value={"*"} className="bg-[#74EBD5]  text-white h-20 rounded-full text-3xl hover:bg-[#3D8073] transition duration-200">×</button>

          <button onClick={handleNumberClick} value={"4"} className="bg-[#F8F8F8] h-20 rounded-full text-3xl hover:bg-gray-400 transition duration-200">4</button>
          <button onClick={handleNumberClick} value={"5"} className="bg-[#F8F8F8] h-20 rounded-full text-3xl hover:bg-gray-400 transition duration-200">5</button>
          <button onClick={handleNumberClick} value={"6"} className="bg-[#F8F8F8] h-20 rounded-full text-3xl hover:bg-gray-400 transition duration-200">6</button>
          <button onClick={handleSymbolClick} value={"-"} className="bg-[#74EBD5] text-white h-20 rounded-full text-3xl hover:bg-[#3D8073] transition duration-200">-</button>

          <button onClick={handleNumberClick} value={"1"} className="bg-[#F8F8F8] h-20 rounded-full text-3xl hover:bg-gray-400 transition duration-200">1</button>
          <button onClick={handleNumberClick} value={"2"} className="bg-[#F8F8F8] h-20 rounded-full text-3xl hover:bg-gray-400 transition duration-200">2</button>
          <button onClick={handleNumberClick} value={"3"} className="bg-[#F8F8F8] h-20 rounded-full text-3xl hover:bg-gray-400 transition duration-200">3</button>
          <button onClick={handleSymbolClick} value={"+"} className="bg-[#74EBD5] text-white h-20 rounded-full text-3xl hover:bg-[#3D8073] transition duration-200">+</button>

          <button onClick={handleNumberClick} value={"."} className="bg-[#F8F8F8] h-20 rounded-full text-3xl hover:bg-gray-400 transition duration-200">.</button>
          <button onClick={handleNumberClick} value={"0"} className="bg-[#F8F8F8] h-20 rounded-full text-3xl hover:bg-gray-400 transition duration-200">0</button>
          <button onClick={handleBackspace} className="bg-[#74EBD5] text-white h-20 rounded-full text-3xl hover:bg-[#3D8073] transition duration-200">←</button>
          <button onClick={handleEqual} className="bg-[#74EBD5] text-white h-20 rounded-full text-3xl hover:bg-[#3D8073] transition duration-200">=</button>
        </div>
      </div>
    </div>
  )
}

export default App  