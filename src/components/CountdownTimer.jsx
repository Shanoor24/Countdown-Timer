import React, { useState, useEffect } from 'react';
import styles from './CountdownTimer.module.css';

const CountdownTimer = () => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    let timer;

    if (isActive && time > 0) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      setIsActive(false);
    }

    return () => clearInterval(timer);
  }, [isActive, time]);

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min.toString().padStart(2, '0')}:${sec
      .toString()
      .padStart(2, '0')}`;
  };

  const handleStart = () => {
    setTime(minutes * 60 + seconds);
    setIsActive(true);
    setIsSubmitted(true);
  };

  const handlePause = () => setIsActive(false);
  const handleReset = () => {
    setIsActive(false);
    setTime(minutes * 60 + seconds);
    setIsSubmitted(false);
  };

  const handleMinutesChange = (e) =>
    setMinutes(parseInt(e.target.value, 10) || 0);
  const handleSecondsChange = (e) =>
    setSeconds(parseInt(e.target.value, 10) || 0);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Countdown Timer</h1>
      <div className={styles.inputs}>
        <input
          type="number"
          placeholder="Minutes"
          value={minutes}
          onChange={handleMinutesChange}
          className={styles.input}
        />
        <input
          type="number"
          placeholder="Seconds"
          value={seconds}
          onChange={handleSecondsChange}
          className={styles.input}
        />
        <button onClick={handleStart} className={styles.button}>
          Start
        </button>
      </div>
      {isSubmitted && (
        <div>
          <div className={styles.timer}>{formatTime(time)}</div>
          <div className={styles.controls}>
            <button onClick={handlePause} className={styles.button}>
              Pause
            </button>
            <button onClick={handleReset} className={styles.button}>
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CountdownTimer;
