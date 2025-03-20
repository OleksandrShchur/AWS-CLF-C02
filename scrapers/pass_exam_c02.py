from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup
import json

# Initialize WebDriver
options = Options()
options.add_argument("--headless")  # Run in headless mode
options.add_argument("--disable-gpu")
options.add_argument("--no-sandbox")

driver = webdriver.Chrome(options=options)

questions_data = []

# Open the page
for index in range(10, 16):
    url = f"https://www.passnexam.com/amazon/clf-c02/{index}"
    print("Processing url: " + url)
    driver.get(url)

    # Wait for the page to load and the questions to appear
    driver.implicitly_wait(2)

    # Get the raw HTML content of the page
    html_content = driver.page_source

    # Modify the HTML content as needed
    html_content = html_content.replace(" </span><br><br>", " </span><div class=\"question-text\">")
    html_content = html_content.replace("<div class=\"row ", "</div><div class=\"row ")

    # Now, parse the modified HTML with BeautifulSoup
    soup = BeautifulSoup(html_content, 'html.parser')

    # Extract the questions
    question_elements = soup.find_all('span', class_='badge badge-secondary')

    for question_element in question_elements:
        question_number = question_element.text.strip()
        print(f"Processing {question_number}")

        # Extract question text from the <div class="question-text"> component
        question_text_element = question_element.find_next('div', class_='question-text')
        question_text = question_text_element.text.strip() if question_text_element else ""

        # Find answer options inside the row div
        answer_container = question_element.find_next('div', class_='row')
        options_elements = answer_container.find_all('div', class_='alert-secondary')
        options = [opt.text.strip() for opt in options_elements]

        # Extract correct answers
        correct_answers = [opt.text.strip() for opt in options_elements if opt.get('value') == '1']

        # Store data in JSON format
        questions_data.append({
            "question_number": question_number,
            "question": question_text,
            "options": options,
            "correct_answers": correct_answers
        })

# Save data to JSON
with open("questions.json", "w", encoding="utf-8") as json_file:
    json.dump(questions_data, json_file, indent=4, ensure_ascii=False)

# Close WebDriver
driver.quit()

print("Scraping completed. Data saved to questions.json.")
