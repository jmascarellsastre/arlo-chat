# Arlo — Prototype (Web + Node)

Minimal app *estilo Apple* (negro y blanco) con:
- Frontend HTML/CSS/JS (Helvetica).
- Botón de micrófono (dictado si tu navegador lo permite).
- Lectura de respuestas en voz alta (TTS).
- Servidor Node con `/api/chat` que conecta con OpenAI (o modo demo si no pones clave).

## Requisitos
- Node.js 18+

## Uso
```bash
cd arlo-prototype
npm install
cp .env.example .env
# Edita .env y coloca tu OPENAI_API_KEY
npm run dev
# Abre http://localhost:3000
```

Si no colocas la clave, el servidor responde en **modo demo** (hace echo elegante).

## Estructura
```
public/index.html   # interfaz
server.js           # API / proxy a OpenAI
.env.example        # variables de entorno
```

## Notas
- No pongas tu API key en el frontend.
- Este prototipo es perfecto para validar UI/UX. Luego se puede migrar a Next.js/React y empaquetar para escritorio con Tauri/Electron.
