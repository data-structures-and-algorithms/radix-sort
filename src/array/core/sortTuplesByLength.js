import assert from 'assert';
import alloc from './alloc.js';
import zeros from './zeros.js';
import cumulativeHistogram from './cumulativeHistogram.js';
import rank from './rank.js';

import loadLengths from './loadLengths.js';

/**
 * O(M + N) time where M is the maximum length of a tuple, and
 * N is the number of tuples.
 */
const sortTuplesByLength = (tuples) => {
	console.debug('sortTuplesByLength', tuples);
	assert(tuples !== undefined);
	const N = tuples.length;
	const lengths = alloc(N);
	const M = loadLengths(tuples, 0, N, lengths);
	const ch = zeros(M + 1); // O(M)
	cumulativeHistogram(lengths, 0, N, ch, 1); // O(N)
	console.debug('sortTuplesByLength step', lengths, ch);
	assert(ch[0] === 0);
	const permutation = alloc(N);
	rank(ch, lengths, 0, lengths.length, permutation); // O(N)
	return [ch, permutation];
};

export default sortTuplesByLength;
