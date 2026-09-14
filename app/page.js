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

const today=()=>new Date().toISOString().slice(0,10);

const newId=()=>{
  return `ARS-${String(Date.now()).slice(-6)}`;
};

const empty={
  id:'',
  name:'',
  date:today(),
  birthDate:'',
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

const velocityLoss=(first,last)=>{
  const a=n(first);
  const b=n(last);

  return a!==null&&b!==null&&a!==0
    ?(a-b)/a*100
    :'';
};

function ageFromBirthDate(birth,date=today()){

  if(!birth) return '';

  const b=new Date(`${birth}T00:00:00`);
  const d=new Date(`${date||today()}T00:00:00`);

  if(
    Number.isNaN(b.getTime())||
    Number.isNaN(d.getTime())||
    b>d
  ){
    return '';
  }

  let age=
    d.getFullYear()-
    b.getFullYear();

  const before=
    d.getMonth()<b.getMonth()||
    (
      d.getMonth()===b.getMonth()&&
      d.getDate()<b.getDate()
    );

  if(before) age--;

  return age>=0?age:'';
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
    sq:avg(
      d.vbtSq1,
      d.vbtSq2,
      d.vbtSq3
    ),

    bench:avg(
      d.vbtBench1,
      d.vbtBench2,
      d.vbtBench3
    ),

    dead:avg(
      d.vbtDead1,
      d.vbtDead2,
      d.vbtDead3
    ),

    ohp:avg(
      d.vbtOHP1,
      d.vbtOHP2,
      d.vbtOHP3
    )
  };

  const vbtLoss={
    sq:velocityLoss(
      d.vbtSq1,
      d.vbtSq3
    ),

    bench:velocityLoss(
      d.vbtBench1,
      d.vbtBench3
    ),

    dead:velocityLoss(
      d.vbtDead1,
      d.vbtDead3
    ),

    ohp:velocityLoss(
      d.vbtOHP1,
      d.vbtOHP3
    )
  };

  const sj=max(
    d.sj1,
    d.sj2,
    d.sj3
  );

  const cmj=max(
    d.cmj1,
    d.cmj2,
    d.cmj3
  );

  const abk=max(
    d.abk1,
    d.abk2,
    d.abk3
  );

  const drop=max(
    d.drop1,
    d.drop2,
    d.drop3
  );

  const ud=max(
    d.uniD1,
    d.uniD2,
    d.uniD3
  );

  const ui=max(
    d.uniI1,
    d.uniI2,
    d.uniI3
  );

  const ie=
    sj&&cmj
      ?(cmj-sj)/sj*100
      :'';

  const ib=
    cmj&&abk
      ?(abk-cmj)/cmj*100
      :'';

  const ua=asym(
    ud,
    ui
  );

  const rel=
    w&&n(d.sq1rm)
      ?n(d.sq1rm)/w
      :'';

  const s5=best(
    d.s5_1,
    d.s5_2,
    d.s5_3
  );

  const s10=best(
    d.s10_1,
    d.s10_2,
    d.s10_3
  );

  const s20=best(
    d.s20_1,
    d.s20_2,
    d.s20_3
  );

  const v5=
    s5
      ?5/s5
      :'';

  const v10=
    s10
      ?10/s10
      :'';

  const v20=
    s20
      ?20/s20
      :'';

  const cD=best(
    d.changeD1,
    d.changeD2,
    d.changeD3
  );

  const cI=best(
    d.changeI1,
    d.changeI2,
    d.changeI3
  );

  const cAs=asym(
    cD,
    cI
  );

  const tD=best(
    d.turnD1,
    d.turnD2,
    d.turnD3
  );

  const tI=best(
    d.turnI1,
    d.turnI2,
    d.turnI3
  );

  const hrRec=
    n(d.hrPost)!==null&&
    n(d.hr1)!==null
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

/* =========================================================
   COMPONENTES
   ========================================================= */

function Input({
  label,
  value,
  onChange,
  type='text',
  step,
  min,
  max,
  readOnly=false
}){

  return(
    <label className="field">

      <span>{label}</span>

      <input
        value={value??''}
        onChange={e=>onChange(e.target.value)}
        type={type}
        step={step}
        min={min}
        max={max}
        readOnly={readOnly}
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

function Textarea({
  label,
  value,
  onChange,
  placeholder
}){

  return(
    <label className="field full">

      <span>{label}</span>

      <textarea
        value={value??''}
        onChange={e=>onChange(e.target.value)}
        placeholder={placeholder}
      />

    </label>
  );
}

/* =========================================================
   SECCIÓN CON FLECHA
   ========================================================= */

function Section({
  title,
  sub,
  children,
  defaultOpen=true
}){

  const[
    open,
    setOpen
  ]=useState(defaultOpen);

  return(

    <section className="section">

      <button
        type="button"
        className="sectitle"
        onClick={()=>setOpen(v=>!v)}
      >

        <div>

          <h3>{title}</h3>

          {sub&&
            <small>
              {sub}
            </small>
          }

        </div>

        <b className="chevron">
          {open?'⌃':'⌄'}
        </b>

      </button>

      {open&&
        <div className="sectionbody">
          {children}
        </div>
      }

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

            {headers.map(h=>
              <th key={h}>
                {h}
              </th>
            )}

          </tr>

        </thead>

        <tbody>
          {children}
        </tbody>

      </table>

    </div>

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
        onChange={e=>
          set(e.target.value)
        }
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

      <span>
        {label}
      </span>

      <strong>

        {
          value!==''&&
          value!==null

            ?typeof value==='number'
              ?value.toFixed(2)
              :value

            :'—'
        }

      </strong>

      {unit&&
        <small>
          {unit}
        </small>
      }

    </div>

  );
}

/* =========================================================
   DATOS VINCULADOS
   ========================================================= */

function LinkedAthlete({d}){

  return(

    <div
      className="linked-athlete"
      style={{
        display:'grid',
        gridTemplateColumns:
          '2fr repeat(6,1fr)',
        gap:10,
        alignItems:'center',
        padding:'14px 16px',
        border:'1px solid #ddd',
        borderLeft:
          '5px solid #f2cc00',
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

        <strong
          style={{
            fontSize:16
          }}
        >
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

  const[
    page,
    setPage
  ]=useState('dashboard');

  const[
    d,
    setD
  ]=useState({
    ...empty,
    id:newId()
  });

  const[
    history,
    setHistory
  ]=useState([]);

  const[
    loaded,
    setLoaded
  ]=useState(false);

  useEffect(()=>{

    try{

      const h=
        JSON.parse(
          localStorage.getItem(
            'arsport-evals'
          )||'[]'
        );

      setHistory(
        Array.isArray(h)
          ?h
          :[]
      );

      const cur=
        JSON.parse(
          localStorage.getItem(
            'arsport-current'
          )||'null'
        );

      if(cur){

        setD({
          ...empty,
          ...cur,
          id:cur.id||newId()
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

  },[
    d,
    loaded
  ]);

  const c=
    useMemo(
      ()=>calc(d),
      [d]
    );

  const set=(
    key,
    value
  )=>{

    setD(
      x=>({
        ...x,
        [key]:value
      })
    );

  };

  const reset=()=>{

    setD({
      ...empty,
      id:newId(),
      date:today()
    });

    setPage('f1');

  };

  const save=()=>{

    if(!d.name.trim()){

      alert(
        'Completa el nombre del deportista en Ficha 01.'
      );

      setPage('f1');

      return;
    }

    const rec={
      ...d,
      calc:c,
      savedAt:
        new Date().toISOString()
    };

    const arr=[
      ...history.filter(
        x=>!(
          x.id===d.id&&
          x.date===d.date
        )
      ),
      rec
    ];

    setHistory(arr);

    localStorage.setItem(
      'arsport-evals',
      JSON.stringify(arr)
    );

    alert(
      'Evaluación guardada correctamente.'
    );

  };

  const previousBeforeCurrent=
    useMemo(()=>{

      const a=
        history
          .filter(
            x=>x.id===d.id
          )
          .sort(
            (x,y)=>
              (x.date||'')
                .localeCompare(
                  y.date||''
                )||
              (x.savedAt||'')
                .localeCompare(
                  y.savedAt||''
                )
          );

      return a.length>1
        ?a[a.length-2]
        :null;

    },[
      history,
      d.id
    ]);

  const title=
    areas.find(
      x=>x[0]===page
    )?.[1]||
    'Dashboard';

  return(

    <div className="app">

      <aside className="sidebar">

        <div className="brand">

          <b>
            ARSPORT
          </b>

          <span>
            CENTRO DE ENTRENAMIENTO
          </span>

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

              <i>
                {a[2]}
              </i>

              {a[1]}

            </button>

          ))}

        </nav>

        <div className="sidefoot">

          Sistema Integral
          <br/>
          Evaluación Deportiva

        </div>

      </aside>

      <main>

        <header>

          <div>

            <span className="eyebrow">
              ARSPORT / {title.toUpperCase()}
            </span>

            <h1>
              {title}
            </h1>

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

            <button
              onClick={()=>
                window.print()
              }
            >
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
              {d.id||'Sin ID'}
              {' · '}
              {d.sport||'Sin deporte'}
              {' · '}
              {d.category||'Sin categoría'}
            </span>

          </div>

          <div className="status">

            <span>
              Estado
            </span>

            <b>
              {
                d.name
                  ?'En evaluación'
                  :'Nuevo registro'
              }
            </b>

          </div>

        </div>

        {page==='dashboard'&&
          <Dashboard
            d={d}
            c={c}
            history={history}
            go={setPage}
          />
        }

        {page==='f1'&&
          <Ficha01
            d={d}
            set={set}
            go={setPage}
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
            previous={
              previousBeforeCurrent
            }
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
            previous={
              previousBeforeCurrent
            }
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
            previous={
              previousBeforeCurrent
            }
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
          Controla el rendimiento.
          {' '}
          <em>
            Demuestra la evolución.
          </em>
        </h2>

        <p>
          Registra las ocho fichas,
          conserva cada evaluación
          y compara el progreso del deportista.
        </p>

        <div className="quick">

          <button
            onClick={()=>
              go('f1')
            }
          >
            Datos del deportista →
          </button>

          <button
            onClick={()=>
              go('f4')
            }
          >
            Evaluar fuerza/potencia →
          </button>

          <button
            onClick={()=>
              go('f8')
            }
          >
            Generar informe →
          </button>

        </div>

      </div>

      <div className="heroMark">

        ARS
        <br/>

        <b>
          SPORT
        </b>

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
        sub="Puntuaciones registradas"
      >

        <Profile d={d}/>

      </Section>

      <Section
        title="Resumen de registro"
        sub="Información actual"
      >

        <div className="summary">

          <Metric
            label="Evaluaciones"
            value={history.length}
          />

          <Metric
            label="Fecha"
            value={d.date||'—'}
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

    <Section
      title="Acciones rápidas"
    >

      <div className="actiongrid">

        {[
          [
            'f2',
            'Antropometría',
            'Composición corporal y nutrición'
          ],
          [
            'f3',
            'Movilidad',
            'Flexibilidad y control'
          ],
          [
            'f4',
            'Fuerza y potencia',
            '1RM · VMP/VBT · MyJump'
          ],
          [
            'f5',
            'Velocidad',
            'Metric Sprint 5/10/20 m'
          ],
          [
            'f6',
            'Agilidad',
            'Photo Finish · cambio de dirección'
          ],
          [
            'f7',
            'Resistencia',
            'Tests aeróbicos y FC'
          ]
        ].map(x=>

          <button
            key={x[0]}
            onClick={()=>
              go(x[0])
            }
          >

            <b>
              {x[1]}
            </b>

            <span>
              {x[2]}
            </span>

          </button>

        )}

      </div>

    </Section>

  </>;
}

/* =========================================================
   PERFIL
   ========================================================= */

function Profile({d}){

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

      {vals.map(
        ([k,v])=>

          <div key={k}>

            <span>
              {k}
            </span>

            <div className="bar">

              <i
                style={{
                  width:
                    `${Math.min(
                      100,
                      n(v)||0
                    )}%`
                }}
              />

            </div>

            <b>
              {v||'—'}
            </b>

          </div>

      )}

    </div>

  );
}

/* =========================================================
   FICHA 01
   ========================================================= */

function Ficha01({
  d,
  set,
  go
}){

  const updateBirth=v=>{

    set(
      'birthDate',
      v
    );

    set(
      'age',
      ageFromBirthDate(
        v,
        d.date
      )
    );

  };

  const updateDate=v=>{

    set(
      'date',
      v
    );

    if(d.birthDate){

      set(
        'age',
        ageFromBirthDate(
          d.birthDate,
          v
        )
      );

    }

  };

  return <>

    <Section
      title="1. IDENTIFICACIÓN"
      sub="Ficha maestra. Estos datos alimentan automáticamente las Fichas 02–08."
    >

      <div className="fields">

        <Input
          label="ID automático"
          value={d.id}
          onChange={()=>{}}
          readOnly
        />

        <Input
          label="Nombre completo"
          value={d.name}
          onChange={v=>
            set('name',v)
          }
        />

        <Input
          label="Fecha de evaluación"
          value={d.date}
          onChange={updateDate}
          type="date"
        />

        <Input
          label="Fecha de nacimiento"
          value={d.birthDate}
          onChange={updateBirth}
          type="date"
        />

        <Input
          label="Edad automática"
          value={d.age}
          onChange={()=>{}}
          type="number"
          readOnly
        />

        <Select
          label="Sexo"
          value={d.sex}
          onChange={v=>
            set('sex',v)
          }
        >

          <option value="">
            Seleccionar ▾
          </option>

          <option value="M">
            Masculino
          </option>

          <option value="F">
            Femenino
          </option>

        </Select>

        <Select
          label="Deporte"
          value={d.sport}
          onChange={v=>
            set('sport',v)
          }
        >

          <option value="">
            Seleccionar ▾
          </option>

          <option>
            Fútbol
          </option>

          <option>
            Futsal
          </option>

          <option>
            Voleibol
          </option>

          <option>
            Básquetbol
          </option>

          <option>
            Atletismo
          </option>

          <option>
            Natación
          </option>

          <option>
            Otro
          </option>

        </Select>

        <Select
          label="Categoría"
          value={d.category}
          onChange={v=>
            set('category',v)
          }
        >

          <option value="">
            Seleccionar ▾
          </option>

          <option>
            Sub 8
          </option>

          <option>
            Sub 10
          </option>

          <option>
            Sub 12
          </option>

          <option>
            Sub 14
          </option>

          <option>
            Sub 16
          </option>

          <option>
            Sub 18
          </option>

          <option>
            Adulto
          </option>

          <option>
            Senior
          </option>

          <option>
            Libre
          </option>

        </Select>

        <Input
          label="Evaluador / entrenador"
          value={d.trainer}
          onChange={v=>
            set('trainer',v)
          }
        />

      </div>

      <div className="note">

        🔗 Los datos principales quedan vinculados
        automáticamente a las demás fichas.

      </div>

    </Section>

    <Section
      title="2. ANTECEDENTES RELEVANTES"
      defaultOpen={false}
    >

      <div className="fields">

        <Select
          label="Lesiones previas"
          value={d.injuries}
          onChange={v=>
            set('injuries',v)
          }
        >

          <option value="">
            Seleccionar ▾
          </option>

          <option>
            Ninguna
          </option>

          <option>
            Leve
          </option>

          <option>
            Moderada
          </option>

          <option>
            Importante
          </option>

        </Select>

        <Select
          label="Cirugías / intervenciones"
          value={d.surgeries}
          onChange={v=>
            set('surgeries',v)
          }
        >

          <option value="">
            Seleccionar ▾
          </option>

          <option>
            Ninguna
          </option>

          <option>
            Sí
          </option>

        </Select>

        <Select
          label="Alergias"
          value={d.allergies}
          onChange={v=>
            set('allergies',v)
          }
        >

          <option value="">
            Seleccionar ▾
          </option>

          <option>
            Ninguna conocida
          </option>

          <option>
            Sí
          </option>

        </Select>

        <Select
          label="Medicamentos"
          value={d.meds}
          onChange={v=>
            set('meds',v)
          }
        >

          <option value="">
            Seleccionar ▾
          </option>

          <option>
            Ninguno
          </option>

          <option>
            Sí
          </option>

        </Select>

        <Textarea
          label="Detalle / observaciones"
          value={d.background}
          onChange={v=>
            set('background',v)
          }
          placeholder="Especificar cuando corresponda..."
        />

      </div>

    </Section>

    <Section
      title="3. HÁBITOS Y ESTILO DE VIDA"
    >

      <div className="fields">

        <Select
          label="Sueño habitual"
          value={d.sleep}
          onChange={v=>
            set('sleep',v)
          }
        >

          <option value="">
            Seleccionar ▾
          </option>

          <option>
            &lt; 6 h
          </option>

          <option>
            6–7 h
          </option>

          <option>
            7–8 h
          </option>

          <option>
            8–9 h
          </option>

          <option>
            &gt; 9 h
          </option>

        </Select>

        <Select
          label="Calidad del sueño"
          value={d.sleepQuality}
          onChange={v=>
            set('sleepQuality',v)
          }
        >

          <option value="">
            Seleccionar ▾
          </option>

          <option>
            Muy buena
          </option>

          <option>
            Buena
          </option>

          <option>
            Regular
          </option>

          <option>
            Mala
          </option>

        </Select>

        <Select
          label="Hidratación habitual"
          value={d.hydration}
          onChange={v=>
            set('hydration',v)
          }
        >

          <option value="">
            Seleccionar ▾
          </option>

          <option>
            Baja
          </option>

          <option>
            Adecuada
          </option>

          <option>
            Alta
          </option>

        </Select>

        <Select
          label="Calidad de alimentación"
          value={d.food}
          onChange={v=>
            set('food',v)
          }
        >

          <option value="">
            Seleccionar ▾
          </option>

          <option>
            Muy buena
          </option>

          <option>
            Buena
          </option>

          <option>
            Regular
          </option>

          <option>
            Mala
          </option>

        </Select>

        <Select
          label="Comidas principales / día"
          value={d.meals}
          onChange={v=>
            set('meals',v)
          }
        >

          <option value="">
            Seleccionar ▾
          </option>

          <option>
            1–2
          </option>

          <option>
            3
          </option>

          <option>
            4
          </option>

          <option>
            5+
          </option>

        </Select>

        <Select
          label="Nivel de estrés"
          value={d.stress}
          onChange={v=>
            set('stress',v)
          }
        >

          <option value="">
            Seleccionar ▾
          </option>

          <option>
            Bajo
          </option>

          <option>
            Moderado
          </option>

          <option>
            Alto
          </option>

        </Select>

        <Select
          label="Pantallas / sedentarismo"
          value={d.screens}
          onChange={v=>
            set('screens',v)
          }
        >

          <option value="">
            Seleccionar ▾
          </option>

          <option>
            &lt; 2 h
          </option>

          <option>
            2–4 h
          </option>

          <option>
            4–6 h
          </option>

          <option>
            &gt; 6 h
          </option>

        </Select>

        <Select
          label="Actividad física adicional"
          value={d.extra}
          onChange={v=>
            set('extra',v)
          }
        >

          <option value="">
            Seleccionar ▾
          </option>

          <option>
            Ninguna
          </option>

          <option>
            1–2 días/semana
          </option>

          <option>
            3–4 días/semana
          </option>

          <option>
            5+ días/semana
          </option>

        </Select>

        <Select
          label="Percepción de recuperación"
          value={d.recovery}
          onChange={v=>
            set('recovery',v)
          }
        >

          <option value="">
            Seleccionar ▾
          </option>

          <option>
            Muy buena
          </option>

          <option>
            Buena
          </option>

          <option>
            Regular
          </option>

          <option>
            Mala
          </option>

        </Select>

      </div>

    </Section>

    <Section
      title="4. OBJETIVOS"
    >

      <div className="fields">

        <Select
          label="Objetivo principal"
          value={d.objective}
          onChange={v=>
            set('objective',v)
          }
        >

          <option value="">
            Seleccionar ▾
          </option>

          <option>
            Mejorar rendimiento
          </option>

          <option>
            Aumentar fuerza
          </option>

          <option>
            Aumentar potencia
          </option>

          <option>
            Mejorar velocidad
          </option>

          <option>
            Mejorar agilidad
          </option>

          <option>
            Mejorar resistencia
          </option>

          <option>
            Mejorar movilidad
          </option>

          <option>
            Reducir grasa corporal
          </option>

          <option>
            Aumentar masa muscular
          </option>

          <option>
            Retorno al entrenamiento
          </option>

          <option>
            Otro
          </option>

        </Select>

        <Select
          label="Plazo del objetivo"
          value={d.term}
          onChange={v=>
            set('term',v)
          }
        >

          <option>
            1 mes
          </option>

          <option>
            3 meses
          </option>

          <option>
            6 meses
          </option>

        </Select>

        <Input
          label="Objetivo específico 1"
          value={d.specific1}
          onChange={v=>
            set('specific1',v)
          }
        />

        <Input
          label="Objetivo específico 2"
          value={d.specific2}
          onChange={v=>
            set('specific2',v)
          }
        />

      </div>

    </Section>

    <Section
      title="5. OBSERVACIONES DEL ENTRENADOR"
      defaultOpen={false}
    >

      <Textarea
        label="Observaciones"
        value={d.trainerObs}
        onChange={v=>
          set('trainerObs',v)
        }
        placeholder="Notas iniciales del evaluador..."
      />

    </Section>

    <div className="nextbar">

      <button
        className="primary"
        onClick={()=>
          go('f2')
        }
      >
        Guardar datos maestros y continuar a Ficha 02 →
      </button>

    </div>

  </>;
}

/* =========================================================
   FICHA 02
   EVALUACIÓN ANTROPOMÉTRICA Y PERFIL NUTRICIONAL
   ========================================================= */

function Ficha02({
  d,
  c,
  set
}){

  /* =========================================================
     UTILIDADES
     ========================================================= */

  const num = value => {
    const x = parseFloat(value);
    return Number.isFinite(x) ? x : null;
  };

  const average = (...values) => {
    const a = values
      .map(num)
      .filter(v => v !== null);

    return a.length
      ? a.reduce((s,v)=>s+v,0)/a.length
      : null;
  };

  const weight = num(d.weight);
  const height = num(d.height);
  const age = num(d.age);


  /* =========================================================
     PLIEGUES CUTÁNEOS
     DOS MEDICIONES POR SITIO
     ========================================================= */

  const skinfold = name => {

    const a = num(d[`sk_${name}_1`]);
    const b = num(d[`sk_${name}_2`]);

    return average(a,b);
  };

  const biceps = skinfold('biceps');
  const triceps = skinfold('triceps');
  const subscapular = skinfold('subscapular');
  const suprailiac = skinfold('suprailiac');

  const thighSF = skinfold('thigh');
  const calfSF = skinfold('calf');

  const chest = skinfold('chest');
  const abdominal = skinfold('abdominal');
  const midaxillarySF = skinfold('midaxillary');


  /* =========================================================
     MÉTODO DE % GRASA
     ========================================================= */

  const selectedMethod =
    d.skinfoldFormula || 'DW4';


  /* =========================================================
     DURIN & WOMERSLEY
     4 PLIEGUES
     
     Bíceps
     Tríceps
     Subescapular
     Suprailiaco
     ========================================================= */

  const dwSum =
    [
      biceps,
      triceps,
      subscapular,
      suprailiac
    ].every(v=>v!==null)
      ?
        biceps+
        triceps+
        subscapular+
        suprailiac
      :
        null;

  let dwDensity = null;

  if(
    dwSum !== null &&
    age !== null
  ){

    const logS = Math.log10(dwSum);

    if(d.sex === 'M'){

      if(age >= 17 && age <= 19){

        dwDensity =
          1.1620 -
          0.0630*logS;

      }

      else if(age >= 20 && age <= 29){

        dwDensity =
          1.1631 -
          0.0632*logS;

      }

      else if(age >= 30 && age <= 39){

        dwDensity =
          1.1422 -
          0.0544*logS;

      }

      else if(age >= 40 && age <= 49){

        dwDensity =
          1.1620 -
          0.0700*logS;

      }

      else if(age >= 50){

        dwDensity =
          1.1715 -
          0.0779*logS;

      }

    }

    else if(d.sex === 'F'){

      if(age >= 17 && age <= 19){

        dwDensity =
          1.1549 -
          0.0678*logS;

      }

      else if(age >= 20 && age <= 29){

        dwDensity =
          1.1599 -
          0.0717*logS;

      }

      else if(age >= 30 && age <= 39){

        dwDensity =
          1.1423 -
          0.0632*logS;

      }

      else if(age >= 40 && age <= 49){

        dwDensity =
          1.1333 -
          0.0612*logS;

      }

      else if(age >= 50){

        dwDensity =
          1.1339 -
          0.0645*logS;

      }

    }
  }


  /* =========================================================
     JACKSON-POLLOCK
     3 PLIEGUES MASCULINO
     
     Pecho
     Abdomen
     Muslo
     ========================================================= */

  const jp3mSum =
    [
      chest,
      abdominal,
      thighSF
    ].every(v=>v!==null)
      ?
        chest+
        abdominal+
        thighSF
      :
        null;

  let jp3mDensity = null;

  if(
    jp3mSum !== null &&
    age !== null &&
    d.sex === 'M'
  ){

    jp3mDensity =
      1.10938 -
      0.0008267*jp3mSum +
      0.0000016*(jp3mSum**2) -
      0.0002574*age;

  }


  /* =========================================================
     JACKSON-POLLOCK
     7 PLIEGUES MASCULINO
     ========================================================= */

  const jp7mSum =
    [
      chest,
      midaxillarySF,
      triceps,
      subscapular,
      abdominal,
      suprailiac,
      thighSF
    ].every(v=>v!==null)
      ?
        chest+
        midaxillarySF+
        triceps+
        subscapular+
        abdominal+
        suprailiac+
        thighSF
      :
        null;

  let jp7mDensity = null;

  if(
    jp7mSum !== null &&
    age !== null &&
    d.sex === 'M'
  ){

    jp7mDensity =
      1.112 -
      0.00043499*jp7mSum +
      0.00000055*(jp7mSum**2) -
      0.00028826*age;

  }


  /* =========================================================
     JACKSON-POLLOCK / WARD
     3 PLIEGUES FEMENINO
     
     Tríceps
     Suprailiaco
     Muslo
     ========================================================= */

  const jp3fSum =
    [
      triceps,
      suprailiac,
      thighSF
    ].every(v=>v!==null)
      ?
        triceps+
        suprailiac+
        thighSF
      :
        null;

  let jp3fDensity = null;

  if(
    jp3fSum !== null &&
    age !== null &&
    d.sex === 'F'
  ){

    jp3fDensity =
      1.0994921 -
      0.0009929*jp3fSum +
      0.0000023*(jp3fSum**2) -
      0.0001392*age;

  }


  /* =========================================================
     JACKSON-POLLOCK / WARD
     4 PLIEGUES FEMENINO
     ========================================================= */

  const jp4fSum =
    [
      triceps,
      suprailiac,
      abdominal,
      thighSF
    ].every(v=>v!==null)
      ?
        triceps+
        suprailiac+
        abdominal+
        thighSF
      :
        null;

  let jp4fDensity = null;

  if(
    jp4fSum !== null &&
    age !== null &&
    d.sex === 'F'
  ){

    jp4fDensity =
      1.096095 -
      0.0006952*jp4fSum +
      0.0000011*(jp4fSum**2) -
      0.0000714*age;

  }


  /* =========================================================
     JACKSON-POLLOCK / WARD
     7 PLIEGUES FEMENINO
     ========================================================= */

  const jp7fSum =
    [
      chest,
      midaxillarySF,
      triceps,
      subscapular,
      abdominal,
      suprailiac,
      thighSF
    ].every(v=>v!==null)
      ?
        chest+
        midaxillarySF+
        triceps+
        subscapular+
        abdominal+
        suprailiac+
        thighSF
      :
        null;

  let jp7fDensity = null;

  if(
    jp7fSum !== null &&
    age !== null &&
    d.sex === 'F'
  ){

    jp7fDensity =
      1.097 -
      0.00046971*jp7fSum +
      0.00000056*(jp7fSum**2) -
      0.00012828*age;

  }


  /* =========================================================
     YUHASZ / CARTER
     6 PLIEGUES
     ========================================================= */

  const yuhaszSum =
    [
      triceps,
      subscapular,
      suprailiac,
      abdominal,
      thighSF,
      calfSF
    ].every(v=>v!==null)
      ?
        triceps+
        subscapular+
        suprailiac+
        abdominal+
        thighSF+
        calfSF
      :
        null;

  let yuhaszFat = null;

  if(
    yuhaszSum !== null &&
    d.sex === 'M'
  ){

    yuhaszFat =
      0.1051*yuhaszSum+
      2.585;

  }

  else if(
    yuhaszSum !== null &&
    d.sex === 'F'
  ){

    yuhaszFat =
      0.1548*yuhaszSum+
      3.5803;

  }


  /* =========================================================
     SELECCIÓN DEL MÉTODO
     ========================================================= */

  let density = null;
  let calculatedFat = null;

  if(selectedMethod === 'DW4'){

    density = dwDensity;

  }

  if(selectedMethod === 'JP3M'){

    density = jp3mDensity;

  }

  if(selectedMethod === 'JP7M'){

    density = jp7mDensity;

  }

  if(selectedMethod === 'JP3F'){

    density = jp3fDensity;

  }

  if(selectedMethod === 'JP4F'){

    density = jp4fDensity;

  }

  if(selectedMethod === 'JP7F'){

    density = jp7fDensity;

  }

  if(selectedMethod === 'YUHAZ6'){

    calculatedFat = yuhaszFat;

  }


  /* =========================================================
     SIRI
     DENSIDAD CORPORAL → % GRASA
     ========================================================= */

  if(
    density !== null &&
    density > 0
  ){

    calculatedFat =
      495/density -
      450;

  }


  /* =========================================================
     IMC
     ========================================================= */

  const bmi =
    weight !== null &&
    height !== null &&
    height > 0
      ?
        weight/
        ((height/100)**2)
      :
        null;


  /* =========================================================
     MASA GRASA
     ========================================================= */

  const fatMass =
    weight !== null &&
    calculatedFat !== null
      ?
        weight*
        calculatedFat/
        100
      :
        null;


  /* =========================================================
     MASA LIBRE DE GRASA
     ========================================================= */

  const leanMass =
    weight !== null &&
    fatMass !== null
      ?
        weight-
        fatMass
      :
        null;


  /* =========================================================
     PERÍMETROS
     ========================================================= */

  const arm =
    num(d.arm);

  const thigh =
    num(d.thigh);

  const calf =
    num(d.calf);


  /* =========================================================
     PERÍMETROS CORREGIDOS
     ECUACIÓN DE LEE
     ========================================================= */

  const correctedArm =
    arm !== null &&
    triceps !== null
      ?
        arm -
        Math.PI*
        (triceps/10)
      :
        null;

  const correctedThigh =
    thigh !== null &&
    thighSF !== null
      ?
        thigh -
        Math.PI*
        (thighSF/10)
      :
        null;

  const correctedCalf =
    calf !== null &&
    calfSF !== null
      ?
        calf -
        Math.PI*
        (calfSF/10)
      :
        null;


  /* =========================================================
     MASA MUSCULAR ESQUELÉTICA
     ECUACIÓN DE LEE
     ========================================================= */

  let muscleMass = null;

  if(
    height !== null &&
    age !== null &&
    correctedArm !== null &&
    correctedThigh !== null &&
    correctedCalf !== null
  ){

    const sexCoefficient =
      d.sex === 'M'
        ? 1
        : 0;

    const raceCoefficient = 0;

    muscleMass =
      height*
      (
        0.00744*
        (correctedArm**2)

        +

        0.00088*
        (correctedThigh**2)

        +

        0.00441*
        (correctedCalf**2)
      )

      +

      2.4*
      sexCoefficient

      -

      0.048*
      age

      +

      raceCoefficient

      +

      7.8;

  }


  /* =========================================================
     % MASA MUSCULAR
     ========================================================= */

  const musclePercentage =
    muscleMass !== null &&
    weight !== null &&
    weight > 0
      ?
        muscleMass/
        weight*
        100
      :
        null;


  /* =========================================================
     TMB
     MIFFLIN-ST JEOR
     ========================================================= */

  const tmb =
    weight !== null &&
    height !== null &&
    age !== null
      ?
        d.sex === 'M'
          ?
            10*weight+
            6.25*height-
            5*age+
            5

          :

            d.sex === 'F'
              ?
                10*weight+
                6.25*height-
                5*age-
                161

              :
                null

      :
        null;


  /* =========================================================
     FACTOR DE ACTIVIDAD
     ========================================================= */

  const activityFactor =
    num(d.activityFactor) ||
    1.55;


  /* =========================================================
     GET
     ========================================================= */

  const get =
    tmb !== null
      ?
        tmb*
        activityFactor
      :
        null;


  /* =========================================================
     AJUSTE ENERGÉTICO
     ========================================================= */

  let energyAdjustment = 0;

  if(
    d.energyAdjustment === 'deficit10'
  ){

    energyAdjustment =
      -0.10;

  }

  if(
    d.energyAdjustment === 'deficit15'
  ){

    energyAdjustment =
      -0.15;

  }

  if(
    d.energyAdjustment === 'surplus10'
  ){

    energyAdjustment =
      0.10;

  }

  if(
    d.energyAdjustment === 'surplus15'
  ){

    energyAdjustment =
      0.15;

  }


  /* =========================================================
     CALORÍAS OBJETIVO
     ========================================================= */

  const calorieTarget =
    get !== null
      ?
        get*
        (1+energyAdjustment)
      :
        null;


  /* =========================================================
     MACRONUTRIENTES
     ========================================================= */

  const proteinKg =
    num(d.protein) ||
    1.8;

  const carbsKg =
    num(d.carbs) ||
    5;

  const fatsKg =
    num(d.fats) ||
    1;


  const proteinDay =
    weight !== null
      ?
        weight*
        proteinKg
      :
        null;

  const carbsDay =
    weight !== null
      ?
        weight*
        carbsKg
      :
        null;

  const fatsDay =
    weight !== null
      ?
        weight*
        fatsKg
      :
        null;


  const proteinKcal =
    proteinDay !== null
      ?
        proteinDay*
        4
      :
        null;

  const carbsKcal =
    carbsDay !== null
      ?
        carbsDay*
        4
      :
        null;

  const fatsKcal =
    fatsDay !== null
      ?
        fatsDay*
        9
      :
        null;


  const macroKcal =
    proteinKcal !== null &&
    carbsKcal !== null &&
    fatsKcal !== null
      ?
        proteinKcal+
        carbsKcal+
        fatsKcal
      :
        null;


  /* =========================================================
     HIDRATACIÓN
     35 ml/kg
     ========================================================= */

  const hydration =
    weight !== null
      ?
        weight*
        35
      :
        null;

  const hydrationLiters =
    hydration !== null
      ?
        hydration/
        1000
      :
        null;


  /* =========================================================
     ACTUALIZAR % GRASA EN LA FICHA
     ========================================================= */

  useEffect(()=>{

    if(
      calculatedFat !== null &&
      Number.isFinite(calculatedFat)
    ){

      const safeFat =
        Math.max(
          1,
          Math.min(
            60,
            calculatedFat
          )
        );

      const currentFat =
        num(d.fat);

      if(
        currentFat === null ||
        Math.abs(
          currentFat-safeFat
        ) > 0.01
      ){

        set(
          'fat',
          safeFat.toFixed(1)
        );

      }

    }

  },[
    calculatedFat
  ]);


  /* =========================================================
     TARJETA DE RESULTADO
     ========================================================= */

  const ResultCard =
    ({
      title,
      value,
      unit=''
    }) => (

      <div className="metric">

        <span>
          {title}
        </span>

        <strong>

          {
            value !== null &&
            value !== '' &&
            Number.isFinite(
              Number(value)
            )

              ?

                Number(value)
                  .toFixed(1)

              :

                '—'
          }

          {
            value !== null &&
            value !== '' &&
            Number.isFinite(
              Number(value)
            )

              ?

                ` ${unit}`

              :

                ''
          }

        </strong>

      </div>

    );


  /* =========================================================
     COMPONENTE PARA PLIEGUES
     ========================================================= */

  const SkinfoldInput =
    ({
      name,
      label
    }) => {

      const result =
        skinfold(name);

      return (

        <div className="field">

          <span>
            {label}
          </span>

          <div
            style={{
              display:'grid',
              gridTemplateColumns:
                '1fr 1fr',
              gap:'8px'
            }}
          >

            <input
              type="number"
              step="0.1"
              placeholder="Medición 1"
              value={
                d[`sk_${name}_1`] ??
                ''
              }
              onChange={
                e=>
                  set(
                    `sk_${name}_1`,
                    e.target.value
                  )
              }
            />

            <input
              type="number"
              step="0.1"
              placeholder="Medición 2"
              value={
                d[`sk_${name}_2`] ??
                ''
              }
              onChange={
                e=>
                  set(
                    `sk_${name}_2`,
                    e.target.value
                  )
              }
            />

          </div>

          <small>

            Promedio:{' '}

            {
              result !== null
                ?
                  `${result.toFixed(1)} mm`
                :
                  '—'
            }

          </small>

        </div>

      );

    };


  /* =========================================================
     INTERFAZ FICHA 02
     ========================================================= */

  return (

    <>

      <LinkedAthlete
        d={d}
      />


      {/* =====================================================
          1. MEDIDAS BÁSICAS
          ===================================================== */}

      <Section
        title="1. MEDIDAS BÁSICAS"
        sub="ISAK Level 1 · registro antropométrico"
      >

        <div className="fields">

          <Input
            label="Peso (kg)"
            value={d.weight}
            onChange={
              v=>
                set(
                  'weight',
                  v
                )
            }
            type="number"
            step="0.1"
          />

          <Input
            label="Talla (cm)"
            value={d.height}
            onChange={
              v=>
                set(
                  'height',
                  v
                )
            }
            type="number"
            step="0.1"
          />

          <Input
            label="% grasa calculado"
            value={
              calculatedFat !== null
                ?
                  calculatedFat.toFixed(1)
                :
                  ''
            }
            onChange={()=>{}}
            type="number"
            readOnly
          />

          <Input
            label="Masa muscular estimada (kg)"
            value={
              muscleMass !== null
                ?
                  muscleMass.toFixed(1)
                :
                  ''
            }
            onChange={()=>{}}
            type="number"
            readOnly
          />

        </div>

      </Section>


      {/* =====================================================
          2. PERÍMETROS
          ===================================================== */}

      <Section
        title="2. PERÍMETROS"
        sub="Medición en centímetros"
      >

        <div className="fields">

          <Input
            label="Cintura (cm)"
            value={d.waist}
            onChange={
              v=>
                set(
                  'waist',
                  v
                )
            }
            type="number"
            step="0.1"
          />

          <Input
            label="Cadera (cm)"
            value={d.hip}
            onChange={
              v=>
                set(
                  'hip',
                  v
                )
            }
            type="number"
            step="0.1"
          />

          <Input
            label="Brazo relajado (cm)"
            value={d.arm}
            onChange={
              v=>
                set(
                  'arm',
                  v
                )
            }
            type="number"
            step="0.1"
          />

          <Input
            label="Muslo (cm)"
            value={d.thigh}
            onChange={
              v=>
                set(
                  'thigh',
                  v
                )
            }
            type="number"
            step="0.1"
          />

          <Input
            label="Pantorrilla (cm)"
            value={d.calf}
            onChange={
              v=>
                set(
                  'calf',
                  v
                )
            }
            type="number"
            step="0.1"
          />

        </div>

      </Section>


      {/* =====================================================
          3. PLIEGUES CUTÁNEOS
          ===================================================== */}

      <Section
        title="3. PLIEGUES CUTÁNEOS"
        sub="Dos mediciones por sitio · promedio automático"
      >

        <div className="fields">

          <SkinfoldInput
            name="biceps"
            label="Bíceps (mm)"
          />

          <SkinfoldInput
            name="triceps"
            label="Tríceps (mm)"
          />

          <SkinfoldInput
            name="subscapular"
            label="Subescapular (mm)"
          />

          <SkinfoldInput
            name="suprailiac"
            label="Suprailiaco (mm)"
          />

          <SkinfoldInput
            name="thigh"
            label="Muslo anterior (mm)"
          />

          <SkinfoldInput
            name="calf"
            label="Pantorrilla medial (mm)"
          />

          <SkinfoldInput
            name="chest"
            label="Pecho (mm)"
          />

          <SkinfoldInput
            name="abdominal"
            label="Abdominal (mm)"
          />

          <SkinfoldInput
            name="midaxillary"
            label="Axilar medio (mm)"
          />

        </div>

      </Section>


      {/* =====================================================
          4. MÉTODO DE COMPOSICIÓN CORPORAL
          ===================================================== */}

      <Section
        title="4. MÉTODO DE COMPOSICIÓN CORPORAL"
        sub="Selección de fórmula"
      >

        <div className="fields">

          <Select
            label="Método para % grasa"
            value={
              selectedMethod
            }
            onChange={
              v=>
                set(
                  'skinfoldFormula',
                  v
                )
            }
          >

            <option value="DW4">
              Durnin & Womersley · 4 pliegues
            </option>

            <option value="JP3M">
              Jackson-Pollock · 3 pliegues masculino
            </option>

            <option value="JP7M">
              Jackson-Pollock · 7 pliegues masculino
            </option>

            <option value="JP3F">
              Jackson-Pollock/Ward · 3 pliegues femenino
            </option>

            <option value="JP4F">
              Jackson-Pollock/Ward · 4 pliegues femenino
            </option>

            <option value="JP7F">
              Jackson-Pollock/Ward · 7 pliegues femenino
            </option>

            <option value="YUHAZ6">
              Yuhasz/Carter · 6 pliegues
            </option>

          </Select>

        </div>

        <div className="note">

          <b>
            Método seleccionado:
          </b>{' '}

          {
            selectedMethod === 'DW4'
              ?
                'Durnin & Womersley – 4 pliegues'

              :

            selectedMethod === 'JP3M'
              ?
                'Jackson-Pollock – 3 pliegues masculino'

              :

            selectedMethod === 'JP7M'
              ?
                'Jackson-Pollock – 7 pliegues masculino'

              :

            selectedMethod === 'JP3F'
              ?
                'Jackson-Pollock/Ward – 3 pliegues femenino'

              :

            selectedMethod === 'JP4F'
              ?
                'Jackson-Pollock/Ward – 4 pliegues femenino'

              :

            selectedMethod === 'JP7F'
              ?
                'Jackson-Pollock/Ward – 7 pliegues femenino'

              :

                'Yuhasz/Carter – 6 pliegues'
          }

        </div>

      </Section>


      {/* =====================================================
          5. RESULTADOS DE COMPOSICIÓN CORPORAL
          ===================================================== */}

      <Section
        title="5. RESULTADOS DE COMPOSICIÓN CORPORAL"
        sub="Cálculos automáticos"
      >

        <div className="metrics">

          <ResultCard
            title="IMC"
            value={bmi}
            unit="kg/m²"
          />

          <ResultCard
            title="% grasa"
            value={calculatedFat}
            unit="%"
          />

          <ResultCard
            title="Masa grasa"
            value={fatMass}
            unit="kg"
          />

          <ResultCard
            title="Masa libre de grasa"
            value={leanMass}
            unit="kg"
          />

          <ResultCard
            title="Masa muscular esquelética"
            value={muscleMass}
            unit="kg"
          />

          <ResultCard
            title="% masa muscular"
            value={musclePercentage}
            unit="%"
          />

        </div>

        <div className="note">

          <b>
            Masa muscular esquelética:
          </b>{' '}

          estimación antropométrica mediante
          perímetros corregidos, talla, edad y sexo.

          <br/>
          <br/>

          <b>
            Importante:
          </b>{' '}

          masa muscular y masa libre de grasa
          son indicadores diferentes.

        </div>

      </Section>


      {/* =====================================================
          6. METABOLISMO Y GASTO ENERGÉTICO
          ===================================================== */}

      <Section
        title="6. METABOLISMO Y GASTO ENERGÉTICO"
        sub="Estimación automática"
      >

        <div className="fields">

          <ResultCard
            title="TMB"
            value={tmb}
            unit="kcal/día"
          />

          <ResultCard
            title="GET"
            value={get}
            unit="kcal/día"
          />

          <Select
            label="Factor de actividad"
            value={
              d.activityFactor ||
              '1.55'
            }
            onChange={
              v=>
                set(
                  'activityFactor',
                  v
                )
            }
          >

            <option value="1.20">
              1.20 · Sedentario
            </option>

            <option value="1.375">
              1.375 · Ligero
            </option>

            <option value="1.55">
              1.55 · Moderado
            </option>

            <option value="1.725">
              1.725 · Alto
            </option>

            <option value="1.90">
              1.90 · Muy alto
            </option>

          </Select>

        </div>

      </Section>


      {/* =====================================================
          7. OBJETIVO NUTRICIONAL
          ===================================================== */}

      <Section
        title="7. OBJETIVO NUTRICIONAL"
        sub="Ajuste energético"
      >

        <div className="fields">

          <Select
            label="Objetivo"
            value={
              d.nutritionGoal ||
              'mantenimiento'
            }
            onChange={
              v=>
                set(
                  'nutritionGoal',
                  v
                )
            }
          >

            <option value="perdida">
              Pérdida de grasa
            </option>

            <option value="mantenimiento">
              Mantenimiento
            </option>

            <option value="ganancia">
              Ganancia muscular
            </option>

            <option value="rendimiento">
              Rendimiento deportivo
            </option>

          </Select>


          <Select
            label="Ajuste energético"
            value={
              d.energyAdjustment ||
              'none'
            }
            onChange={
              v=>
                set(
                  'energyAdjustment',
                  v
                )
            }
          >

            <option value="none">
              Sin ajuste
            </option>

            <option value="deficit10">
              Déficit 10%
            </option>

            <option value="deficit15">
              Déficit 15%
            </option>

            <option value="surplus10">
              Superávit 10%
            </option>

            <option value="surplus15">
              Superávit 15%
            </option>

          </Select>


          <ResultCard
            title="Calorías objetivo"
            value={calorieTarget}
            unit="kcal/día"
          />

        </div>

      </Section>


      {/* =====================================================
          8. REQUERIMIENTO DE MACRONUTRIENTES
          ===================================================== */}

      <Section
        title="8. REQUERIMIENTO DE MACRONUTRIENTES"
        sub="Configuración por kg de peso"
      >

        <div className="fields">

          <Input
            label="Proteína (g/kg)"
            value={d.protein}
            onChange={
              v=>
                set(
                  'protein',
                  v
                )
            }
            type="number"
            step="0.1"
          />

          <Input
            label="Carbohidratos (g/kg)"
            value={d.carbs}
            onChange={
              v=>
                set(
                  'carbs',
                  v
                )
            }
            type="number"
            step="0.1"
          />

          <Input
            label="Grasas (g/kg)"
            value={d.fats}
            onChange={
              v=>
                set(
                  'fats',
                  v
                )
            }
            type="number"
            step="0.1"
          />

        </div>


        <div className="metrics">

          <ResultCard
            title="Proteína diaria"
            value={proteinDay}
            unit="g"
          />

          <ResultCard
            title="Carbohidratos diarios"
            value={carbsDay}
            unit="g"
          />

          <ResultCard
            title="Grasas diarias"
            value={fatsDay}
            unit="g"
          />

          <ResultCard
            title="Energía de macros"
            value={macroKcal}
            unit="kcal"
          />

        </div>

      </Section>


      {/* =====================================================
          9. HIDRATACIÓN
          ===================================================== */}

      <Section
        title="9. HIDRATACIÓN"
        sub="Estimación inicial según peso corporal"
      >

        <div className="metrics">

          <ResultCard
            title="Agua diaria"
            value={hydrationLiters}
            unit="L"
          />

          <ResultCard
            title="Agua diaria"
            value={hydration}
            unit="ml"
          />

        </div>

      </Section>


      {/* =====================================================
          10. OBSERVACIONES
          ===================================================== */}

      <Section
        title="10. OBSERVACIONES"
        sub="Conclusiones de la evaluación"
      >

        <Textarea
          label="Observaciones nutricionales"
          value={d.nutrition}
          onChange={
            v=>
              set(
                'nutrition',
                v
              )
          }
          placeholder="Registrar interpretación y recomendaciones..."
        />

      </Section>

    </>

  );

}

/* =========================================================
   FICHA 03
   ========================================================= */

function Ficha03({
  d,
  set
}){

  const mob=[
    [
      'Tobillo – rodilla a la pared',
      'ankleD',
      'ankleI',
      'cm'
    ],
    [
      'Cadera – flexión',
      'hipFlexD',
      'hipFlexI',
      '°'
    ],
    [
      'Cadera – rotación interna',
      'hipRotInD',
      'hipRotInI',
      '°'
    ],
    [
      'Cadera – rotación externa',
      'hipRotOutD',
      'hipRotOutI',
      '°'
    ],
    [
      'Hombro – rotación externa',
      'shoulderOutD',
      'shoulderOutI',
      '°'
    ],
    [
      'Hombro – rotación interna',
      'shoulderInD',
      'shoulderInI',
      '°'
    ]
  ];

  return <>

    <LinkedAthlete d={d}/>

    <Section
      title="1. MOVILIDAD ARTICULAR"
    >

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
              set={v=>
                set(x[1],v)
              }
            />

            <CellInput
              v={d[x[2]]}
              set={v=>
                set(x[2],v)
              }
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

            <td>
              {x[3]}
            </td>

          </tr>

        )}

      </Table>

    </Section>

    <Section
      title="2. FLEXIBILIDAD"
    >

      <div className="fields">

        <Input
          label="Sit & Reach (cm)"
          value={d.sitReach}
          onChange={v=>
            set('sitReach',v)
          }
        />

        <Input
          label="Test de Ely"
          value={d.ely}
          onChange={v=>
            set('ely',v)
          }
        />

        <Input
          label="Aductores (°)"
          value={d.adductors}
          onChange={v=>
            set('adductors',v)
          }
        />

        <Input
          label="Pectoral (cm)"
          value={d.pectoral}
          onChange={v=>
            set('pectoral',v)
          }
        />

      </div>

    </Section>

    <Section
      title="3. CONTROL DEL MOVIMIENTO"
    >

      <Table
        headers={[
          'Prueba',
          'Resultado',
          'Escala / unidad',
          'Calidad'
        ]}
      >

        <tr>

          <td>
            Deep Squat
          </td>

          <CellInput
            v={d.deepSquat}
            set={v=>
              set(
                'deepSquat',
                v
              )
            }
          />

          <td>
            0–3
          </td>

          <td>
            {level3(d.deepSquat)}
          </td>

        </tr>

        <tr>

          <td>
            In-Line Lunge
          </td>

          <CellInput
            v={d.lunge}
            set={v=>
              set(
                'lunge',
                v
              )
            }
          />

          <td>
            0–3
          </td>

          <td>
            {level3(d.lunge)}
          </td>

        </tr>

        <tr>

          <td>
            Plancha frontal
          </td>

          <CellInput
            v={d.plank}
            set={v=>
              set(
                'plank',
                v
              )
            }
          />

          <td>
            seg
          </td>

          <td>
            {
              n(d.plank)
                ?'Registrado'
                :'—'
            }
          </td>

        </tr>

      </Table>

    </Section>

    <Section
      title="4. CONCLUSIÓN FUNCIONAL"
    >

      <Textarea
        label="Conclusión"
        value={d.mobilityObs}
        onChange={v=>
          set(
            'mobilityObs',
            v
          )
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

function Ficha04({
  d,
  c,
  set
}){

  const ex=[
    ['Sentadilla','sq1rm'],
    ['Peso muerto','dead1rm'],
    ['Press banca','bench1rm'],
    ['Press militar','ohp1rm'],
    ['Dominadas','pull1rm']
  ];

  const vb=[
    ['Sentadilla','vbtSq','sq'],
    ['Press banca','vbtBench','bench'],
    ['Peso muerto','vbtDead','dead'],
    ['Press militar','vbtOHP','ohp']
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

    <Section
      title="1. FUERZA MÁXIMA · 1RM"
    >

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
              set={v=>
                set(
                  x[1],
                  v
                )
              }
            />

            <td>
              {
                d.weight&&
                d[x[1]]
                  ?(
                    n(d[x[1]])/
                    n(d.weight)*100
                   ).toFixed(1)+'%'
                  :'—'
              }
            </td>

            <td>
              —
            </td>

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

        {vb.map(
          ([name,k,key])=>

            <tr key={k}>

              <td className="rowlabel">
                {name}
              </td>

              <CellInput
                v={d[k+'Load']}
                set={v=>
                  set(
                    k+'Load',
                    v
                  )
                }
              />

              <CellInput
                v={d[k+'1']}
                set={v=>
                  set(
                    k+'1',
                    v
                  )
                }
              />

              <CellInput
                v={d[k+'2']}
                set={v=>
                  set(
                    k+'2',
                    v
                  )
                }
              />

              <CellInput
                v={d[k+'3']}
                set={v=>
                  set(
                    k+'3',
                    v
                  )
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
                    d[k+'1'],
                    d[k+'2'],
                    d[k+'3']
                  )||'—'
                }
              </td>

            </tr>
        )}

      </Table>

    </Section>

    <Section
      title="3. SALTOS · MYJUMP"
    >

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
                v={
                  d[
                    x[1]+i
                  ]
                }
                set={v=>
                  set(
                    x[1]+i,
                    v
                  )
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

    <Section
      title="4. PERFIL NEUROMUSCULAR"
    >

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

    <Section
      title="5. POTENCIA · TREN SUPERIOR"
    >

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
          [
            'Balón medicinal – pecho',
            'medChest'
          ],
          [
            'Balón medicinal – detrás',
            'medBehind'
          ]
        ].map(x=>

          <tr key={x[1]}>

            <td className="rowlabel">
              {x[0]}
            </td>

            {[1,2,3].map(i=>

              <CellInput
                key={i}
                v={
                  d[
                    x[1]+i
                  ]
                }
                set={v=>
                  set(
                    x[1]+i,
                    v
                  )
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

function Ficha05({
  d,
  c,
  set,
  previous
}){

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
                v={
                  d[
                    x[1]+'_'+i
                  ]
                }
                set={v=>
                  set(
                    x[1]+'_'+i,
                    v
                  )
                }
              />

            )}

            <td>
              {c[x[1]]||'—'}
            </td>

            <td>
              {
                c[
                  x[1].replace(
                    's',
                    'v'
                  )
                ]
                  ?c[
                    x[1].replace(
                      's',
                      'v'
                    )
                   ].toFixed(2)
                  :'—'
              }
            </td>

          </tr>

        )}

      </Table>

    </Section>

    <Section
      title="2. INDICADORES"
    >

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

    <Section
      title="3. PROGRESIÓN"
    >

      <Table
        headers={[
          'Distancia',
          'Anterior',
          'Actual',
          'Cambio %'
        ]}
      >

        {rows.map(x=>{

          const p=
            previous?.calc?.[x[1]];

          return(

            <tr key={x[1]}>

              <td className="rowlabel">
                {x[0]}
              </td>

              <td>
                {p??'—'}
              </td>

              <td>
                {c[x[1]]||'—'}
              </td>

              <td>
                {
                  p&&c[x[1]]
                    ?pct(
                      c[x[1]],
                      p
                    ).toFixed(1)+'%'
                    :'—'
                }
              </td>

            </tr>

          );

        })}

      </Table>

    </Section>

    <Section
      title="4. PERFIL"
    >

      <div className="fields">

        <Input
          label="Puntuación velocidad"
          value={d.speedScore}
          onChange={v=>
            set(
              'speedScore',
              v
            )
          }
        />

        <Textarea
          label="Observaciones"
          value={d.speedObs}
          onChange={v=>
            set(
              'speedObs',
              v
            )
          }
          placeholder="Observaciones..."
        />

      </div>

    </Section>

  </>;
}

/* =========================================================
   FICHA 06
   ========================================================= */

function Ficha06({
  d,
  c,
  set
}){

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
                v={
                  d[
                    x[1]+i
                  ]
                }
                set={v=>
                  set(
                    x[1]+i,
                    v
                  )
                }
              />

            )}

            <td>
              {c[x[1]]||'—'}
            </td>

            <td>
              —
            </td>

          </tr>

        )}

      </Table>

    </Section>

    <Section
      title="2. GIRO 180°"
    >

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
                v={
                  d[
                    x[1]+i
                  ]
                }
                set={v=>
                  set(
                    x[1]+i,
                    v
                  )
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

    <Section
      title="3. ANÁLISIS"
    >

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
            set(
              'agilityScore',
              v
            )
          }
        />

        <Textarea
          label="Observaciones"
          value={d.agilityObs}
          onChange={v=>
            set(
              'agilityObs',
              v
            )
          }
          placeholder="Observaciones y prioridad..."
        />

      </div>

    </Section>

  </>;
}

/* =========================================================
   FICHA 07
   ========================================================= */

function Ficha07({
  d,
  c,
  set
}){

  return <>

    <LinkedAthlete d={d}/>

    <Section
      title="1. SELECCIÓN DEL TEST"
    >

      <div className="fields">

        <Select
          label="Test aplicado"
          value={d.enduranceTest}
          onChange={v=>
            set(
              'enduranceTest',
              v
            )
          }
        >

          <option>
            Yo-Yo IR1
          </option>

          <option>
            30-15 IFT
          </option>

          <option>
            Course Navette
          </option>

          <option>
            Cooper 12 min
          </option>

        </Select>

        <Input
          label="Nivel alcanzado"
          value={d.endLevel}
          onChange={v=>
            set(
              'endLevel',
              v
            )
          }
        />

        <Input
          label="Distancia total (m)"
          value={d.endDistance}
          onChange={v=>
            set(
              'endDistance',
              v
            )
          }
        />

        <Input
          label="Velocidad final (km/h)"
          value={d.endSpeed}
          onChange={v=>
            set(
              'endSpeed',
              v
            )
          }
        />

        <Input
          label="VO₂máx estimado"
          value={d.vo2}
          onChange={v=>
            set(
              'vo2',
              v
            )
          }
        />

      </div>

    </Section>

    <Section
      title="2. FRECUENCIA CARDÍACA Y RECUPERACIÓN"
    >

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
            set={v=>
              set(
                'hrRest',
                v
              )
            }
          />

          <CellInput
            v={d.hrPost}
            set={v=>
              set(
                'hrPost',
                v
              )
            }
          />

          <CellInput
            v={d.hr1}
            set={v=>
              set(
                'hr1',
                v
              )
            }
          />

          <CellInput
            v={d.hr2}
            set={v=>
              set(
                'hr2',
                v
              )
            }
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

    <Section
      title="3. PERFIL DE RESISTENCIA ARSPORT"
    >

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
            set(
              'enduranceScore',
              v
            )
          }
        />

        <Input
          label="Tolerancia al esfuerzo"
          value={d.endTolerance}
          onChange={v=>
            set(
              'endTolerance',
              v
            )
          }
        />

        <Textarea
          label="Comentarios"
          value={d.endObs}
          onChange={v=>
            set(
              'endObs',
              v
            )
          }
          placeholder="Comentarios del test..."
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
    ['Fuerza','strengthScore'],
    ['Potencia','powerScore'],
    ['Velocidad','speedScore'],
    ['Agilidad','agilityScore'],
    ['Resistencia','enduranceScore'],
    ['Movilidad','mobilityScore']
  ];

  return <>

    <Section
      title="1. IDENTIFICACIÓN"
      sub="Datos vinculados automáticamente desde Ficha 01."
    >

      <LinkedAthlete d={d}/>

    </Section>

    <Section
      title="2. RESULTADOS PRINCIPALES"
    >

      <Table
        headers={[
          'Área',
          'Resultado',
          'Unidad',
          'Lectura'
        ]}
      >

        <tr>
          <td>
            Fuerza – Sentadilla
          </td>
          <td>
            {d.sq1rm||'—'}
          </td>
          <td>
            kg
          </td>
          <td>
            Fuerza máxima
          </td>
        </tr>

        <tr>
          <td>
            Potencia – CMJ
          </td>
          <td>
            {c.cmj||'—'}
          </td>
          <td>
            cm
          </td>
          <td>
            Salto vertical
          </td>
        </tr>

        <tr>
          <td>
            Velocidad – 20 m
          </td>
          <td>
            {c.s20||'—'}
          </td>
          <td>
            s
          </td>
          <td>
            Sprint corto
          </td>
        </tr>

        <tr>
          <td>
            Agilidad – cambio D/I
          </td>
          <td>
            {
              c.cD&&c.cI
                ?`${c.cD.toFixed(2)} / ${c.cI.toFixed(2)}`
                :'—'
            }
          </td>
          <td>
            s
          </td>
          <td>
            Cambio de dirección
          </td>
        </tr>

        <tr>
          <td>
            Resistencia – {d.enduranceTest}
          </td>
          <td>
            {d.endLevel||'—'}
          </td>
          <td>
            nivel
          </td>
          <td>
            Capacidad aeróbica
          </td>
        </tr>

      </Table>

    </Section>

    <Section
      title="3. PERFIL ARSPORT"
    >

      <Table
        headers={[
          'Capacidad',
          'Puntuación',
          'Nivel',
          'Prioridad'
        ]}
      >

        {rows.map(
          ([name,key])=>

            <tr key={key}>

              <td className="rowlabel">
                {name}
              </td>

              <CellInput
                v={d[key]}
                set={v=>
                  set(
                    key,
                    v
                  )
                }
              />

              <td>
                {scoreLevel(d[key])}
              </td>

              <td>
                {
                  scoreLevel(d[key])===
                  'PRIORIDAD'
                    ?'Mejorar'
                    :'Mantener / desarrollar'
                }
              </td>

            </tr>
        )}

      </Table>

    </Section>

    <Section
      title="4. FORTALEZAS / 5. PRIORIDADES / 6. PLAN DE ACCIÓN"
    >

      <Textarea
        label="Informe"
        value={d.reportNotes}
        onChange={v=>
          set(
            'reportNotes',
            v
          )
        }
        placeholder="Fortalezas, prioridades y acciones concretas..."
      />

      <Input
        label="Plan de acción"
        value={d.actionPlan}
        onChange={v=>
          set(
            'actionPlan',
            v
          )
        }
      />

      <Select
        label="Plazo objetivo"
        value={d.term}
        onChange={v=>
          set(
            'term',
            v
          )
        }
      >

        <option>
          1 mes
        </option>

        <option>
          3 meses
        </option>

        <option>
          6 meses
        </option>

      </Select>

    </Section>

    <Section
      title="7. EVOLUCIÓN"
    >

      <Table
        headers={[
          'Capacidad',
          'Anterior',
          'Actual',
          'Cambio %',
          'Tendencia'
        ]}
      >

        {rows.map(
          ([name,key])=>{

            const p=
              previous?.[key];

            const cur=
              d[key];

            return(

              <tr key={key}>

                <td>
                  {name}
                </td>

                <td>
                  {p??'—'}
                </td>

                <td>
                  {cur||'—'}
                </td>

                <td>
                  {
                    p&&cur
                      ?pct(
                        cur,
                        p
                      ).toFixed(1)+'%'
                      :'—'
                  }
                </td>

                <td>
                  {
                    p&&cur
                      ?(
                        n(cur)>n(p)
                          ?'MEJORA'
                          :n(cur)<n(p)
                            ?'REVISAR'
                            :'ESTABLE'
                       )
                      :'—'
                  }
                </td>

              </tr>

            );

          }
        )}

      </Table>

    </Section>

    <div className="quote">

      TU RESULTADO NO ES EL FINAL.

      <br/>

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
      sub="Toca una fila para cargar esa evaluación."
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
                  type:
                    'application/json'
                }
              );

            const a=
              document.createElement('a');

            a.href=
              URL.createObjectURL(b);

            a.download=
              'arsport-historial.json';

            a.click();

            URL.revokeObjectURL(
              a.href
            );

          }}
        >
          Exportar JSON
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
          .map(
            (x,i)=>

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

                <td>
                  {x.date}
                </td>

                <td>
                  {x.id}
                </td>

                <td>
                  {x.name||'—'}
                </td>

                <td>
                  {x.sport||'—'}
                </td>

                <td>
                  {x.sq1rm||'—'}
                </td>

                <td>
                  {x.calc?.cmj||'—'}
                </td>

                <td>
                  {x.calc?.s20||'—'}
                </td>

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
    [
      'Fuerza',
      previous?.sq1rm,
      d.sq1rm
    ],
    [
      'Potencia',
      previous?.calc?.cmj,
      c.cmj
    ],
    [
      'Velocidad',
      previous?.calc?.s20,
      c.s20
    ],
    [
      'Agilidad',
      previous?.calc?.cD,
      c.cD
    ],
    [
      'Resistencia',
      previous?.vo2,
      d.vo2
    ],
    [
      'Movilidad',
      previous?.mobilityScore,
      d.mobilityScore
    ]
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
              ?pct(
                x[2],
                x[1]
              )
              :null;

          return(

            <div
              className="pcard"
              key={x[0]}
            >

              <span>
                {x[0]}
              </span>

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

    <Section
      title="LECTURA"
    >

      <div className="note">

        En fuerza, potencia y puntuaciones
        mayores suele ser mejor.
        En tiempos de sprint y cambio de
        dirección, menor tiempo es mejor.

      </div>

    </Section>

  </>;
}

/* =========================================================
   GUÍA
   ========================================================= */

function Guide(){

  return(

    <Section
      title="GUÍA DE USO · ARSPORT"
    >

      <div className="guide">

        <h4>
          Flujo recomendado
        </h4>

        <ol>

          <li>
            Crear una nueva evaluación.
          </li>

          <li>
            Completar Ficha 01.
          </li>

          <li>
            La Ficha 01 funciona como
            ficha maestra.
          </li>

          <li>
            Completar Fichas 02–07.
          </li>

          <li>
            Guardar la evaluación.
          </li>

          <li>
            Usar Progresión y Ficha 08.
          </li>

        </ol>

        <h4>
          Reglas del sistema
        </h4>

        <ul>

          <li>
            Varios intentos:
            conservar todos y utilizar
            el mejor cuando corresponda.
          </li>

          <li>
            Asimetría:
            |D−I| / Mayor × 100.
          </li>

          <li>
            Ficha 05:
            únicamente 5, 10 y 20 metros.
          </li>

          <li>
            VMP =
            velocidad media propulsiva.
          </li>

        </ul>

        <h4>
          Compatibilidad
        </h4>

        <p>
          Diseñado para iPad y escritorio.
          Los datos se guardan localmente
          en el navegador y pueden respaldarse
          mediante JSON.
        </p>

      </div>

    </Section>

  );
}

export default App;
