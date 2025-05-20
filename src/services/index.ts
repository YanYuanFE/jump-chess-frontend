import { apiClient } from './api-client';

export const addAgentToRoom = (id: string) => {
  return apiClient.post(`/joining_game`, {
    game_id: id
  });
};
