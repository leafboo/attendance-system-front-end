import React, {ChangeEvent} from 'react';
import DeleteAllButtonCSS from './DeleteAllButton.module.css';

type DeleteAllButtonProps = {
  fetchData: () => void
}


export default function DeleteAllButton(props: DeleteAllButtonProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  const deleteConfirmationCode = "delete-all-records"

  async function deleteAllStudents() {
    const endpoint = "https://lites-ams-api-main.vercel.app/attendance/clear";

    try {
      const response = await fetch(endpoint, {
        method: 'DELETE'
      });
      const data = await response.json();
      console.log(data);
      props.fetchData();
    } catch(error) {
      console.error(error);
    }

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
    if (isConfirmationModalOpen === false) {
      setIsConfirmationModalOpen(true);
      closeModal();
    } else {
      
    }
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
              <div>Are you sure you want to remove</div>
              <div>all records?</div>
              <div className={DeleteAllButtonCSS['buttons']}>
                <button className={DeleteAllButtonCSS['no-button']} onClick={closeModal}>No</button>
                <button className={DeleteAllButtonCSS['yes-button']} onClick={openDeleteConfirmation}>Yes</button>
              </div>
            </div>
          </div>
        ) : isConfirmationModalOpen === true ? (
          <div id={DeleteAllButtonCSS['overlay']}>
          <div className={DeleteAllButtonCSS['delete-confirmation']}>
              <div>Note: This cannot be undone</div>
              <div>Type in "delete-all-records"</div>
              <input type="text" className={DeleteAllButtonCSS['input-box']} onInput={handleChange} />
              <div className={DeleteAllButtonCSS['buttons']}>
                <button className={DeleteAllButtonCSS['no-button']} onClick={closeConfirmationModal}>Cancel</button>
                <button className={DeleteAllButtonCSS['yes-button']} onClick={confirmDeletion}>Delete</button>
              </div>
            </div>
          </div>
        ) : ("")
      }
      
    </>
  )
}