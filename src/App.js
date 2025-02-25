import React, { useState, useEffect } from "react";
import questions from "./questions"; // Import the question data
import "./App.css"; // Import styles
import bgImage from './assets/background.jpg';
import happyImage from './assets/happy.jpg'; // Import happy image
import sadImage from './assets/sad.jpg'; // Import sad image
import Confetti from "react-confetti";

function App() {
    const [quizStarted, setQuizStarted] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showNext, setShowNext] = useState(false);
    const [score, setScore] = useState(0);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(10);
    const [difficulty, setDifficulty] = useState(null);

    const correctSound = new Audio(process.env.PUBLIC_URL + "/sounds/correct.mp3");
    const wrongSound = new Audio(process.env.PUBLIC_URL + "/sounds/wrong.mp3");

    useEffect(() => {
        if (!quizStarted || showNext || quizCompleted) return;
        if (timeLeft === 0) {
            handleAutoLock();
            return;
        }
        const timer = setTimeout(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);
        return () => clearTimeout(timer);
    }, [timeLeft, quizStarted, showNext, quizCompleted]);

    const startQuiz = (selectedDifficulty) => {
        setDifficulty(selectedDifficulty);
        setQuizStarted(true);
        setTimeLeft(10);
    };

    const filteredQuestions = difficulty 
        ? questions.filter(q => q.difficulty === difficulty) 
        : [];

    const difficultyScores = {
        Easy: 1,
        Medium: 2,
        Hard: 3
    };

    const handleAnswerClick = (index) => {
        if (selectedAnswer !== null) return;
        setSelectedAnswer(index);
        setShowNext(true);
        if (index === filteredQuestions[currentQuestion].correct) {
            setScore(score + difficultyScores[difficulty]);
            correctSound.play();
        } else {
            wrongSound.play();
        }
    };

    const nextQuestion = () => {
        if (currentQuestion + 1 < filteredQuestions.length) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer(null);
            setShowNext(false);
            setTimeLeft(10);
        } else {
            setQuizCompleted(true);
        }
    };

    const restartQuiz = () => {
        setQuizStarted(false);
        setDifficulty(null);
        setCurrentQuestion(0);
        setSelectedAnswer(null);
        setShowNext(false);
        setScore(0);
        setQuizCompleted(false);
        setTimeLeft(10);
    };

    const handleAutoLock = () => {
        setSelectedAnswer(null);
        setShowNext(true);
    };

    const getBackgroundImage = () => {
        if (quizCompleted) {
            return score >= Math.ceil(filteredQuestions.length * difficultyScores[difficulty])
                ? `url(${happyImage})`
                : `url(${sadImage})`;
        }
        return !quizStarted ? `url(${bgImage})` : "none";
    };

    const getTimerColor = () => {
        if (timeLeft > 5) return "green";
        if (timeLeft > 2) return "orange";
        return "red";
    };

    const getMotivationalMessage = () => {
        const maxScore = filteredQuestions.length * difficultyScores[difficulty];
        if (score >= maxScore * 0.8) {
            return "You're a genius! 🎉";
        } else if (score >= maxScore * 0.5) {
            return "Almost there! Keep trying. 🚀";
        } else {
            return "Better luck next time! 😆";
        }
    };

    return (
        <div 
            className={`app-container ${quizStarted ? "quiz-bg" : "welcome-bg"}`} 
            style={{ backgroundImage: getBackgroundImage(), backgroundSize: "cover", backgroundPosition: "center" }}
        >
            {quizCompleted && score >= Math.ceil(filteredQuestions.length * difficultyScores[difficulty]) && (
                <Confetti width={window.innerWidth} height={window.innerHeight} />
            )}
            {!quizStarted ? (
                <div className="welcome-screen">
                    <h1>Welcome to OOPS Quiz</h1>
                    <p>Choose a difficulty level:</p>
                    <button onClick={() => startQuiz("Easy")} className="difficulty-btn easy">Easy</button>
        <button onClick={() => startQuiz("Medium")} className="difficulty-btn medium">Medium</button>
        <button onClick={() => startQuiz("Hard")} className="difficulty-btn hard">Hard</button>
                </div>
            ) : quizCompleted ? (
                <div className="score-section">
                    <h2>Quiz Completed!</h2>
                    <p>Your Score: {score}</p>
                    <p className="motivational-message">{getMotivationalMessage()}</p>
                    <button onClick={restartQuiz} className="restart-btn">Restart Quiz</button>
                </div>
            ) : (
                <div className="quiz">
                    <h2 className="question">{filteredQuestions[currentQuestion]?.question}</h2>
                    <div className="timer" style={{ color: getTimerColor() }}>
                        Time Left: {timeLeft}s
                    </div>
                    <div className="options">
                        {filteredQuestions[currentQuestion]?.options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleAnswerClick(index)}
                                className={
                                    selectedAnswer !== null
                                        ? index === filteredQuestions[currentQuestion]?.correct
                                            ? "correct"
                                            : selectedAnswer === index
                                            ? "wrong"
                                            : ""
                                        : ""
                                }
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                    {showNext && <button className="next-btn" onClick={nextQuestion}>Next Question</button>}
                </div>
            )}
        </div>
    );
}

export default App;

