import test from 'node:test';
import assert from 'node:assert/strict';
import {newState,normalizeState,startBattle,answerBattle,SAVE_KEY} from '../docs/core.js';
import {GYMS} from '../docs/content.js';

function encounter(){const battle=startBattle(1);return {battle,question:GYMS[0].questions[battle.order[0]]};}
function restore(battle){return normalizeState({...newState(),unlocked:[1],battle}).battle;}

test('a pre-profile save retains captures, unlocked gyms and notes',()=>{
 const restored=normalizeState({version:1,name:'Anterior',unlocked:[1,2],completed:[1],captured:[1],prepared:{1:3},notes:{1:'Mi idea'},sound:false});
 assert.deepEqual(restored.captured,[1]);assert.deepEqual(restored.unlocked,[1,2]);assert.equal(restored.notes[1],'Mi idea');assert.equal(restored.profileReady,false);assert.equal(restored.motion,'system');assert.equal(SAVE_KEY,'auladex-liga-invertida-v1');
});
test('a result awaiting feedback cannot be applied twice',()=>{
 const {battle,question}=encounter(),hit=answerBattle(battle,question,question.answer);
 assert.equal(hit.enemy,75);assert.equal(hit.hp,100);assert.deepEqual(answerBattle(hit,question,question.answer),hit);
});
test('reloading during a correct effect retains the seal and pending feedback',()=>{
 const {battle,question}=encounter(),hit=answerBattle(battle,question,question.answer),saved=restore(hit);
 assert.equal(saved.enemy,75);assert.equal(saved.cursor,0);assert.equal(saved.pending,'correct');assert.equal(saved.selected,question.answer);assert.equal(answerBattle(saved,question,question.answer).enemy,75);
});
test('wrong choices and spent support survive a reload',()=>{
 const {battle,question}=encounter(),wrong=(question.answer+1)%3;
 const saved=restore({...answerBattle(battle,question,wrong),focusUsed:true,healUsed:true,hint:question.hint});
 assert.equal(saved.hp,75);assert.equal(saved.enemy,100);assert.equal(saved.pending,'wrong');assert.deepEqual(saved.eliminated,[wrong]);assert(saved.focusUsed);assert(saved.healUsed);assert.equal(saved.hint,question.hint);
});
test('a defeat awaiting feedback survives reload so retry remains available',()=>{
 const {battle,question}=encounter(),lost=answerBattle({...battle,hp:25},question,(question.answer+1)%3),saved=restore(lost);
 assert.equal(saved.hp,0);assert.equal(saved.pending,'wrong');
});
test('the fourth seal stays broken when the victory screen is recovered',()=>{
 const {battle,question}=encounter(),won=answerBattle({...battle,cursor:3,enemy:25},question,question.answer);
 assert.equal(restore(won).enemy,0);assert.equal(restore(won).pending,'correct');
});
test('invalid copies are rejected and stale battle data is discarded',()=>{
 assert.throws(()=>normalizeState({version:2}));assert.equal(normalizeState({...newState(),unlocked:[1],battle:{...startBattle(1),order:[0,0,1,2]}}).battle,null);
});
