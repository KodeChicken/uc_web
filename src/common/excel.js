export const importData = (file, obj) => {
    return new Promise((resolve, reject) => {
        var rABS = false; //是否将文件读取为二进制字符串
        var f = file;
        var reader = new FileReader();
        //if (!FileReader.prototype.readAsBinaryString) {
        FileReader.prototype.readAsBinaryString = f => {
            var binary = "";
            var rABS = false; //是否将文件读取为二进制字符串
            var wb; //读取完成的数据
            var outdata;
            var reader = new FileReader();
            reader.onload = e => {
                var bytes = new Uint8Array(reader.result);
                var length = bytes.byteLength;
                for (var i = 0; i < length; i++) {
                    binary += String.fromCharCode(bytes[i]);
                }
                var XLSX = require('xlsx');
                if (rABS) {
                    wb = XLSX.read(btoa(fixdata(binary)), { //手动转化
                        type: 'base64'
                    });
                } else {
                    wb = XLSX.read(binary, {
                        type: 'binary'
                    });
                }
                outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);//outdata就是你想要的东西
                let tmpData = [...outdata]
                let arr = [];
                tmpData.map(v => {
                    let tmpObj = {};
                    let keys = Object.keys(obj);
                    keys.forEach(key => {
                        tmpObj[key] = v[key];
                    })
                    arr.push(tmpObj);
                });
                let para = {
                    dataList: arr
                }
                debugger
                resolve(para);
            }
            reader.readAsArrayBuffer(f);
        }
        if (rABS) {
            reader.readAsArrayBuffer(f);
        } else {
            reader.readAsBinaryString(f);
        }
    });
}


