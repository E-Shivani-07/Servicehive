"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildLeadQuery = void 0;
const buildLeadQuery = (query) => {
    const filter = {};
    if (query.status) {
        filter.status = query.status;
    }
    if (query.source) {
        filter.source = query.source;
    }
    if (query.search) {
        filter.$or = [
            { name: { $regex: query.search, $options: 'i' } },
            { email: { $regex: query.search, $options: 'i' } },
        ];
    }
    const sortOptions = {};
    if (query.sort === 'oldest') {
        sortOptions.createdAt = 1;
    }
    else {
        // Default to latest
        sortOptions.createdAt = -1;
    }
    return { filter, sortOptions };
};
exports.buildLeadQuery = buildLeadQuery;
