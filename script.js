// ================================================================
// DATA DEFAULT (sesuai skripsi)
// ================================================================
const DEF_SUPPLIERS = [
  {kode:'S1',nama:'Bumi Sedimen',angkutan:'',material:'Batu Skrining',harga:185000,status:'Aktif'},
  {kode:'S2',nama:'AAIJ',angkutan:'Tobesmala',material:'Batu Skrining',harga:235000,status:'Aktif'},
  {kode:'S3',nama:'MSJ',angkutan:'Tobesmala',material:'Batu Skrining',harga:235000,status:'Aktif'},
  {kode:'S4',nama:'Aldo',angkutan:'Saputra Inacon',material:'Batu Skrining',harga:210000,status:'Aktif'},
  {kode:'S5',nama:'Waskita',angkutan:'Saputra Inacon',material:'Batu Skrining',harga:210000,status:'Aktif'},
  {kode:'S6',nama:'Sumber Gunung Maju',angkutan:'',material:'Batu Skrining',harga:250000,status:'Aktif'},
  {kode:'S7',nama:'Sumber Jaya Mineral Indo',angkutan:'',material:'Batu Skrining',harga:250000,status:'Aktif'},
  {kode:'S8',nama:'Gandasari Alfa Granitama',angkutan:'',material:'Batu Skrining',harga:250000,status:'Aktif'},
  {kode:'S9',nama:'Inaran Berkah Abadi',angkutan:'',material:'Batu Skrining',harga:180000,status:'Aktif'},
  {kode:'S10',nama:'DELIMAS',angkutan:'Nayottama Putra Pratama',material:'Batu Skrining',harga:215000,status:'Aktif'},
];

// Riwayat pemesanan per supplier (total 6 bulan)
const DEF_RIWAYAT = [
  {id:1,no:'ORD-001',bulan:'2025-09',kode:'S1',material:'Batu Skrining',qtyOrder:113,qtyDatang:113,reject:0,harga:185000,terlambat:0},
  {id:2,no:'ORD-002',bulan:'2025-09',kode:'S2',material:'Batu Skrining',qtyOrder:70,qtyDatang:70,reject:0,harga:235000,terlambat:0},
  {id:3,no:'ORD-003',bulan:'2025-09',kode:'S3',material:'Batu Skrining',qtyOrder:64,qtyDatang:64,reject:0,harga:235000,terlambat:0},
  {id:4,no:'ORD-004',bulan:'2025-09',kode:'S4',material:'Batu Skrining',qtyOrder:180,qtyDatang:180,reject:4.6,harga:210000,terlambat:0},
  {id:5,no:'ORD-005',bulan:'2025-09',kode:'S5',material:'Batu Skrining',qtyOrder:86,qtyDatang:86,reject:0,harga:210000,terlambat:0},
  {id:6,no:'ORD-006',bulan:'2025-09',kode:'S6',material:'Batu Skrining',qtyOrder:117,qtyDatang:117,reject:0,harga:250000,terlambat:1},
  {id:7,no:'ORD-007',bulan:'2025-09',kode:'S7',material:'Batu Skrining',qtyOrder:184,qtyDatang:184,reject:5.4,harga:250000,terlambat:1},
  {id:8,no:'ORD-008',bulan:'2025-09',kode:'S8',material:'Batu Skrining',qtyOrder:124,qtyDatang:124,reject:0,harga:250000,terlambat:1},
  {id:9,no:'ORD-009',bulan:'2025-09',kode:'S9',material:'Batu Skrining',qtyOrder:83,qtyDatang:83,reject:0,harga:180000,terlambat:1},
  {id:10,no:'ORD-010',bulan:'2025-09',kode:'S10',material:'Batu Skrining',qtyOrder:178,qtyDatang:178,reject:4.2,harga:215000,terlambat:0},
];

// Nilai pelayanan dan konsistensi kualitas dari kuesioner
const DEF_SRF = {
  S1:{layanan:0.91,konsistensi:0.92}, S2:{layanan:0.93,konsistensi:0.90}, S3:{layanan:0.89,konsistensi:0.91},
  S4:{layanan:0.63,konsistensi:0.61}, S5:{layanan:0.58,konsistensi:0.89}, S6:{layanan:0.42,konsistensi:0.90},
  S7:{layanan:0.38,konsistensi:0.43}, S8:{layanan:0.45,konsistensi:0.88}, S9:{layanan:0.62,konsistensi:0.91},
  S10:{layanan:0.59,konsistensi:0.64},
};

// AHP: nilai rata-rata kuesioner & tingkat kepentingan
const DEF_AHP_KRIT = [
  {kode:'A1',nama:'Kualitas Material',nilai:43.67,tk:1}, {kode:'A2',nama:'Harga',nilai:29.67,tk:6},
  {kode:'A3',nama:'Proses Pengiriman',nilai:32.67,tk:5}, {kode:'A4',nama:'Ketersediaan Stok',nilai:34.67,tk:3},
  {kode:'A5',nama:'Pelayanan',nilai:34.00,tk:4}, {kode:'A6',nama:'Konsistensi Kualitas',nilai:37.00,tk:2},
];

// Konstanta kerugian k
const DEF_K_STB = [
  {kode:'A1',nama:'Kualitas Material',A:333000,delta:6}, {kode:'A2',nama:'Harga',A:14970000,delta:250000},
  {kode:'A3',nama:'Proses Pengiriman',A:600000,delta:2}, {kode:'A4',nama:'Ketersediaan Stok',A:1350000,delta:389},
];
const DEF_K_LTB = [
  {kode:'A5',nama:'Pelayanan',A:150000,delta:0.206}, {kode:'A6',nama:'Konsistensi Kualitas',A:333000,delta:0.159},
];

// ================================================================
// STATE
// ================================================================
let suppliers, riwayat, ahpKrit, kSTB, kLTB, srf;
let editSupIdx = null, editRiwIdx = null;
let chartAhpDash=null, chartTlfDash=null, chartAhpMain=null, chartTlfMain=null;
let ahpResult = null, tlfResult = null; 

function loadState(){
  suppliers = JSON.parse(sessionStorage.getItem('v2_suppliers')||'null') || JSON.parse(JSON.stringify(DEF_SUPPLIERS));
  riwayat   = JSON.parse(sessionStorage.getItem('v2_riwayat')||'null')   || JSON.parse(JSON.stringify(DEF_RIWAYAT));
  ahpKrit   = JSON.parse(sessionStorage.getItem('v2_ahpKrit')||'null')   || JSON.parse(JSON.stringify(DEF_AHP_KRIT));
  kSTB      = JSON.parse(sessionStorage.getItem('v2_kSTB')||'null')      || JSON.parse(JSON.stringify(DEF_K_STB));
  kLTB      = JSON.parse(sessionStorage.getItem('v2_kLTB')||'null')      || JSON.parse(JSON.stringify(DEF_K_LTB));
  srf       = JSON.parse(sessionStorage.getItem('v2_srf')||'null')       || JSON.parse(JSON.stringify(DEF_SRF));
}
function save(){
  sessionStorage.setItem('v2_suppliers',JSON.stringify(suppliers));
  sessionStorage.setItem('v2_riwayat',JSON.stringify(riwayat));
  sessionStorage.setItem('v2_ahpKrit',JSON.stringify(ahpKrit));
  sessionStorage.setItem('v2_kSTB',JSON.stringify(kSTB));
  sessionStorage.setItem('v2_kLTB',JSON.stringify(kLTB));
  sessionStorage.setItem('v2_srf',JSON.stringify(srf));
}

// ================================================================
// AUTH
// ================================================================
const USERS={admin:{pass:'admin123',role:'Administrator'},purchasing:{pass:'purchasing123',role:'Purchasing'},qc:{pass:'qc123',role:'Quality Control'}};
function toggleEye(){
  const inp=document.getElementById('li-pass'),ic=document.getElementById('eye-ic');
  if(inp.type==='password'){inp.type='text';ic.className='ti ti-eye-off';}
  else{inp.type='password';ic.className='ti ti-eye';}
}
function doLogin(){
  const u=document.getElementById('li-user').value.trim();
  const p=document.getElementById('li-pass').value;
  const err=document.getElementById('li-err');
  if(USERS[u]&&USERS[u].pass===p){
    err.style.display='none';
    document.getElementById('login-wrap').classList.add('hide');
    document.getElementById('app').classList.add('show');
    document.getElementById('tp-name').textContent=u.charAt(0).toUpperCase()+u.slice(1);
    document.getElementById('tp-role').textContent=USERS[u].role;
    initApp();
  } else {err.style.display='block';}
}
function doLogout(){
  document.getElementById('app').classList.remove('show');
  document.getElementById('login-wrap').classList.remove('hide');
  document.getElementById('li-user').value='';
  document.getElementById('li-pass').value='';
}
document.addEventListener('keydown',e=>{if(e.key==='Enter'&&!document.getElementById('login-wrap').classList.contains('hide'))doLogin();});

// ================================================================
// NAVIGATION
// ================================================================
const PAGE_NAMES={dashboard:'Dashboard',supplier:'Data Supplier',riwayat:'Riwayat Pemesanan',ahp:'Perhitungan AHP',tlf:'Perhitungan Kerugian (TLF)'};
function navigate(pg){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n=>n.classList.remove('active'));
  document.getElementById('page-'+pg).classList.add('active');
  document.querySelector('[data-pg="'+pg+'"]').classList.add('active');
  document.getElementById('topbar-title').textContent=PAGE_NAMES[pg];
  if(pg==='dashboard') renderDashboard();
  if(pg==='supplier') renderSupplier();
  if(pg==='riwayat') renderRiwayat();
  if(pg==='ahp') renderAHP();
  if(pg==='tlf') renderTLF();
}
document.querySelectorAll('.nav-item').forEach(n=>n.addEventListener('click',()=>navigate(n.dataset.pg)));

function initApp(){
  loadState();
  ahpResult = computeAHP();
  tlfResult = computeTLF();
  navigate('dashboard');
}

// ================================================================
// FORMAT HELPERS
// ================================================================
function fmtRp(n){return Math.round(n).toLocaleString('id-ID');}
function fmtDec(n,d=2){return n.toFixed(d).replace('.',',');}
function fmtNum(n){
  if(!isFinite(n)) return '—';
  if(n>=1000) return Math.round(n).toLocaleString('id-ID');
  return n.toFixed(n<0.01?6:2).replace('.',',');
}

// ================================================================
// AHP & TLF COMPUTATION
// ================================================================
function computeAHP(){
  const krit = [...ahpKrit].sort((a,b)=>a.tk-b.tk);
  const n = krit.length; 
  
  const selisih = [];
  for(let i=0;i<n;i++){
    selisih.push([]);
    for(let j=0;j<n;j++) selisih[i].push(krit[i].tk - krit[j].tk);
  }
  
  function toAHP(s){
    if(s===0) return 1;
    if(s<0) return Math.abs(s)+1; 
    return 1/(s+1);                
  }
  const matriks = selisih.map(row=>row.map(toAHP));
  const colSum = Array(n).fill(0);
  for(let i=0;i<n;i++) for(let j=0;j<n;j++) colSum[j]+=matriks[i][j];
  const normMat = matriks.map((row,i)=>row.map((v,j)=>v/colSum[j]));
  const rowSum = normMat.map(row=>row.reduce((a,b)=>a+b,0));
  const bobot = rowSum.map(s=>s/n);
  const wsv = Array(n).fill(0);
  for(let i=0;i<n;i++) for(let j=0;j<n;j++) wsv[i]+=matriks[i][j]*bobot[j];
  const nilaiIndeks = wsv.map((w,i)=>w/bobot[i]);
  const lambdaMaks = nilaiIndeks.reduce((a,b)=>a+b,0)/n;
  const CI = (lambdaMaks - n)/(n-1);
  const CR = CI/1.24; 
  
  return {krit, selisih, matriks, colSum, normMat, rowSum, bobot, wsv, nilaiIndeks, lambdaMaks, CI, CR, n};
}

let _computeTLF = function(){
  const ahp=ahpResult||computeAHP();
  const kStbCalc=kSTB.map(k=>({...k,k:k.A/(k.delta*k.delta)}));
  const kLtbCalc=kLTB.map(k=>({...k,k:k.A*(k.delta*k.delta)}));
  const data=suppliers.map(s=>{
    const orders=riwayat.filter(r=>r.kode===s.kode);
    const nOrd=orders.length||1;
    const srfS=srf[s.kode]||{layanan:0.5,konsistensi:0.5};
    const a1=srfS.ovr_a1!=null?srfS.ovr_a1:orders.reduce((a,r)=>a+(r.reject/100),0)/nOrd;
    const a2=srfS.ovr_a2!=null?srfS.ovr_a2:(orders.length>0?orders.reduce((a,r)=>a+r.harga,0)/nOrd:s.harga);
    const a3=srfS.ovr_a3!=null?srfS.ovr_a3:orders.reduce((a,r)=>a+r.terlambat,0)/nOrd;
    const a4=srfS.ovr_a4!=null?srfS.ovr_a4:orders.reduce((a,r)=>a+r.qtyOrder,0)/nOrd;
    const a5=srfS.layanan;
    const a6=srfS.konsistensi;
    return{kode:s.kode,nama:s.nama,a1,a2,a3,a4,a5,a6};
  });
  const results=data.map(d=>{
    const ly1=kStbCalc[0].k*d.a1*d.a1;
    const ly2=kStbCalc[1].k*d.a2*d.a2;
    const ly3=kStbCalc[2].k*d.a3*d.a3;
    const ly4=kStbCalc[3].k*d.a4*d.a4;
    const ly5=d.a5>0?kLtbCalc[0].k/(d.a5*d.a5):Infinity;
    const ly6=d.a6>0?kLtbCalc[1].k/(d.a6*d.a6):Infinity;
    return{...d,ly1,ly2,ly3,ly4,ly5,ly6};
  });
  const bobotMap={};
  ahp.krit.forEach((k,i)=>bobotMap[k.kode]=ahp.bobot[i]);
  const totals=results.map(r=>{
    const total=bobotMap['A1']*r.ly1+bobotMap['A2']*r.ly2+bobotMap['A3']*r.ly3+
                bobotMap['A4']*r.ly4+bobotMap['A5']*r.ly5+bobotMap['A6']*r.ly6;
    return{...r,total,
      wly1:bobotMap['A1']*r.ly1,wly2:bobotMap['A2']*r.ly2,wly3:bobotMap['A3']*r.ly3,
      wly4:bobotMap['A4']*r.ly4,wly5:bobotMap['A5']*r.ly5,wly6:bobotMap['A6']*r.ly6,bobotMap};
  });
  const ranked=[...totals].sort((a,b)=>a.total-b.total);
  return{kStbCalc,kLtbCalc,data,results,ranked,bobotMap};
};
function computeTLF(){ return _computeTLF(); }

// ================================================================
// DASHBOARD
// ================================================================
function renderDashboard(){
  ahpResult = computeAHP();
  tlfResult = computeTLF();
  
  document.getElementById('d-total-sup').textContent = suppliers.length;
  document.getElementById('d-total-order').textContent = riwayat.length;
  
  const best = tlfResult.ranked[0];
  if(best){
    document.getElementById('d-best-sup').textContent = best.kode+' — '+best.nama;
    document.getElementById('d-best-loss').textContent = 'Total kerugian: Rp '+fmtRp(best.total);
  }
  
  const rl = document.getElementById('d-ranking-list');
  rl.innerHTML='';
  const rankColors=['#1A8C4E','#2E5FA3','#4A7CC7','#718096','#718096','#718096','#718096','#A0AEC0','#C0392B','#C0392B'];
  
  // Batasi hanya 10 supplier teratas untuk list dan grafik
  const top10 = tlfResult.ranked.slice(0, 10);
  
  top10.forEach((r,i)=>{
    const isB=i===0,isW=(r.kode === tlfResult.ranked[tlfResult.ranked.length-1].kode);
    rl.innerHTML+=`<div class="summary-row">
      <div class="sr-rank" style="background:${rankColors[i]||'#A0AEC0'};color:#fff">${i+1}</div>
      <div class="sr-name">${r.kode} — ${r.nama}</div>
      <div class="sr-val">Rp ${fmtRp(r.total)}</div>
      ${isB?'<span class="badge badge-green">Terbaik</span>':isW?'<span class="badge badge-red">Terburuk</span>':''}
    </div>`;
  });
  
  // Tombol lihat semua untuk ranking list
  if(tlfResult.ranked.length > 10){
    rl.innerHTML += `<button class="btn btn-outline" style="width:100%; margin-top:16px; justify-content:center;" onclick="navigate('tlf'); tlfTab(3)">Lihat Semua Supplier</button>`;
  }
  
  if(chartAhpDash) chartAhpDash.destroy();
  chartAhpDash=new Chart(document.getElementById('chart-ahp-dash').getContext('2d'),{
    type:'doughnut',
    data:{
      labels:ahpResult.krit.map(k=>k.kode+' '+k.nama),
      datasets:[{data:ahpResult.bobot.map(b=>parseFloat((b*100).toFixed(1))),
        backgroundColor:['#0F2B5B','#1B3E7B','#2E5FA3','#4A7CC7','#6D9ED8','#9DC2E8'],
        borderWidth:2,borderColor:'#fff'}]
    },
    plugins: [ChartDataLabels],
    options:{
      responsive:true, 
      maintainAspectRatio: false,
      layout: { padding: 0 }, 
      cutout: '40%', // Ketebalan cincin dibuat pas agar mekar sempurna
      plugins:{
        legend:{
          position:'bottom',
          labels:{font:{size:11},boxWidth:12, padding:15} // Legend di bawah
        },
        datalabels: {
          color: '#ffffff',
          font: { weight: 'bold', size: 12 },
          formatter: (value) => value + '%'
        }
      }
    }
  });
  
  if(chartTlfDash) chartTlfDash.destroy();
  // Gunakan data top10 untuk grafik bar chart
  const bgc=top10.map((r,i)=>i===0?'#1A8C4E':i===top10.length-1?'#C0392B':'#2E5FA3');
  chartTlfDash=new Chart(document.getElementById('chart-tlf-dash').getContext('2d'),{
    type:'bar',
    data:{labels:top10.map(r=>r.kode),datasets:[{label:'Total Kerugian (Rp)',data:top10.map(r=>r.total),backgroundColor:bgc,borderRadius:5}]},
    options:{responsive:true, maintainAspectRatio: false, plugins:{legend:{display:false}, datalabels:{display:false}},
      scales:{y:{ticks:{callback:v=>'Rp '+fmtRp(v)},beginAtZero:true}}}
  });
  
  // Tombol lihat semua untuk grafik TLF
  const tlfAction = document.getElementById('d-tlf-action');
  if(tlfAction) {
    if(tlfResult.ranked.length > 10){
      tlfAction.innerHTML = `<button class="btn btn-outline" style="width:100%; margin-top:16px; justify-content:center;" onclick="navigate('tlf'); tlfTab(3)">Lihat Grafik Penuh Supplier)</button>`;
    } else {
      tlfAction.innerHTML = '';
    }
  }
}

// ================================================================
// SUPPLIER CRUD
// ================================================================
function renderSupplier(){
  const q=(document.getElementById('sup-search').value||'').toLowerCase();
  const tb=document.getElementById('sup-tbody');
  tb.innerHTML='';
  suppliers.filter(s=>s.nama.toLowerCase().includes(q)||s.kode.toLowerCase().includes(q))
    .forEach((s,i)=>{
      const realIdx=suppliers.indexOf(s);
      tb.innerHTML+=`<tr>
        <td><span class="chip chip-navy">${s.kode}</span></td>
        <td style="font-weight:600">${s.nama}</td>
        <td>${s.angkutan||'<span style="color:var(--text3)">—</span>'}</td>
        <td>${s.material||'Batu Skrining'}</td>
        <td class="tbl-num">Rp ${s.harga.toLocaleString('id-ID')}</td>
        <td><span class="badge ${s.status==='Aktif'?'badge-green':'badge-gray'}">${s.status}</span></td>
        <td>
          <div style="display:flex;gap:5px">
            <button class="btn btn-outline btn-xs" onclick="openSupModal(${realIdx})"><i class="ti ti-edit"></i></button>
            <button class="btn btn-danger btn-xs" onclick="confirmDel('supplier',${realIdx})"><i class="ti ti-trash"></i></button>
          </div>
        </td>
      </tr>`;
    });
}

function openSupModal(idx=null){
  editSupIdx=idx;
  const s=idx!==null?suppliers[idx]:null;
  document.getElementById('msup-title').textContent=idx!==null?'Edit Supplier':'Tambah Supplier';
  document.getElementById('ms-kode').value=s?s.kode:'';
  document.getElementById('ms-nama').value=s?s.nama:'';
  document.getElementById('ms-angkutan').value=s?s.angkutan:'';
  document.getElementById('ms-material').value=s?(s.material||'Batu Skrining'):'Batu Skrining';
  document.getElementById('ms-harga').value=s?s.harga:'';
  document.getElementById('ms-status').value=s?s.status:'Aktif';
  ['ms-kode','ms-nama','ms-harga'].forEach(id=>{const e=document.getElementById('e-'+id);if(e)e.style.display='none';});
  openModal('modal-sup');
}

function saveSupplier(){
  const kode=document.getElementById('ms-kode').value.trim();
  const nama=document.getElementById('ms-nama').value.trim();
  const harga=parseFloat(document.getElementById('ms-harga').value);
  let ok=true;
  if(!kode){document.getElementById('e-ms-kode').style.display='block';ok=false;}else document.getElementById('e-ms-kode').style.display='none';
  if(!nama){document.getElementById('e-ms-nama').style.display='block';ok=false;}else document.getElementById('e-ms-nama').style.display='none';
  if(isNaN(harga)||harga<0){document.getElementById('e-ms-harga').style.display='block';ok=false;}else document.getElementById('e-ms-harga').style.display='none';
  if(!ok)return;
  
  const obj={kode,nama,angkutan:document.getElementById('ms-angkutan').value.trim(),
    material:document.getElementById('ms-material').value.trim()||'Batu Skrining',harga,
    status:document.getElementById('ms-status').value};
  
  if(editSupIdx!==null) suppliers[editSupIdx]=obj;
  else suppliers.push(obj);
  save(); closeModal('modal-sup'); renderSupplier();
  showToast(editSupIdx!==null?'Data supplier diperbarui.':'Supplier baru ditambahkan.');
  editSupIdx=null;
}

// ================================================================
// RIWAYAT PEMESANAN
// ================================================================
function renderRiwayat(){
  const tb=document.getElementById('riw-tbody');
  tb.innerHTML='';
  const sel=document.getElementById('mr-sup');
  sel.innerHTML='<option value="">-- Pilih Supplier --</option>';
  suppliers.forEach(s=>sel.innerHTML+=`<option value="${s.kode}">${s.kode} — ${s.nama}</option>`);
  
  if(riwayat.length===0){
    tb.innerHTML='<tr><td colspan="10" style="text-align:center;padding:30px;color:var(--text3)">Belum ada data riwayat pemesanan.</td></tr>'; return;
  }
  riwayat.forEach((r,i)=>{
    const sup=suppliers.find(s=>s.kode===r.kode);
    tb.innerHTML+=`<tr>
      <td class="tbl-num">${r.no}</td>
      <td>${r.bulan}</td>
      <td><span class="chip chip-navy" style="margin-right:6px">${r.kode}</span><span class="col-sup-name" style="display:inline-block;vertical-align:middle;font-weight:600">${sup?sup.nama:r.kode}</span></td>
      <td>${r.material}</td>
      <td class="tbl-num">${r.qtyOrder}</td>
      <td class="tbl-num">${r.qtyDatang}</td>
      <td class="tbl-num ${r.reject>5?'cell-warn':''}">${r.reject}</td>
      <td class="tbl-num">Rp ${r.harga.toLocaleString('id-ID')}</td>
      <td class="tbl-num ${r.terlambat>2?'cell-warn':''}">${r.terlambat}</td>
      <td>
        <div style="display:flex;gap:5px">
          <button class="btn btn-outline btn-xs" onclick="openRiwModal(${i})"><i class="ti ti-edit"></i></button>
          <button class="btn btn-danger btn-xs" onclick="confirmDel('riwayat',${i})"><i class="ti ti-trash"></i></button>
        </div>
      </td>
    </tr>`;
  });
}

function openRiwModal(idx=null){
  editRiwIdx=idx;
  const r=idx!==null?riwayat[idx]:null;
  document.getElementById('mriw-title').textContent=idx!==null?'Edit Order':'Tambah Order';
  const sel=document.getElementById('mr-sup');
  sel.innerHTML='<option value="">-- Pilih Supplier --</option>';
  suppliers.forEach(s=>sel.innerHTML+=`<option value="${s.kode}">${s.kode} — ${s.nama}</option>`);
  
  document.getElementById('mr-no').value=r?r.no:'ORD-'+(riwayat.length+1).toString().padStart(3,'0');
  document.getElementById('mr-bulan').value=r?r.bulan:'2025-09';
  document.getElementById('mr-sup').value=r?r.kode:'';
  document.getElementById('mr-material').value=r?(r.material||'Batu Skrining'):'Batu Skrining';
  document.getElementById('mr-qty-order').value=r?r.qtyOrder:'';
  document.getElementById('mr-qty-datang').value=r?r.qtyDatang:'';
  document.getElementById('mr-reject').value=r?r.reject:0;
  document.getElementById('mr-harga').value=r?r.harga:'';
  document.getElementById('mr-terlambat').value=r?r.terlambat:0;
  ['mr-no','mr-sup','mr-qty-order'].forEach(id=>{const e=document.getElementById('e-'+id);if(e)e.style.display='none';});
  openModal('modal-riw');
}

function saveRiwayat(){
  const no=document.getElementById('mr-no').value.trim();
  const kode=document.getElementById('mr-sup').value;
  const qtyO=parseFloat(document.getElementById('mr-qty-order').value);
  let ok=true;
  if(!no){document.getElementById('e-mr-no').style.display='block';ok=false;}else document.getElementById('e-mr-no').style.display='none';
  if(!kode){document.getElementById('e-mr-sup').style.display='block';ok=false;}else document.getElementById('e-mr-sup').style.display='none';
  if(isNaN(qtyO)||qtyO<0){document.getElementById('e-mr-qty').style.display='block';ok=false;}else document.getElementById('e-mr-qty').style.display='none';
  if(!ok)return;
  
  const obj={
    id: editRiwIdx!==null?riwayat[editRiwIdx].id:Date.now(),
    no, bulan:document.getElementById('mr-bulan').value,
    kode, material:document.getElementById('mr-material').value.trim()||'Batu Skrining',
    qtyOrder:qtyO, qtyDatang:parseFloat(document.getElementById('mr-qty-datang').value)||qtyO,
    reject:parseFloat(document.getElementById('mr-reject').value)||0,
    harga:parseFloat(document.getElementById('mr-harga').value)||0,
    terlambat:parseFloat(document.getElementById('mr-terlambat').value)||0,
  };
  if(editRiwIdx!==null) riwayat[editRiwIdx]=obj;
  else riwayat.push(obj);
  save(); closeModal('modal-riw'); renderRiwayat();
  ahpResult=computeAHP(); tlfResult=computeTLF();
  showToast('Data order disimpan.');
  editRiwIdx=null;
}

// ================================================================
// AHP RENDER
// ================================================================
let ahpTabIdx=0;
function ahpTab(i){
  ahpTabIdx=i;
  document.querySelectorAll('.tab-pane[id^="ahp-p"]').forEach((p,j)=>p.classList.toggle('active',j===i));
  document.querySelectorAll('#page-ahp .tab-btn').forEach((b,j)=>b.classList.toggle('active',j===i));
  renderAHPTab(i);
}

function renderAHP(){ ahpResult=computeAHP(); renderAHPTab(ahpTabIdx); }

function renderAHPTab(idx){
  ahpResult=computeAHP();
  if(idx===0) renderAHPStep1();
  if(idx===1) renderAHPSelisih();
  if(idx===2) renderAHPCompare();
  if(idx===3) renderAHPBobot();
}

function renderAHPStep1(){
  const tb=document.getElementById('ahp-step1-tbody');
  tb.innerHTML='';
  const sorted=[...ahpKrit].sort((a,b)=>a.tk-b.tk);
  sorted.forEach((k,i)=>{
    const origIdx=ahpKrit.indexOf(ahpKrit.find(x=>x.kode===k.kode));
    tb.innerHTML+=`<tr>
      <td><span class="chip chip-navy">${k.kode}</span></td>
      <td style="font-weight:600">${k.nama}</td>
      <td style="text-align:center;"><input class="editable-num" type="number" step="0.01" value="${k.nilai.toFixed(2)}"
        onchange="ahpKrit[${origIdx}].nilai=parseFloat(this.value)||0;save();" style="text-align:center; max-width:120px; display:inline-block;"></td>
      <td style="text-align:center;"><span class="chip chip-navy" style="padding: 4px 12px;">${k.tk}</span></td>
    </tr>`;
  });
}

function hitungAHP(){
  const sorted=[...ahpKrit].sort((a,b)=>b.nilai-a.nilai);
  sorted.forEach((item,i)=>{
    const orig=ahpKrit.find(x=>x.kode===item.kode);
    if(orig) orig.tk=i+1;
  });
  save(); ahpResult=computeAHP();
  renderAHPStep1(); renderAHPSelisih(); renderAHPCompare(); renderAHPBobot();
  showToast('Perhitungan AHP diperbarui berdasarkan nilai terbaru.');
}

function resetAHP(){
  ahpKrit=JSON.parse(JSON.stringify(DEF_AHP_KRIT));
  save(); ahpResult=computeAHP(); renderAHP();
  showToast('Data AHP direset ke default.');
}

function renderAHPSelisih(){
  ahpResult=computeAHP();
  const {krit,selisih}=ahpResult;
  const tbl=document.getElementById('ahp-selisih');
  tbl.innerHTML='<tr><th></th>'+krit.map(k=>'<th>'+k.kode+'</th>').join('')+'</tr>';
  selisih.forEach((row,i)=>{
    let r=`<tr><td class="rlabel">${krit[i].kode} — ${krit[i].nama.split(' ')[0]}</td>`;
    row.forEach(v=>{r+=`<td class="${v>0?'pos':v<0?'neg':''}">${v}</td>`;});
    tbl.innerHTML+=r+'</tr>';
  });
}

function renderAHPCompare(){
  ahpResult=computeAHP();
  const {krit,matriks,colSum}=ahpResult;
  const tbl=document.getElementById('ahp-compare');
  tbl.innerHTML='<tr><th style="min-width:120px"></th>'+krit.map(k=>'<th>'+k.kode+'</th>').join('')+'</tr>';
  matriks.forEach((row,i)=>{
    let r=`<tr><td class="rlabel">${krit[i].kode} — ${krit[i].nama.split(' ').slice(0,2).join(' ')}</td>`;
    row.forEach((v,j)=>{
      let disp=i===j?'1,000':v>=1?fmtDec(v,3):'1/'+Math.round(1/v);
      r+=`<td class="${i===j?'diag':''}">${disp}</td>`;
    });
    tbl.innerHTML+=r+'</tr>';
  });
  let sumRow='<tr><td class="rlabel" style="font-weight:700;background:#E2E8F0">Jumlah Kolom</td>';
  colSum.forEach(s=>sumRow+=`<td style="font-weight:700;background:#E2E8F0">${fmtDec(s,3)}</td>`);
  tbl.innerHTML+=sumRow+'</tr>';
}

function renderAHPBobot(){
  ahpResult=computeAHP();
  const {krit,bobot,rowSum,wsv,nilaiIndeks,lambdaMaks,CI,CR}=ahpResult;
  
  const tb1=document.getElementById('ahp-bobot-tbody');
  tb1.innerHTML='';
  krit.forEach((k,i)=>{
    tb1.innerHTML+=`<tr>
      <td style="font-weight:500">${k.kode} — ${k.nama}</td>
      <td class="tbl-num" style="text-align:center">${fmtDec(rowSum[i],4)}</td>
      <td class="tbl-num" style="font-weight:800; color:var(--navy); text-align:center">${fmtDec(bobot[i],4)}</td>
      <td><div style="display:flex;align-items:center;gap:10px">
        <div class="prog-bar" style="width:100px"><div class="prog-fill" style="width:${(bobot[i]*100).toFixed(1)}%"></div></div>
        <span class="tbl-num" style="font-weight:600">${(bobot[i]*100).toFixed(1)}%</span>
      </div></td>
    </tr>`;
  });
  
  const tb2=document.getElementById('ahp-idx-tbody');
  tb2.innerHTML='';
  krit.forEach((k,i)=>{
    tb2.innerHTML+=`<tr>
      <td style="font-weight:500"><span class="chip chip-navy" style="margin-right:6px">${k.kode}</span>${k.nama}</td>
      <td class="tbl-num" style="text-align:center">${fmtDec(wsv[i],4)}</td>
      <td class="tbl-num" style="font-weight:700; text-align:center">${fmtDec(nilaiIndeks[i],3)}</td>
    </tr>`;
  });
  
  document.getElementById('ahp-lambda').textContent=fmtDec(lambdaMaks,3);
  document.getElementById('ahp-ci').textContent=fmtDec(CI,3);
  document.getElementById('ahp-cr').textContent=fmtDec(CR,3);
  
  const badge=document.getElementById('ahp-cr-badge');
  const conc=document.getElementById('ahp-conclusion');
  if(CR<=0.1){
    badge.innerHTML='<span class="badge badge-green" style="font-size:13px;padding:8px 16px">KONSISTEN — CR = '+fmtDec(CR,3)+' &lt; 0,10</span>';
    conc.textContent='Nilai CR = '+fmtDec(CR,3)+' memenuhi syarat konsistensi (CR ≤ 0,10). Penilaian matriks perbandingan berpasangan dinyatakan konsisten dan dapat digunakan untuk proses evaluasi supplier.';
  } else {
    badge.innerHTML='<span class="badge badge-red" style="font-size:13px;padding:8px 16px">TIDAK KONSISTEN — CR = '+fmtDec(CR,3)+' &ge; 0,10</span>';
    conc.textContent='Nilai CR = '+fmtDec(CR,3)+' melebihi batas toleransi 0,10. Perlu dilakukan revisi penilaian tingkat kepentingan kriteria.';
  }
  
  if(chartAhpMain) chartAhpMain.destroy();
  chartAhpMain=new Chart(document.getElementById('chart-ahp-main').getContext('2d'),{
    type:'bar',
    data:{
      labels:krit.map(k=>k.kode+'\n'+k.nama.split(' ').slice(0,2).join(' ')),
      datasets:[{label:'Bobot Kriteria (%)',data:bobot.map(b=>parseFloat((b*100).toFixed(2))),
        backgroundColor:['#0F2B5B','#1B3E7B','#2E5FA3','#4A7CC7','#6D9ED8','#9DC2E8'],borderRadius:6}]
    },
    options:{responsive:true, maintainAspectRatio: false, plugins:{legend:{display:false}, datalabels:{display:false}}, scales:{y:{ticks:{callback:v=>v+'%'},beginAtZero:true,max:50}}}
  });
}

// ================================================================
// TLF RENDER
// ================================================================
let tlfTabIdx=0;
function tlfTab(i){
  tlfTabIdx=i;
  document.querySelectorAll('.tab-pane[id^="tlf-p"]').forEach((p,j)=>p.classList.toggle('active',j===i));
  document.querySelectorAll('#page-tlf .tab-btn').forEach((b,j)=>b.classList.toggle('active',j===i));
  renderTLFTab(i);
}

function renderTLF(){ tlfResult=computeTLF(); renderTLFTab(tlfTabIdx); }

function renderTLFTab(idx){
  ahpResult=computeAHP(); tlfResult=computeTLF();
  if(idx===0) renderKConstants();
  if(idx===1) renderTLFData();
  if(idx===2) renderLY();
  if(idx===3) renderRanking();
}

function resetTLF(){
  kSTB=JSON.parse(JSON.stringify(DEF_K_STB));
  kLTB=JSON.parse(JSON.stringify(DEF_K_LTB));
  srf=JSON.parse(JSON.stringify(DEF_SRF));
  save(); tlfResult=computeTLF(); renderTLFTab(tlfTabIdx);
  showToast('Data TLF direset ke default.');
}

function renderKConstants(){
  const {kStbCalc,kLtbCalc}=tlfResult;
  const b1=document.getElementById('k-stb-body');
  b1.innerHTML='';
  kStbCalc.forEach((k,i)=>{
    b1.innerHTML+=`<tr>
      <td style="font-weight:500">${k.kode} — ${k.nama}</td>
      <td class="tbl-num"><input class="editable-num" type="number" value="${k.A}" onchange="kSTB[${i}].A=parseFloat(this.value)||0;save();tlfResult=computeTLF();renderKConstants();"></td>
      <td class="tbl-num"><input class="editable-num" type="number" value="${k.delta}" step="any" onchange="kSTB[${i}].delta=parseFloat(this.value)||1;save();tlfResult=computeTLF();renderKConstants();"></td>
      <td class="tbl-num" style="font-weight:700; color:var(--navy)">${fmtNum(k.k)}</td>
    </tr>`;
  });
  const b2=document.getElementById('k-ltb-body');
  b2.innerHTML='';
  kLtbCalc.forEach((k,i)=>{
    b2.innerHTML+=`<tr>
      <td style="font-weight:500">${k.kode} — ${k.nama}</td>
      <td class="tbl-num"><input class="editable-num" type="number" value="${k.A}" onchange="kLTB[${i}].A=parseFloat(this.value)||0;save();tlfResult=computeTLF();renderKConstants();"></td>
      <td class="tbl-num"><input class="editable-num" type="number" value="${k.delta}" step="any" onchange="kLTB[${i}].delta=parseFloat(this.value)||0.001;save();tlfResult=computeTLF();renderKConstants();"></td>
      <td class="tbl-num" style="font-weight:700; color:var(--navy)">${fmtDec(k.k,2)}</td>
    </tr>`;
  });
}

const TOL_WARN={a1:0.05,a2:250000,a3:2,a4:389,a5:0.80,a6:0.90};
function isWarn(field,val){
  if(field==='a1') return val>TOL_WARN.a1;
  if(field==='a2') return val>TOL_WARN.a2;
  if(field==='a3') return val>TOL_WARN.a3;
  if(field==='a4') return val<TOL_WARN.a4;
  if(field==='a5') return val<TOL_WARN.a5;
  if(field==='a6') return val<TOL_WARN.a6;
  return false;
}

function renderTLFData(){
  const {data}=tlfResult;
  const tb=document.getElementById('tlf-data-body');
  tb.innerHTML='';
  data.forEach((d,i)=>{
    const fields=['a1','a2','a3','a4','a5','a6'];
    let cells=`<td><span class="chip chip-navy">${d.kode}</span></td><td class="col-sup-name" style="font-weight:600">${d.nama}</td>`;
    fields.forEach(f=>{
      const warn=isWarn(f,d[f]);
      cells+=`<td class="${warn?'cell-warn':''}" style="text-align:right">
        <input class="editable-num" type="number" step="any" value="${d[f]}" onchange="updateSRF('${d.kode}','${f}',parseFloat(this.value)||0)">
      </td>`;
    });
    tb.innerHTML+=`<tr>${cells}</tr>`;
  });
}

function updateSRF(kode, field, val){
  if(field==='a5'){if(!srf[kode])srf[kode]={layanan:1,konsistensi:1};srf[kode].layanan=val;}
  if(field==='a6'){if(!srf[kode])srf[kode]={layanan:1,konsistensi:1};srf[kode].konsistensi=val;}
  if(!srf[kode])srf[kode]={layanan:1,konsistensi:1};
  if(['a1','a2','a3','a4'].includes(field)){srf[kode]['ovr_'+field]=val;}
  save(); tlfResult=computeTLF(); renderLY(); renderRanking();
}

function hitungTLF(){
  tlfResult=computeTLF();
  renderLY(); renderRanking();
  showToast('Perhitungan TLF diperbarui.');
}

function renderLY(){
  const{results}=tlfResult;
  const tb=document.getElementById('ly-body');
  tb.innerHTML='';
  results.forEach(r=>{
    tb.innerHTML+=`<tr>
      <td><span class="chip chip-navy">${r.kode}</span></td>
      <td style="font-weight:600">${r.nama}</td>
      <td class="tbl-num">${fmtDec(r.ly1,3)}</td>
      <td class="tbl-num">${fmtRp(r.ly2)}</td>
      <td class="tbl-num">${fmtDec(r.ly3,2)}</td>
      <td class="tbl-num">${fmtDec(r.ly4,2)}</td>
      <td class="tbl-num">${fmtDec(r.ly5,2)}</td>
      <td class="tbl-num">${fmtDec(r.ly6,2)}</td>
    </tr>`;
  });
}

function renderRanking(){
  const{ranked}=tlfResult;
  const tb=document.getElementById('rank-body');
  tb.innerHTML='';
  ranked.forEach((r,i)=>{
    const isB=i===0,isW=i===ranked.length-1;
    const rowClass=isB?'row-best':isW?'row-worst':'';
    tb.innerHTML+=`<tr class="${rowClass}">
      <td><span class="chip ${isB?'chip-green':isW?'chip-red':'chip-gray'}">${i+1}</span></td>
      <td><span class="chip chip-navy">${r.kode}</span></td>
      <td class="col-sup-name" style="font-weight:600">${r.nama}</td>
      <td class="tbl-num">${fmtDec(r.wly1,2)}</td>
      <td class="tbl-num">${fmtRp(r.wly2)}</td>
      <td class="tbl-num">${fmtDec(r.wly3,2)}</td>
      <td class="tbl-num">${fmtDec(r.wly4,2)}</td>
      <td class="tbl-num">${fmtDec(r.wly5,2)}</td>
      <td class="tbl-num">${fmtDec(r.wly6,2)}</td>
      <td class="tbl-num" style="font-weight:800; color:var(--navy);">Rp ${fmtRp(r.total)}</td>
      <td>${isB?'<span class="badge badge-green">Terbaik</span>':isW?'<span class="badge badge-red">Terburuk</span>':'—'}</td>
    </tr>`;
  });
  
  if(chartTlfMain) chartTlfMain.destroy();
  const bgc=ranked.map((_,i)=>i===0?'#1A8C4E':i===ranked.length-1?'#C0392B':'#2E5FA3');
  chartTlfMain=new Chart(document.getElementById('chart-tlf-main').getContext('2d'),{
    type:'bar',
    data:{
      labels:ranked.map(r=>r.kode+'\n'+r.nama.split(' ').slice(0,2).join(' ')),
      datasets:[{ label:'Total Kerugian (Rp)', data:ranked.map(r=>r.total), backgroundColor:bgc, borderRadius:6 }]
    },
    options:{ responsive:true, maintainAspectRatio: false, plugins:{legend:{display:false}, datalabels:{display:false}, tooltip:{callbacks:{label:ctx=>'Rp '+fmtRp(ctx.raw)}}},
      scales:{ y:{ticks:{callback:v=>'Rp '+fmtRp(v)},beginAtZero:true}, x:{ticks:{font:{size:11}}} }
    }
  });
}

// ================================================================
// MODAL HELPERS
// ================================================================
function openModal(id){document.getElementById(id).classList.add('open');}
function closeModal(id){document.getElementById(id).classList.remove('open');}
document.querySelectorAll('.modal-bg').forEach(m=>{
  m.addEventListener('click',e=>{if(e.target===m)m.classList.remove('open');});
});

function confirmDel(type,idx){
  const names={supplier:suppliers[idx]?.nama,riwayat:riwayat[idx]?.no};
  document.getElementById('confirm-msg').textContent='Hapus "'+names[type]+'"? Tindakan ini tidak dapat dibatalkan.';
  document.getElementById('confirm-ok').onclick=()=>{
    if(type==='supplier'){suppliers.splice(idx,1);} else{riwayat.splice(idx,1);}
    save(); closeModal('modal-confirm');
    if(type==='supplier') renderSupplier(); else renderRiwayat();
    ahpResult=computeAHP(); tlfResult=computeTLF();
    showToast('Data berhasil dihapus.');
  };
  openModal('modal-confirm');
}

// ================================================================
// IMPORT / EXPORT EXCEL & CSV
// ================================================================

function exportExcel(type, filename) {
  let data = [];
  if(type === 'supplier') {
    data = suppliers.map(s => ({
      'Kode': s.kode,
      'Nama Supplier': s.nama,
      'Nama Angkutan': s.angkutan,
      'Jenis Material': s.material,
      'Harga Material': s.harga,
      'Status': s.status
    }));
  } else {
    data = riwayat.map(r => ({
      'No Order': r.no,
      'Bulan': r.bulan,
      'Kode Supplier': r.kode,
      'Material': r.material,
      'Qty Order': r.qtyOrder,
      'Qty Datang': r.qtyDatang,
      'Reject (%)': r.reject,
      'Harga': r.harga,
      'Keterlambatan (hari)': r.terlambat
    }));
  }
  
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Data");
  XLSX.writeFile(wb, filename + '.xlsx');
  showToast('File Excel berhasil diunduh.');
}

function importRiwayat(){document.getElementById('import-file').click();}
function importSupplier(){document.getElementById('import-sup-file').click();}

function handleImportFile(e, type) {
  const file = e.target.files[0];
  if(!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    try {
      const data = new Uint8Array(ev.target.result);
      const workbook = XLSX.read(data, {type: 'array'});
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(worksheet, {raw: false});

      if(json.length === 0) {
        showToast('File kosong atau tidak valid.');
        return;
      }

      if(type === 'supplier') processImportSupplier(json);
      else processImportRiwayat(json);
    } catch(err) {
      showToast('Gagal membaca file. Pastikan formatnya benar.');
      console.error(err);
    }
    e.target.value = '';
  };
  reader.readAsArrayBuffer(file);
}

function processImportSupplier(rows) {
  let imported = 0;
  for(let row of rows) {
    // Normalisasi nama kolom (hapus spasi, ubah ke huruf kecil semua) agar kebal dari perubahan Header Excel
    const normRow = {};
    for(let key in row) {
      normRow[key.toString().toLowerCase().replace(/[^a-z0-9]/g, '')] = typeof row[key] === 'string' ? row[key].trim() : row[key];
    }

    let kode = normRow['kode'] || normRow['kodesupplier'];
    if(!kode) continue;

    let existIdx = suppliers.findIndex(s => s.kode.toUpperCase() === kode.toString().toUpperCase());
    
    let rawHarga = normRow['hargamaterialrpm3'] || normRow['hargamaterial'] || normRow['harga'] || '0';
    let material = normRow['jenismaterial'] || normRow['material'] || 'Batu Skrining';

    // FIX OTOMATIS: Jika data bergeser (Harga masuk ke Kolom Material), kita perbaiki!
    if (material.toString().toLowerCase().includes('rp') || (!isNaN(parseFloat(material.toString().replace(/[^0-9]/g,''))) && parseFloat(material.toString().replace(/[^0-9]/g,'')) > 1000)) {
        rawHarga = material;
        material = 'Batu Skrining';
    }

    let strHarga = rawHarga.toString().replace(/Rp|\s/gi, '').replace(/\./g, '').replace(/,/g, '.');
    let fHarga = parseFloat(strHarga.replace(/[^0-9.-]/g, '')) || 0;
    
    // Auto correct Excel formatting (misal 210.000 kepotong dibaca 210 oleh Excel)
    if(fHarga > 0 && fHarga <= 1000) fHarga = fHarga * 1000;

    let angkutan = normRow['namaangkutan'] || normRow['angkutan'] || '';
    if(angkutan === '—' || angkutan === '-') angkutan = '';

    let obj = {
      kode: kode.toString().toUpperCase(),
      nama: normRow['namasupplier'] || normRow['nama'] || '',
      angkutan: angkutan,
      material: material,
      harga: fHarga,
      status: normRow['status'] || 'Aktif'
    };

    if(existIdx >= 0) { suppliers[existIdx] = obj; } 
    else { suppliers.push(obj); }
    imported++;
  }
  save(); renderSupplier(); ahpResult=computeAHP(); tlfResult=computeTLF();
  showToast(imported + ' supplier berhasil diimpor.');
}

function processImportRiwayat(rows) {
  let imported = 0;
  for(let row of rows) {
    const normRow = {};
    for(let key in row) {
      normRow[key.toString().toLowerCase().replace(/[^a-z0-9]/g, '')] = typeof row[key] === 'string' ? row[key].trim() : row[key];
    }

    let kode = normRow['kodesupplier'] || normRow['kode'] || normRow['supplier'];
    if(!kode) continue;

    let rawHarga = normRow['harga'] || normRow['hargam3'] || normRow['hargarpm3'] || '0';
    let strHarga = rawHarga.toString().replace(/Rp|\s/gi, '').replace(/\./g, '').replace(/,/g, '.');
    let fHarga = parseFloat(strHarga.replace(/[^0-9.-]/g, '')) || 0;
    
    // Auto correct Excel formatting (misal 210.000 dibaca 210 oleh Excel)
    if(fHarga > 0 && fHarga <= 1000) fHarga = fHarga * 1000;

    riwayat.push({
      id: Date.now() + Math.random(),
      no: normRow['noorder'] || normRow['no'] || ('ORD-IMP-' + Math.floor(Math.random()*1000)),
      bulan: normRow['bulan'] || '2025-09',
      kode: kode.toString().split(' ')[0].toUpperCase(),
      material: normRow['material'] || normRow['jenismaterial'] || 'Batu Skrining',
      qtyOrder: parseFloat((normRow['qtyorder']||'0').toString().replace(/,/g, '.')) || 0,
      qtyDatang: parseFloat((normRow['qtydatang']||'0').toString().replace(/,/g, '.')) || 0,
      reject: parseFloat((normRow['reject']||normRow['reject']||'0').toString().replace(/,/g, '.')) || 0,
      harga: fHarga,
      terlambat: parseFloat((normRow['keterlambatanhari']||normRow['terlambat']||'0').toString().replace(/,/g, '.')) || 0,
    });
    imported++;
  }
  save(); renderRiwayat(); ahpResult=computeAHP(); tlfResult=computeTLF();
  showToast(imported + ' baris pesanan berhasil diimpor.');
}

// ================================================================
// TOAST
// ================================================================
let toastTimer=null;
function showToast(msg){
  const t=document.getElementById('toast');
  t.textContent=msg;t.classList.add('show');
  if(toastTimer)clearTimeout(toastTimer);
  toastTimer=setTimeout(()=>t.classList.remove('show'),3000);
}