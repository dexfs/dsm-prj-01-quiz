import {useState} from "react";
import {QuestionAnswer} from "../QuestionAnswer/index.jsx";
import S from './styles.module.css'
import {Button} from "../Button/index.jsx";

const QUESTIONS =  [
    {
        id: 1,
        question: "What is the capital of France?",
        answers: [
            "Berlin",
            "Madrid",
            "Paris",
            "Lisbon"
        ],
        correctAnswer: "Paris"
    },
    {
        id: 2,
        question: "Which planet is known as the Red Planet?",
        answers: [
            "Earth",
            "Mars",
            "Jupiter",
            "Venus"
        ],
        correctAnswer: "Mars"
    },
    {
        id: 3,
        question: "Who wrote 'To Kill a Mockingbird'?",
        answers: [
            "Harper Lee",
            "Mark Twain",
            "F. Scott Fitzgerald",
            "Ernest Hemingway"
        ],
        correctAnswer: "Harper Lee"
    },
    {
        id: 4,
        question: "What is the largest mammal in the world?",
        answers: [
            "Elephant",
            "Blue Whale",
            "Giraffe",
            "Hippopotamus"
        ],
        correctAnswer: "Blue Whale"
    },
    {
        id: 5,
        question: "What is the boiling point of water at sea level?",
        answers: [
            "90°C",
            "100°C",
            "110°C",
            "120°C"
        ],
        correctAnswer: "100°C"
    },
];



export function Quiz() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [correctAnswersCount, setCorrectAnswersCount] = useState(0)
    const [isCurrentQuestionAnswered, setIsCurrentQuestionAnswered] = useState(false)
    const handleAnswerQuestion = (event, question, answer) => {
        if (isCurrentQuestionAnswered) return
        const isCorrectAnswer = question.correctAnswer === answer;

        const resultClassName = isCorrectAnswer ? S.correct : S.incorrect;
        event.currentTarget.classList.toggle(resultClassName)

        if (isCorrectAnswer) {
            setCorrectAnswersCount(correctAnswersCount + 1)
        }
        setIsCurrentQuestionAnswered(true)
    }

    const handleNextQuestion = () => {
        if (currentQuestionIndex + 1 < QUESTIONS.length) {
            setCurrentQuestionIndex(index => index + 1)
        }

        setIsCurrentQuestionAnswered(false)
    }

    const currentQuestion = QUESTIONS[currentQuestionIndex];
    return (
        <div className={S.container}>
            <div className={S.card}>
                <div className={S.quiz}>
                    <header className={S.quizHeader}>
                        <span className={S.questionCount}>PERGUNTA {currentQuestionIndex+1}/{QUESTIONS.length}</span>
                        <p className={S.question}>
                            {currentQuestion.question}
                        </p>
                    </header>

                    <ul className={S.answers}>
                        {currentQuestion.answers.map(answer => (
                            <li key={answer} className={S.answerItem}>
                                <QuestionAnswer answer={answer}
                                                question={currentQuestion}
                                                handleAnswerQuestion={handleAnswerQuestion}
                                />
                            </li>
                        ))}
                    </ul>
                    {isCurrentQuestionAnswered && <Button onClick={handleNextQuestion}>Próxima pergunta</Button>}
                </div>

            </div>

        </div>
    )
}