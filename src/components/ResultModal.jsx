import React, { useImperativeHandle, useRef } from 'react'
import { createPortal } from 'react-dom'

const ResultModal = ({ targetTime, remainingTime, onReset }, ref) => {
    const dialogRef = useRef();
    const userLost = remainingTime <= 0;
    const formattedRemainingTIme = (remainingTime / 1000).toFixed(2);

    const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100)

    useImperativeHandle(ref, () => {
        return {
            open() {
                dialogRef.current.showModal();
            }
        }
    });
    return createPortal(
        <dialog ref={dialogRef} className='result-modal' onClose={onReset}>
            {userLost && <h2>You Lost</h2>}
            {!userLost && <h2>Your score : {score}</h2>}
            <p>The Target time was <strong>{targetTime} second{targetTime > 1 ? 's' : ''}</strong></p>
            <p>You stopped the timer with <strong>{formattedRemainingTIme} second{targetTime > 1 ? 's' : ''} left</strong></p>
            <form action="" method='dialog' onSubmit={onReset}>
                <button>Close</button>
            </form>
        </dialog>,
        document.getElementById('modal')
    )
}

export default React.forwardRef(ResultModal)
