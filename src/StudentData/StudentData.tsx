import StudentDataCSS from './StudentData.module.css'


type StudentProps = {
  idNumber: string,
  name: string,
  program: string,
  timeIn: string
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