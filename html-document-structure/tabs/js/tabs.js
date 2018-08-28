'use strict';

const tabs = document.querySelector('.tabs-nav');
const contents = document.querySelector('.tabs-content').children;
const tabChild = tabs.children;
const tabFirst = tabs.firstElementChild;

Array.from(contents).forEach((article, index) => {
    const tabClone = tabFirst.cloneNode(true);
    const tab = tabs.appendChild(tabClone);
    tab.firstElementChild.textContent = article.dataset.tabTitle;
    tab.firstElementChild.classList.add(article.dataset.tabIcon);
    if (index > 0) {
        article.classList.add('hidden');
    }
});

tabs.removeChild(tabFirst);
tabs.firstElementChild.classList.add('ui-tabs-active');

Array.from(tabChild).forEach(tab => tab.addEventListener('click', tabActiv));

function tabActiv(event) {
    const currentTab = document.querySelector('.ui-tabs-active');
    currentTab.classList.remove('ui-tabs-active');
    event.currentTarget.classList.add('ui-tabs-active');

    Array.from(contents).forEach(article => {
        article.classList.add('hidden');
        if (event.currentTarget.children[0].textContent === article.dataset.tabTitle) {
            article.classList.remove('hidden');
        }
    });
}