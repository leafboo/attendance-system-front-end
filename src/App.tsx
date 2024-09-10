import React from "react"
import Login from "./pages/Login/Login"
import Attendance from "./pages/Attendance/Attendance"


export default function App() {
  const [activeComponent, setActiveComponent] = React.useState(0)

  return (
    <>
      { activeComponent === 0 ? (
          <Login setActiveComponent={setActiveComponent} />
        ) : (
          <Attendance setActiveComponent={setActiveComponent} />
        )
      }
    </>
  )
}


