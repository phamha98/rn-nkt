const str = "\x1b[36m"

export function logfix(msg, ...rest) {
    return console.log(Color.FgRed, "$fix-voice: ", msg, ...rest)
}

export class Log {
    static i(msg, ...rest) {
        return console.log(Color.FgBlue, msg, ...rest)
    }

    static w(msg, ...rest) {
        return console.log(Color.FgYellow, msg, ...rest)
    }

    static e(msg, ...rest) {
        return console.log(Color.FgRed, msg, ...rest)
    }

    static d(msg, ...rest) {
        return console.log(Color.FgCyan, msg, ...rest)
    }

    static r(msg, ...rest) {
        return console.log(Color.BgRed, msg, ...rest)
    }

    static c(msg, ...rest) {
        return console.log(Color.FgRed, msg, ...rest)
    }

    static g(msg, ...rest) {
        return console.log(Color.FgGreen, msg, ...rest)
    }

    static y(msg, ...rest) {
        return console.log(Color.FgYellow, msg, ...rest)
    }

    static m(msg, ...rest) {
        return console.log(Color.FgRed, msg, ...rest)
    }

    static b(msg, ...rest) {
        return console.log(Color.FgBlue, msg, ...rest)
    }
}

export const Color = {
    Reset: "\x1b[0m",
    Bright: "\x1b[1m",
    Dim: "\x1b[2m",
    Underscore: "\x1b[4m",
    Blink: "\x1b[5m",
    Reverse: "\x1b[7m",
    Hidden: "\x1b[8m",

    FgBlack: "\x1b[30m",
    FgRed: "\x1b[31m",
    FgGreen: "\x1b[32m",
    FgYellow: "\x1b[33m",
    FgBlue: "\x1b[34m",
    FgMagenta: "\x1b[35m",
    FgCyan: "\x1b[36m",
    FgWhite: "\x1b[37m",

    BgBlack: "\x1b[40m",
    BgRed: "\x1b[41m",
    BgGreen: "\x1b[42m",
    BgYellow: "\x1b[43m",
    BgBlue: "\x1b[44m",
    BgMagenta: "\x1b[45m",
    BgCyan: "\x1b[46m",
    BgWhite: "\x1b[47m"
}