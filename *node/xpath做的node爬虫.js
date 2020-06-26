var http=require('http');
var fs=require('fs');
var cheerio=require('cheerio');
var iconv=require('iconv-lite');//iconv-lite模块用于解码
const xpath = require('xpath');
const dom = require('xmldom').DOMParser
var url = 'http://web.anyv.net/index.php/article-4204027';

function goStart(url){
    http.get(url,function(res){
        var htmlData=[];//用于接收获取到的网页
        var htmlDataLength=0;
        //res.setEncoding('utf-8');
        res.on('data',function(chunk){
            htmlData.push(chunk);
            htmlDataLength+=chunk.length;
        })
        
        res.on('end',function(){
            //数据获取完毕后，开始解码
            var bufferHtmlData=Buffer.concat(htmlData,htmlDataLength);
            var decodeHtmlData=iconv.decode(bufferHtmlData,'gbk');
            
            var xml = decodeHtmlData
            var doc = new dom().parseFromString(xml)
            var nodes = xpath.select("//*[@id='js_content']/section", doc)
            const w = nodes.toString();
            console.log(w)
        })
    })
}

goStart(url);