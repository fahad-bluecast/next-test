const Timer = ({ timeLeft }: { timeLeft: number }) => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="bg-slate-800 text-white px-3 py-1 rounded text-sm flex items-center gap-1.5">
      <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
      {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
    </div>
  );
};

export default Timer;
