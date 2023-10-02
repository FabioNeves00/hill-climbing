export class Node {
  constructor(
    public readonly row: number,
    public readonly column: number,
    public readonly cost: number,
    public heuristic: number = 0
  ) {}

  equals(node: Node) {
    return this.row === node.row && this.column === node.column;
  }

  toString() {
    return `(${this.row}, ${this.column})`;
  }
}