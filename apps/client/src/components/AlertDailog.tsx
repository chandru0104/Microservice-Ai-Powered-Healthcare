import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useRouter } from 'next/navigation';

export default function AlertDailog({ open }:any) {
  const [opens, setOpen] = React.useState(false);
  const router = useRouter()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("doctorAccessToken")
    localStorage.removeItem("doctorId")
    localStorage.removeItem("doctorName")
    router.push("/")

  }

  return (
    <React.Fragment>
      <button onClick={handleClickOpen}>
        Logout
      </button >
      <Dialog
        open={opens}
        onClick={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        role="alertdialog"
      >
        <DialogTitle id="alert-dialog-title">
          {"Log out of your account?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to log out? You will need to sign in again to access your saved data and preferences.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Cencel
          </Button>
          <Button onClick={handleLogout}>Logout</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
