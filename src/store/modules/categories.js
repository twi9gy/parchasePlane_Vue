export default {
    state: {
        categories:[
            {
                id: 1,
                name: 'main',
                is_new: false,
                editMode: false
            },
            {
                id: 2,
                name: 'test',
                is_new: false,
                editMode: false
            }
        ]
    },
    mutations: {
        createCategory(state) {
            state.categories.push({
                id: Date.now(),
                name: '',
                editMode: true,
                files: []
            });
        },
        deleteCategory(state, index) {
            state.categories.splice(index, 1);
        }
    },
    actions: {
    },
    getters: {
        allCategories(state) {
            return state.categories;
        },
        getCategoryById: (state) => (ind) => {
            return state.categories.find(category => category.id == ind);
        }
    }
}
