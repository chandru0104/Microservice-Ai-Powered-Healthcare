'use client';
import React, { useState, useEffect } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { message, Upload } from 'antd';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from "@mui/material/Button";

const { Dragger } = Upload;
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));
const MedicalImage: React.FC = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [userAccessToken, setUserAccessToken] = useState<string | null>(null);
    const [openDailog, setOpenDailog] = useState<boolean>(false)
    const [documentType, setDocumentType] = useState<string>("")
    const [keyFindings, setkeyFindings] = useState<any>([])
    const [summary, setSummary] = useState<string>("")
    const [action, setAction] = useState<any>([])
    const [disclaimer, setDisclaimer] = useState("")

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setUserAccessToken(localStorage.getItem("userAccessToken"));
        }
    }, []);

    const props: UploadProps = {
        name: 'file',
        multiple: true,
        action: "http://localhost:5000/api/v1/ai/report",
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
                const documentType = info?.file.response?.data.report_summary.document_type
                const keyFindings = info?.file?.response.data.report_summary.key_findings
                const actions = info?.file?.response?.data?.report_summary.actionable_next_steps
                const summary = info?.file?.response?.data?.report_summary?.summary
                const disclaimer = info?.file?.response?.data?.disclaimer

                setDocumentType(documentType)
                setkeyFindings(keyFindings)
                setAction(actions)
                setSummary(summary)
                setDisclaimer(disclaimer)
                setOpenDailog(true);
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


    return (
        <>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={openDailog}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Medical Image Report
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
                <div className="w-[500px] h-[900px] px-4">
                    <p className='my-2 font-semibold bg-yellow-100 border border-gray-400 p-2'> Document Type : {documentType}</p>

                    <p className='p-2 bg-green-200 border border-gray-400 font-semibold my-2'>Key Findings : </p>
                    {keyFindings && keyFindings.map((items: any, index: any) => (
                        <div className='p-2 bg-green-200 border border-gray-400' key={index}>{items}</div>
                    ))}

                    <p className='my-2 font-semibold bg-blue-200 border border-gray-400 p-2'> Actions : </p>
                    {action && action.map((items: any, index: any) => (
                        <div className='p-2 bg-blue-200 border border-gray-400' key={index}>{items}</div>
                    ))}

                    <p className='my-2 bg-blue-200 border border-gray-400 p-2'> <p className="font-semibold">Summary :</p>{summary}</p>
                    <p className='my-2 font-semibold bg-red-200 border border-gray-400 p-2'>Disclaimer : {disclaimer}</p>

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
                <p className="ant-upload-text">Click or drag file to this area to upload (PDF)</p>
                <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibited from uploading company data or
                    other banned files.
                </p>
            </Dragger>
        </>
    );
};

export default MedicalImage;