import S from "./styles.module.css";
import {Button} from "../Button/index.tsx";

interface ResultProps {
    correctAnswersCount: number;
    questions: number;
    handleTryAgain: () => void;
}

export function Result(props: ResultProps) {
    return (
        <div className={S.container}>
            <h1 className={S.title}>Resultado</h1>
            <p className={S.subtitle}>Você acertou {props.correctAnswersCount} de {props.questions} perguntas</p>
            <Button onClick={props.handleTryAgain}>Tentar novamente</Button>
        </div>
    )
}