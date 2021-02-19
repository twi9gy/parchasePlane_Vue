export default {
    state: {
        ReportForm: {
            demandForecast: false,
            purchasePlan: false,
            objectAnalysis: 'file',
            method: 'Метод Хольта - Винтерса',
            fileName: '',
            radioReport: [
                {
                    id: 'Category',
                    title: 'По категории',
                    value: 'category'
                },
                {
                    id: 'File',
                    title: 'По файлу',
                    value: 'file'
                }
            ],
            SelectItemForecast: [
                {
                    name: 'Category',
                    nameSelect : 'Выберите категорию',
                    label: 'Название кагории',
                    listItem: [
                        { value: 'Среднее специальное', text: 'Среднее специальное' },
                        { value: 'Неоконченное высшее', text: 'Неоконченное высшее'},
                        { value: 'Высшее', text: 'Высшее'},
                        { value: 'Бакалавр', text: 'Бакалавр'},
                        { value: 'Магистр', text: 'Магистр'},
                        { value: 'Кандидат наук', text: 'Кандидат наук'},
                        { value: 'Доктор наук', text: 'Доктор наук'}
                    ]
                },
                {
                    name: 'File',
                    nameSelect : 'Выберите файл',
                    label: 'Название файла',
                    listItem: [
                        { value: 'Среднее специальное', text: 'Среднее специальное' },
                        { value: 'Неоконченное высшее', text: 'Неоконченное высшее'},
                        { value: 'Высшее', text: 'Высшее'},
                        { value: 'Бакалавр', text: 'Бакалавр'},
                        { value: 'Магистр', text: 'Магистр'},
                        { value: 'Кандидат наук', text: 'Кандидат наук'},
                        { value: 'Доктор наук', text: 'Доктор наук'}
                    ]
                }
            ],
            SelectItemPlan: [
                {
                    name: 'Category',
                    nameSelect : 'Выберите категорию',
                    label: 'Название кагории',
                    listItem: [
                        { value: 'Среднее специальное', text: 'Среднее специальное' },
                        { value: 'Неоконченное высшее', text: 'Неоконченное высшее'},
                        { value: 'Высшее', text: 'Высшее'},
                        { value: 'Бакалавр', text: 'Бакалавр'},
                        { value: 'Магистр', text: 'Магистр'},
                        { value: 'Кандидат наук', text: 'Кандидат наук'},
                        { value: 'Доктор наук', text: 'Доктор наук'}
                    ]
                },
                {
                    name: 'File',
                    nameSelect : 'Выберите файл',
                    label: 'Название файла',
                    listItem: [
                        { value: 'Среднее специальное', text: 'Среднее специальное' },
                        { value: 'Неоконченное высшее', text: 'Неоконченное высшее'},
                        { value: 'Высшее', text: 'Высшее'},
                        { value: 'Бакалавр', text: 'Бакалавр'},
                        { value: 'Магистр', text: 'Магистр'},
                        { value: 'Кандидат наук', text: 'Кандидат наук'},
                        { value: 'Доктор наук', text: 'Доктор наук'}
                    ]
                }
            ]
        }
    },
    mutations: {
        changeObject(state, object) {
            state.ReportForm.objectAnalysis = object;
        }
    },
    actions: {
    },
    getters: {
        getReportForm(state) {
            return state.ReportForm;
        },
        getSelectItem(state) {
            if (state.ReportForm.objectAnalysis === 'category') {
                return {
                    forecast: state.ReportForm.SelectItemForecast[0],
                    plan: state.ReportForm.SelectItemPlan[0]
                }
            } else {
                return {
                    forecast: state.ReportForm.SelectItemForecast[1],
                    plan: state.ReportForm.SelectItemPlan[1]
                }
            }
        },
    }
}
