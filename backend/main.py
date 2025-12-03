from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import shutil
import os
from utils import extract_text_from_pdf, analyze_resume_content, generate_tailored_resume

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Resume Matcher API is running"}

@app.post("/analyze")
async def analyze_resume(resume: UploadFile = File(...), job_description: str = Form(...)):
    try:
        # Save uploaded file temporarily
        temp_file_path = f"temp_{resume.filename}"
        with open(temp_file_path, "wb") as buffer:
            shutil.copyfileobj(resume.file, buffer)
        
        # Extract text
        resume_text = extract_text_from_pdf(temp_file_path)
        
        # Analyze
        result = analyze_resume_content(resume_text, job_description)
        
        # Cleanup
        os.remove(temp_file_path)
        
        return result
    except Exception as e:
        return HTTPException(status_code=500, detail=str(e))

@app.post("/generate")
async def generate_resume(resume: UploadFile = File(...), job_description: str = Form(...)):
    try:
        # Save uploaded file temporarily
        temp_file_path = f"temp_gen_{resume.filename}"
        with open(temp_file_path, "wb") as buffer:
            shutil.copyfileobj(resume.file, buffer)
        
        # Extract text
        resume_text = extract_text_from_pdf(temp_file_path)
        
        # Generate
        tailored_resume = generate_tailored_resume(resume_text, job_description)
        
        # Cleanup
        os.remove(temp_file_path)
        
        return {"tailored_resume": tailored_resume}
    except Exception as e:
        return HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
