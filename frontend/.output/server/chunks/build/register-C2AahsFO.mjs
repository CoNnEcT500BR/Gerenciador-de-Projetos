import { _ as __nuxt_component_0 } from './nuxt-link-B9ixgMni.mjs';
import { defineComponent, ref, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent } from 'vue/server-renderer';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import './server.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'pinia';
import '@vue/shared';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "register",
  __ssrInlineRender: true,
  setup(__props) {
    const name = ref("");
    const email = ref("");
    const password = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex items-center justify-center bg-slate-50" }, _attrs))}><div class="w-full max-w-md bg-white p-8 rounded-3xl shadow-lg"><h1 class="text-2xl font-bold mb-6">Registrar</h1><form class="space-y-4"><div><label class="block text-sm font-medium mb-2">Nome</label><input${ssrRenderAttr("value", name.value)} type="text" required class="w-full rounded-xl border border-slate-300 px-4 py-3"></div><div><label class="block text-sm font-medium mb-2">Email</label><input${ssrRenderAttr("value", email.value)} type="email" required class="w-full rounded-xl border border-slate-300 px-4 py-3"></div><div><label class="block text-sm font-medium mb-2">Senha</label><input${ssrRenderAttr("value", password.value)} type="password" required class="w-full rounded-xl border border-slate-300 px-4 py-3"></div><button type="submit" class="w-full rounded-2xl bg-slate-900 text-white px-4 py-3">Registrar</button></form><p class="text-sm text-slate-500 mt-4">Já tem conta? `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/login",
        class: "text-slate-900 font-semibold"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Entre`);
          } else {
            return [
              createTextVNode("Entre")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</p></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/register.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=register-C2AahsFO.mjs.map
