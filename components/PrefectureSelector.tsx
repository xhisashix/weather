import React from "react";
import { prefectures } from "../data/prefectures";
import { Prefecture } from "../types/weather";

interface PrefectureSelectorProps {
  onSelectPrefecture: (code: string) => void;
}

const PrefectureSelector: React.FC<PrefectureSelectorProps> = ({
  onSelectPrefecture,
}) => {
  // 地方ごとに都道府県を分類
  const regions = prefectures.reduce((acc, prefecture) => {
    if (!acc[prefecture.region]) {
      acc[prefecture.region] = [];
    }
    acc[prefecture.region].push(prefecture);
    return acc;
  }, {} as Record<string, Prefecture[]>);

  // 地方の表示順序を定義
  const regionOrder = [
    "北海道", "東北", "関東", "中部", "関西", "中国", "四国", "九州", "沖縄"
  ];

  // 順序付きの地方を取得
  const sortedRegions = regionOrder.filter(region => regions[region]);

  return (
    <section>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6">
        {/* スマホ表示を調整 - 1列表示から始めて画面サイズに応じて列数を増やす */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {sortedRegions.map((region) => (
            <div key={region} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 sm:p-4">
              <h3 className="text-lg font-semibold mb-3 dark:text-white border-b border-gray-200 dark:border-gray-600 pb-2">
                {region}
              </h3>
              {/* ボタンのグリッドをモバイルフレンドリーに */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {regions[region].map((prefecture) => (
                  <button
                    key={prefecture.code}
                    onClick={() => onSelectPrefecture(prefecture.code)}
                    className="px-2 py-1.5 sm:px-3 sm:py-2 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/30 dark:hover:bg-blue-800/50 text-blue-800 dark:text-blue-200 rounded-lg transition-colors text-xs sm:text-sm flex justify-center items-center"
                  >
                    {prefecture.name}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PrefectureSelector;
