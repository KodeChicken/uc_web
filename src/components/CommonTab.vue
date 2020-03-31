<template>
    <div class="tags">
        <el-tag
                size="small"
                :key="tag.name"
                v-for="tag in tags"
                :closable="tag.name !== 'home'"
                :disable-transitions="false"
                @close="handleClose(tag)"
                @click="handleClick(tag)">
            {{tag.label}}
        </el-tag>
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'

    export default {
        computed: {
          ...mapState({
              tags: state => state.tab.tabsList
          }),

        },
        data() {
            return {
                dynamicTags: ['标签一', '标签二', '标签三'],
                inputVisible: false,
                inputValue: ''
            };
        },
        methods: {
            ...mapMutations({
                closeTab: 'closeTab',
            }),
            handleClose(tag) {
                this.closeTab(tag)
            },
            handleClick(tag){
                console.log('tag : ',tag)
                this.$router.push(tag.path).catch(err => {})
            }
        }
    }
</script>

<style lang="scss" scoped>
    .tags {
        padding: 20px;
        .el-tag {
        }
    }


    .el-tag + .el-tag {
        margin-left: 10px;
    }
    .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
    }
    .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
    }
</style>