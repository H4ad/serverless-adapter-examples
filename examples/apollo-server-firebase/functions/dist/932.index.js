export const id=932;export const ids=[932];export const modules={33932:(e,t,n)=>{n.r(t),n.d(t,{ApolloServerPluginCacheControl:()=>l});var a=n(90398),r=n(79380),c=n(59770),i=n(13321),o=n(52718);function l(e=Object.create(null)){let t,n;return(0,i.U)({__internal_plugin_id__:"CacheControl",__is_disabled_plugin__:!1,async serverWillStart({schema:e}){t=new o({max:Object.values(e.getTypeMap()).filter(a.Gv).length}),n=new o({max:Object.values(e.getTypeMap()).filter(a.lp).flatMap((e=>Object.values(e.getFields()))).length+Object.values(e.getTypeMap()).filter(a.oT).flatMap((e=>Object.values(e.getFields()))).length})},async requestDidStart(i){function o(e){const n=t.get(e);if(n)return n;const a=function(e){if(e.astNode){const t=d(e.astNode.directives);if(t)return t}if(e.extensionASTNodes)for(const t of e.extensionASTNodes){const e=d(t.directives);if(e)return e}return{}}(e);return t.set(e,a),a}const l=e.defaultMaxAge??0,h=e.calculateHttpHeaders??!0,{__testing__cacheHints:f}=e;return{async executionDidStart(){if(p(i.overallCachePolicy)){const e=(0,c.b)();return{willResolveField({info:t}){t.cacheControl={setCacheHint:t=>{e.replace(t)},cacheHint:e,cacheHintFromType:o}}}}return{willResolveField({info:e}){const t=(0,c.b)();let s=!1;const u=(0,a.xC)(e.returnType);if((0,a.Gv)(u)){const e=o(u);t.replace(e),s=!!e.inheritMaxAge}const h=function(e){const t=n.get(e);if(t)return t;const a=function(e){if(e.astNode){const t=d(e.astNode.directives);if(t)return t}return{}}(e);return n.set(e,a),a}(e.parentType.getFields()[e.fieldName]);return h.inheritMaxAge&&void 0===t.maxAge?(s=!0,h.scope&&t.replace({scope:h.scope})):t.replace(h),e.cacheControl={setCacheHint:e=>{t.replace(e)},cacheHint:t,cacheHintFromType:o},()=>{if(void 0!==t.maxAge||(!(0,a.Gv)(u)||s)&&e.path.prev||t.restrict({maxAge:l}),f&&p(t)){const n=(0,r.N)(e.path).join(".");if(f.has(n))throw Error("shouldn't happen: addHint should only be called once per path");f.set(n,{maxAge:t.maxAge,scope:t.scope})}i.overallCachePolicy.restrict(t)}}}},async willSendResponse(e){if(!h)return;const{response:t,overallCachePolicy:n}=e,a=function(e){if(!e)return{kind:"no-header"};if(e===u)return{kind:"uncacheable"};const t=s.exec(e);return t?{kind:"parsable-and-cacheable",hint:{maxAge:+t[1],scope:"public"===t[2]?"PUBLIC":"PRIVATE"}}:{kind:"unparsable"}}(t.http.headers.get("cache-control"));if("unparsable"===a.kind)return;const r=(0,c.b)();r.replace(n),"parsable-and-cacheable"===a.kind&&r.restrict(a.hint);const i=r.policyIfCacheable();i&&"uncacheable"!==a.kind&&"single"===t.body.kind&&!t.body.singleResult.errors?t.http.headers.set("cache-control",`max-age=${i.maxAge}, ${i.scope.toLowerCase()}`):"if-cacheable"!==h&&t.http.headers.set("cache-control",u)}}}})}const s=/^max-age=(\d+), (public|private)$/,u="no-store";function d(e){if(!e)return;const t=e.find((e=>"cacheControl"===e.name.value));if(!t)return;if(!t.arguments)return;const n=t.arguments.find((e=>"maxAge"===e.name.value)),a=t.arguments.find((e=>"scope"===e.name.value)),r=t.arguments.find((e=>"inheritMaxAge"===e.name.value)),c="EnumValue"===a?.value?.kind?a.value.value:void 0,i="PUBLIC"===c||"PRIVATE"===c?c:void 0;return"BooleanValue"===r?.value?.kind&&r.value.value?{inheritMaxAge:!0,scope:i}:{maxAge:"IntValue"===n?.value?.kind?parseInt(n.value.value):void 0,scope:i}}function p(e){return void 0!==e.maxAge||void 0!==e.scope}}};