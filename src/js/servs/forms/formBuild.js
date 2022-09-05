const formBuild = (rowsTarget) => {

    let addedRows = [];

    const div = addEl(rowsTarget, 'div', 'b-test-row m-test-header', '');
    addEl(div, 'div', 'b-test-cell m-question', Poll.info);
    Object.keys(Poll.signature).forEach((k) => addEl(div, 'div', 'b-test-cell m-answer', Poll.signature[k]));

    Poll.questions.forEach((questionTxt) => {
        const divQ = addEl(rowsTarget, 'div', 'b-test-row m-test-values', '');
        addEl(divQ, 'div', 'b-test-cell m-question', questionTxt);
        Object.keys(Poll.signature).forEach((k) => {
            const d = addEl(divQ, 'div', 'b-test-cell m-answer', '');
            const s = addEl(d, 'span', 'e-checkbox js-checkbox', ' ');
            backupState(s);
            s.vals = { on: false };
            s.onclick = function (e) {
                if (this.vals.on) { rollbackEl(this); } else { changeClass(this, ['m-on']); }
                this.vals.on = !this.vals.on;
            }
        });
        backupState(divQ);
        addedRows.push(divQ);
    });
    backupState(div);

    return addedRows;
    
}
