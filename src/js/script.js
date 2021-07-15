"use strict"

const statusValue = document.querySelector('.status-select__value');
const statusCheckItems = document.querySelectorAll('.status-list__item .check-group__input');

const checkAll = document.querySelector('.check-group__input#all');
const flatCheckItems = document.querySelectorAll('.flat-card__check-group .check-group__input');

statusCheckItems.forEach(function(item) {
    item.addEventListener('change', function() {
        const checkedStatuses = document.querySelectorAll('.status-list__item .check-group__input:checked');

        let resultString = 'Все статусы';
        if (checkedStatuses) {
            let resultArray = [];
            checkedStatuses.forEach(function(checkedItem) {
                resultArray.push(checkedItem.nextElementSibling.innerHTML);
            });
            resultString = resultArray.join(', ');
        }

        statusValue.innerHTML = resultString;
    });
});

checkAll.addEventListener('change', function(evt) {
    if (evt.target.checked) {
        flatCheckItems.forEach(function(item) {
            item.checked = true;
        });
    } else {
        flatCheckItems.forEach(function(item) {
            item.checked = false;
        });
    }
});