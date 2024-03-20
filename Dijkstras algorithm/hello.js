class Graph {
  constructor() {
    this.vertices = [];
    this.edges = {};
  }

  addVertex(vertex) {
    if (!this.vertices.includes(vertex)) {
      this.vertices.push(vertex);
      this.edges[vertex] = {};
    }
  }

  addEdge(vertex1, vertex2, weight) {
    this.edges[vertex1][vertex2] = weight;
    this.edges[vertex2][vertex1] = weight;
  }
}

function dijkstra(graph, startVertex) {
  const distances = {};
  const visited = {};
  const queue = new PriorityQueue();

  distances[startVertex] = 0;
  queue.enqueue(startVertex, 0);

  while (!queue.isEmpty()) {
    const currentVertex = queue.dequeue().element;
    visited[currentVertex] = true;

    for (let neighbor in graph.edges[currentVertex]) {
      if (!visited[neighbor]) {
        const distance = distances[currentVertex] + graph.edges[currentVertex][neighbor];

        if (!distances[neighbor] || distance < distances[neighbor]) {
          distances[neighbor] = distance;
          queue.enqueue(neighbor, distance);
        }
      }
    }
  }

  return distances;
}

class PriorityQueue {
  constructor() {
    this.items = [];
  }

  enqueue(element, priority) {
    const queueElement = { element, priority };
    let added = false;
    for (let i = 0; i < this.items.length; i++) {
      if (queueElement.priority < this.items[i].priority) {
        this.items.splice(i, 0, queueElement);
        added = true;
        break;
      }
    }
    if (!added) {
      this.items.push(queueElement);
    }
  }

  dequeue() {
    return this.items.shift();
  }

  isEmpty() {
    return this.items.length === 0;
  }
}

// Створюємо граф та додаємо вершини та ребра
const graph = new Graph();
graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
graph.addVertex("D");
graph.addVertex("E");

graph.addEdge("A", "B", 4);
graph.addEdge("A", "C", 2);
graph.addEdge("B", "E", 3);
graph.addEdge("C", "D", 2);
graph.addEdge("C", "E", 1);
graph.addEdge("D", "E", 5);

// Виконуємо алгоритм Дейкстри
const startVertex = "A";
const distances = dijkstra(graph, startVertex);

// Виводимо результати
console.log("Результати алгоритму Дейкстри:");
for (let vertex in distances) {
  console.log(`Відстань до вершини ${vertex}: ${distances[vertex]}`);
}