const React = require('react');

const { Component } = React;

const Browser = require('./browser.js');
const Editor = require('./editor.js');

const lintWorker = new Worker('build/lint_worker.js');
const transformWorker = new Worker('build/transform_worker.js');

// TODO: add multiple tabs to the editor
//editor.on('change', function(e) {
//
//    const code = editor.getValue();
//
//    // TODO: debounce changes
//    lintWorker.postMessage({
//        code: code
//    });
//
//    transformWorker.postMessage({
//        code: code
//    });
//});

lintWorker.addEventListener('message', function(message) {
    console.log(message.data.messages);
});

transformWorker.addEventListener('message', function(message) {
    //console.log(message.data.code);
});


class App extends Component {
    constructor() {
        super();
    }

    handleChange = code => {
        console.log(code);
    };

    render() {
        const style = {
            backgroundColor: '#DDD',
            display: 'flex',
            flexDirection: 'row',
            height: '100%',
            boxSizing: 'border-box',
            padding: 5
        };

        return <div style={style}>
            <Browser/>
            <Editor
                width={800}
                height={600}
                fontSize={14}
                onChange={this.handleChange}
            />
        </div>;
    }
}

module.exports = App;
