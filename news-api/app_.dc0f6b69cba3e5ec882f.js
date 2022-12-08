(()=>{"use strict";var e={580:(e,t,r)=>{r.r(t)},529:(e,t,r)=>{r.r(t)},274:(e,t,r)=>{r.r(t)},646:(e,t,r)=>{r.r(t)},717:function(e,t,r){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const s=o(r(842)),n=r(527);t.default=class{constructor(){this.controller=new s.default,this.view=new n.AppView}start(){document.querySelector(".sources").addEventListener("click",(e=>this.controller.getNews(e,(e=>{e&&this.view.drawNews(e)})))),this.controller.getSources((e=>{e&&this.view.drawSources(e)}))}}},853:function(e,t,r){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const s=o(r(24));class n extends s.default{constructor(){super("https://nodenews.up.railway.app/",{apiKey:"f74f146e196247a0901b90a947ac928a"})}}t.default=n},842:function(e,t,r){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const s=o(r(853));class n extends s.default{getSources(e){super.getResp({endpoint:"sources"},e)}getNews(e,t){let r=e.target;const o=e.currentTarget;for(;r!==o;){if(r.classList.contains("source__item")){const e=r.getAttribute("data-source-id");return void(e&&o.getAttribute("data-source")!==e&&(o.setAttribute("data-source",e),super.getResp({endpoint:"everything",options:{sources:e}},t)))}r.parentElement&&(r=r.parentElement)}}}t.default=n},24:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0});const o=r(109);t.default=class{constructor(e,t){this.baseLink=e,this.options=t,this.baseLink=e,this.options=t}getResp({endpoint:e,options:t},r=(()=>{console.error("No callback for GET response")})){this.load("GET",e,r,t)}errorHandler(e){if(!e.ok)throw 401!==e.status&&404!==e.status||console.log(`Sorry, but there is ${e.status} error: ${e.statusText}`),Error(e.statusText);return e}makeUrl(e,t){const r=Object.assign(Object.assign({},this.options),t);let o=`${this.baseLink}${e}?`;return Object.keys(r).forEach((e=>{o+=`${e}=${r[e]}&`})),o.slice(0,-1)}load(e,t,r,s){(0,o.toggleLoader)(),fetch(this.makeUrl(t,s),{method:e}).then(this.errorHandler).then((e=>e.json())).then((e=>r(e))).catch((e=>console.error(e))).finally((()=>(0,o.toggleLoader)()))}}},527:function(e,t,r){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.AppView=void 0;const s=r(868),n=o(r(798)),u=o(r(53));class a{constructor(){this.news=new n.default,this.sources=new u.default}drawNews(e){const t=(null==e?void 0:e.articles)||[];this.news.draw(t)}drawSources(e){const t=(null==e?void 0:e.sources)||[];this.sources.draw(t),(0,s.drawFilteredNews)(t,this.sources)}}t.AppView=a,t.default=a},868:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.drawFilteredNews=void 0,t.drawFilteredNews=(e,t)=>{const r=document.querySelector(".text-field__input");null==r||r.addEventListener("input",(o=>{const s=e.filter((e=>e.name.toLowerCase().includes(r.value.toLowerCase())));t.draw(s)}))}},798:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),r(580),t.default=class{draw(e){const t=e.length>=10?e.filter(((e,t)=>t<10)):e,r=document.createDocumentFragment(),o=document.querySelector("#newsItemTemp");t.forEach(((e,t)=>{var s;const n=o.content.cloneNode(!0);t%2&&(null===(s=n.querySelector(".news__item"))||void 0===s||s.classList.add("alt")),n.querySelector(".news__meta-photo").style.backgroundImage=`url(${e.urlToImage||"img/news_placeholder.jpg"})`,n.querySelector(".news__meta-author").textContent=e.author||e.source.name,n.querySelector(".news__meta-date").textContent=e.publishedAt.slice(0,10).split("-").reverse().join("-"),n.querySelector(".news__description-title").textContent=e.title,n.querySelector(".news__description-source").textContent=e.source.name,n.querySelector(".news__description-content").textContent=e.description,n.querySelector(".news__read-more a").setAttribute("href",e.url),r.append(n)})),document.querySelector(".news").innerHTML="",document.querySelector(".news").appendChild(r)}}},53:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),r(529),t.default=class{draw(e){const t=document.createDocumentFragment(),r=document.querySelector("#sourceItemTemp");e.forEach((e=>{const o=r.content.cloneNode(!0);o.querySelector(".source__item-name").textContent=e.name,o.querySelector(".source__item").setAttribute("data-source-id",e.id),t.append(o)}));const o=document.querySelector(".sources");if(o.innerHTML="",e.length)o.style.display="grid",o.append(t);else{const e=document.createElement("span");e.className="emptyNews",e.textContent="Please, make another request!",o.style.display="flex",o.append(e)}}}},109:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.toggleLoader=void 0,t.toggleLoader=()=>document.querySelector(".shadow").classList.toggle("loading")},607:function(e,t,r){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const s=o(r(717));r(274),r(646),(new s.default).start()}},t={};function r(o){var s=t[o];if(void 0!==s)return s.exports;var n=t[o]={exports:{}};return e[o].call(n.exports,n,n.exports,r),n.exports}r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r(607)})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QVVqQixZQUFjLGdDQUN4QmUsRUFBZ0JsQixNQUFNbUIsUUFBVSxPQUNoQ0QsRUFBZ0JOLE9BQU9RLEVBQzNCLENBS0osRSxjQ3pCSnBILE9BQU9DLGVBQWVDLEVBQVMsYUFBYyxDQUFFQyxPQUFPLElBQ3RERCxFQUFRNEQsa0JBQWUsRUFFdkI1RCxFQUFRNEQsYUFEYSxJQUFNbEQsU0FBU0MsY0FBYyxXQUFXb0IsVUFBVXNGLE9BQU8sVSxzQkNGOUUsSUFBSTNILEVBQW1CQyxNQUFRQSxLQUFLRCxpQkFBb0IsU0FBVUUsR0FDOUQsT0FBUUEsR0FBT0EsRUFBSUMsV0FBY0QsRUFBTSxDQUFFLFFBQVdBLEVBQ3hELEVBQ0FFLE9BQU9DLGVBQWVDLEVBQVMsYUFBYyxDQUFFQyxPQUFPLElBQ3RELE1BQU1xSCxFQUFRNUgsRUFBZ0IsRUFBUSxNQUN0QyxFQUFRLEtBQ1IsRUFBUSxNQUNJLElBQUk0SCxFQUFNaEgsU0FDbEJHLE8sR0NSQThHLEVBQTJCLENBQUMsRUFHaEMsU0FBU0MsRUFBb0JDLEdBRTVCLElBQUlDLEVBQWVILEVBQXlCRSxHQUM1QyxRQUFxQkUsSUFBakJELEVBQ0gsT0FBT0EsRUFBYTFILFFBR3JCLElBQUk0SCxFQUFTTCxFQUF5QkUsR0FBWSxDQUdqRHpILFFBQVMsQ0FBQyxHQU9YLE9BSEE2SCxFQUFvQkosR0FBVUssS0FBS0YsRUFBTzVILFFBQVM0SCxFQUFRQSxFQUFPNUgsUUFBU3dILEdBR3BFSSxFQUFPNUgsT0FDZixDQ3JCQXdILEVBQW9CTyxFQUFLL0gsSUFDSCxvQkFBWGdJLFFBQTBCQSxPQUFPQyxhQUMxQ25JLE9BQU9DLGVBQWVDLEVBQVNnSSxPQUFPQyxZQUFhLENBQUVoSSxNQUFPLFdBRTdESCxPQUFPQyxlQUFlQyxFQUFTLGFBQWMsQ0FBRUMsT0FBTyxHQUFPLEVDRnBDdUgsRUFBb0IsSSIsInNvdXJjZXMiOlsid2VicGFjazovL25ld3MtanMvLi9zcmMvY29tcG9uZW50cy9hcHAvYXBwLnRzIiwid2VicGFjazovL25ld3MtanMvLi9zcmMvY29tcG9uZW50cy9jb250cm9sbGVyL2FwcExvYWRlci50cyIsIndlYnBhY2s6Ly9uZXdzLWpzLy4vc3JjL2NvbXBvbmVudHMvY29udHJvbGxlci9jb250cm9sbGVyLnRzIiwid2VicGFjazovL25ld3MtanMvLi9zcmMvY29tcG9uZW50cy9jb250cm9sbGVyL2xvYWRlci50cyIsIndlYnBhY2s6Ly9uZXdzLWpzLy4vc3JjL2NvbXBvbmVudHMvdmlldy9hcHBWaWV3LnRzIiwid2VicGFjazovL25ld3MtanMvLi9zcmMvY29tcG9uZW50cy92aWV3L2RyYXdGaWx0ZXJlZE5ld3MudHMiLCJ3ZWJwYWNrOi8vbmV3cy1qcy8uL3NyYy9jb21wb25lbnRzL3ZpZXcvbmV3cy9uZXdzLnRzIiwid2VicGFjazovL25ld3MtanMvLi9zcmMvY29tcG9uZW50cy92aWV3L3NvdXJjZXMvc291cmNlcy50cyIsIndlYnBhY2s6Ly9uZXdzLWpzLy4vc3JjL2NvbXBvbmVudHMvdmlldy90b2dnbGVMb2FkZXIudHMiLCJ3ZWJwYWNrOi8vbmV3cy1qcy8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly9uZXdzLWpzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL25ld3MtanMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9uZXdzLWpzL3dlYnBhY2svc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCBjb250cm9sbGVyXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4uL2NvbnRyb2xsZXIvY29udHJvbGxlclwiKSk7XHJcbmNvbnN0IGFwcFZpZXdfMSA9IHJlcXVpcmUoXCIuLi92aWV3L2FwcFZpZXdcIik7XHJcbmNsYXNzIEFwcCB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBuZXcgY29udHJvbGxlcl8xLmRlZmF1bHQoKTtcclxuICAgICAgICB0aGlzLnZpZXcgPSBuZXcgYXBwVmlld18xLkFwcFZpZXcoKTtcclxuICAgIH1cclxuICAgIHN0YXJ0KCkge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zb3VyY2VzJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4gdGhpcy5jb250cm9sbGVyLmdldE5ld3MoZSwgKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudmlldy5kcmF3TmV3cyhkYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pKTtcclxuICAgICAgICB0aGlzLmNvbnRyb2xsZXIuZ2V0U291cmNlcygoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy52aWV3LmRyYXdTb3VyY2VzKGRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5kZWZhdWx0ID0gQXBwO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCBsb2FkZXJfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9sb2FkZXJcIikpO1xyXG5jbGFzcyBBcHBMb2FkZXIgZXh0ZW5kcyBsb2FkZXJfMS5kZWZhdWx0IHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCdodHRwczovL25vZGVuZXdzLnVwLnJhaWx3YXkuYXBwLycsIHtcclxuICAgICAgICAgICAgYXBpS2V5OiAnZjc0ZjE0NmUxOTYyNDdhMDkwMWI5MGE5NDdhYzkyOGEnLCAvLyDQv9C+0LvRg9GH0LjRgtC1INGB0LLQvtC5INC60LvRjtGHIGh0dHBzOi8vbmV3c2FwaS5vcmcvXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5kZWZhdWx0ID0gQXBwTG9hZGVyO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCBhcHBMb2FkZXJfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9hcHBMb2FkZXJcIikpO1xyXG5jbGFzcyBBcHBDb250cm9sbGVyIGV4dGVuZHMgYXBwTG9hZGVyXzEuZGVmYXVsdCB7XHJcbiAgICBnZXRTb3VyY2VzKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgc3VwZXIuZ2V0UmVzcCh7IGVuZHBvaW50OiAnc291cmNlcycgfSwgY2FsbGJhY2spO1xyXG4gICAgfVxyXG4gICAgZ2V0TmV3cyhlLCBjYWxsYmFjaykge1xyXG4gICAgICAgIGxldCB0YXJnZXQgPSBlLnRhcmdldDtcclxuICAgICAgICBjb25zdCBuZXdzQ29udGFpbmVyID0gZS5jdXJyZW50VGFyZ2V0O1xyXG4gICAgICAgIHdoaWxlICh0YXJnZXQgIT09IG5ld3NDb250YWluZXIpIHtcclxuICAgICAgICAgICAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3NvdXJjZV9faXRlbScpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzb3VyY2VJZCA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtc291cmNlLWlkJyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoc291cmNlSWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobmV3c0NvbnRhaW5lci5nZXRBdHRyaWJ1dGUoJ2RhdGEtc291cmNlJykgIT09IHNvdXJjZUlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld3NDb250YWluZXIuc2V0QXR0cmlidXRlKCdkYXRhLXNvdXJjZScsIHNvdXJjZUlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VwZXIuZ2V0UmVzcCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmRwb2ludDogJ2V2ZXJ5dGhpbmcnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZXM6IHNvdXJjZUlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgY2FsbGJhY2spO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGFyZ2V0LnBhcmVudEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIHRhcmdldCA9ICh0YXJnZXQucGFyZW50RWxlbWVudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5kZWZhdWx0ID0gQXBwQ29udHJvbGxlcjtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY29uc3QgdG9nZ2xlTG9hZGVyXzEgPSByZXF1aXJlKFwiLi4vdmlldy90b2dnbGVMb2FkZXJcIik7XHJcbmNsYXNzIExvYWRlciB7XHJcbiAgICBjb25zdHJ1Y3RvcihiYXNlTGluaywgb3B0aW9ucykge1xyXG4gICAgICAgIHRoaXMuYmFzZUxpbmsgPSBiYXNlTGluaztcclxuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xyXG4gICAgICAgIHRoaXMuYmFzZUxpbmsgPSBiYXNlTGluaztcclxuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xyXG4gICAgfVxyXG4gICAgZ2V0UmVzcCh7IGVuZHBvaW50LCBvcHRpb25zIH0sIGNhbGxiYWNrID0gKCkgPT4geyBjb25zb2xlLmVycm9yKCdObyBjYWxsYmFjayBmb3IgR0VUIHJlc3BvbnNlJyk7IH0pIHtcclxuICAgICAgICB0aGlzLmxvYWQoJ0dFVCcsIGVuZHBvaW50LCBjYWxsYmFjaywgb3B0aW9ucyk7XHJcbiAgICB9XHJcbiAgICBlcnJvckhhbmRsZXIocmVzKSB7XHJcbiAgICAgICAgaWYgKCFyZXMub2spIHtcclxuICAgICAgICAgICAgaWYgKHJlcy5zdGF0dXMgPT09IDQwMSB8fCByZXMuc3RhdHVzID09PSA0MDQpXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgU29ycnksIGJ1dCB0aGVyZSBpcyAke3Jlcy5zdGF0dXN9IGVycm9yOiAke3Jlcy5zdGF0dXNUZXh0fWApO1xyXG4gICAgICAgICAgICB0aHJvdyBFcnJvcihyZXMuc3RhdHVzVGV4dCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXM7XHJcbiAgICB9XHJcbiAgICBtYWtlVXJsKGVuZHBvaW50LCBvcHRpb25zKSB7XHJcbiAgICAgICAgY29uc3QgdXJsT3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5vcHRpb25zKSwgb3B0aW9ucyk7XHJcbiAgICAgICAgbGV0IHVybCA9IGAke3RoaXMuYmFzZUxpbmt9JHtlbmRwb2ludH0/YDtcclxuICAgICAgICBPYmplY3Qua2V5cyh1cmxPcHRpb25zKS5mb3JFYWNoKChrZXkpID0+IHtcclxuICAgICAgICAgICAgdXJsICs9IGAke2tleX09JHt1cmxPcHRpb25zW2tleV19JmA7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHVybC5zbGljZSgwLCAtMSk7XHJcbiAgICB9XHJcbiAgICBsb2FkKG1ldGhvZCwgZW5kcG9pbnQsIGNhbGxiYWNrLCBvcHRpb25zKSB7XHJcbiAgICAgICAgKDAsIHRvZ2dsZUxvYWRlcl8xLnRvZ2dsZUxvYWRlcikoKTtcclxuICAgICAgICBmZXRjaCh0aGlzLm1ha2VVcmwoZW5kcG9pbnQsIG9wdGlvbnMpLCB7IG1ldGhvZCB9KVxyXG4gICAgICAgICAgICAudGhlbih0aGlzLmVycm9ySGFuZGxlcilcclxuICAgICAgICAgICAgLnRoZW4oKHJlcykgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+IGNhbGxiYWNrKGRhdGEpKVxyXG4gICAgICAgICAgICAuY2F0Y2goKGVycikgPT4gY29uc29sZS5lcnJvcihlcnIpKVxyXG4gICAgICAgICAgICAuZmluYWxseSgoKSA9PiAoMCwgdG9nZ2xlTG9hZGVyXzEudG9nZ2xlTG9hZGVyKSgpKTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLmRlZmF1bHQgPSBMb2FkZXI7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuQXBwVmlldyA9IHZvaWQgMDtcclxuY29uc3QgZHJhd0ZpbHRlcmVkTmV3c18xID0gcmVxdWlyZShcIi4vZHJhd0ZpbHRlcmVkTmV3c1wiKTtcclxuY29uc3QgbmV3c18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL25ld3MvbmV3c1wiKSk7XHJcbmNvbnN0IHNvdXJjZXNfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9zb3VyY2VzL3NvdXJjZXNcIikpO1xyXG5jbGFzcyBBcHBWaWV3IHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMubmV3cyA9IG5ldyBuZXdzXzEuZGVmYXVsdCgpO1xyXG4gICAgICAgIHRoaXMuc291cmNlcyA9IG5ldyBzb3VyY2VzXzEuZGVmYXVsdCgpO1xyXG4gICAgfVxyXG4gICAgZHJhd05ld3MoZGF0YSkge1xyXG4gICAgICAgIGNvbnN0IHZhbHVlcyA9IChkYXRhID09PSBudWxsIHx8IGRhdGEgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGRhdGEuYXJ0aWNsZXMpIHx8IFtdO1xyXG4gICAgICAgIHRoaXMubmV3cy5kcmF3KHZhbHVlcyk7XHJcbiAgICB9XHJcbiAgICBkcmF3U291cmNlcyhkYXRhKSB7XHJcbiAgICAgICAgY29uc3QgdmFsdWVzID0gKGRhdGEgPT09IG51bGwgfHwgZGF0YSA9PT0gdm9pZCAwID8gdm9pZCAwIDogZGF0YS5zb3VyY2VzKSB8fCBbXTtcclxuICAgICAgICB0aGlzLnNvdXJjZXMuZHJhdyh2YWx1ZXMpO1xyXG4gICAgICAgICgwLCBkcmF3RmlsdGVyZWROZXdzXzEuZHJhd0ZpbHRlcmVkTmV3cykodmFsdWVzLCB0aGlzLnNvdXJjZXMpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuQXBwVmlldyA9IEFwcFZpZXc7XHJcbmV4cG9ydHMuZGVmYXVsdCA9IEFwcFZpZXc7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuZHJhd0ZpbHRlcmVkTmV3cyA9IHZvaWQgMDtcclxuY29uc3QgZHJhd0ZpbHRlcmVkTmV3cyA9IChkYXRhLCBzb3VyY2VzKSA9PiB7XHJcbiAgICBjb25zdCBzZWFyY2ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGV4dC1maWVsZF9faW5wdXQnKTtcclxuICAgIHNlYXJjaCA9PT0gbnVsbCB8fCBzZWFyY2ggPT09IHZvaWQgMCA/IHZvaWQgMCA6IHNlYXJjaC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIChlKSA9PiB7XHJcbiAgICAgICAgY29uc3QgZmlsdGVyZWREYXRhID0gZGF0YS5maWx0ZXIoZWwgPT4gZWwubmFtZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHNlYXJjaC52YWx1ZS50b0xvd2VyQ2FzZSgpKSk7XHJcbiAgICAgICAgc291cmNlcy5kcmF3KGZpbHRlcmVkRGF0YSk7XHJcbiAgICB9KTtcclxufTtcclxuZXhwb3J0cy5kcmF3RmlsdGVyZWROZXdzID0gZHJhd0ZpbHRlcmVkTmV3cztcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxucmVxdWlyZShcIi4vbmV3cy5jc3NcIik7XHJcbmNsYXNzIE5ld3Mge1xyXG4gICAgZHJhdyhkYXRhKSB7XHJcbiAgICAgICAgY29uc3QgbmV3cyA9IGRhdGEubGVuZ3RoID49IDEwID8gZGF0YS5maWx0ZXIoKF9pdGVtLCBpZHgpID0+IGlkeCA8IDEwKSA6IGRhdGE7XHJcbiAgICAgICAgY29uc3QgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcbiAgICAgICAgY29uc3QgbmV3c0l0ZW1UZW1wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25ld3NJdGVtVGVtcCcpO1xyXG4gICAgICAgIG5ld3MuZm9yRWFjaCgoaXRlbSwgaWR4KSA9PiB7XHJcbiAgICAgICAgICAgIHZhciBfYTtcclxuICAgICAgICAgICAgY29uc3QgbmV3c0Nsb25lID0gbmV3c0l0ZW1UZW1wLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpO1xyXG4gICAgICAgICAgICBpZiAoaWR4ICUgMilcclxuICAgICAgICAgICAgICAgIChfYSA9IG5ld3NDbG9uZS5xdWVyeVNlbGVjdG9yKCcubmV3c19faXRlbScpKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY2xhc3NMaXN0LmFkZCgnYWx0Jyk7XHJcbiAgICAgICAgICAgIG5ld3NDbG9uZS5xdWVyeVNlbGVjdG9yKCcubmV3c19fbWV0YS1waG90bycpLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoJHtpdGVtLnVybFRvSW1hZ2UgfHwgJ2ltZy9uZXdzX3BsYWNlaG9sZGVyLmpwZyd9KWA7XHJcbiAgICAgICAgICAgIG5ld3NDbG9uZS5xdWVyeVNlbGVjdG9yKCcubmV3c19fbWV0YS1hdXRob3InKS50ZXh0Q29udGVudCA9IGl0ZW0uYXV0aG9yIHx8IGl0ZW0uc291cmNlLm5hbWU7XHJcbiAgICAgICAgICAgIG5ld3NDbG9uZS5xdWVyeVNlbGVjdG9yKCcubmV3c19fbWV0YS1kYXRlJykudGV4dENvbnRlbnQgPSBpdGVtLnB1Ymxpc2hlZEF0XHJcbiAgICAgICAgICAgICAgICAuc2xpY2UoMCwgMTApXHJcbiAgICAgICAgICAgICAgICAuc3BsaXQoJy0nKVxyXG4gICAgICAgICAgICAgICAgLnJldmVyc2UoKVxyXG4gICAgICAgICAgICAgICAgLmpvaW4oJy0nKTtcclxuICAgICAgICAgICAgbmV3c0Nsb25lLnF1ZXJ5U2VsZWN0b3IoJy5uZXdzX19kZXNjcmlwdGlvbi10aXRsZScpLnRleHRDb250ZW50ID0gaXRlbS50aXRsZTtcclxuICAgICAgICAgICAgbmV3c0Nsb25lLnF1ZXJ5U2VsZWN0b3IoJy5uZXdzX19kZXNjcmlwdGlvbi1zb3VyY2UnKS50ZXh0Q29udGVudCA9IGl0ZW0uc291cmNlLm5hbWU7XHJcbiAgICAgICAgICAgIG5ld3NDbG9uZS5xdWVyeVNlbGVjdG9yKCcubmV3c19fZGVzY3JpcHRpb24tY29udGVudCcpLnRleHRDb250ZW50ID0gaXRlbS5kZXNjcmlwdGlvbjtcclxuICAgICAgICAgICAgbmV3c0Nsb25lLnF1ZXJ5U2VsZWN0b3IoJy5uZXdzX19yZWFkLW1vcmUgYScpLnNldEF0dHJpYnV0ZSgnaHJlZicsIGl0ZW0udXJsKTtcclxuICAgICAgICAgICAgZnJhZ21lbnQuYXBwZW5kKG5ld3NDbG9uZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5ld3MnKS5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmV3cycpLmFwcGVuZENoaWxkKGZyYWdtZW50KTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLmRlZmF1bHQgPSBOZXdzO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5yZXF1aXJlKFwiLi9zb3VyY2VzLmNzc1wiKTtcclxuY2xhc3MgU291cmNlcyB7XHJcbiAgICBkcmF3KGRhdGEpIHtcclxuICAgICAgICBjb25zdCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuICAgICAgICBjb25zdCBzb3VyY2VJdGVtVGVtcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzb3VyY2VJdGVtVGVtcCcpO1xyXG4gICAgICAgIGRhdGEuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBzb3VyY2VDbG9uZSA9IHNvdXJjZUl0ZW1UZW1wLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpO1xyXG4gICAgICAgICAgICBzb3VyY2VDbG9uZS5xdWVyeVNlbGVjdG9yKCcuc291cmNlX19pdGVtLW5hbWUnKS50ZXh0Q29udGVudCA9IGl0ZW0ubmFtZTtcclxuICAgICAgICAgICAgc291cmNlQ2xvbmUucXVlcnlTZWxlY3RvcignLnNvdXJjZV9faXRlbScpLnNldEF0dHJpYnV0ZSgnZGF0YS1zb3VyY2UtaWQnLCBpdGVtLmlkKTtcclxuICAgICAgICAgICAgZnJhZ21lbnQuYXBwZW5kKHNvdXJjZUNsb25lKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBjb25zdCBzb3VyY2VDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc291cmNlcycpO1xyXG4gICAgICAgIHNvdXJjZUNvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICBpZiAoIWRhdGEubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVtcHR5TmV3cyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgICAgICAgZW1wdHlOZXdzLmNsYXNzTmFtZSA9ICdlbXB0eU5ld3MnO1xyXG4gICAgICAgICAgICBlbXB0eU5ld3MudGV4dENvbnRlbnQgPSAnUGxlYXNlLCBtYWtlIGFub3RoZXIgcmVxdWVzdCEnO1xyXG4gICAgICAgICAgICBzb3VyY2VDb250YWluZXIuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcclxuICAgICAgICAgICAgc291cmNlQ29udGFpbmVyLmFwcGVuZChlbXB0eU5ld3MpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgc291cmNlQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSAnZ3JpZCc7XHJcbiAgICAgICAgICAgIHNvdXJjZUNvbnRhaW5lci5hcHBlbmQoZnJhZ21lbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5leHBvcnRzLmRlZmF1bHQgPSBTb3VyY2VzO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLnRvZ2dsZUxvYWRlciA9IHZvaWQgMDtcclxuY29uc3QgdG9nZ2xlTG9hZGVyID0gKCkgPT4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNoYWRvdycpLmNsYXNzTGlzdC50b2dnbGUoJ2xvYWRpbmcnKTtcclxuZXhwb3J0cy50b2dnbGVMb2FkZXIgPSB0b2dnbGVMb2FkZXI7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNvbnN0IGFwcF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvYXBwL2FwcFwiKSk7XHJcbnJlcXVpcmUoXCIuL2dsb2JhbC5jc3NcIik7XHJcbnJlcXVpcmUoXCIuL3ByZWxvYWRlci5jc3NcIik7XHJcbmNvbnN0IGFwcCA9IG5ldyBhcHBfMS5kZWZhdWx0KCk7XHJcbmFwcC5zdGFydCgpO1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDYwNyk7XG4iXSwibmFtZXMiOlsiX19pbXBvcnREZWZhdWx0IiwidGhpcyIsIm1vZCIsIl9fZXNNb2R1bGUiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImV4cG9ydHMiLCJ2YWx1ZSIsImNvbnRyb2xsZXJfMSIsImFwcFZpZXdfMSIsImNvbnN0cnVjdG9yIiwiY29udHJvbGxlciIsImRlZmF1bHQiLCJ2aWV3IiwiQXBwVmlldyIsInN0YXJ0IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJnZXROZXdzIiwiZGF0YSIsImRyYXdOZXdzIiwiZ2V0U291cmNlcyIsImRyYXdTb3VyY2VzIiwibG9hZGVyXzEiLCJBcHBMb2FkZXIiLCJzdXBlciIsImFwaUtleSIsImFwcExvYWRlcl8xIiwiQXBwQ29udHJvbGxlciIsImNhbGxiYWNrIiwiZ2V0UmVzcCIsImVuZHBvaW50IiwidGFyZ2V0IiwibmV3c0NvbnRhaW5lciIsImN1cnJlbnRUYXJnZXQiLCJjbGFzc0xpc3QiLCJjb250YWlucyIsInNvdXJjZUlkIiwiZ2V0QXR0cmlidXRlIiwic2V0QXR0cmlidXRlIiwib3B0aW9ucyIsInNvdXJjZXMiLCJwYXJlbnRFbGVtZW50IiwidG9nZ2xlTG9hZGVyXzEiLCJiYXNlTGluayIsImNvbnNvbGUiLCJlcnJvciIsImxvYWQiLCJlcnJvckhhbmRsZXIiLCJyZXMiLCJvayIsInN0YXR1cyIsImxvZyIsInN0YXR1c1RleHQiLCJFcnJvciIsIm1ha2VVcmwiLCJ1cmxPcHRpb25zIiwiYXNzaWduIiwidXJsIiwia2V5cyIsImZvckVhY2giLCJrZXkiLCJzbGljZSIsIm1ldGhvZCIsInRvZ2dsZUxvYWRlciIsImZldGNoIiwidGhlbiIsImpzb24iLCJjYXRjaCIsImVyciIsImZpbmFsbHkiLCJkcmF3RmlsdGVyZWROZXdzXzEiLCJuZXdzXzEiLCJzb3VyY2VzXzEiLCJuZXdzIiwidmFsdWVzIiwiYXJ0aWNsZXMiLCJkcmF3IiwiZHJhd0ZpbHRlcmVkTmV3cyIsInNlYXJjaCIsImZpbHRlcmVkRGF0YSIsImZpbHRlciIsImVsIiwibmFtZSIsInRvTG93ZXJDYXNlIiwiaW5jbHVkZXMiLCJsZW5ndGgiLCJfaXRlbSIsImlkeCIsImZyYWdtZW50IiwiY3JlYXRlRG9jdW1lbnRGcmFnbWVudCIsIm5ld3NJdGVtVGVtcCIsIml0ZW0iLCJfYSIsIm5ld3NDbG9uZSIsImNvbnRlbnQiLCJjbG9uZU5vZGUiLCJhZGQiLCJzdHlsZSIsImJhY2tncm91bmRJbWFnZSIsInVybFRvSW1hZ2UiLCJ0ZXh0Q29udGVudCIsImF1dGhvciIsInNvdXJjZSIsInB1Ymxpc2hlZEF0Iiwic3BsaXQiLCJyZXZlcnNlIiwiam9pbiIsInRpdGxlIiwiZGVzY3JpcHRpb24iLCJhcHBlbmQiLCJpbm5lckhUTUwiLCJhcHBlbmRDaGlsZCIsInNvdXJjZUl0ZW1UZW1wIiwic291cmNlQ2xvbmUiLCJpZCIsInNvdXJjZUNvbnRhaW5lciIsImRpc3BsYXkiLCJlbXB0eU5ld3MiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NOYW1lIiwidG9nZ2xlIiwiYXBwXzEiLCJfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18iLCJfX3dlYnBhY2tfcmVxdWlyZV9fIiwibW9kdWxlSWQiLCJjYWNoZWRNb2R1bGUiLCJ1bmRlZmluZWQiLCJtb2R1bGUiLCJfX3dlYnBhY2tfbW9kdWxlc19fIiwiY2FsbCIsInIiLCJTeW1ib2wiLCJ0b1N0cmluZ1RhZyJdLCJzb3VyY2VSb290IjoiIn0=