"use client";

import { useState } from "react";
import MainVisual from "../components/MainVisual";
import PrefectureSelector from "../components/PrefectureSelector";
import PrefectureDetail from "../components/PrefectureDetail";

export default function Home() {
  const [selectedPrefecture, setSelectedPrefecture] = useState<string | null>(
    null
  );
  // 固定値として現在の年を使用し、ハイドレーションエラーを防ぐ
  const currentYear = new Date().getFullYear();

  const handleSelectPrefecture = (code: string) => {
    setSelectedPrefecture(code);
    // 詳細セクションへスクロール
    const detailSection = document.getElementById("prefecture-detail");
    if (detailSection) {
      detailSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    // コンテナの余白を調整してスマホ表示を最適化
    <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 max-w-6xl">
      <header className="text-center mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold">日本の天気予報</h1>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">全国の最新天気情報をお届けします</p>
      </header>

      <MainVisual />

      <section className="my-8 sm:my-12">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center dark:text-white">
          地方・都道府県を選択
        </h2>
        <PrefectureSelector onSelectPrefecture={handleSelectPrefecture} />
      </section>

      <div id="prefecture-detail" className="mt-6 sm:mt-8 scroll-mt-4">
        <PrefectureDetail prefectureCode={selectedPrefecture} />
      </div>

      <footer className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t text-center text-gray-500 text-xs sm:text-sm">
        <p>
          データ提供:{" "}
          <a
            href="https://weather.tsukumijima.net/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-blue-500"
          >
            https://weather.tsukumijima.net/
          </a>
        </p>
        <p className="mt-2">© {currentYear} 天気予報アプリ</p>
      </footer>
    </div>
  );
}
