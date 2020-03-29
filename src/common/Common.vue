<template>
    
</template>

<script>
    export default {
        name: "Common",
        data() {
            return {}
        },
        methods: {
            confirmTips(data, title) {
                return this.$confirm('确定删除' + data + '用户吗?', 'title', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
            },
            messageTips(duration, message, type) {
                this.$message({
                    duration: duration,
                    message: message,
                    type: type,
                    center: true,
                    customClass: 'messageTips'
                })
            },
            // bottom-left   bottom-right top-left 默认右上角
            notifyTips(duration, title, message, type, position) {
                this.$notify({
                    duration: duration,
                    title: title,
                    message: message,
                    type: type,
                    position: position
                });
            },
            notifyTipsInfo(title, message, position) {
                this.$notify.info({
                    title: title,
                    message: message,
                    position: position
                });
            },
            notifyTipsError(duration, message, position) {
                this.$notify.error({
                    title: '错误',
                    duration: duration,
                    message: message,
                    position: position
                });
            }
        }
    }
</script>

<style scoped>

</style>