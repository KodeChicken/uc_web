import Vue from 'vue'
// this是关键字，可用_this获取vue的原型链，就可以实现获取到element-ui中的message组件
const _this = Vue.prototype;
export default {
    confirmTips(data, title) {
        return new Promise((resolve, reject) => {
            _this.$confirm('确定删除' + data + '用户吗?', 'title', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                resolve();
            }).catch(() => {
                reject();
            })
        })
    },
    messageTips(duration, message, type) {
        _this.$message({
            duration: duration,
            message: message,
            type: type,
            center: true,
            customClass: 'messageTips'
        })
    },
    // bottom-left   bottom-right top-left 默认右上角
    notifyTips(duration, title, message, type, position) {
        _this.$notify({
            duration: duration,
            title: title,
            message: message,
            type: type,
            position: position
        });
    },
    notifyTipsInfo(title, message, position) {
        _this.$notify.info({
            title: title,
            message: message,
            position: position
        });
    },
    notifyTipsError(duration, message, position) {
        _this.$notify.error({
            title: '错误',
            duration: duration,
            message: message,
            position: position
        });
    }
}



