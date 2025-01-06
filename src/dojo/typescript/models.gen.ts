import type { SchemaType } from "@dojoengine/sdk";

// Type definition for `dojo_starter::models::Item` struct
export interface Item {
	fieldOrder: string[];
	name: number;
	occupied: boolean;
	player: string;
}

// Type definition for `dojo_starter::models::Container` struct
export interface Container {
	fieldOrder: string[];
	game_id: number;
	status: number;
	creator: string;
	last_move_player: string;
	grids: Array<Item>;
}

// Type definition for `dojo_starter::models::ContainerValue` struct
export interface ContainerValue {
	fieldOrder: string[];
	status: number;
	creator: string;
	last_move_player: string;
	grids: Array<Item>;
}

// Type definition for `dojo_starter::models::Counter` struct
export interface Counter {
	fieldOrder: string[];
	global_key: number;
	value: number;
}

// Type definition for `dojo_starter::models::CounterValue` struct
export interface CounterValue {
	fieldOrder: string[];
	value: number;
}

// Type definition for `dojo_starter::models::Players` struct
export interface Players {
	fieldOrder: string[];
	player: string;
	game_id: number;
	position_one: Position;
	position_two: Position;
	can_move: boolean;
	color: number;
	is_winner: boolean;
}

// Type definition for `dojo_starter::models::PlayersValue` struct
export interface PlayersValue {
	fieldOrder: string[];
	position_one: Position;
	position_two: Position;
	can_move: boolean;
	color: number;
	is_winner: boolean;
}

// Type definition for `dojo_starter::models::Position` struct
export interface Position {
	fieldOrder: string[];
	player: string;
	name: number;
}

export interface DojoStarterSchemaType extends SchemaType {
	dojo_starter: {
		Item: Item,
		Container: Container,
		ContainerValue: ContainerValue,
		Counter: Counter,
		CounterValue: CounterValue,
		Players: Players,
		PlayersValue: PlayersValue,
		Position: Position,
		ERC__Balance: ERC__Balance,
		ERC__Token: ERC__Token,
		ERC__Transfer: ERC__Transfer,
	},
}
export const schema: DojoStarterSchemaType = {
	dojo_starter: {
		Item: {
			fieldOrder: ['name', 'occupied', 'player'],
			name: 0,
			occupied: false,
			player: "",
		},
		Container: {
			fieldOrder: ['game_id', 'status', 'creator', 'last_move_player', 'grids'],
			game_id: 0,
			status: 0,
			creator: "",
			last_move_player: "",
			grids: [{ fieldOrder: ['name', 'occupied', 'player'], name: 0, occupied: false, player: "", }],
		},
		ContainerValue: {
			fieldOrder: ['status', 'creator', 'last_move_player', 'grids'],
			status: 0,
			creator: "",
			last_move_player: "",
			grids: [{ fieldOrder: ['name', 'occupied', 'player'], name: 0, occupied: false, player: "", }],
		},
		Counter: {
			fieldOrder: ['global_key', 'value'],
			global_key: 0,
			value: 0,
		},
		CounterValue: {
			fieldOrder: ['value'],
			value: 0,
		},
		Players: {
			fieldOrder: ['player', 'game_id', 'position_one', 'position_two', 'can_move', 'color', 'is_winner'],
			player: "",
			game_id: 0,
			position_one: { fieldOrder: ['player', 'name'], player: "", name: 0, },
			position_two: { fieldOrder: ['player', 'name'], player: "", name: 0, },
			can_move: false,
			color: 0,
			is_winner: false,
		},
		PlayersValue: {
			fieldOrder: ['position_one', 'position_two', 'can_move', 'color', 'is_winner'],
			position_one: { fieldOrder: ['player', 'name'], player: "", name: 0, },
			position_two: { fieldOrder: ['player', 'name'], player: "", name: 0, },
			can_move: false,
			color: 0,
			is_winner: false,
		},
		Position: {
			fieldOrder: ['player', 'name'],
			player: "",
			name: 0,
		},
		ERC__Balance: {
			fieldOrder: ['balance', 'type', 'tokenmetadata'],
			balance: '',
			type: 'ERC20',
			tokenMetadata: {
				fieldOrder: ['name', 'symbol', 'tokenId', 'decimals', 'contractAddress'],
				name: '',
				symbol: '',
				tokenId: '',
				decimals: '',
				contractAddress: '',
			},
		},
		ERC__Token: {
			fieldOrder: ['name', 'symbol', 'tokenId', 'decimals', 'contractAddress'],
			name: '',
			symbol: '',
			tokenId: '',
			decimals: '',
			contractAddress: '',
		},
		ERC__Transfer: {
			fieldOrder: ['from', 'to', 'amount', 'type', 'executed', 'tokenMetadata'],
			from: '',
			to: '',
			amount: '',
			type: 'ERC20',
			executedAt: '',
			tokenMetadata: {
				fieldOrder: ['name', 'symbol', 'tokenId', 'decimals', 'contractAddress'],
				name: '',
				symbol: '',
				tokenId: '',
				decimals: '',
				contractAddress: '',
			},
			transactionHash: '',
		},

	},
};
// Type definition for ERC__Balance struct
export type ERC__Type = 'ERC20' | 'ERC721';
export interface ERC__Balance {
    fieldOrder: string[];
    balance: string;
    type: string;
    tokenMetadata: ERC__Token;
}
export interface ERC__Token {
    fieldOrder: string[];
    name: string;
    symbol: string;
    tokenId: string;
    decimals: string;
    contractAddress: string;
}
export interface ERC__Transfer {
    fieldOrder: string[];
    from: string;
    to: string;
    amount: string;
    type: string;
    executedAt: string;
    tokenMetadata: ERC__Token;
    transactionHash: string;
}