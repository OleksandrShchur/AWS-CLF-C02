let questions = [];
let currentQuestionIndex = 0;
let answeredQuestions = {};
let correctCount = 0;
let incorrectCount = 0;

// Function to shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Function to handle file upload and shuffle questions
function handleFileUpload() {
    const fileInput = document.getElementById("file-input");
    const file = fileInput.files[0];

    if (!file) {
        alert("Please select a JSON file.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function (event) {
        try {
            questions = JSON.parse(event.target.result);
            console.log("Questions loaded:", questions);

            if (questions.length > 0) {
                shuffleArray(questions); // Shuffle questions

                document.getElementById("quiz-container").style.display = "block";
                document.getElementById("dashboard").style.display = "block";
                document.getElementById("finish-button").style.display = "inline";
                currentQuestionIndex = 0;
                renderDashboard();
                loadQuestion();
            } else {
                alert("The file is empty or has an incorrect format.");
            }
        } catch (error) {
            console.error("Invalid JSON format:", error);
            alert("Invalid JSON file. Please upload a properly formatted file.");
        }
    };

    reader.readAsText(file);
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

        const shuffledOptions = [...questionObj.options]; // Copy options array
        shuffleArray(shuffledOptions); // Shuffle options

        const isMultiSelect = questionObj.correct_answers.length > 1;
        const inputType = isMultiSelect ? "checkbox" : "radio";

        shuffledOptions.forEach(option => {
            const optionElement = document.createElement("div");
            optionElement.classList.add("option");
            const input = document.createElement("input");
            input.type = inputType;
            input.name = "answer";
            input.value = option;

            // Restore previous selections
            if (answeredQuestions[currentQuestionIndex]) {
                input.disabled = true;
                if (answeredQuestions[currentQuestionIndex].userAnswers.includes(option)) {
                    input.checked = true;
                }
                // Highlight correct answers
                if (questionObj.correct_answers.includes(option)) {
                    optionElement.style.background = "#c8e6c9"; // Light green
                }
            }

            optionElement.appendChild(input);
            optionElement.appendChild(document.createTextNode(` ${option}`));
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

    // Strict check: User must select only the correct answers, no extra, no missing
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

// Function to finish the quiz early and display results at the top
function finishQuiz() {
    const resultContainer = document.createElement("div");
    resultContainer.innerHTML = `<h2>Quiz Completed!</h2>
                                 <p>Correct: ${correctCount}</p>
                                 <p>Incorrect: ${incorrectCount}</p>`;
    resultContainer.style.background = "#f8f8f8";
    resultContainer.style.padding = "15px";
    resultContainer.style.borderRadius = "8px";
    resultContainer.style.marginBottom = "20px";
    resultContainer.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.1)";

    const quizContainer = document.getElementById("quiz-container");
    quizContainer.prepend(resultContainer);

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
