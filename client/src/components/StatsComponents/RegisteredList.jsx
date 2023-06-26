import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
];

const RegisteredList = ({list}) => {

    // console.log(rows)
    console.log(list)

    return (
        <>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 640 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Names of Applicants</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Position and Role</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {list.map(({user_id, position, user_name, user_email}) => (
                        <TableRow
                            key={`${user_id}+${position}`}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {user_name}
                            </TableCell>
                            <TableCell>{user_email}</TableCell>
                            <TableCell>{position}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </>
    );
}


export default RegisteredList