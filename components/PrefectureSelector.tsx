import React from "react";
import { prefectures } from "../data/prefectures";

interface PrefectureSelectorProps {
  onSelectPrefecture: (code: string) => void;
}

const PrefectureSelector: React.FC<PrefectureSelectorProps> = ({
  onSelectPrefecture,
}) => {
  return (
    <section className="my-12">
      <h2 className="text-2xl font-bold mb-6 text-center dark:text-white">
        都道府県を選択
      </h2>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
          {prefectures.map((prefecture) => (
            <button
              key={prefecture.code}
              onClick={() => onSelectPrefecture(prefecture.code)}
              className="px-3 py-2 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/30 dark:hover:bg-blue-800/50 text-blue-800 dark:text-blue-200 rounded-lg transition-colors text-sm"
            >
              {prefecture.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PrefectureSelector;
