# Resume Matcher | Ultimate Edition 🚀

**AI-Powered Resume Architect**

Resume Matcher is a powerful tool designed to help job seekers optimize their resumes for specific job descriptions. By leveraging advanced NLP (Natural Language Processing) and AI, it analyzes your resume against a job description to provide deep insights, keyword matching, and actionable improvements.

![Resume Matcher Dashboard](https://via.placeholder.com/800x400?text=Resume+Matcher+Dashboard)

## ✨ Key Features

-   **Deep Analysis Engine**: Scans your resume and job description to calculate a match score.
-   **Keyword Matching**: Identifies missing and matching keywords (Hard Skills, Soft Skills).
-   **Structure Check**: Verifies essential resume sections (Summary, Experience, Education, etc.).
-   **ATS Optimization**: Checks for formatting issues that might confuse Applicant Tracking Systems.
-   **Smart Suggestions**: Generates a tailored summary and a list of skills to add.
-   **Safe Mode UI**: Robust frontend design that ensures data visibility even on low-end devices.

## 🛠️ Tech Stack

-   **Frontend**: React, Vite, Tailwind CSS, Framer Motion, Lucide React
-   **Backend**: Python, FastAPI, scikit-learn, spaCy, pdfminer.six
-   **Styling**: Modern Dark Theme with Glassmorphism effects

## 🚀 Getting Started

### Prerequisites

-   Node.js (v16+)
-   Python (v3.8+)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/resume-matcher.git
    cd resume-matcher
    ```

2.  **Backend Setup**
    ```bash
    cd backend
    pip install -r requirements.txt
    python -m spacy download en_core_web_sm
    ```

3.  **Frontend Setup**
    ```bash
    cd ../frontend
    npm install
    ```

### Running the Application

You need to run both the backend and frontend terminals simultaneously.

**Terminal 1 (Backend)**
```bash
cd backend
python main.py
```
*Server runs at http://localhost:8000*

**Terminal 2 (Frontend)**
```bash
cd frontend
npm run dev
```
*Client runs at http://localhost:5173*

## 📖 Usage

1.  Open the application in your browser.
2.  Upload your Resume (PDF format).
3.  Paste the Job Description.
4.  Click **"Run Deep Analysis"**.
5.  Review the insights and optimize your resume!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
