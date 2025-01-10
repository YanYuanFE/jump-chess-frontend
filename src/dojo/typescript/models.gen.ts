import type { SchemaType as ISchemaType } from '@dojoengine/sdk';

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

export interface SchemaType extends ISchemaType {
  dojo_starter: {
    Container: WithFieldOrder<Container>;
    ContainerValue: WithFieldOrder<ContainerValue>;
    Counter: WithFieldOrder<Counter>;
    CounterValue: WithFieldOrder<CounterValue>;
    Item: WithFieldOrder<Item>;
  };
}
export const schema: SchemaType = {
  dojo_starter: {
    Container: {
      fieldOrder: ['game_id', 'status', 'creator', 'last_move_player', 'winner', 'grids'],
      game_id: 0,
      status: 0,
      creator: '',
      last_move_player: '',
      winner: '',
      grids: [{ name: 0, occupied: false, player: '' }]
    },
    ContainerValue: {
      fieldOrder: ['status', 'creator', 'last_move_player', 'winner', 'grids'],
      status: 0,
      creator: '',
      last_move_player: '',
      winner: '',
      grids: [{ name: 0, occupied: false, player: '' }]
    },
    Counter: {
      fieldOrder: ['global_key', 'value'],
      global_key: 0,
      value: 0
    },
    CounterValue: {
      fieldOrder: ['value'],
      value: 0
    },
    Item: {
      fieldOrder: ['name', 'occupied', 'player'],
      name: 0,
      occupied: false,
      player: ''
    }
  }
};
export enum ModelsMapping {
  Container = 'dojo_starter-Container',
  ContainerValue = 'dojo_starter-ContainerValue',
  Counter = 'dojo_starter-Counter',
  CounterValue = 'dojo_starter-CounterValue',
  Item = 'dojo_starter-Item'
}
