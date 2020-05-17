<template>
    <div class="custom-tree-container">
        <el-row :gutter="20">
            <el-col :span="14">
                <div class="block" id="role-tree"
                     style="width:600px">
                    <p>角色列表</p>
                    <el-tree :data="data"
                             node-key="id"
                             :default-expand-all="false"
                             :props="defaultProps"
                             :expand-on-click-node="false"
                             @node-click="nodeclick"
                             @node-drag-start="handleDragStart"
                             @node-drag-enter="handleDragEnter"
                             @node-drag-leave="handleDragLeave"
                             @node-drag-over="handleDragOver"
                             @node-drag-end="handleDragEnd"
                             @node-drop="handleDrop"
                             draggable
                             :allow-drop="allowDrop"
                             :allow-drag="allowDrag">
                        <span class="custom-tree-node"
                              slot-scope="{ node, data }">
                          <!-- 如果是编辑状态 -->
                          <template v-if="data.isEdit==1">
                            <el-input ref="input"
                                      @blur="() => submitEdit(node,data)"
                                      v-model="newName"
                                      style="height:20px;line-height:20px"></el-input>
                              <!-- 放弃、提交按钮废弃，改为失去焦点自动提交 -->
                              <!-- <el-button type="text"
                                size="mini"
                                @click="() => cancelEdit(node,data)">C</el-button>
                              <el-button type="text"
                                size="mini"
                                @click="() => submitEdit(node,data)">S</el-button> -->
                          </template>
                            <!-- 如果不是编辑状态 -->
                          <span v-else
                                v-text="data.name"></span>
                          <span>
                            <el-button type="text" class="edit-class"
                                       size="mini"
                                       @click="() => edit(node,data)">
                              编辑
                            </el-button>
                            <el-button type="text" class="add-class"
                                       size="mini"
                                       @click="() => append(node,data)">
                              添加
                            </el-button>
                            <el-button type="text" class="delete-class"
                                       size="mini"
                                       @click="() => remove(node, data)">
                              删除
                            </el-button>
                          </span>
                        </span>
                    </el-tree>
                </div>
            </el-col>
            <el-col :span="10">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="活动名称" label-width="80px">
                        <el-input v-model="form.name" size="mini"></el-input>
                    </el-form-item>
                    <el-form-item label="活动区域">
                        <el-select v-model="form.region" placeholder="请选择活动区域">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="活动时间">
                        <el-col :span="11">
                            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                        </el-col>
                        <el-col class="line" :span="2">-</el-col>
                        <el-col :span="11">
                            <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="即时配送">
                        <el-switch v-model="form.delivery"></el-switch>
                    </el-form-item>
                    <el-form-item label="活动性质">
                        <el-checkbox-group v-model="form.type">
                            <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                            <el-checkbox label="地推活动" name="type"></el-checkbox>
                            <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                            <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="特殊资源">
                        <el-radio-group v-model="form.resource">
                            <el-radio label="线上品牌商赞助"></el-radio>
                            <el-radio label="线下场地免费"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="活动形式">
                        <el-input type="textarea" v-model="form.desc"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">立即创建</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>

            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {findAllResource} from "../../js/resource";

    export default {
        data() {
            return {
                data: [],
                newName: '',
                defaultProps: {
                    children: 'childrens',
                    name: 'name'
                },
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },

            }
        },
        created() {
            console.log('resource ', this.$route.path);
            this.getAllResource();
        },
        methods: {
            onSubmit() {
                console.log('submit!');
            },
            // 调api获取接口分组数据
            getAllResource() {
                findAllResource().then(res => {
                    this.data = res.data;
                }).catch(err => console.log(err))
            },
            handleDragStart(node, ev) {
                console.log('drag start', node.data.name)
            },
            handleDragEnter(draggingNode, dropNode, ev) {
                console.log('tree drag enter: ', dropNode.data.name)
            },
            handleDragLeave(draggingNode, dropNode, ev) {
                console.log('tree drag leave: ', dropNode.data.name)
            },
            handleDragOver(draggingNode, dropNode, ev) {
                console.log('tree drag over: ', dropNode.data.name)
            },
            handleDragEnd(draggingNode, dropNode, dropType, ev) {
                console.log(
                    'tree drag end: ',
                    dropNode && dropNode.data.name,
                    dropType
                )
                // 调后端更新
                this.updateApiGroup(this.data)
            },
            handleDrop(draggingNode, dropNode, dropType, ev) {
                console.log('tree drop: ', dropNode.data.name, dropType)
            },
            allowDrop(draggingNode, dropNode, type) {
                if (dropNode.data.id === 1) {
                    return false
                } else {
                    return true
                }
            },
            allowDrag(draggingNode) {
                // 顶层默认分组不允许拖拽
                if (draggingNode.data.id === 1) {
                    return false
                } else {
                    return true
                }
                // return draggingNode.data.name.indexOf('三级 3-2-2') === -1
            },

            append(node, data) {
                debugger;
                // var pid = data.parentApiGroupId + ':' + data.id
                var timestamp = new Date().getTime()
                const newChild = {
                    id: timestamp,
                    isEdit: 0,
                    name: 'T' + timestamp,
                    childrens: []
                }
                if (!data.childrens) {
                    this.$set(data, 'childrens', [])
                }
                data.childrens.push(newChild)
                // this.updateApiGroup(this.data)
            },

            remove(node, data) {
                debugger;
                const parent = node.parent
                const children = parent.data.childrens || parent.data
                const index = children.findIndex(d => d.id === data.id)
                children.splice(index, 1)
                // this.updateApiGroup(this.data)
            },

            edit(node, data) {
                debugger;
                console.log('before:', data.id, // data.parentApiGroupId,
                    data.name, data.isEdit)
                this.$set(data, 'isEdit', 1)
                this.newName = data.name
                this.$nextTick(() => {
                    this.$refs.input.focus()
                })
                console.log('after:', data.id, data.name, data.isEdit)
            },

            submitEdit(node, data) {
                // console.log('点击了保存按钮')
                if (data.name == this.newName) {
                    console.log('没有修改')
                    this.newName = ''
                    this.$set(data, 'isEdit', 0)
                } else {
                    this.$set(data, 'name', this.newName)
                    this.newName = ''
                    this.$set(data, 'isEdit', 0)
                    // console.log('after:', data.id, data.name)
                    // console.log(this.data)
                    // this.updateApiGroup(this.data)
                }
            },

            cancelEdit(node, data) {
                // console.log('放弃编辑')
                // console.log(data.id, data.name)
                this.newName = ''
                this.$set(data, 'isEdit', 0)
            },

            updateApiGroup(data) {
                console.log(data)
                // updateApiGroup(1, data)
                //     .then(response => {
                //         console.log(response)
                //     })
                //     .catch(err => {
                //         console.log(err)
                //     })
            },
            nodeclick(node, data, obj) {
                console.log('点击了：', node.id, node.name)
                // this.$store.dispatch('appium/changeApiGroupId', node.id)
                // console.log(this.$store.getters.apiGroupId)
            }

        }
    }
</script>

<style scoped>

    #role-tree {
        /*background-color: #69d0a3;*/
        padding: 0px 50px 50px 50px;
        /*border:1px solid #69d0a3;*/
        /*border-radius: 10px;*/

    }

    .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 20px;
        margin-top: 5px;
    }

    /deep/ .el-input__inner {
        height: 20px;
    }
    /*/deep/ .el-tree{*/
    /*    border-radius: 10px;*/
    /*    position: relative;*/
    /*    cursor: default;*/
    /*    background:#f5fbf954;*/
    /*    color: #606266;*/
    /*}*/

    .add-class {
        color: #67c23a;
    }

    .edit-class {
        color: #409eff;
    }

    .delete-class {
        color: #f56c6c;
    }

</style>