import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'pinia';
import '@vue/shared';

const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-slate-50 text-slate-800" }, _attrs))}><div class="mx-auto max-w-6xl p-8"><h1 class="text-4xl font-semibold mb-6">Dashboard</h1><div class="grid gap-6 lg:grid-cols-3"><div class="rounded-3xl bg-white p-6 shadow-sm"><h2 class="text-xl font-semibold mb-3">Projetos</h2><p class="text-slate-500">Visão geral rápida dos projetos ativos.</p></div><div class="rounded-3xl bg-white p-6 shadow-sm"><h2 class="text-xl font-semibold mb-3">Tarefas</h2><p class="text-slate-500">Status e progresso das tarefas em andamento.</p></div><div class="rounded-3xl bg-white p-6 shadow-sm"><h2 class="text-xl font-semibold mb-3">Chat</h2><p class="text-slate-500">Acompanhe mensagens e notificações em tempo real.</p></div></div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const dashboard = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { dashboard as default };
//# sourceMappingURL=dashboard-hy8qv8KP.mjs.map
