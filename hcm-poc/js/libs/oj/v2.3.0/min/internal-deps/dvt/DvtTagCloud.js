/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
"use strict";
define(['./DvtToolkit'], function(dvt) {
  // Internal use only.  All APIs and functionality are subject to change at any time.

var p;function aa(a,b){0==a.indexOf("dvt.")&&(a=a.substring(4));var c=a.split("."),d=eval("dvt");c[0]in d||!d.execScript||d.execScript("var "+c[0]);for(var e;c.length&&(e=c.shift());)c.length||void 0===b?d=d[e]?d[e]:d[e]={}:d[e]=b}Math.floor(2147483648*Math.random()).toString(36);
(function(a){function b(a){this.Init(a)}function c(a,b,c,d){this.Init(b,c,d);this.ha=a}function d(){}function e(){this.Init({alta:e.oh})}function f(a,b,c){this.Init(a,b,c)}function h(a,b,c,d,e,f,h,k,l){this.Init(a,b,c,d,e,f,h,k,l)}function k(a){this.ZE=a}a.ci=function(a,b,c){this.Init(a,b,c)};a.v.F(a.ci,a.Oe);a.ci.newInstance=function(b,c,d){return new a.ci(b,c,d)};a.ci.prototype.Init=function(d,f,h){a.ci.C.Init.call(this,d,f,h);this.u().Ee.Qa().setAttributeNS(null,"text-rendering","geometricPrecision");
this.I=new c(this,d,this.cg,this);this.I.Nf(this);a.B.Wa()||this.I.ms(new b(this.I));this.$g=new e;this.fc=[];this.rw=[];this.wk=null;this.dk=new a.nf(this.u());this.I.IS(this.dk)};a.ci.prototype.ta=function(b,c,d){isNaN(c)||isNaN(d)||(this.wb=c,this.Nb=d);this.I_();this.Df(b);this.Gq();this.Oj=this.Fa;this.d2=this.fc;this.fc=[];this.JMa=[];this.Fa=new a.la(this.u());this.A(this.Fa);l.ta(this,this.Fa,new a.Z(0,0,this.wb,this.Nb));this.Tc&&this.Tc.Gt(this.W.selection,this.Ow());c=this.W.animationDuration;
d=new a.Z(0,0,this.wb,this.Nb);this.Oj?"none"!==this.W.animationOnDataChange&&b&&(this.gi=new a.la(this.u()),this.A(this.gi),b=new a.Bq(this.u(),this.gi),b.No(this.d2,this.fc),this.Yb=b.Iw()):"none"!==this.W.animationOnDisplay&&(this.Yb=a.qc.sF(this.u(),a.qc.oD,this.Fa,d,c));this.Yb?(this.I.we(),this.I.Wj(this),this.Yb.rg(this.IDa,this),this.Yb.play()):this.IDa();this.ur()};a.ci.prototype.tya=function(a){this.fc=a};a.ci.prototype.sh=function(){this.Qd||(this.Qd=new k(this));return this.Qd};a.ci.prototype.vN=
function(a,b){this.rw.push(a);this.JMa[b]=a};a.ci.prototype.Ow=function(){return this.rw};a.ci.prototype.sl=function(){return this.JMa};a.ci.prototype.df=function(b){this.W.highlightedCategories=a.bc.clone(b);a.zh.df(b,this.Ow(),"any"===this.W.highlightMatch);this.wk&&this.wk.df(b)};a.ci.prototype.select=function(b){this.W.selection=a.bc.clone(b);this.Tc&&this.Tc.Gt(this.W.selection,this.Ow())};a.ci.prototype.Df=function(b){b?this.W=this.$g.un(b):this.W||(this.W=this.kG());b=this.W.selectionMode;
this.Tc="single"===b?new a.Tc(a.Tc.nz):"multiple"===b?new a.Tc(a.Tc.mz):null;this.I.VA(this.Tc);a.B.vk()||(this.W.animationOnDisplay="none",this.W.animationOnDataChange="none")};a.ci.prototype.mm=function(){return a.H.Ze(this.D(),"componentName",a.H.Ha,"TAG_CLOUD")};a.ci.prototype.IDa=function(){this.Oj&&(this.removeChild(this.Oj),this.Oj.ya(),this.Oj=null);this.gi&&(this.removeChild(this.gi),this.gi.ya(),this.gi=null);this.Yb&&this.I.Nf(this);this.W.highlightedCategories&&0<this.W.highlightedCategories.length&&
this.df(this.W.highlightedCategories);this.jm||this.Eq();this.Yb=null;this.jm=!1};a.ci.prototype.I_=function(){this.I.we();this.rw.length=0};a.ci.prototype.cg=function(b,c){var d=b.type;if("categoryHide"==d||"categoryShow"==d){var e=b.category,f=a.na.kb(this.W.hiddenCategories,e);"categoryHide"==d&&0>f&&this.W.hiddenCategories.push(e);"categoryShow"==d&&0<=f&&this.W.hiddenCategories.splice(f,1);this.ta(this.W,this.wb,this.Nb)}else"categoryHighlight"==d&&(this!=c?this.df(b.categories):this.wk&&this.wk!=
c&&this.wk.cg(b,c));b&&this.dispatchEvent(b)};a.ci.prototype.Kpb=function(a){return this.Tc?a[0]:null};a.ci.prototype.Kmb=function(a){a.xb()||(this.Tc.wq(a,!1),this.I.HI());a=[];for(var b=this.Tc.getSelection(),c=0;c<b.length;c++){var d=b[c];d instanceof f&&a.push(d.getId())}return a};a.ci.prototype.Zr=function(){for(var a=[],b=this.Tc.getSelection(),c=0;c<b.length;c++)a=a.concat(b[c].Te());return a};a.ci.prototype.Ml=function(a,b,c){return this.dk.Ml(c)};a.ci.prototype.am=function(a,b){return this.dk.am(a,
b)};a.ci.prototype.tA=function(a,b){return this.dk.tA(a,b)};a.ci.prototype.KC=function(a,b){return this.dk.KC(a,b)};a.v.F(k,a.Qd);k.prototype.Jn=function(a){return(a=this.ZE.I.lb(a))&&a instanceof f?"item["+this.ZE.sl().indexOf(a)+"]":null};k.prototype.th=function(b){if(b==a.Qd.qB)return this.AD(this.ZE);var c=b.indexOf("[");return 0<c&&"item"===b.substring(0,c)&&(b=parseInt(b.substring(c+1,b.length-1)),b=this.ZE.sl()[b])?b.Te()[0].Qa():null};k.prototype.getItem=function(a){if(a=this.ZE.sl()[a]){var b=
{};b.color=a.Tk();b.tooltip=a.Yd();b.label=a.fe();b.value=a.getValue();b.selected=a.xb();return b}return null};k.prototype.QM=function(){return this.ZE.Ow().length};a.v.F(h,a.Ne);h.e6a=.3;h.f6a=.6;h.iha=0;h.l6=1;h.jha=2;h.prototype.Init=function(a,b,c,d,e,f,k,l,n){h.C.Init.call(this,b,c,d,e,f,n);this.ZE=a;this.hF();this.Jf.ea(k);this.Jf.ge(l);f&&this.nJa(f)};h.prototype.mc=function(a){this.Vl!=a&&((this.Vl=a)?this.Wp?this.Db(this.dba):this.Db(this.Xca):this.Db(this.SL))};h.prototype.qd=function(){this.Wp||
(this.Wp=!0,this.Vl?this.Db(this.dba):this.Db(this.Ipa))};h.prototype.Lc=function(){this.Vl?this.Db(this.Xca):this.Db(this.SL);this.Wp=!1};h.prototype.xg=function(b,c){var d=new a.kd(this.u(),this,n.ob(this.ZE)),e=this.Nd(),f=c.Nd(),k=!1,l=f.N(a.j.kc),u=e.N(a.j.kc);if(l!=u){var D=this;this.Db(e.ea(a.j.kc,l));d.ka.O(a.G.pFa,this,function(){return D.Nd().N(a.j.kc)},function(b){D.Db(D.Nd().ea(a.j.kc,b))},u)}f=parseFloat(f.N(a.j.oi));e=parseFloat(e.N(a.j.oi));f!=e&&(k=!0,D=this,this.jh(f),d.ka.O(a.G.V,
this,function(){return parseFloat(D.Nd().N(a.j.oi))},this.jh,e));e=c.Va();f=this.Va();l=c.dr();u=this.dr();if(f!=e||k&&u!=l)u!=l&&(e=h.J8a(c,e,l)),this.Aa(e),d.ka.O(a.G.V,this,this.Va,this.Aa,f);k=c.jb();e=this.jb();e!=k&&(this.fb(k),d.ka.O(a.G.V,this,this.jb,this.fb,e));c.U(0);b.add(d,h.l6)};h.prototype.Uj=function(b){b.add(new a.bj(this.u(),this,n.ob(this.ZE)),h.iha)};h.prototype.Xi=function(b){this.U(0);b.add(new a.lh(this.u(),this,n.ob(this.ZE)),h.jha)};h.prototype.jh=function(a){h.C.jh.call(this,
a);this.nJa(this.Nd())};h.prototype.nJa=function(b){this.SL=b.clone();b=this.SL.N(a.j.kc);this.SL.ea(a.j.Lb,null);this.Ipa=this.SL.clone();var c=h.eNa(b,h.e6a);this.Ipa.ea(a.j.Lb,c);this.Ipa.ea(a.j.kc,a.P.$l(c));this.Xca=this.SL.clone();this.Xca.ea(a.j.Lb,b);this.Xca.ea(a.j.kc,a.P.$l(b));this.dba=this.SL.clone();b=h.eNa(b,h.f6a);this.dba.ea(a.j.Lb,b);this.dba.ea(a.j.kc,a.P.$l(b))};h.J8a=function(b,c,d){b=b.Qob();return d==a.da.Lp?c+b.a:d==a.da.Ql?c-b.a:c};h.eNa=function(b,c){var d=a.P.Wg(b),e=a.P.Tg(b),
f=a.P.Rg(b);return a.P.fJ(Math.floor(255*(1-c)+c*d),Math.floor(255*(1-c)+c*e),Math.floor(255*(1-c)+c*f))};a.v.F(f,a.v);f.prototype.Init=function(b,c,d){this.ha=b;this.kj=c;this.Qb=d;this.fP=this.Vl=!1;d.url?(c.Wf("link"),this.Cqa=a.J.VM("_blank",d.url)):c.Wf("img");this.Ur()};f.prototype.getId=function(){return this.Qb.id};f.prototype.fe=function(){return this.Qb.label};f.prototype.getValue=function(){return this.Qb.value};f.prototype.Yd=function(){return this.Qb.shortDesc};f.prototype.Gh=function(){return this.Qb.action};
f.prototype.Vf=function(){var a=this.ha.D().tooltip;return(a=a?a.renderer:null)?this.ha.u().yf().Mw(a,this.rl()):this.Yd()};f.prototype.rl=function(){return{id:this.getId(),label:this.fe(),color:this.Tk(),value:this.getValue()}};f.prototype.VM=function(){return this.Cqa};f.prototype.Tk=function(){return this.kj.SL.N(a.j.kc)};f.prototype.tj=function(a){this.fP=a};f.prototype.tb=function(){return this.fP};f.prototype.xb=function(){return this.Vl};f.prototype.mc=function(a){this.Vl=a;this.kj.mc(a);this.Ur()};
f.prototype.qd=function(){this.kj.qd()};f.prototype.Lc=function(){this.kj.Lc()};f.prototype.Gd=function(c){var d=this.ha.I.Cb;return c.type==a.MouseEvent.De||d.cv(c)?this:d.Bi(c)?b.Gd(this,c,this.ha.Ow()):null};f.prototype.uf=function(a){return this.kj.aa(a)};f.prototype.cm=function(){return this.kj.Qa()};f.prototype.Pf=function(){this.Yc=!0;this.qd()};f.prototype.Od=function(){this.Yc&&(this.Yc=!1,this.Lc())};f.prototype.Hd=function(){return this.Yc};f.prototype.Te=function(){return[this.kj]};f.prototype.sd=
function(){var b=[];this.tb()&&b.push(a.H.wa(a.H.Ha,this.xb()?"STATE_SELECTED":"STATE_UNSELECTED"));return a.oa.Sk(this.Yd(),b)};f.prototype.ee=function(){return this.Qb.categories};f.prototype.Ur=function(){a.B.sj()||this.kj.Id("label",this.sd())};f.prototype.Gf=function(){if(!this.kf&&(this.kf=[],this.Qb.showPopupBehaviors))for(var b=this.Qb.showPopupBehaviors,c=0;c<b.length;c++)this.kf.push(new a.Xc(b[c].popupId,b[c].triggerType,b[c].alignId,b[c].align));return this.kf};f.prototype.Ml=function(a){return this.ha.Kpb(a)};
f.prototype.am=function(){return this.ha.Kmb(this)};f.prototype.Zr=function(){return this.ha.Zr()};a.v.F(e,a.eb);e.oh={animationOnDisplay:"none",animationOnDataChange:"none",emptyText:null,hiddenCategories:[],hideAndShowBehavior:"none",highlightedCategories:[],highlightMatch:"all",hoverBehavior:"none",layout:"rectangular",selectionMode:"none",_statusMessageStyle:new a.j(a.eb.an+"color: #333333;"),styleDefaults:{animationDuration:500,hoverBehaviorDelay:200,_style:new a.j(a.eb.an+"color: #333333;")},
touchResponse:"auto"};var l={};a.v.F(l,a.v);l.ta=function(a,b,c){l.Tr(a,b,c);l.gM(a,b,c);l.YD(c);var d=a.D();d.items&&0<d.items.length?(d=l.fsa(a,b,c),0<d.length?(a.tya(d),a.I.hv(a.Ow()[0])):l.hI(a,b,c)):l.hI(a,b,c)};l.hI=function(b,c,d){var e=b.D(),f=e.emptyText;f||(f=a.H.Ze(e,"labelNoData",a.H.Ha,"NO_DATA",null));a.Ca.Bp(c,f,new a.Z(d.x,d.y,d.a,d.b),b.I,e._statusMessageStyle)};l.Tr=function(b,c,d){b=new a.Rect(b.u(),d.x,d.y,d.a,d.b);b.Wb();c.A(b)};l.fsa=function(b,c,e){for(var k=b.D(),l=[],v=k.items,
n=Number.MAX_VALUE,u=-Number.MAX_VALUE,D=0;D<v.length;D++)n=Math.min(n,v[D].value),u=Math.max(u,v[D].value);var n=d.anb(n,u),u=a.na.vR(k.hiddenCategories),B=a.j.EVa(),C=k.styleDefaults.style;!C||C instanceof Object||(C=a.j.xR(C));for(D=0;D<v.length;D++){var y=v[D];y.categories||(y.categories=[y.label]);if(!u||!a.na.dY(u,y.categories)){var G=k.styleDefaults._style.clone(),A=y.style;!A||A instanceof Object||(A=a.j.xR(A));var E=A&&A.color?A.color:y.color?y.color:C&&C.color?C.color:null;if(A=a.bc.ae(A,
C)){for(var L=0;L<B.length;L++){var R=a.j.DM(B[L]);A[R]&&(G.ea(B[L],A[R]),delete A[R])}delete A.color}E&&G.ea(a.j.kc,E);G.ea(a.j.oi,n.call(null,y.value).toString());G=new h(b,b.u(),y.label,0,0,G,A,y.className,y.id);A=new f(b,G,y);b.I.nb(G,A);b.vN(A,D);"none"!==k.selectionMode&&A.tj(!0);(A.tb()||y.url||A.Gh())&&G.setCursor("pointer");l.push(G);c.A(G)}}0<l.length&&("cloud"===k.layout?d.mkb(e,l):d.Vrb(e,l,a.B.ba(b.u())));return l};l.gM=function(b,c,d){var e=b.D(),f=e.legend;if(f&&f.sections){f=a.bc.clone(f);
f.orientation="horizontal";f.halign="center";f.hoverBehavior=e.hoverBehavior;f.hideAndShowBehavior=e.hideAndShowBehavior;f.hiddenCategories=e.hiddenCategories;e=a.Cf.newInstance(b.u(),b.cg,b);c.A(e);var h=e.xt(f,d.a,d.b/3);e.ta(f,h.a,h.b);a.pm.position(d,"bottom",e,h.a,h.b,0);b.wk&&(b.wk.ya(),c.removeChild(b.wk));b.wk=e}};l.YD=function(a){a.x=Math.round(a.x);a.y=Math.round(a.y);a.a=Math.round(a.a);a.b=Math.round(a.b)};a.v.F(d,a.v);d.anb=function(a,b){return function(c){return 12+Math.ceil(2*(c-a)/
(b-a)*12)}};d.mkb=function(b,c){var d=[],e=10/180,f=10/180;b.a>b.b?e*=b.a/b.b:f*=b.b/b.a;for(var h=2*Math.PI/180,k=null,l=0,n=[],B=[],C=0;C<c.length;C++)for(var y=!1,G=0,A=4,E=c[C],L=E.aa(),l=Math.max(l,parseFloat(E.Nd().N(a.j.oi))),R=-1;!y;){var O=G%180;void 0===n[O]&&(n[O]=Math.cos(G*h));void 0===B[O]&&(B[O]=Math.sin(G*h));var ja=e*G*n[O],fa=f*G*B[O],da=new a.Z(ja,fa,L.a,L.b),y=!0;-1!=R&&d[R].exa(da)&&(y=!1);if(y)for(O=0;O<C;O++)if(d[O].exa(da)){R=O;y=!1;break}y&&(k=k?k.Fj(da):da,R=-1,d[C]=da,E.Aa(ja),
E.fb(-L.y+fa));3600===G?A=3:5400===G?A=2:10800===G&&(A=1);G+=A}d=Math.max(k.a/b.a,k.b/b.b);e=k.x+k.a/2;k=k.y+k.b/2;for(O=0;O<c.length;O++)E=c[O],E.Aa(b.x+E.Va()/d+(b.a/2-e/d)),E.fb(b.y+E.jb()/d+(b.b/2-k/d)),f=parseFloat(E.Nd().N(a.j.oi)),E.jh(f/d)};d.Vrb=function(b,c,e){for(var f=[],h=0,k=0,l=0,n=0;n<c.length;n++){var D=c[n],B=D.aa(),h=Math.max(h,B.a),k=Math.max(k,B.b),l=Math.max(l,parseFloat(D.Nd().N(a.j.oi)));f.push(new a.dj(B.a,B.b))}n=0;for(D=(b.a-10)/h;.001<D-n;)h=(n+D)/2,l=d.FIa(f,(b.a-10)/
h),l.length*(h*k+2)-2>b.b-10?D=h:n=h;h=n;l=d.FIa(f,(b.a-10)/h);l.push(c.length);for(n=0;n<l.length-1;n++){var B=l[n],C=l[n+1],y=0,G=0,A=!0;if(1<C-B){for(var D=0,E=B;E<C;E++)D+=f[E].a*h,G=Math.max(G,f[E].b*h);y=(b.a-10-D)/(C-B-1);n==l.length-2&&(E=.5*G,E<y&&D+(C-B)*E<.9*(b.a-10)&&(y=E,A=!1))}for(var G=5+(n+1)*(k*h+2)-2,L=e?b.a-5:5,E=B;E<C;E++){var D=c[E],R=parseFloat(D.Nd().N(a.j.oi));D.jh(R*h);D.fb(b.y+G);A&&E==C-1&&E!=B?e?(D.Xh(),D.Aa(b.x+5)):(D.Fh(),D.Aa(b.x+b.a-5)):(D.Aa(b.x+L),e?(D.Fh(),L-=f[E].a*
h+y):(D.Xh(),L+=f[E].a*h+y))}}};d.FIa=function(a,b){var c=[0],d=a[0].a+2;if(1<a.length)for(var e=1;e<a.length;e++)d+a[e].a>b&&(c.push(e),d=0),d+=a[e].a+2;return c};var n={};a.v.F(n,a.v);n.ob=function(a){return a.D().styleDefaults.animationDuration/1E3};a.v.F(c,a.I);c.prototype.MT=function(a){a=this.lb(a.target);this.xpa(a);this.QQ(a)};c.prototype.UZ=function(a){a=this.lb(a.target);this.QQ(a)};c.prototype.nx=function(a){a=this.lb(a.target);this.xpa(a);this.QQ(a)};c.prototype.xpa=function(a){a instanceof
f&&(a=a.VM())&&a.call()};c.prototype.xl=function(b){var d=!0,e=this.tf();b.keyCode==a.KeyboardEvent.ej?this.xpa(e):d=c.C.xl.call(this,b);return d};c.prototype.Dq=function(b,c,d){b=this.ha.D();"dim"==b.hoverBehavior&&(c=c.ee?c.ee():[],b.highlightedCategories=d?c.slice():null,d=a.$a.iJ(b.highlightedCategories,d),c=a.Ua.ds(b.styleDefaults.hoverBehaviorDelay),this.lK.cg(d,this.ha.Ow(),c,"any"==b.highlightMatch))};c.prototype.QQ=function(b){b&&b.Gh&&b.Gh()&&this.wl(a.$a.hJ("action",b.Gh(),b.getId()))};
c.prototype.gB=function(){return this.ha.D().touchResponse};a.v.F(b,a.Cb);b.prototype.Init=function(a){b.C.Init.call(this,a)};b.prototype.KF=function(a){return this.Bi(a)&&!a.ctrlKey};b.prototype.cv=function(b){return b.keyCode==a.KeyboardEvent.ui&&b.ctrlKey};b.Gd=function(b,c,d){c=c.keyCode==a.KeyboardEvent.qf||c.keyCode==a.KeyboardEvent.If?!0:!1;b=a.na.kb(d,b)+(c?1:-1);return b<d.length&&0<=b?d[b]:null};a.v.F(function(){},a.nT);a.Ia(a,"TagCloud",a.ci);a.Ia(a.ci,"newInstance",a.ci.newInstance);a.Ia(a.ci.prototype,
"render",a.ci.prototype.ta);a.Ia(a.ci.prototype,"getAutomation",a.ci.prototype.sh);a.Ia(a.ci.prototype,"highlight",a.ci.prototype.df);a.Ia(a.ci.prototype,"select",a.ci.prototype.select);a.Ia(k.prototype,"getDomElementForSubId",k.prototype.th);a.Ia(k.prototype,"getItem",k.prototype.getItem);a.Ia(k.prototype,"getItemCount",k.prototype.QM)})(dvt);
  return dvt;
});