(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[881],{490:function(e,t,s){(window.__NEXT_P=window.__NEXT_P||[]).push(["/search/[slug]",function(){return s(6553)}])},1766:function(e,t,s){"use strict";var l=s(5893),a=s(1921);s(809);var r=s(1664),i=s.n(r),c=s(3666),n=s(4173),o=s(7241),d=s(7066);t.Z=e=>{let{image:t,title:s,price:r,slug:_,fav:m,id:u,onReload:h,name:x,offPrice:p,percentDiscount:v,alt:g}=e,{isLoggedIn:f}=(0,c.a)(),j=(0,o.ej)("token");return console.log(g),(0,l.jsxs)("div",{className:"relative",children:[(0,l.jsxs)(i(),{href:"/shop/"+_,children:[(0,l.jsx)("div",{className:"w-full overflow-hidden max-h-[300px]",children:(0,l.jsx)("img",{className:"object-cover w-full h-full hover:scale-125 duration-300",src:a.B+t,alt:g})}),(0,l.jsxs)("div",{className:"mt-2",children:[(0,l.jsx)("p",{className:"text-[10px]",children:s}),(0,l.jsx)("p",{className:"text-[11px]",children:x}),0===v||"0"===v||null==v?(0,l.jsxs)("p",{className:"text-[14px] text-[#27BDBE] mt-1 font-bold",children:[r," AED"]}):(0,l.jsxs)("div",{className:"flex items-center gap-1",children:[(0,l.jsxs)("p",{className:"text-[14px] text-black mt-1 font-bold line-through",children:[r," AED"]}),(0,l.jsxs)("p",{className:"text-[14px] text-[#27BDBE] mt-1 font-bold",children:[p," AED"]})]})]})]}),!0===f?(0,l.jsx)(l.Fragment,{children:!1===m?(0,l.jsx)("svg",{className:"absolute top-2 right-2 cursor-pointer",xmlns:"http://www.w3.org/2000/svg",width:"30",height:"30",viewBox:"0 0 22 22",fill:"none",onClick:e=>{e.preventDefault(),d.Z.post(a.n+"product/fav/",{product:u,fav:!0},{headers:{Authorization:"Bearer "+j}}).then(e=>{n.Am.success("added to favorite"),h()}).catch(e=>{n.Am.error(e.response.data)}).finally(()=>{console.log("final")})},children:(0,l.jsx)("path",{d:"M11.1883 5.13026C16.8949 -0.67221 26.6775 10.1038 11.1884 18.8067C-4.30077 10.1039 5.4818 -0.672211 11.1883 5.13026Z",stroke:"black","stroke-width":"1.3516","stroke-linejoin":"round"})}):!0===m?(0,l.jsx)("svg",{className:"absolute top-2 right-2 cursor-pointer",xmlns:"http://www.w3.org/2000/svg",width:"30",height:"30",viewBox:"0 0 22 22",fill:"#EB0E23",onClick:e=>{e.preventDefault(),d.Z.delete(a.n+"product/fav/"+u+"/",{headers:{Authorization:"Bearer "+j}}).then(e=>{n.Am.success("deleted from favorite"),h()}).catch(e=>{n.Am.error(e.response.data)}).finally(()=>{console.log("final")})},children:(0,l.jsx)("path",{d:"M11.1883 5.13026C16.8949 -0.67221 26.6775 10.1038 11.1884 18.8067C-4.30077 10.1039 5.4818 -0.672211 11.1883 5.13026Z",stroke:"#EB0E23","stroke-width":"1.3516","stroke-linejoin":"round"})}):""}):""]})}},5133:function(e,t,s){"use strict";s.d(t,{Z:function(){return _}});var l=s(5893),a=s(7294),r=s(8557),i=s.n(r);s(1364),s(1365);var c=s(7066),n=s(1921);let o=async e=>{try{let t=await c.Z.get(n.n+"product/search_product/?search="+e);if(200===t.status)return t;throw Error("Failed to fetch data. Status: ".concat(t.status))}catch(e){throw Error(e.message)}};var d=s(1766),_=e=>{let{slug:t}=e,[s,r]=(0,a.useState)(1),[c,n]=(0,a.useState)(""),[_,m]=(0,a.useState)(null),[u,h]=(0,a.useState)(!1),x=()=>{r(s+1)};return(0,a.useEffect)(()=>{(async()=>{try{let e=await o(t);m(e.data)}catch(e){console.error("Error fetching data:",e)}})()},[t]),(0,l.jsxs)("div",{className:i().search+" mb-20",children:[(0,l.jsx)("div",{className:i().search__gradient}),(0,l.jsx)("div",{className:i().searchwrapper+" w-11/12 container mx-auto",children:(0,l.jsx)("div",{className:i().search__items+" max-w-5xl mx-auto grid grid-cols-4 max-md:grid-cols-3 gap-x-10 max-md:gap-x-5 gap-y-10 max-md:gap-y-5",children:null==_?void 0:_.map(e=>(0,l.jsx)(d.Z,{alt:null==e?void 0:e.cover_image_alt,percentDiscount:null==e?void 0:e.percent_discount,offPrice:null==e?void 0:e.off_price,name:null==e?void 0:e.name_product,title:null==e?void 0:e.product,image:null==e?void 0:e.cover_image,price:null==e?void 0:e.price,slug:null==e?void 0:e.slug,fav:null==e?void 0:e.fav,id:null==e?void 0:e.id,onReload:x}))})})]})}},1364:function(e,t,s){"use strict";var l=s(5893);s(7294);var a=s(3617),r=s.n(a),i=s(1921),c=s(1664),n=s.n(c);t.Z=e=>{let{gender:t,cover_image:s,subCategories:a,off_price:c,percent_discount:o,price:d,product:_,product_code:m,slug:u,subtitle:h}=e;return(0,l.jsxs)("div",{className:r().shopitem,style:{direction:"ltr"},children:[(0,l.jsx)(n(),{href:"/product/"+u,children:(0,l.jsxs)("div",{className:r().shopitem__image+" w-full overflow-hidden",children:[(0,l.jsx)("img",{className:"object-cover w-full",src:i.B+s,alt:"image"}),(0,l.jsx)("div",{className:r().overlay,children:(0,l.jsx)("svg",{className:"w-8",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 576 512",children:(0,l.jsx)("path",{d:"M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"})})})]})}),(0,l.jsx)("div",{className:r().shopitem__info+" flex justify-between items-center mt-5",children:(0,l.jsx)("p",{className:r().title+" max-md:text-[7px] text-[14px] font-bold",children:_})}),(0,l.jsx)("div",{className:r().shopitem__desc,children:(0,l.jsxs)("p",{className:"max-md:text-[8px] max-md:leading-3 text-sm font-bold",children:[h+" ",t]})}),(0,l.jsx)("div",{className:r().shopitem__desc,children:(0,l.jsx)("div",{className:r().price+" flex gap-3 items-center mb-8 mt-1",children:0===o||"0"===o||null==o?(0,l.jsx)(l.Fragment,{children:(0,l.jsxs)("p",{className:r().realprice+" text-sm max-md:text-xs text-[#27BDBE]",children:[c," AED"]})}):(0,l.jsxs)(l.Fragment,{children:[(0,l.jsxs)("p",{className:r().previousprice+" font-noraml text-sm text-[#27BDBE] line-through",children:[d," AED"]}),(0,l.jsxs)("p",{className:r().realprice+" text-sm max-md:text-xs text-[#27BDBE]",children:[c," AED"]})]})})})]})}},6553:function(e,t,s){"use strict";s.r(t),s.d(t,{__N_SSP:function(){return r},default:function(){return i}});var l=s(5893),a=s(5133),r=!0;function i(e){let{slug:t}=e;return(0,l.jsx)(a.Z,{slug:t})}},809:function(e){e.exports={hero:"styles_hero__quRSz",hero__desc:"styles_hero__desc__KTUkD",title:"styles_title__ECc4z",desc:"styles_desc__CjtHU",button:"styles_button__fw36d",category:"styles_category__BjmrG",category__desc:"styles_category__desc__yTTAS",subscribe:"styles_subscribe__Xa0Ew",gradient:"styles_gradient__2VGFD",homepage__about:"styles_homepage__about__Q2lFS",rightqote:"styles_rightqote__QUDSL",leftqote:"styles_leftqote__vrcK_",treatment__video:"styles_treatment__video__jYrQv",testimonial:"styles_testimonial__xLRgx","slick-dots":"styles_slick-dots__gVQ_2"}},8557:function(){},3617:function(e){e.exports={shopitem__image:"styles_shopitem__image__oTDnL",overlay:"styles_overlay__7FgwR",singleshopnavbar:"styles_singleshopnavbar__h94WL",item:"styles_item__i7uGi",active:"styles_active__bisgO",cartpopup:"styles_cartpopup__BzqHA",singleaddtobag:"styles_singleaddtobag__RO295"}}},function(e){e.O(0,[888,774,179],function(){return e(e.s=490)}),_N_E=e.O()}]);