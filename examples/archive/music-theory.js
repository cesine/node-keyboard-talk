/* eslint-disable no-unused-vars, no-undef */

// could do this with Rx

const cminor = scale(c, 'minor')
cminor

const progression = [2, 2, 1, 2, 2, 2, 1]
from(sequence(c, progression)).pipe(delay(500)).pipe(toAudio)

progression.unshift(progression.pop())
sequence(c, progression) // c locrian (7th mode)

progression.unshift(progression.pop())
sequence(c, progression) // c aeolian (6th mode)

