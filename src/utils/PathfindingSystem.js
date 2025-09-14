import { GAME_CONSTANTS } from '../game/GameConfig.js';

export class PathfindingSystem {
    constructor(scene) {
        this.scene = scene;
        this.grid = [];
        this.width = 0;
        this.height = 0;
    }

    setGrid(tilemap, collisionLayer) {
        this.width = tilemap.width;
        this.height = tilemap.height;
        this.grid = [];

        // Create grid based on tilemap collision data
        for (let y = 0; y < this.height; y++) {
            const row = [];
            for (let x = 0; x < this.width; x++) {
                const tile = collisionLayer.getTileAt(x, y);
                // 0 = walkable, 1 = blocked
                row.push(tile && tile.index > 0 ? 1 : 0);
            }
            this.grid.push(row);
        }
    }

    worldToGrid(worldX, worldY) {
        return {
            x: Math.floor(worldX / GAME_CONSTANTS.TILE_SIZE),
            y: Math.floor(worldY / GAME_CONSTANTS.TILE_SIZE)
        };
    }

    gridToWorld(gridX, gridY) {
        return {
            x: gridX * GAME_CONSTANTS.TILE_SIZE + GAME_CONSTANTS.TILE_SIZE / 2,
            y: gridY * GAME_CONSTANTS.TILE_SIZE + GAME_CONSTANTS.TILE_SIZE / 2
        };
    }

    isWalkable(gridX, gridY) {
        if (gridX < 0 || gridX >= this.width || gridY < 0 || gridY >= this.height) {
            return false;
        }
        return this.grid[gridY][gridX] === 0;
    }

    findPath(startX, startY, endX, endY) {
        const start = this.worldToGrid(startX, startY);
        const end = this.worldToGrid(endX, endY);

        // If target is not walkable, find nearest walkable tile
        if (!this.isWalkable(end.x, end.y)) {
            const nearest = this.findNearestWalkable(end.x, end.y);
            if (nearest) {
                end.x = nearest.x;
                end.y = nearest.y;
            } else {
                return []; // No valid path
            }
        }

        // Use A* pathfinding
        const path = this.aStar(start, end);

        // Convert grid coordinates back to world coordinates
        return path.map(point => this.gridToWorld(point.x, point.y));
    }

    findNearestWalkable(gridX, gridY, maxRadius = 3) {
        for (let radius = 1; radius <= maxRadius; radius++) {
            for (let dy = -radius; dy <= radius; dy++) {
                for (let dx = -radius; dx <= radius; dx++) {
                    const newX = gridX + dx;
                    const newY = gridY + dy;

                    if (this.isWalkable(newX, newY)) {
                        return { x: newX, y: newY };
                    }
                }
            }
        }
        return null;
    }

    aStar(start, end) {
        const openSet = [start];
        const closedSet = [];
        const cameFrom = new Map();
        const gScore = new Map();
        const fScore = new Map();

        gScore.set(this.getKey(start), 0);
        fScore.set(this.getKey(start), this.heuristic(start, end));

        while (openSet.length > 0) {
            // Get node with lowest fScore
            let current = openSet.reduce((lowest, node) => {
                const currentF = fScore.get(this.getKey(node)) || Infinity;
                const lowestF = fScore.get(this.getKey(lowest)) || Infinity;
                return currentF < lowestF ? node : lowest;
            });

            // If we reached the goal
            if (current.x === end.x && current.y === end.y) {
                return this.reconstructPath(cameFrom, current);
            }

            // Move current from open to closed set
            openSet.splice(openSet.indexOf(current), 1);
            closedSet.push(current);

            // Check neighbors
            const neighbors = this.getNeighbors(current);
            for (const neighbor of neighbors) {
                if (closedSet.some(node => node.x === neighbor.x && node.y === neighbor.y)) {
                    continue;
                }

                const tentativeGScore = (gScore.get(this.getKey(current)) || 0) + 1;
                const neighborKey = this.getKey(neighbor);

                if (!openSet.some(node => node.x === neighbor.x && node.y === neighbor.y)) {
                    openSet.push(neighbor);
                } else if (tentativeGScore >= (gScore.get(neighborKey) || Infinity)) {
                    continue;
                }

                cameFrom.set(neighborKey, current);
                gScore.set(neighborKey, tentativeGScore);
                fScore.set(neighborKey, tentativeGScore + this.heuristic(neighbor, end));
            }
        }

        // No path found
        return [];
    }

    getNeighbors(node) {
        const neighbors = [];
        const directions = [
            { x: 0, y: -1 }, // Up
            { x: 1, y: 0 },  // Right
            { x: 0, y: 1 },  // Down
            { x: -1, y: 0 }  // Left
        ];

        for (const dir of directions) {
            const newX = node.x + dir.x;
            const newY = node.y + dir.y;

            if (this.isWalkable(newX, newY)) {
                neighbors.push({ x: newX, y: newY });
            }
        }

        return neighbors;
    }

    heuristic(a, b) {
        // Manhattan distance
        return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
    }

    getKey(point) {
        return `${point.x},${point.y}`;
    }

    reconstructPath(cameFrom, current) {
        const path = [current];
        let currentKey = this.getKey(current);

        while (cameFrom.has(currentKey)) {
            current = cameFrom.get(currentKey);
            path.unshift(current);
            currentKey = this.getKey(current);
        }

        return path;
    }
}
