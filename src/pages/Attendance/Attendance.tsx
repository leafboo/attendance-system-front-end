import Header from '../PageComponents/Header/Header';
import StudentList from '../PageComponents/StudentList/StudentList';

interface AttendanceProps {
  activeComponent: Number;
  setActiveComponent: React.Dispatch<React.SetStateAction<number>>;
}

export default function Attendance(props: AttendanceProps) {
  return (
    <>
      <Header activeComponent={props.activeComponent}
              setActiveComponent={props.setActiveComponent} />
      <StudentList />
    </>
  )
}