import { Prefecture } from "../types/weather";

export const prefectures: Prefecture[] = [
  { name: "北海道", code: "016010", region: "北海道" },
  { name: "青森県", code: "020010", region: "東北" },
  { name: "岩手県", code: "030010", region: "東北" },
  { name: "宮城県", code: "040010", region: "東北" },
  { name: "秋田県", code: "050010", region: "東北" },
  { name: "山形県", code: "060010", region: "東北" },
  { name: "福島県", code: "070010", region: "東北" },
  { name: "茨城県", code: "080010", region: "関東" },
  { name: "栃木県", code: "090010", region: "関東" },
  { name: "群馬県", code: "100010", region: "関東" },
  { name: "埼玉県", code: "110010", region: "関東" },
  { name: "千葉県", code: "120010", region: "関東" },
  { name: "東京都", code: "130010", region: "関東" },
  { name: "神奈川県", code: "140010", region: "関東" },
  { name: "新潟県", code: "150010", region: "中部" },
  { name: "富山県", code: "160010", region: "中部" },
  { name: "石川県", code: "170010", region: "中部" },
  { name: "福井県", code: "180010", region: "中部" },
  { name: "山梨県", code: "190010", region: "中部" },
  { name: "長野県", code: "200010", region: "中部" },
  { name: "岐阜県", code: "210010", region: "中部" },
  { name: "静岡県", code: "220010", region: "中部" },
  { name: "愛知県", code: "230010", region: "中部" },
  { name: "三重県", code: "240010", region: "関西" },
  { name: "滋賀県", code: "250010", region: "関西" },
  { name: "京都府", code: "260010", region: "関西" },
  { name: "大阪府", code: "270000", region: "関西" },
  { name: "兵庫県", code: "280010", region: "関西" },
  { name: "奈良県", code: "290010", region: "関西" },
  { name: "和歌山県", code: "300010", region: "関西" },
  { name: "鳥取県", code: "310010", region: "中国" },
  { name: "島根県", code: "320010", region: "中国" },
  { name: "岡山県", code: "330010", region: "中国" },
  { name: "広島県", code: "340010", region: "中国" },
  { name: "山口県", code: "350010", region: "中国" },
  { name: "徳島県", code: "360010", region: "四国" },
  { name: "香川県", code: "370000", region: "四国" },
  { name: "愛媛県", code: "380010", region: "四国" },
  { name: "高知県", code: "390010", region: "四国" },
  { name: "福岡県", code: "400010", region: "九州" },
  { name: "佐賀県", code: "410010", region: "九州" },
  { name: "長崎県", code: "420010", region: "九州" },
  { name: "熊本県", code: "430010", region: "九州" },
  { name: "大分県", code: "440010", region: "九州" },
  { name: "宮崎県", code: "450010", region: "九州" },
  { name: "鹿児島県", code: "460010", region: "九州" },
  { name: "沖縄県", code: "471010", region: "沖縄" },
];

// 主要都市のコード
export const MAJOR_CITIES = {
  TOKYO: "130010", // 東京
  OSAKA: "270000", // 大阪
  NAGOYA: "230010", // 名古屋
  SAPPORO: "016010", // 札幌
  FUKUOKA: "400010", // 福岡
};
