import json
import re

# Path to the local README.md file
file_path = 'README.md'  # Update with your actual file path if needed

# Read the content of the README.md file
with open(file_path, 'r', encoding='utf-8') as file:
    content = file.read()

# Regular expression pattern to extract questions and their options
question_pattern = re.compile(r'###\s*(.*?)\n\n((?:- \[.\] .*?\n)+)', re.DOTALL)

# Extract all questions
matches = question_pattern.findall(content)

# Process extracted questions
data = []
for i, (question, options_block) in enumerate(matches, start=1):
    options = []
    correct_answers = []

    # Extract individual options
    for line in options_block.strip().split("\n"):
        match = re.match(r'- \[(x| )\] (.*)', line)
        if match:
            is_correct = match.group(1) == 'x'
            option_text = match.group(2).strip()
            options.append(option_text)
            if is_correct:
                correct_answers.append(option_text)

    # Store the structured data
    data.append({
        "question_number": f"Question {i}",
        "question": question.strip(),
        "options": options,
        "correct_answers": correct_answers
    })

# Save data to JSON
output_file = 'aws_practice_questions.json'
with open(output_file, 'w', encoding='utf-8') as json_file:
    json.dump(data, json_file, indent=4)

print(f"Data has been saved to {output_file}")
