(()=>{(function(){[Element,Document,Window].forEach(e=>{e.prototype._addEventListener=e.prototype.addEventListener,e.prototype._removeEventListener=e.prototype.removeEventListener,e.prototype.addEventListener=e.prototype.on=function(t,o,s){this.__listeners__=this.__listeners__||{},this.__listeners__[t]=this.__listeners__[t]||[];for(let[i,r]of this.__listeners__[t])if(i===o&&JSON.stringify(r)===JSON.stringify(s))return this;return this.__listeners__[t].push([o,s]),this._addEventListener(t,o,s),this},e.prototype.removeEventListener=e.prototype.off=function(t,o,s){return!this.__listeners__||!this.__listeners__[t]?this:o?(this._removeEventListener(t,o,s),this.__listeners__[t]=this.__listeners__[t].filter(([i,r])=>i!==o||JSON.stringify(r)!==JSON.stringify(s)),this.__listeners__[t].length===0&&delete this.__listeners__[t],this):(this.__listeners__[t].forEach(([i,r])=>{this.removeEventListener(t,i,r)}),delete this.__listeners__[t],this)}}),window._$=e=>document.querySelector(e),window._$$=e=>document.querySelectorAll(e);let n=window.localStorage.getItem("dark_mode"),d=e=>{e?document.documentElement.setAttribute("data-theme","dark"):document.documentElement.removeAttribute("data-theme");let t=`<a id="nav-${e?"sun":"moon"}-btn" class="nav-icon dark-mode-btn"></a>`;_$("#sub-nav")?.insertAdjacentHTML("beforeend",t),document.body.dispatchEvent(new CustomEvent(e?"dark-theme-set":"light-theme-set"))};n===null&&(n=document.documentElement.getAttribute("data-theme")==="dark"?"true":"false",window.localStorage.setItem("dark_mode",n)),d(n==="true"),_$(".dark-mode-btn")?.addEventListener("click",function(){this.id=="nav-sun-btn"?(window.localStorage.setItem("dark_mode","false"),document.body.dispatchEvent(new CustomEvent("light-theme-set")),document.documentElement.removeAttribute("data-theme"),this.id="nav-moon-btn"):(window.localStorage.setItem("dark_mode","true"),document.body.dispatchEvent(new CustomEvent("dark-theme-set")),document.documentElement.setAttribute("data-theme","dark"),this.id="nav-sun-btn")});let a=0;document.addEventListener("scroll",()=>{let e=document.documentElement.scrollTop||document.body.scrollTop,t=e-a;window.diffY=t,a=e,t<0?_$("#header-nav")?.classList.remove("header-nav-hidden"):_$("#header-nav")?.classList.add("header-nav-hidden")}),window.Pace&&Pace.on("done",()=>{Pace.sources[0].elements=[]})})();window.safeImport=async(n,d)=>{if(!d)return import(n);let e=await(await fetch(n)).text(),t=await crypto.subtle.digest("SHA-384",new TextEncoder().encode(e));if("sha384-"+btoa(String.fromCharCode(...new Uint8Array(t)))!==d)throw new Error(`Integrity check failed for ${n}`);let s=new Blob([e],{type:"application/javascript"}),i=URL.createObjectURL(s),r=await import(i);return URL.revokeObjectURL(i),r};})();
