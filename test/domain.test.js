import test from 'node:test';
import assert from 'node:assert/strict';
import { score, overdue, recommendations, leadMetrics } from '../public/domain.js';
const item = { title:'Payments',lead:'Priya',due:'2026-10-01',progress:40,status:'Blocked',value:10,urgency:8,riskReduction:6,effort:4,tests:false,acceptance:true,security:false };
test('priority reflects value, urgency, risk and effort',()=>{assert.equal(score(item),60);assert.equal(score({...item,effort:8}),30);});
test('completed work does not trigger overdue or action signals',()=>{const complete={...item,progress:100};assert.equal(overdue(complete,'2026-10-09'),false);assert.deepEqual(recommendations([complete],'2026-10-09'),[]);});
test('blocked overdue work identifies recovery, dependency and missing quality gates',()=>{const notes=recommendations([item],'2026-10-09');assert.equal(notes.length,3);assert.match(notes[2].detail,/test planning, security review/);assert.doesNotMatch(notes[2].detail,/acceptance criteria/);});
test('lead metrics include only owned work and calculate gate readiness',()=>{assert.deepEqual(leadMetrics([item,{...item,lead:'James'}],'Priya','2026-10-09'),{total:1,complete:0,blocked:1,overdue:1,readiness:33});});
