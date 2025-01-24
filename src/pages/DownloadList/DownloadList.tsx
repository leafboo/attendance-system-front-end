import Header from "../../components/Header/Header";
import StudentList from "../../components/StudentList/StudentList";
import React from "react";


interface AttendanceProps {
  activeComponent: number;
  setActiveComponent: React.Dispatch<React.SetStateAction<number>>;
}

export default function List(props: AttendanceProps) {
  return (
    <>
      <Header activeComponent={props.activeComponent}
              setActiveComponent={props.setActiveComponent} />
      <StudentList activeComponent={props.activeComponent} />
    </>
  )
}