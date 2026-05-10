document.addEventListener('DOMContentLoaded', () => {

  // =========================================
  // 1. オープニングアニメーション制御
  // =========================================
  const splash = document.getElementById('splash-screen');
  const line1 = document.querySelector('.line1');
  const line2 = document.querySelector('.line2');

  // アニメーションシーケンス
  setTimeout(() => { line1.classList.add('show'); }, 500); // 0.5秒後に1行目
  setTimeout(() => { line2.classList.add('show'); }, 2000); // 2秒後に2行目
  setTimeout(() => { 
    splash.style.opacity = '0'; 
    setTimeout(() => { splash.style.visibility = 'hidden'; }, 1500);
  }, 4500); // 4.5秒後にフェードアウトアウト開始

  // =========================================
  // 2. SPAルーティング (画面切り替え)
  // =========================================
  const navLinks = document.querySelectorAll('a[data-target]');
  const views = document.querySelectorAll('.view');
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  function switchView(targetId) {
    views.forEach(view => view.classList.remove('active'));
    document.getElementById(targetId).classList.add('active');
    
    // タグのアクティブ状態更新
    document.querySelectorAll('.side-tags a').forEach(tag => tag.classList.remove('active'));
    const activeTag = document.querySelector(`.side-tags a[data-target="${targetId}"]`);
    if(activeTag) activeTag.classList.add('active');

    window.scrollTo(0, 0); // 遷移時に上へスクロール
  }

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.getAttribute('data-target');
      switchView(target);
      // スマホメニューが開いていたら閉じる
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

  // =========================================
  // 3. カウントダウンタイマー (5月5日へ)
  // =========================================
  const targetDate = new Date('2026-05-05T00:00:00+09:00').getTime();
  
  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;
    const days = Math.ceil(distance / (1000 * 60 * 60 * 24));
    
    const displayStr = distance > 0 ? `${days}<span>日</span>` : `本日<span>泳いでいます</span>`;
    document.getElementById('top-countdown').innerHTML = displayStr;
    document.getElementById('mu-countdown').innerHTML = displayStr;
  }
  updateCountdown();

  // =========================================
  // 4. MYウロコ：ニックネーム登録＆データ保存 (localStorage)
  // =========================================
  const urokoForm = document.getElementById('uroko-form');
  const nicknameInput = document.getElementById('nickname');
  const familyList = document.getElementById('family-list');

  // 保存されているデータを読み込む
  let savedFamily = JSON.parse(localStorage.getItem('koinobori_family')) || [];

  function renderFamily() {
    familyList.innerHTML = '';
    savedFamily.forEach(member => {
      const li = document.createElement('li');
      li.innerHTML = `<strong>${member.name}</strong> さんの鱗は、<br>全体で ${member.row}列目の ${member.num}番目の鯉のぼりに付きます！`;
      familyList.appendChild(li);
    });
  }

  urokoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = nicknameInput.value.trim();
    if(name) {
      // ランダムな位置を生成
      const randomRow = Math.floor(Math.random() * 20) + 1;
      const randomNum = Math.floor(Math.random() * 50) + 1;
      
      savedFamily.push({ name: name, row: randomRow, num: randomNum });
      localStorage.setItem('koinobori_family', JSON.stringify(savedFamily));
      
      nicknameInput.value = '';
      renderFamily();
    }
  });
  renderFamily(); // 初期描画

  // =========================================
  // 5. MYウロコ：カメラスキャン体験 (モック)
  // =========================================
  const cameraInput = document.getElementById('camera-input');
  const galleryGrid = document.getElementById('gallery-grid');

  cameraInput.addEventListener('change', (e) => {
    if(e.target.files.length > 0) {
      // 本来は画像をアップロードするが、今回はUIの体験としてアラートを出す
      alert('鱗の読み込みが完了しました！\nステッカー生成用データとして登録されました。');
      
      // ギャラリーに自分のものを追加
      const newItem = document.createElement('div');
      newItem.className = 'gallery-item';
      newItem.innerHTML = `<div class="dummy-img bg-red"></div><p>あなた</p>`;
      galleryGrid.prepend(newItem);
    }
  });

});
