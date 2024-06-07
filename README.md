# Self-Driving Car Simulation

This project simulates a self-driving car using pure JavaScript. The simulation includes realistic car driving mechanics, a dynamic environment with obstacles, sensor data for decision-making, and a neural network controlling the car autonomously.

## Features

- **Realistic Car Driving Mechanics**: Designed to enable smooth and realistic car movement.
- **Dynamic Environment**: Includes obstacles and boundaries for the car to navigate.
- **Sensor Simulation**: Detects obstacles and environmental features, providing input data for decision-making.
- **Collision Detection**: Efficient algorithms to ensure accurate responses to surroundings.
- **Neural Network Control**: Built from scratch to control the car autonomously using a genetic algorithm.
- **Traffic Generation**: Randomized traffic on the road to train the neural network based on interaction.
- **Visualization Tools**: Observe the neural network’s decision-making process in real-time.

## Project Structure

- `index.html`: Main HTML file to set up the canvas and include scripts.
- `style.css`: Styles for the canvas and buttons.
- `car.js`: Defines the `Car` class and its behavior.
- `controls.js`: Handles user input for car controls.
- `network.js`: Defines the neural network and its operations.
- `sensor.js`: Defines the sensor class for obstacle detection.
- `road.js`: Defines the road and its properties.
- `utils.js`: Utility functions for linear interpolation and intersection detection.
- `visualizer.js`: Tools for visualizing the neural network.
- `main.js`: Main script to set up the simulation and handle animation.

## How It Works

1. **Car Mechanics**: The car's movement is controlled by the `Car` class, which handles acceleration, friction, and turning based on user input or neural network output.
2. **Environment**: The `Road` class sets up the road with lanes and borders. The car navigates this environment, avoiding obstacles and staying within boundaries.
3. **Sensors**: The `Sensor` class simulates sensor rays that detect obstacles and provide input to the neural network.
4. **Neural Network**: The `NeuralNetwork` class controls the car based on sensor input. The network is trained through interaction with the environment and traffic.
5. **Visualization**: The `Visualizer` class provides real-time visualization of the neural network’s decision-making process.
6. **Traffic Generation**: Traffic is randomly generated in `Main.js` and used to train the car neural network.

## Key Functions and Classes

- `Car`: Manages car properties and movement.
- `Controls`: Handles keyboard input for manual control.
- `Road`: Sets up the road and its properties.
- `Sensor`: Simulates sensors for obstacle detection.
- `NeuralNetwork`: Manages the neural network controlling the car.
- `Visualizer`: Provides tools for visualizing the neural network.

## Screenshots
<img width="518" alt="image" src="https://github.com/ayusharma17/Self-Driving-Car-Simulation/assets/102592750/21ffa553-ae63-45fb-93c3-16b2c5cac84d">

