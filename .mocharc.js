const { CI } = process.env;

module.exports = {
    forbidOnly: !!CI,               // fail the pipeline whenever .only is committed to the tests
    require: [
        'ts-node/register',         // required for running tests with TypeScript
    ],
    extension: ['ts'],
    recursive: true,
    exit: true,
    timeout: 2000
};
