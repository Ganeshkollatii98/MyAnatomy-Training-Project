var path = require('path');
// C:\Users\Ganesh_Kollati\Desktop\Epam Training
console.log('Joining Path '+path.join('C:\Users,Ganesh_Kollati,Desktop,Epam Training,Node'))

strFileName = 'C:\\Users\\Ganesh_Kollati\\Desktop\\Epam Training\\Node\\pathJs.js'
console.log();
console.log('file Ext:- '+path.extname(strFileName));

console.log('Directory :- '+path.dirname(strFileName));