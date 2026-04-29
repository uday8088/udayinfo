(function () {
  // 1) Keep contact visible & strip any hide classes added by theme scripts
  var contact = document.getElementById('contact');
  if (contact) {
    contact.classList.add('no-animate');
    contact.classList.remove('hidden', 'is-hidden');
    contact.removeAttribute('hidden');

    // Remove hide classes on descendants too
    var killers = contact.querySelectorAll('[hidden], .hidden, .is-hidden');
    killers.forEach(function (el) {
      el.removeAttribute('hidden');
      el.classList.remove('hidden', 'is-hidden');
      el.style.opacity = '1';
      el.style.visibility = 'visible';
      el.style.transform = 'none';
    });
  }

  // 2) Wire up the AJAX submit to Formspree (stay on page + toast)
  var form  = document.getElementById('contactForm');
  var send  = document.getElementById('contactSend');
  var toast = document.getElementById('toast');

  if (!form || !send || !toast) return;

  function showToast(msg, isError) {
    toast.textContent = msg;
    toast.className = 'toast ' + (isError ? 'error' : 'success') + ' show';
    setTimeout(function () { toast.classList.remove('show'); }, 2000);
  }

  send.addEventListener('click', async function () {
    if (!form.checkValidity()) { form.reportValidity(); return; }

    // Build request body
    var data = new FormData(form);
    send.disabled = true;

    try {
      var res = await fetch('https://formspree.io/f/xvgbrzoq', {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        form.reset();
        showToast('Thank you! Your message has been sent.', false);
      } else {
        var err = 'Something went wrong. Please try again.';
        try {
          var j = await res.json();
          if (j && j.errors) err = j.errors.map(function (e) { return e.message; }).join(', ');
        } catch (_) {}
        showToast(err, true);
      }
    } catch (e) {
      showToast('Network error. Please try again.', true);
    } finally {
      setTimeout(function(){ send.disabled = false; }, 2200);
    }
  });
})();
