<div align="center">

# 🗝️ Keyforge

**Generate secure API tokens and encryption keys — instantly, in your browser.**

![License](https://img.shields.io/badge/license-MIT-4FD1C5?style=flat-square)
![Built with](https://img.shields.io/badge/built%20with-HTML%20%C2%B7%20CSS%20%C2%B7%20JS-8C9EFF?style=flat-square)
![Dependencies](https://img.shields.io/badge/dependencies-none-2ea44f?style=flat-square)
![Made by](https://img.shields.io/badge/made%20by-etherealStudios-1D2733?style=flat-square)

</div>

## ✨ Overview

Keyforge is a lightweight, single-page tool for generating cryptographically secure tokens and symmetric encryption keys, entirely on the client side. There's no backend, no build step, and no analytics — everything is powered by the browser's native.

## 🚀 Features

| | |
|---|---|
| 🔐 **Token Generator** | Adjustable length (8–128), toggleable character sets, ambiguous-character exclusion, live entropy estimate |
| 🗝️ **Key Generator** | AES-128 / AES-192 / AES-256 or custom byte length, hex or base64 output |
| 🎲 **IV Generator** | One-click 16-byte initialization vector, ready for AES encryption |
| 📋 **Copy to clipboard** | Every generated value copies in a single click |
| 🌓 **Dark, focused UI** | No clutter — just the controls you need |
| 📱 **Responsive** | Works cleanly on desktop and mobile |
| 🧩 **Zero dependencies** | Plain HTML, CSS and JavaScript — nothing to install or build |

## 🖥️ Getting Started

No installation or build tools required.

```bash
git clone https://github.com/builtbyethereal/keyforge.git
cd keyforge
```

Then just open `index.html` in your browser — or serve it locally:

```bash
# Python
python3 -m http.server 8000

# Node
npx serve .
```

Visit `http://localhost:8000` (or whichever port your server prints).

## 📁 Project Structure

```
keyforge/
├── index.html     # Markup and layout
├── style.css      # Styling and theme
├── script.js      # Generation logic and UI behavior
└── README.md
```

## ⚙️ How It Works

Randomness comes from `crypto.getRandomValues()`, the browser's cryptographically secure random source. Token characters are chosen using **rejection sampling** instead of a plain modulo operation, avoiding the small bias modulo introduces when a character set doesn't evenly divide 256.

> **Note:** Keyforge generates cryptographic material for you to use in your own systems — it doesn't perform encryption/decryption itself, and nothing you generate is stored or transmitted anywhere.

## 🛠️ Tech Stack

- HTML5
- CSS3 — custom properties, no framework
- Vanilla JavaScript (ES6+)
- Web Crypto API

## 🌐 Deploying with GitHub Pages

1. Push this repository to GitHub.
2. Go to **Settings → Pages**.
3. Under **Source**, select the `main` branch and `/ (root)` folder.
4. Your app will be live at `https://github.com/builtbyethereal/keyforge`.

## 🤝 Contributing

Contributions are welcome. For larger changes, please open an issue first to discuss what you'd like to change.

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/amazing-thing`)
3. Commit your changes
4. Open a pull request

## 📄 License
 
Distributed under the MIT License.

## ⚠️ Disclaimer

Keyforge is provided for convenience and educational purposes. Review your own security requirements before using generated tokens or keys in production systems.

---

<div align="center">
<sub>© 2026 <strong><a href='https://builtbyethereal.com/'>EtherealStudios</a></strong>. All rights reserved.</sub>
</div>
