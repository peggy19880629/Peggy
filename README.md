# 葉佩琪的個人網站

青藍色、原生 Canvas 粒子動畫、響應式單頁網站。個人資料只有姓名與上班族身分，作品為空，不包含虛構經歷。

## 本機啟動

安裝 Node.js 18 或以上後，在此資料夾執行 `npm start` 或 `node server.js`，開啟 http://localhost:3000 。不需 npm install，沒有外部套件。

## API 與留言邊界

- GET /api/health：健康狀態。
- GET /api/profile：個人資料。
- POST /api/contact：檢查姓名、Email 與訊息，回覆驗證結果。沒有寄信、資料庫或持久儲存。
- docs 是靜態版本，API 不可用時讀取 data/profile.json。靜態版只做表單驗證，不送出訊息。

## 修改三個地方

1. public/data/profile.json：姓名、身分、自介與作品。作品格式為 {"title":"作品名稱","description":"作品說明"}。
2. public/style.css：在 :root 修改 --accent 主色。
3. public/index.html：關於我與留言文案。

修改後將 public 的內容複製到 docs，以同步靜態版本。若改姓名，也應同步 HTML 的標題、關於我與頁尾。

## GitHub Pages 發布準備

docs 已備妥，使用相對資源路徑。將專案上傳至自己的儲存庫後，以 main 分支的 /docs 為 Pages 發布來源。尚未代為建立 GitHub 儲存庫或公開發布。GitHub Pages 不執行 server.js。

## 動畫與操作

手機減少粒子數，支援系統減少動態設定與手動暫停，切換背景分頁時停止動畫。導覽、按鈕與表單支援鍵盤操作。
