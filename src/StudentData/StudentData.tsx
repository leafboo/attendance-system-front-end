import StudentDataCSS from './StudentData.module.css';
import deleteIcon from '../icons/delete-icon.png';
import React from 'react';

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
  function closePopUp() {
    setIsDeleteModalOpen(false);
  }

  async function deleteAttendance() {
    try {
      const response = await fetch(`https://lites-ams-api-main.vercel.app/attendance/delete?student_id=${props.idNumber}&time_status=${props.isTimeIn ? 1 : 0}`,{
        method: 'DELETE'
      });
      const data = await response.json();
      console.log(data)
      props.fetchData();

    } catch(error) {
      console.error(error);
    }
  }

  


  return (
    <tr className={StudentDataCSS['student-data-row']}>
      <td>{props.idNumber}</td>
      <td className={StudentDataCSS['name-column']}>{props.name}</td>
      <td>{props.program}</td>
      <td>{props.time}</td>
      <td className={StudentDataCSS['delete-button']} ><img src={deleteIcon} alt="&times;" onClick={openPopUp} /> </td>

      {
        isDeleteModalOpen && 
        <>
          <div id={StudentDataCSS['overlay']}>
          <div className={StudentDataCSS['delete-modal']} id='delete-modal'>
              <div>Are you sure you want to remove</div>
              <div>{props.name}?</div>
              <div className={StudentDataCSS['buttons']}>
                <button className={StudentDataCSS['no-button']} onClick={closePopUp}>No</button>
                <button className={StudentDataCSS['yes-button']} onClick={() => {
                  deleteAttendance();
                  closePopUp();
                }} >Yes</button>
              </div>
            </div>
          </div>
        </>
      }
      
      
     
      
    </tr>
  )
}