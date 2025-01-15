import HeaderCSS from './Header.module.css'


interface AttendanceProps {
  activeComponent: Number;
  setActiveComponent: React.Dispatch<React.SetStateAction<number>>;
}

export default function Header(props: AttendanceProps) {

  return (
    <>
      <div className={HeaderCSS['header-container']}>
        <div className={HeaderCSS['header']}>
          <div className={HeaderCSS['pages']}>
            <span className={props.activeComponent === 1 ? HeaderCSS['active-page'] : HeaderCSS['attendance']}
                  onClick={() => {props.setActiveComponent(1)}} >Attendance</span>
            <span className={props.activeComponent === 2 ? HeaderCSS['active-page'] : HeaderCSS['download-list']}
                  onClick={() => {props.setActiveComponent(2)}} >Download List</span>
          </div>

          
        </div>
      </div>
     
    </>
  )
}