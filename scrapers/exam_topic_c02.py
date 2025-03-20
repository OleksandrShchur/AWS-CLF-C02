# exam topic CLF-C02
# pages from 1 to 17
import json
from selenium import webdriver
from selenium.webdriver.common.by import By

options = webdriver.ChromeOptions()
options.add_argument("--start-maximized")
driver = webdriver.Chrome(options=options)

base_url = "https://www.examtopics.com/exams/amazon/aws-certified-cloud-practitioner-clf-c02/view/"

# page count
arr = list(range(1, 18))

data = []
questions_data = []

for page_number in arr:
    url = f"{base_url}{page_number}/"
    driver.get(url)

    # Wait for manual CAPTCHA resolution
    input(f"Solve the CAPTCHA for {page_number} page and press Enter to continue...")

    # Locate all questions
    questions = driver.find_elements(By.CLASS_NAME, "exam-question-card")

    for q_index, question_card in enumerate(questions, start=1):
        try:
            answers = []
            correct_answers = []

            # Get question text
            question_number = question_card.find_element(By.CLASS_NAME, "card-header").text.strip()
            question_text = question_card.find_element(By.CLASS_NAME, "card-text").text.strip()
            
            # Get all answer choices
            options = question_card.find_elements(By.CLASS_NAME, "multi-choice-item")

            for option in options:
                option_text = option.text.strip()
                answers.append(option_text)

                # Check if it has the correct answer class
                if "correct-hidden" in option.get_attribute("class"):
                    correct_answers.append(option_text)

            # Store extracted data
            questions_data.append({
                "question_number": question_number,
                "question": question_text,
                "options": answers,
                "correct_answers": correct_answers
            })

        except Exception as e:
            print(f"Error processing question {question_number}: {e}")

output_file = "aws_exam_questions.json"
with open(output_file, "w", encoding="utf-8") as f:
    json.dump(questions_data, f, indent=4, ensure_ascii=False)

print(f"Scraping complete. Data saved to {output_file}")

# Close the browser
driver.quit()
