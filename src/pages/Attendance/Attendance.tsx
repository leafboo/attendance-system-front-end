import Header from '../../components/Header/Header';
import StudentList from '../../components/StudentList/StudentList';

type RawAttendanceData = {
  id: number,
  time_status: number,
  date_time: string,
  student_id: string
}

type AttendanceProps =  {
  activeComponent: number,
  setActiveComponent: React.Dispatch<React.SetStateAction<number>>,
  numberOfStudents: number,
  setTheNumberOfStudents: (attendanceData: RawAttendanceData[]) => void
}

export default function Attendance(props: AttendanceProps) {
  return (
    <>
      <Header activeComponent={props.activeComponent}
              setActiveComponent={props.setActiveComponent}
              numberOfStudents={props.numberOfStudents} />
      <StudentList activeComponent={props.activeComponent}
                   setTheNumberOfStudents={props.setTheNumberOfStudents} />
    </>
  )
}