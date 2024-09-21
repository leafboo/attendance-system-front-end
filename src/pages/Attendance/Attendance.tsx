import Header from '../PageComponents/Header';
import StudentList from '../PageComponents/StudentList';

interface AttendanceProps {
  setActiveComponent: React.Dispatch<React.SetStateAction<number>>;
}

export default function Attendance(props: AttendanceProps) {
  return (
    <>
      <Header />
      <StudentList setActiveComponent={props.setActiveComponent} />
    </>
  )
}