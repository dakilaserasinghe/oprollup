const { exec } = require('child_process');

// test script to flood transactions to the sequencer.
// This uses to experiment on the transaction batch compression and fee savings.

const opr_command = 'opr l2transfer 1 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 0.0001 ';
const runs = 10;
async function runCommands() {
  for (let i = 1; i <= runs; i++) {
    const command = opr_command + String(i);
    await new Promise((resolve, reject) => {
      exec(command, (err, stdout, stderr) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          console.log(stdout);
          resolve();
        }
      });
    });
  }
}


runCommands().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });