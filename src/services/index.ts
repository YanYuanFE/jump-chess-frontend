import { apiClient } from './api-client';

export const addAgentToRoom = (id: string) => {
  return apiClient.post(`/joining_game`, {
    game_id: id
  });
};

// {
//   "a1": "4",
//   "a2": "3",
//   "b1": "0",
//   "b2": "2",
//   "move_a_from": "4",
//   "move_a_to": "1",
//   "empty_positon": "1",
//   "game_id":"27"
// }
export const agentMove = (data: {
  a1: string;
  a2: string;
  b1: string;
  b2: string;
  move_a_from: string;
  move_a_to: string;
  empty_positon: string;
  game_id: string;
}) => {
  console.log(data, 'agent');
  return apiClient.post(`/move`, data);
};
