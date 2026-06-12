/* ============================================================
   JONGA KOPI PONOROGO — script.js
   Modular vanilla JS · navbar, menu, counters, slider, accordion, reveal
   ============================================================ */
(function () {
  "use strict";

  document.documentElement.classList.remove("no-js");

  /* ---------- DATA ---------- */
  const MENU = [
    { name: "Kopi Cangkir", price: 4000 },
    { name: "Kopi Gelas", price: 5000 },
    { name: "Kopi Susu Cangkir", price: 5000 },
    { name: "Kopi Susu Gelas", price: 6000 },
    { name: "Es Teh", price: 3000 },
    { name: "Teh Kecil", price: 2000 },
    { name: "Goodday / Beng-Beng Panas", price: 4000 },
    { name: "Goodday / Beng-Beng Dingin", price: 5000 },
    { name: "Teh Tarik", price: 5000 },
    { name: "Espresso", price: 6000 },
    { name: "Americano", price: 10000 },
    { name: "Es Kopi Susu", price: 10000 },
    { name: "Tempe", price: 1000 },
    { name: "Mie Goreng / Rebus", price: 8000 },
  ];

  const TESTIMONIALS = [
    { quote: "Kopinya enak, harganya ramah banget di kantong mahasiswa. Tempat favorit buat ngerjain tugas sampai malam!", name: "Rangga Pratama", role: "Mahasiswa", initial: "R" },
    { quote: "Suasananya hangat dan bikin betah. Sering diskusi komunitas di sini, pelayanannya juga ramah.", name: "Dewi Lestari", role: "Aktivis Komunitas", initial: "D" },
    { quote: "Buka sampai dini hari jadi penyelamat saat lembur. Es kopi susunya juara dan murah meriah.", name: "Bagas Saputra", role: "Pekerja Lepas", initial: "B" },
    { quote: "Tempat nongkrong keluarga yang nyaman. Anak-anak suka, kami pun betah berlama-lama.", name: "Ibu Sri Wahyuni", role: "Ibu Rumah Tangga", initial: "S" },
    { quote: "Sebagai wisatawan, saya senang menemukan kopi lokal seautentik ini. Ceritanya pun menyentuh.", name: "Andi Kurniawan", role: "Wisatawan", initial: "A" },
    { quote: "Lokasinya strategis, kopinya mantap, dan nuansanya bikin pengin balik lagi. Recommended!", name: "Nadia Putri", role: "Pelajar SMA", initial: "N" },
  ];

  const FAQS = [
    { q: "Di mana lokasi Jonga Kopi Ponorogo?", a: "Kami berada di Jalan Banda, Mangkujayan, Ponorogo, Jawa Timur. Lokasinya strategis dan mudah dijangkau dari pusat kota." },
    { q: "Jam berapa Jonga Kopi buka?", a: "Kami buka setiap hari mulai pukul 15.00 hingga 02.00 WIB, cocok untuk nongkrong sore hingga dini hari." },
    { q: "Apakah harga menunya terjangkau?", a: "Tentu! Menu kami mulai dari Rp2.000 saja. Kami berkomitmen menghadirkan kopi berkualitas dengan harga ramah di kantong semua kalangan." },
    { q: "Apakah cocok untuk mengerjakan tugas atau bekerja?", a: "Sangat cocok. Suasananya nyaman dan tenang, banyak mahasiswa, pelajar, dan pekerja yang menjadikan Jonga Kopi sebagai ruang produktif favorit mereka." },
    { q: "Apakah bisa memesan untuk acara atau komunitas?", a: "Bisa. Silakan hubungi kami via WhatsApp di 089696541718 untuk reservasi tempat atau pemesanan acara komunitas." },
    { q: "Bagaimana cara memesan kopi?", a: "Anda bisa datang langsung ke lokasi kami, atau menghubungi kami melalui WhatsApp untuk informasi dan pemesanan." },
    { q: "Apakah menyediakan makanan ringan?", a: "Ya, kami menyediakan camilan seperti tempe goreng serta mie goreng dan mie rebus sebagai teman ngopi Anda." },
    { q: "Apa arti nama 'Jonga'?", a: "Nama 'Jonga' terinspirasi dari lokasi warung yang harus ditempuh melalui banyak tikungan jalan. Ia melambangkan perjalanan, kebersamaan, dan menemukan tempat yang nyaman." },
    { q: "Siapa pendiri Jonga Kopi?", a: "Jonga Kopi didirikan pada tahun 2025 oleh Ustadz Mugo Sasongko, dengan semangat memanfaatkan aset keluarga agar bermanfaat bagi masyarakat sekitar." },
    { q: "Apakah tersedia tempat parkir?", a: "Tersedia area untuk memarkir kendaraan di sekitar lokasi, sehingga Anda bisa berkunjung dengan nyaman membawa motor maupun mobil." },
  ];

  const rupiah = (n) => "Rp" + n.toLocaleString("id-ID");

  /* ---------- NAVBAR: scroll + active link ---------- */
  const navbar = document.getElementById("navbar");
  const onScroll = () => {
    if (window.scrollY > 30) navbar.classList.add("scrolled");
    else navbar.classList.remove("scrolled");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- MOBILE MENU ---------- */
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  const closeMenu = () => {
    navLinks.classList.remove("open");
    navToggle.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  };
  navToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    navToggle.classList.toggle("open", open);
    navToggle.setAttribute("aria-expanded", String(open));
  });
  navLinks.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenu(); });

  /* ---------- ACTIVE NAV LINK ON SCROLL ---------- */
  const sections = [...document.querySelectorAll("main section[id]")];
  const linkMap = {};
  navLinks.querySelectorAll(".nav-link").forEach((l) => {
    const id = l.getAttribute("href").slice(1);
    linkMap[id] = l;
  });
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          Object.values(linkMap).forEach((l) => l.classList.remove("active"));
          if (linkMap[en.target.id]) linkMap[en.target.id].classList.add("active");
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((s) => spy.observe(s));

  /* ---------- RENDER MENU LIST ---------- */
  const menuList = document.getElementById("menuList");
  if (menuList) {
    menuList.innerHTML = MENU.map(
      (m) => `
      <div class="menu-row">
        <span class="menu-row-name">${m.name}</span>
        <span class="menu-row-dots" aria-hidden="true"></span>
        <span class="menu-row-price">${rupiah(m.price)}</span>
      </div>`
    ).join("");
  }

  /* ---------- RENDER FAQ ACCORDION ---------- */
  const accordion = document.getElementById("accordion");
  if (accordion) {
    accordion.innerHTML = FAQS.map(
      (f, i) => `
      <div class="acc-item">
        <button class="acc-q" aria-expanded="false" aria-controls="acc-a-${i}" id="acc-q-${i}">
          <span>${f.q}</span>
          <span class="acc-icon" aria-hidden="true"></span>
        </button>
        <div class="acc-a" id="acc-a-${i}" role="region" aria-labelledby="acc-q-${i}">
          <p>${f.a}</p>
        </div>
      </div>`
    ).join("");

    accordion.querySelectorAll(".acc-q").forEach((btn) => {
      btn.addEventListener("click", () => {
        const item = btn.parentElement;
        const panel = btn.nextElementSibling;
        const isOpen = item.classList.contains("open");
        // close others
        accordion.querySelectorAll(".acc-item.open").forEach((it) => {
          if (it !== item) {
            it.classList.remove("open");
            it.querySelector(".acc-q").setAttribute("aria-expanded", "false");
            it.querySelector(".acc-a").style.maxHeight = null;
          }
        });
        item.classList.toggle("open", !isOpen);
        btn.setAttribute("aria-expanded", String(!isOpen));
        panel.style.maxHeight = !isOpen ? panel.scrollHeight + "px" : null;
      });
    });
  }

  /* ---------- TESTIMONIAL SLIDER ---------- */
  const track = document.getElementById("testiTrack");
  const dotsWrap = document.getElementById("testiDots");
  if (track) {
    track.innerHTML = TESTIMONIALS.map(
      (t) => `
      <div class="testi-card">
        <div class="testi-inner">
          <div class="testi-stars" aria-label="5 dari 5 bintang">★★★★★</div>
          <p class="testi-quote">"${t.quote}"</p>
          <div class="testi-author">
            <span class="testi-avatar" aria-hidden="true">${t.initial}</span>
            <span style="text-align:left">
              <span class="testi-name">${t.name}</span><br />
              <span class="testi-role">${t.role}</span>
            </span>
          </div>
        </div>
      </div>`
    ).join("");

    dotsWrap.innerHTML = TESTIMONIALS.map(
      (_, i) => `<button class="slider-dot" data-i="${i}" aria-label="Tampilkan testimoni ${i + 1}"></button>`
    ).join("");

    let idx = 0;
    const dots = [...dotsWrap.children];
    const go = (i) => {
      idx = (i + TESTIMONIALS.length) % TESTIMONIALS.length;
      track.style.transform = `translateX(-${idx * 100}%)`;
      dots.forEach((d, di) => d.classList.toggle("active", di === idx));
    };
    document.getElementById("testiNext").addEventListener("click", () => { go(idx + 1); restart(); });
    document.getElementById("testiPrev").addEventListener("click", () => { go(idx - 1); restart(); });
    dots.forEach((d) => d.addEventListener("click", () => { go(+d.dataset.i); restart(); }));

    let timer = setInterval(() => go(idx + 1), 6000);
    const restart = () => { clearInterval(timer); timer = setInterval(() => go(idx + 1), 6000); };
    go(0);
  }

  /* ---------- COUNTER ANIMATION ---------- */
  const animateCounter = (el) => {
    const target = +el.dataset.target;
    const decimal = el.dataset.decimal ? +el.dataset.decimal : 0;
    const dur = 1600;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = target * eased;
      if (decimal) el.textContent = (val / Math.pow(10, decimal)).toFixed(decimal);
      else el.textContent = Math.floor(val).toLocaleString("id-ID");
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = decimal ? (target / Math.pow(10, decimal)).toFixed(decimal) : target.toLocaleString("id-ID");
    };
    requestAnimationFrame(step);
  };

  const counterObs = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { animateCounter(en.target); obs.unobserve(en.target); }
      });
    },
    { threshold: 0.5 }
  );
  document.querySelectorAll(".counter").forEach((c) => counterObs.observe(c));

  /* ---------- REVEAL ON SCROLL ---------- */
  const revealObs = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("visible"); obs.unobserve(en.target); }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  document.querySelectorAll(".reveal").forEach((el) => revealObs.observe(el));

  /* ---------- FOOTER YEAR (kept static 2025 per brand) ---------- */
})();
