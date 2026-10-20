import test from 'node:test';
import assert from 'node:assert/strict';
import {newState,normalizeState,startBattle,answerBattle,nextAdventure,SAVE_KEY} from '../docs/core.js';
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

test('older saves use readable text and copies retain a chosen retro font',()=>{
 const old={version:1,name:'Nico',profileReady:true,unlocked:[1,2],completed:[1],captured:[1],notes:{1:'Aplicar un caso'}};
 assert.equal(normalizeState(old).font,'readable');
 const retro=normalizeState({...old,font:'retro'});
 assert.equal(normalizeState(JSON.parse(JSON.stringify(retro))).font,'retro');
 assert.deepEqual(retro.captured,[1]);assert.equal(retro.notes[1],'Aplicar un caso');
 assert.equal(normalizeState({...old,font:'unknown'}).font,'readable');
});
test('the route advances to the next gym even before its weekly key is entered',()=>{
 const s={...newState(),unlocked:[1],completed:[1],captured:[1]};
 assert.deepEqual(nextAdventure(s),{id:2,stage:'locked'});
 assert.deepEqual(nextAdventure({...s,unlocked:[1,2]}),{id:2,stage:'ready'});
 assert.deepEqual(nextAdventure({...s,unlocked:[1,2,3],completed:[1,2,3],captured:[1,2,3]}),{id:4,stage:'locked'});
});
test('a pending reward and an ongoing battle remain actionable from the route',()=>{
 const s={...newState(),unlocked:[1,2],completed:[1],battle:startBattle(2)};
 assert.deepEqual(nextAdventure(s),{id:1,stage:'capture'});
 assert.deepEqual(nextAdventure({...s,captured:[1]}),{id:2,stage:'battle'});
});
test('four captures lead to the class plan even while replaying a completed gym',()=>{
 assert.deepEqual(nextAdventure({...newState(),unlocked:[1,2,3,4],completed:[1,2,3,4],captured:[1,2,3,4],battle:startBattle(1)}),{id:4,stage:'finished'});
});
