interface StudentProps {
  idNumber: String,
  name: String,
  program: String,
  timeIn: String
}

export default function StudentData(props: StudentProps) {
  return (
    <>
      <span>{props.idNumber}</span>
      <span>{props.name}</span>
      <span>{props.program}</span>
      <span>{props.timeIn}</span>
    </>
  )
}