import { Figure } from "./Figures";

export type LinkedListNode<T> = {
  value: Figure;
  index: number;
  prev?: LinkedListNode<T>;
  next?: LinkedListNode<T>;
};
