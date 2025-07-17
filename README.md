# jma-wind-map


![スクリーンショット 2025-07-17 0 08 39](https://github.com/user-attachments/assets/b1272c31-792c-46ca-a51c-a1730e27a256)

[気象庁「全球数値予報モデルGPV (GSM全球域)」](https://www.data.jma.go.jp/developer/gpv_sample.html)データ（GRIB2）から風ベクトル（U、V）データを取得しRGBエンコーディングしたPNGを地図上に可視化するサンプルです。

## デモURL
https://naogify.github.io/jma-wind-map/

## 概要
- MapLibre GLとDeck.gl、weatherlayers-glを利用して、風向・風速データを地図上に可視化します。
- 風データは[`public/wind_data.png`](public/wind_data.png)を利用しています。

## 風ベクトルデータのPNGのエンコーディングについて
- 風ベクトルデータ（U, V成分）・地上10m をPNG画像にエンコードしています。
- [weatherlayers-gl公式ドキュメント](https://docs.weatherlayers.com/weatherlayers-gl/data-sources#supported-data-types) および [データフォーマット](https://docs.weatherlayers.com/weatherlayers-gl/data-sources#supported-data-formats) で提唱されている形式でRGBエンコードしています。
- [grib2 to RGB Encode PNG tools](https://github.com/naogify/grib2png.sh) を使って PNG 画像を作成しています。


## データ可視化サンプルコード

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
        bounds: [-180, -90, 180, 90], // 全世界を指定
        imageUnscale: [-128, 127], // RGBエンコード画像作成時に指定した -scale の値。 grib2uv2png.sh を使っている場合はこのまま。
      }),
    ]
  });

  map.addControl(deckOverlay);
});
```

属性の詳細は [Particle Layer | WeatherLayers](https://docs.weatherlayers.com/weatherlayers-gl/layers/particle-layer#style-properties)を参考にしてください。

## セットアップ

```bash
git clone git@github.com:naogify/jma-wind-map.git
cd jma-wind-map
npm install
```

### 開発サーバーの起動
```bash
npm run dev
```

ブラウザで `http://localhost:5173` を開いて地図を確認できます。

## データ出典
[気象庁「全球数値予報モデルGPV (GSM全球域)」](https://www.data.jma.go.jp/developer/gpv_sample.html)を加工して作成

## 参考
このプロジェクトは以下のプロジェクトに触発されて作成しています。

- https://github.com/Kanahiro/japan-windmap-example
- https://github.com/shiwaku/japan-windmap-example

