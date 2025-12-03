from fpdf import FPDF

pdf = FPDF()
pdf.add_page()
pdf.set_font("Arial", size=12)
pdf.cell(200, 10, txt="John Doe", ln=1, align="C")
pdf.cell(200, 10, txt="Software Engineer", ln=2, align="C")
pdf.cell(200, 10, txt="Summary: Experienced developer with Python and JavaScript skills.", ln=3, align="L")
pdf.cell(200, 10, txt="Skills: Python, React, JavaScript, SQL", ln=4, align="L")
pdf.output("test_resume.pdf")
print("PDF created")
