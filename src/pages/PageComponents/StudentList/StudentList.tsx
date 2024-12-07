import React from "react"
import Input from "../Input/Input"
import StudentData from "../../../StudentData/StudentData"
import StudentListCSS from './StudentList.module.css'

// These two are the types for the raw data from the api
type RawAttendanceData = {
  id: number,
  time_status: number,
  date_time: '',
  student_id: ''
}
type RawStudentData = {
  student_id: string,
  fName: string,
  lName: string,
  program: string,
  year: number
}

// This will hold the data that will be printed out in the student lists
type StudentData = { 
  IdNumber: string,
  Name: string,
  Program: string,
  TimeIn: number
}





export default function StudentList() {
 // <Student[]> states that the variable that has this attached will be an array of objects Student
  const [studentId, setStudentId] = React.useState<string[]>([])
  const [allStudentInfo, setAllStudentInfo] = React.useState<RawStudentData[]>([])
  const [timeInStudentData, setTimeInStudentData] = React.useState<StudentData[]>()

  // const studentIds = only the student_ids in the attendance endpoint that has the time_status = 1 (time in)
  // const allStudentData = all the data of student endpoint
  // Filter using code the allStudentData that has the same student_id in studentIds 
  // Put all filtered data in useState timeInStudentData
  // Do the same for time out (worry about this later)


  React.useEffect(()=>{
    async function fetchData() {
      //const response = await fetch("https://lites-ams-api-main.vercel.app/attendance/get");
      // Make the type of data an array of types Student
      //const data: Student[] = await response.json();
      // Get the student ids in the array of objects
      //const student_ids = data.map((student) => student.student_id);
      //setStudentId(student_ids);

      const allStudentResponse = await fetch("https://lites-ams-api-main.vercel.app/student/get");
      const allStudentData = await allStudentResponse.json();
      setAllStudentInfo(allStudentData);

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
      } else {
        console.error(attendanceResponse.reason);
      }

      if (studentResponse.status == "fulfilled") {
        studentData = await studentResponse.value.json();
      } else {
        console.error(studentResponse.reason);
      }

      const student_ids = attendanceData.map(student => student.student_id);
      setStudentId(student_ids);
      setAllStudentInfo(studentData);
      
      
    }

    fetchData()
  }, [])

  console.log(studentId)
  console.log(allStudentInfo)

  // Get only the data of the students that has their id in the student_ids
  // use the 'Set' data type
  let tempStudentVariable: StudentData[];



  
 

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