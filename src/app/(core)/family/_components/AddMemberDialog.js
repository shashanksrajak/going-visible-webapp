'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Add } from '@mui/icons-material';
import { addFamilyMember } from '@/lib/server-actions/family';

export default function AddMemberDialog({ userId }) {
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Button onClick={handleClickOpen} startIcon={<Add />}>
                Add New Member
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: async (event) => {
                        event.preventDefault();
                        setLoading(true);
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries(formData.entries());
                        const email = formJson.email;
                        const name = formJson.name;

                        // Add member
                        await addFamilyMember(userId, name, email);
                        setLoading(false);
                        handleClose();
                    },
                }}
            >
                <DialogTitle>Add new family member</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        By adding a family member you agree to send them alerts based on your mood logs.
                    </DialogContentText>
                    <TextField
                        required
                        margin="dense"
                        id="email"
                        name="email"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        required
                        margin="dense"
                        id="name"
                        name="name"
                        label="Name"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant='outlined'>Cancel</Button>
                    {
                        loading ? <Button type="submit">Loading...</Button> : <Button type="submit">Add</Button>
                    }
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
