import React from "react";
import Input from "../Input/Input";
import DeleteAllButton from "../DeleteAllButton/DeleteAllButton";
import StudentData from "../StudentData/StudentData";
import StudentListCSS from "./StudentList.module.css";
import LeftArrowIcon from "../../icons/left-arrow.png";
import RightArrowIcon from "../../icons/right-arrow.png";
import { lineSpinner } from "ldrs";
import attendanceApi from "../../api";

lineSpinner.register();

type StudentListProps = {
  activeComponent: number
};


// These two are the types for the raw data from the api
type RawAttendanceData = {
  id: number,
  time_status: number,
  date_time: string,
  student_id: string
}
type RawStudentData = {
  student_id: string,
  fName: string,
  lName: string,
  program: string,
  year: number
}


// This will hold the data that will be printed out in the student lists
type timeInStudentData = { 
  IdNumber: string,
  Name: string,
  Program: string,
  TimeIn: string 
}
type timeOutStudentData = { 
  IdNumber: string,
  Name: string,
  Program: string,
  TimeOut: string
}





export default function StudentList(props: StudentListProps) {  
  // type UseState<S> = (action: S | ((prevState: S) => S)) => void; this is the type of useState
  const [isTimeIn, setIsTimeIn] = React.useState(true); 
  const [timeInStudentData, setTimeInStudentData] = React.useState<timeInStudentData[]>() // timed in students
  const [timeOutStudentData, setTimeOutStudentData] = React.useState<timeOutStudentData[]>() // timed out students
  const [isLoading, setIsLoading] = React.useState(true);

  
  React.useEffect(()=>{
    fetchData()
  }, []) 

  async function fetchData() {
    let attendanceData: RawAttendanceData[] = []; // this holds the data from the attendance endpoint
    let studentData: RawStudentData[] = []; // this holds the data from the student endpoint

    // get the data from the api
    [attendanceData, studentData] = await attendanceApi.fetchData();
    

    
    const timeInStudentIdAndTime: [string, string][] = attendanceData.filter(student => student.time_status == 1).map(student => ([
      student.student_id, student.date_time
    ]));
    const timeOutStudentIdAndTime: [string, string][] = attendanceData.filter(student => student.time_status == 0).map(student => ([
      student.student_id, student.date_time
    ]));

    
    // use the 'Map' data type. Reason: looking up data(key=>value) in a map is 0(1) time complexity which is much faster than using an array when dealing with large data 
    const timeInIdDateTime = new Map(timeInStudentIdAndTime);
    const timeOutIdDateTime = new Map(timeOutStudentIdAndTime);


    // Filters 'allStudentInfo' to only include students whose 'student_id' is in 'IdDateTime'
    // Then creates an object for each student with their details and adds it to the result array
    // The result is an array of objects assigned to 'filteredData'
    const timeInFilteredData = studentData.filter(student => timeInIdDateTime.has(student.student_id)).map(student => ({
      IdNumber: student.student_id,
      Name: student.fName,
      Program: `${student.program}-${student.year}`,
      TimeIn: timeInIdDateTime.get(student.student_id) || "Error on API"
    }))
    const timeOutFilteredData = studentData.filter(student => timeOutIdDateTime.has(student.student_id)).map(student => ({
      IdNumber: student.student_id,
      Name: student.fName,
      Program: `${student.program}-${student.year}`,
      TimeOut: timeOutIdDateTime.get(student.student_id) || "Error on API"
    }))


    
    // Do this so that when you add an attendance, the latest one that has been added will appear on top
    timeInFilteredData.sort((a,b) => new Date(a.TimeIn).valueOf() - new Date(b.TimeIn).valueOf()).reverse()
    timeOutFilteredData.sort((a,b) => new Date(a.TimeOut).valueOf() - new Date(b.TimeOut).valueOf()).reverse()
    
    

    // TimeIn and TimeOut key's value above is in ISO format so change the format here to AM/PM
    const formatter = new Intl.DateTimeFormat('en-PH', {hour: 'numeric', minute: 'numeric'});
    const sortedTimeInData = timeInFilteredData.map(student => {return {...student, TimeIn: student.TimeIn=formatter.format(new Date(student.TimeIn))}})
    const sortedTimeOutData = timeOutFilteredData.map(student => {return {...student, TimeOut: student.TimeOut=formatter.format(new Date(student.TimeOut))}})
    


    // Update the state only if there are changes in the data
    // USE LODASH HERE !!!

      setTimeInStudentData(sortedTimeInData);
    
  
      setTimeOutStudentData(sortedTimeOutData);
    
    
    
    setIsLoading(false);
  }


  

  const timeInElement = timeInStudentData?.map(student => // if isTimeIn == 1
    <StudentData idNumber={student.IdNumber}
                 name={student.Name}
                 program={student.Program}
                 time={student.TimeIn}
                 isTimeIn={isTimeIn} 
                 fetchData={fetchData} />
  )
  const timeOutElement = timeOutStudentData?.map(student => // if isTimeIn == 0
    <StudentData idNumber={student.IdNumber}
                 name={student.Name}
                 program={student.Program}
                 time={student.TimeOut}
                 isTimeIn={isTimeIn} 
                 fetchData={fetchData} />  
  )

  let rightArrowClassName = isTimeIn === true ? 'right-arrow' : 'right-arrow-active';
  let leftArrowClassName = isTimeIn === true ? 'left-arrow-active' : 'left-arrow';


  return (
    <>
      <span className={StudentListCSS['body-container']}>
        <div className={StudentListCSS['body']}>
           <Input fetchData={fetchData} 
                  isTimeIn={isTimeIn}
                  activeComponent={props.activeComponent} /> 
          {isLoading === true ? 
          ( <div className={StudentListCSS['loading-animation']}>
              <l-line-spinner
                size="40"
                stroke="3"
                speed="1" 
                color="#DCBD9E"  ></l-line-spinner>
            </div>) : 
          (
            <span className={StudentListCSS['table-container']}>
            <table className={StudentListCSS['table']}>
              <thead>
                <tr className={StudentListCSS['column-names']}>
                  <th>Id No</th>
                  <th>Name</th>
                  <th>Program</th>
                  <th>{isTimeIn === true ? "Time In" : "Time Out"}</th>
                </tr>
              </thead>

              <tbody>
                {isTimeIn === true ? timeInElement : timeOutElement}
              </tbody>

            </table>
            </span>
          )}
          
          <div className={StudentListCSS['footer']}>
            <div className={StudentListCSS['arrows']}>
              <img src={LeftArrowIcon} alt="left arrow" className={StudentListCSS[leftArrowClassName]} onClick={() => {isTimeIn === false ? setIsTimeIn(true) : ''}} />
              <img src={RightArrowIcon} alt="right arrow" className={StudentListCSS[rightArrowClassName]} onClick={() => {isTimeIn === true ? setIsTimeIn(false) : ''}} />
            </div>
            <div className={StudentListCSS['delete-all-button']}>
              {props.activeComponent === 1 ? <DeleteAllButton fetchData={fetchData} /> : ("")}
            </div>
            
          </div>
          
         
        </div>
      </span>
      
    </>
  )
}