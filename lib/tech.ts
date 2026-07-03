import {
  siPython,
  siTypescript,
  siJavascript,
  siDocker,
  siAnthropic,
  siHuggingface,
  siApacheairflow,
  siSnowflake,
  siDatabricks,
  siApachekafka,
  siApachespark,
  siDuckdb,
  siFastapi,
  siCelery,
  siStreamlit,
  siVercel,
  siPandas,
  siNumpy,
  siPostgresql,
  siNvidia,
  siJupyter,
  siGit,
  siGithub,
  siPytorch,
  siTensorflow,
  siScikitlearn,
  siOllama,
  siNextdotjs,
  siReact,
  siTailwindcss,
  siRedis,
  siMysql,
  siQdrant,
  siGooglegemini,
  siGithubcopilot,
} from "simple-icons";

export type TechIconData = {
  title: string;
  hex?: string; // single-color icons (Simple Icons): tinted via `hex`
  path?: string; // single <path> data for hex-tinted icons
  markup?: string; // full multi-color inner markup (own fills/gradients), rendered as-is
};

// OpenAI was removed from Simple Icons; ship the official mark ourselves.
const openai: TechIconData = {
  title: "OpenAI",
  hex: "10A37F",
  path: "M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7495-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z",
};

// Claude (Anthropic) — the sunburst rendered in Claude's signature coral.
const claude: TechIconData = {
  title: "Claude",
  hex: "D97757",
  path: siAnthropic.path,
};

// Google Gemini — the spark in its blue → violet → coral gradient.
const gemini: TechIconData = {
  title: "Gemini",
  markup: `<defs><linearGradient id="gemini-grad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse"><stop stop-color="#4285F4"></stop><stop offset=".5" stop-color="#9B72CB"></stop><stop offset="1" stop-color="#D96570"></stop></linearGradient></defs><path fill="url(#gemini-grad)" d="${siGooglegemini.path}"></path>`,
};

// Microsoft Azure was also removed from Simple Icons; official "A" mark.
const azure: TechIconData = {
  title: "Microsoft Azure",
  hex: "0078D4",
  path: "M5.483 21.3H24L14.025 4.013l-3.038 8.347 5.836 6.938L5.483 21.3zM13.23 2.7L6.108 8.782 0 19.287h5.508v.014L13.23 2.7z",
};

// AI-native brands not in Simple Icons — full multi-color marks (via @lobehub/icons), inlined.
const langfuse: TechIconData = {
  title: "Langfuse",
  markup: `<path d="M11.925 14.781l1.823 1.465s1.395-1.036 2.421-1.188c1.076-.16 2.224.44 3.288 1.155 1.607 1.08 2.959 2.451 2.959 2.451L24 17.11s-4.367-4.732-7.83-4.304c-2.272.281-4.245 1.975-4.245 1.975z" fill="#FF5D5F"></path><path d="M1.494 5.757L0 7.401s4.164 3.886 7.442 3.886c1.494 0 3.567-1.171 5.35-2.692 1.016-.867 2.152-1.851 3.288-1.851.763 0 1.77.404 2.72 1.466 0 0 .612-.368.986-.632.328-.232.816-.627.816-.627-1.366-1.458-3.342-2.524-4.522-2.419-1.913 0-3.288 1.191-4.992 2.568-1.703 1.377-2.42 1.945-3.646 1.945-2.062 0-5.948-3.288-5.948-3.288zM1.494 18.278L0 16.635s4.164-3.886 7.442-3.886c1.494 0 3.567 1.17 5.35 2.692 1.016.866 2.152 1.851 3.288 1.851.767 0 1.766-.421 2.72-1.494 0 0 .573.353.926.597.363.252.897.667.897.667-1.367 1.47-3.357 2.547-4.543 2.442-1.913 0-3.049-1.014-4.752-2.391-1.704-1.377-2.66-2.122-3.886-2.122-2.062 0-5.948 3.287-5.948 3.287zM20.981 9.461c-.389.269-1.016.658-1.016.658s.359.777.359 1.823c0 1.046-.329 1.943-.329 1.943s.563.351.927.597c.377.256.956.688.956.688s.687-1.435.687-3.228c0-1.793-.687-3.138-.687-3.138s-.54.41-.897.657z" fill="#4E9CFF"></path><path d="M12.015 9.222l1.733-1.434s1.395 1.003 2.421 1.155c1.076.16 2.224-.44 3.288-1.155 1.607-1.08 2.959-2.451 2.959-2.451L24 6.89s-4.367 4.732-7.83 4.304c-2.272-.28-4.155-1.973-4.155-1.973zM7.83 4.5c2.242 0 4.125 1.913 4.125 1.913s-.524.413-.867.687c-.357.286-.926.747-.926.747S9.176 6.801 7.83 6.801c-.552 0-1.268.332-2.033.987-.59.505-1.203 1.133-1.613 1.912-.356.674-.55 1.468-.568 2.302-.024 1.047.347 2.145.956 3.018.408.586.895 1.027 1.405 1.405.661.491 1.351.837 1.853.837.536 0 1.017-.186 1.375-.358.568-.33 1.016-.718 1.016-.718l1.763 1.465s-.717.717-1.703 1.255c-.638.314-1.456.628-2.451.628-.994 0-2.148-.528-3.228-1.345-.698-.528-1.382-1.154-1.913-1.913-.87-1.244-1.318-2.758-1.315-4.274A7.568 7.568 0 012.75 7.698C4.125 5.905 6.158 4.5 7.83 4.5z" fill="#FF5D5F"></path>`,
};

const llamaindex: TechIconData = {
  title: "LlamaIndex",
  markup: `<path d="M15.855 17.122c-2.092.924-4.358.545-5.23.24 0 .21-.01.857-.048 1.78-.038.924-.332 1.507-.475 1.684.016.577.029 1.837-.047 2.26a1.93 1.93 0 01-.476.914H8.295c.114-.577.555-.946.761-1.058.114-1.193-.11-2.229-.238-2.597-.126.449-.437 1.49-.665 2.068a6.418 6.418 0 01-.713 1.299h-.951c-.048-.578.27-.77.475-.77.095-.177.323-.731.476-1.54.152-.807-.064-2.324-.19-2.981v-2.068c-1.522-.818-2.092-1.636-2.473-2.55-.304-.73-.222-1.843-.142-2.308-.096-.176-.373-.625-.476-1.25-.142-.866-.063-1.491 0-1.828-.095-.096-.285-.587-.285-1.78 0-1.192.349-1.811.523-1.972v-.529c-.666-.048-1.331-.336-1.712-.721-.38-.385-.095-.962.143-1.154.238-.193.475-.049.808-.145.333-.096.618-.192.76-.48C4.512 1.403 4.287.448 4.16 0c.57.077.935.577 1.046.818V0c.713.337 1.997 1.154 2.425 2.934.342 1.424.586 4.409.665 5.723 1.823.016 4.137-.26 6.229.193 1.901.412 2.757 1.25 3.755 1.25.999 0 1.57-.577 2.282-.096.714.481 1.094 1.828.999 2.838-.076.808-.697 1.074-.998 1.106-.38 1.27 0 2.485.237 2.934v1.827c.111.16.333.655.333 1.347 0 .693-.222 1.154-.333 1.299.19 1.077-.08 2.18-.238 2.597h-1.283c.152-.385.412-.481.523-.481.228-1.193.063-2.293-.048-2.693-.722-.424-1.188-1.17-1.331-1.491.016.272-.029 1.029-.333 1.875-.304.847-.76 1.347-.95 1.491v1.01h-1.284c0-.615.348-.737.523-.721.222-.4.76-1.01.76-2.212 0-1.015-.713-1.492-1.236-2.405-.248-.434-.127-.978-.047-1.203z" fill="url(#lobe-llama-grad)"></path><defs><linearGradient gradientUnits="userSpaceOnUse" id="lobe-llama-grad" x1="4.021" x2="24.613" y1="2.02" y2="19.277"><stop offset=".062" stop-color="#F6DCD9"></stop><stop offset=".326" stop-color="#FFA5EA"></stop><stop offset=".589" stop-color="#45DFF8"></stop><stop offset="1" stop-color="#BC8DEB"></stop></linearGradient></defs>`,
};

const langchain: TechIconData = {
  title: "LangChain",
  markup: `<path d="M7.531 15.976a7.534 7.534 0 000-10.651L2.206 0A7.537 7.537 0 000 5.326c0 1.996.794 3.913 2.206 5.325l5.325 5.325zM18.674 16.469a7.535 7.535 0 00-10.65 0l5.325 5.325a7.536 7.536 0 0010.651 0l-5.326-5.325zM2.218 21.782a7.536 7.536 0 005.326 2.206v-7.531H.012c0 1.996.795 3.914 2.206 5.325zM20.73 8.595a7.534 7.534 0 00-10.651.001l5.325 5.326 5.326-5.327z" fill="#7FC8FF"></path>`,
};

// LangGraph's mark is near-black (#1C3C3C); rendered in a light teal so it reads on dark.
const langgraph: TechIconData = {
  title: "LangGraph",
  markup: `<path clip-rule="evenodd" fill-rule="evenodd" fill="#4FD1A5" d="M6.099 6H17.9C21.264 6 24 8.692 24 12s-2.736 6-6.099 6H6.1C2.736 18 0 15.308 0 12s2.736-6 6.099-6zm5.419 9.3c.148.154.367.146.561.106l.002.001c.09-.072-.038-.163-.16-.25-.074-.052-.145-.102-.166-.147.068-.08-.133-.265-.289-.408a1.52 1.52 0 01-.15-.148c-.11-.119-.155-.268-.2-.418-.03-.1-.06-.2-.11-.292-.304-.694-.653-1.383-1.143-1.97-.315-.39-.674-.74-1.033-1.09a19.384 19.384 0 01-.683-.688c-.226-.229-.362-.511-.499-.794-.114-.236-.228-.473-.396-.68-.507-.735-2.107-.936-2.342.104 0 .032-.01.052-.039.073-.13.094-.245.2-.342.327-.238.326-.274.877.022 1.17l.001-.019c.01-.147.02-.286.139-.391.228.193.576.262.841.117.32.45.422.995.525 1.54.085.456.17.912.382 1.316l.014.022c.124.203.25.41.41.587.059.089.178.184.297.279.157.125.314.25.329.359v.143c-.001.285-.002.58.184.813.103.205-.15.41-.352.385-.112.015-.233-.014-.354-.042-.165-.04-.329-.078-.462-.003-.038.04-.091.04-.145.042-.064.002-.129.004-.167.07-.008.019-.026.04-.045.063-.042.05-.087.105-.033.146l.015-.01c.082-.062.16-.12.27-.084-.014.08.039.102.092.123l.027.012a.344.344 0 01-.008.056c-.009.045-.017.088.018.127a.598.598 0 00.046-.054c.037-.046.073-.092.139-.11.144.19.289.111.471.013.206-.111.459-.248.81-.055-.135-.006-.255.01-.345.12-.023.024-.042.052-.002.084.207-.132.294-.085.375-.04.06.032.115.063.212.024l.07-.036c.155-.083.314-.166.499-.137-.139.039-.188.125-.242.218-.026.047-.054.095-.094.14-.021.021-.03.046-.007.08.29-.023.4-.095.548-.192.07-.046.15-.099.261-.154.124-.075.248-.027.368.02.13.05.255.098.371-.014.037-.033.083-.034.129-.034.016 0 .033 0 .05-.002-.037-.19-.24-.188-.448-.186-.24.003-.483.006-.475-.289.222-.149.224-.407.226-.651 0-.06 0-.117.005-.173.163.09.336.16.508.229.162.065.323.13.474.21.158.25.404.58.732.558.008-.026.016-.047.026-.073.019.004.039.008.059.014.086.02.178.044.223-.056zm6.429-2.829c.19.186.447.29.716.29.269 0 .526-.104.716-.29a.98.98 0 00.297-.7.98.98 0 00-.297-.7 1.024 1.024 0 00-1.08-.224l-.58-.831-.405.272.583.835a.978.978 0 00.05 1.348zm-1.817-2.69a1.03 1.03 0 001.056-.095.991.991 0 00.363-.507.97.97 0 00-.016-.62.994.994 0 00-.39-.488 1.028 1.028 0 00-1.298.14.987.987 0 00-.263.856.98.98 0 00.187.42c.095.125.218.225.36.294zm0 5.752a1.032 1.032 0 001.056-.095.991.991 0 00.363-.507.97.97 0 00-.016-.62.994.994 0 00-.39-.488 1.027 1.027 0 00-1.298.14.986.986 0 00-.263.856.98.98 0 00.187.42c.095.125.218.225.36.294zm.93-3.516v-.492h-1.55a.977.977 0 00-.217-.404l.584-.847-.425-.276-.583.847a1.023 1.023 0 00-1.047.23.973.973 0 00-.296.696c0 .261.107.512.296.696a1.023 1.023 0 001.047.23l.583.847.42-.276-.579-.847a.977.977 0 00.217-.404h1.55z"></path>`,
};

const vllm: TechIconData = {
  title: "vLLM",
  markup: `<path d="M0 4.973h9.324V23L0 4.973z" fill="#FDB515"></path><path d="M13.986 4.351L22.378 0l-6.216 23H9.324l4.662-18.649z" fill="#30A2FF"></path>`,
};

const claudecode: TechIconData = {
  title: "Claude Code",
  markup: `<path clip-rule="evenodd" fill-rule="evenodd" fill="#D97757" d="M20.998 10.949H24v3.102h-3v3.028h-1.487V20H18v-2.921h-1.487V20H15v-2.921H9V20H7.488v-2.921H6V20H4.487v-2.921H3V14.05H0V10.95h3V5h17.998v5.949zM6 10.949h1.488V8.102H6v2.847zm10.51 0H18V8.102h-1.49v2.847z"></path>`,
};

// CrewAI's base shape is near-black; recolored to the brand red so it reads on dark.
const crewai: TechIconData = {
  title: "CrewAI",
  markup: `<path d="M19.41 10.783a2.753 2.753 0 012.471 1.355c.483.806.622 1.772.385 2.68l-.136.522a9.994 9.994 0 01-3.156 5.058c-.605.517-1.283 1.062-2.083 1.524l-.028.017c-.402.232-.884.511-1.398.756-1.19.602-2.475.997-3.798 1.167-.854.111-1.716.155-2.577.132H9.072a8.588 8.588 0 01-5.046-1.87l-.012-.01-.012-.01A8.024 8.024 0 011.22 17.42a10.916 10.916 0 01-.102-3.779A15.622 15.622 0 012.88 8.4a21.758 21.758 0 012.432-3.678 15.44 15.44 0 013.56-3.182A9.958 9.958 0 0112.44.104h.004l.003-.002c2.057-.384 3.743.374 5.024 1.26a8.28 8.28 0 012.395 2.513l.024.04.023.042a5.474 5.474 0 01.508 4.012c-.239.97-.577 1.914-1.01 2.814z" fill="#FF5A50"></path><path d="M18.861 13.165a.748.748 0 011.256.031c.199.332.256.73.159 1.103l-.137.522a7.936 7.936 0 01-2.504 4.014c-.572.49-1.138.939-1.774 1.306-.427.247-.857.496-1.303.707a9.628 9.628 0 01-3.155.973 14.33 14.33 0 01-2.257.116 6.531 6.531 0 01-3.837-1.422 5.967 5.967 0 01-2.071-3.494 8.859 8.859 0 01-.085-3.08 13.56 13.56 0 011.54-4.568 19.701 19.701 0 012.212-3.348 13.382 13.382 0 013.088-2.76 7.9 7.9 0 012.832-1.14c1.307-.245 2.434.207 3.481.933a6.222 6.222 0 011.806 1.892c.423.767.536 1.668.314 2.515a12.394 12.394 0 01-.99 2.67l-.223.497c-.321.713-.642 1.426-.97 2.137a.762.762 0 01-.97.467 3.39 3.39 0 01-2.283-2.49c-.095-.83.04-1.669.39-2.426.288-.746.61-1.477.933-2.208l.248-.563a.53.53 0 00-.204-.742 2.35 2.35 0 00-1.2.702 25.291 25.291 0 00-1.614 1.767 21.561 21.561 0 00-2.619 4.184 7.59 7.59 0 00-.816 2.753 7.042 7.042 0 00.07 2.219 2.055 2.055 0 001.934 1.715c1.801.1 3.59-.363 5.116-1.328.582-.4 1.141-.831 1.675-1.294.752-.71 1.376-1.519 1.958-2.36z" fill="#fff"></path>`,
};

// ModelContextProtocol ships only a monochrome mark; rendered in light ink for dark.
const mcp: TechIconData = {
  title: "ModelContextProtocol",
  markup: `<g fill="#e8eef9" fill-rule="evenodd"><path d="M15.688 2.343a2.588 2.588 0 00-3.61 0l-9.626 9.44a.863.863 0 01-1.203 0 .823.823 0 010-1.18l9.626-9.44a4.313 4.313 0 016.016 0 4.116 4.116 0 011.204 3.54 4.3 4.3 0 013.609 1.18l.05.05a4.115 4.115 0 010 5.9l-8.706 8.537a.274.274 0 000 .393l1.788 1.754a.823.823 0 010 1.18.863.863 0 01-1.203 0l-1.788-1.753a1.92 1.92 0 010-2.754l8.706-8.538a2.47 2.47 0 000-3.54l-.05-.049a2.588 2.588 0 00-3.607-.003l-7.172 7.034-.002.002-.098.097a.863.863 0 01-1.204 0 .823.823 0 010-1.18l7.273-7.133a2.47 2.47 0 00-.003-3.537z"></path><path d="M14.485 4.703a.823.823 0 000-1.18.863.863 0 00-1.204 0l-7.119 6.982a4.115 4.115 0 000 5.9 4.314 4.314 0 006.016 0l7.12-6.982a.823.823 0 000-1.18.863.863 0 00-1.204 0l-7.119 6.982a2.588 2.588 0 01-3.61 0 2.47 2.47 0 010-3.54l7.12-6.982z"></path></g>`,
};

const antigravity: TechIconData = {
  title: "Antigravity",
  markup: `<mask height="23" id="ag-mask" maskUnits="userSpaceOnUse" width="24" x="0" y="1"><path d="M21.751 22.607c1.34 1.005 3.35.335 1.508-1.508C17.73 15.74 18.904 1 12.037 1 5.17 1 6.342 15.74.815 21.1c-2.01 2.009.167 2.511 1.507 1.506 5.192-3.517 4.857-9.714 9.715-9.714 4.857 0 4.522 6.197 9.714 9.715z" fill="#fff"></path></mask><g mask="url(#ag-mask)"><g filter="url(#ag-1)"><path d="M-1.018-3.992c-.408 3.591 2.686 6.89 6.91 7.37 4.225.48 7.98-2.043 8.387-5.633.408-3.59-2.686-6.89-6.91-7.37-4.225-.479-7.98 2.043-8.387 5.633z" fill="#FFE432"></path></g><g filter="url(#ag-2)"><path d="M15.269 7.747c1.058 4.557 5.691 7.374 10.348 6.293 4.657-1.082 7.575-5.653 6.516-10.21-1.058-4.556-5.691-7.374-10.348-6.292-4.657 1.082-7.575 5.653-6.516 10.21z" fill="#FC413D"></path></g><g filter="url(#ag-3)"><path d="M-12.443 10.804c1.338 4.703 7.36 7.11 13.453 5.378 6.092-1.733 9.947-6.95 8.61-11.652C8.282-.173 2.26-2.58-3.833-.848-9.925.884-13.78 6.1-12.443 10.804z" fill="#00B95C"></path></g><g filter="url(#ag-5)"><path d="M-7.608 14.703c3.352 3.424 9.126 3.208 12.896-.483 3.77-3.69 4.108-9.459.756-12.883C2.69-2.087-3.083-1.871-6.853 1.82c-3.77 3.69-4.108 9.458-.755 12.883z" fill="#00B95C"></path></g><g filter="url(#ag-6)"><path d="M9.932 27.617c1.04 4.482 5.384 7.303 9.7 6.3 4.316-1.002 6.971-5.448 5.93-9.93-1.04-4.483-5.384-7.304-9.7-6.301-4.316 1.002-6.971 5.448-5.93 9.93z" fill="#3186FF"></path></g><g filter="url(#ag-7)"><path d="M2.572-8.185C.392-3.329 2.778 2.472 7.9 4.771c5.122 2.3 11.042.227 13.222-4.63 2.18-4.855-.205-10.656-5.327-12.955-5.122-2.3-11.042-.227-13.222 4.63z" fill="#FBBC04"></path></g><g filter="url(#ag-9)"><path d="M28.71 17.471c-1.413 1.649-5.1.808-8.236-1.878-3.135-2.687-4.531-6.201-3.118-7.85 1.412-1.649 5.1-.808 8.235 1.878s4.532 6.2 3.119 7.85z" fill="#749BFF"></path></g><g filter="url(#ag-11)"><path d="M-.915 2.684c-1.44 3.473-.97 6.967 1.05 7.804 2.02.837 4.824-1.3 6.264-4.772 1.44-3.473.97-6.967-1.05-7.804-2.02-.837-4.824 1.3-6.264 4.772z" fill="#FFEE48"></path></g></g><defs><filter color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse" height="17.587" id="ag-1" width="19.838" x="-3.288" y="-11.917"><feGaussianBlur stdDeviation="1.117"></feGaussianBlur></filter><filter color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse" height="38.565" id="ag-2" width="38.9" x="4.251" y="-13.493"><feGaussianBlur stdDeviation="5.4"></feGaussianBlur></filter><filter color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse" height="36.517" id="ag-3" width="40.955" x="-21.889" y="-10.592"><feGaussianBlur stdDeviation="4.591"></feGaussianBlur></filter><filter color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse" height="36.595" id="ag-5" width="36.632" x="-19.099" y="-10.278"><feGaussianBlur stdDeviation="4.591"></feGaussianBlur></filter><filter color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse" height="34.087" id="ag-6" width="33.533" x=".981" y="8.758"><feGaussianBlur stdDeviation="4.363"></feGaussianBlur></filter><filter color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse" height="35.276" id="ag-7" width="35.978" x="-6.143" y="-21.659"><feGaussianBlur stdDeviation="3.954"></feGaussianBlur></filter><filter color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse" height="24.054" id="ag-9" width="25.094" x="10.485" y=".58"><feGaussianBlur stdDeviation="3.159"></feGaussianBlur></filter><filter color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse" height="26.151" id="ag-11" width="22.194" x="-8.355" y="-8.876"><feGaussianBlur stdDeviation="3.303"></feGaussianBlur></filter></defs>`,
};

// Normalized tech name -> icon data. Covers the aliases used across the site.
const registry: Record<string, TechIconData> = {
  python: siPython,
  typescript: siTypescript,
  javascript: siJavascript,
  docker: siDocker,
  langchain: langchain,
  langgraph: langgraph,
  langfuse: langfuse,
  llamaindex: llamaindex,
  vllm: vllm,
  claudecode: claudecode,
  "claude code": claudecode,
  crewai: crewai,
  antigravity: antigravity,
  qdrant: siQdrant,
  azure: azure,
  "microsoft azure": azure,
  anthropic: siAnthropic,
  mcp: mcp,
  modelcontextprotocol: mcp,
  openai: openai,
  "openai embeddings": openai,
  chatgpt: openai,
  claude: claude,
  gemini: gemini,
  "google gemini": gemini,
  copilot: siGithubcopilot,
  "github copilot": siGithubcopilot,
  "hugging face": siHuggingface,
  huggingface: siHuggingface,
  airflow: siApacheairflow,
  "apache airflow": siApacheairflow,
  snowflake: siSnowflake,
  databricks: siDatabricks,
  kafka: siApachekafka,
  "apache kafka": siApachekafka,
  spark: siApachespark,
  "apache spark": siApachespark,
  duckdb: siDuckdb,
  fastapi: siFastapi,
  celery: siCelery,
  streamlit: siStreamlit,
  vercel: siVercel,
  pandas: siPandas,
  numpy: siNumpy,
  postgresql: siPostgresql,
  postgres: siPostgresql,
  nvidia: siNvidia,
  "nvidia l40s": siNvidia,
  "nvidia gpu (l40s)": siNvidia,
  jupyter: siJupyter,
  git: siGit,
  github: siGithub,
  pytorch: siPytorch,
  tensorflow: siTensorflow,
  "scikit-learn": siScikitlearn,
  ollama: siOllama,
  "next.js": siNextdotjs,
  react: siReact,
  "tailwind css": siTailwindcss,
  redis: siRedis,
  mysql: siMysql,
};

export function getTechIcon(name: string): TechIconData | null {
  const key = name.trim().toLowerCase();
  return registry[key] ?? null;
}

/**
 * Brands with no bundled logo (removed from Simple Icons / no official SVG here).
 * Drop a real SVG at /brand/tech/<slug>.svg and it's used automatically; until
 * then a brand-colored dot stands in.
 */
export type FileBrand = { slug: string; hex: string };
const fileBrands: Record<string, FileBrand> = {
  oracle: { slug: "oracle", hex: "C74634" },
};
export function getFileBrand(name: string): FileBrand | null {
  return fileBrands[name.trim().toLowerCase()] ?? null;
}

/** True luminance check so near-black brand marks stay visible on a dark theme. */
export function isDarkHex(hex: string): boolean {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16) / 255;
  const g = parseInt(h.slice(2, 4), 16) / 255;
  const b = parseInt(h.slice(4, 6), 16) / 255;
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return lum < 0.22;
}

// Curated, recognizable set for the animated marquee (all have real logos).
export const marqueeTech: string[] = [
  "Python",
  "LangChain",
  "LangGraph",
  "OpenAI",
  "Anthropic",
  "Qdrant",
  "React",
  "FastAPI",
  "Docker",
  "Azure",
  "Hugging Face",
  "Apache Airflow",
  "Celery",
  "PostgreSQL",
  "NVIDIA",
  "TypeScript",
  "Streamlit",
  "Vercel",
  "vLLM",
  "Claude Code",
  "CrewAI",
  "Antigravity", 
  "ModelContextProtocol"
];