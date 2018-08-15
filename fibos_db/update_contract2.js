var FIBOS = require('fibos.js');
//合约所属账户 hellocode2 的公私钥对
let pubkey = "EOS8h9mRbfNXix1PaC9bpUB4tr5SjVRrrkTVzMh78tfQSQRBXPPH8";
let prikey = '5JE7knh6S5EWdzMjv6cadpaf8HLGoX95tALdG2KmzGVsSsaxMB7';

//创建合约账户
var name = 'hellocode2';
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
		"name": "param",
		"base": "",
		"fields": [{
			"name": "nickname",
			"type": "my_account_name"
		}]
	}],
	"actions": [{
		"name": "emplace",
		"type": "param",
		"ricardian_contract": ""
	}, {
		"name": "get",
		"type": "param",
		"ricardian_contract": ""
	}, {
		"name": "modify",
		"type": "param",
		"ricardian_contract": ""
	}, {
		"name": "erase",
		"type": "param",
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

var js_code = `
exports.emplace = param => {
	var players = db.players(action.account, action.account);

	players.emplace(action.account, {
		nickename: "fibos",
		age: 18,
		id: 1
	});

	console.log(players.get(1));
}

exports.get = param => {
	var players = db.players(action.account, action.account);
	console.log(players.get(1));
}


exports.modify = param => {
	var players = db.players(action.account, action.account);
	players.modify(1, action.account, {
		nickename: "fibos2",
		age: 19,
		id: 1
	});

	console.log(players.get(1));
}

exports.erase = param => {
	var players = db.players(action.account, action.account);
	players.erase(1);

	console.log(players.get(1));
}
`;

var js_code = `
exports.emplace = () => {
	var players = db.players(action.account, action.account);
	players.emplace(action.account, {
		nickename: "fibos",
		age: 18,
		id: 1
	})
}
`;

fibos.setcodeSync(name, 0, 0, fibos.compileCode(js_code));