import { useEffect } from 'react';

type TimerProps = {
   time: number;
   timeOver: boolean;
   setTime: () => void;
};

function Timer({ time, timeOver, setTime }: TimerProps) {
   const miliSecond = time;
   console.log(miliSecond);

   useEffect(() => {
      let interval: string | number | NodeJS.Timer | undefined;
      if (timeOver === false) {
         interval = setInterval(() => {
            setTime();
         }, 1000);
      } else if (timeOver === true) {
         clearInterval(interval);
      }
      return () => clearInterval(interval);
   }, [timeOver]);

   return (
      <>
         Time:{' '}
         <strong>
            <span>{('0' + Math.floor(miliSecond / 3600000)).slice(-2)}:</span>
            <span>{('0' + Math.floor((miliSecond / 60000) % 60)).slice(-2)}:</span>
            <span>{('0' + (Math.floor((miliSecond / 1000) % 60) % 60)).slice(-2)}</span>s
         </strong>
      </>
   );
}

export default Timer;
