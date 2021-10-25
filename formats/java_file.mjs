/**
 * @file Minecraft Utils Shared - Java file
 * @license Apache-2.0
 * @author Markus@Bordihn.de (Markus Bordihn)
 */

 import chalk from 'chalk';
 import fs from 'fs';
 
 const read = (file) => {
   if (!fs.existsSync(file)) {
     console.error(chalk.red('Unable to find Java file', file));
     return;
   }
   const fileContent = fs.readFileSync(file);
   try {
     return fileContent;
   } catch (error) {
     console.error(chalk.red('Unable to parse Java file', file, ':', error));
   }
 };
 
 export default {
   read,
 };
 