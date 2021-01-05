import React, { useState } from 'react';

function CalcApp() {
  const [ans, calcAns] = useState(0);
  const [operator, setOp] = useState('+');
  const [buf, setBuf] = useState(0);
  const [calc, setCalc] = useState(false);
  const [lastEqual, setLast] = useState(false);
  const numBtn = (e) => {
    setCalc(false);
    if (buf === 0) setBuf(parseInt(e.target.innerHTML));
    else setBuf(parseInt(String(buf) + e.target.innerHTML));
  }

  const opBtn = (e) => { 
    let tmp_ans = parseFloat(ans);
    console.log(tmp_ans)
    console.log(buf);
    if (operator !== '=') {
      if (lastEqual && e.target.innerHTML !== '=') setBuf(0);
      else {
        let tmp = 0;
        if (operator === '+') tmp = tmp_ans + buf;
        else if (operator === '-') tmp = tmp_ans - buf;
        else if (operator === '×') tmp = tmp_ans * buf;
        else if (operator === '÷' && buf != 0) tmp = tmp_ans / buf;
        if (Math.abs(tmp) < 0.000001 || Math.abs(tmp) > 9999999) tmp = tmp.toExponential(2);
        if (tmp % 1 !== 0) {
          if (tmp.toString().split('.')[0].length + tmp.toString().split('.')[1].length > 7)
            tmp = tmp.toFixed(7 - tmp.toString().split('.')[0].length);
      }
      calcAns(tmp);
      setCalc(true);
      }
      
      console.log('before', operator)
      if (e.target.innerHTML !== '=') {
        setOp(e.target.innerHTML);
        setBuf(0);
      }
      else setLast(true);
    }
  }
  const clearBtn = () => { 
    setCalc(false);
    setBuf(0);
    calcAns(0);
    setOp('+');
    setLast(false);
  }

  const invertBtn = () => {
    if (buf === '0' && ans !== 0) {
      calcAns(ans * (-1));
    }
    else { 
      if (parseFloat(buf) > 0) setBuf('-' + buf);
      else if (parseFloat(buf) === 0) setBuf('0');
      else setBuf((parseFloat(buf)*(-1)).toString());
    }
    
  }
  const percentBtn = (e) => {
    equalBtn(e);
    setOp('=');
    calcAns(ans / 100);
  }
  const equalBtn = (e) => { 
    opBtn(e);
  }
  const numFloat = (e) => {

  }
  const show = (calc) ? ans : buf;
  
  
  return (
    <div className="calc-app">
      <div className='calc-container'>
        <div className='calc-output'>
          <div className="calc-display">{show}</div>
        </div>
        <div className="calc-row">
          <button className='calc-btn calc-number' onClick={clearBtn}>C</button>
          <button className='calc-btn calc-number'>+/-</button>
          <button className='calc-btn calc-number'>%</button>
          <button className='calc-btn calc-operator' onClick={opBtn}>÷</button>
        </div>
        <div className="calc-row">
          <button className='calc-btn calc-number' onClick={numBtn}>7</button>
          <button className='calc-btn calc-number' onClick={numBtn}>8</button>
          <button className='calc-btn calc-number' onClick={numBtn}>9</button>
          <button className='calc-btn calc-operator' onClick={opBtn}>×</button>
        </div>
        <div className="calc-row">
          <button className='calc-btn calc-number' onClick={numBtn}>4</button>
          <button className='calc-btn calc-number' onClick={numBtn}>5</button>
          <button className='calc-btn calc-number' onClick={numBtn}>6</button>
          <button className='calc-btn calc-operator' onClick={opBtn}>-</button>
        </div>
        <div className="calc-row">
          <button className='calc-btn calc-number' onClick={numBtn}>1</button>
          <button className='calc-btn calc-number' onClick={numBtn}>2</button>
          <button className='calc-btn calc-number' onClick={numBtn}>3</button>
          <button className='calc-btn calc-operator' onClick={opBtn}>+</button>
        </div>
        <div className="calc-row">
          <button className='calc-btn calc-number bigger-btn' onClick={numBtn}>0</button>
          <button className='calc-btn calc-number' onClick={numFloat}>.</button>
          <button className='calc-btn calc-operator' onClick={equalBtn}>=</button>
        </div>
      </div>
    </div>
  );
}
export default CalcApp;