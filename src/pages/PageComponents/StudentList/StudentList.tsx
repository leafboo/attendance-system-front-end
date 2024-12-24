import React from "react"
import Input from "../Input/Input"
import StudentData from "../../../StudentData/StudentData"
import StudentListCSS from './StudentList.module.css'

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





export default function StudentList() {
 // Not sure if 'attendanceStudentInfo' and 'allStudentInfo' is needed here
 // In POST: If the students already in timed out and timed in shouldn't be doubled
  const [attendanceStudentInfo, setAttendanceStudentInfo] = React.useState<RawAttendanceData[]>([]) // students that got their attendance checked
  const [allStudentInfo, setAllStudentInfo] = React.useState<RawStudentData[]>([]) // registered students
  const [timeInStudentData, setTimeInStudentData] = React.useState<timeInStudentData[]>() // timed in students
  const [timeOutStudentData, setTimeOutStudentData] = React.useState<timeOutStudentData[]>() // timed out students

  // const studentIds = only the student_ids in the attendance endpoint that has the time_status = 1 (time in)
  // const allStudentData = all the data of student endpoint
  // Filter using code the allStudentData that has the same student_id in studentIds 
  // Put all filtered data in useState timeInStudentData
  // Do the same for time out (worry about this later)


  React.useEffect(()=>{
    async function fetchData() {
      
      const [attendanceResponse, studentResponse] = await Promise.allSettled([
        fetch("https://lites-ams-api-main.vercel.app/attendance/get"),
        fetch("https://lites-ams-api-main.vercel.app/student/get")
      ]);

      let attendanceData: RawAttendanceData[] = [];
      let studentData: RawStudentData[] = [];

      // Promise.allSettled method returns an object that has {status: , value: } if status is 'fulfilled'. 
      // Status can either be 'fulfilled' or 'rejected'
      // When the status is 'rejected', the object becomes  {status: , reason: }

      if (attendanceResponse.status == "fulfilled") {
        attendanceData = await attendanceResponse.value.json();
        setAttendanceStudentInfo(attendanceData);
      } else {
        console.error(attendanceResponse.reason);
      }

      if (studentResponse.status == "fulfilled") {
        studentData = await studentResponse.value.json();
        setAllStudentInfo(studentData);
      } else {
        console.error(studentResponse.reason);
      }


      // Tuple of key 'student_id' and value 'date_time' from 'attendanceStudentInfo' that will be put in the 'IdDateTime'
      // How about parsing the time here ???
      const timeInStudentIdAndTime: [string, string][] = attendanceData.filter(student => student.time_status == 1).map(student => ([
        student.student_id, new Date(student.date_time).toTimeString().split(" ")[0]
      ]))
      const timeOutStudentIdAndTime: [string, string][] = attendanceData.filter(student => student.time_status == 0).map(student => ([
        student.student_id, new Date(student.date_time).toTimeString().split(" ")[0]
      ]))

      
      // use the 'Map' data type. Reason: looking up data(key=>value) in a map is 0(1) time complexity which is much faster than using an array when dealing with large data 
      const timeInIdDateTime = new Map(timeInStudentIdAndTime);
      const timeOutIdDateTime = new Map(timeOutStudentIdAndTime);


      // Filters 'allStudentInfo' to only include students whose 'student_id' is in 'IdDateTime'
      // Then creates an object for each student with their details and adds it to the result
      // The result is an array of objects assigned to 'filteredData'
      const timeInFilteredData = studentData.filter(student => timeInIdDateTime.has(student.student_id)).map(student => ({
        IdNumber: student.student_id,
        Name: student.fName,
        Program: student.program,
        TimeIn: timeInIdDateTime.get(student.student_id) || "Error on API"
      }))
      setTimeInStudentData(timeInFilteredData);


      const timeOutFilteredData = studentData.filter(student => timeOutIdDateTime.has(student.student_id)).map(student => ({
        IdNumber: student.student_id,
        Name: student.fName,
        Program: student.program,
        TimeOut: timeOutIdDateTime.get(student.student_id) || "Error on API"
      }))
      setTimeOutStudentData(timeOutFilteredData);
      
      
    }

    fetchData()
  }, [])

  console.log(timeInStudentData);
  console.log(timeOutStudentData);


 
  

  

  
  
  





  
 

  return (
    <>
      <span className={StudentListCSS['body-container']}>
        <div className={StudentListCSS['body']}>
          <Input />
          <span className={StudentListCSS['table-container']}>
            <table className={StudentListCSS['table']}>
              <thead>
                <tr className={StudentListCSS['column-names']}>
                  <th>Id No</th>
                  <th>Name</th>
                  <th>Program</th>
                  <th>Time in</th>
                </tr>
              </thead>

              <tbody>
                <StudentData idNumber="1601369" 
                             name="Eduardo Anthony B. Yalung" 
                             program="BSIT-3"
                             timeIn="8:00 AM" />

                <StudentData idNumber="1702361" 
                             name="Kareem Julian Q. Cayetano" 
                             program="BSCS-1"
                             timeIn="7:57 AM" />

                <StudentData idNumber="1701232" 
                             name="Aureliano George L. Barrameda" 
                             program="BSCS-1"
                             timeIn="7:56 AM" />

                <StudentData idNumber="1732461" 
                             name="Graciana A. Cantillo" 
                             program="BSCS-3"
                             timeIn="7:48 AM" />

                <StudentData idNumber="1612361" 
                             name="Kristofer K. Infante" 
                             program="BSCS-2"
                             timeIn="7:45 AM" />

                <StudentData idNumber="1748392" 
                             name="Brodie Derek E. Cervantes" 
                             program="BSCS-4"
                             timeIn="7:40 AM" />

                <StudentData idNumber="1232290" 
                             name="Ellis D. Arellano" 
                             program="BSCS-4"
                             timeIn="7:39 AM" />

                <StudentData idNumber="1938390" 
                             name="Cynthia A. Apostol" 
                             program="BSCS-4"
                             timeIn="7:39 AM" />

                 <StudentData idNumber="1038489" 
                             name="Jiro B. Lozada" 
                             program="BSIT-3"
                             timeIn="7:36 AM" />

                <StudentData idNumber="0182839" 
                             name="Ash V. Rodriguez" 
                             program="BSCS-1"
                             timeIn="7:35 AM" />

                <StudentData idNumber="1947389" 
                             name="Princess A. Canlas" 
                             program="BSCS-1"
                             timeIn="7:35 AM" />
              </tbody>

          </table>
          </span>
          
         
        </div>
      </span>
      
    </>
  )
}