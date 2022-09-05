const getEl = (_class) => document.getElementsByClassName(_class)[0]; 

const addEl =  (target, elNode, elClass, elVal) => {
    const el = document.createElement(elNode);
    el.className = elClass;
    el.innerText = elVal;
    target.appendChild(el);
    return el;
}

const backupState = (el) => {
    el.backState = {
        className: el.getAttribute('class')
    };
}

const rollbackEl = (el) => {
    Object.keys(el.backState).forEach((k) => (el[k] = el.backState[k]));
}

const changeClass = (el, _classExts) => {
    ((cns) => {
        el.className = [...cns, ..._classExts].join(' ');
    })(el.getAttribute('class').split(' '));
}

const setListeners = (el, _event, _callback) => {
    el.addEventListener(_event, () => _callback(el));
}
