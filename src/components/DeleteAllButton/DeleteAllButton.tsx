import React, {ChangeEvent} from 'react';
import DeleteAllButtonCSS from './DeleteAllButton.module.css';
import attendanceApi from '../../api';

type DeleteAllButtonProps = {
  fetchData: () => void
}


export default function DeleteAllButton(props: DeleteAllButtonProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  const deleteConfirmationCode = "delete-all-records"

  async function deleteAllStudents() {
    attendanceApi.deleteAll(props.fetchData);
    closeConfirmationModal();
  }

  function closeModal() {
    setIsDeleteModalOpen(false);
  }
  function closeConfirmationModal() {
    setIsConfirmationModalOpen(false);
  }

  function confirmDeletion() {
    if (inputValue === deleteConfirmationCode) {
      deleteAllStudents();
      closeConfirmationModal();
    } else {
      alert("Incorrect Input. Try again.");
    }
  }
  
  function openDeleteConfirmation() {
    setIsConfirmationModalOpen(true);
    closeModal();
    
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
  }
  console.log(inputValue);


  return (
    <>
      <button className={DeleteAllButtonCSS['delete-all-button']} onClick={() => setIsDeleteModalOpen(true)}>Delete All</button>
      {isDeleteModalOpen === true && isConfirmationModalOpen === false ? (
          <div id={DeleteAllButtonCSS['overlay']}>
          <div className={DeleteAllButtonCSS['delete-all-modal']}>
              <div className={DeleteAllButtonCSS['header']}>Are you sure?</div>
              <br />
              <br />
              <div>This will delete all Time In </div>
              <div>and Time out Records</div>
              
              <div className={DeleteAllButtonCSS['buttons']}>
                <button className={DeleteAllButtonCSS['no-button']} onClick={closeModal}>No</button>
                <button className={DeleteAllButtonCSS['yes-button']} onClick={openDeleteConfirmation}>Yes</button>
              </div>
            </div>
          </div>
        ) : isConfirmationModalOpen === true ? (
          <div id={DeleteAllButtonCSS['overlay']}>
          <div className={DeleteAllButtonCSS['delete-confirmation']}>
              <div className={DeleteAllButtonCSS['header']}>Note: This cannot be undone</div>
              <br />
              <br />
              <div>Type in "delete-all-records"</div>
              <input type="text" className={DeleteAllButtonCSS['input-box']} onInput={handleChange} />
              <div className={DeleteAllButtonCSS['buttons']}>
                <button className={DeleteAllButtonCSS['no-button-confirmation']} onClick={closeConfirmationModal}>Cancel</button>
                <button className={DeleteAllButtonCSS['yes-button-confirmation']} onClick={confirmDeletion}>Delete</button>
              </div>
            </div>
          </div>
        ) : ("")
      }
      
    </>
  )
}