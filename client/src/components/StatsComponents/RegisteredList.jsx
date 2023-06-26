import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const RegisteredList = ({list}) => {

    // console.log(rows)
    console.log(list)

    return (
        <>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 640 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{fontWeight: 'bold'}}>Names of Applicants</TableCell>
                        <TableCell sx={{fontWeight: 'bold'}}>Email</TableCell>
                        <TableCell sx={{fontWeight: 'bold'}}>Position and Role</TableCell>
                        <TableCell sx={{fontWeight: 'bold'}}>Resume</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {list.map(({user_id, position, user_name, user_email, resume_link}) => (
                        <TableRow
                            key={`${user_id}+${position}`}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {user_name}
                            </TableCell>
                            <TableCell>{user_email}</TableCell>
                            <TableCell>{position}</TableCell>
                            <TableCell><a href={resume_link} target="_blank" rel="noopener noreferrer">
                                {user_name}'s Resume
                            </a></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </>
    );
}


export default RegisteredList