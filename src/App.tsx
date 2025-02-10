import React from "react"
import Login from "./pages/Login/Login"
import Attendance from "./pages/Attendance/Attendance"
import DownloadList from "./pages/DownloadList/DownloadList"
import attendanceApi from "./api"

type RawAttendanceData = {
  id: number,
  time_status: number,
  date_time: string,
  student_id: string
}


export default function App() {
  const [activeComponent, setActiveComponent] = React.useState(1)

  const [numberOfStudents, setNumberOfStudents] = React.useState(0);
  
  

  async function setTheNumberOfStudents(attendanceData: RawAttendanceData[]) {
    setNumberOfStudents(attendanceData.length)
  }
  console.log(numberOfStudents)

  return (
    <>
      { activeComponent === 0 ? (
          <Login setActiveComponent={setActiveComponent} />
        ) : activeComponent === 1 ? (
          <Attendance activeComponent={activeComponent} 
                      setActiveComponent={setActiveComponent}
                      numberOfStudents={numberOfStudents}
                      setTheNumberOfStudents={setTheNumberOfStudents} />
        ) : activeComponent == 2 ? (
          <DownloadList activeComponent={activeComponent}
                        setActiveComponent={setActiveComponent}
                        numberOfStudents={numberOfStudents}
                        setTheNumberOfStudents={setTheNumberOfStudents} />
        ) : ("")
      }
    </>
  )
}


