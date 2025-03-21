import json

files = [
    "./q_and_a/exam_topic_clf_c02.json",
    "./q_and_a/github_clf_c02.json",
    "./q_and_a/pass_exam_clf_c02_1_part.json",
    "./q_and_a/pass_exam_clf_c02_2_part.json"
]

unique_questions = {}
output_file = "./questions/unique_questions.json"

for file in files:
    with open(file, "r", encoding="utf-8") as f:
        data = json.load(f)
        for item in data:
            question_text = item["question"]
            if question_text not in unique_questions:
                unique_questions[question_text] = item

# Save unique questions to a new JSON file
with open(output_file, "w", encoding="utf-8") as f:
    json.dump(list(unique_questions.values()), f, indent=4, ensure_ascii=False)

print(f"Unique questions saved to {output_file}")
