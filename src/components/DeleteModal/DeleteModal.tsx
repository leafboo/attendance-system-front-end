import attendanceApi from '../../api';
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
    attendanceApi.delete(props.idNumber, props.isTimeIn, props.fetchData);
  }

  return (
    <>
      <div id={DeleteModalCSS['overlay']}>
      <div className={DeleteModalCSS['delete-modal']}>
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