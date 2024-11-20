const { CI } = process.env;

module.exports = {
    forbidOnly: !!CI,               // fail the pipeline whenever .only is committed to the tests
    require: [
        'ts-node/register',         // required for running tests with TypeScript
        'tests/utils/chaiPlugins.ts',      // import chai plugins
    ],
    recursive: true,
    exit: true,
    timeout: 2000
};
