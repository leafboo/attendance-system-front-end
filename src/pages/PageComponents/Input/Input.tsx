import InputCSS from './Input.module.css'
import { Dispatch, SetStateAction } from "react";
import React from 'react'

type inputProps = {
  fetchData: () => void,
  isTimeIn: boolean,
  setIsTimeIn: Dispatch<SetStateAction<boolean>>   //it's basically saying "setIsTimeIn: type of useState (refer to parent component)"
};

export default function Input(props: inputProps) {

  async function addAttendance(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    try {
      const response = await fetch('https://lites-ams-api-main.vercel.app/attendance/add', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          student_id: inputValue,
          time_status: props.isTimeIn === true ? 1 : 0
        })
      })
      const data = await response.json();
      console.log(data)
      props.fetchData();

    } catch (error) {
      console.error(error)
    }

    
    

    console.log("button clicked")

    setInputValue("")
  }

  async function deleteAttendance(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const response = await fetch(`https://lites-ams-api-main.vercel.app/attendance/delete?student_id=${inputValue}&time_status=${timeStatus}`,{
        method: 'DELETE'
      });
      const data = await response.json();
      console.log(data)

    } catch(error) {
      console.error(error);
    }
  }

  

  const [inputValue, setInputValue] = React.useState<string>("")
  
  const switchListButtonValue = props.isTimeIn === true ? "Time Out >" : "< Time In";
  const timeStatus = props.isTimeIn === true ? 1 : 0;

  return (
    <>
      <div className={InputCSS['input-container']}>
        <form onSubmit={addAttendance} className={InputCSS['left-section']}>
          <input type="submit" value='Enter' className={InputCSS['enter-button']} />
          <input type="text" value={inputValue} placeholder='Input Id no' className={InputCSS['input-box']} onInput={(input) => { setInputValue((input.target as HTMLInputElement).value) }} />
        </form>
        <button className={InputCSS['right-section']} onClick={() => {
          props.setIsTimeIn(prevIsTimeIn => !prevIsTimeIn)
        }}>{switchListButtonValue} </button>
      </div>

    </>
  )
}