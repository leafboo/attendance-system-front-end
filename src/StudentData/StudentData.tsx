import StudentDataCSS from './StudentData.module.css'

interface StudentProps {
  idNumber: String,
  name: String,
  program: String,
  timeIn: String
}

export default function StudentData(props: StudentProps) {
  return (
    <tr className={StudentDataCSS['student-data-row']}>
      <td>{props.idNumber}</td>
      <td>{props.name}</td>
      <td>{props.program}</td>
      <td>{props.timeIn}</td>
    </tr>
  )
}