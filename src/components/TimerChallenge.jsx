import React, { useRef, useState } from 'react'
import ResultModal from './ResultModal';

const TimerChallenge = ({ title, targetTime }) => {
    
    const timer = useRef();
    const dialogRef = useRef();
    const [timeRemaining, settimeRemaining] = useState(targetTime * 1000);
    const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;
    if (timeRemaining <= 0) {
        clearInterval(timer.current)
        dialogRef.current.open();
    }
    const handleReset = () => {
        settimeRemaining(targetTime * 1000)
    }
    const handleStart = () => {
        timer.current = setInterval(() => {
            settimeRemaining(prevTime => prevTime - 10)
        }, 10)

    }
    const handleStop = () => {
        dialogRef.current.open();
        clearInterval(timer.current);
    }
    return (
        <>
            <ResultModal onReset={handleReset} ref={dialogRef} targetTime={targetTime} result="Lost" remainingTime={timeRemaining} />
            <section className='challenge'>
                <h2>{title}</h2>
                <p className="challenge-time">
                    {targetTime} second{targetTime > 1 ? 's' : ''}
                </p>
                <p>
                    <button onClick={!timerIsActive ? handleStart : handleStop}>
                        {timerIsActive ? "Stop" : "Start"} Challenge
                    </button>
                </p>
                <p className={timerIsActive ? 'active' : undefined}>
                    {timerIsActive ? 'Time is running...' : "Timer Inactive"}
                </p>
            </section>
        </>
    )
}

export default TimerChallenge
