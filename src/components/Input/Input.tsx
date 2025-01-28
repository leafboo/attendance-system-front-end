import attendanceApi from '../../api';
import InputCSS from './Input.module.css'
import React, {ChangeEvent} from 'react'
//import { Dispatch, SetStateAction } from "react";


type inputProps = {
  fetchData: () => void,
  isTimeIn: boolean,
  activeComponent: number
  //setIsTimeIn: Dispatch<SetStateAction<boolean>>   //it's basically saying "setIsTimeIn: type of useState (refer to parent component)"
};

export default function Input(props: inputProps) {

  async function addAttendance(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (addInputValue.length > 0) {
      attendanceApi.addAttendance(addInputValue, props.isTimeIn, props.fetchData)
      
      setAddInputValue("")
    } else {
      alert("Add Input Field is empty.")
    }
    
  }
 

  async function getDownloadableExcelFile(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    attendanceApi.getDownloadableExcelFile();
    
  }


  async function searchStudent() {
    if (searchInputValue.length > 0) {

    } else {
      alert("Search Input field is empty")
    }
  }


  const [searchInputValue, setSearchInputValue] = React.useState<string>("")
  const [addInputValue, setAddInputValue] = React.useState<string>("")

  const handleChangeOnSearch = (event: ChangeEvent<HTMLInputElement>) => {
    if (addInputValue.length !== 0) {
      setAddInputValue("");
    }
   
    setSearchInputValue(event.target.value);
  }
  const handleChangeOnAdd = (event: ChangeEvent<HTMLInputElement>) => {
    if (searchInputValue.length !== 0) {
      setSearchInputValue("");
    }
    setAddInputValue(event.target.value);
  }


  const attendanceInput =  (
  <div className={InputCSS['input-container-attendance']}>

    <form onSubmit={searchStudent}>

      <input type="submit" value='Search' className={InputCSS['search-button']} />
      <input type="text" value={searchInputValue} placeholder='Id Number' className={InputCSS['input-box']} onInput={handleChangeOnSearch} />
    </form>

    <form onSubmit={addAttendance} >
      <input type="submit" value='Add' className={InputCSS['add-button']} />
      <input type="text" value={addInputValue} placeholder='Id Number' className={InputCSS['input-box']} onInput={handleChangeOnAdd} />
    </form>

  </div>)

  const downloadInput = (
    <div className={InputCSS['input-container-download']}>
      <form onSubmit={getDownloadableExcelFile}>
        <button type="submit" className={InputCSS['download-button']} >Download Excel</button>
      </form>
    </div>
  )

 



  return (
    <>
      {props.activeComponent === 1 ? attendanceInput : downloadInput}
    </>
  )
}