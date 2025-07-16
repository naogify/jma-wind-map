# jma-wind-map

![スクリーンショット 2025-07-16 22 57 07](https://github.com/user-attachments/assets/66ff21e4-4aeb-440f-ba8e-5f74ed26240a)

気象庁のGPVデータをRGBエンコーディングしたPNGに変換し、可視化するサンプルです。

## 概要
- MapLibre GLとDeck.gl、weatherlayers-glを利用して、風向・風速データを地図上に可視化します。
- 風データは[`public/wind_data.png`](public/wind_data.png)を利用しています。

## 風データPNGのエンコーディングについて
- 風速データ（U, V成分）をPNG画像にエンコードしています。
- **RチャンネルにU成分、GチャンネルにV成分**を割り当てています。
- データが存在しない部分は**Aチャンネル（アルファ）を0**にしています。
- 詳細仕様は [weatherlayers-gl公式ドキュメント](https://docs.weatherlayers.com/weatherlayers-gl/data-sources#supported-data-types) および [データフォーマット](https://docs.weatherlayers.com/weatherlayers-gl/data-sources#supported-data-formats) を参照してください。


## サンプルコード

```
map.on('load', async () => {

  const image = await WeatherLayers.loadTextureData('./wind_data.png');

  const deckOverlay = new MapboxOverlay({
    interleaved: true,
    layers: [
      new WeatherLayers.ParticleLayer({
        id: 'particle',
        numParticles: 5000,
        maxAge: 10,
        speedFactor: 30,
        width: 2.0,
        opacity: 0.03,
        image: image,
        imageType: 'VECTOR',
        bounds: [-180, -90, 180, 90],
        imageUnscale: [-128, 127],
      }),
    ]
  });

  map.addControl(deckOverlay);
});
```

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

## 使用技術
- [MapLibre GL JS](https://maplibre.org/)
- [Deck.gl](https://deck.gl/)
- [weatherlayers-gl](https://github.com/naogify/weatherlayers-gl)
- [Vite](https://vitejs.dev/)


## データ出典
[気象庁「全球数値予報モデルGPV (GSM全球域・日本域)」](https://www.data.jma.go.jp/developer/gpv_sample.html)を加工して作成
