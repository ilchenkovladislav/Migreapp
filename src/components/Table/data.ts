const columns = [
    { name: 'Id', uid: 'id', sortable: true },
    { name: 'Дата', uid: 'date', sortable: true },
    { name: 'Боль', uid: 'headache', sortable: true },
    { name: 'Цикл', uid: 'menstrual', sortable: true },
    { name: 'Обезбол', uid: 'tookPainMeds', sortable: true },
    { name: 'Название', uid: 'painMedsName', sortable: true },
    { name: 'Количество', uid: 'painMedsQuantity', sortable: true },
    { name: 'Помогло', uid: 'painMedsHelped', sortable: true },
    { name: 'Комментарий', uid: 'comment' },
    { name: 'ACTIONS', uid: 'actions' },
];

const statusOptions = [
    { name: 'Active', uid: 'active' },
    { name: 'Paused', uid: 'paused' },
    { name: 'Vacation', uid: 'vacation' },
];

export { columns, statusOptions };
