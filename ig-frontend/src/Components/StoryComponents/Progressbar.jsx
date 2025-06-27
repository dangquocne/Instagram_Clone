import React, { useEffect, useState } from 'react'
import "./Progressbar.css"


const Progressbar = ({ index, activeIndex, duration }) => {
  const [progress, setProgress] = useState(0);


  //tạo hiệu ứng tiến trình tăng dần (progress bar)
  useEffect(() => {

    // Tạo một interval (chạy lặp đi lặp lại) để tăng progress dần lên
    const interval = setInterval(() => {

      // Cập nhật giá trị progress bằng hàm setProgress
      setProgress((prevProgress) => {

        // Nếu progress hiện tại chưa đạt 100 thì tăng thêm 1
        if (prevProgress < 100) {
          return prevProgress + 1;
        }

        // Nếu progress đã đạt 100 thì dừng interval lại
        clearInterval(interval)

        // Trả lại progress hiện tại (giữ nguyên 100)
        return prevProgress;
      })

    }, duration / 100)// Thời gian mỗi lần tăng là duration chia cho 100 (mỗi bước 1%)

    return () => {
      clearInterval(interval)
    }

  }, [duration, activeIndex])


  useEffect(() => {
    setProgress(0);
  }, [activeIndex])



  const isActive = index === activeIndex;

  return (
    <div className={`progress-bar-container ${isActive?"active":""}`}>
   
      <div className={`${isActive ? "progress-bar" : ""}`} style={{ width: `${progress}%` }}>

      </div>
    </div>

  )
}

export default Progressbar