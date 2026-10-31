import {test} from 'node:test';
import assert from 'node:assert/strict';
import {plan} from './plan.js';
const task=(id,due,status='todo',priority=2)=>({id,title:id,due,status,priority});
test('splits open tasks by date and excludes completed tasks',()=>{const r=plan([task('a','2026-10-30'),task('b','2026-10-31'),task('c','2026-11-01'),task('d','2026-10-01','done')],'2026-10-31');assert.equal(r.overdue.length,1);assert.equal(r.dueToday.length,1);assert.equal(r.upcoming.length,1);assert.equal(r.completed,1);});
test('sorts by date then priority without mutating input',()=>{const input=[task('b','2026-11-01','todo',3),task('a','2026-11-01','todo',1)];assert.deepEqual(plan(input,'2026-10-31').upcoming.map(t=>t.id),['a','b']);assert.equal(input[0].id,'b');});
test('validates dates including leap years',()=>{assert.throws(()=>plan([],'2026-02-29'));assert.doesNotThrow(()=>plan([],'2028-02-29'));assert.throws(()=>plan([task('a','2026-13-01')],'2026-10-31'));});
test('rejects duplicates, invalid status and priority',()=>{assert.throws(()=>plan([task('a','2026-01-01'),task('a','2026-01-01')],'2026-10-31'));assert.throws(()=>plan([task('a','2026-01-01','unknown')],'2026-10-31'));assert.throws(()=>plan([task('a','2026-01-01','todo',4)],'2026-10-31'));});
