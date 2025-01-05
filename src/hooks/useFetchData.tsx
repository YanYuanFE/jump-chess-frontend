import { globalConfig } from '@/constants';
import { dojoConfig } from '@/constants/dojoConfig';
import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';

export const useFetchData = <TData, TVariables>(query: string): ((variables?: TVariables) => Promise<TData>) => {
  const toriiUrl = globalConfig.toriiUrl;

  return useCallback(
    async (variables?: TVariables) => {
      // console.log("fetcher", toriiUrl);

      const res = await fetch(`${toriiUrl}/graphql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query,
          variables
        })
      });

      const json = await res.json();

      if (json.errors) {
        throw new Error(JSON.stringify(json.errors));
      }

      return json.data;
    },
    [toriiUrl, query]
  );
};

const ContainerQuery = `query DojostarterContainerModels {
  dojoStarterContainerModels {
    totalCount
    edges {
      node {
        game_id
        status
        creator
        last_move_player,
        
      }
    }
  }
}`;

export const useFetchContainers = (variables?: any) => {
  return useQuery({
    queryKey: ['containers'],
    queryFn: useFetchData(ContainerQuery).bind(null, variables)
  }) as any;
};

const GameStatusQuery = `query DojostarterGameStatusEventEvents {
  dojoStarterGameStatusEventModels {
    totalCount
    edges {
      node {
        game_id,
        status
      }
    }
  }
}`;

export const useFetchGameStatus = (variables?: any) => {
  return useQuery({
    queryKey: ['gameStatus'],
    queryFn: useFetchData(GameStatusQuery).bind(null, variables)
  }) as any;
};
