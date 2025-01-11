import StudentDataCSS from './StudentData.module.css';
import deleteIcon from '../icons/delete-icon.png';
import React from 'react';

type StudentProps = {
  idNumber: string,
  name: string,
  program: string,
  timeIn: string
}

// Note to self: don't manipulate the dom when using react

export default function StudentData(props: StudentProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  
  function openPopUp() {
    setIsDeleteModalOpen(true);
    
  }
  function closePopUp() {
    setIsDeleteModalOpen(false);
  }


  return (
    <tr className={StudentDataCSS['student-data-row']}>
      <td>{props.idNumber}</td>
      <td className={StudentDataCSS['name-column']}>{props.name}</td>
      <td>{props.program}</td>
      <td>{props.timeIn}</td>
      <td className={StudentDataCSS['delete-button']} ><img src={deleteIcon} alt="X" onClick={openPopUp} /> </td>

      {
        isDeleteModalOpen && 
        <>
          <div id={StudentDataCSS['overlay']}>
          <div className={StudentDataCSS['delete-modal']} id='delete-modal'>
              <div>Are you sure you want to remove</div>
              <div>{props.name}?</div>
              <div className={StudentDataCSS['buttons']}>
                <button className={StudentDataCSS['no-button']} onClick={closePopUp}>No</button>
                <button className={StudentDataCSS['yes-button']} onClick={closePopUp}>Yes</button>
              </div>
            </div>
          </div>
        </>
      }
      
      
     
      
    </tr>
  )
}