import {useState, MouseEvent} from "react";
import {QuestionAnswer} from "../QuestionAnswer/index.tsx";
import S from './styles.module.css'
import {Button} from "../Button/index.tsx";
import {Result} from "../Result/index.tsx";
import {ProgressBar} from "../ProgressBar/index.tsx";

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

export interface Question {
    id: number;
    question: string;
    answers: string[];
    correctAnswer: string;
}

export function Quiz() {
    // states
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0)
    const [correctAnswersCount, setCorrectAnswersCount] = useState<number>(0)
    const [isCurrentQuestionAnswered, setIsCurrentQuestionAnswered] = useState<boolean>(false)
    const [isTakingQuiz, setIsTakingQuiz] = useState<boolean>(true)

    // variables
    const currentQuestionNumber = currentQuestionIndex + 1;
    const quizSize = QUESTIONS.length;


    // handlers
    const handleAnswerQuestion = (event: MouseEvent<HTMLButtonElement>, question: Question, answer: string): void => {
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
        if (currentQuestionNumber < QUESTIONS.length) {
            setCurrentQuestionIndex(index => index + 1)
        } else {
            setIsTakingQuiz(false)
        }

        setIsCurrentQuestionAnswered(false)
    }
    const handleTryAgain = () => {
        setCurrentQuestionIndex(0)
        setCorrectAnswersCount(0)
        setIsTakingQuiz(true)
    }

    const currentQuestion = QUESTIONS[currentQuestionIndex];
    const navigationButtonText = currentQuestionIndex + 1 === quizSize ? "Ver resultado" : "Próxima pergunta"

    return (
        <div className={S.container}>
            <div className={S.card}>
                {isTakingQuiz ? (
                    <div className={S.quiz}>
                        <ProgressBar size={quizSize} currentStep={currentQuestionNumber}/>
                        <header className={S.quizHeader}>
                            <span
                                className={S.questionCount}>PERGUNTA {currentQuestionNumber}/{quizSize}</span>
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
                        {isCurrentQuestionAnswered && <Button onClick={handleNextQuestion}>{navigationButtonText}</Button>}
                    </div>
                ): (
                    <Result
                        correctAnswersCount={correctAnswersCount}
                        questions={QUESTIONS.length}
                        handleTryAgain={handleTryAgain}
                    />
                )}
            </div>
        </div>
    )
}