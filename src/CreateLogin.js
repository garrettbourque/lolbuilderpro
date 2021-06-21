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

let CreateLogin = () => {
    const classes = useStyles();   
    const [newUser, setNewUser] = useState({
        username: "",
        password: ""
    })
    const history = useHistory()


    let handleChange = (e) => {
        setNewUser({
            ...newUser,
            [e.target.name] : e.target.value
        })
    }

    let handleSubmit = (e) => {
        e.preventDefault()
        if(newUser.username === "" || newUser.password === ""){
            alert('Please input a valid username or password')
            setNewUser({
                username: "",
                password: ""
            })
        } else {
            fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {'Content-type':'Application/json'}, 
            body: JSON.stringify(newUser)
            })
            .then(res => res.json())
            .then(data => {
                history.push('/login')
            })
        }
        
    }

    return (
        <form id="createLoginForm" className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
            <div className="create-login">
                <div className="create-login-card">
                    <TextField
                        id="filled-error"
                        label="username"
                        name="username"
                        //helperText="Incorrect entry. Please create a new login" 
                        variant="filled"
                        onChange={handleChange}
                    />
                    <TextField
                        id="filled-error-helper-text"
                        label="password"
                        name="password"
                        //helperText="Incorrect entry. Please try again." 
                        variant="outlined"
                        onChange={handleChange}
                    />
                    <Button variant="contained" color="primary" type="submit">Submit</Button>
                </div>
            </div>
        </form>
    )
}

export default CreateLogin