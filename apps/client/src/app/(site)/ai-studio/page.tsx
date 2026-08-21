
import Footer from "apps/client/src/components/Footer"
import Navbar from "apps/client/src/components/Navbar"
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import Image from "next/image";
import FileUpload from "apps/client/src/components/FileUpload";

const AiStudio = () => {
  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto p-3">
        <div className="flex item-center justify-center gap-10">
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
          <div>
            <Image src={"/symtoms.jpeg"} alt="symtoms" width={400} height={250} />
          </div>
        </div>
        <span className="w-[750px] mx-auto block text-xs text-center border border-blue-600 bg-orange-200 text-blue-900 p-2 rounded-lg ">Note: This tool provides AI-based insights for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment.Always consult a healthcare provider for medical concerns.</span>
        <div className="flex pt-8 gap-10 max-w-7xl mx-auto">
          <div >
            <h2 className="text-center">Smart Medical Report Analyzer</h2>
            <p className="text-center">Upload your lab reports or medical prescriptions, and let our AI translate complex medical jargon into clear, easy-to-understand insights.</p>
            <FileUpload/>
          </div>
          <div className="pt-6">
            <Image src={"/ai-report.jpg"} alt="ai-report" width={500} height={350}/>
          </div>
        </div>


        <div>
          <div>
            left
          </div>
          <div>
            right
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default AiStudio