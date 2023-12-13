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

export { columns };
