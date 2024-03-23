function TestLogin() {
  return (
    <div>
      <h1>Test Login</h1>
      {/* <button
        onClick={() => {
          fetch('/api/auth/login/google', {
            method: 'POST',
          })
        }}
      >
        Login with Google
      </button> */}
      <form action="/api/auth/login/google" method="POST">
        <button type="submit">Login with Google</button>
      </form>
      <form action="/api/auth/logout" method="POST">
        <button type="submit">Logout</button>
      </form>
    </div>
  )
}

export default TestLogin
