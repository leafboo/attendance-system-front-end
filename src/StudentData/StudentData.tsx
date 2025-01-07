import StudentDataCSS from './StudentData.module.css'
import deleteIcon from '../icons/delete-icon.png'


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
      <td className={StudentDataCSS['name-column']}>{props.name}</td>
      <td>{props.program}</td>
      <td>{props.timeIn}</td>
      <td className={StudentDataCSS['delete-button']} > <img src={deleteIcon} alt="X" /> </td>
     
      
    </tr>
  )
}