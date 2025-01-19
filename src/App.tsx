import React from "react"
import Login from "./pages/Login/Login"
import Attendance from "./pages/Attendance/Attendance"
import DownloadList from "./pages/DownloadList/DownloadList"


export default function App() {
  const [activeComponent, setActiveComponent] = React.useState(0)

  return (
    <>
      { activeComponent === 0 ? (
          <Login setActiveComponent={setActiveComponent} />
        ) : activeComponent === 1 ? (
          <Attendance activeComponent={activeComponent} 
                      setActiveComponent={setActiveComponent} />
        ) : activeComponent == 2 ? (
          <DownloadList activeComponent={activeComponent}
                setActiveComponent={setActiveComponent} />
        ) : ("")
      }
    </>
  )
}


