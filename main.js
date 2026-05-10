document.addEventListener('DOMContentLoaded', () => {

  // 1. オープニングアニメーション制御
  const splash = document.getElementById('splash-screen');
  const line1 = document.querySelector('.line1');
  const line2 = document.querySelector('.line2');

  setTimeout(() => { line1.classList.add('show'); }, 500); 
  setTimeout(() => { line2.classList.add('show'); }, 2000); 
  setTimeout(() => { 
    splash.style.opacity = '0'; 
    setTimeout(() => { splash.style.visibility = 'hidden'; }, 1500);
  }, 4500);

  // 2. SPAルーティング
  const navLinks = document.querySelectorAll('a[data-target]');
  const views = document.querySelectorAll('.view');
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  function switchView(targetId) {
    views.forEach(view => view.classList.remove('active'));
    document.getElementById(targetId).classList.add('active');
    window.scrollTo(0, 0);
  }

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.getAttribute('data-target');
      switchView(target);
      if(mobileMenu.classList.contains('open')) {
        menuBtn.classList.remove('open');
        mobileMenu.classList.remove('open');
      }
    });
  });

  menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });

  // 3. カウントダウンタイマー (次回：2027年5月5日へ)
  const targetDate = new Date('2027-05-05T00:00:00+09:00').getTime();
  
  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;
    const days = Math.ceil(distance / (1000 * 60 * 60 * 24));
    
    const displayStr = `${days}<span>日</span>`;
    document.getElementById('top-countdown').innerHTML = displayStr;
    const muCount = document.getElementById('mu-countdown');
    if(muCount) muCount.innerHTML = displayStr;
  }
  updateCountdown();

  // 4. MYウロコ：ニックネーム登録＆データ保存
  const urokoForm = document.getElementById('uroko-form');
  const nicknameInput = document.getElementById('nickname');
  const familyList = document.getElementById('family-list');

  let savedFamily = JSON.parse(localStorage.getItem('koinobori_family')) || [];

  function renderFamily() {
    if(!familyList) return;
    familyList.innerHTML = '';
    savedFamily.forEach(member => {
      const li = document.createElement('li');
      li.innerHTML = `<strong>${member.name}</strong> さんの鱗は、<br>全体で ${member.row}列目の ${member.num}番目の鯉のぼりに付きます！`;
      familyList.appendChild(li);
    });
  }

  if(urokoForm) {
    urokoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = nicknameInput.value.trim();
      if(name) {
        const randomRow = Math.floor(Math.random() * 20) + 1;
        const randomNum = Math.floor(Math.random() * 50) + 1;
        savedFamily.push({ name: name, row: randomRow, num: randomNum });
        localStorage.setItem('koinobori_family', JSON.stringify(savedFamily));
        nicknameInput.value = '';
        renderFamily();
      }
    });
    renderFamily();
  }

  // 5. MYウロコ：カメラスキャン体験
  const cameraInput = document.getElementById('camera-input');
  const galleryGrid = document.getElementById('gallery-grid');

  if(cameraInput) {
    cameraInput.addEventListener('change', (e) => {
      if(e.target.files.length > 0) {
        alert('鱗の読み込みが完了しました！\nステッカー生成用データとして登録されました。');
        const newItem = document.createElement('div');
        newItem.className = 'gallery-item';
        newItem.innerHTML = `<div class="dummy-img bg-red"></div><p>あなた</p>`;
        galleryGrid.prepend(newItem);
      }
    });
  }

  // 6. スクロール時のフェードイン制御（追加）
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

});
