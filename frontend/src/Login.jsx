import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link, useNavigate } from 'react-router-dom'
import { backendHost } from './config'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const formSubmit = async (e) => {
    e.preventDefault()
    try {
      const ret = await fetch(backendHost + '/signin', {
        method: 'POST',
        body: JSON.stringify({
          username: username,
          password: password,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (ret.ok) {
        const data = await ret.json()
        const token = data.token
        localStorage.setItem('token', token)
        navigate('/')
        return
      }
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <div className="">
      <Form onSubmit={formSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>username</Form.Label>
          <Form.Control
            type="test"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      Or <Link to="/signup">Signup</Link>
    </div>
  )
}

export default Login
