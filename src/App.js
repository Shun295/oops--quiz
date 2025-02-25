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
    const [timeLeft, setTimeLeft] = useState(10); // Timer for each question

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

    const startQuiz = () => {
        setQuizStarted(true);
        setTimeLeft(10); // Reset timer when quiz starts
    };

    const handleAnswerClick = (index) => {
        if (selectedAnswer !== null) return;

        setSelectedAnswer(index);
        setShowNext(true);

        if (index === questions[currentQuestion].correct) {
            setScore(score + 1);
            correctSound.play();
        } else {
            wrongSound.play();
        }
    };

    const nextQuestion = () => {
        if (currentQuestion + 1 < questions.length) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer(null);
            setShowNext(false);
            setTimeLeft(10); // Reset timer for next question
        } else {
            setQuizCompleted(true);
        }
    };

    const restartQuiz = () => {
        setQuizStarted(false);
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
            return score === questions.length ? `url(${happyImage})` : `url(${sadImage})`;
        }
        return !quizStarted ? `url(${bgImage})` : "none";
    };

    const getTimerColor = () => {
        if (timeLeft > 5) return "green";
        if (timeLeft > 2) return "orange";
        return "red";
    };

    const getMotivationalMessage = () => {
        const percentage = (score / questions.length) * 100;
        
        if (percentage >= 80) {
            return "You're a genius! 🎉";
        } else if (percentage >= 50) {
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
         {quizCompleted && score >= Math.ceil(questions.length * 0.8) && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
    )}
            {!quizStarted ? (
                <div className="welcome-screen">
                    <h1>Welcome to OOPS Quiz</h1>
                    <p>Test your knowledge and have fun!</p>
                    <button onClick={startQuiz} className="start-btn">Start Quiz</button>
                </div>
            ) : quizCompleted ? (
                <div className="score-section">
                    <h2>Quiz Completed!</h2>
                    <p>Your Score: {score} / {questions.length}</p>
                    <h3 className="motivational-message">{getMotivationalMessage()}</h3>
                    <button onClick={restartQuiz} className="restart-btn">Restart Quiz</button>
                </div>
            ) : (
                <div className="quiz">
                    <h2 className="question">{questions[currentQuestion].question}</h2>
                    
                    {/* Timer Display */}
                    <div className="timer" style={{ color: getTimerColor() }}>
                        Time Left: {timeLeft}s
                    </div>

                    <div className="options">
                        {questions[currentQuestion].options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleAnswerClick(index)}
                                className={
                                    selectedAnswer !== null
                                        ? index === questions[currentQuestion].correct
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
