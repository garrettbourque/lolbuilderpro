import { react, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: 200,
      },
    },
  }));

let Login = ({ loginValidated, setLoginValidated }) => {
    const classes = useStyles();   
    const [currentUser, setCurrentUser] = useState({
        username: "",
        password: ""
    })
    const history = useHistory()

    let handleCreateLogin = () => {
        history.push('/createlogin')
    }

    let handleChange = (e) => {
        setCurrentUser({
            ...currentUser,
            [e.target.name] : e.target.value
        })
    }

    let handleSubmit = (e) => {
        e.preventDefault()
        fetch('http://localhost:3000/users')
        .then(res => res.json())
        .then(data => {
           let foundUser = data.find(user => {
                if(user.username===currentUser.username){
                    return user.username === currentUser.username
                } else {
                    alert('Please enter a valid username')
                    history.push('/login')
                    document.querySelector('#loginForm').reset()
                    setLoginValidated(false)
                }
            })
            if (foundUser.password == currentUser.password) {
                alert('This is a valid username and password')
                history.push('/')
                setLoginValidated(true)
            } else {
                alert('Please enter a valid username or password')
                history.push('/login')
                document.querySelector('#loginForm').reset()
                setLoginValidated(false)
            }
        })
    }

    return (
        <form id="loginForm" className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
            <div className="login">
                    <div className="login-card">
                        <TextField
                            id="filled-error"
                            label="username"
                            name="username"
                            defaultValue={currentUser.username}
                            //helperText="Incorrect entry. Please create a new login" 
                            variant="filled"
                            onChange={handleChange}
                        />
                        <TextField
                            id="filled-error-helper-text"
                            label="password"
                            name="password"
                            defaultValue={currentUser.password}
                            //helperText="Incorrect entry. Please try again." 
                            variant="outlined"
                            onChange={handleChange}
                        />
                        <div className="login-buttons">
                            <Button variant="contained" color="primary" type="submit">Submit</Button>
                            <Button variant="contained" color="primary" onClick={() => handleCreateLogin()}>Create Login</Button>
                        </div>
                    </div>
            </div>
        </form>
    )
}

export default Login