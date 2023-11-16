import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-[#006Eb4] border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status">
      </div>
      <span className="p-2 text-[#006Eb4] text-lg font-light">正在加载中... </span>
    </div>
  )
}

export default Loading;