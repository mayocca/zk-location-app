# Zero-Knowledge Location Proof

This project demonstrates a zero-knowledge proof system for location verification using Noir and React.

## Prerequisites

- Node.js (version 22.9.0 or later)
- Noir (version 0.34.0)
- Barretenberg (version 0.55.0)

## Setup

1. Clone the repository:

   ```
   git clone https://github.com/mayocca/zk-location-app.git
   cd zk-location-app
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Compile the Noir circuit:
   ```
   nargo compile
   ```

## Running the Project

1. Start the development server:

   ```
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:5173` (or the port specified in the console output).

## Project Structure

- `circuits/`: Contains the Noir circuit code
- `src/`: React application source code
- `target/`: Compiled circuit output

## Working with the Project

### Modifying the Circuit

1. Edit the Noir circuit in `circuits/src/main.nr`.
2. Recompile the circuit using `make verifier`.

### Updating the Frontend

1. The main application logic is in `src/App.tsx`.
2. The Prover component is in `src/components/prover.tsx`.
3. The Verifier component is in `src/components/verifier.tsx`.

### Running Tests

To run the Noir circuit tests:

```
nargo test
```

## Deployment

To build the project for production:

```
npm run build
```

The output will be in the `dist/` directory.

## Additional Information

- This project uses Vite as the build tool and development server.
- Tailwind CSS is used for styling.
- The project is configured to use TypeScript.

For more detailed information about the components and their usage, refer to the comments in the source code.
