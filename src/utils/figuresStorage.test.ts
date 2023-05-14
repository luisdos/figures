import { render } from '@testing-library/react';
import { Figure } from '../types/Figures';
import figuresStorage from "./figuresStorage";

describe('figures storage util', () => {

    beforeEach(() => {
        const localStorageMock = (() => {
            let store: Record<string, string> = {};
            return {
                getItem: (key: string) => store[key] || null,
                setItem: (key: string, value: string) => {
                    store[key] = value.toString();
                },
                removeItem: (key: string) => {
                    delete store[key];
                },
                clear: () => {
                    store = {};
                },
            };
        })();

        Object.defineProperty(window, 'localStorage', {
            value: localStorageMock,
        });

    });

    afterEach(() => {
        localStorage.clear();
    });

    test('setFiguresStorage saves figures to localStorage', () => {
        const spy = jest.spyOn(figuresStorage, 'setFiguresStorage');
        const figures: Figure[] = [Figure.Square, Figure.Circle];
        figuresStorage.setFiguresStorage(figures);

        expect(localStorage.getItem('figures')).toEqual(JSON.stringify(figures));
    });

    test('getFiguresStorage returns figures from localStorage', () => {
        const spy = jest.spyOn(figuresStorage, 'getFiguresStorage');
        const figures: Figure[] = [Figure.Square, Figure.Circle];
        localStorage.setItem('figures', JSON.stringify(figures));

        const result = figuresStorage.getFiguresStorage();

        expect(result).toEqual(figures);
    });

    test('getFiguresStorage returns undefined if localStorage item doesn\'t exist', () => {
        const spy = jest.spyOn(figuresStorage, 'getFiguresStorage');
        const result = figuresStorage.getFiguresStorage();
        expect(result).toBeUndefined();
    });

    test('getFiguresStorage returns undefined if localStorage contains invalid JSON', () => {
        const spy = jest.spyOn(figuresStorage, 'getFiguresStorage');
        localStorage.setItem('figures', 'not a valid JSON string');

        const result = figuresStorage.getFiguresStorage();

        expect(result).toBeUndefined();
    });
});
