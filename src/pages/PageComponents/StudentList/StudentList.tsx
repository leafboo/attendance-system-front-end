import Input from "../Input/Input"
import StudentData from "../../../StudentData/StudentData"
import StudentListCSS from './StudentList.module.css'


interface StudentListProps {
  setActiveComponent: React.Dispatch<React.SetStateAction<number>>;
}

export default function StudentList(props: StudentListProps) {
  function changeComponent() {
    props.setActiveComponent(0)
  }
  return (
    <>
      <span className={StudentListCSS['body-container']}>
        <div className={StudentListCSS['body']}>
          <Input />
          <span className={StudentListCSS['table-container']}>
            <table className={StudentListCSS['table']}>
              <tr className={StudentListCSS['column-names']}>
                <th>Id No</th>
                <th>Name</th>
                <th>Program</th>
                <th>Time in</th>
              </tr>

              <StudentData idNumber="1601369" 
                              name="Eduardo Anthony B. Yalung" 
                              program="BSIT-3"
                              timeIn="8:00 AM" />

              <StudentData idNumber="1702361" 
                             name="Kareem Julian Q. Cayetano" 
                             program="BSCS-1"
                             timeIn="7:57 AM" />

                <StudentData idNumber="1701232" 
                             name="Aureliano George L. Barrameda" 
                             program="BSCS-1"
                             timeIn="7:56 AM" />

                <StudentData idNumber="1732461" 
                             name="Graciana A. Cantillo" 
                             program="BSCS-3"
                             timeIn="7:48 AM" />

                <StudentData idNumber="1612361" 
                             name="Kristofer K. Infante" 
                             program="BSCS-2"
                             timeIn="7:45 AM" />

                <StudentData idNumber="1748392" 
                             name="Brodie Derek E. Cervantes" 
                             program="BSCS-4"
                             timeIn="7:40 AM" />

             
              
          </table>
          </span>
          
          <button onClick={changeComponent} >Go to Login Page</button>
        </div>
      </span>
      
    </>
  )
}