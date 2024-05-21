import classNames from "classnames";
import S from './styles.module.css'
export function ProgressBar(props) {
    const progressBarSteps = Array.from({length: props.size}, (_, i) => i + 1)
    return (
        <div className={S.container}>
            <div className={S.steps} style={{gridTemplateColumns: `repeat(${props.size}, 1fr)`}}>
                {progressBarSteps.map(step => (
                    <div key={step} className={classNames(S.step, props.currentStep >= step ? S.active : '')} />
                ))}
            </div>
        </div>

    )
}