@import './data/poll.js'
@import './servs/htmler.js'
@import './servs/forms/formBuild.js'
@import './servs/forms/formCheck.js'
@import './servs/forms/TTest.js'

const ttest = new TTest(
    getEl('js-test'), 
    getEl('js-submit'), 
    getEl('js-error-message'),
    getEl('js-fix-question-link')
    );

