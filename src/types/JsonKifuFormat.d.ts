declare module 'json-kifu-format' {
    type Color = number; // black: 0, white: 1

    interface StateFormat {
        color: Color;
        board: { color?: Color; kind?: string; }[][];
        hands: {[index:string]: number}[];
    }

    interface PlaceFormat {
        x: number;
        y: number;
    }

    interface MoveFormat {
        comments?: string[];
        move?: MoveMoveFormat;
        time?: {
            now: TimeFormat;
            total: TimeFormat;
        };
        special?: string;
        forks?: MoveFormat[][];
    }

    interface TimeFormat {
        h?: number;
        m: number;
        s: number;
    }

    interface StateFormat {
        color: Color;
        board: { color?: Color; kind?: string; }[][];
        hands: { [index: string]: number }[];
    }

    interface MoveMoveFormat {
        color: Color;
        from?: PlaceFormat;
        to?: PlaceFormat;
        piece: string;
        same?: boolean;
        promote?: boolean;
        capture?: string;
        relative?: string;
    }

    interface JSONKifuFormat {
        header: { [index: string]: string; };
        initial?: {
            preset: string;
            data?: StateFormat;
        };
        moves: MoveFormat[];
    }

    class JKFPlayer {
        static parse(text: string): JKFPlayer
        getMaxTesuu(): number
        goto(turn: number): void
        getState(): StateFormat
        getMove(): MoveMoveFormat
    }

    export = JKFPlayer
}
