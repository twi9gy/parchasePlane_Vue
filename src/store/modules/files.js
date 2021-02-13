export default {
    state: {
        files: [
            {
                id: 1,
                name: "file1",
                content: "this is file 1",
                is_new: false
            },
            {
                id: 2,
                name: "file2",
                content: "this is file 2",
                is_new: false
            }
        ]
    },
    mutations: {
        createFile(state) {
            state.files.push({
                id: Date.now(),
                name: '',
                content: '',
                is_new: true
            });
        },
        deleteFile(state, index) {
            state.files.splice(index, 1);
        }
    },
    actions: {
    },
    getters: {
        allFiles(state) {
            return state.files;
        }
    }
}
