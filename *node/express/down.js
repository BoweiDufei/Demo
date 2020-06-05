const express = require('express');
const fs = require('fs');
let app = express();
app.get('/a.mp4', (req, res, next) => {
    let range = req.headers["range"];
    // 下载文件路径
    let p = 'test.mp4';
    // 存在 range 请求头将返回范围请求的数据
    if (range) {
        // 获取范围请求的开始和结束位置
        let [, start, end] = range.match(/(\d*)-(\d*)/);
        console.log(`start = ${start} end = ${end}`);
        // 错误处理
        let statObj = null;
        try {
            statObj = fs.statSync(p);
        } catch (e) {
            res.end("Not Found");
        }
        // 文件总字节数
        let total = statObj.size;
        console.log(`total = ${total}`);
        // 处理请求头中范围参数不传的问题
        start = start ? parseInt(start) : 0;
        end = end ? parseInt(end) : total - 1;
        // 响应客户端
        res.statusCode = 206;
        res.setHeader("Accept-Ranges", "bytes");
        res.setHeader("Content-Range", `bytes ${start}-${end}/${total}`);
        fs.createReadStream(p, {
            start,
            end
        }).pipe(res);
    } else {
        // 没有 range 请求头时将整个文件内容返回给客户端
        fs.createReadStream(p).pipe(res);
    }
})
app.listen(3000, () => {
    console.log(`server is running at port 3000`)
})