import React from "react"
import Login from "./pages/Login/Login"
import Attendance from "./pages/Attendance/Attendance"
import List from "./pages/List/List"
import SettingsPage from "./pages/SettingsPage/SettingsPage"


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
          <List activeComponent={activeComponent}
                setActiveComponent={setActiveComponent} />
        ) : (
          <SettingsPage />
        )
      }
    </>
  )
}


