module.exports = {
    publicPath:"./",
    outputDir:"dist",
    assetsDir:"./static",
    indexPath:"index.html",
    filenameHashing:true,
    pages:undefined,
    lintOnSave:true,
    runtimeCompiler:false,
    transpileDependencies:[],
    productionSourceMap:false,
    crossorigin:undefined,
    integrity:false,
    devServer:{//代理
        port:8080,
        proxy:'http://127.0.0.1:8080'
    }
}
