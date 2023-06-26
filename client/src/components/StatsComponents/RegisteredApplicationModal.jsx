import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Wrapper from "../../assets/wrappers/StatItem";
import RegisteredList from "./RegisteredList";
import {useDispatch, useSelector} from "react-redux";
import {registeredApplicant} from "../../features/user/UserSlice";
import {useState} from "react";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 1100,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function RegisteredApplicationModal({count, title, icon, color, bcg }) {
    const [open, setOpen] = React.useState(false);
    const [list, setList] = useState([])
    const { user } = useSelector(store => store.user)
    const dispatch = useDispatch()

    const handleApplied = async () => {
        const applicantList = await dispatch(registeredApplicant(user))
        setList(applicantList.payload)
        return applicantList.payload
    }


    const handleOpen = () => {
        if (title === 'Open Jobs') {
            handleApplied()
            setOpen(true)
        }
    };
    const handleClose = () => setOpen(false);


    return (
        <div>
            <Wrapper color={color} bcg={bcg} onClick={handleOpen}>
                <header>
                    <span className='count'>{count}</span>
                    <span className='icon'>{icon}</span>
                </header>
                <h5 className='title'>{title}</h5>
            </Wrapper>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Applicants details
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 5 }} style={{maxHeight: 600, overflow: 'auto'}}>
                        <RegisteredList list={list}/>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}
