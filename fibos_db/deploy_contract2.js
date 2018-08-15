var FIBOS = require('fibos.js');

var fibos = FIBOS({
	chainId: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f',
	keyProvider: '5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3',
	httpEndpoint: 'http://127.0.0.1:8888',
	logger: {
		log: null,
		error: null
	}
});

//合约所属账户 hellocode2 的公私钥对
let pubkey = "EOS8h9mRbfNXix1PaC9bpUB4tr5SjVRrrkTVzMh78tfQSQRBXPPH8";
let prikey = '5JE7knh6S5EWdzMjv6cadpaf8HLGoX95tALdG2KmzGVsSsaxMB7';

//创建合约账户
var name = 'hellocode2';
fibos.newaccountSync({
	creator: 'eosio',
	name: name,
	owner: pubkey,
	active: pubkey
});

//发布一个合约
var abi = {
	"version": "eosio::abi/1.0",
	"types": [{
		"new_type_name": "my_account_name",
		"type": "name"
	}],
	"structs": [{
		"name": "player",
		"base": "",
		"fields": [{
			"name": "nickname",
			"type": "my_account_name"
		}, {
			"name": "age",
			"type": "int32"
		}]
	}, {
		"name": "hi",
		"base": "",
		"fields": [{
			"name": "nickname",
			"type": "my_account_name"
		}]
	}],
	"actions": [{
		"name": "hi",
		"type": "hi",
		"ricardian_contract": ""
	}],
	"tables": [{
		"name": "players",
		"type": "player",
		"index_type": "i64",
		"key_names": ["id"],
		"key_types": ["int64"]
	}]
};

//由 hellocode 提供私钥发布合约
fibos = FIBOS({
	chainId: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f',
	keyProvider: prikey,
	httpEndpoint: 'http://127.0.0.1:8888',
	logger: {
		log: null,
		error: null
	}
});

fibos.setabiSync(name, abi);

var js_code = `exports.hi = nickname => console.error(db);`;
fibos.setcodeSync(name, 0, 0, fibos.compileCode(js_code));