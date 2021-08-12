const shell = require('shelljs');

/**
 * INICIA A CÓPIA
 */
 setTimeout(async () => {
    const destDir = `${process.cwd()}/dist`;
    await new Promise((resolve, reject) => {
        const paths = [`${destDir}/**/*.js`, `${destDir}/*.js`];

        function replaceContent(file) {
            shell.sed(
                "-i",
                '"app/',
                "process.cwd()" + "+" + '"/dist/',
                file
            );
            shell.sed(
                "-i",
                "'app/",
                "process.cwd()" + "+" + "'/dist/",
                file
            );
        }

        paths.forEach((item) => {
            shell.ls(item).forEach((file) => replaceContent(file));
        });
        resolve();
    });
}, 1000);