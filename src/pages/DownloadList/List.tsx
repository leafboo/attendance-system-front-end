import Header from "../../components/Header/Header"

interface AttendanceProps {
  activeComponent: Number;
  setActiveComponent: React.Dispatch<React.SetStateAction<number>>;
}

export default function List(props: AttendanceProps) {
  return (
    <>
      <Header activeComponent={props.activeComponent}
              setActiveComponent={props.setActiveComponent} />
      <span>list page</span>
    </>
  )
}