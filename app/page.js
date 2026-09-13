'use client';
import {useEffect,useMemo,useState} from 'react';

const areas=[
  ['dashboard','Dashboard','▦'],
  ['f1','Ficha 01','01'],
  ['f2','Ficha 02','02'],
  ['f3','Ficha 03','03'],
  ['f4','Ficha 04','04'],
  ['f5','Ficha 05','05'],
  ['f6','Ficha 06','06'],
  ['f7','Ficha 07','07'],
  ['f8','Ficha 08','08'],
  ['history','Historial','↗'],
  ['progress','Progresión','↕'],
  ['guide','Guía','?']
];

const empty={
  id:'',
  name:'',
  date:new Date().toISOString().slice(0,10),
  age:'',
  sex:'',
  sport:'',
  category:'',
  trainer:'',

  height:'',
  weight:'',
  fat:'',
  muscle:'',
  waist:'',
  hip:'',
  arm:'',
  thigh:'',
  calf:'',

  sleep:'',
  sleepQuality:'',
  hydration:'',
  food:'',
  meals:'',
  stress:'',
  screens:'',
  extra:'',
  recovery:'',

  injuries:'',
  surgeries:'',
  allergies:'',
  meds:'',
  background:'',

  objective:'',
  term:'3 meses',
  specific1:'',
  specific2:'',
  trainerObs:'',

  ankleD:'',
  ankleI:'',
  hipFlexD:'',
  hipFlexI:'',
  hipRotInD:'',
  hipRotInI:'',
  hipRotOutD:'',
  hipRotOutI:'',
  shoulderOutD:'',
  shoulderOutI:'',
  shoulderInD:'',
  shoulderInI:'',
  sitReach:'',
  ely:'',
  adductors:'',
  pectoral:'',
  deepSquat:'',
  lunge:'',
  plank:'',
  mobilityObs:'',

  sq1rm:'',
  dead1rm:'',
  bench1rm:'',
  ohp1rm:'',
  pull1rm:'',

  vbtSqLoad:'',
  vbtSq1:'',
  vbtSq2:'',
  vbtSq3:'',

  vbtBenchLoad:'',
  vbtBench1:'',
  vbtBench2:'',
  vbtBench3:'',

  vbtDeadLoad:'',
  vbtDead1:'',
  vbtDead2:'',
  vbtDead3:'',

  vbtOHPload:'',
  vbtOHP1:'',
  vbtOHP2:'',
  vbtOHP3:'',

  sj1:'',
  sj2:'',
  sj3:'',
  cmj1:'',
  cmj2:'',
  cmj3:'',
  abk1:'',
  abk2:'',
  abk3:'',
  drop1:'',
  drop2:'',
  drop3:'',
  uniD1:'',
  uniD2:'',
  uniD3:'',
  uniI1:'',
  uniI2:'',
  uniI3:'',

  medChest1:'',
  medChest2:'',
  medChest3:'',
  medBehind1:'',
  medBehind2:'',
  medBehind3:'',

  s5_1:'',
  s5_2:'',
  s5_3:'',
  s10_1:'',
  s10_2:'',
  s10_3:'',
  s20_1:'',
  s20_2:'',
  s20_3:'',

  changeD1:'',
  changeD2:'',
  changeD3:'',
  changeI1:'',
  changeI2:'',
  changeI3:'',

  turnD1:'',
  turnD2:'',
  turnD3:'',
  turnI1:'',
  turnI2:'',
  turnI3:'',

  enduranceTest:'Yo-Yo IR1',
  endLevel:'',
  endDistance:'',
  endSpeed:'',
  vo2:'',
  hrRest:'',
  hrPost:'',
  hr1:'',
  hr2:'',
  endTolerance:'',
  endObs:'',

  strengthScore:'',
  powerScore:'',
  speedScore:'',
  agilityScore:'',
  enduranceScore:'',
  mobilityScore:'',

  strengthPriority:'',
  powerPriority:'',
  speedPriority:'',
  agilityPriority:'',
  endurancePriority:'',
  mobilityPriority:'',

  actionPlan:'',
  reportNotes:'',

  calTarget:'',
  protein:'1.8',
  carbs:'5',
  fats:'1',
  nutrition:'',

  speedObs:'',
  agilityObs:''
};

const n=x=>{
  const v=parseFloat(x);
  return Number.isFinite(v)?v:null;
};

const best=(...x)=>{
  const a=x.map(n).filter(v=>v!==null);
  return a.length?Math.min(...a):'';
};

const max=(...x)=>{
  const a=x.map(n).filter(v=>v!==null);
  return a.length?Math.max(...a):'';
};

const avg=(...x)=>{
  const a=x.map(n).filter(v=>v!==null);
  return a.length
    ?a.reduce((s,v)=>s+v,0)/a.length
    :'';
};

const asym=(a,b)=>{
  a=n(a);
  b=n(b);
  return a!==null&&b!==null&&Math.max(a,b)>0
    ?Math.abs(a-b)/Math.max(a,b)*100
    :'';
};

const pct=(a,b)=>{
  a=n(a);
  b=n(b);
  return a!==null&&b!==null&&b!==0
    ?(a-b)/b*100
    :'';
};

function minv(...x){
  const a=x.map(n).filter(v=>v!==null);
  return a.length?Math.min(...a):null;
}

function velocityLoss(first,last){
  const a=n(first);
  const b=n(last);

  if(a===null||b===null||a===0) return '';

  return (a-b)/a*100;
}

function calc(d){

  const w=n(d.weight);
  const h=n(d.height);
  const age=n(d.age);
  const fat=n(d.fat);

  const bmi=
    w&&h
      ?w/((h/100)**2)
      :'';

  const fatMass=
    w&&fat
      ?w*fat/100
      :'';

  const lean=
    w&&fat
      ?w-fatMass
      :'';

  const tmb=
    w&&h&&age
      ?(
        d.sex==='M'
          ?10*w+6.25*h-5*age+5
          :10*w+6.25*h-5*age-161
       )
      :'';

  const get=
    tmb
      ?tmb*1.55
      :'';

  const vbt={
    sq:avg(d.vbtSq1,d.vbtSq2,d.vbtSq3),
    bench:avg(d.vbtBench1,d.vbtBench2,d.vbtBench3),
    dead:avg(d.vbtDead1,d.vbtDead2,d.vbtDead3),
    ohp:avg(d.vbtOHP1,d.vbtOHP2,d.vbtOHP3)
  };

  const vbtLoss={
    sq:velocityLoss(d.vbtSq1,d.vbtSq3),
    bench:velocityLoss(d.vbtBench1,d.vbtBench3),
    dead:velocityLoss(d.vbtDead1,d.vbtDead3),
    ohp:velocityLoss(d.vbtOHP1,d.vbtOHP3)
  };

  const sj=max(d.sj1,d.sj2,d.sj3);
  const cmj=max(d.cmj1,d.cmj2,d.cmj3);
  const abk=max(d.abk1,d.abk2,d.abk3);
  const drop=max(d.drop1,d.drop2,d.drop3);
  const ud=max(d.uniD1,d.uniD2,d.uniD3);
  const ui=max(d.uniI1,d.uniI2,d.uniI3);

  const ie=
    sj&&cmj
      ?(cmj-sj)/sj*100
      :'';

  const ib=
    cmj&&abk
      ?(abk-cmj)/cmj*100
      :'';

  const ua=asym(ud,ui);

  const rel=
    w&&n(d.sq1rm)
      ?n(d.sq1rm)/w
      :'';

  const s5=best(d.s5_1,d.s5_2,d.s5_3);
  const s10=best(d.s10_1,d.s10_2,d.s10_3);
  const s20=best(d.s20_1,d.s20_2,d.s20_3);

  const v5=s5?5/s5:'';
  const v10=s10?10/s10:'';
  const v20=s20?20/s20:'';

  const cD=best(d.changeD1,d.changeD2,d.changeD3);
  const cI=best(d.changeI1,d.changeI2,d.changeI3);
  const cAs=asym(cD,cI);

  const tD=best(d.turnD1,d.turnD2,d.turnD3);
  const tI=best(d.turnI1,d.turnI2,d.turnI3);

  const hrRec=
    n(d.hrPost)!==null&&n(d.hr1)!==null
      ?n(d.hrPost)-n(d.hr1)
      :'';

  const hydration=
    w
      ?w*.035
      :'';

  return{
    bmi,
    fatMass,
    lean,
    tmb,
    get,
    hydration,
    vbt,
    vbtLoss,
    sj,
    cmj,
    abk,
    drop,
    ud,
    ui,
    ie,
    ib,
    ua,
    rel,
    s5,
    s10,
    s20,
    v5,
    v10,
    v20,
    cD,
    cI,
    cAs,
    tD,
    tI,
    hrRec
  };
}

function Input({
  label,
  value,
  onChange,
  type='text',
  step
}){
  return(
    <label className="field">
      <span>{label}</span>
      <input
        value={value??''}
        onChange={e=>onChange(e.target.value)}
        type={type}
        step={step}
      />
    </label>
  );
}

function Select({
  label,
  value,
  onChange,
  children
}){
  return(
    <label className="field">
      <span>{label}</span>
      <select
        value={value??''}
        onChange={e=>onChange(e.target.value)}
      >
        {children}
      </select>
    </label>
  );
}

function Section({
  title,
  sub,
  children
}){
  return(
    <section className="section">
      <div className="sectitle">
        <div>
          <h3>{title}</h3>
          {sub&&<small>{sub}</small>}
        </div>
      </div>
      {children}
    </section>
  );
}

function Table({
  headers,
  children
}){
  return(
    <div className="tablewrap">
      <table>
        <thead>
          <tr>
            {headers.map(h=><th key={h}>{h}</th>)}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

function Row({
  label,
  children
}){
  return(
    <tr>
      <td className="rowlabel">{label}</td>
      {children}
    </tr>
  );
}

function CellInput({
  v,
  set,
  type='number',
  step='0.01'
}){
  return(
    <td>
      <input
        value={v??''}
        onChange={e=>set(e.target.value)}
        type={type}
        step={step}
      />
    </td>
  );
}

function Metric({
  label,
  value,
  unit
}){
  return(
    <div className="metric">
      <span>{label}</span>
      <strong>
        {
          value!==''&&value!==null
            ?typeof value==='number'
              ?value.toFixed(2)
              :value
            :'—'
        }
      </strong>
      {unit&&<small>{unit}</small>}
    </div>
  );
}

/* =========================================================
   DATOS MAESTROS
   ========================================================= */

function LinkedAthlete({d}){

  return(
    <div
      className="linked-athlete"
      style={{
        display:'grid',
        gridTemplateColumns:'2fr repeat(6,1fr)',
        gap:10,
        alignItems:'center',
        padding:'14px 16px',
        border:'1px solid #ddd',
        borderLeft:'5px solid #f2cc00',
        borderRadius:10,
        background:'#fafafa',
        marginBottom:14
      }}
    >

      <div>
        <small
          style={{
            display:'block',
            fontSize:9,
            fontWeight:800,
            color:'#777',
            letterSpacing:1,
            marginBottom:4
          }}
        >
          DATOS VINCULADOS DESDE FICHA 01
        </small>

        <strong style={{fontSize:16}}>
          {d.name||'Sin registrar'}
        </strong>
      </div>

      <div>
        <small>ID</small>
        <b>{d.id||'—'}</b>
      </div>

      <div>
        <small>Edad</small>
        <b>{d.age||'—'}</b>
      </div>

      <div>
        <small>Sexo</small>
        <b>
          {
            d.sex==='M'
              ?'Masculino'
              :d.sex==='F'
                ?'Femenino'
                :'—'
          }
        </b>
      </div>

      <div>
        <small>Deporte</small>
        <b>{d.sport||'—'}</b>
      </div>

      <div>
        <small>Categoría</small>
        <b>{d.category||'—'}</b>
      </div>

      <div>
        <small>Evaluador</small>
        <b>{d.trainer||'—'}</b>
      </div>

    </div>
  );
}

/* =========================================================
   APP
   ========================================================= */

function App(){

  const[page,setPage]=useState('dashboard');
  const[d,setD]=useState(empty);
  const[history,setHistory]=useState([]);
  const[loaded,setLoaded]=useState(false);

  useEffect(()=>{
    try{

      const a=
        JSON.parse(
          localStorage.getItem('arsport-evals')||'[]'
        );

      setHistory(a);

      const last=
        JSON.parse(
          localStorage.getItem('arsport-current')||'null'
        );

      if(last){
        setD({
          ...empty,
          ...last
        });
      }

    }catch{}

    setLoaded(true);

  },[]);

  useEffect(()=>{
    if(loaded){
      localStorage.setItem(
        'arsport-current',
        JSON.stringify(d)
      );
    }
  },[d,loaded]);

  const c=useMemo(
    ()=>calc(d),
    [d]
  );

  const set=(k,v)=>
    setD(x=>({
      ...x,
      [k]:v
    }));

  const reset=()=>{

    setD({
      ...empty,
      id:'ARS-'+String(Date.now()).slice(-6),
      date:new Date().toISOString().slice(0,10)
    });

  };

  const save=()=>{

    if(!d.name){

      alert('Completa primero el nombre del deportista en Ficha 01.');
      setPage('f1');
      return;

    }

    const rec={
      ...d,
      calc:c,
      savedAt:new Date().toISOString()
    };

    const arr=[
      ...history.filter(
        x=>x.id!==d.id||x.date!==d.date
      ),
      rec
    ];

    setHistory(arr);

    localStorage.setItem(
      'arsport-evals',
      JSON.stringify(arr)
    );

    alert('Evaluación guardada en Historial.');

  };

  const print=()=>window.print();

  const exportJSON=()=>{

    const blob=new Blob(
      [
        JSON.stringify(
          history,
          null,
          2
        )
      ],
      {
        type:'application/json'
      }
    );

    const a=document.createElement('a');

    a.href=URL.createObjectURL(blob);

    a.download='arsport-historial.json';

    a.click();

    URL.revokeObjectURL(a.href);

  };

  const previous=useMemo(()=>{

    const a=
      history
        .filter(x=>x.id===d.id)
        .sort(
          (x,y)=>
            (x.date||'').localeCompare(
              y.date||''
            )
        );

    return a.length>1
      ?a[a.length-2]
      :null;

  },[history,d.id]);

  const title=
    areas.find(x=>x[0]===page)?.[1]||
    'Dashboard';

  return(

    <div className="app">

      <aside className="sidebar">

        <div className="brand">
          <b>ARSPORT</b>
          <span>CENTRO DE ENTRENAMIENTO</span>
        </div>

        <div className="tag">
          EVALUAR • ENTRENAR • EVOLUCIONAR
        </div>

        <nav>

          {areas.map(a=>(

            <button
              key={a[0]}
              className={
                page===a[0]
                  ?'active'
                  :''
              }
              onClick={()=>
                setPage(a[0])
              }
            >
              <i>{a[2]}</i>
              {a[1]}
            </button>

          ))}

        </nav>

        <div className="sidefoot">
          Sistema Integral<br/>
          Evaluación Deportiva
        </div>

      </aside>

      <main>

        <header>

          <div>
            <span className="eyebrow">
              ARSPORT / {title.toUpperCase()}
            </span>

            <h1>{title}</h1>
          </div>

          <div className="actions">

            <button onClick={reset}>
              ＋ Nueva
            </button>

            <button
              onClick={save}
              className="primary"
            >
              Guardar
            </button>

            <button onClick={print}>
              Imprimir / PDF
            </button>

          </div>

        </header>

        <div className="athletebar">

          <div>

            <small>
              DEPORTISTA ACTUAL
            </small>

            <strong>
              {d.name||'Sin registrar'}
            </strong>

            <span>
              {d.id||'Sin ID'} · {d.sport||'Sin deporte'} · {d.category||'Sin categoría'}
            </span>

          </div>

          <div className="status">

            <span>Estado</span>

            <b>
              {d.name
                ?'En evaluación'
                :'Nuevo registro'}
            </b>

          </div>

        </div>

        {page==='dashboard'&&
          <Dashboard
            d={d}
            c={c}
            history={history}
            previous={previous}
            set={set}
            go={setPage}
          />
        }

        {page==='f1'&&
          <Ficha01
            d={d}
            set={set}
          />
        }

        {page==='f2'&&
          <Ficha02
            d={d}
            c={c}
            set={set}
          />
        }

        {page==='f3'&&
          <Ficha03
            d={d}
            c={c}
            set={set}
          />
        }

        {page==='f4'&&
          <Ficha04
            d={d}
            c={c}
            set={set}
          />
        }

        {page==='f5'&&
          <Ficha05
            d={d}
            c={c}
            set={set}
          />
        }

        {page==='f6'&&
          <Ficha06
            d={d}
            c={c}
            set={set}
          />
        }

        {page==='f7'&&
          <Ficha07
            d={d}
            c={c}
            set={set}
          />
        }

        {page==='f8'&&
          <Ficha08
            d={d}
            c={c}
            set={set}
            previous={previous}
          />
        }

        {page==='history'&&
          <History
            history={history}
            setD={setD}
          />
        }

        {page==='progress'&&
          <Progress
            d={d}
            c={c}
            previous={previous}
          />
        }

        {page==='guide'&&
          <Guide/>
        }

        <footer>
          ARSPORT · Ciencia aplicada al rendimiento · v1.0
        </footer>

      </main>

    </div>

  );
}

/* =========================================================
   DASHBOARD
   ========================================================= */

function Dashboard({
  d,
  c,
  history,
  previous,
  set,
  go
}){

  const cards=[
    ['IMC',c.bmi,'kg/m²'],
    ['% GRASA',d.fat,'%'],
    ['CMJ',c.cmj,'cm'],
    ['20 m',c.s20,'s'],
    ['1RM SENTADILLA',d.sq1rm,'kg'],
    ['REC. FC 1′',c.hrRec,'lpm']
  ];

  return <>

    <div className="hero">

      <div>

        <span className="eyebrow">
          SISTEMA INTEGRAL DE EVALUACIÓN
        </span>

        <h2>
          Controla el rendimiento.{' '}
          <em>Demuestra la evolución.</em>
        </h2>

        <p>
          Registra las ocho fichas,
          conserva cada evaluación
          y compara el progreso del deportista.
        </p>

        <div className="quick">

          <button onClick={()=>go('f1')}>
            Datos del deportista →
          </button>

          <button onClick={()=>go('f4')}>
            Evaluar fuerza/potencia →
          </button>

          <button onClick={()=>go('f8')}>
            Generar informe →
          </button>

        </div>

      </div>

      <div className="heroMark">
        ARS<br/>
        <b>SPORT</b>
      </div>

    </div>

    <div className="grid metrics">

      {cards.map(x=>
        <Metric
          key={x[0]}
          label={x[0]}
          value={x[1]}
          unit={x[2]}
        />
      )}

    </div>

    <div className="twocol">

      <Section
        title="Perfil ARSPORT"
        sub="Resultado de la evaluación actual"
      >
        <Profile
          d={d}
          c={c}
        />
      </Section>

      <Section
        title="Resumen de registro"
        sub="Datos guardados localmente"
      >

        <div className="summary">

          <Metric
            label="Evaluaciones"
            value={history.length}
          />

          <Metric
            label="Última fecha"
            value={
              history.length
                ?history[history.length-1].date
                :'—'
            }
          />

          <Metric
            label="ID"
            value={d.id||'—'}
          />

          <Metric
            label="Sexo"
            value={d.sex||'—'}
          />

        </div>

      </Section>

    </div>

    <Section title="Acciones rápidas">

      <div className="actiongrid">

        {[
          ['f2','Antropometría','Composición corporal y nutrición'],
          ['f3','Movilidad','Flexibilidad y control'],
          ['f4','Fuerza y potencia','1RM · VMP/VBT · MyJump'],
          ['f5','Velocidad','Metric Sprint 5/10/20 m'],
          ['f6','Agilidad','Photo Finish · cambio de dirección'],
          ['f7','Resistencia','Tests aeróbicos y FC']
        ].map(x=>

          <button
            key={x[0]}
            onClick={()=>go(x[0])}
          >
            <b>{x[1]}</b>
            <span>{x[2]}</span>
          </button>

        )}

      </div>

    </Section>

  </>;
}

/* =========================================================
   PERFIL
   ========================================================= */

function Profile({d,c}){

  const vals=[
    ['Fuerza',d.strengthScore],
    ['Potencia',d.powerScore],
    ['Velocidad',d.speedScore],
    ['Agilidad',d.agilityScore],
    ['Resistencia',d.enduranceScore],
    ['Movilidad',d.mobilityScore]
  ];

  return(

    <div className="profile">

      {vals.map(([k,v])=>

        <div key={k}>

          <span>{k}</span>

          <div className="bar">

            <i
              style={{
                width:`${Math.min(
                  100,
                  n(v)||0
                )}%`
              }}
            />

          </div>

          <b>{v||'—'}</b>

        </div>

      )}

    </div>

  );
}

/* =========================================================
   FICHA 01
   ========================================================= */

function Ficha01({d,set}){

  return <>

    <Section title="1. IDENTIFICACIÓN">

      <div className="fields">

        <Input
          label="ID evaluación"
          value={d.id}
          onChange={v=>set('id',v)}
        />

        <Input
          label="Nombre completo"
          value={d.name}
          onChange={v=>set('name',v)}
        />

        <Input
          label="Fecha"
          value={d.date}
          onChange={v=>set('date',v)}
          type="date"
        />

        <Input
          label="Edad"
          value={d.age}
          onChange={v=>set('age',v)}
        />

        <Select
          label="Sexo"
          value={d.sex}
          onChange={v=>set('sex',v)}
        >
          <option value="">
            Seleccionar
          </option>
          <option value="M">
            Masculino
          </option>
          <option value="F">
            Femenino
          </option>
        </Select>

        <Input
          label="Deporte"
          value={d.sport}
          onChange={v=>set('sport',v)}
        />

        <Input
          label="Categoría"
          value={d.category}
          onChange={v=>set('category',v)}
        />

        <Input
          label="Evaluador"
          value={d.trainer}
          onChange={v=>set('trainer',v)}
        />

      </div>

    </Section>

    <Section title="2. ANTECEDENTES RELEVANTES">

      <div className="fields">

        <Input
          label="Lesiones previas"
          value={d.injuries}
          onChange={v=>set('injuries',v)}
        />

        <Input
          label="Cirugías / intervenciones"
          value={d.surgeries}
          onChange={v=>set('surgeries',v)}
        />

        <Input
          label="Alergias"
          value={d.allergies}
          onChange={v=>set('allergies',v)}
        />

        <Input
          label="Medicamentos"
          value={d.meds}
          onChange={v=>set('meds',v)}
        />

      </div>

      <textarea
        placeholder="Observaciones relevantes"
        value={d.background}
        onChange={e=>
          set('background',e.target.value)
        }
      />

    </Section>

    <Section title="3. HÁBITOS Y ESTILO DE VIDA">

      <div className="fields">

        <Input
          label="Sueño (h)"
          value={d.sleep}
          onChange={v=>set('sleep',v)}
        />

        <Input
          label="Calidad sueño"
          value={d.sleepQuality}
          onChange={v=>set('sleepQuality',v)}
        />

        <Input
          label="Hidratación"
          value={d.hydration}
          onChange={v=>set('hydration',v)}
        />

        <Input
          label="Alimentación"
          value={d.food}
          onChange={v=>set('food',v)}
        />

        <Input
          label="Comidas/día"
          value={d.meals}
          onChange={v=>set('meals',v)}
        />

        <Input
          label="Estrés"
          value={d.stress}
          onChange={v=>set('stress',v)}
        />

        <Input
          label="Pantallas h/día"
          value={d.screens}
          onChange={v=>set('screens',v)}
        />

        <Input
          label="Actividad extra"
          value={d.extra}
          onChange={v=>set('extra',v)}
        />

        <Input
          label="Recuperación"
          value={d.recovery}
          onChange={v=>set('recovery',v)}
        />

      </div>

    </Section>

    <Section title="4. OBJETIVOS">

      <div className="fields">

        <Input
          label="Objetivo principal"
          value={d.objective}
          onChange={v=>set('objective',v)}
        />

        <Select
          label="Plazo"
          value={d.term}
          onChange={v=>set('term',v)}
        >
          <option>1 mes</option>
          <option>3 meses</option>
          <option>6 meses</option>
        </Select>

        <Input
          label="Objetivo específico 1"
          value={d.specific1}
          onChange={v=>set('specific1',v)}
        />

        <Input
          label="Objetivo específico 2"
          value={d.specific2}
          onChange={v=>set('specific2',v)}
        />

      </div>

    </Section>

    <Section title="5. OBSERVACIONES DEL ENTRENADOR">

      <textarea
        value={d.trainerObs}
        onChange={e=>
          set('trainerObs',e.target.value)
        }
        placeholder="Notas del evaluador..."
      />

    </Section>

  </>;
}

/* =========================================================
   FICHA 02
   ========================================================= */

function Ficha02({d,c,set}){

  return <>

    <LinkedAthlete d={d}/>

    <Section
      title="1. MEDIDAS BÁSICAS"
      sub="ISAK Level 1 · registro antropométrico"
    >

      <div className="fields">

        <Input
          label="Peso"
          value={d.weight}
          onChange={v=>set('weight',v)}
        />

        <Input
          label="Talla"
          value={d.height}
          onChange={v=>set('height',v)}
        />

        <Input
          label="% grasa"
          value={d.fat}
          onChange={v=>set('fat',v)}
        />

        <Input
          label="Masa muscular estimada"
          value={d.muscle}
          onChange={v=>set('muscle',v)}
        />

      </div>

      <div className="grid metrics">

        <Metric
          label="IMC"
          value={c.bmi}
          unit="kg/m²"
        />

        <Metric
          label="Masa grasa"
          value={c.fatMass}
          unit="kg"
        />

        <Metric
          label="Masa libre de grasa"
          value={c.lean}
          unit="kg"
        />

        <Metric
          label="% masa muscular"
          value={
            d.muscle&&d.weight
              ?n(d.muscle)/n(d.weight)*100
              :''
          }
          unit="%"
        />

      </div>

    </Section>

    <Section title="2. PERÍMETROS ESENCIALES">

      <div className="fields">

        <Input
          label="Cintura (cm)"
          value={d.waist}
          onChange={v=>set('waist',v)}
        />

        <Input
          label="Cadera (cm)"
          value={d.hip}
          onChange={v=>set('hip',v)}
        />

        <Input
          label="Brazo relajado (cm)"
          value={d.arm}
          onChange={v=>set('arm',v)}
        />

        <Input
          label="Muslo medio (cm)"
          value={d.thigh}
          onChange={v=>set('thigh',v)}
        />

        <Input
          label="Pantorrilla máxima (cm)"
          value={d.calf}
          onChange={v=>set('calf',v)}
        />

      </div>

    </Section>

    <Section
      title="3. PLIEGUES CUTÁNEOS"
      sub="Registrar dos lecturas; el sistema calcula el promedio."
    >

      <Table
        headers={[
          'Sitio',
          'R1 (mm)',
          'R2 (mm)',
          'Promedio'
        ]}
      >

        {[
          'Bíceps',
          'Tríceps',
          'Subescapular',
          'Suprailiaco',
          'Muslo anterior'
        ].map((x,i)=>

          <tr key={x}>

            <td className="rowlabel">
              {x}
            </td>

            <CellInput
              v={d[`sk${i}a`]||''}
              set={v=>
                set(`sk${i}a`,v)
              }
            />

            <CellInput
              v={d[`sk${i}b`]||''}
              set={v=>
                set(`sk${i}b`,v)
              }
            />

            <td>
              {
                avg(
                  d[`sk${i}a`],
                  d[`sk${i}b`]
                )||'—'
              }
            </td>

          </tr>

        )}

      </Table>

      <div className="note">

        Hombres: Durnin & Womersley,
        4 sitios. Mujeres: Jackson-Pollock/Ward,
        3 sitios. El % de grasa queda editable
        para conservar la medición/protocolo utilizado.

      </div>

    </Section>

    <Section title="4. METABOLISMO Y REQUERIMIENTO">

      <div className="grid metrics">

        <Metric
          label="TMB · Mifflin-St Jeor"
          value={c.tmb}
          unit="kcal/día"
        />

        <Metric
          label="GET · factor 1.55"
          value={c.get}
          unit="kcal/día"
        />

        <Metric
          label="Hidratación 35 ml/kg"
          value={c.hydration}
          unit="L/día"
        />

      </div>

      <div className="fields">

        <Input
          label="Calorías objetivo"
          value={d.calTarget}
          onChange={v=>set('calTarget',v)}
        />

        <Input
          label="Proteína (g/kg)"
          value={d.protein}
          onChange={v=>set('protein',v)}
        />

        <Input
          label="Carbohidratos (g/kg)"
          value={d.carbs}
          onChange={v=>set('carbs',v)}
        />

        <Input
          label="Grasas (g/kg)"
          value={d.fats}
          onChange={v=>set('fats',v)}
        />

      </div>

    </Section>

    <Section title="5. NUTRICIÓN DEPORTIVA">

      <textarea
        value={d.nutrition}
        onChange={e=>
          set('nutrition',e.target.value)
        }
        placeholder="Recomendaciones individualizadas..."
      />

    </Section>

  </>;
}

/* =========================================================
   FICHA 03
   ========================================================= */

function Ficha03({d,c,set}){

  const mob=[
    ['Tobillo – rodilla a la pared','ankleD','ankleI','cm'],
    ['Cadera – flexión','hipFlexD','hipFlexI','°'],
    ['Cadera – rotación interna','hipRotInD','hipRotInI','°'],
    ['Cadera – rotación externa','hipRotOutD','hipRotOutI','°'],
    ['Hombro – rotación externa','shoulderOutD','shoulderOutI','°'],
    ['Hombro – rotación interna','shoulderInD','shoulderInI','nivel']
  ];

  return <>

    <LinkedAthlete d={d}/>

    <Section title="1. MOVILIDAD ARTICULAR">

      <Table
        headers={[
          'Prueba',
          'Derecha',
          'Izquierda',
          'Asimetría %',
          'Unidad'
        ]}
      >

        {mob.map(x=>

          <tr key={x[0]}>

            <td className="rowlabel">
              {x[0]}
            </td>

            <CellInput
              v={d[x[1]]}
              set={v=>set(x[1],v)}
            />

            <CellInput
              v={d[x[2]]}
              set={v=>set(x[2],v)}
            />

            <td>
              {
                asym(
                  d[x[1]],
                  d[x[2]]
                )!==''
                  ?asym(
                    d[x[1]],
                    d[x[2]]
                  ).toFixed(1)+'%'
                  :'—'
              }
            </td>

            <td>{x[3]}</td>

          </tr>

        )}

      </Table>

    </Section>

    <Section title="2. FLEXIBILIDAD">

      <div className="fields">

        <Input
          label="Sit & Reach (cm)"
          value={d.sitReach}
          onChange={v=>set('sitReach',v)}
        />

        <Input
          label="Test de Ely"
          value={d.ely}
          onChange={v=>set('ely',v)}
        />

        <Input
          label="Aductores (°)"
          value={d.adductors}
          onChange={v=>set('adductors',v)}
        />

        <Input
          label="Pectoral (cm)"
          value={d.pectoral}
          onChange={v=>set('pectoral',v)}
        />

      </div>

    </Section>

    <Section title="3. CONTROL DEL MOVIMIENTO">

      <Table
        headers={[
          'Prueba',
          'Resultado',
          'Escala / unidad',
          'Calidad'
        ]}
      >

        <tr>
          <td>Deep Squat</td>

          <CellInput
            v={d.deepSquat}
            set={v=>set('deepSquat',v)}
          />

          <td>0–3</td>

          <td>
            {level3(d.deepSquat)}
          </td>
        </tr>

        <tr>
          <td>In-Line Lunge</td>

          <CellInput
            v={d.lunge}
            set={v=>set('lunge',v)}
          />

          <td>0–3</td>

          <td>
            {level3(d.lunge)}
          </td>
        </tr>

        <tr>
          <td>Plancha frontal</td>

          <CellInput
            v={d.plank}
            set={v=>set('plank',v)}
          />

          <td>seg</td>

          <td>
            {n(d.plank)
              ?'Registrado'
              :'—'}
          </td>
        </tr>

      </Table>

    </Section>

    <Section title="4. CONCLUSIÓN FUNCIONAL">

      <textarea
        value={d.mobilityObs}
        onChange={e=>
          set('mobilityObs',e.target.value)
        }
        placeholder="Interpretación funcional y prioridades..."
      />

    </Section>

  </>;
}

function level3(v){

  const x=n(v);

  return x===null
    ?'—'
    :x>=3
      ?'Adecuado'
      :x>=2
        ?'Vigilar'
        :'Prioridad';
}

/* =========================================================
   FICHA 04
   ========================================================= */

function Ficha04({d,c,set}){

  const ex=[
    ['Sentadilla','sq1rm'],
    ['Peso muerto','dead1rm'],
    ['Press banca','bench1rm'],
    ['Press militar','ohp1rm'],
    ['Dominadas','pull1rm']
  ];

  const vb=[
    ['Sentadilla','vbtSq'],
    ['Press banca','vbtBench'],
    ['Peso muerto','vbtDead'],
    ['Press militar','vbtOHP']
  ];

  const jumps=[
    ['SJ','sj'],
    ['CMJ','cmj'],
    ['ABK','abk'],
    ['Drop Jump','drop'],
    ['Unilateral D','uniD'],
    ['Unilateral I','uniI']
  ];

  return <>

    <LinkedAthlete d={d}/>

    <Section title="1. FUERZA MÁXIMA · 1RM">

      <Table
        headers={[
          'Ejercicio',
          '1RM kg',
          '% peso corporal',
          'Observación'
        ]}
      >

        {ex.map(x=>

          <tr key={x[1]}>

            <td className="rowlabel">
              {x[0]}
            </td>

            <CellInput
              v={d[x[1]]}
              set={v=>set(x[1],v)}
            />

            <td>
              {
                d.weight&&d[x[1]]
                  ?(
                    n(d[x[1]])/
                    n(d.weight)*100
                   ).toFixed(1)+'%'
                  :'—'
              }
            </td>

            <td>—</td>

          </tr>

        )}

      </Table>

    </Section>

    <Section
      title="2. VELOCIDAD DE MOVIMIENTO · VBT/VMP"
      sub="VMP = velocidad media propulsiva. Registrar tres intentos por ejercicio."
    >

      <Table
        headers={[
          'Ejercicio',
          'Carga kg',
          'VMP 1',
          'VMP 2',
          'VMP 3',
          'Media',
          'Pérdida %',
          'Mejor'
        ]}
      >

        {vb.map(x=>{

          const k=x[1];

          const a=[
            `${k}1`,
            `${k}2`,
            `${k}3`
          ];

          const key=
            k==='vbtSq'
              ?'sq'
              :k==='vbtBench'
                ?'bench'
                :k==='vbtDead'
                  ?'dead'
                  :'ohp';

          return(

            <tr key={k}>

              <td className="rowlabel">
                {x[0]}
              </td>

              <CellInput
                v={d[k+'Load']}
                set={v=>
                  set(k+'Load',v)
                }
              />

              <CellInput
                v={d[a[0]]}
                set={v=>
                  set(a[0],v)
                }
              />

              <CellInput
                v={d[a[1]]}
                set={v=>
                  set(a[1],v)
                }
              />

              <CellInput
                v={d[a[2]]}
                set={v=>
                  set(a[2],v)
                }
              />

              <td>
                {
                  c.vbt[key]!==''
                    ?c.vbt[key].toFixed(2)
                    :'—'
                }
              </td>

              <td>
                {
                  c.vbtLoss[key]!==''
                    ?c.vbtLoss[key].toFixed(1)+'%'
                    :'—'
                }
              </td>

              <td>
                {
                  max(
                    d[a[0]],
                    d[a[1]],
                    d[a[2]]
                  )||'—'
                }
              </td>

            </tr>

          );

        })}

      </Table>

      <div className="note">

        Pérdida de velocidad =
        (VMP inicial − VMP final) /
        VMP inicial × 100.

        VBT corresponde al método/tecnología
        basada en velocidad y VMP a la velocidad
        media propulsiva.

      </div>

    </Section>

    <Section title="3. SALTOS · MYJUMP">

      <Table
        headers={[
          'Prueba',
          'I1',
          'I2',
          'I3',
          'MEJOR cm'
        ]}
      >

        {jumps.map(x=>

          <tr key={x[1]}>

            <td className="rowlabel">
              {x[0]}
            </td>

            {[1,2,3].map(i=>

              <CellInput
                key={i}
                v={d[x[1]+i]}
                set={v=>
                  set(x[1]+i,v)
                }
              />

            )}

            <td>
              {c[x[1]]||'—'}
            </td>

          </tr>

        )}

      </Table>

    </Section>

    <Section title="4. PERFIL NEUROMUSCULAR">

      <div className="grid metrics">

        <Metric
          label="IE · Aprovechamiento elástico"
          value={c.ie}
          unit="%"
        />

        <Metric
          label="IB · Aporte de brazos"
          value={c.ib}
          unit="%"
        />

        <Metric
          label="Asimetría unilateral"
          value={c.ua}
          unit="%"
        />

        <Metric
          label="Fuerza relativa"
          value={c.rel}
          unit="× peso"
        />

      </div>

    </Section>

    <Section title="5. POTENCIA · TREN SUPERIOR">

      <Table
        headers={[
          'Prueba',
          'I1 m',
          'I2',
          'I3',
          'MEJOR m'
        ]}
      >

        {[
          ['Balón medicinal – pecho','medChest'],
          ['Balón medicinal – detrás','medBehind']
        ].map(x=>

          <tr key={x[1]}>

            <td className="rowlabel">
              {x[0]}
            </td>

            {[1,2,3].map(i=>

              <CellInput
                key={i}
                v={d[x[1]+i]}
                set={v=>
                  set(x[1]+i,v)
                }
              />

            )}

            <td>
              {
                max(
                  d[x[1]+'1'],
                  d[x[1]+'2'],
                  d[x[1]+'3']
                )||'—'
              }
            </td>

          </tr>

        )}

      </Table>

    </Section>

  </>;
}

/* =========================================================
   FICHA 05
   ========================================================= */

function Ficha05({d,c,set}){

  const rows=[
    ['5 m','s5'],
    ['10 m','s10'],
    ['20 m','s20']
  ];

  return <>

    <LinkedAthlete d={d}/>

    <Section
      title="1. TEST DE SPRINT · METRIC SPRINT"
      sub="Alcance ARSPORT: 5, 10 y 20 metros."
    >

      <Table
        headers={[
          'Distancia',
          'I1 s',
          'I2',
          'I3',
          'MEJOR s',
          'Vel. media m/s'
        ]}
      >

        {rows.map(x=>

          <tr key={x[1]}>

            <td className="rowlabel">
              {x[0]}
            </td>

            {[1,2,3].map(i=>

              <CellInput
                key={i}
                v={d[x[1]+'_'+i]}
                set={v=>
                  set(x[1]+'_'+i,v)
                }
              />

            )}

            <td>
              {c[x[1]]||'—'}
            </td>

            <td>
              {
                c[
                  x[1].replace('s','v')
                ]
                  ?c[
                    x[1].replace('s','v')
                   ].toFixed(2)
                  :'—'
              }
            </td>

          </tr>

        )}

      </Table>

    </Section>

    <Section title="2. INDICADORES">

      <div className="grid metrics">

        <Metric
          label="Velocidad 5 m"
          value={c.v5}
          unit="m/s"
        />

        <Metric
          label="Velocidad 10 m"
          value={c.v10}
          unit="m/s"
        />

        <Metric
          label="Velocidad 20 m"
          value={c.v20}
          unit="m/s"
        />

      </div>

    </Section>

    <Section title="3. PROGRESIÓN">

      <Table
        headers={[
          'Distancia',
          'Anterior',
          'Actual',
          'Mejora %'
        ]}
      >

        {[
          ['5 m','s5'],
          ['10 m','s10'],
          ['20 m','s20']
        ].map(x=>{

          const p=
            previous?.calc?.[x[1]];

          return(

            <tr key={x[1]}>

              <td className="rowlabel">
                {x[0]}
              </td>

              <td>{p??'—'}</td>

              <td>
                {c[x[1]]||'—'}
              </td>

              <td>
                {
                  p&&c[x[1]]
                    ?pct(
                      p,
                      c[x[1]]
                    ).toFixed(1)+'%'
                    :'—'
                }
              </td>

            </tr>

          );

        })}

      </Table>

    </Section>

    <Section title="4. PERFIL">

      <div className="fields">

        <Input
          label="Puntuación velocidad"
          value={d.speedScore}
          onChange={v=>
            set('speedScore',v)
          }
        />

        <textarea
          value={d.speedObs}
          onChange={e=>
            set('speedObs',e.target.value)
          }
          placeholder="Observaciones"
        />

      </div>

    </Section>

  </>;
}

/* =========================================================
   FICHA 06
   ========================================================= */

function Ficha06({d,c,set}){

  const rows=[
    ['Derecha','changeD'],
    ['Izquierda','changeI']
  ];

  const turns=[
    ['Derecha','turnD'],
    ['Izquierda','turnI']
  ];

  return <>

    <LinkedAthlete d={d}/>

    <Section
      title="1. CAMBIO DE DIRECCIÓN · PHOTO FINISH"
      sub="Registro bilateral y análisis de simetría."
    >

      <Table
        headers={[
          'Dirección',
          'I1 s',
          'I2',
          'I3',
          'MEJOR s',
          'Observación'
        ]}
      >

        {rows.map(x=>

          <tr key={x[1]}>

            <td className="rowlabel">
              {x[0]}
            </td>

            {[1,2,3].map(i=>

              <CellInput
                key={i}
                v={d[x[1]+i]}
                set={v=>
                  set(x[1]+i,v)
                }
              />

            )}

            <td>
              {c[x[1]]||'—'}
            </td>

            <td>—</td>

          </tr>

        )}

      </Table>

    </Section>

    <Section title="2. GIRO 180°">

      <Table
        headers={[
          'Dirección',
          'I1 s',
          'I2',
          'I3',
          'MEJOR s'
        ]}
      >

        {turns.map(x=>

          <tr key={x[1]}>

            <td className="rowlabel">
              {x[0]}
            </td>

            {[1,2,3].map(i=>

              <CellInput
                key={i}
                v={d[x[1]+i]}
                set={v=>
                  set(x[1]+i,v)
                }
              />

            )}

            <td>
              {c[x[1]]||'—'}
            </td>

          </tr>

        )}

      </Table>

    </Section>

    <Section title="3. ANÁLISIS">

      <div className="grid metrics">

        <Metric
          label="Mejor derecha"
          value={c.cD}
          unit="s"
        />

        <Metric
          label="Mejor izquierda"
          value={c.cI}
          unit="s"
        />

        <Metric
          label="Asimetría"
          value={c.cAs}
          unit="%"
        />

        <Metric
          label="Giro 180° D/I"
          value={
            c.tD&&c.tI
              ?`${c.tD.toFixed(2)} / ${c.tI.toFixed(2)}`
              :'—'
          }
          unit="s"
        />

      </div>

      <div className="fields">

        <Input
          label="Puntuación agilidad"
          value={d.agilityScore}
          onChange={v=>
            set('agilityScore',v)
          }
        />

        <textarea
          value={d.agilityObs}
          onChange={e=>
            set('agilityObs',e.target.value)
          }
          placeholder="Observaciones y prioridad de entrenamiento"
        />

      </div>

    </Section>

  </>;
}

/* =========================================================
   FICHA 07
   ========================================================= */

function Ficha07({d,c,set}){

  return <>

    <LinkedAthlete d={d}/>

    <Section title="1. SELECCIÓN DEL TEST">

      <div className="fields">

        <Select
          label="Test aplicado"
          value={d.enduranceTest}
          onChange={v=>
            set('enduranceTest',v)
          }
        >
          <option>Yo-Yo IR1</option>
          <option>30-15 IFT</option>
          <option>Course Navette</option>
          <option>Cooper 12 min</option>
        </Select>

        <Input
          label="Nivel alcanzado"
          value={d.endLevel}
          onChange={v=>
            set('endLevel',v)
          }
        />

        <Input
          label="Distancia total (m)"
          value={d.endDistance}
          onChange={v=>
            set('endDistance',v)
          }
        />

        <Input
          label="Velocidad final (km/h)"
          value={d.endSpeed}
          onChange={v=>
            set('endSpeed',v)
          }
        />

        <Input
          label="VO₂máx estimado"
          value={d.vo2}
          onChange={v=>
            set('vo2',v)
          }
        />

      </div>

    </Section>

    <Section title="2. FRECUENCIA CARDÍACA Y RECUPERACIÓN">

      <Table
        headers={[
          'FC reposo',
          'FC post',
          'FC 1 min',
          'FC 2 min',
          'Δ 1 min',
          'Δ 2 min'
        ]}
      >

        <tr>

          <CellInput
            v={d.hrRest}
            set={v=>set('hrRest',v)}
          />

          <CellInput
            v={d.hrPost}
            set={v=>set('hrPost',v)}
          />

          <CellInput
            v={d.hr1}
            set={v=>set('hr1',v)}
          />

          <CellInput
            v={d.hr2}
            set={v=>set('hr2',v)}
          />

          <td>
            {c.hrRec||'—'}
          </td>

          <td>
            {
              n(d.hrPost)!==null&&
              n(d.hr2)!==null
                ?n(d.hrPost)-n(d.hr2)
                :'—'
            }
          </td>

        </tr>

      </Table>

    </Section>

    <Section title="3. PERFIL DE RESISTENCIA ARSPORT">

      <div className="grid metrics">

        <Metric
          label="Capacidad aeróbica"
          value={d.vo2}
          unit="ml/kg/min"
        />

        <Metric
          label="Resistencia intermitente"
          value={d.endLevel}
        />

        <Metric
          label="Velocidad aeróbica"
          value={d.endSpeed}
          unit="km/h"
        />

        <Metric
          label="Recuperación FC"
          value={c.hrRec}
          unit="lpm"
        />

      </div>

      <div className="fields">

        <Input
          label="Puntuación resistencia"
          value={d.enduranceScore}
          onChange={v=>
            set('enduranceScore',v)
          }
        />

        <Input
          label="Tolerancia al esfuerzo"
          value={d.endTolerance}
          onChange={v=>
            set('endTolerance',v)
          }
        />

        <textarea
          value={d.endObs}
          onChange={e=>
            set('endObs',e.target.value)
          }
          placeholder="Comentarios del test"
        />

      </div>

    </Section>

  </>;
}

/* =========================================================
   FICHA 08
   ========================================================= */

function Ficha08({
  d,
  c,
  set,
  previous
}){

  const rows=[
    ['Fuerza',d.strengthScore],
    ['Potencia',d.powerScore],
    ['Velocidad',d.speedScore],
    ['Agilidad',d.agilityScore],
    ['Resistencia',d.enduranceScore],
    ['Movilidad',d.mobilityScore]
  ];

  return <>

    <Section
      title="1. IDENTIFICACIÓN"
      sub="Datos vinculados automáticamente desde la Ficha 01."
    >

      <LinkedAthlete d={d}/>

    </Section>

    <Section title="2. RESULTADOS PRINCIPALES">

      <Table
        headers={[
          'Área',
          'Resultado',
          'Unidad',
          'Lectura'
        ]}
      >

        <tr>
          <td>Fuerza – Sentadilla</td>
          <td>{d.sq1rm||'—'}</td>
          <td>kg</td>
          <td>Fuerza máxima</td>
        </tr>

        <tr>
          <td>Potencia – CMJ</td>
          <td>{c.cmj||'—'}</td>
          <td>cm</td>
          <td>Salto vertical</td>
        </tr>

        <tr>
          <td>Velocidad – 20 m</td>
          <td>{c.s20||'—'}</td>
          <td>s</td>
          <td>Sprint corto</td>
        </tr>

        <tr>
          <td>Agilidad – cambio D/I</td>
          <td>
            {
              c.cD&&c.cI
                ?`${c.cD.toFixed(2)} / ${c.cI.toFixed(2)}`
                :'—'
            }
          </td>
          <td>s</td>
          <td>Cambio de dirección</td>
        </tr>

        <tr>
          <td>
            Resistencia – {d.enduranceTest}
          </td>
          <td>
            {d.endLevel||'—'}
          </td>
          <td>nivel</td>
          <td>Capacidad aeróbica</td>
        </tr>

      </Table>

    </Section>

    <Section title="3. PERFIL ARSPORT">

      <Table
        headers={[
          'Capacidad',
          'Puntuación',
          'Nivel',
          'Prioridad'
        ]}
      >

        {rows.map(x=>{

          const key=
            x[0].toLowerCase()+
            'Score';

          return(

            <tr key={x[0]}>

              <td className="rowlabel">
                {x[0]}
              </td>

              <CellInput
                v={x[1]}
                set={v=>
                  set(key,v)
                }
              />

              <td>
                {scoreLevel(x[1])}
              </td>

              <td>
                {
                  scoreLevel(x[1])==='PRIORIDAD'
                    ?'Mejorar'
                    :'Mantener / desarrollar'
                }
              </td>

            </tr>

          );

        })}

      </Table>

    </Section>

    <Section
      title="4. FORTALEZAS / 5. PRIORIDADES / 6. PLAN DE ACCIÓN"
    >

      <textarea
        value={d.reportNotes}
        onChange={e=>
          set('reportNotes',e.target.value)
        }
        placeholder="Fortalezas, prioridades y acciones concretas..."
      />

      <Input
        label="Plan de acción"
        value={d.actionPlan}
        onChange={v=>
          set('actionPlan',v)
        }
      />

      <Select
        label="Plazo objetivo"
        value={d.term}
        onChange={v=>
          set('term',v)
        }
      >
        <option>1 mes</option>
        <option>3 meses</option>
        <option>6 meses</option>
      </Select>

    </Section>

    <Section title="7. EVOLUCIÓN">

      <Table
        headers={[
          'Capacidad',
          'Anterior',
          'Actual',
          'Cambio %',
          'Tendencia'
        ]}
      >

        {rows.map(x=>{

          const key=
            x[0].toLowerCase()+
            'Score';

          const p=
            previous?.[key];

          return(

            <tr key={x[0]}>

              <td>{x[0]}</td>

              <td>
                {p??'—'}
              </td>

              <td>
                {x[1]||'—'}
              </td>

              <td>
                {
                  p&&x[1]
                    ?pct(
                      x[1],
                      p
                    ).toFixed(1)+'%'
                    :'—'
                }
              </td>

              <td>
                {
                  p&&x[1]
                    ?(
                      n(x[1])>n(p)
                        ?'MEJORA'
                        :n(x[1])<n(p)
                          ?'REVISAR'
                          :'ESTABLE'
                     )
                    :'—'
                }
              </td>

            </tr>

          );

        })}

      </Table>

    </Section>

    <div className="quote">

      TU RESULTADO NO ES EL FINAL.<br/>

      <b>
        ES EL PUNTO DE PARTIDA PARA MEJORAR.
      </b>

      <br/>

      <span>
        EVALUAR • ENTRENAR • EVOLUCIONAR
      </span>

    </div>

  </>;
}

function scoreLevel(v){

  const x=n(v);

  return x===null
    ?'—'
    :x>=85
      ?'ALTO'
      :x>=70
        ?'ADECUADO'
        :'PRIORIDAD';

}

/* =========================================================
   HISTORIAL
   ========================================================= */

function History({
  history,
  setD
}){

  return(

    <Section
      title="HISTORIAL DE EVALUACIONES"
      sub="Cada guardado conserva una evaluación. Selecciona una fila para cargarla."
    >

      <div className="toolbar">

        <b>
          {history.length} evaluaciones
        </b>

        <button
          onClick={()=>{
            const b=
              new Blob(
                [
                  JSON.stringify(
                    history,
                    null,
                    2
                  )
                ],
                {
                  type:'application/json'
                }
              );

            const a=
              document.createElement('a');

            a.href=
              URL.createObjectURL(b);

            a.download=
              'arsport-historial.json';

            a.click();

          }}
        >
          Exportar respaldo JSON
        </button>

      </div>

      <Table
        headers={[
          'Fecha',
          'ID',
          'Deportista',
          'Deporte',
          'Sentadilla',
          'CMJ',
          '20 m',
          'Asimetría',
          'Test resistencia'
        ]}
      >

        {history
          .slice()
          .reverse()
          .map((x,i)=>

            <tr
              key={i}
              onClick={()=>
                setD({
                  ...empty,
                  ...x
                })
              }
              className="clickrow"
            >

              <td>{x.date}</td>
              <td>{x.id}</td>
              <td>{x.name||'—'}</td>
              <td>{x.sport||'—'}</td>
              <td>{x.sq1rm||'—'}</td>
              <td>{x.calc?.cmj||'—'}</td>
              <td>{x.calc?.s20||'—'}</td>

              <td>
                {
                  x.calc?.cAs
                    ?x.calc.cAs.toFixed(1)+'%'
                    :'—'
                }
              </td>

              <td>
                {x.enduranceTest}
              </td>

            </tr>

          )}

      </Table>

    </Section>

  );
}

/* =========================================================
   PROGRESIÓN
   ========================================================= */

function Progress({
  d,
  c,
  previous
}){

  const data=[
    ['Fuerza',previous?.sq1rm,d.sq1rm],
    ['Potencia',previous?.calc?.cmj,c.cmj],
    ['Velocidad',previous?.calc?.s20,c.s20],
    ['Agilidad',previous?.calc?.cD,c.cD],
    ['Resistencia',previous?.vo2,d.vo2],
    ['Movilidad',previous?.mobilityScore,d.mobilityScore]
  ];

  return <>

    <Section
      title="PROGRESIÓN DEL DEPORTISTA"
      sub="Compara la evaluación anterior con la actual."
    >

      <div className="progresscards">

        {data.map(x=>{

          const ch=
            x[1]&&x[2]
              ?pct(x[2],x[1])
              :null;

          return(

            <div
              className="pcard"
              key={x[0]}
            >

              <span>{x[0]}</span>

              <strong>
                {x[2]||'—'}
              </strong>

              <small>
                Anterior: {x[1]||'—'}
              </small>

              <b
                className={
                  ch>0
                    ?'up'
                    :ch<0
                      ?'down'
                      :''
                }
              >
                {
                  ch===null
                    ?'—'
                    :(ch>0?'+':'')+
                     ch.toFixed(1)+'%'
                }
              </b>

            </div>

          );

        })}

      </div>

    </Section>

    <Section title="LECTURA">

      <div className="note">

        La dirección de mejora depende de la variable:
        en fuerza, potencia y puntuaciones mayores
        suele ser mejor; en tiempos de sprint y cambio
        de dirección, menor tiempo es mejor.

      </div>

    </Section>

  </>;
}

/* =========================================================
   GUÍA
   ========================================================= */

function Guide(){

  return <>

    <Section title="GUÍA DE USO · ARSPORT">

      <div className="guide">

        <h4>Flujo recomendado</h4>

        <ol>

          <li>
            Crear una nueva evaluación
            y completar Ficha 01.
          </li>

          <li>
            Registrar antropometría
            en Ficha 02.
          </li>

          <li>
            Completar movilidad,
            fuerza/potencia, velocidad,
            agilidad y resistencia.
          </li>

          <li>
            Guardar la evaluación.
            El historial conserva cada fecha.
          </li>

          <li>
            Usar Progresión para comparar
            y Ficha 08 para el informe.
          </li>

        </ol>

        <h4>Reglas del sistema</h4>

        <ul>

          <li>
            Varios intentos: conservar todos
            y usar el mejor cuando corresponda.
          </li>

          <li>
            Asimetría bilateral:
            |D−I| / Mayor × 100.
          </li>

          <li>
            Deep Squat e In-Line Lunge:
            escala interna 0–3.
          </li>

          <li>
            No interpretar un valor aislado
            como diagnóstico.
          </li>

          <li>
            Si existe dolor o limitación importante,
            derivar a profesional sanitario.
          </li>

        </ul>

        <h4>Compatibilidad</h4>

        <p>
          Esta versión utiliza Next.js sin VBA,
          macros ni dependencias externas de UI.
          Los datos se conservan en el navegador
          mediante localStorage y pueden respaldarse
          en JSON. Está diseñada para iPad y escritorio.
        </p>

      </div>

    </Section>

  </>;

}

export default App;
