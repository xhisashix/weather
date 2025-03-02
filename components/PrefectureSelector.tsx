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

  return (
    <section className="my-12">
      <h2 className="text-2xl font-bold mb-6 text-center dark:text-white">
        都道府県を選択
      </h2>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(regions).map(([region, prefectures]) => (
            <div key={region} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h3 className="text-xl font-semibold mb-4 dark:text-white border-b border-gray-200 dark:border-gray-600 pb-2">
                {region}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {prefectures.map((prefecture) => (
                  <button
                    key={prefecture.code}
                    onClick={() => onSelectPrefecture(prefecture.code)}
                    className="px-3 py-2 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/30 dark:hover:bg-blue-800/50 text-blue-800 dark:text-blue-200 rounded-lg transition-colors text-sm flex justify-center items-center"
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
