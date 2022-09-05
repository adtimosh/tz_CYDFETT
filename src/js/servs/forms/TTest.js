class TTest {
    constructor(buildTarget, commitButton, errMessage, errScrollLink) {
        this.buildTarget = buildTarget;
        this.rows = formBuild(buildTarget);
        this.cButton = commitButton;
        this.errMessage = errMessage;
        this.errScrollLink = errScrollLink;
        this.prepare();
    }

    prepare() {
        setListeners(this.cButton, 'click', () => {
            this.rowsRedesigner(formCheck(this.rows));
            if (!this.buildTarget.hasOwnProperty('checkOnClick')) {
                setListeners(this.buildTarget, 'click', () => this.rowsRedesigner(formCheck(this.rows)));
                this.buildTarget.checkOnClick = true;
            }
        });
    }

    rowsRedesigner(checkResults) {
        checkResults.err.forEach((row) => {
            changeClass(row, ['m-err']);
            this.errMessage.style.display = 'block';
            // 
        });
        if (checkResults.err.length > 0) {
            this.errScrollLink.onclick = () => checkResults.err[0].scrollIntoView({ 
                behavior: "smooth", 
                block: "center", 
                inline: "nearest" 
            });
        }
        checkResults.ok.forEach((row) => rollbackEl(row));
    }
}
