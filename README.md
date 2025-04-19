# 🧊 WhiteBox

**WhiteBox** は、真っ白な画面をクリックすると、クリック位置にちなんだ“豆知識”が表示される遊び心あるWebアプリです。どこをクリックしても、新しい発見があるかも？

---

## ✨ 主な機能

- クリックした座標にちなんだ豆知識をAIが生成（OpenAI API使用）
- 同じ座標をクリックした人の数と全体クリック数から割合を表示
- ポップアップで情報を表示し、✕ボタンで閉じると再度クリック可能に
- スマホでも見やすいようにフォントサイズ・行間は可変対応

---

## 🛠 インストール・起動方法

```bash
# 1. リポジトリをクローン
git clone https://github.com/your-username/whitebox.git
cd whitebox

# 2. 依存関係をインストール
npm install

# 3. 環境変数を設定（.env.local を作成）
echo "OPENAI_API_KEY=your-api-key" > .env.local

# 4. 開発サーバーを起動
npm run dev
```

ブラウザで `http://localhost:3000` を開いてアクセスしてください。

---

## 🧠 使用している技術

- **Next.js (App Router)**
- **Tailwind CSS**
- **OpenAI GPT (推奨モデル: `gpt-4.1-mini` or `gpt-3.5-turbo`)**
- **仮想DB: JSONファイルでのクリック履歴保存**

---

## 🔐 注意

- OpenAIのAPIキーが必要です（[APIキー取得はこちら](https://platform.openai.com/account/api-keys)）
- 長時間のアクセスが増えると、JSONベースの記録に限界が来るため、将来的にはSupabaseなどへの移行をおすすめします

