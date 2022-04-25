"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.logger = void 0;
const winston_1 = require("winston");
const loggerLevels = {
    levels: {
        error: 0,
        debug: 1,
        warn: 2,
        info: 3,
        new: 4,
        update: 5,
        heartbeat: 6,
    },
    colors: {
        error: 'red',
        debug: 'blue',
        warn: 'yellow',
        info: 'green',
        new: 'green',
        update: 'yellow',
        heartbeat: 'blue',
    },
};
winston_1.addColors(loggerLevels.colors);
exports.logger = winston_1.createLogger({
    levels: loggerLevels.levels,
    format: winston_1.format.combine(winston_1.format.colorize({
        level: true
    }), winston_1.format.errors({
        stack: true
    }), winston_1.format.splat(), winston_1.format.timestamp({
        format: 'MM/DD/YYYY HH:mm:ss'
    }), winston_1.format.printf((data) => {
        const {
            timestamp,
            level,
            message,
            ...rest
        } = data;
        return `[${timestamp}][${level}]: ${message}${
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions, @typescript-eslint/no-base-to-string
        rest instanceof Error ? rest : Object.keys(rest).length ? `\n${JSON.stringify(rest, null, 2)}` : ''}`;
    })),
    transports: new winston_1.transports.Console(),
    level: 'heartbeat',
});