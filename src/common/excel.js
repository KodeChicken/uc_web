import fs from 'file-saver'
import XLSX from 'xlsx'

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

// 导出Excel表格
export const exportFile = (title, data, fields) => {
    return new Promise(resolve => {
        // 转换成json对象
        let json = JSON.parse(JSON.stringify(data));
        // 获取数组中对象的字段名称
        // let fields = Object.keys(data[0]);
        json.forEach(item => {
            for (let i in item) {
                item[fields[i]] = item[i];
                delete item[i]; //删除原先的对象属性
            }
        })
        // 构建xlsx文件
        let sheetName = title;
        let wb = XLSX.utils.book_new();
        let ws = XLSX.utils.json_to_sheet(json, {header: Object.values(fields)}) //将JS对象数组转换为工作表。
        wb.SheetNames.push(sheetName)
        wb.Sheets[sheetName] = ws
        const defaultCellStyle = {
            font: {name: "Verdana", sz: 13, color: "FF00FF88"},
            fill: {fgColor: {rgb: "FFFFAA00"}}
        };//设置表格的样式
        let wopts = {
            bookType: 'xlsx',
            bookSST: false,
            type: 'binary',
            cellStyles: true,
            defaultCellStyle: defaultCellStyle,
            showGridLines: false
        }  //写入的样式
        let wbout = XLSX.write(wb, wopts)
        let blob = new Blob([s2ab(wbout)], {type: 'application/octet-stream'})
        fs.saveAs(blob, title + '.xlsx')
        resolve();
    });
}
const s2ab = s => {
    if (typeof ArrayBuffer !== 'undefined') {
        var buf = new ArrayBuffer(s.length)
        var view = new Uint8Array(buf)
        for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff
        return buf
    } else {
        var buf = new Array(s.length);
        for (var i = 0; i != s.length; ++i) buf[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    }
}

