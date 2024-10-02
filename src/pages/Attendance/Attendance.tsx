import Header from '../PageComponents/Header/Header';
import StudentList from '../PageComponents/StudentList/StudentList';

interface AttendanceProps {
  setActiveComponent: React.Dispatch<React.SetStateAction<number>>;
}

export default function Attendance(props: AttendanceProps) {
  return (
    <>
      <Header setActiveComponent={props.setActiveComponent} />
      <StudentList />
    </>
  )
}