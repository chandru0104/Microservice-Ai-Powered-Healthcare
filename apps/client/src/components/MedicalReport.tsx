'use client';
import React, { useState, useEffect } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { message, Upload } from 'antd';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from "@mui/material/Button";
import { styled } from '@mui/material/styles';

const { Dragger } = Upload;
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));
const MedicalReport: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [openDailog, setOpenDailog] = useState<boolean>(false)
  const [userAccessToken, setUserAccessToken] = useState<string | null>(null);
  const [medicineName, setMedicineName] = useState<string>("");
  const [precautions, setPrecautions] = useState<any>([])
  const [summary, setSummary] = useState<string>("")
  const [uses, setUses] = useState<any>([])
  const [disclaimer, setDisclaimer] = useState<any>("");
  const [sideEffects, setSideEffects] = useState<any>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUserAccessToken(localStorage.getItem("userAccessToken"));
    }
  }, []);

  const props: UploadProps = {
    name: 'file',
    multiple: true,
    action: "http://localhost:5000/api/v1/ai/medicine",
    headers: {
      "Authorization": `Bearer ${userAccessToken || ''}`,

    },

    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        messageApi.success(`${info.file.name} file uploaded successfully.`);
        setOpenDailog(true);
        const medicineName = info?.file?.response?.data?.medicine_name;
        const precautions = info?.file.response?.data?.precautions
        const summary = info?.file.response?.data?.summary
        const uses = info?.file?.response?.data?.uses
        const disclaimer = info?.file?.response?.data?.disclaimer
        const sideEffects = info?.file?.response?.data.side_effects

        setPrecautions(precautions)
        setMedicineName(medicineName)
        setSummary(summary)
        setUses(uses)
        setDisclaimer(disclaimer)
        setSideEffects(sideEffects)
      }
      if (status === 'error') {
        messageApi.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  const handleClose = () => {
    setOpenDailog(false);
  };

  const handleSubmit = () => {
    setOpenDailog(true);
  };


  return (
    <>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openDailog}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Symptoms Report
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <div className="w-[900px] h-[900px] p-4">
          <p>medicineName:{medicineName}</p>
          <p>precautions :</p>
          {precautions && precautions.map((items: any) => (
            <div>{items}</div>
          ))
          }
          <p>Uses:</p>
          {uses && uses.map((items: any) => (
            <div>{items}</div>
          ))

          }
          <p>sideEffects : </p>
          {sideEffects && sideEffects.map((items: any) => (
            <div>{items}</div>
          ))

          }
          <p> summary: {summary}</p>
          <p> disclaimer:{disclaimer}</p>
        </div>

        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </BootstrapDialog>
      {contextHolder}
      <Dragger {...props} >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibited from uploading company data or
          other banned files.
        </p>
      </Dragger>
    </>
  );
};

export default MedicalReport;