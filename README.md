# Jump Well Chess - StarkNet Onchain Game

Jump Well Chess is a decentralized online checkers-like game built on the StarkNet blockchain. Players can connect their StarkNet wallets to create game rooms, join existing rooms to play against other players, or choose to play against an AI opponent. The game state and logic are managed and verified on StarkNet using the Dojo Engine, ensuring fairness and transparency.

This project is the frontend application for the Jump Well Chess game, built with React, TypeScript, and Vite.

## Features

*   **Decentralized Gameplay**: Game logic and state are on the StarkNet blockchain.
*   **Dojo Engine**: Utilizes the Dojo Engine for verifiable games and autonomous worlds.
*   **Wallet Integration**: Players connect using their StarkNet wallets (e.g., Argent X, Braavos).
*   **Multiplayer & AI Mode**: Play against other players or an AI.
*   **Game Rooms**: Create or join game rooms.
*   **Leaderboard**: Track player rankings and wins.
*   **Real-time Updates**: Game state updates алкоголь (alcohol) in real-time.
*   **Modern Tech Stack**: Built with React, TypeScript, Vite, and Tailwind CSS.

## Tech Stack

*   **Frontend**: React, TypeScript, Vite, Tailwind CSS, shadcn/ui
*   **Blockchain**: StarkNet
*   **Game Engine**: Dojo Engine
*   **StarkNet Interaction**: `@starknet-react/core`, `@dojoengine/sdk`
*   **State Management**: React Query, Zustand (or similar, based on project structure)
*   **Routing**: `react-router-dom`

## Project Structure

*   `src/main.tsx`: Application entry point, initializes Dojo SDK and renders the main Router.
*   `src/Router.tsx`: Defines application routes using `react-router-dom`.
*   `src/components/`: Contains reusable UI components.
    *   `Layout.tsx`: Main application layout with navigation.
    *   `GameRoomList.tsx`: Component for displaying and managing game rooms.
    *   `DojoProvider.tsx`: Provides Dojo context for interacting with the SDK.
    *   `AuthProvider.tsx`: Handles user authentication via wallet connection.
*   `src/app/`: Contains page components for different routes.
    *   `game/[id]/page.tsx`: The main game page, handling game board display and interaction logic.
    *   `rooms/page.tsx`: Page for listing game rooms.
    *   `leaderboard/page.tsx`: Page for displaying the game leaderboard.
*   `src/constants/`: Contains configuration files like `dojoConfig.ts`.
*   `src/hooks/`: Custom React hooks for game logic, data fetching, etc.
*   `src/dojo/`: Contains generated code from the Dojo Engine (contracts, models).
*   `src/services/`: Services for API calls, including AI agent interaction.

## Getting Started

### Prerequisites

*   Node.js (version 18 or higher recommended)
*   pnpm (or npm/yarn)
*   A StarkNet compatible wallet (e.g., Argent X, Braavos) configured for Sepolia testnet.

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd jump-chess-frontend
    ```

2.  Install dependencies:
    ```bash
    pnpm install
    ```

### Running the Development Server

1.  Ensure your Torii server is running (see `package.json` scripts for the `torii` command if applicable, or follow Dojo Engine setup instructions).
    ```json
    "torii": "torii --world 0xf58e954491c0ce3f0274592179ccc552815327c2f0e3c2c8c382bafbe7fc1e  --http.cors_origins '*' --rpc https://starknet-sepolia.public.blastapi.io/rpc/v0_7"
    ```

2.  Start the frontend development server:
    ```bash
    pnpm run dev
    ```
    The application will typically be available at `http://localhost:5100`.

### Building for Production

```bash
pnpm run build
```
