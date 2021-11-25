import { useState, useEffect } from 'react';
import { FormGroup, FormControl, InputLabel, Input, Button, makeStyles, Typography } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import { getUsers, editUser } from '../Service/api';

const initialValue = {
    name: '',
    username: '',
    email: '',
    phone: ''
}

const useStyles = makeStyles({
    container: {
        width: '50%',
        margin: '5% 0 0 25%',
        '& > *': {
            marginTop: 20
        }
    }
})

const EditUser = () => {
    const [user, setUser] = useState(initialValue);
    const { name, salary, email, designation } = user;
    const { id } = useParams();
    const classes = useStyles();
    let history = useHistory();

    useEffect(() => {
        loadUserDetails();
    }, []);

    const loadUserDetails = async () => {
        const response = await getUsers(id);
        setUser(response.data);
    }

    const editUserDetails = async () => {
        const response = await editUser(id, user);
        history.push('/all');
    }

    const onValueChange = (e) => {
        console.log(e.target.value);
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    return (
        <FormGroup className={classes.container}>
            <Typography variant="h4">Edit Information</Typography>
            <FormControl>
                <InputLabel htmlFor="my-input">Name</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='name' value={name} id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Salary</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='salary' value={salary} id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Email</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='email' value={email} id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
            <FormControl>
                <div >
                    <select name='designation' value={designation} onChange={(e) => onValueChange(e)} id="my-input" style={{ width: 700, height: 40 }} >
                        <option value="Select Designation:">Select Designation:</option>
                        <option value="Accounts Manager">Accounts Manager</option>
                        <option value="Recruitment Manager">Recruitment Manager</option>
                        <option value="Marketing Coordinator">Marketing Coordinator</option>
                        <option value="Web Designer">Web Designer</option>
                        <option value="Account Executive">Account Executive</option>
                        <option value="President of Sales">President of Sales</option>
                        <option value="Nursing Assistant">Nursing Assistant</option>
                        <option value="Project Manager">Project Manager</option>

                    </select>
                </div>
            </FormControl>
            <FormControl>
                <Button variant="contained" color="primary" onClick={() => editUserDetails()}>Edit User</Button>
            </FormControl>
        </FormGroup>
    )
}

export default EditUser;