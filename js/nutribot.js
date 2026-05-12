(function () {
  'use strict';

  var basePath = window.location.pathname.indexOf('/pages/') !== -1 ? '../' : './';

  /* RESPONSE */
  var responses = [
    {
      keywords: ['kalori', 'cek kalori', 'kalori makanan', 'hitung kalori'],
      reply: 'Berikut perkiraan kalori beberapa makanan populer:\n\n🍚 <strong>Nasi putih (1 porsi)</strong> — 204 kkal\n🍗 <strong>Ayam goreng (1 potong)</strong> — 260 kkal\n🥚 <strong>Telur rebus</strong> — 77 kkal\n🍌 <strong>Pisang (1 buah)</strong> — 105 kkal\n🥤 <strong>Teh manis</strong> — 70 kkal\n\nUntuk analisis lebih detail, coba fitur <strong>Analisis Gizi</strong> kami yang bisa memindai foto makanan! 📸'
    },
    {
      keywords: ['menu diet', 'diet sehat', 'menu sehat', 'diet'],
      reply: 'Berikut contoh menu diet sehat sehari:\n\n🌅 <strong>Sarapan:</strong> Oatmeal + pisang + selai kacang\n☀️ <strong>Makan Siang:</strong> Nasi merah + ayam panggang + tumis sayur\n🍎 <strong>Snack:</strong> Yogurt + granola\n🌙 <strong>Makan Malam:</strong> Sup ayam + salad sayur\n\n💧 Jangan lupa minum 8 gelas air putih per hari! Untuk rencana yang lebih personal, kunjungi fitur <strong>Perencanaan Nutrisi</strong> kami.'
    },
    {
      keywords: ['sarapan', 'sarapan cepat', 'breakfast', 'pagi'],
      reply: 'Ide sarapan cepat & sehat:\n\n1️⃣ <strong>Smoothie Bowl</strong> — Blender pisang beku + susu + topping granola (5 menit)\n2️⃣ <strong>Roti Gandum + Alpukat</strong> — Sehat & mengenyangkan (3 menit)\n3️⃣ <strong>Oatmeal Overnight</strong> — Siapkan malam, pagi tinggal makan!\n4️⃣ <strong>Telur Orak-arik + Toast</strong> — Protein tinggi (5 menit)\n\nDapatkan lebih banyak resep di fitur <strong>Resep Sehat</strong> NutriNesia! 🥗'
    },
    {
      keywords: ['apa itu nutrinesia', 'nutrinesia', 'tentang', 'about', 'platform'],
      reply: '<strong>NutriNesia</strong> adalah platform nutrisi cerdas Indonesia yang membantu kamu menjalani hidup lebih sehat! 🇮🇩\n\nFitur utama kami:\n📊 <strong>Analisis Gizi</strong> — Scan foto makanan untuk tahu kandungan nutrisinya\n🍽️ <strong>Resep Sehat</strong> — Koleksi resep berdasarkan kebutuhanmu\n📋 <strong>Perencanaan Nutrisi</strong> — Rencana makan harian personal\n🏆 <strong>Challenge Sehat</strong> — Tantangan seru untuk pola hidup sehat\n👥 <strong>Komunitas</strong> — Diskusi & berbagi tips sesama member\n💬 <strong>Konsultasi</strong> — Tanya langsung ke ahli gizi'
    },
    {
      keywords: ['challenge', 'tantangan', 'tantangan sehat'],
      reply: '<strong>Challenge Sehat</strong> adalah fitur gamifikasi di NutriNesia! 🏆\n\nCara mengikuti:\n1️⃣ Buka halaman <strong>Challenge Sehat</strong> dari menu Layanan\n2️⃣ Pilih challenge yang menarik (misal: "30 Hari Minum Air")\n3️⃣ Klik <strong>Ikut Challenge</strong> untuk bergabung\n4️⃣ Catat progress harianmu & raih badge!\n\nChallenge berjalan per periode. Yuk mulai hidup sehat bareng komunitas! 💪'
    },
    {
      keywords: ['perencanaan', 'meal plan', 'rencana makan', 'nutrisi harian'],
      reply: 'Fitur <strong>Perencanaan Nutrisi</strong> membantu kamu menyusun menu harian:\n\n📋 Masukkan profil (berat badan, tinggi, tujuan)\n🍽️ Dapatkan rekomendasi menu per hari\n📈 Pantau asupan kalori & nutrisi\n🔄 Sesuaikan menu sesuai preferensi\n\nBuka melalui menu <strong>Layanan → Perencanaan Nutrisi</strong>. Cocok untuk yang ingin diet terstruktur! 📊'
    },
    {
      keywords: ['konsultasi', 'ahli gizi', 'dokter', 'tanya ahli'],
      reply: 'Kamu bisa berkonsultasi langsung dengan ahli gizi di NutriNesia! 👩‍⚕️\n\nCaranya:\n1️⃣ Buka halaman <strong>Konsultasi</strong>\n2️⃣ Pilih ahli gizi yang tersedia\n3️⃣ Pilih jadwal & jenis konsultasi\n4️⃣ Lakukan sesi konsultasi online\n\nKonsultasi tersedia melalui chat, video call, dan tatap muka. Cocok untuk kebutuhan gizi khusus atau program diet personal! 🩺'
    },
    {
      keywords: ['komunitas', 'forum', 'diskusi', 'tips'],
      reply: 'Di <strong>Komunitas NutriNesia</strong>, kamu bisa:\n\n💬 Berbagi tips & pengalaman hidup sehat\n📝 Buat topik diskusi baru\n❤️ Like & komentar di tips orang lain\n🔥 Ikuti topik trending (#HidupSehat, #YogaPagi)\n\nBuka halaman <strong>Komunitas</strong> untuk mulai berdiskusi. Jangan lupa share tips sehatmu juga! 🙌'
    },
    {
      keywords: ['analisis', 'scan', 'foto makanan', 'gizi makanan'],
      reply: 'Fitur <strong>Analisis Gizi</strong> menggunakan AI untuk menganalisis makananmu:\n\n📸 Foto atau upload gambar makanan\n🤖 AI mengidentifikasi jenis makanan\n📊 Lihat kandungan kalori, protein, lemak, karbo\n💡 Dapatkan saran nutrisi personal\n\nBuka melalui menu <strong>Layanan → Analisis Gizi</strong>. Coba sekarang! ✨'
    },
    {
      keywords: ['resep', 'masak', 'rekomendasi resep'],
      reply: 'Fitur <strong>Resep Sehat</strong> menyediakan koleksi resep bergizi:\n\n🥗 Filter berdasarkan kategori (rendah kalori, tinggi protein, dll)\n⏱️ Estimasi waktu masak\n📝 Langkah-langkah detail\n🛒 Daftar bahan belanja\n\nCocok untuk yang ingin masak sehat di rumah! Buka <strong>Layanan → Resep Sehat</strong> 🍳'
    },
    {
      keywords: ['berat badan', 'turun berat', 'kurus', 'gemuk', 'obesitas'],
      reply: 'Tips menurunkan berat badan secara sehat:\n\n1️⃣ <strong>Defisit kalori 300-500 kkal/hari</strong> (jangan terlalu drastis!)\n2️⃣ <strong>Perbanyak protein</strong> — Membantu kenyang lebih lama\n3️⃣ <strong>Makan sayur & buah</strong> — Serat tinggi, kalori rendah\n4️⃣ <strong>Olahraga rutin</strong> — Minimal 150 menit/minggu\n5️⃣ <strong>Tidur cukup</strong> — 7-8 jam per malam\n\nUntuk program yang terstruktur, coba fitur <strong>Perencanaan Nutrisi</strong> kami! ⚖️'
    },
    {
      keywords: ['protein', 'sumber protein'],
      reply: 'Sumber protein terbaik:\n\n🥩 <strong>Daging ayam tanpa kulit</strong> — 31g per 100g\n🐟 <strong>Ikan salmon</strong> — 25g per 100g\n🥚 <strong>Telur</strong> — 13g per 2 butir\n🫘 <strong>Tempe</strong> — 19g per 100g\n🥛 <strong>Susu</strong> — 8g per gelas\n🌰 <strong>Kacang almond</strong> — 21g per 100g\n\nKebutuhan protein harian: sekitar <strong>0.8-1.2g per kg berat badan</strong>. 💪'
    },
    {
      keywords: ['air', 'minum', 'dehidrasi'],
      reply: 'Pentingnya minum air putih:\n\n💧 Kebutuhan harian: <strong>2-3 liter</strong> (8-10 gelas)\n⏰ Tips: Minum segelas air setelah bangun tidur\n🏃 Tambah asupan saat olahraga atau cuaca panas\n\nTanda dehidrasi:\n⚠️ Urine berwarna kuning pekat\n⚠️ Mulut kering & sakit kepala\n⚠️ Lemas & sulit konsentrasi\n\nYuk ikut <strong>Challenge "30 Hari Minum Air"</strong> di fitur Challenge Sehat! 🥤'
    },
    {
      keywords: ['halo', 'hai', 'hi', 'hello', 'hey', 'selamat'],
      reply: 'Halo! 👋 Selamat datang di <strong>NutriBot</strong>!\n\nAku asisten virtual NutriNesia yang siap membantu kamu soal:\n🥗 Informasi gizi & kalori makanan\n🍽️ Tips diet & pola makan sehat\n📱 Cara menggunakan fitur NutriNesia\n\nSilakan tanya apa saja atau klik salah satu chip di bawah! 😊'
    },
    {
      keywords: ['terima kasih', 'makasih', 'thanks', 'thank'],
      reply: 'Sama-sama! 😊 Senang bisa membantu. Kalau ada pertanyaan lain seputar gizi atau NutriNesia, jangan ragu untuk bertanya lagi ya! 🌿'
    },
    {
      keywords: ['bantuan', 'help', 'bisa apa', 'fitur apa'],
      reply: 'Aku bisa membantu kamu dengan:\n\n🔢 <strong>Cek kalori makanan</strong> — Tanya kalori makanan apa saja\n🍽️ <strong>Menu diet sehat</strong> — Rekomendasi menu harian\n🌅 <strong>Ide sarapan cepat</strong> — Sarapan sehat < 5 menit\n📱 <strong>Info fitur NutriNesia</strong> — Analisis Gizi, Resep, Challenge, dll\n💪 <strong>Tips kesehatan</strong> — Protein, air, berat badan\n\nKetik pertanyaanmu atau klik chip di bawah! 👇'
    }
  ];

  var fallbackResponses = [
    'Hmm, aku belum memahami pertanyaan itu. 🤔 Coba tanya soal <strong>kalori makanan</strong>, <strong>menu diet</strong>, atau <strong>fitur NutriNesia</strong>!',
    'Maaf, aku belum bisa menjawab itu. 😅 Tapi aku bisa bantu soal gizi, diet, dan info platform NutriNesia! Coba klik chip di bawah untuk ide pertanyaan.',
    'Pertanyaan menarik! Sayangnya itu di luar kemampuanku saat ini. 🙏 Untuk konsultasi lebih lanjut, coba fitur <strong>Konsultasi</strong> dengan ahli gizi kami!',
    'Aku masih belajar nih! 📚 Saat ini aku bisa bantu soal: kalori, diet, sarapan sehat, dan fitur-fitur NutriNesia. Silakan coba topik tersebut ya!'
  ];

  var chipSuggestions = [
    'Cek kalori makanan',
    'Menu diet sehat',
    'Sarapan cepat',
    'Apa itu NutriNesia?',
    'Cara ikut challenge',
    'Tips turun berat badan'
  ];

  /* ========== INJECT HTML ========== */
  function injectHTML() {
    var wrapper = document.createElement('div');
    wrapper.id = 'nutribot-root';
    wrapper.innerHTML =
      '<div class="nb-tooltip">Hai, ada yang bisa aku bantu? 🤗</div>' +
      '<button class="nb-fab" id="nb-fab" aria-label="Buka NutriBot">' +
      '<img src="' + basePath + 'images/nutribot.png" alt="Bot">' +
      '</button>' +
      '<div class="nb-panel" id="nb-panel">' +
      '<div class="nb-header">' +
      '<div class="nb-header-avatar"><img src="' + basePath + 'images/nutribot.png" alt="Bot"></div>' +
      '<div class="nb-header-info">' +
      '<div class="nb-header-name">NutriBot</div>' +
      '<div class="nb-header-status">Selalu online</div>' +
      '</div>' +
      '<button class="nb-close" id="nb-close" aria-label="Tutup chat"><span class="material-symbols-outlined">close</span></button>' +
      '</div>' +
      '<div class="nb-messages" id="nb-messages"></div>' +
      '<div class="nb-chips" id="nb-chips"></div>' +
      '<div class="nb-input-bar">' +
      '<input class="nb-input" id="nb-input" type="text" placeholder="Ketik pertanyaanmu..." autocomplete="off" />' +
      '<button class="nb-send" id="nb-send" aria-label="Kirim"><span class="material-symbols-outlined">send</span></button>' +
      '</div>' +
      '</div>';
    document.body.appendChild(wrapper);
  }

  /* ========== UTILITY ========== */
  function getTimeStr() {
    var now = new Date();
    var h = now.getHours().toString().padStart(2, '0');
    var m = now.getMinutes().toString().padStart(2, '0');
    return h + ':' + m;
  }

  function scrollToBottom() {
    var msgs = document.getElementById('nb-messages');
    if (msgs) msgs.scrollTop = msgs.scrollHeight;
  }

  function matchResponse(text) {
    var input = text.toLowerCase().trim();
    var bestMatch = null;
    var bestScore = 0;

    for (var i = 0; i < responses.length; i++) {
      var entry = responses[i];
      for (var j = 0; j < entry.keywords.length; j++) {
        var kw = entry.keywords[j].toLowerCase();
        if (input.indexOf(kw) !== -1) {
          var score = kw.length;
          if (score > bestScore) {
            bestScore = score;
            bestMatch = entry;
          }
        }
      }
    }

    if (bestMatch) return bestMatch.reply;
    return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
  }

  /* ========== RENDER ========== */
  function addBotMessage(html) {
    var msgs = document.getElementById('nb-messages');
    if (!msgs) return;

    var div = document.createElement('div');
    div.className = 'nb-msg bot';
    div.innerHTML =
      '<div class="nb-msg-icon"><img src="' + basePath + 'images/nutribot.png" alt="Bot"></div>' +
      '<div class="nb-bubble">' + html + '</div>';
    msgs.appendChild(div);

    var time = document.createElement('div');
    time.className = 'nb-time';
    time.textContent = getTimeStr();
    msgs.appendChild(time);

    scrollToBottom();
  }

  function addUserMessage(text) {
    var msgs = document.getElementById('nb-messages');
    if (!msgs) return;

    var div = document.createElement('div');
    div.className = 'nb-msg user';
    div.innerHTML =
      '<div class="nb-msg-icon"><span class="material-symbols-outlined">person</span></div>' +
      '<div class="nb-bubble">' + escapeHtml(text) + '</div>';
    msgs.appendChild(div);

    var time = document.createElement('div');
    time.className = 'nb-time';
    time.textContent = getTimeStr();
    msgs.appendChild(time);

    scrollToBottom();
  }

  function showTyping() {
    var msgs = document.getElementById('nb-messages');
    if (!msgs) return;

    var typing = document.createElement('div');
    typing.className = 'nb-typing';
    typing.id = 'nb-typing';
    typing.innerHTML =
      '<div class="nb-msg-icon"><img src="' + basePath + 'images/nutribot.png" alt="Bot"></div>' +
      '<div class="nb-typing-dots"><span></span><span></span><span></span></div>';
    msgs.appendChild(typing);
    scrollToBottom();
  }

  function hideTyping() {
    var el = document.getElementById('nb-typing');
    if (el) el.remove();
  }

  function escapeHtml(text) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(text));
    return div.innerHTML;
  }

  function renderChips() {
    var container = document.getElementById('nb-chips');
    if (!container) return;
    container.innerHTML = '';

    for (var i = 0; i < chipSuggestions.length; i++) {
      var btn = document.createElement('button');
      btn.className = 'nb-chip';
      btn.textContent = chipSuggestions[i];
      btn.setAttribute('data-chip', chipSuggestions[i]);
      container.appendChild(btn);
    }
  }

  /* ========== CORE SEND LOGIC ========== */
  var isBotTyping = false;

  function sendMessage(text) {
    if (!text || !text.trim() || isBotTyping) return;
    text = text.trim();

    addUserMessage(text);

    var input = document.getElementById('nb-input');
    if (input) input.value = '';

    isBotTyping = true;
    updateSendState();

    showTyping();

    var delay = 800 + Math.random() * 1200;
    setTimeout(function () {
      hideTyping();
      var reply = matchResponse(text);
      addBotMessage(reply);
      isBotTyping = false;
      updateSendState();
    }, delay);
  }

  function updateSendState() {
    var sendBtn = document.getElementById('nb-send');
    var input = document.getElementById('nb-input');
    if (sendBtn) {
      sendBtn.disabled = isBotTyping || (input && !input.value.trim());
    }
  }

  /* ========== INIT ========== */
  function initNutriBot() {
    injectHTML();
    renderChips();

    var fab = document.getElementById('nb-fab');
    var panel = document.getElementById('nb-panel');
    var closeBtn = document.getElementById('nb-close');
    var input = document.getElementById('nb-input');
    var sendBtn = document.getElementById('nb-send');
    var badge = document.getElementById('nb-badge');
    var chipsContainer = document.getElementById('nb-chips');

    var isOpen = false;
    var hasGreeted = false;

    function openChat() {
      isOpen = true;
      panel.classList.add('open');
      fab.classList.add('open');
      fab.querySelector('.material-symbols-outlined').textContent = 'close';
      if (badge) badge.classList.add('hidden');

      if (!hasGreeted) {
        hasGreeted = true;
        setTimeout(function () {
          addBotMessage(
            'Halo! 👋 Aku <strong>NutriBot</strong>, asisten virtual NutriNesia.\n\n' +
            'Aku bisa bantu kamu soal:\n' +
            '🥗 Kalori & gizi makanan\n' +
            '🍽️ Menu diet & tips sehat\n' +
            '📱 Info fitur NutriNesia\n\n' +
            'Silakan tanya atau klik chip di bawah! 😊'
          );
        }, 400);
      }

      setTimeout(function () {
        if (input) input.focus();
      }, 400);
    }

    function closeChat() {
      isOpen = false;
      panel.classList.remove('open');
      fab.classList.remove('open');
      fab.querySelector('.material-symbols-outlined').textContent = 'chat';
    }

    fab.addEventListener('click', function () {
      if (isOpen) closeChat();
      else openChat();
    });

    closeBtn.addEventListener('click', closeChat);

    /* Send on button click */
    sendBtn.addEventListener('click', function () {
      sendMessage(input.value);
    });

    /* Send on Enter */
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage(input.value);
      }
    });

    /* Update send button disabled state */
    input.addEventListener('input', updateSendState);
    updateSendState();

    /* Chip clicks */
    chipsContainer.addEventListener('click', function (e) {
      var chip = e.target.closest('.nb-chip');
      if (!chip) return;
      sendMessage(chip.getAttribute('data-chip'));
    });

    /* Close on Escape */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen) closeChat();
    });
  }

  /* Boot */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNutriBot);
  } else {
    initNutriBot();
  }

})();
