/* Wedding Invitation — app logic */
(function () {
  "use strict";

  var C = window.CONFIG;

  function $(id) { return document.getElementById(id); }
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function pad(n) { return (n < 10 ? "0" : "") + n; }

  function getGuestName() {
    var params = new URLSearchParams(window.location.search);
    return (params.get("name") || "").replace(/\+/g, " ").trim();
  }

  /* ---------- Render data from config ---------- */
  function render() {
    $("coverGroom").textContent = C.couple.groom.nickname;
    $("coverBride").textContent = C.couple.bride.nickname;
    $("groomName").textContent = C.couple.groom.fullName;
    $("brideName").textContent = C.couple.bride.fullName;
    $("groomPhoto").src = C.couple.groom.photo;
    $("bridePhoto").src = C.couple.bride.photo;
    $("couplePhoto").src = C.couple.couplePhoto;

    $("groomParents").innerHTML = "Putra dari<br>" + C.couple.groom.parents[0] + "<br>&amp; " + C.couple.groom.parents[1];
    $("brideParents").innerHTML = "Putri dari<br>" + C.couple.bride.parents[0] + "<br>&amp; " + C.couple.bride.parents[1];

    $("thanksNames").textContent = C.couple.groom.nickname + " & " + C.couple.bride.nickname;
    $("hashtag").textContent = C.couple.hashtag;

    var d = new Date(C.countdownDate);
    $("coverDate").textContent = d.toLocaleDateString("id-ID", {
      weekday: "long", day: "numeric", month: "long", year: "numeric"
    });
    document.title = "The Wedding of " + C.couple.groom.nickname + " & " + C.couple.bride.nickname;

    renderEvents();
    renderStory();
    renderGallery();
    renderGuide();
    renderCalendarLink();
  }

  function renderEvents() {
    var list = $("eventList");
    list.innerHTML = "";
    Object.keys(C.events).forEach(function (key) {
      var ev = C.events[key];
      var card = el("div", "event reveal");
      card.appendChild(el("p", "event__label", ev.label));
      var date = el("div", "event__date", ev.dateNumber);
      date.appendChild(el("span", "", ev.dayName + ", " + ev.monthYear));
      card.appendChild(date);
      card.appendChild(el("p", "event__time", ev.time));
      card.appendChild(el("p", "event__venue", ev.venueName));
      card.appendChild(el("p", "event__address", ev.venueAddress));
      var link = el("p", "event__link");
      var a = el("a", "", "Lihat Lokasi");
      a.href = ev.mapsUrl;
      a.target = "_blank";
      a.rel = "noopener";
      link.appendChild(a);
      card.appendChild(link);
      list.appendChild(card);
    });
  }

  function renderStory() {
    var wrap = $("storyText");
    wrap.innerHTML = "";
    C.story.split("\n\n").forEach(function (p) {
      wrap.appendChild(el("p", "", p.trim()));
    });
  }

  function renderGallery() {
    var grid = $("galleryGrid");
    grid.innerHTML = "";
    C.gallery.forEach(function (g) {
      var item = el("div", "gallery__item reveal");
      var img = el("img");
      img.src = g.src;
      img.alt = g.alt;
      img.loading = "lazy";
      item.appendChild(img);
      item.addEventListener("click", function () { openLightbox(g.src); });
      grid.appendChild(item);
    });
  }

  function renderGuide() {
    $("guideText").textContent = C.guide.text;
    $("guideMapBtn").href = C.guide.mapsUrl;
    $("guideMap").src = C.guide.mapEmbed;
  }

  function renderCalendarLink() {
    var d = new Date(C.countdownDate);
    var start = toGCal(d);
    var end = toGCal(new Date(d.getTime() + 2 * 3600 * 1000));
    var url = "https://calendar.google.com/calendar/render?action=TEMPLATE" +
      "&text=" + encodeURIComponent("Wedding of " + C.couple.groom.nickname + " & " + C.couple.bride.nickname) +
      "&dates=" + start + "/" + end +
      "&details=" + encodeURIComponent("The Wedding of " + C.couple.groom.fullName + " & " + C.couple.bride.fullName);
    $("saveDateBtn").href = url;
  }
  function toGCal(date) {
    return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  }

  /* ---------- Cover open ---------- */
  function openInvitation() {
    $("cover").classList.add("is-hidden");
    var inv = $("invitation");
    inv.setAttribute("aria-hidden", "false");
    inv.classList.add("is-open");
    window.scrollTo(0, 0);
    initReveal();
  }

  /* ---------- Reveal on scroll ---------- */
  function initReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      items.forEach(function (n) { n.classList.add("is-visible"); });
      return;
    }
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-visible"); obs.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    items.forEach(function (n) { obs.observe(n); });
  }

  /* ---------- Countdown ---------- */
  var countdownTimer = null;
  function startCountdown() {
    var target = new Date(C.countdownDate).getTime();
    function tick() {
      var diff = target - Date.now();
      if (diff <= 0) { setCountdown(0, 0, 0, 0); clearInterval(countdownTimer); return; }
      var d = Math.floor(diff / 86400000);
      var h = Math.floor((diff % 86400000) / 3600000);
      var m = Math.floor((diff % 3600000) / 60000);
      var s = Math.floor((diff % 60000) / 1000);
      setCountdown(d, h, m, s);
    }
    tick();
    countdownTimer = setInterval(tick, 1000);
  }
  function setCountdown(d, h, m, s) {
    $("cdDays").textContent = pad(d);
    $("cdHours").textContent = pad(h);
    $("cdMins").textContent = pad(m);
    $("cdSecs").textContent = pad(s);
  }

  /* ---------- Lightbox ---------- */
  function openLightbox(src) {
    $("lightboxImg").src = src;
    $("lightbox").classList.add("is-open");
    $("lightbox").setAttribute("aria-hidden", "false");
  }
  function closeLightbox() {
    $("lightbox").classList.remove("is-open");
    $("lightbox").setAttribute("aria-hidden", "true");
  }

  /* ---------- RSVP ---------- */
  function submitRsvp(e) {
    e.preventDefault();
    var name = $("rsvpName").value.trim();
    var status = (document.querySelector('input[name="kehadiran"]:checked') || {}).value || "Hadir";
    var guests = $("rsvpGuests").value;
    var msg = $("rsvpMsg").value.trim();
    if (!name) { note($("rsvpNote"), "Mohon isi nama Anda.", false); return; }

    var payload = { type: "rsvp", "Nama": name, "Kehadiran": status, "Jumlah Tamu": guests, "Ucapan": msg };
    note($("rsvpNote"), "Mengirim...", null);

    if (C.rsvp.endpoint) {
      post(C.rsvp.endpoint, payload, function () {
        note($("rsvpNote"), "Terima kasih! RSVP Anda telah terkirim.", true);
        e.target.reset();
      });
    } else {
      var text = "Halo " + C.couple.groom.nickname + " & " + C.couple.bride.nickname +
        ", saya " + name + ". Konfirmasi: " + status +
        (guests ? ", " + guests + " orang" : "") +
        (msg ? ". Ucapan: " + msg : "") + ".";
      window.open("https://wa.me/" + C.rsvp.whatsapp + "?text=" + encodeURIComponent(text), "_blank");
      note($("rsvpNote"), "WhatsApp dibuka — kirim pesan untuk konfirmasi.", true);
      e.target.reset();
    }
  }

  /* ---------- Wishes ---------- */
  function submitWish(e) {
    e.preventDefault();
    var name = $("wishName").value.trim();
    var msg = $("wishMsg").value.trim();
    if (!name || !msg) { note($("wishNote"), "Mohon isi nama dan ucapan Anda.", false); return; }

    var payload = { type: "wishes", "Nama": name, "Ucapan": msg };
    note($("wishNote"), "Mengirim...", null);

    if (C.wishes.endpoint) {
      post(C.wishes.endpoint, payload, function () {
        note($("wishNote"), "Terima kasih atas doa dan ucapannya!", true);
        e.target.reset();
        setTimeout(loadWishes, 1200);
      });
    } else {
      var text = "Ucapan untuk " + C.couple.groom.nickname + " & " + C.couple.bride.nickname +
        ": " + msg + " — dari " + name + ".";
      window.open("https://wa.me/" + C.rsvp.whatsapp + "?text=" + encodeURIComponent(text), "_blank");
      note($("wishNote"), "WhatsApp dibuka — kirim pesan untuk mengirim ucapan.", true);
      e.target.reset();
    }
  }

  /* POST with no-cors so a Google Apps Script endpoint works from a static page.
     The response is opaque (unreadable), so we fire-and-forget and confirm
     optimistically — the write itself is verified server-side. */
  function post(endpoint, payload, onSuccess) {
    try {
      fetch(endpoint, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify(payload)
      }).catch(function () {});
    } catch (err) {}
    if (onSuccess) onSuccess();
  }

  /* Load wishes via JSONP (script tags bypass CORS) */
  function loadWishes() {
    var ep = C.wishes.endpoint;
    var list = $("wishesList");
    if (!ep) {
      list.innerHTML = "";
      list.appendChild(el("p", "wish wish--empty", "Belum ada ucapan. Jadilah yang pertama mengirim doa!"));
      return;
    }
    list.innerHTML = "";
    var cb = "wishesCb" + Date.now();
    window[cb] = function (data) {
      renderWishes(data || []);
      try { delete window[cb]; } catch (e) { window[cb] = undefined; }
    };
    var s = document.createElement("script");
    s.src = ep + (ep.indexOf("?") >= 0 ? "&" : "?") + "type=wishes&callback=" + cb;
    document.body.appendChild(s);
  }
  function renderWishes(data) {
    var list = $("wishesList");
    list.innerHTML = "";
    if (!data.length) {
      list.appendChild(el("p", "wish wish--empty", "Belum ada ucapan. Jadilah yang pertama mengirim doa!"));
      return;
    }
    data.forEach(function (w) {
      var card = el("div", "wish");
      card.appendChild(el("p", "wish__name", w["Nama"] || "Anonim"));
      card.appendChild(el("p", "wish__time", formatTime(w["Timestamp"])));
      card.appendChild(el("p", "wish__body", w["Ucapan"] || ""));
      list.appendChild(card);
    });
  }
  function formatTime(ts) {
    if (!ts) return "";
    var d = new Date(ts);
    if (isNaN(d)) return "";
    return d.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
  }

  function note(node, msg, ok) {
    node.textContent = msg || "";
    node.className = "form__note" + (ok === true ? " is-success" : ok === false ? " is-error" : "");
  }

  /* ---------- Init ---------- */
  function init() {
    render();
    var guest = getGuestName();
    if (guest) {
      $("coverGuest").textContent = "Kepada Yth. " + guest;
      $("greetingName").textContent = guest;
    }
    $("openBtn").addEventListener("click", openInvitation);
    $("lightboxClose").addEventListener("click", closeLightbox);
    $("lightbox").addEventListener("click", function (e) { if (e.target === this) closeLightbox(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeLightbox(); });

    $("rsvpForm").addEventListener("submit", submitRsvp);
    $("wishForm").addEventListener("submit", submitWish);

    startCountdown();
    loadWishes();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
