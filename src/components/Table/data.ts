const columns = [
    { name: 'Id', uid: 'id', sortable: true },
    { name: 'Дата', uid: 'date', sortable: true },
    { name: 'Боль', uid: 'headache' },
    { name: 'Цикл', uid: 'menstrual' },
    { name: 'Обезбол', uid: 'tookPainMeds' },
    { name: 'Название', uid: 'painMedsName' },
    { name: 'Количество', uid: 'painMedsQuantity', sortable: true },
    { name: 'Помогло', uid: 'painMedsHelped' },
    { name: 'Импортировано', uid: 'imported' },
    { name: 'Комментарий', uid: 'comment' },
];

const filters = [
    { name: 'Боль', uid: 'headache', options: ['Да', 'Нет'] },
    { name: 'Цикл', uid: 'menstrual', options: ['Да', 'Нет'] },
    { name: 'Обезбол', uid: 'tookPainMeds', options: ['Да', 'Нет'] },
    { name: 'Название', uid: 'painMedsName', options: ['Нурофен 400'] },
    {
        name: 'Помогло',
        uid: 'painMedsHelped',
        options: ['Да', 'Нет', 'Немного'],
    },
    // TODO::Переделать для возможности работы с импортами разными + фильтр
    // { name: 'Импортировано', uid: 'imported', options: ['Да'] },
];

export { columns, filters };
