const scenes = [
  {
    "label": "INIT / ENGINEERING NOTES",
    "title": "$ whoami",
    "body": "Backend & Cloud Infrastructure",
    "detail": "loading experience / production systems / measurable results"
  },
  {
    "label": "HELLO, I’M SAI",
    "title": "Backend systems.\nCloud infrastructure.",
    "body": "Senior Software Engineer with 5+ years across cloud AI, e-commerce, and financial analytics.",
    "detail": "Bellevue, WA / Go · Java · Python"
  },
  {
    "label": "01 / CLOUD & AI INFRASTRUCTURE",
    "title": "Connecting agents\nto real systems.",
    "body": "Remote MCP services, event-driven Go microservices, and telemetry pipelines on Azure.",
    "detail": "Microsoft · Senior Software Engineer\nFastMCP / AKS / Event Hubs / Functions"
  },
  {
    "label": "02 / E-COMMERCE",
    "title": "Orchestrating orders.\nReducing latency.",
    "body": "Go microservices, fault-tolerant Kafka consumers, and Redis caching on Kubernetes.",
    "detail": "Citymall · Software Development Engineer II\n40% lower P99 API latency at 2K+ peak RPS"
  },
  {
    "label": "03 / FINANCIAL ANALYTICS",
    "title": "Services for\nportfolio intelligence.",
    "body": "Spring Boot services, asynchronous processing, and observability for portfolio benchmarks and risk analytics.",
    "detail": "QuantumStreet AI · Software Engineer\n35% higher compute-heavy service throughput"
  },
  {
    "label": "04 / MEASURABLE RESULTS",
    "title": "Performance.\nFreshness. Efficiency.",
    "body": "40% lower catalog P99 latency. Data availability lag from 12 hours to under eight minutes. 60% lower infrastructure costs.",
    "detail": "Go + Redis / Spark streaming / Airflow ETL"
  },
  {
    "label": "05 / SELECTED PROJECTS",
    "title": "Distributed storage.\nHybrid retrieval.",
    "body": "A C++ filesystem prototype with gRPC and FUSE, and a Knowledge Assistant combining vector and keyword retrieval.",
    "detail": "ChromaDB / BM25 / OpenAI embeddings / Cohere / LangChain"
  },
  {
    "label": "LET’S CONNECT",
    "title": "Your next backend\nchallenge. Let’s talk.",
    "body": "Sai Keerthan Palavarapu · Senior Software Engineer",
    "detail": "kpsai80@gmail.com / Bellevue, WA\ngithub.com/saikeerthan-14"
  }
];
const illustrations = [
  "<div class=\"boot-grid\"></div>",
  "<div class=\"orb\"></div>",
  "<div class=\"art-flow\"><div class=\"art-node\">MCP services<small>FastMCP · Python</small></div><div class=\"art-line\"></div><div class=\"art-node\">Azure AKS<small>containerized agents</small></div><div class=\"art-line\"></div><div class=\"art-node\">Event pipelines<small>Go · Event Hubs</small></div></div>",
  "<div class=\"repo-cluster\"><div class=\"repo-hub\">order orchestration</div><div class=\"repo-forks\"><div>Go APIs</div><div>Kafka</div><div>Redis</div></div></div>",
  "<div class=\"art-flow\"><div class=\"art-node\">Spring Boot<small>portfolio · risk APIs</small></div><div class=\"art-line\"></div><div class=\"art-node\">Redis queues<small>asynchronous processing</small></div><div class=\"art-line\"></div><div class=\"art-node\">Observability<small>sync lag · portfolio drift</small></div></div>",
  "<div class=\"pr-art impact-art\"><div>40% lower<small>P99 API LATENCY</small></div><div>12h → &lt;8m<small>DATA AVAILABILITY LAG</small></div><div>60% lower<small>INFRASTRUCTURE COSTS</small></div></div>",
  "<div class=\"focus-art\"><span>C++ · gRPC · FUSE</span><span>Hybrid RAG</span><span>Retrieval + reranking</span></div>",
  "<div class=\"boot-grid\"></div>"
];
const byId = id => document.getElementById(id);
const chapters = [...document.querySelectorAll('.chapters [data-scene]')];
let position = 0, playing = false, previousTime = null, currentScene = -1;
const duration = 48, chapterDuration = 6;
function render() {
  const index = Math.min(scenes.length - 1, Math.floor(position / chapterDuration));
  if (index !== currentScene) {
    currentScene = index;
    const scene = scenes[index];
    byId('slide-label').textContent = scene.label;
    byId('slide-title').replaceChildren(...scene.title.split('\n').flatMap((line, i) => i ? [document.createElement('br'), document.createTextNode(line)] : [document.createTextNode(line)]));
    byId('slide-body').textContent = scene.body;
    byId('slide-detail').textContent = scene.detail;
    byId('stage').dataset.scene = String(index);
    byId('scene-art').innerHTML = illustrations[index];
    byId('scene-count').textContent = `0${index + 1} / 08`;
    chapters.forEach((button, i) => button.setAttribute('aria-current', String(i === index)));
    byId('slide').classList.remove('enter');
    void byId('slide').offsetWidth;
    byId('slide').classList.add('enter');
  }
  byId('seek').value = String(position);
  byId('scene-progress').style.width = `${position / duration * 100}%`;
  byId('elapsed').textContent = `0:${String(Math.floor(position)).padStart(2, '0')}`;
  byId('play').textContent = playing ? 'Pause Ⅱ' : position >= duration ? 'Replay ▶' : 'Play ▶';
  byId('play').setAttribute('aria-label', playing ? 'Pause presentation' : 'Play presentation');
}
function setPlaying(value) {
  if (value && position >= duration) position = 0;
  playing = value;
  previousTime = null;
  byId('player-status').textContent = `${playing ? 'Playing.' : position >= duration ? 'Finished.' : 'Paused.'} Space to play or pause; arrow keys to change chapters. Text presentation, no audio.`;
  render();
}
function goTo(index) { position = Math.max(0, Math.min(scenes.length - 1, index)) * chapterDuration; previousTime = null; render(); }
byId('play').addEventListener('click', () => setPlaying(!playing));
byId('restart').addEventListener('click', () => { position = 0; setPlaying(false); });
byId('previous').addEventListener('click', () => goTo(currentScene - 1));
byId('next').addEventListener('click', () => goTo(currentScene + 1));
byId('seek').addEventListener('input', event => { position = Number(event.target.value); previousTime = null; if(position >= duration) setPlaying(false); render(); });
chapters.forEach(button => button.addEventListener('click', () => goTo(Number(button.dataset.scene))));
document.addEventListener('keydown', event => {
  if (['INPUT', 'BUTTON', 'A', 'TEXTAREA', 'SELECT'].includes(event.target.tagName) || event.ctrlKey || event.metaKey || event.altKey) return;
  if (event.code === 'Space') { event.preventDefault(); setPlaying(!playing); }
  if (event.code === 'ArrowRight') { event.preventDefault(); goTo(currentScene + 1); }
  if (event.code === 'ArrowLeft') { event.preventDefault(); goTo(currentScene - 1); }
});
document.addEventListener('visibilitychange', () => { if (document.hidden && playing) setPlaying(false); });
function tick(now) {
  if (playing) {
    if (previousTime !== null) position = Math.min(duration, position + (now - previousTime) / 1000);
    previousTime = now;
    if (position >= duration) setPlaying(false);
    render();
  }
  requestAnimationFrame(tick);
}
render(); requestAnimationFrame(tick);
if (new URLSearchParams(location.search).has('embed') && !matchMedia('(prefers-reduced-motion: reduce)').matches) setPlaying(true);
