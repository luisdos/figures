import { DoublyLinkedList } from './DoublyLinkedList';
import { Figure } from './Figures';

describe('DoublyLinkedList class', () => {
  let linkedList: DoublyLinkedList<Figure>;

  beforeEach(() => {
    linkedList = new DoublyLinkedList<Figure>();
  });

  it('should initialize an empty linked list', () => {
    expect(linkedList.getLength()).toBe(0);
  });

  it('should add a node to the head of the list', () => {
    linkedList.addFirst(Figure.Square);
    expect(linkedList.getLength()).toBe(1);
    expect(linkedList.toArray()).toEqual([Figure.Square]);
  });

  it('should add a node to the tail of the list', () => {
    linkedList.addLast(Figure.Square);
    linkedList.addLast(Figure.Circle);
    expect(linkedList.getLength()).toBe(2);
    expect(linkedList.toArray()).toEqual([Figure.Square, Figure.Circle]);
  });

  it('should remove a node from the middle of the list', () => {
    linkedList.addFirst(Figure.Square);
    linkedList.addLast(Figure.Circle);
    linkedList.addLast(Figure.Triangle);
    linkedList.remove(1);
    expect(linkedList.getLength()).toBe(2);
    expect(linkedList.toArray()).toEqual([Figure.Square, Figure.Triangle]);
  });

  it('should remove the head node', () => {
    linkedList.addFirst(Figure.Square);
    linkedList.addLast(Figure.Circle);
    linkedList.remove(0);
    expect(linkedList.getLength()).toBe(1);
    expect(linkedList.toArray()).toEqual([Figure.Circle]);
  });

  it('should remove the tail node', () => {
    linkedList.addFirst(Figure.Square);
    linkedList.addLast(Figure.Circle);
    linkedList.remove(1);
    expect(linkedList.getLength()).toBe(1);
    expect(linkedList.toArray()).toEqual([Figure.Square]);
  });

  it('should throw an error when removing an invalid index', () => {
    linkedList.addFirst(Figure.Square);
    expect(() => linkedList.remove(1)).toThrow('Invalid index');
    expect(() => linkedList.remove(-1)).toThrow('Invalid index');
  });
});
