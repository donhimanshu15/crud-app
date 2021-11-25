import { useState, useEffect } from 'react';

import { Table, TableHead, TableCell, TableRow, TableBody, Button, makeStyles } from '@material-ui/core'
import { getUsers, deleteUser } from '../Service/api';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    table: {
        width: '90%',
        margin: '50px 0 0 50px'
    },
    thead: {
        '& > *': {
            fontSize: 20,
            background: '#000000',
            color: '#FFFFFF'
        }
    },
    row: {
        '& > *': {
            fontSize: 18
        }
    }
})


const AllUsers = () => {
    const [users, setUsers] = useState([]);
    const classes = useStyles();

    useEffect(() => {
        getAllUsers();
    }, []);

    const deleteUserData = async (id) => {
        await deleteUser(id);
        getAllUsers();
    }

    const getAllUsers = async () => {
        let response = await getUsers();
        setUsers(response.data);
    }

    return (
        <div>
            <div style={{ display: "flex", marginTop: 20, marginLeft: 50 }}>
                <input type="text" id="form1" class="form-control" placeholder="Search Employee Here" style={{ backgroundColor: "#ececec", width: 200, marginRight: 10 }} />

                <button type="button" className="btn btn-success" style={{ height: 40 }}>
                    SEARCH
                </button>
            </div>
            <Table className={classes.table} style={{ marginTop: 20 }} >

                <TableHead>
                    <TableRow className={classes.thead}>
                        <TableCell>Id</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Salary</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Designation</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user) => (
                        <TableRow className={classes.row} key={user.id}>
                            <TableCell>{user._id}</TableCell> {/* change it to user.id to use JSON Server */}
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.salary}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.designation}</TableCell>
                            <TableCell>
                                <Button color="primary" variant="contained" style={{ marginRight: 10 }} component={Link} to={`/edit/${user._id}`}>Edit</Button> {/* change it to user.id to use JSON Server */}
                                <Button color="secondary" variant="contained" onClick={() => deleteUserData(user._id)}>Delete</Button> {/* change it to user.id to use JSON Server */}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default AllUsers;