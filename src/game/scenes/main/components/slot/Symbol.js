import {property} from './index';

export function Symbol(view, index, symbols) {
    const offsetY = Number(symbols[0].y);

    const stepSize = Math.abs(offsetY / property.stepPerSymbol);

    let pos = index;

    return {
        get initPos() {
            return index;
        },

        get pos() {
            return pos;
        },
        set pos(newPos) {
            pos = newPos;

            view.y = offsetY + (pos * stepSize);
        },

        get x() {
            return view.x;
        },
        set x(newX) {
            view.x = newX;
        },

        get y() {
            return view.y;
        },
        set y(newY) {
            view.y = newY;
        },

        get texture() {
            return view.texture;
        },
        set texture(newTexture) {
            view.texture = newTexture;
        },
    };
}
