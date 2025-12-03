from pdfminer.high_level import extract_text
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import re

# Try to import spacy, but don't fail if it's broken
nlp = None
try:
    import spacy
    try:
        nlp = spacy.load("en_core_web_sm")
    except:
        pass
except ImportError:
    pass

def extract_text_from_pdf(pdf_path):
    return extract_text(pdf_path)

def extract_keywords(text):
    if not nlp:
        # Simple fallback extraction
        words = re.findall(r'\b[a-zA-Z]{3,}\b', text.lower())
        return list(set(words))
    
    doc = nlp(text)
    keywords = []
    for token in doc:
        if token.pos_ in ["NOUN", "PROPN"] and not token.is_stop:
            keywords.append(token.text)
    return list(set(keywords))

def calculate_similarity(text1, text2):
    documents = [text1, text2]
    tfidf = TfidfVectorizer().fit_transform(documents)
    pairwise_similarity = cosine_similarity(tfidf[0:1], tfidf)
    return pairwise_similarity[0][1] * 100  # Return percentage

def analyze_resume_content(resume_text, job_description):
    score = calculate_similarity(resume_text, job_description)
    
    resume_keywords = set(extract_keywords(resume_text))
    job_keywords = set(extract_keywords(job_description))
    
    missing_keywords = list(job_keywords - resume_keywords)
    present_keywords = list(resume_keywords.intersection(job_keywords))
    
    # Section Verification
    sections = parse_resume_sections(resume_text)
    section_status = {
        "Contact Info": len(sections["contact"]) > 10,
        "Summary": len(sections["summary"]) > 10,
        "Skills": len(sections["skills"]) > 10,
        "Experience": len(sections["experience"]) > 10,
        "Education": len(sections["education"]) > 10,
        "Projects": len(sections["projects"]) > 10
    }

    # Deep Insights
    
    # 1. Contact Info Check
    contact_checks = {
        "Email": bool(re.search(r'[\w\.-]+@[\w\.-]+\.\w+', resume_text)),
        "Phone": bool(re.search(r'\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}', resume_text)),
        "LinkedIn": "linkedin.com" in resume_text.lower()
    }

    # 2. Action Verbs Analysis
    # List of strong action verbs
    action_verbs = {
        "spearheaded", "orchestrated", "implemented", "developed", "managed", 
        "created", "led", "designed", "launched", "optimized", "streamlined", 
        "transformed", "revitalized", "pioneered", "executed"
    }
    resume_words = set(re.findall(r'\b\w+\b', resume_text.lower()))
    found_action_verbs = list(action_verbs.intersection(resume_words))
    
    # 3. Soft Skills Analysis
    soft_skills = {
        "leadership", "communication", "teamwork", "problem-solving", 
        "adaptability", "creativity", "time management", "collaboration"
    }
    found_soft_skills = list(soft_skills.intersection(resume_words))

    # 4. Formatting Checks
    formatting_score = 0
    formatting_issues = []
    
    # Check for bullet points (simple heuristic: look for common bullet characters)
    if not re.search(r'[•\-\*]\s', resume_text):
        formatting_issues.append("No bullet points detected. Use bullets for readability.")
    else:
        formatting_score += 50
        
    # Check for paragraph length (too long?)
    long_paragraphs = [p for p in resume_text.split('\n\n') if len(p.split()) > 60]
    if long_paragraphs:
        formatting_issues.append("Some paragraphs are too long. Keep them concise.")
    else:
        formatting_score += 50

    # Generate Snippets
    recommended_summary = f"Dedicated professional with strong expertise in {', '.join(missing_keywords[:3])} and a proven track record of success. Passionate about leveraging skills in {', '.join(missing_keywords[3:6]) if len(missing_keywords) > 3 else 'key areas'} to drive results."
    
    skills_to_add = ", ".join(missing_keywords)
    
    return {
        "score": round(score, 2),
        "present_keywords": present_keywords[:10],
        "missing_keywords": missing_keywords[:10],
        "section_status": section_status,
        "contact_checks": contact_checks,
        "action_verbs": found_action_verbs,
        "soft_skills": found_soft_skills,
        "formatting_issues": formatting_issues,
        "recommended_summary": recommended_summary,
        "skills_to_add": skills_to_add,
        "is_text_empty": not bool(resume_text.strip())
    }

def parse_resume_sections(text):
    # Simple heuristic parser
    sections = {
        "contact": "",
        "summary": "",
        "skills": "",
        "experience": "",
        "education": "",
        "projects": ""
    }
    
    lines = text.split('\n')
    current_section = "contact"
    
    # Regex for section headers
    header_patterns = {
        "experience": re.compile(r'^\s*(work|professional)?\s*experience|employment|work history', re.IGNORECASE),
        "education": re.compile(r'^\s*education|academic|qualifications', re.IGNORECASE),
        "skills": re.compile(r'^\s*skills|technologies|technical skills|competencies', re.IGNORECASE),
        "projects": re.compile(r'^\s*projects|portfolio', re.IGNORECASE),
        "summary": re.compile(r'^\s*summary|profile|objective|about', re.IGNORECASE)
    }

    for line in lines:
        line_clean = line.strip()
        if not line_clean:
            continue
            
        # Check if line is a header
        is_header = False
        for section, pattern in header_patterns.items():
            if pattern.match(line_clean) and len(line_clean) < 30: # Headers are usually short
                current_section = section
                is_header = True
                break
        
        if not is_header:
            sections[current_section] += line + "\n"
            
    return sections

def generate_tailored_resume(resume_text, job_description):
    resume_keywords = set(extract_keywords(resume_text))
    job_keywords = set(extract_keywords(job_description))
    missing_keywords = list(job_keywords - resume_keywords)
    
    # Parse original resume
    sections = parse_resume_sections(resume_text)
    
    # Generate tailored content
    
    # 1. Enhanced Summary
    tailored_summary = f"Dedicated professional with strong expertise in {', '.join(missing_keywords[:3])} and a proven track record of success. Passionate about leveraging skills in {', '.join(missing_keywords[3:6]) if len(missing_keywords) > 3 else 'key areas'} to drive results. {sections['summary'][:200]}..."

    # 2. Enhanced Skills
    # Combine original skills with missing keywords
    original_skills = sections['skills'].replace('\n', ', ')
    tailored_skills = f"{', '.join(missing_keywords)}, {original_skills}"
    
    return {
        "contact": sections['contact'].strip(),
        "summary": tailored_summary,
        "skills": tailored_skills,
        "experience": sections['experience'].strip(),
        "education": sections['education'].strip(),
        "projects": sections['projects'].strip()
    }
