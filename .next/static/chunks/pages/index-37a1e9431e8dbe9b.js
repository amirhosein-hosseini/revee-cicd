(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{5557:function(e,t,s){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return s(4888)}])},8181:function(e,t,s){"use strict";s.d(t,{Gf:function(){return n},L:function(){return i},QY:function(){return r}}),s(7294);var l=s(7066),a=s(1921);let r=async e=>{try{let t=await l.Z.get(a.n+"blog/item/"+e);if(200===t.status)return t;throw Error("Failed to fetch data. Status: ".concat(t.status))}catch(e){throw Error(e.message)}},i=async e=>{try{let t=await l.Z.get(a.n+"blog/list/?limit="+e);if(200===t.status)return t;throw Error("Failed to fetch data. Status: ".concat(t.status))}catch(e){throw Error(e.message)}},n=async e=>{try{let t=await l.Z.get(a.n+"blog/related?category="+e+"&limit=3");if(200===t.status)return t;throw Error("Failed to fetch data. Status: ".concat(t.status))}catch(e){throw Error(e.message)}}},1615:function(e,t,s){"use strict";s.d(t,{$x:function(){return c},Dg:function(){return i},Lj:function(){return o},MP:function(){return m},RV:function(){return d},ji:function(){return h},sF:function(){return p},sY:function(){return u},wC:function(){return x},wr:function(){return v},xT:function(){return n}}),s(7294);var l=s(7066),a=s(1921),r=s(7241);s(3666);let i=async(e,t,s)=>{let i=(0,r.ej)("token");if(i)try{let r=await l.Z.get(a.n+"product/all/?limit="+t+"&page_number="+e+"&"+s,{headers:{Authorization:"Bearer "+i}});if(200===r.status)return r;throw Error("Failed to fetch data. Status: ".concat(r.status))}catch(e){throw Error(e.message)}else try{let r=await l.Z.get(a.n+"product/all/?limit="+t+"&page_number="+e+"&"+s);if(200===r.status)return r;throw Error("Failed to fetch data. Status: ".concat(r.status))}catch(e){throw Error(e.message)}},n=async(e,t,s,i)=>{let n=(0,r.ej)("token");if(n)try{let r=await l.Z.get(a.n+"product/all/?limit="+t+"&page_number="+e+"&gender="+i+"&"+s,{headers:{Authorization:"Bearer "+n}});if(200===r.status)return r;throw Error("Failed to fetch data. Status: ".concat(r.status))}catch(e){throw Error(e.message)}else try{let r=await l.Z.get(a.n+"product/all/?limit="+t+"&page_number="+e+"&gender="+i+"&"+s);if(200===r.status)return r;throw Error("Failed to fetch data. Status: ".concat(r.status))}catch(e){throw Error(e.message)}},o=async(e,t,s,i)=>{let n=(0,r.ej)("token");if(n)try{let r=await l.Z.get(a.n+"product/all/?limit="+t+"&page_number="+e+"&category="+i+"&"+s,{headers:{Authorization:"Bearer "+n}});if(200===r.status)return r;throw Error("Failed to fetch data. Status: ".concat(r.status))}catch(e){throw Error(e.message)}else try{let r=await l.Z.get(a.n+"product/all/?limit="+t+"&page_number="+e+"&category="+i+"&"+s);if(200===r.status)return r;throw Error("Failed to fetch data. Status: ".concat(r.status))}catch(e){throw Error(e.message)}},c=async(e,t,s,i)=>{let n=(0,r.ej)("token");if(n)try{let r=await l.Z.get(a.n+"product/all/?limit="+t+"&page_number="+e+"&subcategory="+i+"&"+s,{headers:{Authorization:"Bearer "+n}});if(200===r.status)return r;throw Error("Failed to fetch data. Status: ".concat(r.status))}catch(e){throw Error(e.message)}else try{let r=await l.Z.get(a.n+"product/all/?limit="+t+"&page_number="+e+"&subcategory="+i+"&"+s);if(200===r.status)return r;throw Error("Failed to fetch data. Status: ".concat(r.status))}catch(e){throw Error(e.message)}},d=async(e,t)=>{try{let s=await l.Z.get(a.n+"api/product/list?slug="+e+"&page_number="+t);if(200===s.status)return s;throw Error("Failed to fetch data. Status: ".concat(s.status))}catch(e){throw Error(e.message)}},m=async()=>{try{let e=await l.Z.get(a.n+"home/banner_shop");if(200===e.status)return e;throw Error("Failed to fetch data. Status: ".concat(e.status))}catch(e){throw Error(e.message)}},x=async e=>{try{let t=await l.Z.get(a.n+"product/items/"+e);if(200===t.status)return t;throw Error("Failed to fetch data. Status: ".concat(t.status))}catch(e){throw Error(e.message)}},h=async()=>{try{let e=await l.Z.get(a.n+"product/popular_product/");if(200===e.status)return e;throw Error("Failed to fetch data. Status: ".concat(e.status))}catch(e){throw Error(e.message)}},u=async(e,t,s)=>{try{let r=await l.Z.get(a.n+"product/variant?product="+e+"&size="+s+"&color="+t);if(200===r.status)return r;throw Error("Failed to fetch data. Status: ".concat(r.status))}catch(e){throw Error(e.message)}},p=async(e,t)=>{try{let s=await l.Z.get(a.n+"product/colorimage?color="+t+"&product="+e);if(200===s.status)return s;throw Error("Failed to fetch data. Status: ".concat(s.status))}catch(e){throw Error(e.message)}},v=async(e,t)=>{try{let s=await l.Z.get(a.n+"product/sizeofcolor?product="+e+"&color="+t);if(200===s.status)return s;throw Error("Failed to fetch data. Status: ".concat(s.status))}catch(e){throw Error(e.message)}}},8739:function(e,t,s){"use strict";var l=s(5893);s(7294);var a=s(809),r=s.n(a);s(1365);var i=s(1664),n=s.n(i);t.Z=e=>{let{category:t,category_title:s,description:a,id:i,image:o,slug:c}=e;return(0,l.jsx)("div",{className:r().category,children:(0,l.jsxs)(n(),{className:"relative w-full h-full",href:"/gender/"+t,children:[(0,l.jsx)("div",{className:"absolute top-0 left-0 w-full h-full",style:{background:"#27BDBEB2",zIndex:"100"}}),(0,l.jsx)("img",{src:o,alt:"image"}),(0,l.jsx)("div",{className:r().category__desc+" flex flex-col justify-between max-md:py-2 py-10 max-md:px-2 px-6",children:(0,l.jsxs)("div",{className:r().top+" flex flex-col gap-1 mt-auto",children:[(0,l.jsx)("p",{className:r().title+" max-md:text-[10px] max-md:leading-3 text-5xl text-white text-left font-semibold",children:s}),(0,l.jsx)("p",{className:r().desc+" max-md:text-[6px] max-md:leading-3 text-xl text-white text-left font-normal",children:a})]})})]})})}},1766:function(e,t,s){"use strict";var l=s(5893),a=s(1921);s(809);var r=s(1664),i=s.n(r),n=s(3666),o=s(4173),c=s(7241),d=s(7066);t.Z=e=>{let{image:t,title:s,price:r,slug:m,fav:x,id:h,onReload:u,name:p,offPrice:v,percentDiscount:w,alt:g}=e,{isLoggedIn:f}=(0,n.a)(),j=(0,c.ej)("token");return console.log(g),(0,l.jsxs)("div",{className:"relative",children:[(0,l.jsxs)(i(),{href:"/shop/"+m,children:[(0,l.jsx)("div",{className:"w-full overflow-hidden max-h-[300px]",children:(0,l.jsx)("img",{className:"object-cover w-full h-full hover:scale-125 duration-300",src:a.B+t,alt:g})}),(0,l.jsxs)("div",{className:"mt-2",children:[(0,l.jsx)("p",{className:"text-[10px]",children:s}),(0,l.jsx)("p",{className:"text-[11px]",children:p}),0===w||"0"===w||null==w?(0,l.jsxs)("p",{className:"text-[14px] text-[#27BDBE] mt-1 font-bold",children:[r," AED"]}):(0,l.jsxs)("div",{className:"flex items-center gap-1",children:[(0,l.jsxs)("p",{className:"text-[14px] text-black mt-1 font-bold line-through",children:[r," AED"]}),(0,l.jsxs)("p",{className:"text-[14px] text-[#27BDBE] mt-1 font-bold",children:[v," AED"]})]})]})]}),!0===f?(0,l.jsx)(l.Fragment,{children:!1===x?(0,l.jsx)("svg",{className:"absolute top-2 right-2 cursor-pointer",xmlns:"http://www.w3.org/2000/svg",width:"30",height:"30",viewBox:"0 0 22 22",fill:"none",onClick:e=>{e.preventDefault(),d.Z.post(a.n+"product/fav/",{product:h,fav:!0},{headers:{Authorization:"Bearer "+j}}).then(e=>{o.Am.success("added to favorite"),u()}).catch(e=>{o.Am.error(e.response.data)}).finally(()=>{console.log("final")})},children:(0,l.jsx)("path",{d:"M11.1883 5.13026C16.8949 -0.67221 26.6775 10.1038 11.1884 18.8067C-4.30077 10.1039 5.4818 -0.672211 11.1883 5.13026Z",stroke:"black","stroke-width":"1.3516","stroke-linejoin":"round"})}):!0===x?(0,l.jsx)("svg",{className:"absolute top-2 right-2 cursor-pointer",xmlns:"http://www.w3.org/2000/svg",width:"30",height:"30",viewBox:"0 0 22 22",fill:"#EB0E23",onClick:e=>{e.preventDefault(),d.Z.delete(a.n+"product/fav/"+h+"/",{headers:{Authorization:"Bearer "+j}}).then(e=>{o.Am.success("deleted from favorite"),u()}).catch(e=>{o.Am.error(e.response.data)}).finally(()=>{console.log("final")})},children:(0,l.jsx)("path",{d:"M11.1883 5.13026C16.8949 -0.67221 26.6775 10.1038 11.1884 18.8067C-4.30077 10.1039 5.4818 -0.672211 11.1883 5.13026Z",stroke:"#EB0E23","stroke-width":"1.3516","stroke-linejoin":"round"})}):""}):""]})}},6891:function(e,t,s){"use strict";var l=s(5893);s(7294);var a=s(3690),r=s.n(a);t.Z=()=>(0,l.jsx)("div",{className:r().loading+" absolute h-screen z-50 w-full top-0 left-0 bg-white flex items-center justify-center",children:(0,l.jsxs)("div",{className:r().loadingwrapper+" flex flex-col gap-10",children:[(0,l.jsx)("div",{className:r().image,children:(0,l.jsx)("img",{src:"../../images/logo.png",alt:"logo"})}),(0,l.jsx)("div",{className:r().loadingsvg,children:(0,l.jsx)("svg",{className:r().spinner,xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 50 50",children:(0,l.jsx)("circle",{className:r().path,style:{stroke:"#27BDBE"},cx:"25",cy:"25",r:"20",fill:"none",strokeWidth:"4"})})})]})})},1364:function(e,t,s){"use strict";var l=s(5893);s(7294);var a=s(3617),r=s.n(a),i=s(1921),n=s(1664),o=s.n(n);t.Z=e=>{let{gender:t,cover_image:s,subCategories:a,off_price:n,percent_discount:c,price:d,product:m,product_code:x,slug:h,subtitle:u}=e;return(0,l.jsxs)("div",{className:r().shopitem,style:{direction:"ltr"},children:[(0,l.jsx)(o(),{href:"/product/"+h,children:(0,l.jsxs)("div",{className:r().shopitem__image+" w-full overflow-hidden",children:[(0,l.jsx)("img",{className:"object-cover w-full",src:i.B+s,alt:"image"}),(0,l.jsx)("div",{className:r().overlay,children:(0,l.jsx)("svg",{className:"w-8",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 576 512",children:(0,l.jsx)("path",{d:"M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"})})})]})}),(0,l.jsx)("div",{className:r().shopitem__info+" flex justify-between items-center mt-5",children:(0,l.jsx)("p",{className:r().title+" max-md:text-[7px] text-[14px] font-bold",children:m})}),(0,l.jsx)("div",{className:r().shopitem__desc,children:(0,l.jsxs)("p",{className:"max-md:text-[8px] max-md:leading-3 text-sm font-bold",children:[u+" ",t]})}),(0,l.jsx)("div",{className:r().shopitem__desc,children:(0,l.jsx)("div",{className:r().price+" flex gap-3 items-center mb-8 mt-1",children:0===c||"0"===c||null==c?(0,l.jsx)(l.Fragment,{children:(0,l.jsxs)("p",{className:r().realprice+" text-sm max-md:text-xs text-[#27BDBE]",children:[n," AED"]})}):(0,l.jsxs)(l.Fragment,{children:[(0,l.jsxs)("p",{className:r().previousprice+" font-noraml text-sm text-[#27BDBE] line-through",children:[d," AED"]}),(0,l.jsxs)("p",{className:r().realprice+" text-sm max-md:text-xs text-[#27BDBE]",children:[n," AED"]})]})})})]})}},4888:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return E}});var l=s(5893),a=s(7294),r=s(809),i=s.n(r),n=s(8739),o=s(3887);s(6891);var c=s(1664),d=s.n(c),m=s(6066);function x(e){let{className:t,style:s,onClick:a}=e;return(0,l.jsx)("div",{className:t,style:{...s,display:"block"},onClick:a,children:(0,l.jsx)("svg",{className:"max-md:w-6 max-md:h-6",xmlns:"http://www.w3.org/2000/svg",width:"56",height:"56",viewBox:"0 0 56 56",fill:"none",children:(0,l.jsx)("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M28.0002 51.3333C15.1135 51.3333 4.66683 40.8866 4.66683 28C4.66684 15.1133 15.1135 4.66665 28.0002 4.66665C40.8868 4.66665 51.3335 15.1133 51.3335 28C51.3335 40.8866 40.8868 51.3333 28.0002 51.3333ZM15.6086 28L25.6668 17.9418L28.1417 20.4166L22.3084 26.25L39.6668 26.25L39.6668 29.75L22.3084 29.75L28.1417 35.5833L25.6668 38.0582L15.6086 28Z",fill:"#D2D2D2"})})})}function h(e){let{className:t,style:s,onClick:a}=e;return(0,l.jsx)("div",{className:t,style:{...s,display:"block"},onClick:a,children:(0,l.jsx)("svg",{className:"max-md:w-6 max-md:h-6",xmlns:"http://www.w3.org/2000/svg",width:"56",height:"56",viewBox:"0 0 56 56",fill:"none",children:(0,l.jsx)("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M27.9998 4.66669C40.8865 4.66669 51.3332 15.1134 51.3332 28C51.3332 40.8867 40.8865 51.3334 27.9998 51.3334C15.1132 51.3334 4.6665 40.8867 4.6665 28C4.6665 15.1134 15.1132 4.66669 27.9998 4.66669ZM40.3914 28L30.3332 38.0582L27.8583 35.5834L33.6916 29.75H16.3332V26.25H33.6916L27.8583 20.4167L30.3332 17.9418L40.3914 28Z",fill:"#D2D2D2"})})})}function u(e){let{className:t,style:s,onClick:a}=e;return(0,l.jsx)("div",{className:t,style:{...s,display:"block"},onClick:a,children:(0,l.jsx)("svg",{className:"max-md:w-3",xmlns:"http://www.w3.org/2000/svg",width:"27",height:"51",viewBox:"0 0 27 51",fill:"none",children:(0,l.jsx)("path",{d:"M2.09912 1.24414L24.9999 25.2899L2.09912 49.3357",stroke:"#333333","stroke-width":"2.29008","stroke-linecap":"round","stroke-linejoin":"round"})})})}function p(e){let{className:t,style:s,onClick:a}=e;return(0,l.jsx)("div",{className:t,style:{...s,display:"block"},onClick:a,children:(0,l.jsx)("svg",{className:"max-md:w-3",xmlns:"http://www.w3.org/2000/svg",width:"27",height:"51",viewBox:"0 0 27 51",fill:"none",children:(0,l.jsx)("path",{d:"M24.9008 1.24414L2 25.2899L24.9008 49.3357",stroke:"#333333","stroke-width":"2.29008","stroke-linecap":"round","stroke-linejoin":"round"})})})}s(1660),s(7880);var v=s(1921);function w(e){let{data:t}=e;var s={dots:!0,infinite:!0,speed:500,slidesToShow:1,slidesToScroll:1,nextArrow:(0,l.jsx)(h,{}),prevArrow:(0,l.jsx)(x,{})};return(0,l.jsx)(m.Z,{...s,children:null==t?void 0:t.map(e=>(0,l.jsx)("div",{className:"w-full overflow-hidden",children:(0,l.jsx)("img",{className:"object-cover w-full",src:v.B+(null==e?void 0:e.banner)})}))})}function g(e){let{data:t}=e;var s={dots:!1,infinite:!1,speed:500,slidesToShow:1,slidesToScroll:1,nextArrow:(0,l.jsx)(u,{}),prevArrow:(0,l.jsx)(p,{})};return(0,l.jsx)(m.Z,{...s,children:null==t?void 0:t.map(e=>(0,l.jsx)("div",{className:"w-full overflow-hidden bg-white",children:(0,l.jsxs)("div",{className:"w-[70%] flex flex-col mx-auto",children:[(0,l.jsx)("div",{className:"mb-3",children:(0,l.jsxs)("svg",{className:"max-md:w-8",xmlns:"http://www.w3.org/2000/svg",width:"55",height:"55",viewBox:"0 0 55 55",fill:"none",children:[(0,l.jsx)("g",{"clip-path":"url(#clip0_1065_19020)",children:(0,l.jsx)("path",{d:"M12.0779 21.7558C14.4558 21.7558 16.7803 22.461 18.7574 23.7821C20.7346 25.1032 22.2756 26.9809 23.1856 29.1778C24.0956 31.3747 24.3337 33.7921 23.8697 36.1243C23.4058 38.4565 22.2608 40.5988 20.5793 42.2802C18.8979 43.9617 16.7556 45.1067 14.4234 45.5706C12.0912 46.0345 9.6738 45.7964 7.4769 44.8865C5.28 43.9765 3.40228 42.4355 2.08119 40.4583C0.760093 38.4812 0.0549618 36.1566 0.0549618 33.7787L0 32.0612C0 25.6838 2.53339 19.5677 7.04285 15.0582C11.5523 10.5488 17.6685 8.01538 24.0458 8.01538V14.8856C21.7893 14.8795 19.5539 15.3209 17.469 16.1841C15.3841 17.0473 13.4911 18.3152 11.8992 19.9146C11.2806 20.5321 10.7098 21.1959 10.192 21.9001C10.8069 21.8039 11.4355 21.7524 12.0744 21.7524L12.0779 21.7558ZM42.9939 21.7558C45.3718 21.7558 47.6963 22.461 49.6735 23.7821C51.6506 25.1032 53.1916 26.9809 54.1016 29.1778C55.0116 31.3747 55.2497 33.7921 54.7858 36.1243C54.3219 38.4565 53.1768 40.5988 51.4954 42.2802C49.8139 43.9617 47.6717 45.1067 45.3394 45.5706C43.0072 46.0345 40.5898 45.7964 38.3929 44.8865C36.196 43.9765 34.3183 42.4355 32.9972 40.4583C31.6761 38.4812 30.971 36.1566 30.971 33.7787L30.916 32.0612C30.916 25.6838 33.4494 19.5677 37.9589 15.0582C42.4683 10.5488 48.5845 8.01538 54.9618 8.01538V14.8856C52.7053 14.8795 50.47 15.3209 48.3851 16.1841C46.3002 17.0473 44.4071 18.3152 42.8153 19.9146C42.1966 20.5321 41.6259 21.1959 41.108 21.9001C41.7229 21.8039 42.3515 21.7524 42.9939 21.7524V21.7558Z",fill:"black","fill-opacity":"0.8"})}),(0,l.jsx)("defs",{children:(0,l.jsx)("clipPath",{id:"clip0_1065_19020",children:(0,l.jsx)("rect",{width:"54.9618",height:"54.9618",fill:"white"})})})]})}),(0,l.jsx)("div",{className:"mb-5",children:(0,l.jsx)("p",{className:"relative max-md:text-xs bg-white",style:{zIndex:"100"},children:null==e?void 0:e.comment})}),(0,l.jsx)("div",{children:(0,l.jsx)("p",{className:"font-bold text-xl max-md:text-sm",children:null==e?void 0:e.name})})]})}))})}var f=s(1615);s(1364);var j=s(8181),_=s(1766),y=s(9008),N=s.n(y),b=()=>{var e,t,s,r,c,m,x,h,u,p,v,y,b;let[E,k]=(0,a.useState)(1);Array.from([,,,,,].keys());let[C,B]=(0,a.useState)(null),[L,S]=(0,a.useState)(null),[Z,D]=(0,a.useState)(null),[M,F]=(0,a.useState)(null),[A,z]=(0,a.useState)(null),[T,H]=(0,a.useState)(!1),[R,V]=(0,a.useState)(null),[q,I]=(0,a.useState)(null),[P,O]=(0,a.useState)(null);(0,a.useEffect)(()=>{let e=()=>{H(window.innerWidth<=768)};return e(),window.addEventListener("resize",e),()=>{window.removeEventListener("resize",e)}},[]),(0,a.useEffect)(()=>{(async()=>{try{let e=await (0,j.L)("4");I(null==e?void 0:e.data)}catch(e){console.error("Error fetching data:",e)}})()},[]),(0,a.useEffect)(()=>{(async()=>{try{let e=await (0,o.Mi)();B(e.data)}catch(e){console.error("Error fetching data:",e)}})()},[]),(0,a.useEffect)(()=>{(async()=>{try{let e=await (0,o.v8)();O(e.data[0])}catch(e){console.error("Error fetching data:",e)}})()},[]),(0,a.useEffect)(()=>{(async()=>{try{let e=await (0,o.sD)();V(e.data)}catch(e){console.error("Error fetching data:",e)}})()},[]),(0,a.useEffect)(()=>{(async()=>{try{let e=await (0,o.Cw)();S(e.data)}catch(e){console.error("Error fetching data:",e)}})()},[]),(0,a.useEffect)(()=>{(async()=>{try{var e;let t=await (0,f.Dg)(1,8,"");D(null===(e=t.data)||void 0===e?void 0:e.data)}catch(e){console.error("Error fetching data:",e)}})()},[E]);let Q=()=>{k(E+1)};return(0,a.useEffect)(()=>{(async()=>{try{let e=await (0,o.A$)();F(e.data)}catch(e){console.error("Error fetching data:",e)}})()},[]),(0,a.useEffect)(()=>{(async()=>{try{var e;let t=await (0,o.cc)();z(null===(e=t.data[0])||void 0===e?void 0:e.video)}catch(e){console.error("Error fetching data:",e)}})()},[]),(0,l.jsxs)(l.Fragment,{children:[(0,l.jsxs)(N(),{children:[(null==P?void 0:P.follow)===!1&&(null==P?void 0:P.index)===!1?(0,l.jsx)("meta",{name:"robots",content:"follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large"}):(null==P?void 0:P.follow)===!1&&(null==P?void 0:P.index)===!0?(0,l.jsx)("meta",{name:"robots",content:"follow, noindex"}):(null==P?void 0:P.follow)===!0&&(null==P?void 0:P.index)===!1?(0,l.jsx)("meta",{name:"robots",content:"nofollow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large"}):(null==P?void 0:P.follow)===!0&&(null==P?void 0:P.index)===!0?(0,l.jsx)("meta",{name:"robots",content:"nofollow, noindex"}):"",(0,l.jsx)("link",{rel:"canonical",href:(null==P?void 0:P.canonical)===""?"https://healfit.ae":null==P?void 0:P.canonical}),(0,l.jsx)("meta",{name:"description",content:null==P?void 0:P.meta_description}),(0,l.jsx)("title",{children:null==P?void 0:P.meta_title}),(0,l.jsx)("script",{type:"application/ld+json",dangerouslySetInnerHTML:{__html:null==P?void 0:P.schema_markup}})]}),(0,l.jsxs)("div",{className:i().homepage,children:[(0,l.jsx)("div",{className:"container max-w-7xl mx-auto w-11/12",children:(null==C?void 0:C.length)===1?(0,l.jsx)("div",{className:"w-full overflow-hidden",children:(0,l.jsx)("img",{className:"object-cover w-full",src:null===(e=C[0])||void 0===e?void 0:e.banner,alt:"image"})}):(null==C?void 0:C.length)>1?(0,l.jsx)(w,{data:C}):""}),(0,l.jsx)("div",{className:i().categories+" w-11/12 container max-w-7xl mx-auto grid grid-cols-2 gap-6 mb-20 mt-5 max-md:mt-1 max-md:gap-3",children:null==L?void 0:L.map(e=>(0,l.jsx)(n.Z,{category:null==e?void 0:e.gender,category_title:null==e?void 0:e.gender_title,description:null==e?void 0:e.description,id:null==e?void 0:e.id,image:null==e?void 0:e.image,slug:null==e?void 0:e.slug}))}),(0,l.jsxs)("div",{className:"mt-10 container max-w-5xl mx-auto w-11/12",children:[!1===T?(0,l.jsx)("div",{className:"grid grid-cols-4 gap-4",style:{direction:"ltr"},children:null==Z?void 0:Z.map(e=>(0,l.jsx)(_.Z,{alt:null==e?void 0:e.cover_image_alt,percentDiscount:null==e?void 0:e.percent_discount,offPrice:null==e?void 0:e.off_price,name:null==e?void 0:e.name_product,title:null==e?void 0:e.product,image:null==e?void 0:e.cover_image,price:null==e?void 0:e.price,slug:null==e?void 0:e.slug,fav:null==e?void 0:e.fav,id:null==e?void 0:e.id,onReload:Q}))}):(0,l.jsx)("div",{className:"grid grid-cols-2 gap-4",style:{direction:"ltr"},children:null==Z?void 0:null===(t=Z.slice(0,4))||void 0===t?void 0:t.map(e=>(0,l.jsx)(_.Z,{alt:null==e?void 0:e.cover_image_alt,percentDiscount:null==e?void 0:e.percent_discount,offPrice:null==e?void 0:e.off_price,name:null==e?void 0:e.name_product,title:null==e?void 0:e.product,image:null==e?void 0:e.cover_image,price:null==e?void 0:e.price,slug:null==e?void 0:e.slug,fav:null==e?void 0:e.fav,id:null==e?void 0:e.id,onReload:Q}))}),(0,l.jsx)("div",{className:"mb-20 mt-10 text-center",children:(0,l.jsx)(d(),{href:"/shop",className:"text-sm text-center max-md:text-xs hover:text-[#27BDBE] duration-300",children:"Visit All products"})})]}),(0,l.jsx)("div",{className:i().homepage__benefit+" max-md:py-10 py-20 bg-[#625E5E]",children:(0,l.jsxs)("div",{className:"flex flex-col justify-center items-center w-11/12 container mx-auto",children:[(0,l.jsx)("p",{className:i().title+" leading-[48px] max-md:text-sm text-4xl text-white text-center max-w-screen-md font-extrabold",children:null==R?void 0:R.home_about_title}),(0,l.jsx)("p",{className:i().desc+" leading-[38px] max-md:text-xs max-md:leading-5 text-lg text-white max-md:mt-5 mt-20 text-center font-normal",children:null==R?void 0:R.home_about_description})]})}),(0,l.jsx)("div",{className:i().treatment+" w-11/12 max-w-5xl mx-auto flex flex-col mb-20",children:(0,l.jsx)("div",{className:i().treatment__video+" mt-20 w-full overflow-hidden",children:(0,l.jsx)("div",{className:"max-md:h-[200px]",dangerouslySetInnerHTML:{__html:A}})})}),(0,l.jsx)("div",{className:i().testimonial+" container max-w-5xl mx-auto w-11/12 mb-20 mt-10",children:(0,l.jsx)(g,{data:M})}),(0,l.jsxs)("div",{className:i().blogs+" container max-w-5xl w-11/12 mx-auto flex flex-col gap-3 mb-20 max-md:gap-1",children:[(0,l.jsxs)("div",{className:"grid grid-cols-2 gap-3 max-md:gap-1",children:[q?(0,l.jsx)(d(),{href:"/blog/"+(null===(s=q[0])||void 0===s?void 0:s.slug),children:(0,l.jsxs)("div",{className:i().indexBlogItem+" h-[500px] bg-[#343434] p-10 max-md:p-3 max-md:h-[190px]",children:[(0,l.jsx)("div",{className:i().title,children:(0,l.jsx)("p",{className:"text-white font-bold text-4xl max-md:text-sm",children:null===(r=q[0])||void 0===r?void 0:r.title})}),(0,l.jsx)("div",{className:i().desc+" mt-6 max-md:mt-3",children:(0,l.jsx)("p",{className:"text-white w-8/12 max-md:text-xs",children:null===(c=q[0])||void 0===c?void 0:c.short_description})}),(0,l.jsx)("div",{className:"mt-8 max-md:hidden",children:(0,l.jsxs)("button",{className:"flex items-center gap-3 bg-[#515151] py-1 px-2 text-sm text-white",children:["Reed More",(0,l.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"22",height:"22",viewBox:"0 0 22 22",fill:"none",children:[(0,l.jsx)("path",{d:"M4.7749 10.6001H17.0249",stroke:"white","stroke-width":"1.07692","stroke-linecap":"round","stroke-linejoin":"round"}),(0,l.jsx)("path",{d:"M10.8999 4.4751L17.0249 10.6001L10.8999 16.7251",stroke:"white","stroke-width":"1.07692","stroke-linecap":"round","stroke-linejoin":"round"})]})]})})]})}):"",q?(0,l.jsx)(d(),{href:"/blog/"+(null===(m=q[1])||void 0===m?void 0:m.title),children:(0,l.jsxs)("div",{className:i().indexBlogItem+" h-[500px] bg-[#27BDBE] p-10 max-md:p-3 max-md:h-[190px]",children:[(0,l.jsx)("div",{className:i().title,children:(0,l.jsx)("p",{className:"text-white font-bold text-4xl max-md:text-sm",children:null===(x=q[1])||void 0===x?void 0:x.title})}),(0,l.jsx)("div",{className:i().desc+" mt-6 max-md:mt-3",children:(0,l.jsx)("p",{className:"text-white w-8/12 max-md:text-xs",children:null===(h=q[1])||void 0===h?void 0:h.short_description})}),(0,l.jsx)("div",{className:"mt-8 max-md:hidden",children:(0,l.jsxs)("button",{className:"flex items-center gap-3 bg-[#515151] py-1 px-2 text-sm text-white",children:["Reed More",(0,l.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"22",height:"22",viewBox:"0 0 22 22",fill:"none",children:[(0,l.jsx)("path",{d:"M4.7749 10.6001H17.0249",stroke:"white","stroke-width":"1.07692","stroke-linecap":"round","stroke-linejoin":"round"}),(0,l.jsx)("path",{d:"M10.8999 4.4751L17.0249 10.6001L10.8999 16.7251",stroke:"white","stroke-width":"1.07692","stroke-linecap":"round","stroke-linejoin":"round"})]})]})})]})}):""]}),(0,l.jsx)("div",{children:q?(0,l.jsx)(d(),{href:"/blog/"+(null===(u=q[2])||void 0===u?void 0:u.title),children:(0,l.jsx)("div",{className:"w-full bg-[#343434] p-10 max-md:p-3 h-[300px] flex items-center max-md:h-[120px]",children:(0,l.jsxs)("div",{className:"w-5/12 max-md:w-8/12",children:[(0,l.jsx)("div",{className:i().title,children:(0,l.jsx)("p",{className:"text-white font-bold text-4xl max-md:text-sm",children:null===(p=q[2])||void 0===p?void 0:p.title})}),(0,l.jsx)("div",{className:"mt-8 max-md:hidden",children:(0,l.jsxs)("button",{className:"flex items-center gap-3 bg-[#515151] py-1 px-2 text-sm text-white",children:["Reed More",(0,l.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"22",height:"22",viewBox:"0 0 22 22",fill:"none",children:[(0,l.jsx)("path",{d:"M4.7749 10.6001H17.0249",stroke:"white","stroke-width":"1.07692","stroke-linecap":"round","stroke-linejoin":"round"}),(0,l.jsx)("path",{d:"M10.8999 4.4751L17.0249 10.6001L10.8999 16.7251",stroke:"white","stroke-width":"1.07692","stroke-linecap":"round","stroke-linejoin":"round"})]})]})})]})})}):""}),(0,l.jsx)("div",{children:q?(0,l.jsx)(d(),{href:"/blog/"+(null===(v=q[3])||void 0===v?void 0:v.title),children:(0,l.jsxs)("div",{className:"w-full bg-[#27BDBE] h-[300px] flex items-center max-md:h-[120px]",children:[(0,l.jsxs)("div",{className:"w-5/12 p-10 max-md:p-3",children:[(0,l.jsx)("div",{className:i().title,children:(0,l.jsx)("p",{className:"text-white font-bold text-4xl max-md:text-sm",children:null===(y=q[3])||void 0===y?void 0:y.title})}),(0,l.jsx)("div",{className:"mt-8 max-md:hidden",children:(0,l.jsxs)("button",{className:"flex items-center gap-3 bg-[#515151] py-1 px-2 text-sm text-white",children:["Reed More",(0,l.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"22",height:"22",viewBox:"0 0 22 22",fill:"none",children:[(0,l.jsx)("path",{d:"M4.7749 10.6001H17.0249",stroke:"white","stroke-width":"1.07692","stroke-linecap":"round","stroke-linejoin":"round"}),(0,l.jsx)("path",{d:"M10.8999 4.4751L17.0249 10.6001L10.8999 16.7251",stroke:"white","stroke-width":"1.07692","stroke-linecap":"round","stroke-linejoin":"round"})]})]})})]}),(0,l.jsx)("div",{className:"w-7/12 h-full",children:(0,l.jsx)("img",{className:"object-cover w-full h-full",src:null===(b=q[2])||void 0===b?void 0:b.cover_image,alt:"image"})})]})}):""}),(0,l.jsxs)("div",{className:"flex items-center gap-1 ml-auto mt-3",children:[(0,l.jsx)("p",{className:"max-md:text-sm",children:"All the news"}),(0,l.jsxs)("svg",{className:"max-md:w-5",xmlns:"http://www.w3.org/2000/svg",width:"23",height:"23",viewBox:"0 0 38 38",fill:"none",children:[(0,l.jsx)("path",{d:"M7.94727 19.4399H29.4723",stroke:"#666666","stroke-width":"1.89231","stroke-linecap":"round","stroke-linejoin":"round"}),(0,l.jsx)("path",{d:"M18.71 8.67725L29.4725 19.4397L18.71 30.2022",stroke:"#666666","stroke-width":"1.89231","stroke-linecap":"round","stroke-linejoin":"round"})]})]})]})]})]})};function E(){return(0,l.jsx)(b,{})}},809:function(e){e.exports={hero:"styles_hero__quRSz",hero__desc:"styles_hero__desc__KTUkD",title:"styles_title__ECc4z",desc:"styles_desc__CjtHU",button:"styles_button__fw36d",category:"styles_category__BjmrG",category__desc:"styles_category__desc__yTTAS",subscribe:"styles_subscribe__Xa0Ew",gradient:"styles_gradient__2VGFD",homepage__about:"styles_homepage__about__Q2lFS",rightqote:"styles_rightqote__QUDSL",leftqote:"styles_leftqote__vrcK_",treatment__video:"styles_treatment__video__jYrQv",testimonial:"styles_testimonial__xLRgx","slick-dots":"styles_slick-dots__gVQ_2"}},3690:function(e){e.exports={loadingsvg:"styles_loadingsvg__cEgqE",spinner:"styles_spinner__x1V_O",spin:"styles_spin__dYWYF",path:"styles_path__Xe5Cg",dash:"styles_dash__p90q0"}},3617:function(e){e.exports={shopitem__image:"styles_shopitem__image__oTDnL",overlay:"styles_overlay__7FgwR",singleshopnavbar:"styles_singleshopnavbar__h94WL",item:"styles_item__i7uGi",active:"styles_active__bisgO",cartpopup:"styles_cartpopup__BzqHA",singleaddtobag:"styles_singleaddtobag__RO295"}}},function(e){e.O(0,[598,888,774,179],function(){return e(e.s=5557)}),_N_E=e.O()}]);