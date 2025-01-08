import type { SchemaType as ISchemaType } from "@dojoengine/sdk";

import { BigNumberish } from 'starknet';

type WithFieldOrder<T> = T & { fieldOrder: string[] };

// Type definition for `dojo_starter::models::Container` struct
export interface Container {
	game_id: BigNumberish;
	status: BigNumberish;
	creator: string;
	last_move_player: string;
	winner: string;
	grids: Array<Item>;
}

// Type definition for `dojo_starter::models::ContainerValue` struct
export interface ContainerValue {
	status: BigNumberish;
	creator: string;
	last_move_player: string;
	winner: string;
	grids: Array<Item>;
}

// Type definition for `dojo_starter::models::Counter` struct
export interface Counter {
	global_key: BigNumberish;
	value: BigNumberish;
}

// Type definition for `dojo_starter::models::CounterValue` struct
export interface CounterValue {
	value: BigNumberish;
}

// Type definition for `dojo_starter::models::Item` struct
export interface Item {
	name: BigNumberish;
	occupied: boolean;
	player: string;
}

// Type definition for `dojo_starter::models::Players` struct
export interface Players {
	player: string;
	game_id: BigNumberish;
	position_one: Position;
	position_two: Position;
	can_move: boolean;
	color: BigNumberish;
	is_winner: boolean;
}

// Type definition for `dojo_starter::models::PlayersValue` struct
export interface PlayersValue {
	position_one: Position;
	position_two: Position;
	can_move: boolean;
	color: BigNumberish;
	is_winner: boolean;
}

// Type definition for `dojo_starter::models::Position` struct
export interface Position {
	player: string;
	name: BigNumberish;
}

export interface SchemaType extends ISchemaType {
	dojo_starter: {
		Container: WithFieldOrder<Container>,
		ContainerValue: WithFieldOrder<ContainerValue>,
		Counter: WithFieldOrder<Counter>,
		CounterValue: WithFieldOrder<CounterValue>,
		Item: WithFieldOrder<Item>,
		Players: WithFieldOrder<Players>,
		PlayersValue: WithFieldOrder<PlayersValue>,
		Position: WithFieldOrder<Position>,
	},
}
export const schema: SchemaType = {
	dojo_starter: {
		Container: {
			fieldOrder: ['game_id', 'status', 'creator', 'last_move_player', 'winner', 'grids'],
			game_id: 0,
			status: 0,
			creator: "",
			last_move_player: "",
			winner: "",
			grids: [{ fieldOrder: ['name', 'occupied', 'player'], name: 0, occupied: false, player: "", }],
		},
		ContainerValue: {
			fieldOrder: ['status', 'creator', 'last_move_player', 'winner', 'grids'],
			status: 0,
			creator: "",
			last_move_player: "",
			winner: "",
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
		Item: {
			fieldOrder: ['name', 'occupied', 'player'],
			name: 0,
			occupied: false,
			player: "",
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
	},
};
export enum ModelsMapping {
	Container = 'dojo_starter-Container',
	ContainerValue = 'dojo_starter-ContainerValue',
	Counter = 'dojo_starter-Counter',
	CounterValue = 'dojo_starter-CounterValue',
	Item = 'dojo_starter-Item',
	Players = 'dojo_starter-Players',
	PlayersValue = 'dojo_starter-PlayersValue',
	Position = 'dojo_starter-Position',
}