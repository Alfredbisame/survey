interface ProgressBarProps {
  progress: number
}

export function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="w-full mb-10">
      <div className="flex justify-between text-sm text-gray-300 mb-2">
        <span>Survey Progress</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden backdrop-blur-md">
        <div
          className="h-full bg-gradient-to-r from-cyan-500 to-purple-600 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
