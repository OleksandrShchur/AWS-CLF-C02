let questions = [];
let currentQuestionIndex = 0;
let answeredQuestions = {};
let correctCount = 0;
let incorrectCount = 0;
let isQuizFinished = false;

// Array of available quiz files (you can expand this dynamically if needed)
const availableQuizzes = [
    "https://oleksandrshchur.github.io/AWS-CLF-C02/split_files/unique_questions_part_1.json",
    "https://oleksandrshchur.github.io/AWS-CLF-C02/split_files/unique_questions_part_2.json",
    "https://oleksandrshchur.github.io/AWS-CLF-C02/split_files/unique_questions_part_3.json",
    "https://oleksandrshchur.github.io/AWS-CLF-C02/split_files/unique_questions_part_4.json",
    "https://oleksandrshchur.github.io/AWS-CLF-C02/split_files/unique_questions_part_5.json",
    "https://oleksandrshchur.github.io/AWS-CLF-C02/split_files/unique_questions_part_6.json",
    "https://oleksandrshchur.github.io/AWS-CLF-C02/split_files/unique_questions_part_7.json",
    "https://oleksandrshchur.github.io/AWS-CLF-C02/split_files/unique_questions_part_8.json",
    "https://oleksandrshchur.github.io/AWS-CLF-C02/split_files/unique_questions_part_9.json",
    "https://oleksandrshchur.github.io/AWS-CLF-C02/split_files/unique_questions_part_10.json",
    "https://oleksandrshchur.github.io/AWS-CLF-C02/split_files/unique_questions_part_11.json",
    "https://oleksandrshchur.github.io/AWS-CLF-C02/split_files/unique_questions_part_12.json",
    "https://oleksandrshchur.github.io/AWS-CLF-C02/split_files/unique_questions_part_13.json",
    "https://oleksandrshchur.github.io/AWS-CLF-C02/split_files/unique_questions_part_14.json",
    "https://oleksandrshchur.github.io/AWS-CLF-C02/split_files/unique_questions_part_15.json",
    "https://oleksandrshchur.github.io/AWS-CLF-C02/split_files/unique_questions_part_16.json",
    "https://oleksandrshchur.github.io/AWS-CLF-C02/split_files/unique_questions_part_17.json",
    "https://oleksandrshchur.github.io/AWS-CLF-C02/split_files/unique_questions_part_18.json",
    "https://oleksandrshchur.github.io/AWS-CLF-C02/split_files/unique_questions_part_19.json",
    "https://oleksandrshchur.github.io/AWS-CLF-C02/split_files/unique_questions_part_20.json",
    "https://oleksandrshchur.github.io/AWS-CLF-C02/split_files/unique_questions_part_21.json",
    "https://oleksandrshchur.github.io/AWS-CLF-C02/split_files/unique_questions_part_22.json",
    "https://oleksandrshchur.github.io/AWS-CLF-C02/split_files/unique_questions_part_23.json",
    "https://oleksandrshchur.github.io/AWS-CLF-C02/split_files/unique_questions_part_24.json",
    "https://oleksandrshchur.github.io/AWS-CLF-C02/split_files/unique_questions_part_25.json",
    "https://oleksandrshchur.github.io/AWS-CLF-C02/split_files/unique_questions_part_26.json",
    "https://oleksandrshchur.github.io/AWS-CLF-C02/split_files/unique_questions_part_27.json",
    "https://oleksandrshchur.github.io/AWS-CLF-C02/split_files/unique_questions_part_28.json",
    "https://oleksandrshchur.github.io/AWS-CLF-C02/split_files/unique_questions_part_29.json",
    "https://oleksandrshchur.github.io/AWS-CLF-C02/split_files/unique_questions_part_30.json",
    "https://oleksandrshchur.github.io/AWS-CLF-C02/split_files/unique_questions_part_31.json",
    "https://oleksandrshchur.github.io/AWS-CLF-C02/split_files/unique_questions_part_32.json",
    "https://oleksandrshchur.github.io/AWS-CLF-C02/split_files/unique_questions_part_33.json",
    "https://oleksandrshchur.github.io/AWS-CLF-C02/split_files/unique_questions_part_34.json",
    "https://oleksandrshchur.github.io/AWS-CLF-C02/split_files/unique_questions_part_35.json",
    "https://oleksandrshchur.github.io/AWS-CLF-C02/split_files/unique_questions_part_36.json",
    "https://oleksandrshchur.github.io/AWS-CLF-C02/split_files/unique_questions_part_37.json",
    "https://oleksandrshchur.github.io/AWS-CLF-C02/split_files/unique_questions_part_38.json",
    "https://oleksandrshchur.github.io/AWS-CLF-C02/split_files/unique_questions_part_39.json",
    "https://oleksandrshchur.github.io/AWS-CLF-C02/split_files/unique_questions_part_40.json",
    "https://oleksandrshchur.github.io/AWS-CLF-C02/split_files/unique_questions_part_41.json",
    "https://oleksandrshchur.github.io/AWS-CLF-C02/split_files/unique_questions_part_42.json",
    "https://oleksandrshchur.github.io/AWS-CLF-C02/split_files/unique_questions_part_43.json",
    "https://oleksandrshchur.github.io/AWS-CLF-C02/split_files/unique_questions_part_44.json",
    "https://oleksandrshchur.github.io/AWS-CLF-C02/split_files/unique_questions_part_45.json"
];

function startQuiz() {
    isQuizFinished = false;
    questions = [];
    currentQuestionIndex = 0;
    answeredQuestions = {};
    correctCount = 0;
    incorrectCount = 0;
}

// Populate dropdown with available quizzes
function populateQuizDropdown() {
    const quizSelect = document.getElementById("quiz-select");

    availableQuizzes.forEach((url, index) => {
        const option = document.createElement("option");
        option.value = url;
        option.textContent = `Quiz ${index + 1}`;
        quizSelect.appendChild(option);
    });

    const sampleTestButton = document.getElementsByClassName("sample-test-button");
    sampleTestButton.onclick = generateSampleTest;
}

// Load selected quiz file
function loadSelectedQuiz() {
    startQuiz();
    removeResultContainerIfExists();

    const quizSelect = document.getElementById("quiz-select");
    const selectedUrl = quizSelect.value;

    fetch(selectedUrl)
        .then(response => response.json())
        .then(data => {
            questions = data;

            if (questions.length > 0) {
                shuffleArray(questions);
                document.getElementById("quiz-container").style.display = "block";
                document.getElementById("dashboard").style.display = "block";
                document.getElementById("finish-button").style.display = "inline";
                currentQuestionIndex = 0;
                renderDashboard();
                loadQuestion();
            } else {
                alert("The file is empty or has an incorrect format.");
            }
        })
        .catch(error => {
            console.error("Error loading quiz:", error);
            alert("Failed to load the quiz file.");
        });
}

// Function to shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Function to load a question with shuffled options
function loadQuestion(index = null) {
    if (index !== null) {
        currentQuestionIndex = index;
    }

    if (currentQuestionIndex < questions.length) {
        const questionObj = questions[currentQuestionIndex];

        document.getElementById("question-number").innerText = `Question ${currentQuestionIndex + 1}`;
        document.getElementById("question").innerText = questionObj.question;

        const optionsContainer = document.getElementById("options-container");
        optionsContainer.innerHTML = "";

        const shuffledOptions = [...questionObj.options];
        shuffleArray(shuffledOptions);

        const isMultiSelect = questionObj.correct_answers.length > 1;
        const inputType = isMultiSelect ? "checkbox" : "radio";

        shuffledOptions.forEach(option => {
            const optionElement = document.createElement("div");
            optionElement.classList.add("option");
            
            const label = document.createElement("label");
            label.style.cursor = "pointer";
            label.style.display = "flex";
            label.style.alignItems = "center";
            
            const input = document.createElement("input");
            input.type = inputType;
            input.name = "answer";
            input.value = option;
            
            if (answeredQuestions[currentQuestionIndex]) {
                input.disabled = true;
                if (answeredQuestions[currentQuestionIndex].userAnswers.includes(option)) {
                    input.checked = true;
                    optionElement.style.background = "#e6c8c8";
                }
                if (questionObj.correct_answers.includes(option)) {
                    optionElement.style.background = "#c8e6c9";
                }
            }

            label.appendChild(input);
            label.appendChild(document.createTextNode(` ${option}`));
            optionElement.appendChild(label);
            optionsContainer.appendChild(optionElement);
        });

        document.getElementById("result").innerText = "";
        document.getElementById("submit-button").style.display = answeredQuestions[currentQuestionIndex] ? "none" : "inline";
        document.getElementById("next-button").style.display = "none";

        updateProgressBar();
    } else {
        finishQuiz();
    }
}

// Function to check the answer
function checkAnswer() {
    const selectedOptions = document.querySelectorAll("input[name='answer']:checked");
    if (selectedOptions.length === 0) {
        document.getElementById("result").innerText = "Please select an answer.";
        return;
    }

    const userAnswers = Array.from(selectedOptions).map(option => option.value);
    const correctAnswers = questions[currentQuestionIndex].correct_answers;

    const isCorrect = arraysEqual(userAnswers.sort(), correctAnswers.sort());

    answeredQuestions[currentQuestionIndex] = { userAnswers, isCorrect };

    if (isCorrect) {
        document.getElementById("result").innerText = "Correct!";
        correctCount++;
        markDashboardItem(currentQuestionIndex, "green");
    } else {
        document.getElementById("result").innerHTML = `<b>Wrong!</b> Correct answer(s): ${correctAnswers.join(", ")}`;
        incorrectCount++;
        markDashboardItem(currentQuestionIndex, "red");
    }

    document.getElementById("submit-button").style.display = "none";
    document.getElementById("next-button").style.display = "inline";
    currentQuestionIndex++;

    updateProgressBar();
}

function removeResultContainerIfExists() {
    // Check if a result container already exists
    const existingResultContainer = document.querySelector("#quiz-container .result-container");

    // If it exists, remove the old one
    if (existingResultContainer) {
        existingResultContainer.remove();
    }
}

// Function to finish the quiz early and display results at the top
function finishQuiz() {
    isQuizFinished = true;
    removeResultContainerIfExists();

    // Create a new result container
    const resultContainer = document.createElement("div");
    resultContainer.classList.add("result-container"); // Add a class to easily identify it
    resultContainer.innerHTML = `<h2>Quiz Completed!</h2>
                                 <p>Correct: ${correctCount}</p>
                                 <p>Incorrect: ${incorrectCount}</p>`;
    resultContainer.style.background = "#f8f8f8";
    resultContainer.style.padding = "15px";
    resultContainer.style.borderRadius = "8px";
    resultContainer.style.marginBottom = "20px";
    resultContainer.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.1)";

    // Prepend the new result container to the quiz container
    const quizContainer = document.getElementById("quiz-container");
    quizContainer.prepend(resultContainer);

    // Hide the finish button
    document.getElementById("finish-button").style.display = "none";
}

// Helper function to compare two arrays (order-independent)
function arraysEqual(a, b) {
    return a.length === b.length && a.every((val, index) => val === b[index]);
}

// Function to update progress bar
function updateProgressBar() {
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    document.getElementById("progress-bar").style.width = `${progress}%`;
}

// Function to render dashboard
function renderDashboard() {
    const dashboard = document.getElementById("dashboard-list");
    dashboard.innerHTML = "";

    questions.forEach((_, index) => {
        const questionButton = document.createElement("button");
        questionButton.textContent = `Q${index + 1}`;
        questionButton.classList.add("dashboard-item");
        questionButton.onclick = () => loadQuestion(index);
        dashboard.appendChild(questionButton);
    });
}

// Function to mark dashboard item
function markDashboardItem(index, color) {
    document.getElementsByClassName("dashboard-item")[index].style.background = color;
}

// Function to generate a sample test with 65 random questions
function generateSampleTest() {
    startQuiz();
    removeResultContainerIfExists();

    const sampleTestUrl = "https://oleksandrshchur.github.io/AWS-CLF-C02/questions/unique_questions.json";

    fetch(sampleTestUrl)
        .then(response => response.json())
        .then(data => {
            if (data.length < 65) {
                alert("Not enough questions in the source file.");
                return;
            }

            questions = getRandomSubset(data, 65);
            shuffleArray(questions);

            document.getElementById("quiz-container").style.display = "block";
            document.getElementById("dashboard").style.display = "block";
            document.getElementById("finish-button").style.display = "inline";

            currentQuestionIndex = 0;
            answeredQuestions = {};
            correctCount = 0;
            incorrectCount = 0;

            renderDashboard();
            loadQuestion();
        })
        .catch(error => {
            console.error("Error loading sample test:", error);
            alert("Failed to load the sample test.");
        });
}

// Helper function to get a random subset of questions
function getRandomSubset(array, count) {
    const shuffled = [...array];
    shuffleArray(shuffled);
    return shuffled.slice(0, count);
}

// Initialize dropdown on page load
document.addEventListener("DOMContentLoaded", populateQuizDropdown);
