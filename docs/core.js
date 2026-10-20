export const SAVE_KEY='auladex-liga-invertida-v1';
const ids=v=>Array.isArray(v)?[...new Set(v.filter(n=>Number.isInteger(n)&&n>=1&&n<=4))]:[];
export function newState(){return {version:1,name:'',unlocked:[],completed:[],captured:[],prepared:{},notes:{},sound:false,battle:null};}
export function normalizeState(v){
 if(!v||typeof v!=='object'||v.version!==1)throw new Error('Este archivo no es una partida de AulaDex compatible.');
 const s=newState();s.name=typeof v.name==='string'?v.name.slice(0,32):'';s.unlocked=ids(v.unlocked);
 s.completed=ids(v.completed).filter(id=>s.unlocked.includes(id));s.captured=ids(v.captured).filter(id=>s.completed.includes(id));
 for(let id=1;id<=4;id++){s.prepared[id]=Math.max(0,Math.min(3,Math.floor(Number(v.prepared?.[id])||0)));s.notes[id]=typeof v.notes?.[id]==='string'?v.notes[id].slice(0,1200):'';}
 s.sound=v.sound===true;
 const b=v.battle;
 if(b&&s.unlocked.includes(b.id)&&Array.isArray(b.order)&&b.order.length===4&&new Set(b.order).size===4&&b.order.every(n=>Number.isInteger(n)&&n>=0&&n<4)&&Number.isInteger(b.cursor)&&b.cursor>=0&&b.cursor<4&&Number.isFinite(b.hp)&&b.hp>0&&b.hp<=100){
  s.battle={id:b.id,order:b.order,cursor:b.cursor,hp:b.hp,enemy:100-b.cursor*25,focusUsed:b.focusUsed===true,healUsed:b.healUsed===true,hint:typeof b.hint==='string'?b.hint.slice(0,250):'',selected:null,pending:null,eliminated:[]};
 }
 return s;
}
export function shuffled(a){const b=[...a];for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]];}return b;}
export function startBattle(id){return {id,order:shuffled([0,1,2,3]),cursor:0,hp:100,enemy:100,focusUsed:false,healUsed:false,hint:'',selected:null,pending:null,eliminated:[]};}
export function answerBattle(b,q,choice){
 if(b.pending||!Number.isInteger(choice)||choice<0||choice>=q.options.length)return b;
 const correct=choice===q.answer;
 return {...b,hp:correct?b.hp:Math.max(0,b.hp-25),enemy:correct?Math.max(0,b.enemy-25):b.enemy,selected:choice,pending:correct?'correct':'wrong',eliminated:correct?b.eliminated:[...new Set([...b.eliminated,choice])]};
}
