import React, { useState, useEffect } from 'react';

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(30);
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let intervalId;
    
    if (isRunning && timeLeft > 0) {
      intervalId = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(intervalId);
            setIsRunning(false);
            setIsComplete(true);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isRunning]);

  const startTimer = () => {
    setIsRunning(true);
    setIsComplete(false);
  };

  const resetTimer = () => {
    setTimeLeft(30);
    setIsRunning(false);
    setIsComplete(false);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-100 rounded-lg shadow-md">
      <div 
        className={`text-6xl font-bold mb-4 ${
          timeLeft <= 10 ? 'text-red-500' : 'text-blue-500'
        }`}
      >
        {timeLeft}s
      </div>
      
      <div className="flex space-x-4">
        {!isRunning && !isComplete && (
          <btn onClick={startTimer} className="btn bg-green-500 hover:bg-green-600">
            Start Timer
          </btn>
        )}
        
        {isComplete && (
          <btn 
            onClick={resetTimer} 
            className="btn bg-blue-500 hover:bg-blue-600 text-white"
          >
            Reset
          </btn>
        )}
        
        {isRunning && (
          <btn 
            onClick={() => setIsRunning(false)} 
            className="btn bg-yellow-500 hover:bg-yellow-600"
          >
            Pause
          </btn>
        )}
      </div>
      
      {isComplete && (
        <div className="mt-4 text-green-600 font-semibold">
          Timer Complete!
        </div>
      )}
    </div>
  );
};

export default Timer;