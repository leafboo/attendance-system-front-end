import React from 'react';
import HeaderCSS from './Header.module.css'




interface AttendanceProps {
  activeComponent: Number;
  setActiveComponent: React.Dispatch<React.SetStateAction<number>>;
  numberOfStudents: number
}

export default function Header(props: AttendanceProps) {
  

  const studentCounter = (
    <span className={HeaderCSS['student-counter']}>
      {props.numberOfStudents ? `student counter: ${props.numberOfStudents}` : 'student counter: 0'}
    </span>
  )

  

  return (
    <>
      <div className={HeaderCSS['header-container']}>
        <div className={HeaderCSS['header']}>
          <div className={HeaderCSS['pages']}>
            <span className={props.activeComponent === 1 ? HeaderCSS['active-page'] : HeaderCSS['attendance']}
                  onClick={() => {props.setActiveComponent(1)}} >Attendance</span>
            <span className={props.activeComponent === 2 ? HeaderCSS['active-page'] : HeaderCSS['download-list']}
                  onClick={() => {props.setActiveComponent(2)}} >Download List</span>
            {props.activeComponent === 1 ? studentCounter : ""}
            
          </div>
         

          
        </div>
      </div>
     
    </>
  )
}