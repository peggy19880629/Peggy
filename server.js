const http=require('node:http');
const fs=require('node:fs/promises');
const path=require('node:path');
const root=path.join(__dirname,'public');
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8'};
function json(res,status,data){res.writeHead(status,{'Content-Type':types['.json'],'Cache-Control':'no-store'});res.end(JSON.stringify(data));}
const server=http.createServer(async(req,res)=>{try{
 const url=new URL(req.url,'http://localhost');
 if(req.method==='GET'&&url.pathname==='/api/health')return json(res,200,{ok:true});
 if(req.method==='GET'&&url.pathname==='/api/profile')return json(res,200,JSON.parse(await fs.readFile(path.join(root,'data/profile.json'),'utf8')));
 if(req.method==='POST'&&url.pathname==='/api/contact'){
  let body='';for await(const chunk of req){body+=chunk;if(Buffer.byteLength(body)>12000)return json(res,413,{message:'訊息太長，請縮短後再試。'});}
  let data;try{data=JSON.parse(body);}catch{return json(res,400,{message:'資料格式不正確。'});}
  if(!data||typeof data.name!=='string'||!data.name.trim()||data.name.length>80||typeof data.email!=='string'||data.email.length>254||! /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)||typeof data.message!=='string'||!data.message.trim()||data.message.length>2000)return json(res,400,{message:'請填寫有效的姓名、Email 與訊息。'});
  return json(res,200,{message:`謝謝 ${data.name.trim()}，留言格式驗證成功。這是示範，訊息未寄出或保存。`});
 }
 if(!['GET','HEAD'].includes(req.method))return json(res,405,{message:'不支援此方法。'});
 const relative=decodeURIComponent(url.pathname).replace(/^\/+/, '')||'index.html';
 const file=path.resolve(root,relative);if(!file.startsWith(root+path.sep))return json(res,403,{message:'禁止存取。'});
 try{const content=await fs.readFile(file);res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','X-Content-Type-Options':'nosniff'});res.end(req.method==='HEAD'?undefined:content);}catch{return json(res,404,{message:'找不到頁面。'});}
 }catch{return json(res,400,{message:'無法處理請求。'});}});
server.listen(process.env.PORT||3000,'127.0.0.1',()=>console.log(`個人網站已啟動：http://localhost:${server.address().port}`));
