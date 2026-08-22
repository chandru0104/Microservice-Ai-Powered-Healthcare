
import Footer from "apps/client/src/components/Footer"
import Navbar from "apps/client/src/components/Navbar"
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import Image from "next/image";
import FileUpload from "apps/client/src/components/FileUpload";
import AiSection from "apps/client/src/components/Ai-sectionA";

const AiStudio = () => {
  return (
    <>
      <Navbar />
      <AiSection/>
      <div className="max-w-6xl mx-auto p-3 ">
        <div className="flex item-center justify-center gap-20 mb-10">
          <div className="flex flex-col gap-3 ">
            <h2 className="text-center">Check Your Symptoms</h2>
            <p>Not feeling well? Let our AI analyze your symptoms and suggest the right care.</p>
            <TextField
              label="Symptom 1"
              id="outlined-size-small"
              size="small"
            />
            <TextField
              label="Symptom 2"
              id="outlined-size-small"
              size="small"
            />
            <TextField
              label="Symptom 3"
              id="outlined-size-small"
              size="small"
            />
            <TextField
              label="Symptom 4"
              id="outlined-size-small"
              size="small"
            /> <br />
            <Button >Check Symptoms</Button>

          </div>
          <div className="hidden sm:block pt-20">
            <Image src={"/ai-symtoms-1.jpg"} alt="symtoms" width={500} height={550} />
          </div>
        </div>

        <div className="flex pt-8 gap-10 max-w-7xl mx-auto item-center justify-center mb-10">
          <div >
            <h2 className="text-center pb-4">Smart Medical Report Analyzer</h2>
            <p className="text-center pb-4">Upload your lab reports or medical prescriptions, and <br />let our AI translate complex medical jargon into clear, easy-to-understand insights.</p>
            <div className="w-[400px] sm:w-[600px]"><FileUpload /></div>
          </div>
          <div className="hidden sm:block pt-6">
            <Image src={"/ai-report.jpg"} alt="ai-report" width={500} height={350}/>
          </div>
        </div>
        <div className=" sm:flex pt-8 gap-10 max-w-7xl mx-auto item-center justify-center mb-10 ">
          <div >
            <h2 className="text-center pb-4">AI-Powered Medical Image Analysis</h2>
            <p className="text-center pb-4">Upload your medical images and get simple, <br />AI-powered insights to better understand your results.</p>
            <div className="w-[400px] sm:w-[600px]"><FileUpload /></div>
          </div>
          <div className="hidden sm:block pt-6">
            <Image src={"/ai-report2.jpg"} alt="ai-report" width={500} height={350}/>
          </div>
        </div>

      </div>
              <span className="w-[400px] sm:w-[750px] mx-auto block text-xs text-center border border-blue-600 bg-orange-200 text-blue-900 p-2 rounded-lg ">Note: This tool provides AI-based insights for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment.Always consult a healthcare provider for medical concerns.</span>
      <Footer />
    </>
  )
}

export default AiStudio