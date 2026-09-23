// ---------- Tab switching ----------
const tabs = document.querySelectorAll('.switcher-btn');
const panels = document.querySelectorAll('.panel');
const indicator = document.getElementById('switcherIndicator');

function activateTab(tab) {
  tabs.forEach(t => { t.classList.remove('is-active'); t.setAttribute('aria-selected', 'false'); });
  panels.forEach(p => p.classList.remove('is-active'));

  tab.classList.add('is-active');
  tab.setAttribute('aria-selected', 'true');
  document.getElementById('panel-' + tab.dataset.panel).classList.add('is-active');

  const index = Array.from(tabs).indexOf(tab);
  indicator.style.transform = `translateX(${index * 100}%)`;
}

tabs.forEach(tab => tab.addEventListener('click', () => activateTab(tab)));

// ---------- Secure random helpers ----------
// Rejection sampling over a single random byte avoids modulo bias for max <= 256.
function secureRandomIndex(max) {
  const limit = 256 - (256 % max);
  let byte;
  do {
    byte = crypto.getRandomValues(new Uint8Array(1))[0];
  } while (byte >= limit);
  return byte % max;
}

function randomBytes(length) {
  return crypto.getRandomValues(new Uint8Array(length));
}

function bytesToHex(bytes) {
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
}

function bytesToBase64(bytes) {
  let binary = '';
  bytes.forEach(b => binary += String.fromCharCode(b));
  return btoa(binary);
}

async function copyToClipboard(text, button) {
  if (!text) return;
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const temp = document.createElement('textarea');
    temp.value = text;
    document.body.appendChild(temp);
    temp.select();
    document.execCommand('copy');
    document.body.removeChild(temp);
  }
  const original = button.textContent;
  button.textContent = 'Copied';
  setTimeout(() => button.textContent = original, 1200);
}

// ---------- Token generator ----------
const CHARSETS = {
  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lower: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()-_=+[]{}'
};
const AMBIGUOUS = /[l1IO0]/g;

const tokenLength = document.getElementById('tokenLength');
const tokenLengthValue = document.getElementById('tokenLengthValue');
tokenLength.addEventListener('input', () => tokenLengthValue.textContent = tokenLength.value);

function buildCharset() {
  let set = '';
  if (document.getElementById('optUpper').checked) set += CHARSETS.upper;
  if (document.getElementById('optLower').checked) set += CHARSETS.lower;
  if (document.getElementById('optNumbers').checked) set += CHARSETS.numbers;
  if (document.getElementById('optSymbols').checked) set += CHARSETS.symbols;
  if (document.getElementById('optAmbiguous').checked) set = set.replace(AMBIGUOUS, '');
  return set;
}

function generateToken() {
  const charset = buildCharset();
  const output = document.getElementById('tokenOutput');
  const entropyLabel = document.getElementById('tokenEntropy');

  if (!charset) {
    output.value = '';
    entropyLabel.textContent = 'Select at least one character set';
    return;
  }

  const length = parseInt(tokenLength.value, 10);
  let token = '';
  for (let i = 0; i < length; i++) {
    token += charset[secureRandomIndex(charset.length)];
  }
  output.value = token;

  const bits = Math.round(length * Math.log2(charset.length));
  entropyLabel.textContent = `${bits} bits of entropy`;
}

document.getElementById('generateToken').addEventListener('click', generateToken);
document.getElementById('copyToken').addEventListener('click', (e) => {
  copyToClipboard(document.getElementById('tokenOutput').value, e.target);
});

// ---------- Encryption key generator ----------
const keyType = document.getElementById('keyType');
const customLengthField = document.getElementById('customLengthField');

keyType.addEventListener('change', () => {
  customLengthField.hidden = keyType.value !== 'custom';
});

function getKeyByteLength() {
  return keyType.value === 'custom'
    ? Math.min(64, Math.max(8, parseInt(document.getElementById('customLength').value, 10) || 32))
    : parseInt(keyType.value, 10);
}

function formatBytes(bytes) {
  const format = document.getElementById('keyFormat').value;
  return format === 'base64' ? bytesToBase64(bytes) : bytesToHex(bytes);
}

document.getElementById('generateKey').addEventListener('click', () => {
  const bytes = randomBytes(getKeyByteLength());
  document.getElementById('keyOutput').value = formatBytes(bytes);
});

document.getElementById('generateIv').addEventListener('click', () => {
  const bytes = randomBytes(16); // 128-bit block size, standard for AES
  document.getElementById('ivOutput').value = formatBytes(bytes);
});

document.getElementById('copyKey').addEventListener('click', (e) => {
  copyToClipboard(document.getElementById('keyOutput').value, e.target);
});
document.getElementById('copyIv').addEventListener('click', (e) => {
  copyToClipboard(document.getElementById('ivOutput').value, e.target);
});

// ---------- Footer year ----------
document.getElementById('year').textContent = new Date().getFullYear();

// ---------- Initial state ----------
generateToken();
