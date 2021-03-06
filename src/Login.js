import { useState } from 'react'
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

let Login = ({ currentUser, setCurrentUser, loginValidated, setLoginValidated }) => {
    const classes = useStyles();   
    const history = useHistory()
    const [usernameError, setUsernameError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    
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
            let findID = data.find(user => {
                return user.username === currentUser.username
            })
            setCurrentUser({
                ...currentUser,
                id: findID.id
            })
        })


        fetch('http://localhost:3000/users')
        .then(res => res.json())
        .then(data => {
            if (currentUser.username==="" || currentUser.username===undefined){
                alert('Please input a username')
                setLoginValidated(false)
            } else {
                let foundUser = data.find(user => {
                    if(user.username===currentUser.username){
                        setUsernameError(false)
                        return user.username === currentUser.username
                    } else if (user.username !== currentUser.username) {
                        history.push('/login')
                        setLoginValidated(false)
                        setUsernameError(true)
                    } else {
                        history.push('/login')
                        setLoginValidated(false)
                        setUsernameError(true)  
                    }
                })
                
                if (foundUser==="" || foundUser=== undefined) {
                    alert('That user does not exist. Please create a new login.')
                } else {
                    if (currentUser.password === undefined || currentUser.password === "") {
                        alert('Please input a password')
                        history.push('/login')
                        setLoginValidated(false)
                        setPasswordError(true)
                    } else if (currentUser.password==foundUser.password) {
                        setLoginValidated(true)
                        setUsernameError(false)
                        setPasswordError(false)
                        console.log('working')
                        history.push('/')
                    }      
                }        
            }
        })
    }

    return (
        <form id="loginForm" className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
            <div className="login">
                    <div className="login-card"
                        style={usernameError=== true ? {height:'37%'} : {height:'31%'}}
                    >
                        <TextField
                            error={usernameError===true ? true : false}
                            id="filled-error"
                            label="username"
                            name="username"
                            defaultValue={currentUser.username}
                            helperText={usernameError===true ? "That user does not exist. Please create a new login." : null}
                            variant="filled"
                            onChange={handleChange}
                        />
                        <TextField
                            error={passwordError===true ? true : false}
                            id="filled-error-helper-text"
                            label="password"
                            name="password"
                            defaultValue={currentUser.password}
                            helperText={passwordError===true ? "Incorrect entry. Please enter a valid password." : null}
                            variant="outlined"
                            onChange={handleChange}
                        />
                        <div className="login-buttons">
                            <Button variant="contained" color="primary" type="submit" >Submit</Button>
                            <Button variant="contained" color="primary" onClick={() => handleCreateLogin()}>Create Login</Button>
                        </div>
                    </div>
            </div>
        </form>
    )
}

export default Login