import StudentDataCSS from './StudentData.module.css';
import deleteIcon from '../icons/delete-icon.png';
import React from 'react';
import DeleteModal from '../components/DeleteModal/DeleteModal';

type StudentProps = {
  idNumber: string,
  name: string,
  program: string,
  time: string,
  isTimeIn: boolean,
  fetchData: () => void
}

// Note to self: don't manipulate the dom when using react

export default function StudentData(props: StudentProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  
  

  function openPopUp() {
    setIsDeleteModalOpen(true);
    
  }


  return (
    <>
      <tr className={StudentDataCSS['student-data-row']}>
      <td>{props.idNumber}</td>
      <td className={StudentDataCSS['name-column']}>{props.name}</td>
      <td>{props.program}</td>
      <td>{props.time}</td>
      <td className={StudentDataCSS['delete-button']} ><img src={deleteIcon} alt="&times;" onClick={openPopUp} /> </td>

      {
        isDeleteModalOpen && <DeleteModal name={props.name} 
                                          idNumber={props.idNumber}
                                          setIsDeleteModalOpen={setIsDeleteModalOpen}
                                          fetchData={props.fetchData}
                                          isTimeIn={props.isTimeIn} />
      }
      
      
     
      
      </tr>
    </>
    
  )
}