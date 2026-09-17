"use client"

import Footer from "apps/client/src/components/Footer"
import Navbar from "apps/client/src/components/Navbar"
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import Image from "next/image";
import MedicalReport from "apps/client/src/components/MedicalReport";
import MedicalImage from "apps/client/src/components/MedicalReport"
import { useState } from "react";
import { Box } from '@mui/material';
import { aiSymptomsCheck, medicalReportAnalyzer } from "../../../services/aiService"
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));


const AiStudio = () => {

  const [openDailog, setOpenDailog] = useState<boolean>(false)
  const [recommendedSpecialist, setRecommendedSpecialist] = useState<any>("")
  const [triageLevel, setTriageLevel] = useState<any>("")
  const [homeCare, setHomeCare] = useState<any[]>([])
  const [disclaimer, setDisclaimer] = useState("")
  const [possibleConditions, setPossibleConditions] = useState<any[]>([])
  console.log(homeCare)
  const [options, setOption] = useState({ option1: "", option2: "", option3: "", option4: "" })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const post = await aiSymptomsCheck(options)
      setOpenDailog(true)
      const recommended_specialist = post?.data?.data?.recommended_specialist || "No possible conditions found"
      setRecommendedSpecialist(recommended_specialist)

      const triageLevel = post?.data?.data?.triage_level || ""
      setTriageLevel(triageLevel)

      const homeCare = post?.data?.data?.home_care || ""
      setHomeCare(homeCare)

      const disclaim = post?.data?.data.disclaimer || ""
      setDisclaimer(disclaim)

      const possibles = post?.data?.data.possible_conditions || ""
      setPossibleConditions(possibles)
      return post

    } catch (error: any) {
      console.log(error.message)
      return null
    }

  }

  const handleClose = () => {
    setOpenDailog(false);
  };

  const medicalReportAnalyzerSubmit = async (data: any) => {
    try {
      const post = await medicalReportAnalyzer(data)
    } catch (error: any) {
      console.log(error.message)
    }
  }


  return (
    <>{openDailog &&
      <React.Fragment>
        <Button variant="outlined" onClick={handleSubmit}>
          Open dialog
        </Button>
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
          <div className="w-[500px] h-[900px] px-2">
            {possibleConditions && possibleConditions.map((items: any, index: any) => (
              <div key={index} className="bg-blue-200 p-2 border border-gray-400 ">
                <div>condition : {items.condition}</div>
                <div>probability : {items.probability}</div>
                <div>reason : {items.reason}</div>
              </div>
            ))
            }
            <p className="p-2 bg-orange-200 border border-gray-400">Recommended Specialist : {recommendedSpecialist}</p>
            <p className="p-2 bg-orange-200 border border-gray-400">Triage Level : {triageLevel}</p>
            <div className="p-2 bg-orange-200 border border-gray-400">{homeCare}</div>
            <div className="p-2 bg-green-200 border border-gray-400">
              <p>Home Care : </p>
              {homeCare && homeCare.map((items: any, index: any) => (

                <div key={index}>

                  <div className=""> {items}</div>
                </div>
              ))

              }
            </div>
            <div className="my-2 p-2 bg-red-200 border border-gray-400 font-semibold">Disclaimer : {disclaimer}</div>
          </div>

          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Close
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </React.Fragment>
    }
      <Navbar />
      <div className="max-w-6xl mx-auto p-3 ">
        <div className="mb-10">
          <h1 className="text-2xl text-center sm:text-4xl">Your Health, Simplified by AI</h1>
          <p className="text-1xl text-center sm:text-1xl ">Understand your symptoms and medical reports with clear, AI-powered insights—so you can make better-informed health decisions</p>

        </div>
        <div className="flex item-center justify-center gap-20 mb-10">
          <Box component="form" onSubmit={handleSubmit} >
            <div className="flex flex-col gap-3 ">
              <h2 className="text-center">Check Your Symptoms</h2>
              <p className="text-center">Not feeling well? Let our AI analyze your symptoms and suggest the right care.</p>

              <TextField
                label="Symptom 1"
                id="outlined-size-small"
                size="small"
                name="option1"
                value={options.option1}
                onChange={(e) => setOption({ ...options, option1: e.target.value })}
              />
              <TextField
                label="Symptom 2"
                name="option2"
                id="outlined-size-small"
                size="small"
                value={options.option2}
                onChange={(e) => setOption({ ...options, option2: e.target.value })}
              />
              <TextField
                label="Symptom 3"
                id="outlined-size-small"
                size="small"
                name="option3"
                value={options.option3}
                onChange={(e) => setOption({ ...options, option3: e.target.value })}
              />
              <TextField
                label="Symptom 4"
                id="outlined-size-small"
                size="small"
                name="option4"
                value={options.option4}
                onChange={(e) => setOption({ ...options, option4: e.target.value })}
              /> <br />
              <Button type="submit">Check Symptoms</Button>
            </div>
          </Box>
          <div className="hidden sm:block pt-20">
            <Image src={"/ai-symtoms-1.jpg"} alt="symtoms" width={500} height={550} />
          </div>
        </div>

        <div className="flex pt-8 gap-10 max-w-7xl mx-auto item-center justify-center mb-10">
          <div >
            <h2 className="text-center pb-4">Smart Medical Report Analyzer</h2>
            <p className="text-center pb-4">Upload your lab reports or medical prescriptions, and <br />let our AI translate complex medical jargon into clear, easy-to-understand insights.</p>

            <div className="w-[400px] sm:w-[600px]"><MedicalReport /></div>
          </div>
          <div className="hidden sm:block pt-6">
            <Image src={"/ai-report.jpg"} alt="ai-report" width={500} height={350} />
          </div>
        </div>
        <div className=" sm:flex pt-8 gap-10 max-w-7xl mx-auto item-center justify-center mb-10 ">
          <div >
            <h2 className="text-center pb-4">AI-Powered Medical Image Analysis</h2>
            <p className="text-center pb-4">Upload your medical images and get simple, <br />AI-powered insights to better understand your results.</p>
            <div className="w-[400px] sm:w-[600px]"><MedicalImage /></div>
          </div>
          <div className="hidden sm:block pt-6">
            <Image src={"/ai-report2.jpg"} alt="ai-report" width={500} height={350} />
          </div>
        </div>

      </div>
      <span className="w-[400px] sm:w-[750px] mx-auto block text-xs text-center border border-blue-600 bg-orange-200 text-blue-900 p-2 rounded-lg ">Note: This tool provides AI-based insights for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment.Always consult a healthcare provider for medical concerns.</span>
      <Footer />
    </>
  )
}

export default AiStudio