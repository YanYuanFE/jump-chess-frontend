export const GameABI = [
  {
    name: 'actions__ContractImpl',
    type: 'impl',
    interface_name: 'dojo::contract::interface::IContract'
  },
  {
    name: 'dojo::contract::interface::IContract',
    type: 'interface',
    items: []
  },
  {
    name: 'actions__DeployedContractImpl',
    type: 'impl',
    interface_name: 'dojo::meta::interface::IDeployedResource'
  },
  {
    name: 'core::byte_array::ByteArray',
    type: 'struct',
    members: [
      {
        name: 'data',
        type: 'core::array::Array::<core::bytes_31::bytes31>'
      },
      {
        name: 'pending_word',
        type: 'core::felt252'
      },
      {
        name: 'pending_word_len',
        type: 'core::integer::u32'
      }
    ]
  },
  {
    name: 'dojo::meta::interface::IDeployedResource',
    type: 'interface',
    items: [
      {
        name: 'dojo_name',
        type: 'function',
        inputs: [],
        outputs: [
          {
            type: 'core::byte_array::ByteArray'
          }
        ],
        state_mutability: 'view'
      }
    ]
  },
  {
    name: 'ActionsImpl',
    type: 'impl',
    interface_name: 'dojo_starter::systems::actions::IActions'
  },
  {
    name: 'core::bool',
    type: 'enum',
    variants: [
      {
        name: 'False',
        type: '()'
      },
      {
        name: 'True',
        type: '()'
      }
    ]
  },
  {
    name: 'dojo_starter::systems::actions::IActions',
    type: 'interface',
    items: [
      {
        name: 'create_game',
        type: 'function',
        inputs: [],
        outputs: [
          {
            type: 'core::integer::u64'
          }
        ],
        state_mutability: 'external'
      },
      {
        name: 'joining_game',
        type: 'function',
        inputs: [
          {
            name: 'game_id',
            type: 'core::integer::u64'
          }
        ],
        outputs: [],
        state_mutability: 'external'
      },
      {
        name: 'move',
        type: 'function',
        inputs: [
          {
            name: 'from',
            type: 'core::integer::u8'
          },
          {
            name: 'to',
            type: 'core::integer::u8'
          },
          {
            name: 'game_id',
            type: 'core::integer::u64'
          }
        ],
        outputs: [
          {
            type: 'core::bool'
          }
        ],
        state_mutability: 'external'
      }
    ]
  },
  {
    name: 'dojo_init',
    type: 'function',
    inputs: [],
    outputs: [],
    state_mutability: 'view'
  },
  {
    name: 'WorldProviderImpl',
    type: 'impl',
    interface_name: 'dojo::contract::components::world_provider::IWorldProvider'
  },
  {
    name: 'dojo::world::iworld::IWorldDispatcher',
    type: 'struct',
    members: [
      {
        name: 'contract_address',
        type: 'core::starknet::contract_address::ContractAddress'
      }
    ]
  },
  {
    name: 'dojo::contract::components::world_provider::IWorldProvider',
    type: 'interface',
    items: [
      {
        name: 'world_dispatcher',
        type: 'function',
        inputs: [],
        outputs: [
          {
            type: 'dojo::world::iworld::IWorldDispatcher'
          }
        ],
        state_mutability: 'view'
      }
    ]
  },
  {
    name: 'UpgradeableImpl',
    type: 'impl',
    interface_name: 'dojo::contract::components::upgradeable::IUpgradeable'
  },
  {
    name: 'dojo::contract::components::upgradeable::IUpgradeable',
    type: 'interface',
    items: [
      {
        name: 'upgrade',
        type: 'function',
        inputs: [
          {
            name: 'new_class_hash',
            type: 'core::starknet::class_hash::ClassHash'
          }
        ],
        outputs: [],
        state_mutability: 'external'
      }
    ]
  },
  {
    name: 'constructor',
    type: 'constructor',
    inputs: []
  },
  {
    kind: 'struct',
    name: 'dojo::contract::components::upgradeable::upgradeable_cpt::Upgraded',
    type: 'event',
    members: [
      {
        kind: 'data',
        name: 'class_hash',
        type: 'core::starknet::class_hash::ClassHash'
      }
    ]
  },
  {
    kind: 'enum',
    name: 'dojo::contract::components::upgradeable::upgradeable_cpt::Event',
    type: 'event',
    variants: [
      {
        kind: 'nested',
        name: 'Upgraded',
        type: 'dojo::contract::components::upgradeable::upgradeable_cpt::Upgraded'
      }
    ]
  },
  {
    kind: 'enum',
    name: 'dojo::contract::components::world_provider::world_provider_cpt::Event',
    type: 'event',
    variants: []
  },
  {
    kind: 'enum',
    name: 'dojo_starter::systems::actions::actions::Event',
    type: 'event',
    variants: [
      {
        kind: 'nested',
        name: 'UpgradeableEvent',
        type: 'dojo::contract::components::upgradeable::upgradeable_cpt::Event'
      },
      {
        kind: 'nested',
        name: 'WorldProviderEvent',
        type: 'dojo::contract::components::world_provider::world_provider_cpt::Event'
      }
    ]
  }
] as const;
