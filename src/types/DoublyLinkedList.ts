import { Figure } from "./Figures";
import { LinkedListNode } from "./LinkedListNode";

export class DoublyLinkedList<T> {
  private head?: LinkedListNode<T>;
  private tail?: LinkedListNode<T>;
  public length = 0;

  init(values: Figure[]): void {
    for (let index = 0; index < values.length; index++) {
      const figure = values[index];
      if(!this.head) {
        this.addFirst(figure)
      } else {
        this.addLast(figure)
      }
    }
  }

  addFirst(value: Figure): LinkedListNode<T> {
    const node: LinkedListNode<T> = { value, index: 0 };
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      node.next = this.head;
      this.head.prev = node;
      this.head = node;
      this.recalculateIndexes();
    }
    this.length++;
    return node;
  }

  addLast(value: Figure): LinkedListNode<T> {
    const node: LinkedListNode<T> = { value, index: 0 };
    if (!this.tail) {
      this.head = node;
      this.tail = node;
    } else {
      node.prev = this.tail;
      this.tail.next = node;
      this.tail = node;
      this.recalculateIndexes();
    }
    this.length++;
    return node;
  }

  remove(index: number): void {
    if (index < 0 || index >= this.length) {
      throw new Error("Invalid index");
    }

    let currentNode = this.head;

    while (currentNode !== null) {
      if (currentNode!.index === index) {
        if (currentNode!.prev) {
          currentNode!.prev.next = currentNode!.next;
        } else {
          this.head = currentNode!.next;
        }

        if (currentNode!.next) {
          currentNode!.next.prev = currentNode!.prev;
        } else {
          this.tail = currentNode!.prev;
        }

        this.length--;
        this.recalculateIndexes();
        return;
      }

      currentNode = currentNode!.next;
    }
  }

  private recalculateIndexes() {
    let currentNode = this.head;
    let currentIndex = 0;
    while (currentNode) {
      currentNode.index = currentIndex;
      currentIndex++;
      currentNode = currentNode.next;
    }
  }

  toArray(): Figure[] {
    const arr: Figure[] = [];
    let current = this.head;
    while (current) {
      arr.push(current.value);
      current = current.next;
    }
    return arr;
  }

  getLength(): number {
    return this.length;
  }
}
