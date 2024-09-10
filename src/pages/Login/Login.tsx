import React from "react";
import LoginCSS from "./Login.module.css"

interface LoginProps {
  setActiveComponent: React.Dispatch<React.SetStateAction<number>>;
}

export default function Login(props: LoginProps) {

  function changeComponent() {
    props.setActiveComponent(1);
  }

  return (
    <>
      <div className={LoginCSS['login-container']}>
        <span>
          Login
        </span>
        
        <div className={LoginCSS['box-grid']}>
          <form action="send file here">
            <span>Id Number</span> <br />
            <input type="text" name="IdNumber" className={LoginCSS['input-box']} /> <br /> <br />
            <span>Password</span> <br />
            <input type="password" name="Password" className={LoginCSS['input-box']} /> <br />
            <input type="submit" value="Enter" className={LoginCSS['enter-button']} onClick={changeComponent} />
          </form>
        </div>
        
      </div>
    </>
  )
}