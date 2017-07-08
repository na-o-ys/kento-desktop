// TODO: 型
export interface GameControl {
    setTurn(turn: number): void,
    clickCell(cell, position, moveInput, turn): void,
    clickHand(piece, position, moveInput, turn): void,
    returnTheGame(theGame: any, branchFrom: number): void
}

export type Style = { [key: string]: string | number }

export namespace JsonKifuFormat {
    export type Color = number; // black: 0, white: 1

    export interface PlaceFormat {
        x: number;
        y: number;
    }

    export interface MoveFormat {
        comments?: string[];
        move?: MoveMoveFormat;
        time?: {
            now: TimeFormat;
            total: TimeFormat;
        };
        special?: string;
        forks?: MoveFormat[][];
    }

    export interface TimeFormat {
        h?: number;
        m: number;
        s: number;
    }

    interface StateFormat {
        color: Color;
        board: { color?: Color; kind?: string; }[][];
        hands: { [index: string]: number }[];
    }

    export interface MoveMoveFormat {
        color: Color;
        from?: PlaceFormat;
        to?: PlaceFormat;
        piece: string;
        same?: boolean;
        promote?: boolean;
        capture?: string;
        relative?: string;
    }

    export interface JSONKifuFormat {
        header: { [index: string]: string; };
        initial?: {
            preset: string;
            data?: StateFormat;
        };
        moves: MoveFormat[];
    }
}
