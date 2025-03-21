import json
import os

def split_json_file(file_path, batch_size=20):
    with open(file_path, "r", encoding="utf-8") as file:
        questions = json.load(file)
    
    base_name = os.path.splitext(os.path.basename(file_path))[0]
    output_dir = "split_files"
    os.makedirs(output_dir, exist_ok=True)
    
    for i in range(0, len(questions), batch_size):
        batch = questions[i:i + batch_size]
        filename = os.path.join(output_dir, f"{base_name}_part_{i // batch_size + 1}.json")
        
        with open(filename, "w", encoding="utf-8") as outfile:
            json.dump(batch, outfile, indent=4, ensure_ascii=False)
        
        print(f"Created {filename} with {len(batch)} questions.")

# files = ["./q_and_a/exam_topic_clf_c02.json", 
#          "./q_and_a/github_clf_c02.json", 
#          "./q_and_a/pass_exam_clf_c02_1_part.json", 
#          "./q_and_a/pass_exam_clf_c02_2_part.json"]
files = ["./questions/unique_questions.json"]


for file in files:
    split_json_file(file)
