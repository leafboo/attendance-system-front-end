import DeleteModalCSS from './DeleteModal.module.css';
import { Dispatch, SetStateAction } from 'react';

type DeleteModalProps = {
  name: string,
  idNumber: string,
  setIsDeleteModalOpen: Dispatch<SetStateAction<boolean>>,
  fetchData: () => void,
  isTimeIn: boolean
}



export default function DeleteModal(props: DeleteModalProps) {

  
  function closePopUp() {
    props.setIsDeleteModalOpen(false);
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
    <>
      <div id={DeleteModalCSS['overlay']}>
      <div className={DeleteModalCSS['delete-modal']} id='delete-modal'>
          <div>Are you sure you want to remove</div>
          <div>{props.name}?</div>
          <div className={DeleteModalCSS['buttons']}>
            <button className={DeleteModalCSS['no-button']} onClick={closePopUp}>No</button>
            <button className={DeleteModalCSS['yes-button']} onClick={() => {
              deleteAttendance();
              closePopUp();
            }} >Yes</button>
          </div>
        </div>
      </div>
    </>
  )
}