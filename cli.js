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
        |      add <email> <name> <pw>        |
        ---------------------------------------
        `);
}

(async function () {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    showMenu();
    rl.setPrompt("Enter something: ");
    rl.prompt();

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
                try {
                      var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                        if (lineArray[1].match(mailformat)) {
                            const hashedPassword = await bcrypt.hash(lineArray[3], 10);
                            func.newUser(lineArray[1], lineArray[2], hashedPassword);
                            console.log("Success");
                        } else {
                            console.log("something went wrong, try again.");
                        }
                } catch (error) {
                    console.log("something went wrong, try again.");
                }
                break;
            default:
                break;
        }

        rl.prompt();
    });
})();
