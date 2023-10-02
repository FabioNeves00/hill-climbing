import { matrix } from ".";
import { Node } from "./Node";
import PriorityQueue from "ts-priority-queue";

export function hillClimbingAlgorithm(
  { row: startRow, column: startColumn }: { row: number; column: number },
  { row: endRow, column: endColumn }: { row: number; column: number },
  matrix: number[][]
) {
  const startNode = new Node(startRow, startColumn, 0);
  const endNode = new Node(endRow, endColumn, 0);
  if (startNode.equals(endNode)) return [startNode];
  const queue = new PriorityQueue<Node>({
    comparator: (a, b) => a.cost + a.heuristic - (b.cost + b.heuristic),
  });
  queue.queue(startNode);

  const visited = new Set<Node>();
  visited.add(startNode);

  const cameFrom = new Map<Node, Node | null>();
  cameFrom.set(startNode, null);

  while (queue.length > 0) {
    const currentNode = queue.dequeue();
    if (currentNode.equals(endNode)) {
      return reconstructPath(cameFrom, currentNode);
    }

    const neighbors = generateNeighbors(currentNode);
    for (const neighbor of neighbors) {
      if (
        matrix[neighbor.row][neighbor.column] !== 2 &&
        !visited.has(neighbor)
      ) {
        visited.add(neighbor);
        neighbor.heuristic = manhattanDistance(neighbor, endNode);
        queue.queue(neighbor);
        cameFrom.set(neighbor, currentNode);
      }
    }
  }

  return [];
}

function manhattanDistance(node1: Node, node2: Node) {
  return (
    Math.abs(node1.row - node2.row) + Math.abs(node1.column - node2.column)
  );
}

function generateNeighbors(node: Node): Node[] {
  const neighbors = [];
  switch (true) {
    case node.row > 0:
      neighbors.push(new Node(node.row - 1, node.column, node.cost + 1));
    case node.row < matrix.length - 1:
      neighbors.push(new Node(node.row + 1, node.column, node.cost + 1));
    case node.column > 0:
      neighbors.push(new Node(node.row, node.column - 1, node.cost + 1));
    case node.column < matrix[0].length - 1:
      neighbors.push(new Node(node.row, node.column + 1, node.cost + 1));
  }
  return neighbors;
}

function reconstructPath(
  cameFrom: Map<Node, Node | null>,
  endNode: Node
): Node[] {
  const path = [endNode];
  let current = endNode;
  while (cameFrom.get(current) !== null) {
    current = cameFrom.get(current)!;
    path.unshift(current);
  }
  return path;
}
