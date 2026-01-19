// field_config.js - Excel-Mirror Configuration
window.FormConfig = {
    settings: {
        layout: 'excel' // Marker for Engine to apply specific styles
    },
    sections: [
        {
            id: 'section-materials',
            title: 'Матеріали',
            items: [
                {
                    type: 'row',
                    className: 'excel-row',
                    items: [
                        { type: 'label', label: 'Корпус нижніх модулів', width: '300px' },
                        { type: 'catalog', id: 'corpus_bottom', catalogId: 'ldsp', placeholder: 'Оберіть ДСП...', width: 'flex' },
                        { type: 'text', id: 'corpus_bottom_thick', placeholder: '18', width: '60px', value: '18' }
                    ]
                },
                {
                    type: 'row',
                    className: 'excel-row',
                    items: [
                        { type: 'label', label: 'Корпус верхніх модулів', width: '300px' },
                        { type: 'catalog', id: 'corpus_top', catalogId: 'ldsp', placeholder: 'Оберіть ДСП...', width: 'flex' },
                        { type: 'text', id: 'corpus_top_thick', placeholder: '18', width: '60px', value: '18' }
                    ]
                },
                {
                    type: 'row',
                    className: 'excel-row',
                    items: [
                        { type: 'label', label: 'Корпус додатково', width: '300px' },
                        { type: 'catalog', id: 'corpus_extra', catalogId: 'ldsp', placeholder: 'Оберіть ДСП...', width: 'flex' },
                        { type: 'text', id: 'corpus_extra_thick', placeholder: '18', width: '60px' }
                    ]
                },
                {
                    type: 'row',
                    className: 'excel-row',
                    items: [
                        { type: 'label', label: 'Крайка корпуса', width: '300px' },
                        { type: 'catalog', id: 'edge_corpus', catalogId: 'edges', placeholder: 'Оберіть крайку...', width: 'flex' },
                        { type: 'text', id: 'edge_corpus_thick', placeholder: '0.4', width: '60px' }
                    ]
                },
                {
                    type: 'row',
                    className: 'excel-row',
                    items: [
                        { type: 'label', label: 'Крайка стільниці', width: '300px' },
                        { type: 'text', id: 'edge_countertop', placeholder: 'Опис...', width: 'flex' },
                        { type: 'text', id: 'edge_countertop_thick', placeholder: '-', width: '60px' }
                    ]
                },
                {
                    type: 'row',
                    className: 'excel-row',
                    items: [
                        { type: 'label', label: 'Колір ДВП', width: '300px' },
                        { type: 'text', id: 'dvp', placeholder: 'Білий...', width: 'flex' },
                        // Empty filler for alignment
                        { type: 'html', content: '', width: '60px' }
                    ]
                }
            ]
        },
        {
            id: 'section-facades',
            title: 'Фасади',
            items: [
                // Bottom
                { type: 'html', content: '<div class="excel-subheader">Фасади нижніх модулів</div>' },
                {
                    type: 'row',
                    className: 'excel-row',
                    items: [
                        { type: 'label', label: 'Матеріал/Колір', width: '200px', indent: true },
                        { type: 'catalog', id: 'facade_bottom', catalogId: 'facades', placeholder: 'Пошук...', width: 'flex' },
                        { type: 'text', id: 'facade_bottom_thick', placeholder: '18', width: '60px' }
                    ]
                },
                {
                    type: 'row',
                    className: 'excel-row',
                    items: [
                        { type: 'label', label: 'Фарбув/Текстура', width: '200px', indent: true },
                        { type: 'select', id: 'facade_bottom_paint', options: ['-', 'Лицьова', 'Обидві'], width: '50%' },
                        { type: 'select', id: 'facade_bottom_texture', options: ['-', 'Гориз.', 'Верт.'], width: '50%' }
                    ]
                },

                // Top
                { type: 'html', content: '<div class="excel-subheader">Фасади верхніх модулів</div>' },
                {
                    type: 'row',
                    className: 'excel-row',
                    items: [
                        { type: 'label', label: 'Матеріал/Колір', width: '200px', indent: true },
                        { type: 'catalog', id: 'facade_top', catalogId: 'facades', placeholder: 'Пошук...', width: 'flex' },
                        { type: 'text', id: 'facade_top_thick', placeholder: '18', width: '60px' }
                    ]
                },

                // Antresol
                { type: 'html', content: '<div class="excel-subheader">Фасади антресольних модулів</div>' },
                {
                    type: 'row',
                    className: 'excel-row',
                    items: [
                        { type: 'label', label: 'Матеріал/Колір', width: '200px', indent: true },
                        { type: 'catalog', id: 'facade_antresol', catalogId: 'facades', placeholder: 'Пошук...', width: 'flex' },
                        { type: 'text', id: 'facade_antresol_thick', placeholder: '18', width: '60px' }
                    ]
                },

                {
                    type: 'row',
                    className: 'excel-row',
                    items: [
                        { type: 'label', label: 'Крайка фасадів', width: '300px' },
                        { type: 'catalog', id: 'edge_facades', catalogId: 'edges', placeholder: 'Оберіть крайку...', width: 'flex' },
                        { type: 'text', id: 'edge_facades_thick', placeholder: '-', width: '60px' }
                    ]
                }
            ]
        },
        {
            id: 'section-countertops',
            title: 'Стільниці та Скло',
            items: [
                {
                    type: 'row',
                    className: 'excel-row',
                    items: [
                        { type: 'label', label: 'Стільниця', width: '300px' },
                        { type: 'catalog', id: 'countertop', catalogId: 'postforming', placeholder: 'Пошук...', width: 'flex' },
                        { type: 'text', id: 'countertop_thick', placeholder: '38', width: '60px' }
                    ]
                },
                {
                    type: 'row',
                    className: 'excel-row',
                    items: [
                        { type: 'label', label: 'Стінова панель', width: '300px' },
                        { type: 'catalog', id: 'wall_panel', catalogId: 'postforming', placeholder: 'Пошук...', width: 'flex' },
                        { type: 'text', id: 'wall_panel_thick', placeholder: '-', width: '60px' }
                    ]
                },
                {
                    type: 'row',
                    className: 'excel-row',
                    items: [
                        { type: 'label', label: 'Скло для полиць', width: '300px' },
                        { type: 'catalog', id: 'glass_shelf', catalogId: 'glass_mirror', placeholder: 'Пошук...', width: 'flex' },
                        { type: 'text', id: 'glass_shelf_thick', placeholder: '6', width: '60px' }
                    ]
                },
                {
                    type: 'row',
                    className: 'excel-row',
                    items: [
                        { type: 'label', label: 'Скло для вітрини', width: '300px' },
                        { type: 'catalog', id: 'glass_showcase', catalogId: 'glass_mirror', placeholder: 'Пошук...', width: 'flex' },
                        { type: 'text', id: 'glass_showcase_thick', placeholder: '4', width: '60px' }
                    ]
                }
            ]
        },
        {
            id: 'section-hardware',
            title: 'Фурнітура',
            items: [
                {
                    type: 'row',
                    className: 'excel-row',
                    items: [
                        { type: 'label', label: 'Цоколь', width: '200px' },
                        { type: 'catalog', id: 'plinth', catalogId: 'hinges', placeholder: 'Пошук...', width: 'flex' },
                        { type: 'text', id: 'plinth_h', placeholder: 'H=100', width: '70px' }
                    ]
                },
                {
                    type: 'row',
                    className: 'excel-row',
                    items: [
                        { type: 'label', label: 'Петлі', width: '200px' },
                        { type: 'catalog', id: 'hinges_main', catalogId: 'hinges', placeholder: 'Основні петлі...', width: 'flex' },
                        { type: 'checkbox', id: 'hinges_soft', label: 'Доводчик', width: '80px' }
                    ]
                },
                {
                    type: 'row',
                    className: 'excel-row',
                    items: [
                        { type: 'label', label: 'Система висування', width: '200px' },
                        { type: 'catalog', id: 'drawers_main', catalogId: 'hinges', placeholder: 'Tandembox/Legrabox...', width: 'flex' },
                        { type: 'checkbox', id: 'drawers_soft', label: 'Доводчик', width: '80px' }
                    ]
                },
                {
                    type: 'row',
                    className: 'excel-row',
                    items: [
                        { type: 'label', label: 'Підйомні механізми', width: '200px' },
                        { type: 'catalog', id: 'lifts_main', catalogId: 'hinges', placeholder: 'Aventos...', width: 'flex' }
                    ]
                },
                {
                    type: 'row',
                    className: 'excel-row',
                    items: [
                        { type: 'label', label: 'Карго / Наповнення', width: '200px' },
                        { type: 'catalog', id: 'cargo_main', catalogId: 'hinges', placeholder: 'Карго...', width: 'flex' }
                    ]
                },
                {
                    type: 'row',
                    className: 'excel-row',
                    items: [
                        { type: 'label', label: 'Ручки', width: '200px' },
                        { type: 'catalog', id: 'handles_main', catalogId: 'hinges', placeholder: 'Ручка...', width: 'flex' }
                    ]
                },
                {
                    type: 'row',
                    className: 'excel-row',
                    items: [
                        { type: 'label', label: 'Сушка', width: '200px' },
                        { type: 'catalog', id: 'dryer', catalogId: 'hinges', placeholder: 'Сушка...', width: 'flex' },
                        { type: 'text', id: 'dryer_w', placeholder: '600', width: '60px' }
                    ]
                },
                {
                    type: 'row',
                    className: 'excel-row',
                    items: [
                        { type: 'label', label: 'Підсвітка', width: '200px' },
                        { type: 'catalog', id: 'lighting', catalogId: 'lighting', placeholder: 'Профіль/Стрічка...', width: 'flex' }
                    ]
                }
            ]
        },
        {
            id: 'section-blum',
            title: 'Фурнітура Blum',
            items: [
                {
                    type: 'row',
                    className: 'excel-row',
                    items: [
                        { type: 'label', label: 'AVENTOS (підйомники)', width: '200px' },
                        { type: 'catalog', id: 'blum_aventos', catalogId: 'blum_aventos', placeholder: 'AVENTOS HF/HS/HL...', width: 'flex' }
                    ]
                },
                {
                    type: 'row',
                    className: 'excel-row',
                    items: [
                        { type: 'label', label: 'TANDEMBOX', width: '200px' },
                        { type: 'catalog', id: 'blum_tandembox', catalogId: 'blum_tandembox', placeholder: 'TANDEMBOX...', width: 'flex' }
                    ]
                },
                {
                    type: 'row',
                    className: 'excel-row',
                    items: [
                        { type: 'label', label: 'LEGRABOX', width: '200px' },
                        { type: 'catalog', id: 'blum_legrabox', catalogId: 'blum_legrabox', placeholder: 'LEGRABOX...', width: 'flex' }
                    ]
                },
                {
                    type: 'row',
                    className: 'excel-row',
                    items: [
                        { type: 'label', label: 'MOVENTO', width: '200px' },
                        { type: 'catalog', id: 'blum_movento', catalogId: 'blum_movento', placeholder: 'MOVENTO...', width: 'flex' }
                    ]
                },
                {
                    type: 'row',
                    className: 'excel-row',
                    items: [
                        { type: 'label', label: 'Петлі Blum', width: '200px' },
                        { type: 'catalog', id: 'blum_hinges', catalogId: 'blum_hinges', placeholder: 'CLIP top...', width: 'flex' }
                    ]
                },
                {
                    type: 'row',
                    className: 'excel-row',
                    items: [
                        { type: 'label', label: 'SERVO-DRIVE', width: '200px' },
                        { type: 'catalog', id: 'blum_servo', catalogId: 'blum_servo', placeholder: 'SERVO-DRIVE...', width: 'flex' }
                    ]
                },
                {
                    type: 'row',
                    className: 'excel-row',
                    items: [
                        { type: 'label', label: 'TIP-ON', width: '200px' },
                        { type: 'catalog', id: 'blum_tipon', catalogId: 'blum_tipon', placeholder: 'TIP-ON...', width: 'flex' }
                    ]
                },
                {
                    type: 'row',
                    className: 'excel-row',
                    items: [
                        { type: 'label', label: 'Інше Blum', width: '200px' },
                        { type: 'catalog', id: 'blum_other', catalogId: 'blum_other', placeholder: 'Пошук...', width: 'flex' }
                    ]
                }
            ]
        },
        {
            id: 'section-tech',
            title: 'Техніка',
            items: [
                {
                    type: 'row',
                    className: 'excel-row',
                    items: [
                        { type: 'label', label: 'Холодильник', width: '200px' },
                        { type: 'catalog', id: 'tech_fridge', catalogId: 'appliances', placeholder: 'Модель або посилання', width: 'flex' }
                    ]
                },
                {
                    type: 'row',
                    className: 'excel-row',
                    items: [
                        { type: 'label', label: 'Духова шафа', width: '200px' },
                        { type: 'catalog', id: 'tech_oven', catalogId: 'appliances', placeholder: 'Модель або посилання', width: 'flex' }
                    ]
                },
                {
                    type: 'row',
                    className: 'excel-row',
                    items: [
                        { type: 'label', label: 'Варильна панель', width: '200px' },
                        { type: 'catalog', id: 'tech_hob', catalogId: 'appliances', placeholder: 'Модель або посилання', width: 'flex' }
                    ]
                },
                {
                    type: 'row',
                    className: 'excel-row',
                    items: [
                        { type: 'label', label: 'Витяжка', width: '200px' },
                        { type: 'catalog', id: 'tech_hood', catalogId: 'appliances', placeholder: 'Модель або посилання', width: 'flex' }
                    ]
                },
                {
                    type: 'row',
                    className: 'excel-row',
                    items: [
                        { type: 'label', label: 'Посудомийка', width: '200px' },
                        { type: 'catalog', id: 'tech_dishwasher', catalogId: 'appliances', placeholder: 'Модель або посилання', width: 'flex' }
                    ]
                },
                {
                    type: 'row',
                    className: 'excel-row',
                    items: [
                        { type: 'label', label: 'Мийка', width: '200px' },
                        { type: 'catalog', id: 'tech_sink', catalogId: 'appliances', placeholder: 'Модель або посилання', width: 'flex' }
                    ]
                },
                {
                    type: 'row',
                    className: 'excel-row',
                    items: [
                        { type: 'label', label: 'Змішувач', width: '200px' },
                        { type: 'catalog', id: 'tech_mixer', catalogId: 'appliances', placeholder: 'Модель або посилання', width: 'flex' }
                    ]
                }
            ]
        }
    ]
};
