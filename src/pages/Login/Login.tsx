import LoginCSS from "./Login.module.css"

export default function Login() {
  return (
    <>
      <div className={LoginCSS['login-container']}>
        <h1>
          Login Page
        </h1>
        <form action="send file here">
          Id Number: <br />
            <input type="text" name="IdNumber" /> <br />
          Password: <br />
            <input type="password" name="Password" /> <br />
            <input type="submit" value="Log in" />
        </form>
      </div>
    </>
  )
}