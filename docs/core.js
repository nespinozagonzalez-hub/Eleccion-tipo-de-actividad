export const SAVE_KEY='auladex-liga-invertida-v1';
const ids=v=>Array.isArray(v)?[...new Set(v.filter(n=>Number.isInteger(n)&&n>=1&&n<=4))]:[];
export function newState(){return {version:1,name:'',avatar:1,trait:'curiosidad',motto:'',profileReady:false,unlocked:[],completed:[],captured:[],prepared:{},notes:{},sound:false,motion:'system',font:'readable',battle:null};}
export function normalizeState(v){
 if(!v||typeof v!=='object'||v.version!==1)throw new Error('Este archivo no es una partida de AulaDex compatible.');
 const s=newState();s.name=typeof v.name==='string'?v.name.slice(0,32):'';s.unlocked=ids(v.unlocked);
 s.avatar=Number.isInteger(v.avatar)&&v.avatar>=1&&v.avatar<=4?v.avatar:1;
 s.trait=['curiosidad','ingenio','constancia','colaboracion'].includes(v.trait)?v.trait:'curiosidad';
 s.motto=typeof v.motto==='string'?v.motto.slice(0,80):'';
 s.profileReady=v.profileReady===true&&s.name.trim().length>=2;
 s.completed=ids(v.completed).filter(id=>s.unlocked.includes(id));s.captured=ids(v.captured).filter(id=>s.completed.includes(id));
 for(let id=1;id<=4;id++){s.prepared[id]=Math.max(0,Math.min(3,Math.floor(Number(v.prepared?.[id])||0)));s.notes[id]=typeof v.notes?.[id]==='string'?v.notes[id].slice(0,1200):'';}
 s.sound=v.sound===true;s.motion=v.motion==='reduced'?'reduced':'system';s.font=v.font==='retro'?'retro':'readable';
 const b=v.battle;
 if(b&&s.unlocked.includes(b.id)&&Array.isArray(b.order)&&b.order.length===4&&new Set(b.order).size===4&&b.order.every(n=>Number.isInteger(n)&&n>=0&&n<4)&&Number.isInteger(b.cursor)&&b.cursor>=0&&b.cursor<4&&Number.isFinite(b.hp)&&b.hp>=0&&b.hp<=100){
  const selected=Number.isInteger(b.selected)&&b.selected>=0&&b.selected<3?b.selected:null,pending=selected!==null&&['correct','wrong'].includes(b.pending)?b.pending:null;
  s.battle={id:b.id,order:b.order,cursor:b.cursor,hp:b.hp,enemy:100-b.cursor*25-(pending==='correct'?25:0),focusUsed:b.focusUsed===true,healUsed:b.healUsed===true,hint:typeof b.hint==='string'?b.hint.slice(0,250):'',selected,pending,eliminated:Array.isArray(b.eliminated)?[...new Set(b.eliminated.filter(n=>Number.isInteger(n)&&n>=0&&n<3))]:[],introSeen:b.introSeen!==false};
 }
 return s;
}
export function shuffled(a){const b=[...a];for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]];}return b;}
export function startBattle(id){return {id,order:shuffled([0,1,2,3]),cursor:0,hp:100,enemy:100,focusUsed:false,healUsed:false,hint:'',selected:null,pending:null,eliminated:[],introSeen:false};}
export function answerBattle(b,q,choice){
 if(b.pending||!Number.isInteger(choice)||choice<0||choice>=q.options.length)return b;
 const correct=choice===q.answer;
 return {...b,hp:correct?b.hp:Math.max(0,b.hp-25),enemy:correct?Math.max(0,b.enemy-25):b.enemy,selected:choice,pending:correct?'correct':'wrong',eliminated:correct?b.eliminated:[...new Set([...b.eliminated,choice])]};
}

// Keep rewards and an ongoing battle ahead of the next weekly destination.
export function nextAdventure(s){
 const reward=s.completed.find(id=>!s.captured.includes(id));
 if(reward)return {id:reward,stage:'capture'};
 if(s.battle&&!s.captured.includes(s.battle.id))return {id:s.battle.id,stage:'battle'};
 const id=[1,2,3,4].find(id=>!s.captured.includes(id));
 return id?{id,stage:s.unlocked.includes(id)?'ready':'locked'}:{id:4,stage:'finished'};
}
