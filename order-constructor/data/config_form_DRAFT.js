// config_form.js - Simplified User-Centric Configuration
window.FormConfig = {
    sections: [
        {
            id: 'section-boards',
            title: '🪵 Плитні матеріали',
            items: [
                {
                    type: 'field',
                    id: 'board_materials_list',
                    label: 'Список плитних матеріалів (ДСП, ДВП тощо)',
                    hint: 'Додайте всі плитні матеріали, що використовуються в замовленні',
                    type: 'repeater', // Conceptual: Allow adding multiple items
                    fields: [
                        {
                            id: 'material',
                            type: 'catalog',
                            catalogId: 'ldsp', // Maps to Catalog_BoardMaterials
                            placeholder: 'Оберіть матеріал...',
                            width: 'flex'
                        },
                        {
                            id: 'thickness',
                            type: 'text',
                            placeholder: 'Товщина',
                            width: '100px'
                        }
                    ]
                }
            ]
        }
        // ... I need to verify if the Engine supports 'repeater' or if I stick to static rows
    ]
};
