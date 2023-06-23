import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {useDispatch} from "react-redux";
import {applyForJob} from "../../features/job/jobSlice";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function ApplyModal({job_id}) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const dispatch = useDispatch()

    const handleApply = () => {
        // console.log('appling to job')
        // console.log(job_id)
        dispatch(applyForJob(job_id))
    }


    return (
        <div>
            <Button onClick={handleOpen} variant={"outlined"}>Apply Now</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        apply for Job
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 3 }}>
                        By confirming, you are about to apply for the selected job.
                    </Typography>
                    <Button
                        variant="contained"
                        sx={{ml: 27, mt:2}}
                        onClick={() => {
                            handleApply()
                            handleClose()
                        }}
                    >
                        Confirm
                    </Button>
                </Box>
            </Modal>
        </div>
    );
}
