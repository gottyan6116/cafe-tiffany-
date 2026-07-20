# Cafe Kitchen Tiffany

桜上水のCafe Kitchen Tiffany向け、B案「桜上水レトロモダン」をもとにした静的サイトです。HTML、CSS、JavaScriptのみで構成しています。

## 表示する

ローカルでは、リポジトリ直下で次を実行してください。

```bash
python -m http.server 4173
```

ブラウザで `http://localhost:4173` を開きます。

## 内容を確認する

```bash
npm test
```

## 写真を差し替える

`assets/images/` の以下のファイルを同名のJPEG画像で置き換えると、レイアウトを崩さずに写真を更新できます。

- `exterior.jpg`：外観・Hero
- `interior-wide.jpg`：店内全景
- `interior-counter.jpg`：カウンター・ギャラリー
- `dessert-coffee.jpg`：デザート・コーヒー
- `cake-iced-coffee.jpg`：料理・ドリンク

写真は横位置・縦位置を問わず表示できますが、Heroは横長16:9、料理・店内は4:3または3:2が推奨です。掲載前に人物・撮影者の許諾をご確認ください。

## 公開前の確認

- `index.html` 内の住所、電話番号、外部リンク、営業時間表記を店舗の正式情報に更新する。
- `assets/js/main.js` の予約フォーム用 `data-recipient` に、店舗確認済みの受付メールアドレスを設定する。
- メニュー・価格・サービス内容は、店舗確認済みの情報のみを掲載する。
