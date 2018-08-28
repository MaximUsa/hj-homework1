'use strict';

function createElement(node) {
    if (typeof node === 'string') {
        return document.createTextNode(node);
    }

    const el = document.createElement(node.name);

    if (node.props !== null) {
        Object.keys(node.props).forEach(i => el.setAttribute(i, node.props[i]));
    }
    node.childs.forEach(function(item) {
        if (typeof item === 'string') {
            el.textContent += item;
        } else {
            el.appendChild(createElement(item))
        }
    })
    return el;
}