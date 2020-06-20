const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const render = require('./render');

const forbiddendirs = ['node_modules'];

class Runner {
    constructor() {
        this.testFiles = [];
    }

    async runTests() {
        for (let file of this.testFiles) {
            console.log(chalk.grey(`---- ${file.shortName}`))
            const beforeEaches = [];
            global.render = render;
            global.beforeEach = (fn) => {
                beforeEaches.push(fn);
            }
            global.it = async (desc, fn) => {
                beforeEaches.map(func => func());
                try {
                    await fn();
                    console.log(chalk.green(`\tOK - ${desc}`));
                } catch (err) {
                    const message = err.message.replace(/\n/g, '\n\t\t');
                    console.log(chalk.red(`\tX - ${desc}`));
                    console.log(chalk.red('\t', message));
                }
            }
            try {
                require(file.name);
            } catch (err) {
                console.log(chalk.red(err));
            }
        }
    }

    async collectFiles(targetpath) {
        const files = await fs.promises.readdir(targetpath);
        for (let file of files) {
            const filepath = path.join(targetpath, file);
            const stats = await fs.promises.lstat(filepath);
            if (stats.isFile() && file.includes('.test.js')) {
                this.testFiles.push({name : filepath, shortName : file});
            } else if (stats.isDirectory() && !forbiddendirs.includes(file)) {
                const childFiles = await fs.promises.readdir(filepath);
                files.push(...childFiles.map(f => path.join(file, f)));
            }
        }
        return this.testFiles;
    }
}

module.exports = Runner;