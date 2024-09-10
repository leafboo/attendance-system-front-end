import AttendanceCSS from './Attendance.module.css'

interface AttendanceProps {
  setActiveComponent: React.Dispatch<React.SetStateAction<number>>;
}

export default function Attendance(props: AttendanceProps) {

  function changeComponent() {
    props.setActiveComponent(0)
  }

  return (
    <>
      <div className={AttendanceCSS['header']}>
        <div className={AttendanceCSS['left-section']}>
          <span>Attendance</span>
          <span>View List</span>
          <span>Excel</span>
        </div>

        <div className={AttendanceCSS['right-section']}>
          <img src="" alt="settings icon here" />
        </div> 
      </div>

      <span className={AttendanceCSS['body-container']}>
        <div className={AttendanceCSS['body']}>
          <div className={AttendanceCSS['input-container']}>
            <form action="">
              <input type="submit" value='Enter' />
              <input type="text" placeholder='Input Id no' />
            </form>
            <button>Time out &gt;</button>
          </div>

          <span className={AttendanceCSS['table-container']}>
            <div className={AttendanceCSS['table']}>
              <div className={AttendanceCSS['column-names']}>
                <span>Id No</span>
                <span>Name</span>
                <span>Program</span>
                <span>Time in</span>
              </div>
              <div className={AttendanceCSS['list']}>
                <span>1601369</span>
                <span>Jan Romel V. Caranguian</span>
                <span>BSIT-3</span>
                <span>7:45 AM</span>
              </div>
              
          </div>
          </span>
          
          <button onClick={changeComponent} >Go to Login Page</button>
        </div>
      </span>
      
      
    </>
  )
}