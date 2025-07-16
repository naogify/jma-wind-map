# weather-map

気象庁のGPVデータをRGBエンコーディングしたPNGに変換し、可視化するサンプルです。

## 概要
- MapLibre GLとDeck.gl、weatherlayers-glを利用して、風向・風速データを地図上に可視化します。
- 風データは`public/wind_data.png`を利用しています。
- 地図スタイルはGeoloniaのスタイルを使用しています。

## デモ
![風データの可視化](public/wind_data.png)

## セットアップ

### 1. リポジトリのクローン
```bash
git clone <このリポジトリのURL>
cd weather-map
```

### 2. 依存パッケージのインストール
```bash
npm install
```

### 3. 開発サーバーの起動
```bash
npm run dev
```

ブラウザで `http://localhost:5173` を開いて地図を確認できます。

## 主なファイル構成
- `index.html` : アプリのエントリーポイント
- `src/main.js` : 地図と風データの描画ロジック
- `src/style.css` : スタイルシート
- `public/wind_data.png` : 風データ画像

## 使用技術
- [MapLibre GL JS](https://maplibre.org/)
- [Deck.gl](https://deck.gl/)
- [weatherlayers-gl](https://github.com/naogify/weatherlayers-gl)
- [Vite](https://vitejs.dev/)


## データ出典
[気象庁「全球数値予報モデルGPV (GSM全球域・日本域)」](https://www.data.jma.go.jp/developer/gpv_sample.html)を加工して作成
