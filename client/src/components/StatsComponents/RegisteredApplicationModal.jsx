import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Wrapper from "../../assets/wrappers/StatItem";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 1000,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function RegisteredApplicationModal({count, title, icon, color, bcg }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        if(title === 'Registration applications') {
            console.log(title)
            setOpen(true)
            handleApplied()
        }
    };
    const handleClose = () => setOpen(false);

    const handleApplied = () => {
            console.log('title')
    }

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
                        apply for Job
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 3 }}>
                        By confirming, you are about to apply for the selected job.
                    </Typography>
                    <Button
                        variant="contained"
                        sx={{ml: 27, mt:2}}
                        onClick={() => {
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
