"use client";

import { useState, useEffect } from "react";
import MainVisual from "../components/MainVisual";
import PrefectureSelector from "../components/PrefectureSelector";
import PrefectureDetail from "../components/PrefectureDetail";
import { ChevronDown, ChevronUp } from "lucide-react"; // アイコンライブラリを追加してください

export default function Home() {
  const [selectedPrefecture, setSelectedPrefecture] = useState<string | null>(
    null
  );
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear()
  );

  // セクションの開閉状態を管理
  const [openSections, setOpenSections] = useState({
    mainVisual: true,
    prefectureSelector: true,
    prefectureDetail: true,
  });

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const handleSelectPrefecture = (code: string) => {
    setSelectedPrefecture(code);
    // 詳細セクションへスクロール
    const detailSection = document.getElementById("prefecture-detail");
    if (detailSection) {
      setOpenSections({ ...openSections, prefectureDetail: true });
      detailSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // セクションの開閉を切り替える関数
  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections({
      ...openSections,
      [section]: !openSections[section],
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold">日本の天気予報</h1>
        <p className="text-gray-600 mt-2">全国の最新天気情報をお届けします</p>
      </header>

      {/* メインビジュアルセクション */}
      <div className="mb-8">
        <div
          className="flex justify-between items-center bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 cursor-pointer"
          onClick={() => toggleSection("mainVisual")}
        >
          <h2 className="text-xl font-bold">天気マップ</h2>
          {openSections.mainVisual ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </div>
        <div
          className={`transition-all duration-300 overflow-hidden ${
            openSections.mainVisual
              ? "max-h-[500px] opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          <div className="pt-4">
            <MainVisual />
          </div>
        </div>
      </div>

      {/* 都道府県セレクターセクション */}
      <div className="mb-8">
        <div
          className="flex justify-between items-center bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 cursor-pointer"
          onClick={() => toggleSection("prefectureSelector")}
        >
          <h2 className="text-xl font-bold">都道府県を選択</h2>
          {openSections.prefectureSelector ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </div>
        <div
          className={`transition-all duration-300 overflow-hidden ${
            openSections.prefectureSelector
              ? "max-h-[3000px] opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          <div className="pt-4">
            <PrefectureSelector onSelectPrefecture={handleSelectPrefecture} />
          </div>
        </div>
      </div>

      {/* 県詳細セクション */}
      <div id="prefecture-detail" className="mb-8 scroll-mt-4">
        <div
          className="flex justify-between items-center bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 cursor-pointer"
          onClick={() => toggleSection("prefectureDetail")}
        >
          <h2 className="text-xl font-bold">詳細天気情報</h2>
          {openSections.prefectureDetail ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </div>
        <div
          className={`transition-all duration-300 overflow-hidden ${
            openSections.prefectureDetail
              ? "max-h-[2000px] opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          <div className="pt-4">
            <PrefectureDetail prefectureCode={selectedPrefecture} />
          </div>
        </div>
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
            https://weather.tsukumijima.net/
          </a>
        </p>
        <p className="mt-2">© {currentYear} 天気予報アプリ</p>
      </footer>
    </div>
  );
}
