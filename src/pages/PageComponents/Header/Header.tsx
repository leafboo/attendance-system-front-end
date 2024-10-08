import HeaderCSS from './Header.module.css'
import settingsIcon from '../../../icons/settings-icon.png';

interface AttendanceProps {
  activeComponent: Number;
  setActiveComponent: React.Dispatch<React.SetStateAction<number>>;
}

export default function Header(props: AttendanceProps) {

  return (
    <>
      <div className={HeaderCSS['header-container']}>
        <div className={HeaderCSS['header']}>
          <div className={HeaderCSS['left-section']}>
            <span className={props.activeComponent === 1 ? HeaderCSS['active-page'] : HeaderCSS['attendance']}
                  onClick={() => {props.setActiveComponent(1)}} >Attendance</span>
            <span className={props.activeComponent === 2 ? HeaderCSS['active-page'] : HeaderCSS['list']}
                  onClick={() => {props.setActiveComponent(2)}} >View List</span>
            <span className={HeaderCSS['excel']}>Excel</span>
          </div>

          <div className={HeaderCSS['right-section']}
               onClick={() => {props.setActiveComponent(3)}} >
            <img src={settingsIcon} alt="settings icon here" />
          </div> 
        </div>
      </div>
     
    </>
  )
}