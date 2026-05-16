"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCsv = void 0;
const json2csv_1 = require("json2csv");
const generateCsv = (data, fields) => {
    const json2csvParser = new json2csv_1.Parser({ fields });
    return json2csvParser.parse(data);
};
exports.generateCsv = generateCsv;
