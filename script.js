/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * BOLAJON - Zamonaviy 3D Xususiy Bolalar Bog‘chasi
 * Pure Vanilla JavaScript Application Logic & Three.js 3D Scene
 */

import * as THREE from 'three';
import confetti from 'canvas-confetti';

// ==========================================================================
// 1. GLOBAL STATE & PROGRAM DATA
// ==========================================================================
const PROGRAMS_DATA = {
  'prog-1': {
    title: 'Ilk rivojlanish dasturi',
    age: '2 – 3 yosh',
    icon: '🌱',
    color: '#ff6363',
    overview: '2–3 yoshli kichkintoylar uchun moslashtirilgan bo‘lib, nutqni faollashtirish, sensor sezgilarni o‘stirish, nozik qo‘l motorikasi va ijtimoiy ko‘nikmalarni shakllantirishga qaratilgan.',
    schedule: 'Haftada 5 kun: 09:30 – 11:00',
    curriculum: [
      'Sensorika: shakllar, ranglar va to‘qimalarni sezish',
      'Artikulyatsion va nafas mashqlari orqali nutqni rivojlantirish',
      'Musiqiy o‘yinlar, qo‘shiqlar va birgalikdagi harakatlar',
      'Mustaqil ovqatlanish va kiyinish kabi gigiyenik odatlar',
      'Qum va suv bilan xavfsiz rivojlantiruvchi terapiya'
    ],
    teacher: 'Nodira Salimova (Kichik guruh yetakchi tarbiyachisi, 8 yillik tajriba)'
  },
  'prog-2': {
    title: 'Kichkintoylar guruhi',
    age: '3 – 4 yosh',
    icon: '🐣',
    color: '#f59e0b',
    overview: 'Ushbu davrda bolada atrof-olamni tushunish, “Nega?”, “Qanday?” savollariga javob izlash va mustaqil fikrlashga qiziqish paydo bo‘ladi.',
    schedule: 'Haftada 5 kun: 09:30 – 11:30',
    curriculum: [
      'Atrof-olam bilan tanishuv: hayvonlar, o‘simliklar va fasllar',
      'Elementar matematik tasavvurlar: katta-kichik, ko‘p-kam',
      'Lug‘at boyligini faol kengaytirish va ravon jumlalar tuzish',
      'Lego va yog‘och konstruktorlar bilan fazoviy modellashtirish',
      'Do‘stlashish va o‘yinchoqlarni baham ko‘rish odoblari'
    ],
    teacher: 'Madina Rustamova (Oliy toifali pedagog, 10 yillik tajriba)'
  },
  'prog-3': {
    title: 'Bilimdonlar guruhi',
    age: '4 – 5 yosh',
    icon: '🦉',
    color: '#3b82f6',
    overview: 'Bolalarning mustaqil tafakkuri, mantiqiy xulosalari va qiziquvchanligini qondiruvchi interaktiv STEAM yo‘naltirilgan ta’lim.',
    schedule: 'Haftada 5 kun: 09:30 – 12:00',
    curriculum: [
      'Mantiqiy masalalar, labirintlar va tafakkur o‘yinlari',
      '1 dan 20 gacha sonlar va geometrik shakllar olami',
      'Dastlabki tabiatshunoslik va qiziqarli bolalar tajribalari',
      'Ertaklar qahramonlarini tahlil qilish va sahnalashtirish',
      'Ingliz tilidagi birinchi so‘zlashuv iboralari'
    ],
    teacher: 'Gulnora Aliyeva (STEAM metodisti, 12 yillik tajriba)'
  },
  'prog-4': {
    title: 'Maktabga tayyorgarlik kursi',
    age: '5 – 7 yosh',
    icon: '🎓',
    color: '#8b5cf6',
    overview: 'Maktabga qadam qo‘yish arafasidagi bolalar uchun keng qamrovli tayyorgarlik: o‘qish, yozish, mental hisoblash va psixologik moslashuv.',
    schedule: 'Haftada 5 kun: 09:30 – 12:30',
    curriculum: [
      'Savodxonlik: harflar, bo‘g‘inlab o‘qish va so‘zlarni tahlil qilish',
      'Mental arifmetika va mantiqiy matematik hisoblashlar',
      'Grafomotorika: qo‘lni chiroyli va to‘g‘ri yozishga o‘rgatish',
      'Prezident va ixtisoslashtirilgan maktablar testlariga moslashuv',
      'Mustaqillik, darsda diqqatni jamlash va vaqtni boshqarish'
    ],
    teacher: 'Ziyoda Qosimova (Boshlang‘ich ta’lim eksperti, 15 yillik tajriba)'
  },
  'prog-5': {
    title: 'Ingliz tili (Interactive English)',
    age: 'Barcha guruhlar uchun',
    icon: '🇬🇧',
    color: '#10b981',
    overview: 'Kembrij dasturlari asosida tabiiy o‘yinlar, qo‘shiqlar, ertaklar va teatr tomoshalari orqali til o‘rganish.',
    schedule: 'Haftada 3 kun: 15:30 – 16:30',
    curriculum: [
      'Phonics: tovushlar va to‘g‘ri talaffuzni shakllantirish',
      'Interaktiv audio-vizual ertaklar va bolalar qo‘shiqlari',
      'Kundalik muloqot: salomlashish, his-tuyg‘ular, hayvonlar va ranglar',
      'Jonli suhbat o‘yinlari va rolli musobaqalar'
    ],
    teacher: 'Kamola Saidova (CELTA sertifikatli pedagog, 7 yillik xalqaro tajriba)'
  },
  'prog-6': {
    title: 'Ijod va san’at ustaxonasi',
    age: '3 – 7 yosh',
    icon: '🎨',
    color: '#f97316',
    overview: 'Bolaning ichki estetik didi, fantaziyasi va qalb kechinmalarini ranglar, musiqa va shakllar orqali ifodalash erkinligi.',
    schedule: 'Haftada 3 kun: 15:30 – 16:30',
    curriculum: [
      'Akvarel, guash va barmoq bo‘yoqlari bilan rasm chizish',
      'Kinetik qum, xamir va loydan haykalchalar yasash',
      'Applikatsiya, kollaj va yaponcha origami san’ati',
      'Bolalar xori va ritmik musiqa asboblarida chalish'
    ],
    teacher: 'Shahnoza Ergasheva (O‘zbekiston Rassomlar uyushmasi a’zosi)'
  },
  'prog-7': {
    title: 'Sport va bolalar harakati',
    age: '3 – 7 yosh',
    icon: '🤸‍♂️',
    color: '#ff6363',
    overview: 'Qaddi-qomatni to‘g‘ri shakllantirish, sog‘lom immunitet, chaqqonlik va epchillikni tarbiyalovchi mashg‘ulotlar.',
    schedule: 'Haftada 3 kun: 16:00 – 17:00',
    curriculum: [
      'Badiiy va ritmik gimnastika boshlang‘ich mashqlari',
      'Yassi oyoqlik va umurtqa pog‘onasi qiyshayishining oldini olish',
      'Estafetali to‘p o‘yinlari va koordinatsiya mashqlari',
      'Yozgi mavsumda xavfsiz bolalar basseynida suzish'
    ],
    teacher: 'Bobur Yoqubov (Bolalar sport murabbiyi, Sport ustasi)'
  }
};

// Default Daily Schedules for different groups
const SCHEDULES_DATA = {
  kichik: [
    { time: '08:00', icon: '☀️', title: 'Bolalarni kutib olish', text: 'Mehr bilan kutib olish, ertalabki salomatlik nazorati va tinch o‘yinlar.', tag: 'Iliq kutib olish' },
    { time: '08:30', icon: '🤸', title: 'Ertalabki badantarbiya', text: 'Quvnoq musiqa sadolari ostida mayin harakatlar va nafas mashqlari.', tag: 'Tetiklik' },
    { time: '09:00', icon: '🥣', title: 'Nonushta', text: 'Sutli yangi bo‘tqa, yumshoq non, sariyog‘ va na’matak damlamasi.', tag: '1-taomlanish' },
    { time: '09:30', icon: '🧠', title: 'Sensor rivojlanish', text: 'Ranglar, shakllar va qo‘l motorikasini o‘stirish mashg‘ulotlari.', tag: 'Rivojlantiruvchi' },
    { time: '10:30', icon: '⚽', title: 'Ochiq havoda sayr', text: 'Qumdon o‘yinlari, toza havoda harakatlar va estafetalar.', tag: 'Sayr' },
    { time: '12:00', icon: '🍲', title: 'Tushlik', text: 'Vitaminli tovuq sho‘rvasi, sabzavotli pyure va yangi salat.', tag: '2-taomlanish' },
    { time: '12:45', icon: '🌙', title: 'Shirin uyqu', text: 'Allalar va sokin musiqa ostida sog‘lom tushki uyqu.', tag: 'Dam olish' },
    { time: '15:30', icon: '🎨', title: 'Uyg‘onish & Ikkinchi tushlik', text: 'Meva, pishiriqlar; ertak eshitish va loydan shakl yasash.', tag: 'Ijodiy soat' },
    { time: '16:30', icon: '👋', title: 'Sayr & Ota-onalarga topshirish', text: 'Xursand kayfiyat bilan kun yakunlari va ota-onaga topshirish.', tag: '18:00 gacha' }
  ],
  orta: [
    { time: '08:00', icon: '☀️', title: 'Kutib olish & Salomatlik ko‘rigi', text: 'Pediatr nazorati, kayfiyatni ko‘taruvchi suhbatlar.', tag: 'Salomatlik' },
    { time: '08:30', icon: '🤸', title: 'Ritmik badantarbiya', text: 'Musiqiy gimnastika va muvozanat mashqlari.', tag: 'Faollik' },
    { time: '09:00', icon: '🥣', title: 'Foydali nonushta', text: 'Bo‘tqalar, mevali tvorog, choy va tabiiy pishloq.', tag: 'Nonushta' },
    { time: '09:30', icon: '🦉', title: 'Matematika & Mantiq', text: 'Hisob-kitob, shakllar va atrof-muhit bilan tanishuv.', tag: 'Asosiy dars' },
    { time: '10:45', icon: '🇬🇧', title: 'Ingliz tili darsi', text: 'O‘yinlar va qo‘shiqlar orqali so‘z boyligini oshirish.', tag: 'Til saboqlari' },
    { time: '11:30', icon: '⚽', title: 'Ochiq havoda sport', text: 'Maydonchadagi musobaqalar va to‘p o‘yinlari.', tag: 'Sayr' },
    { time: '12:30', icon: '🍲', title: 'To‘yimli tushlik', text: 'Issiq sho‘rva, go‘shtli dimlama va sharbat.', tag: 'Tushlik' },
    { time: '13:00', icon: '🌙', title: 'Tushki orom', text: 'Qulay krovatchalarda toza havoda shirin uyqu.', tag: 'Orom vaqti' },
    { time: '15:45', icon: '🎨', title: 'Rasm & Lego to‘garagi', text: 'Tasviriy san’at va konstruktor yig‘ish.', tag: 'Ijod' }
  ],
  katta: [
    { time: '08:00', icon: '☀️', title: 'Kutib olish & Ertalabki suhbat', text: 'Bugungi kun rejasi bilan tanishish va salomatlik ko‘rigi.', tag: 'Kutib olish' },
    { time: '08:30', icon: '🤸', title: 'Faol jismoniy tarbiya', text: 'Sport elementlari bilan badantarbiya va estafeta.', tag: 'Gimnastika' },
    { time: '09:00', icon: '🥣', title: 'Quvvatli nonushta', text: 'Omlet, bo‘tqa, asal va meva sharbatlari.', tag: 'Nonushta' },
    { time: '09:30', icon: '🎓', title: 'Savodxonlik & O‘qish', text: 'Harflar, bo‘g‘inlab o‘qish va chiroyli yozuv sirlari.', tag: 'Maktabga tayyorlov' },
    { time: '10:30', icon: '🧠', title: 'Mental arifmetika', text: 'Abakusda hisoblash va mantiqiy masalalar yechish.', tag: 'STEAM' },
    { time: '11:30', icon: '⚽', title: 'Faol sayr & Jamoaviy o‘yin', text: 'Futbol, estafeta va tabiat hodisalarini kuzatish.', tag: 'Ochiq maydon' },
    { time: '12:30', icon: '🍲', title: 'Diyetik tushlik', text: 'Sho‘rva, taom, vitaminli salat va kompot.', tag: 'Tushlik' },
    { time: '13:15', icon: '🌙', title: 'Sokin uyqu soati', text: 'Dam olish va miyani yangi bilimlarga tayyorlash.', tag: 'Uyqu' },
    { time: '15:45', icon: '🇬🇧', title: 'Ingliz tili & Shaxmat', text: 'Inglizcha teatrlashtirilgan o‘yinlar va shaxmat darsi.', tag: 'To‘garaklar' }
  ]
};

// Gallery Items Database
const GALLERY_ITEMS = [
  { id: 0, title: 'STEAM Darsi', desc: 'Mantiqiy tajribalar, sensorika va robototexnika sinfi', tag: 'STEAM Sinf', cat: 'mashgulot', icon: '📚', colorGrad: 'art-1' },
  { id: 1, title: 'Quvnoq maydoncha', desc: 'Katta ko‘kalamzorlashtirilgan xavfsiz bolalar o‘yingohi', tag: 'Ochiq o‘yingoh', cat: 'oyinhoh', icon: '🎡', colorGrad: 'art-2' },
  { id: 2, title: 'Ekologik sinfxona', desc: 'Yorug‘, shinam va tabiiy yog‘och mebellarga ega xonalar', tag: 'Keng xonalar', cat: 'sinf', icon: '🏫', colorGrad: 'art-3' },
  { id: 3, title: 'Bayram tadbirlari', desc: 'Navro‘z, yangi yil va ertaklar bayrami spektakllari', tag: 'Tadbirlar', cat: 'bayram', icon: '🎉', colorGrad: 'art-4' },
  { id: 4, title: 'Rasm va ijod burchagi', desc: 'Bolalarning rang-barang tasviriy ijod namunalari', tag: 'Ijod burchagi', cat: 'ijod', icon: '🎨', colorGrad: 'art-5' },
  { id: 5, title: 'Ingliz tili saboqlari', desc: 'Qiziqarli o‘yinlar va multfilmlar bilan til o‘rganish', tag: 'Ingliz tili', cat: 'mashgulot', icon: '🇬🇧', colorGrad: 'art-6' }
];

// ==========================================================================
// 2. THEME CONTROLLER (LIGHT / DARK MODE)
// ==========================================================================
let currentTheme = 'light';

function initTheme() {
  const savedTheme = localStorage.getItem('bolajon_theme');
  const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme) {
    currentTheme = savedTheme;
  } else if (systemPrefersDark) {
    currentTheme = 'dark';
  } else {
    currentTheme = 'light';
  }

  applyTheme(currentTheme);

  const toggleBtn = document.getElementById('theme-toggle-btn');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      currentTheme = currentTheme === 'light' ? 'dark' : 'light';
      applyTheme(currentTheme);
      localStorage.setItem('bolajon_theme', currentTheme);
      // Trigger Three.js scene update
      if (window.updateThreeTheme) {
        window.updateThreeTheme(currentTheme);
      }
    });
  }

  // Listen to system changes if user hasn't explicitly set a preference
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('bolajon_theme')) {
        currentTheme = e.matches ? 'dark' : 'light';
        applyTheme(currentTheme);
        if (window.updateThreeTheme) {
          window.updateThreeTheme(currentTheme);
        }
      }
    });
  }
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
}

// ==========================================================================
// 3. ADVANCED THREE.JS 3D SCENE (KINDERGARTEN PLAYGROUND & BUILDING)
// ==========================================================================
let scene, camera, renderer, animationFrameId;
let kindergartenGroup;
let alphabetBlocks = [];
let floatingBalloons = [];
let sunMesh, moonMesh, starsParticles;
let hemiLight, dirLight;
let isAutoRotating = true;
let isInteracting = false;
let mouseX = 0, mouseY = 0;
let targetRotationX = 0, targetRotationY = 0;
let baseRotationY = 0;

function initThreeScene() {
  const canvas = document.getElementById('three-hero-canvas');
  const container = document.getElementById('canvas-3d-wrapper');
  if (!canvas || !container) return;

  const width = container.clientWidth;
  const height = container.clientHeight;

  // Scene
  scene = new THREE.Scene();
  scene.background = null; // transparent to show beautiful CSS backdrop
  scene.fog = new THREE.FogExp2(0xfffaf5, 0.02);

  // Camera
  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
  camera.position.set(0, 5.5, 12.5);
  camera.lookAt(0, 1.2, 0);

  // Renderer
  renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  // Lights
  hemiLight = new THREE.HemisphereLight(0xfff7ed, 0x93c5fd, 0.9);
  scene.add(hemiLight);

  dirLight = new THREE.DirectionalLight(0xffedd5, 1.2);
  dirLight.position.set(8, 14, 8);
  dirLight.castShadow = true;
  dirLight.shadow.mapSize.width = 1024;
  dirLight.shadow.mapSize.height = 1024;
  dirLight.shadow.camera.near = 0.5;
  dirLight.shadow.camera.far = 30;
  dirLight.shadow.camera.left = -6;
  dirLight.shadow.camera.right = 6;
  dirLight.shadow.camera.top = 6;
  dirLight.shadow.camera.bottom = -6;
  dirLight.shadow.bias = -0.001;
  scene.add(dirLight);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambientLight);

  // Build Procedural Kindergarten Group
  kindergartenGroup = new THREE.Group();
  scene.add(kindergartenGroup);

  buildKindergartenWorld();

  // Raycaster for click interactivity
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  function triggerObjectBounce(object) {
    let startTime = performance.now();
    let initialY = object.position.y;
    function bounceAnim(currentTime) {
      let elapsed = (currentTime - startTime) / 1000;
      if (elapsed < 0.6) {
        object.position.y = initialY + Math.sin(elapsed * Math.PI / 0.6) * 0.8;
        object.rotation.y += 0.08;
        requestAnimationFrame(bounceAnim);
      } else {
        object.position.y = initialY;
      }
    }
    requestAnimationFrame(bounceAnim);

    // Launch small celebratory confetti from canvas center
    confetti({
      particleCount: 25,
      spread: 60,
      origin: { x: 0.75, y: 0.4 },
      colors: ['#ff6363', '#ffd43b', '#4dabf7', '#10b981']
    });
  }

  canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / canvas.clientWidth) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / canvas.clientHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(kindergartenGroup.children, true);
    if (intersects.length > 0) {
      // Find top group or mesh
      let hit = intersects[0].object;
      while (hit.parent && hit.parent !== kindergartenGroup && hit.parent !== scene) {
        hit = hit.parent;
      }
      triggerObjectBounce(hit);
    }
  });

  // Mouse drag & parallax
  let isDragging = false;
  let previousMousePosition = { x: 0, y: 0 };

  canvas.addEventListener('mousedown', (e) => {
    isDragging = true;
    previousMousePosition = { x: e.clientX, y: e.clientY };
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = ((e.clientX - rect.left) / canvas.clientWidth) * 2 - 1;
    mouseY = -((e.clientY - rect.top) / canvas.clientHeight) * 2 + 1;

    if (isDragging) {
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;
      kindergartenGroup.rotation.y += deltaX * 0.01;
      kindergartenGroup.rotation.x = Math.max(-0.2, Math.min(0.4, kindergartenGroup.rotation.x + deltaY * 0.005));
      previousMousePosition = { x: e.clientX, y: e.clientY };
    }
  });

  // Touch Support
  canvas.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      isDragging = true;
      previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });

  window.addEventListener('touchmove', (e) => {
    if (isDragging && e.touches.length === 1) {
      const deltaX = e.touches[0].clientX - previousMousePosition.x;
      kindergartenGroup.rotation.y += deltaX * 0.012;
      previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  }, { passive: true });

  // Window Resize
  window.addEventListener('resize', () => {
    if (!container) return;
    const newWidth = container.clientWidth;
    const newHeight = container.clientHeight;
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(newWidth, newHeight);
  });

  // Animation Loop
  let clock = new THREE.Clock();

  function animate() {
    animationFrameId = requestAnimationFrame(animate);
    const delta = clock.getDelta();
    const time = clock.getElapsedTime();

    // Auto rotate if not dragged
    if (isAutoRotating && !isDragging) {
      baseRotationY += 0.005;
      // Gentle parallax follow
      targetRotationY = baseRotationY + mouseX * 0.15;
      targetRotationX = mouseY * 0.08;
      kindergartenGroup.rotation.y = THREE.MathUtils.damp(kindergartenGroup.rotation.y, targetRotationY, 4, delta);
      kindergartenGroup.rotation.x = THREE.MathUtils.damp(kindergartenGroup.rotation.x, targetRotationX, 4, delta);
    }

    // Animate Alphabet blocks (bobbing & rotation)
    alphabetBlocks.forEach((block, index) => {
      block.position.y = block.userData.initialY + Math.sin(time * 2 + index * 1.5) * 0.15;
      block.rotation.y += 0.012;
    });

    // Animate balloons
    floatingBalloons.forEach((balloon, index) => {
      balloon.position.y = balloon.userData.initialY + Math.sin(time * 1.5 + index * 2) * 0.22;
      balloon.rotation.z = Math.sin(time + index) * 0.08;
    });

    // Sun / Moon subtle rotation
    if (sunMesh) sunMesh.rotation.z += 0.008;
    if (moonMesh) moonMesh.rotation.y += 0.006;

    renderer.render(scene, camera);
  }

  animate();

  // Expose theme switcher for Three.js
  window.updateThreeTheme = (theme) => {
    if (theme === 'dark') {
      hemiLight.color.setHex(0x38bdf8);
      hemiLight.groundColor.setHex(0x1e293b);
      hemiLight.intensity = 0.6;
      dirLight.color.setHex(0x93c5fd);
      dirLight.intensity = 0.7;
      scene.fog.color.setHex(0x0a0f1d);
      if (sunMesh) sunMesh.visible = false;
      if (moonMesh) moonMesh.visible = true;
      if (starsParticles) starsParticles.visible = true;
    } else {
      hemiLight.color.setHex(0xfff7ed);
      hemiLight.groundColor.setHex(0x93c5fd);
      hemiLight.intensity = 0.9;
      dirLight.color.setHex(0xffedd5);
      dirLight.intensity = 1.2;
      scene.fog.color.setHex(0xfffaf5);
      if (sunMesh) sunMesh.visible = true;
      if (moonMesh) moonMesh.visible = false;
      if (starsParticles) starsParticles.visible = false;
    }
  };

  // Sync initial theme
  window.updateThreeTheme(currentTheme);

  // Setup Dock Controllers
  setupDockControls();
}

// Procedural 3D World Construction
function buildKindergartenWorld() {
  const materials = {
    ground: new THREE.MeshStandardMaterial({ color: 0x86efac, roughness: 0.8 }),
    buildingWall: new THREE.MeshStandardMaterial({ color: 0xffedd5, roughness: 0.4 }),
    roofMain: new THREE.MeshStandardMaterial({ color: 0xff6363, roughness: 0.3 }),
    roofTower: new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.3 }),
    windows: new THREE.MeshStandardMaterial({ color: 0xbae6fd, roughness: 0.2, metalness: 0.2 }),
    windowFrame: new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.5 }),
    door: new THREE.MeshStandardMaterial({ color: 0x3b82f6, roughness: 0.4 }),
    slide: new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.3 }),
    slideMetal: new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.2, metalness: 0.8 }),
    wood: new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.7 }),
    leaves: new THREE.MeshStandardMaterial({ color: 0x22c55e, roughness: 0.6 })
  };

  // 1. Ground Island (Soft round cylinder)
  const groundGeo = new THREE.CylinderGeometry(5.2, 5.4, 0.4, 48);
  const groundMesh = new THREE.Mesh(groundGeo, materials.ground);
  groundMesh.position.y = -0.2;
  groundMesh.receiveShadow = true;
  kindergartenGroup.add(groundMesh);

  // 2. Main Kindergarten Building
  const buildingGroup = new THREE.Group();
  buildingGroup.position.set(-0.6, 0, -0.6);

  // Central block
  const mainBlockGeo = new THREE.BoxGeometry(3.6, 2.2, 2.6);
  const mainBlock = new THREE.Mesh(mainBlockGeo, materials.buildingWall);
  mainBlock.position.y = 1.1;
  mainBlock.castShadow = true;
  mainBlock.receiveShadow = true;
  buildingGroup.add(mainBlock);

  // Main Roof (Gable roof via cone/prism)
  const roofGeo = new THREE.ConeGeometry(2.7, 1.2, 4);
  const roofMesh = new THREE.Mesh(roofGeo, materials.roofMain);
  roofMesh.position.y = 2.8;
  roofMesh.rotation.y = Math.PI / 4;
  roofMesh.castShadow = true;
  buildingGroup.add(roofMesh);

  // Clock Tower
  const towerGeo = new THREE.CylinderGeometry(0.55, 0.65, 1.8, 16);
  const towerMesh = new THREE.Mesh(towerGeo, materials.buildingWall);
  towerMesh.position.set(0, 3.1, 0.4);
  towerMesh.castShadow = true;
  buildingGroup.add(towerMesh);

  // Tower Conical Roof
  const towerRoofGeo = new THREE.ConeGeometry(0.75, 1.1, 16);
  const towerRoofMesh = new THREE.Mesh(towerRoofGeo, materials.roofTower);
  towerRoofMesh.position.set(0, 4.5, 0.4);
  towerRoofMesh.castShadow = true;
  buildingGroup.add(towerRoofMesh);

  // Clock face
  const clockGeo = new THREE.CircleGeometry(0.28, 16);
  const clockMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const clockMesh = new THREE.Mesh(clockGeo, clockMat);
  clockMesh.position.set(0, 3.4, 1.06);
  buildingGroup.add(clockMesh);

  // Arched Windows
  const winGeo = new THREE.BoxGeometry(0.45, 0.65, 0.06);
  const winPositions = [
    [-1.1, 1.2, 1.32],
    [1.1, 1.2, 1.32],
    [-1.1, 1.2, -1.32],
    [1.1, 1.2, -1.32]
  ];
  winPositions.forEach(pos => {
    const win = new THREE.Mesh(winGeo, materials.windows);
    win.position.set(pos[0], pos[1], pos[2]);
    buildingGroup.add(win);
  });

  // Front Entrance Door
  const doorGeo = new THREE.BoxGeometry(0.7, 1.1, 0.08);
  const doorMesh = new THREE.Mesh(doorGeo, materials.door);
  doorMesh.position.set(0, 0.55, 1.32);
  buildingGroup.add(doorMesh);

  // Welcome Canopy over door
  const canopyGeo = new THREE.CylinderGeometry(0.5, 0.5, 0.8, 12, 1, false, 0, Math.PI);
  const canopyMat = new THREE.MeshStandardMaterial({ color: 0xff6363 });
  const canopyMesh = new THREE.Mesh(canopyGeo, canopyMat);
  canopyMesh.position.set(0, 1.25, 1.4);
  canopyMesh.rotation.z = Math.PI / 2;
  buildingGroup.add(canopyMesh);

  kindergartenGroup.add(buildingGroup);

  // 3. Playground: Children's Slide
  const slideGroup = new THREE.Group();
  slideGroup.position.set(2.4, 0, 0.8);
  slideGroup.rotation.y = -Math.PI / 3;

  // Platform
  const platGeo = new THREE.BoxGeometry(0.9, 0.1, 0.9);
  const platMesh = new THREE.Mesh(platGeo, materials.wood);
  platMesh.position.y = 1.3;
  slideGroup.add(platMesh);

  // Platform Legs
  const legGeo = new THREE.CylinderGeometry(0.05, 0.05, 1.3);
  for (let lx of [-0.4, 0.4]) {
    for (let lz of [-0.4, 0.4]) {
      const leg = new THREE.Mesh(legGeo, materials.wood);
      leg.position.set(lx, 0.65, lz);
      slideGroup.add(leg);
    }
  }

  // Slide Chute (Slanted curved curve)
  const chuteGeo = new THREE.BoxGeometry(0.6, 0.08, 2.2);
  const chuteMesh = new THREE.Mesh(chuteGeo, materials.slide);
  chuteMesh.position.set(0, 0.65, 1.0);
  chuteMesh.rotation.x = -Math.PI / 5;
  chuteMesh.castShadow = true;
  slideGroup.add(chuteMesh);

  kindergartenGroup.add(slideGroup);

  // 4. Procedural Fluffy Trees
  function createTree(x, z, scale = 1) {
    const treeGroup = new THREE.Group();
    treeGroup.position.set(x, 0, z);
    treeGroup.scale.set(scale, scale, scale);

    const trunkGeo = new THREE.CylinderGeometry(0.12, 0.16, 0.8, 8);
    const trunk = new THREE.Mesh(trunkGeo, materials.wood);
    trunk.position.y = 0.4;
    trunk.castShadow = true;
    treeGroup.add(trunk);

    const foliageGeo = new THREE.SphereGeometry(0.65, 12, 12);
    const foliage = new THREE.Mesh(foliageGeo, materials.leaves);
    foliage.position.y = 1.1;
    foliage.castShadow = true;
    treeGroup.add(foliage);

    const foliageTopGeo = new THREE.SphereGeometry(0.45, 10, 10);
    const foliageTop = new THREE.Mesh(foliageTopGeo, materials.leaves);
    foliageTop.position.y = 1.5;
    treeGroup.add(foliageTop);

    kindergartenGroup.add(treeGroup);
  }

  createTree(-2.8, -1.8, 1.2);
  createTree(-3.2, 0.5, 0.9);
  createTree(3.2, -1.5, 1.1);
  createTree(2.8, 2.2, 0.8);

  // 5. Interactive 3D Alphabet Blocks [A], [B], [C]
  function createAlphabetBlock(letter, colorHex, x, y, z) {
    const size = 0.55;
    // Create procedural canvas texture for letter
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#' + new THREE.Color(colorHex).getHexString();
    ctx.fillRect(0, 0, 128, 128);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 10;
    ctx.strokeRect(8, 8, 112, 112);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 76px Quicksand, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(letter, 64, 68);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;

    const blockMat = new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 0.3,
      metalness: 0.1
    });

    const blockGeo = new THREE.BoxGeometry(size, size, size);
    const blockMesh = new THREE.Mesh(blockGeo, blockMat);
    blockMesh.position.set(x, y, z);
    blockMesh.castShadow = true;
    blockMesh.userData = { initialY: y, letter: letter };

    alphabetBlocks.push(blockMesh);
    kindergartenGroup.add(blockMesh);
  }

  createAlphabetBlock('A', 0xff6363, -1.8, 0.35, 1.8);
  createAlphabetBlock('B', 0xf59e0b, -1.2, 0.35, 2.2);
  createAlphabetBlock('C', 0x3b82f6, -0.6, 0.35, 2.0);

  // 6. Floating Pastel Party Balloons
  function createBalloon(colorHex, x, y, z) {
    const balloonGroup = new THREE.Group();
    balloonGroup.position.set(x, y, z);
    balloonGroup.userData = { initialY: y };

    const balloonGeo = new THREE.SphereGeometry(0.3, 16, 16);
    balloonGeo.scale(1, 1.25, 1);
    const balloonMat = new THREE.MeshStandardMaterial({
      color: colorHex,
      roughness: 0.2,
      metalness: 0.2
    });
    const balloonMesh = new THREE.Mesh(balloonGeo, balloonMat);
    balloonMesh.castShadow = true;
    balloonGroup.add(balloonMesh);

    // Knot
    const knotGeo = new THREE.ConeGeometry(0.06, 0.08, 8);
    const knotMesh = new THREE.Mesh(knotGeo, balloonMat);
    knotMesh.position.y = -0.38;
    knotMesh.rotation.x = Math.PI;
    balloonGroup.add(knotMesh);

    // String
    const stringGeo = new THREE.CylinderGeometry(0.008, 0.008, 0.7);
    const stringMat = new THREE.MeshBasicMaterial({ color: 0x94a3b8 });
    const stringMesh = new THREE.Mesh(stringGeo, stringMat);
    stringMesh.position.y = -0.75;
    balloonGroup.add(stringMesh);

    floatingBalloons.push(balloonGroup);
    kindergartenGroup.add(balloonGroup);
  }

  createBalloon(0xff6363, -2.4, 2.6, 0.5);
  createBalloon(0xf59e0b, -2.1, 3.1, 0.8);
  createBalloon(0x3b82f6, -2.6, 2.8, 1.1);

  // 7. Rainbow Arc over the school
  const rainbowGroup = new THREE.Group();
  rainbowGroup.position.set(0, 3.8, -2.4);
  const rainbowColors = [0xff6363, 0xf59e0b, 0xfef08a, 0x22c55e, 0x3b82f6, 0xa855f7];
  rainbowColors.forEach((color, i) => {
    const radius = 3.6 + i * 0.12;
    const tubeGeo = new THREE.TorusGeometry(radius, 0.06, 8, 32, Math.PI);
    const tubeMat = new THREE.MeshBasicMaterial({ color: color });
    const tubeMesh = new THREE.Mesh(tubeGeo, tubeMat);
    tubeMesh.rotation.z = 0;
    rainbowGroup.add(tubeMesh);
  });
  kindergartenGroup.add(rainbowGroup);

  // 8. Sun (for Daytime)
  const sunGeo = new THREE.SphereGeometry(0.65, 16, 16);
  const sunMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b });
  sunMesh = new THREE.Mesh(sunGeo, sunMat);
  sunMesh.position.set(4.5, 4.8, -2.5);
  kindergartenGroup.add(sunMesh);

  // 9. Moon (for Night Mode)
  const moonGeo = new THREE.SphereGeometry(0.55, 16, 16);
  const moonMat = new THREE.MeshStandardMaterial({
    color: 0xbae6fd,
    emissive: 0x38bdf8,
    emissiveIntensity: 0.6
  });
  moonMesh = new THREE.Mesh(moonGeo, moonMat);
  moonMesh.position.set(4.5, 4.8, -2.5);
  moonMesh.visible = false;
  kindergartenGroup.add(moonMesh);

  // 10. Starfield particles (Night Mode)
  const starsGeo = new THREE.BufferGeometry();
  const starCount = 120;
  const starPositions = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount * 3; i += 3) {
    starPositions[i] = (Math.random() - 0.5) * 20;
    starPositions[i + 1] = Math.random() * 8 + 2;
    starPositions[i + 2] = (Math.random() - 0.5) * 15 - 2;
  }
  starsGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
  const starsMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.08 });
  starsParticles = new THREE.Points(starsGeo, starsMat);
  starsParticles.visible = false;
  kindergartenGroup.add(starsParticles);
}

// 3D Dock Controls Integration
function setupDockControls() {
  const dock = document.getElementById('canvas-dock');
  const toggleBtn = document.getElementById('dock-toggle-btn');
  const rotateBtn = document.getElementById('btn-3d-rotate');
  const bounceBtn = document.getElementById('btn-3d-bounce');
  const confettiBtn = document.getElementById('btn-3d-confetti');
  const resetBtn = document.getElementById('btn-3d-reset');

  if (toggleBtn && dock) {
    toggleBtn.addEventListener('click', () => {
      dock.classList.toggle('collapsed');
      const isCollapsed = dock.classList.contains('collapsed');
      toggleBtn.querySelector('.dock-toggle-text').textContent = isCollapsed ? '▴ 3D Panel' : '▾ 3D Panel';
    });
  }

  if (rotateBtn) {
    rotateBtn.addEventListener('click', () => {
      isAutoRotating = !isAutoRotating;
      rotateBtn.classList.toggle('active', isAutoRotating);
    });
  }

  if (bounceBtn) {
    bounceBtn.addEventListener('click', () => {
      alphabetBlocks.forEach((block, idx) => {
        setTimeout(() => {
          let start = performance.now();
          let initY = block.userData.initialY;
          function b(t) {
            let el = (t - start) / 1000;
            if (el < 0.6) {
              block.position.y = initY + Math.sin(el * Math.PI / 0.6) * 0.9;
              block.rotation.y += 0.1;
              requestAnimationFrame(b);
            } else {
              block.position.y = initY;
            }
          }
          requestAnimationFrame(b);
        }, idx * 140);
      });
    });
  }

  if (confettiBtn) {
    confettiBtn.addEventListener('click', () => {
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 }
      });
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      baseRotationY = 0;
      targetRotationY = 0;
      targetRotationX = 0;
      kindergartenGroup.rotation.set(0, 0, 0);
    });
  }

  // Interactive stickers
  const stickerAbc = document.getElementById('sticker-abc');
  const stickerBalloon = document.getElementById('sticker-balloon');
  if (stickerAbc) {
    stickerAbc.addEventListener('click', () => {
      if (bounceBtn) bounceBtn.click();
    });
  }
  if (stickerBalloon) {
    stickerBalloon.addEventListener('click', () => {
      if (confettiBtn) confettiBtn.click();
    });
  }
}

// ==========================================================================
// 4. NAVIGATION, STICKY HEADER & MOBILE MENU
// ==========================================================================
function initNavigation() {
  const header = document.getElementById('header');
  const hamburger = document.getElementById('hamburger-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  // Sticky header shadow
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }, { passive: true });

  // Mobile menu toggle
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.contains('open');
      mobileMenu.classList.toggle('open', !isOpen);
      hamburger.setAttribute('aria-expanded', String(!isOpen));
      mobileMenu.setAttribute('aria-hidden', String(isOpen));
    });

    // Close when clicking link
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!header?.contains(e.target)) {
        mobileMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
      }
    });
  }

  // Active section spy on scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${sectionId}`);
        });
      }
    });
  }, { passive: true });
}

// ==========================================================================
// 5. 3D CARD TILT EFFECT (MOUSE PARALLAX)
// ==========================================================================
function init3DCardTilt() {
  const cards = document.querySelectorAll('.tilt-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculate tilt degrees (max ±10deg)
      const rotateX = -((y - centerY) / centerY) * 8;
      const rotateY = ((x - centerX) / centerX) * 8;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });
}

// ==========================================================================
// 6. SCROLL REVEAL & ANIMATED COUNTERS
// ==========================================================================
function initScrollRevealAndCounters() {
  const revealElements = document.querySelectorAll('.reveal-elem');
  const counterElements = document.querySelectorAll('.counter');

  // Reveal observer
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach(el => revealObserver.observe(el));

  // Counters observer
  let countersStarted = false;
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countersStarted) {
        countersStarted = true;
        animateCounters();
      }
    });
  }, { threshold: 0.2 });

  const statsSection = document.querySelector('.stats-counter-grid');
  if (statsSection) counterObserver.observe(statsSection);

  function animateCounters() {
    counterElements.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const duration = 2000;
      const startTime = performance.now();

      function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Easing out cubic
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentVal = Math.floor(easeOut * target);

        counter.textContent = currentVal.toLocaleString();

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target.toLocaleString();
        }
      }

      requestAnimationFrame(updateCounter);
    });
  }
}

// ==========================================================================
// 7. EDUCATIONAL PROGRAMS FILTER & MODAL
// ==========================================================================
function initProgramsSection() {
  const filterBtns = document.querySelectorAll('.programs-filter-bar .filter-btn');
  const programCards = document.querySelectorAll('.program-card');
  const modal = document.getElementById('program-modal');
  const modalBackdrop = document.getElementById('program-modal-backdrop');
  const modalClose = document.getElementById('modal-close-btn');
  const modalCloseAction = document.querySelector('.modal-close-action');
  const modalTitle = document.getElementById('modal-prog-title');
  const modalAge = document.getElementById('modal-prog-age');
  const modalIcon = document.getElementById('modal-prog-icon');
  const modalBody = document.getElementById('modal-prog-body');
  const modalEnroll = document.querySelector('.modal-enroll-action');

  // Filter Buttons
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      programCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // Program Detail Modal
  document.querySelectorAll('.program-modal-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const progId = btn.getAttribute('data-target');
      const data = PROGRAMS_DATA[progId];
      if (!data) return;

      modalTitle.textContent = data.title;
      modalAge.textContent = data.age;
      modalIcon.textContent = data.icon;
      modalIcon.style.backgroundColor = data.color + '22';

      modalBody.innerHTML = `
        <p style="margin-bottom: 14px; font-weight: 600;">${data.overview}</p>
        <div style="background: var(--bg-tertiary); padding: 12px 16px; border-radius: 12px; margin-bottom: 16px;">
          <strong>📅 Darslar jadvali:</strong> ${data.schedule}
        </div>
        <h4 style="font-weight: 800; margin-bottom: 8px; color: var(--text-primary);">Dastur rejasi:</h4>
        <ul style="display: flex; flex-direction: column; gap: 6px; margin-bottom: 18px;">
          ${data.curriculum.map(item => `<li style="padding-left: 20px; position: relative;"><span style="position: absolute; left: 0; color: var(--accent-green); font-weight: bold;">✓</span> ${item}</li>`).join('')}
        </ul>
        <div style="font-size: 0.85rem; color: var(--text-muted); border-top: 1px solid var(--border-color); padding-top: 10px;">
          <strong>Ustoz:</strong> ${data.teacher}
        </div>
      `;

      if (modalEnroll) {
        modalEnroll.onclick = () => {
          closeModal();
          // Pre-select program in form
          const progSelect = document.getElementById('program-select');
          if (progSelect) {
            for (let opt of progSelect.options) {
              if (opt.text.toLowerCase().includes(data.title.toLowerCase().slice(0, 10))) {
                progSelect.value = opt.value;
                break;
              }
            }
          }
        };
      }

      openModal();
    });
  });

  function openModal() {
    if (!modal) return;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalCloseAction) modalCloseAction.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);
}

// ==========================================================================
// 8. DAILY SCHEDULE TIMELINE & ADMIN EDITOR
// ==========================================================================
function initScheduleSection() {
  const tabs = document.querySelectorAll('#schedule-tabs .sched-tab');
  const timelineContainer = document.getElementById('schedule-timeline');
  const editBtn = document.getElementById('btn-edit-schedule');
  const modal = document.getElementById('schedule-modal');
  const modalBackdrop = document.getElementById('schedule-modal-backdrop');
  const modalClose = document.getElementById('schedule-modal-close');
  const editList = document.getElementById('schedule-edit-list');
  const saveBtn = document.getElementById('schedule-save-btn');
  const resetBtn = document.getElementById('schedule-reset-btn');

  let currentGroup = 'kichik';
  let customSchedules = JSON.parse(localStorage.getItem('bolajon_schedules') || '{}');

  function getActiveSchedule(group) {
    return customSchedules[group] || SCHEDULES_DATA[group];
  }

  function renderTimeline(group) {
    if (!timelineContainer) return;
    const items = getActiveSchedule(group);
    timelineContainer.innerHTML = items.map((item, index) => `
      <div class="timeline-item reveal-elem visible" data-index="${index}">
        <div class="timeline-time">${item.time}</div>
        <div class="timeline-marker">
          <span class="marker-icon">${item.icon}</span>
        </div>
        <div class="timeline-content tilt-card">
          <h4 class="timeline-title">${item.title}</h4>
          <p class="timeline-text">${item.text}</p>
          <span class="timeline-tag">${item.tag}</span>
        </div>
      </div>
    `).join('');

    // Re-bind tilt listeners
    init3DCardTilt();
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentGroup = tab.getAttribute('data-group');
      renderTimeline(currentGroup);
    });
  });

  // Edit Modal
  if (editBtn && modal) {
    editBtn.addEventListener('click', () => {
      const items = getActiveSchedule(currentGroup);
      editList.innerHTML = items.map((item, idx) => `
        <div class="schedule-edit-row">
          <span class="sched-edit-time">${item.time}</span>
          <div>
            <input type="text" class="sched-edit-input title-input" data-idx="${idx}" value="${item.title}" style="margin-bottom: 4px;" />
            <input type="text" class="sched-edit-input text-input" data-idx="${idx}" value="${item.text}" />
          </div>
        </div>
      `).join('');

      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });

    function closeSchedModal() {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    if (modalClose) modalClose.addEventListener('click', closeSchedModal);
    if (modalBackdrop) modalBackdrop.addEventListener('click', closeSchedModal);

    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        const items = [...getActiveSchedule(currentGroup)];
        const titleInputs = editList.querySelectorAll('.title-input');
        const textInputs = editList.querySelectorAll('.text-input');

        titleInputs.forEach((inp, idx) => {
          items[idx].title = inp.value;
          items[idx].text = textInputs[idx].value;
        });

        customSchedules[currentGroup] = items;
        localStorage.setItem('bolajon_schedules', JSON.stringify(customSchedules));
        renderTimeline(currentGroup);
        closeSchedModal();
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        delete customSchedules[currentGroup];
        localStorage.setItem('bolajon_schedules', JSON.stringify(customSchedules));
        renderTimeline(currentGroup);
        closeSchedModal();
      });
    }
  }
}

// ==========================================================================
// 9. PHOTO GALLERY & LIGHTBOX
// ==========================================================================
function initGalleryAndLightbox() {
  const filterBtns = document.querySelectorAll('.gallery-filter-bar .gallery-btn');
  const galleryCards = document.querySelectorAll('.gallery-card');
  const lightbox = document.getElementById('gallery-lightbox');
  const lightboxBackdrop = document.getElementById('lightbox-backdrop');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');
  const imgHolder = document.getElementById('lightbox-img-holder');
  const captionTitle = document.getElementById('lightbox-title');
  const captionDesc = document.getElementById('lightbox-desc');
  const counterSpan = document.getElementById('lightbox-counter');

  let currentGalleryIndex = 0;

  // Filter
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-filter');

      galleryCards.forEach(card => {
        const itemCat = card.getAttribute('data-category');
        if (cat === 'all' || itemCat === cat) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // Lightbox
  galleryCards.forEach(card => {
    card.addEventListener('click', () => {
      const idx = +card.getAttribute('data-index');
      openLightbox(idx);
    });
  });

  function openLightbox(index) {
    if (!lightbox) return;
    currentGalleryIndex = index;
    const item = GALLERY_ITEMS[currentGalleryIndex];
    if (!item) return;

    imgHolder.className = `lightbox-img-holder ${item.colorGrad}`;
    imgHolder.innerHTML = `<span style="filter: drop-shadow(0 10px 20px rgba(0,0,0,0.3)); font-size: 6rem;">${item.icon}</span>`;
    captionTitle.textContent = item.title;
    captionDesc.textContent = item.desc;
    counterSpan.textContent = `${currentGalleryIndex + 1} / ${GALLERY_ITEMS.length}`;

    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function nextImage() {
    currentGalleryIndex = (currentGalleryIndex + 1) % GALLERY_ITEMS.length;
    openLightbox(currentGalleryIndex);
  }

  function prevImage() {
    currentGalleryIndex = (currentGalleryIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length;
    openLightbox(currentGalleryIndex);
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
  if (lightboxNext) lightboxNext.addEventListener('click', nextImage);
  if (lightboxPrev) lightboxPrev.addEventListener('click', prevImage);

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    if (!lightbox?.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  });
}

// ==========================================================================
// 10. TESTIMONIALS SLIDER & LIVE REVIEW SUBMISSION
// ==========================================================================
function initTestimonials() {
  const carousel = document.getElementById('testimonials-carousel');
  const prevBtn = document.getElementById('carousel-prev-btn');
  const nextBtn = document.getElementById('carousel-next-btn');
  const dotsContainer = document.getElementById('carousel-dots');
  const openReviewBtn = document.getElementById('btn-open-review-modal');
  const reviewModal = document.getElementById('review-modal');
  const reviewBackdrop = document.getElementById('review-modal-backdrop');
  const reviewClose = document.getElementById('review-modal-close');
  const reviewForm = document.getElementById('review-form');
  const starBtns = document.querySelectorAll('.star-btn');

  let currentSlide = 0;
  let autoplayTimer = null;
  let selectedRating = 5;

  function updateSlider() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.carousel-dots .dot');

    slides.forEach((slide, idx) => {
      slide.classList.toggle('active', idx === currentSlide);
    });

    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentSlide);
    });
  }

  function nextSlide() {
    const slides = document.querySelectorAll('.testimonial-slide');
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlider();
  }

  function prevSlide() {
    const slides = document.querySelectorAll('.testimonial-slide');
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlider();
  }

  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);

  if (dotsContainer) {
    dotsContainer.addEventListener('click', (e) => {
      const dot = e.target.closest('.dot');
      if (dot) {
        currentSlide = +dot.getAttribute('data-slide');
        updateSlider();
      }
    });
  }

  // Auto-play with pause on hover
  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(nextSlide, 5500);
  }

  function stopAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
  }

  if (carousel) {
    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);
    startAutoplay();
  }

  // Star Rating Selection
  starBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      selectedRating = +btn.getAttribute('data-rating');
      starBtns.forEach(s => {
        const r = +s.getAttribute('data-rating');
        s.classList.toggle('active', r <= selectedRating);
      });
    });
  });

  // Submit Review Modal
  if (openReviewBtn && reviewModal) {
    openReviewBtn.addEventListener('click', () => {
      reviewModal.classList.add('open');
      reviewModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });

    function closeRevModal() {
      reviewModal.classList.remove('open');
      reviewModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    if (reviewClose) reviewClose.addEventListener('click', closeRevModal);
    if (reviewBackdrop) reviewBackdrop.addEventListener('click', closeRevModal);

    if (reviewForm) {
      reviewForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('rev-name').value.trim();
        const child = document.getElementById('rev-child').value.trim();
        const text = document.getElementById('rev-text').value.trim();

        if (!name || !child || !text) return;

        // Generate initials
        const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

        // Prepend new slide
        const newSlide = document.createElement('div');
        newSlide.className = 'testimonial-slide';
        newSlide.innerHTML = `
          <div class="testimonial-card tilt-card" data-tilt>
            <div class="testi-stars">${'★'.repeat(selectedRating)}${'☆'.repeat(5 - selectedRating)}</div>
            <p class="testi-quote">“${text}”</p>
            <div class="testi-author">
              <div class="author-avatar" style="background: var(--primary);">${initials}</div>
              <div class="author-info">
                <strong class="author-name">${name}</strong>
                <span class="author-role">${child}</span>
              </div>
            </div>
          </div>
        `;

        carousel.prepend(newSlide);

        // Add dot
        const newDot = document.createElement('button');
        newDot.className = 'dot';
        newDot.setAttribute('data-slide', String(document.querySelectorAll('.testimonial-slide').length - 1));
        dotsContainer.appendChild(newDot);

        currentSlide = 0;
        updateSlider();
        init3DCardTilt();
        closeRevModal();
        reviewForm.reset();

        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 }
        });
      });
    }
  }
}

// ==========================================================================
// 11. ADMISSION FORM VALIDATION & CELEBRATION
// ==========================================================================
function initAdmissionForm() {
  const form = document.getElementById('admission-form');
  const phoneInput = document.getElementById('parent-phone');
  const parentNameInput = document.getElementById('parent-name');
  const childNameInput = document.getElementById('child-name');
  const childAgeSelect = document.getElementById('child-age');
  const programSelect = document.getElementById('program-select');
  const termsCheckbox = document.getElementById('terms-agree');
  const submitBtn = document.getElementById('submit-btn');
  const successModal = document.getElementById('success-modal');
  const successCloseBtn = document.getElementById('success-close-btn');
  const successBackdrop = document.getElementById('success-modal-backdrop');

  // Uzbekistan Phone Number Input Mask (+998 (90) 123-45-67)
  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      let val = phoneInput.value.replace(/\D/g, '');
      if (!val.startsWith('998')) {
        val = '998' + val;
      }
      val = val.substring(0, 12); // 998 + 9 digits

      let formatted = '+998';
      if (val.length > 3) {
        formatted += ' (' + val.substring(3, 5);
      }
      if (val.length >= 5) {
        formatted += ') ' + val.substring(5, 8);
      }
      if (val.length >= 8) {
        formatted += '-' + val.substring(8, 10);
      }
      if (val.length >= 10) {
        formatted += '-' + val.substring(10, 12);
      }

      phoneInput.value = formatted;
    });

    phoneInput.addEventListener('focus', () => {
      if (!phoneInput.value) {
        phoneInput.value = '+998 (';
      }
    });
  }

  // Helper validation
  function setError(input, errId, message) {
    input.classList.add('error');
    const errEl = document.getElementById(errId);
    if (errEl) errEl.textContent = message;
  }

  function clearError(input, errId) {
    input.classList.remove('error');
    const errEl = document.getElementById(errId);
    if (errEl) errEl.textContent = '';
  }

  if (form) {
    // Clear errors on input
    parentNameInput?.addEventListener('input', () => clearError(parentNameInput, 'err-parent-name'));
    phoneInput?.addEventListener('input', () => clearError(phoneInput, 'err-parent-phone'));
    childNameInput?.addEventListener('input', () => clearError(childNameInput, 'err-child-name'));
    childAgeSelect?.addEventListener('change', () => clearError(childAgeSelect, 'err-child-age'));
    programSelect?.addEventListener('change', () => clearError(programSelect, 'err-program-select'));
    termsCheckbox?.addEventListener('change', () => clearError(termsCheckbox, 'err-terms-agree'));

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Validate Parent Name
      if (!parentNameInput.value.trim() || parentNameInput.value.trim().length < 3) {
        setError(parentNameInput, 'err-parent-name', 'Iltimos, to‘liq ism va familiyangizni kiriting');
        isValid = false;
      } else {
        clearError(parentNameInput, 'err-parent-name');
      }

      // Validate Phone (must be full 9 digits + 998)
      const digitsOnly = phoneInput.value.replace(/\D/g, '');
      if (digitsOnly.length !== 12) {
        setError(phoneInput, 'err-parent-phone', 'Telefon raqamini to‘liq kiriting (masalan: +998 (90) 123-45-67)');
        isValid = false;
      } else {
        clearError(phoneInput, 'err-parent-phone');
      }

      // Validate Child Name
      if (!childNameInput.value.trim() || childNameInput.value.trim().length < 2) {
        setError(childNameInput, 'err-child-name', 'Farzandingizning ismini kiriting');
        isValid = false;
      } else {
        clearError(childNameInput, 'err-child-name');
      }

      // Validate Child Age
      if (!childAgeSelect.value) {
        setError(childAgeSelect, 'err-child-age', 'Farzandingiz yoshini tanlang');
        isValid = false;
      } else {
        clearError(childAgeSelect, 'err-child-age');
      }

      // Validate Program
      if (!programSelect.value) {
        setError(programSelect, 'err-program-select', 'Qiziqtirgan dasturni tanlang');
        isValid = false;
      } else {
        clearError(programSelect, 'err-program-select');
      }

      // Validate Terms
      if (!termsCheckbox.checked) {
        setError(termsCheckbox, 'err-terms-agree', 'Qoidalar bilan tanishib, rozilik bildirishingiz kerak');
        isValid = false;
      } else {
        clearError(termsCheckbox, 'err-terms-agree');
      }

      if (!isValid) return;

      // Submit loading state
      submitBtn.classList.add('loading');
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;

        // Open Success Celebration Modal
        if (successModal) {
          successModal.classList.add('open');
          successModal.setAttribute('aria-hidden', 'false');
          document.body.style.overflow = 'hidden';

          // Trigger Confetti fireworks!
          confetti({
            particleCount: 100,
            spread: 80,
            origin: { y: 0.5 }
          });
        }

        form.reset();
      }, 1200);
    });
  }

  function closeSuccessModal() {
    if (!successModal) return;
    successModal.classList.remove('open');
    successModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (successCloseBtn) successCloseBtn.addEventListener('click', closeSuccessModal);
  if (successBackdrop) successBackdrop.addEventListener('click', closeSuccessModal);
}

// ==========================================================================
// 12. FAQ ACCORDION & MISC UTILITIES
// ==========================================================================
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    questionBtn?.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => {
        i.classList.remove('active');
        i.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
      });

      if (!isActive) {
        item.classList.add('active');
        questionBtn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

function initFooterAndBackToTop() {
  // Dynamic Year
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Back to Top Button
  const backToTopBtn = document.getElementById('back-to-top-btn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

// ==========================================================================
// 13. DOM READY INITIALIZER
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initThreeScene();
  initNavigation();
  init3DCardTilt();
  initScrollRevealAndCounters();
  initProgramsSection();
  initScheduleSection();
  initGalleryAndLightbox();
  initTestimonials();
  initAdmissionForm();
  initFaqAccordion();
  initFooterAndBackToTop();
});
