"use client";

import { useState, useEffect } from "react";
import MainVisual from "../components/MainVisual"
import PrefectureSelector from "../components/PrefectureSelector";
import PrefectureDetail from "../components/PrefectureDetail";

export default function Home() {
  const [selectedPrefecture, setSelectedPrefecture] = useState<string | null>(null);
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const handleSelectPrefecture = (code: string) => {
    setSelectedPrefecture(code);
    // 詳細セクションへスクロール
    const detailSection = document.getElementById("prefecture-detail");
    if (detailSection) {
      detailSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold">日本の天気予報</h1>
        <p className="text-gray-600 mt-2">全国の最新天気情報をお届けします</p>
      </header>

      <MainVisual />

      <PrefectureSelector onSelectPrefecture={handleSelectPrefecture} />

      <div id="prefecture-detail" className="mt-8 scroll-mt-4">
        <PrefectureDetail prefectureCode={selectedPrefecture} />
      </div>

      <footer className="mt-12 pt-8 border-t text-center text-gray-500 text-sm">
        <p>
          データ提供:{" "}
          <a
            href="https://weather.tsukumijima.net/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-blue-500"
          >
            気象庁
          </a>
        </p>
        <p className="mt-2">© {currentYear} 天気予報アプリ</p>
      </footer>
    </div>
  );
}
