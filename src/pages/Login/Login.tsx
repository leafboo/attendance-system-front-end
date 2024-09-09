import LoginCSS from "./Login.module.css"

export default function Login() {
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
            <input type="submit" value="Enter" className={LoginCSS['enter-button']} />
          </form>
        </div>
        
      </div>
    </>
  )
}