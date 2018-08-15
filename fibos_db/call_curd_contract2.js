var FIBOS = require('fibos.js');

//合约所属账户 hellocode2 的公私钥对
let pubkey = "EOS8h9mRbfNXix1PaC9bpUB4tr5SjVRrrkTVzMh78tfQSQRBXPPH8";
let prikey = '5JE7knh6S5EWdzMjv6cadpaf8HLGoX95tALdG2KmzGVsSsaxMB7';
var name = 'hellocode2';

//由 hellocode2 提供私钥发布合约
fibos = FIBOS({
	chainId: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f',
	keyProvider: prikey,
	httpEndpoint: 'http://127.0.0.1:8888',
	logger: {
		log: null,
		error: null
	}
});

var ctx = fibos.contractSync(name);

//emplace
var r = ctx.emplaceSync(name, {
	authorization: name
});

console.error(r.processed.action_traces[0].console);

// //get
// var r = ctx.getSync(name, {
// 	authorization: name
// });

// console.error(r.processed.action_traces[0].console);

// //modify
// var r = ctx.modifySync(name, {
// 	authorization: name
// });

// console.error(r.processed.action_traces[0].console);

// //erase
// var r = ctx.eraseSync(name, {
// 	authorization: name
// });

// console.error(r.processed.action_traces[0].console);