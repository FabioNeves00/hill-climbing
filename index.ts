import { createPrompt } from "bun-promptx";
import { matrix } from "./src";
import { hillClimbingAlgorithm } from "./src/hill-climbing";

const row = parseInt(
  createPrompt("insira a linha da posição inicial: ").value ?? ""
);
const column = parseInt(
  createPrompt("insira a coluna da posição inicial: ").value ?? ""
);

const row2 = parseInt(
  createPrompt("insira a linha da posição final: ").value ?? ""
);
const column2 = parseInt(
  createPrompt("insira a coluna da posição final: ").value ?? ""
);

if (matrix[row][column] === 2 || matrix[row2][column2] === 2) {
  console.log("Posição inicial ou final inválida");
  process.exit();
}

if (
  row < 0 ||
  row >= matrix.length ||
  column < 0 ||
  column >= matrix[0].length ||
  row2 < 0 ||
  row2 >= matrix.length ||
  column2 < 0 ||
  column2 >= matrix[0].length 
) {
  console.log("Posição inicial ou final inválida");
  process.exit();
}

const searchedNode = hillClimbingAlgorithm(
  { row, column },
  { row: row2, column: column2 },
  matrix
);

const hasFound =
  searchedNode[searchedNode.length - 1].row === row2 &&
  searchedNode[searchedNode.length - 1].column === column2;

console.log(
  searchedNode
    .map((node) => `${node.toString()} [${matrix[node.row][node.column]}]`)
    .join("->") + (hasFound ? " (encontrado)" : " (não encontrado)")
);
