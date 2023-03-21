import { Queue } from './queue.mjs';

let queue = new Queue();
queue.push({'id' : 4, 'name' : '4'});
queue.push({'id' : 6, 'name' : '6'});
queue.push({'id' : 10, 'name' : '10'});
queue.push({'id' : 5, 'name' : '5'});
queue.push({'id' : 2, 'name' : '2'});
queue.qsort();
// queue.sort1();