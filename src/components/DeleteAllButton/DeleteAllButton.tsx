import React from 'react';
import DeleteAllButtonCSS from './DeleteAllButton.module.css';

type DeleteButtonProps = {
  isTimeIn: boolean
}

export default function DeleteButton(props: DeleteButtonProps) {

  async function deleteAllStudents() {
    const endpoint = "https://lites-ams-api-main.vercel.app/attendance/clear";

    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      console.log(data);
    } catch(error) {
      console.error(error);
    }
  }

  return (
    <>
      <button className={DeleteAllButtonCSS['delete-all-button']}>Delete All</button>
      <div></div>
    </>
  )
}