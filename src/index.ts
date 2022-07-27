/*****************************
 *
 *        Ugly code
 *        Dont look!
 *
 ****************************/

import Creator from "./Creator";

new Creator();

process.on('exit', function (code) {
  return console.log(`Process to exit with code ${code}\nCompleted!!!`);
});



