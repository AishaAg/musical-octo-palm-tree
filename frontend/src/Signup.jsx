import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link, useNavigate } from 'react-router-dom'
import { backendHost } from './config'

function Signup() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const navigate = useNavigate()
  const formSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert('Please enter same password')
      return
    }
    try {
      const ret = await fetch(backendHost + '/user', {
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
      } else if (ret.status === 409) {
        alert('Username Already Taken')
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
        <Form.Group className="mb-3" controlId="formBasicPasswordConfirmation">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      Or <Link to="/login">Login</Link>
    </div>
  )
}

export default Signup
