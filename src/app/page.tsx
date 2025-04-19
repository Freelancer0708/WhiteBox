'use client';
import { useState } from 'react';

export default function Home() {
  const [popup, setPopup] = useState<null | {
    x: number;
    y: number;
    trivia: string;
    clickCount: number;
    totalClicks: number;
    percentage: string;
  }>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async (e: React.MouseEvent<HTMLDivElement>) => {
    if (popup || isLoading) return; // ポップアップや読み込み中なら無効化

    const x = e.clientX;
    const y = e.clientY;

    // クリック直後に「取得中」ポップアップを表示
    setIsLoading(true);
    setPopup({
      x,
      y,
      trivia: '豆知識を取得中...',
      clickCount: 0,
      totalClicks: 0,
      percentage: '0',
    });

    try {
      const res = await fetch('/api/click', {
        method: 'POST',
        body: JSON.stringify({ x, y }),
      });
      const data = await res.json();

      const trivia = data.trivia?.trim() || '情報が見つかりませんでした。';

      setPopup({
        x,
        y,
        trivia,
        clickCount: data.clickCount,
        totalClicks: data.totalClicks,
        percentage: data.percentage,
      });
    } catch {
      setPopup({
        x,
        y,
        trivia: '取得に失敗しました。',
        clickCount: 0,
        totalClicks: 0,
        percentage: '0',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen bg-white relative cursor-pointer" onClick={handleClick}>
      {popup && (
        <div className="fixed inset-0 bg-gray-200 bg-opacity-80 flex items-center justify-center z-50 cursor-default">
          <div className="relative py-6 rounded-xl shadow-xl bg-white border w-[90%] h-[90%] flex flex-col items-center justify-center max-w-3xl text-[clamp(12px,3vw,20px)]" style={{ lineHeight: '1.5' }}>
            <button
              className="absolute top-2 right-3 text-lg text-gray-500 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setPopup(null);
              }}
              disabled={isLoading}
            >
              ✕
            </button>

            <div className='font-bold mb-2 text-center w-[90%] text-[clamp(16px,4vw,24px)]'>
              あなたがクリックしたのは、
            </div>
            <div className='font-bold mb-6 text-center w-[90%] text-[clamp(20px,5vw,28px)] bg-gray-200 px-[clamp(1px,3vw,18px)] py-[clamp(5px,2vw,14px)] rounded-lg'>
              X座標 {popup.x}px, Y座標 {popup.y}px
            </div>

            <div className="mb-8 text-center w-[90%] text-[clamp(16px,4vw,22px)]">
              {popup.trivia}
            </div>

            {!isLoading && (
              <div className="text-gray-800 text-[clamp(13px,3vw,18px)] bg-gray-200 px-[clamp(1px,3vw,18px)] py-[clamp(5px,2vw,14px)] rounded-lg">
                〇 この場所は今回で {popup.clickCount} 回クリックされました！<br />
                〇 この場所がクリックされる確率 {popup.percentage}%<br />
                〇 クリック総数 {popup.totalClicks} 回
              </div>
            )}

            <div className="absolute bottom-2 right-4 text-[clamp(10px,2vw,12px)] text-gray-800 italic text-right">
              ※この豆知識は生成AIにより作成されております。<br/>※内容に誤りがある可能性がありますのでご注意ください。
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
