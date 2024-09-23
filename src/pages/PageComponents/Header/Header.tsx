import HeaderCSS from './Header.module.css'
import settingsIcon from '../../../icons/settings-icon.png';

export default function Header() {
  return (
    <>
      <div className={HeaderCSS['header-container']}>
        <div className={HeaderCSS['header']}>
          <div className={HeaderCSS['left-section']}>
            <span className={HeaderCSS['attendance']}>Attendance</span>
            <span className={HeaderCSS['list']}>View List</span>
            <span className={HeaderCSS['excel']}>Excel</span>
          </div>

          <div className={HeaderCSS['right-section']}>
            <img src={settingsIcon} alt="settings icon here" />
          </div> 
        </div>
      </div>
     
    </>
  )
}