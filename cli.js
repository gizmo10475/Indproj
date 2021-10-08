"use strict";

const readline = require("readline");
const func = require("./src/funcs.js");
const bcrypt = require("bcrypt");


function exitProgram(code) {
    code = code || 0;

    console.info("\nExiting with exit status: " + code);
    process.exit(code);
}

function showMenu() {
    console.log(`
        ---------------------------------------
            Choose something from the menu:
        ---------------------------------------
        menu - Displays this menu.
        `);
}

(async function() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.setPrompt("Enter something: ");
    rl.prompt();
    showMenu();

    rl.on("close", exitProgram);
    rl.on("line", async (input) => {
        input = input.trim();
        let lineArray = input.split(" ");

        switch (lineArray[0]) {
            case "e":
            case "exit":
            case "q":
            case "quit":
                exitProgram();
                break;
            case "add":

                const hashedPassword = await bcrypt.hash(lineArray[3], 10);

                func.newUser(lineArray[1], lineArray[2], hashedPassword);
                break;
            default:
                showMenu();
                break;
        }

        rl.prompt();
    });
})();
