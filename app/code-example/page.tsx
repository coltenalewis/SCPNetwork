'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

type FileNode = {
  id: string;
  label: string;
  type: 'folder' | 'file';
  children?: FileNode[];
  content?: string;
};

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function highlightLua(code: string): string {
  const escaped = escapeHtml(code);
  return escaped
    .replace(/(--\[\[[\s\S]*?\]\]|--[^\n]*)/g, '<span class="text-emerald-300">$1</span>')
    .replace(/("(?:\\.|[^"])*"|'(?:\\.|[^'])*')/g, '<span class="text-amber-200">$1</span>')
    .replace(/\b(local|function|if|then|elseif|else|end|for|in|do|while|repeat|until|return|continue|and|or|not|true|false|nil|type|typeof)\b/g, '<span class="text-violet-300">$1</span>')
    .replace(/\b(game|script|task|table|ipairs|pairs|pcall|warn|print|require|error|os)\b/g, '<span class="text-cyan-300">$1</span>');
}

const serverCoreCode = `--!strict
----------------------------------------------------------------
-- Service Loader
-- Loads all ModuleScripts in the "Services" folder, initializes
-- them in priority order, handles Dependencies + Debug toggles.
----------------------------------------------------------------

local ServerScriptService = game:GetService("ServerScriptService")

local SERVICE_FOLDER_NAME = "Services"

-- Change this to true for verbose output across all services:
local DEBUG_GLOBAL = false

----------------------------------------------------------------
-- Discover services
----------------------------------------------------------------
local serviceFolder = script:FindFirstChild(SERVICE_FOLDER_NAME)
if not serviceFolder then
\terror(("ServiceLoader: Folder '%s' not found inside the loader script.")
\t\t:format(SERVICE_FOLDER_NAME))
end

local rawServices = {}
for _, module in ipairs(serviceFolder:GetChildren()) do
\tif module:IsA("ModuleScript") then
\t\ttable.insert(rawServices, module)
\tend
end

----------------------------------------------------------------
-- Load service modules
----------------------------------------------------------------
local loaded = {}

for _, module in ipairs(rawServices) do
\tlocal svc = require(module)
\tloaded[module.Name] = svc

\t-- Apply global debug setting if module has Debug flag
\tif DEBUG_GLOBAL then
\t\tsvc.Debug = true
\tend

\tif svc.Debug then
\t\tprint("[ServiceLoader] Loaded service:", module.Name)
\tend
end

----------------------------------------------------------------
-- Resolve Dependencies + Sort by Priority
----------------------------------------------------------------
local function getPriority(svc)
\treturn svc.Priority or 0
end

table.sort(rawServices, function(a, b)
\tlocal A = loaded[a.Name]
\tlocal B = loaded[b.Name]
\treturn getPriority(A) > getPriority(B)
end)

----------------------------------------------------------------
-- Initialize Services
----------------------------------------------------------------
for _, module in ipairs(rawServices) do
\tlocal svc = loaded[module.Name]

\tif svc.Enabled == false then
\t\tif svc.Debug then
\t\t\twarn("[ServiceLoader] Skipping disabled service:", module.Name)
\t\tend
\t\tcontinue
\tend

\t-- Check dependencies
\tif svc.Dependencies then
\t\tfor _, depName in ipairs(svc.Dependencies) do
\t\t\tif not loaded[depName] then
\t\t\t\twarn(("[ServiceLoader] Dependency '%s' missing for '%s'!")
\t\t\t\t\t:format(depName, module.Name))
\t\t\tend
\t\tend
\tend

\t-- Inject context
\tsvc._ctx = {
\t\tAllServices = loaded,
\t\tName = module.Name,
\t}

\t-- Init
\tif typeof(svc.Init) == "function" then
\t\tif svc.Debug then
\t\t\tprint("[ServiceLoader] Initializing:", module.Name)
\t\tend
\t\tsvc:Init()
\tend

\t-- Start (post-init)
\tif typeof(svc.Start) == "function" then
\t\ttask.spawn(function()
\t\t\tif svc.Debug then
\t\t\t\tprint("[ServiceLoader] Starting:", module.Name)
\t\t\tend
\t\t\tsvc:Start()
\t\tend)
\tend
end

print("[ServiceLoader] All services loaded.")`;

const dataServiceCode = `--!strict
----------------------------------------------------------------
-- DataService.server.lua (Instance-based)
-- Authoritative player data + persistence
-- - All runtime data lives under player:FindFirstChild("PlayerData")
-- - Saves / loads as a serialised tree
-- - Handles non-DataStore-safe types (e.g., Color3Value)
-- - Autosaves every 5 minutes
----------------------------------------------------------------

local DataService = {}

----------------------------------------------------------------
-- Settings
----------------------------------------------------------------
DataService.Priority = 90
DataService.Enabled  = true

DataService.Debug = {
\tEnabled = true,
\tLogInit = true,
\tLogInitData = false,
\tLogLoads = true,
\tLogSaves = true,
\tLogMutations = false,
}

DataService.Dependencies = {}

----------------------------------------------------------------
-- Roblox services
----------------------------------------------------------------
local Players = game:GetService("Players")
local DataStoreService = game:GetService("DataStoreService")
local RunService = game:GetService("RunService")
local HttpService = game:GetService("HttpService")

----------------------------------------------------------------
-- Modules
----------------------------------------------------------------
local Defaults = require(script:WaitForChild("Defaults"))

----------------------------------------------------------------
-- DataStore config
----------------------------------------------------------------
local DATASTORE_NAME = "PlayerData_v3_Instances"
local Store = DataStoreService:GetDataStore(DATASTORE_NAME)

local AUTOSAVE_SECONDS = 300
local IO_RETRIES = 6
local IO_BASE_DELAY = 0.35

----------------------------------------------------------------
-- Types / state
----------------------------------------------------------------
type PlayerRecord = {
\trootFolder: Folder,
\tdirty: boolean,
\tlastSaveUnix: number,
}

local RecordsByPlayer: {[Player]: PlayerRecord} = {}

----------------------------------------------------------------
-- Debug helpers
----------------------------------------------------------------
local function debugOn(): boolean
\treturn DataService.Debug.Enabled == true
end

local function ts(): string
\treturn os.date("!%Y-%m-%dT%H:%M:%SZ")
end

local function dlog(flag: boolean, ...: any)
\tif not debugOn() then return end
\tif not flag then return end
\tprint(("[DataService %s]"):format(ts()), ...)
end

local function dwarn(flag: boolean, ...: any)
\tif not debugOn() then return end
\tif not flag then return end
\twarn(("[DataService %s]"):format(ts()), ...)
end

-- ...additional serialization, defaults merge, lifecycle,
-- autosave, and shutdown-safe persistence implementation...

function DataService:Init()
\tif not RunService:IsServer() then
\t\terror("DataService must run on the server")
\tend
\n\tPlayers.PlayerAdded:Connect(initializePlayer)
\tPlayers.PlayerRemoving:Connect(removePlayer)
\n\tgame:BindToClose(function()
\t\tfor player, _rec in pairs(RecordsByPlayer) do
\t\t\tpcall(function()
\t\t\t\tDataService:Save(player, "BindToClose")
\t\t\tend)
\t\tend
\tend)
end

function DataService:Start()
\tstartAutosaveLoop()
end

return DataService`;

const tree: FileNode[] = [
  {
    id: 'servercore-file',
    label: 'ServerCore.lua',
    type: 'file',
    content: serverCoreCode,
    children: [
      {
        id: 'services',
        label: 'Services',
        type: 'folder',
        children: [{ id: 'dataservice', label: 'DataService.lua', type: 'file', content: dataServiceCode }],
      },
    ],
  },
];

function flattenFiles(nodes: FileNode[]): FileNode[] {
  const out: FileNode[] = [];
  const walk = (items: FileNode[]) => {
    for (const item of items) {
      if (item.type === 'file') out.push(item);
      if (item.children) walk(item.children);
    }
  };
  walk(nodes);
  return out;
}

function TreeItem({ node, selectedId, onSelect }: { node: FileNode; selectedId: string; onSelect: (id: string) => void }) {
  const [open, setOpen] = useState(true);

  if (node.type === 'file' && !node.children?.length) {
    return (
      <button
        onClick={() => onSelect(node.id)}
        className={`flex w-full items-center rounded-lg px-3 py-2 text-left text-sm transition-colors ${
          selectedId === node.id ? 'font-medium' : ''
        }`}
        style={selectedId === node.id
          ? { background: 'var(--accent-bg)', color: 'var(--accent)' }
          : { color: 'var(--ink-soft)' }
        }
      >
        📄 {node.label}
      </button>
    );
  }

  return (
    <div>
      <button
        onClick={() => {
          if (node.type === 'file') onSelect(node.id);
          setOpen((prev) => !prev);
        }}
        className="flex w-full items-center rounded-lg px-3 py-2 text-left text-sm transition-colors"
        style={selectedId === node.id
          ? { background: 'var(--accent-bg)', color: 'var(--accent)' }
          : { color: 'var(--ink-soft)' }
        }
      >
        <span className="mr-2">{open ? '▾' : '▸'}</span> {node.type === 'file' ? '📄' : '📁'} {node.label}
      </button>
      {open ? (
        <div className="ml-4 space-y-0.5 pl-2" style={{ borderLeft: '1px solid var(--border)' }}>
          {node.children?.map((child) => <TreeItem key={child.id} node={child} selectedId={selectedId} onSelect={onSelect} />)}
        </div>
      ) : null}
    </div>
  );
}

export default function CodeExamplePage() {
  const files = useMemo(() => flattenFiles(tree), []);
  const [selectedId, setSelectedId] = useState('servercore-file');
  const selected = files.find((f) => f.id === selectedId) ?? files[0];

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <Link href="/" className="link-back">← Back</Link>
      <h1 className="mt-4 font-display text-4xl" style={{ color: 'var(--ink)' }}>
        Code Example
      </h1>
      <p className="mt-3 max-w-3xl text-[15px] leading-relaxed" style={{ color: 'var(--ink-soft)' }}>
        I build the core structure in a custom single-script architecture similar to Knit: services are loaded, ordered, dependency-checked, and initialized in a cohesive pipeline.
        I then refine and standardize with external dev tooling for formatting, comment hygiene, and robust error handling.
      </p>

      <section className="mt-8 grid gap-5 lg:grid-cols-[260px,1fr]">
        <aside className="card p-4">
          <div className="space-y-0.5">
            {tree.map((node) => (
              <TreeItem key={node.id} node={node} selectedId={selectedId} onSelect={setSelectedId} />
            ))}
          </div>
        </aside>

        <article className="card overflow-hidden p-5">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-semibold" style={{ color: 'var(--ink)' }}>{selected.label}</p>
            <span className="badge">Lua (strict)</span>
          </div>
          <pre className="code-block max-h-[70vh] overflow-auto p-5 text-xs leading-6">
            <code dangerouslySetInnerHTML={{ __html: highlightLua(selected.content ?? '') }} />
          </pre>
        </article>
      </section>
    </main>
  );
}
