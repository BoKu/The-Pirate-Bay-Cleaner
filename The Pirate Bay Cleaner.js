// ==UserScript==
// @name        The Pirate Bay Cleaner
// @description Release 2024 Build 1
// @author      BoKu
// @version     2024.1
// @namespace   https://greasyfork.org/scripts/1573-the-pirate-bay-cleaner
// @icon        https://i.imgur.com/jsBhOii.gif
// @license 	The Pirate Bay Cleaner is licensed under a Creative Commons Attribution-ShareAlike 3.0 Unported License.
// @match       *://thepiratebay.org/*
// @noframes
// @run-at      document-body
// @resource    bootstrapCss https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css#sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH
// @require     https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js#sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz
// @grant       GM.setValue
// @grant       GM.getValue
// @grant       GM.openInTab
// @grant       GM_getResourceText
// @grant       GM_addStyle
// @grant       unsafeWindow
// @downloadURL https://update.greasyfork.org/scripts/1573/The%20Pirate%20Bay%20Cleaner.user.js
// @updateURL   https://update.greasyfork.org/scripts/1573/The%20Pirate%20Bay%20Cleaner.meta.js
// ==/UserScript==
"use strict";
window.stop();
const bootstrapCss = GM_getResourceText("bootstrapCss");
GM_addStyle(bootstrapCss);
const tpb = unsafeWindow
 , tpbApi = "https://apibay.org"
 , tpbServer = "https://torrindex.net"
 , FixJsRedirect = t=>{
   if (console.debug(`FixJsRedirect:    ${t}`),
   GM.setValue("FixJsRedirect", !0),
   (!0 === t || !1 === t) && "thepiratebay.org" == tpb.location.hostname && "/browse.php" != tpb.location.pathname) {
       let t = tpb.location.origin + "/browse.php";
       tpb.location.href = t
   }
}
 , guiAccent = "success"
 , NewGui = async(t,e)=>{
   console.debug(`NewGui:    ${t}`),
   GM.setValue("NewGui", t),
   console.debug(`NewGuiDarkmode:    ${e}`),
   GM.setValue("NewGuiDarkmode", e);
   const a = await GM.getValue("RemovePorn", !0) ? "d-none" : ""
     , o = e ? "dark" : "light";
   if (!0 === t) {
       const t = document.getElementsByTagName("html")[0];
       t.setAttribute("data-bs-theme", `${o}`),
       t.style.scrollbarColor = e ? "var(--bs-success) #212529" : "auto";
       document.getElementsByTagName("body")[0].remove();
       const n = document.getElementsByTagName("head")[0]
         , s = document.createElement("style");
       s.setAttribute("id", "tpbcStyle"),
       s.append("\n                a, a:link, a:visited, a:focus {border-bottom:initial; color: initial}\n                a:hover {--bs-link-color-rgb: var(--bs-link-hover-color-rgb);} .nav-link:focus, .nav-link:hover {color: var(--bs-nav-link-hover-color);}\n                .bi::before {display: inline-block; content: \"\"; vertical-align: -.125em; background-repeat: no-repeat; background-size: 1rem 1rem;} .bi{display:inline-block;vertical-align: -.125em; width: 1em; height: 1em;}\n                .form-check-input:checked {background-color: var(--bs-success); border-color: var(--bs-success);}\n                .form-check-input:focus, .form-control:focus {border-color: var(--bs-success); box-shadow: 0 0 0 .25rem rgba(var(--bs-success-rgb),.25);}\n                .form-switch .form-check-input:focus {background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill=\"%23ffffff\" xfill='%23db8790' /%3e%3c/svg%3e\");}\n                .skull-trusted{color:#ff00ff;} .skull-vip{color:#04ec04;} .skull-helper{color:#0000ff;} .no-pointer-event{pointer-events: none;}\n                .pagination { --bs-pagination-active-bg: var(--bs-success); --bs-pagination-active-border-color: var(--bs-success);}\n                .shake { -webkit-animation: kf_shake 0.4s 1 linear; -moz-animation: kf_shake 0.4s 1 linear; -o-animation: kf_shake 0.4s 1 linear;}\n\t\t        @-webkit-keyframes kf_shake { 0% { -webkit-transform: translate(8px); } 20% { -webkit-transform: translate(-8px); } 40% { -webkit-transform: translate(4px);}\n                60% { -webkit-transform: translate(-4px); } 80% { -webkit-transform: translate(2px); }100% {-webkit-transform: translate(0px);}}\n                .fixed-bottom-left {position:fixed; bottom:10px; left:10px; opacity: 0; transition: opacity 0.4s}\n                "),
       n.append(s);
       const r = document.createElement("body");
       r.setAttribute("id", "tpbcBody"),
       r.classList.add(`bg-${o}`),
       r.style = "padding-top: 3.5rem; scroll-behavior: smooth;";
       const l = document.createElement("nav");
       l.classList.add("navbar", "navbar-expand-md", "fixed-top", "border-bottom", `bg-${o}`),
       l.innerHTML = `\n            <div class="container-fluid">\n                <span role="button" class="navbar-brand" data-tpbc="a" href="refresh" >The Pirate Bay <i href="refresh">Cleaner</i></span>\n                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">\n                    <span class="navbar-toggler-icon"></span>\n                </button>\n                <div class="collapse navbar-collapse" id="navbarCollapse">\n                    <ul class="navbar-nav me-auto mb-2 mb-md-0">\n\n                        <li class="nav-item me-3">\n                            <a class="nav-link border border-0  text-success" href="/search.php?q=top100:recent" data-tpbc="a"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cloud-arrow-up-fill" viewBox="0 0 16 16"><path d="M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2m2.354 5.146a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0z"/></svg> Recent Torrents</a>\n                        </li>\n\n                        <li class="nav-item me-3">\n                            <div class="btn-group ">\n                                <a class="nav-link border border-0" href="/search.php?q=top100:48h" data-tpbc="a">\n                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock-history" viewBox="0 0 16 16"><path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022zm2.004.45a7 7 0 0 0-.985-.299l.219-.976q.576.129 1.126.342zm1.37.71a7 7 0 0 0-.439-.27l.493-.87a8 8 0 0 1 .979.654l-.615.789a7 7 0 0 0-.418-.302zm1.834 1.79a7 7 0 0 0-.653-.796l.724-.69q.406.429.747.91zm.744 1.352a7 7 0 0 0-.214-.468l.893-.45a8 8 0 0 1 .45 1.088l-.95.313a7 7 0 0 0-.179-.483m.53 2.507a7 7 0 0 0-.1-1.025l.985-.17q.1.58.116 1.17zm-.131 1.538q.05-.254.081-.51l.993.123a8 8 0 0 1-.23 1.155l-.964-.267q.069-.247.12-.501m-.952 2.379q.276-.436.486-.908l.914.405q-.24.54-.555 1.038zm-.964 1.205q.183-.183.35-.378l.758.653a8 8 0 0 1-.401.432z"/><path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0z"/><path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5"/>\n                                    </svg> 48h Top\n                                </a>\n                                <a role="button" class="nav-link border border-0 dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false"></a>\n                                <ul class="dropdown-menu" style="font-size:0.8rem;">\n                                    <li><a class="dropdown-item border border-0 fw-bold" href="/search.php?q=top100:48h_200" data-tpbc="a">Video</a></li>\n                                    <li><a class="dropdown-item border border-0 ps-4" href="/search.php?q=top100:48h_201" data-tpbc="a">Movie</a></li>\n                                    <li><a class="dropdown-item border border-0 ps-4" href="/search.php?q=top100:48h_205" data-tpbc="a">TV Show</a></li>\n                                    <li><a class="dropdown-item border border-0 ps-4" href="/search.php?q=top100:48h_207" data-tpbc="a">HD - Movie</a></li>\n                                    <li><a class="dropdown-item border border-0 ps-4" href="/search.php?q=top100:48h_208" data-tpbc="a">HD - TV Show</a></li>\n                                    <li><a class="dropdown-item border border-0 ps-4" href="/search.php?q=top100:48h_211" data-tpbc="a">UHD/4k - Movie</a></li>\n                                    <li><a class="dropdown-item border border-0 ps-4" href="/search.php?q=top100:48h_212" data-tpbc="a">UHD/4k - TV Show</a></li>\n                                    <li><hr class="dropdown-divider"></li>\n                                    <li><a class="dropdown-item border border-0 fw-bold" href="/search.php?q=top100:48h_100" data-tpbc="a">Audio</a></li>\n                                    <li><a class="dropdown-item border border-0 ps-4" href="/search.php?q=top100:48h_101" data-tpbc="a">Music</a></li>\n                                    <li><a class="dropdown-item border border-0 ps-4" href="/search.php?q=top100:48h_102" data-tpbc="a">Audio Book</a></li>\n                                    <li><a class="dropdown-item border border-0 ps-4" href="/search.php?q=top100:48h_104" data-tpbc="a">FLAC</a></li>\n                                    <li><hr class="dropdown-divider"></li>\n                                    <li><a class="dropdown-item border border-0 fw-bold" href="/search.php?q=top100:48h_300" data-tpbc="a">Application</a></li>\n                                    <li><a class="dropdown-item border border-0 ps-4" href="/search.php?q=top100:48h_301" data-tpbc="a">Windows</a></li>\n                                    <li><a class="dropdown-item border border-0 ps-4" href="/search.php?q=top100:48h_302" data-tpbc="a">Mac</a></li>\n                                    <li><a class="dropdown-item border border-0 ps-4" href="/search.php?q=top100:48h_306" data-tpbc="a">Android</a></li>\n                                    <li><hr class="dropdown-divider"></li>\n                                    <li><a class="dropdown-item border border-0 fw-bold" href="/search.php?q=top100:48h_400" data-tpbc="a">Games</a></li>\n                                    <li><a class="dropdown-item border border-0 ps-4" href="/search.php?q=top100:48h_401" data-tpbc="a">PC</a></li>\n                                    <li><hr class="dropdown-divider"></li>\n                                    <li class="${a}"><a class="dropdown-item border border-0 fw-bold" href="/search.php?q=top100:48h_500" data-tpbc="a">Porn</a></li>\n                                    <li class="${a}"><a class="dropdown-item border border-0 ps-4" href="/search.php?q=top100:48h_501" data-tpbc="a">Movie</a></li>\n                                    <li class="${a}"><a class="dropdown-item border border-0 ps-4" href="/search.php?q=top100:48h_503" data-tpbc="a">Picture</a></li>\n                                    <li class="${a}"><a class="dropdown-item border border-0 ps-4" href="/search.php?q=top100:48h_505" data-tpbc="a">HD - Movie</a></li>\n                                    <li class="${a}"><a class="dropdown-item border border-0 ps-4" href="/search.php?q=top100:48h_506" data-tpbc="a">Movie Clip</a></li>\n                                    <li class="${a}"><a class="dropdown-item border border-0 ps-4" href="/search.php?q=top100:48h_507" data-tpbc="a">UHD/4k - Movie</a></li>\n                                    <li class="${a}"><hr class="dropdown-divider"></li>\n                                    <li><a class="dropdown-item border border-0 fw-bold" href="/search.php?q=top100:48h_600" data-tpbc="a">Other</a></li>\n                                    <li><a class="dropdown-item border border-0 ps-4" href="/search.php?q=top100:48h_601" data-tpbc="a">eBook</a></li>\n                                    <li><a class="dropdown-item border border-0 ps-4" href="/search.php?q=top100:48h_602" data-tpbc="a">Comic</a></li>\n                                    <li><a class="dropdown-item border border-0 ps-4" href="/search.php?q=top100:48h_699" data-tpbc="a">Other</a></li>\n                                </ul>\n                            </div>\n                        </li>\n\n                        <li class="nav-item">\n                            <div class="btn-group ">\n                                <a class="nav-link border border-0" href="/search.php?q=top100:all" data-tpbc="a">\n                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trophy-fill" viewBox="0 0 16 16"><path d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5q0 .807-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33 33 0 0 1 2.5.5m.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935m10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935"/>\n                                    </svg> Top 100\n                                </a>\n                                <a role="button" class="nav-link border border-0 dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false"></a>\n                                <ul class="dropdown-menu" style="font-size:0.8rem;">\n                                    <li><a class="dropdown-item border border-0 fw-bold" href="/search.php?q=top100:200" data-tpbc="a">Video</a></li>\n                                    <li><a class="dropdown-item border border-0 ps-4" href="/search.php?q=top100:201" data-tpbc="a">Movie</a></li>\n                                    <li><a class="dropdown-item border border-0 ps-4" href="/search.php?q=top100:205" data-tpbc="a">TV Show</a></li>\n                                    <li><a class="dropdown-item border border-0 ps-4" href="/search.php?q=top100:207" data-tpbc="a">HD - Movie</a></li>\n                                    <li><a class="dropdown-item border border-0 ps-4" href="/search.php?q=top100:208" data-tpbc="a">HD - TV Show</a></li>\n                                    <li><a class="dropdown-item border border-0 ps-4" href="/search.php?q=top100:211" data-tpbc="a">UHD/4k - Movie</a></li>\n                                    <li><a class="dropdown-item border border-0 ps-4" href="/search.php?q=top100:212" data-tpbc="a">UHD/4k - TV Show</a></li>\n                                    <li><hr class="dropdown-divider"></li>\n                                    <li><a class="dropdown-item border border-0 fw-bold" href="/search.php?q=top100:100" data-tpbc="a">Audio</a></li>\n                                    <li><a class="dropdown-item border border-0 ps-4" href="/search.php?q=top100:101" data-tpbc="a">Music</a></li>\n                                    <li><a class="dropdown-item border border-0 ps-4" href="/search.php?q=top100:102" data-tpbc="a">Audio Book</a></li>\n                                    <li><a class="dropdown-item border border-0 ps-4" href="/search.php?q=top100:104" data-tpbc="a">FLAC</a></li>\n                                    <li><hr class="dropdown-divider"></li>\n                                    <li><a class="dropdown-item border border-0 fw-bold" href="/search.php?q=top100:300" data-tpbc="a">Application</a></li>\n                                    <li><a class="dropdown-item border border-0 ps-4" href="/search.php?q=top100:301" data-tpbc="a">Windows</a></li>\n                                    <li><a class="dropdown-item border border-0 ps-4" href="/search.php?q=top100:302" data-tpbc="a">Mac</a></li>\n                                    <li><a class="dropdown-item border border-0 ps-4" href="/search.php?q=top100:306" data-tpbc="a">Android</a></li>\n                                    <li><hr class="dropdown-divider"></li>\n                                    <li><a class="dropdown-item border border-0 fw-bold" href="/search.php?q=top100:400" data-tpbc="a">Games</a></li>\n                                    <li><a class="dropdown-item border border-0 ps-4" href="/search.php?q=top100:401" data-tpbc="a">PC</a></li>\n                                    <li><hr class="dropdown-divider"></li>\n                                    <li class="${a}"><a class="dropdown-item border border-0 fw-bold" href="/search.php?q=top100:500" data-tpbc="a">Porn</a></li>\n                                    <li class="${a}"><a class="dropdown-item border border-0 ps-4" href="/search.php?q=top100:501" data-tpbc="a">Movie</a></li>\n                                    <li class="${a}"><a class="dropdown-item border border-0 ps-4" href="/search.php?q=top100:503" data-tpbc="a">Picture</a></li>\n                                    <li class="${a}"><a class="dropdown-item border border-0 ps-4" href="/search.php?q=top100:505" data-tpbc="a">HD - Movie</a></li>\n                                    <li class="${a}"><a class="dropdown-item border border-0 ps-4" href="/search.php?q=top100:506" data-tpbc="a">Movie Clip</a></li>\n                                    <li class="${a}"><a class="dropdown-item border border-0 ps-4" href="/search.php?q=top100:507" data-tpbc="a">UHD/4k - Movie</a></li>\n                                    <li class="${a}"><hr class="dropdown-divider"></li>\n                                    <li><a class="dropdown-item border border-0 fw-bold" href="/search.php?q=top100:600" data-tpbc="a">Other</a></li>\n                                    <li><a class="dropdown-item border border-0 ps-4" href="/search.php?q=top100:601" data-tpbc="a">eBook</a></li>\n                                    <li><a class="dropdown-item border border-0 ps-4" href="/search.php?q=top100:602" data-tpbc="a">Comic</a></li>\n                                    <li><a class="dropdown-item border border-0 ps-4" href="/search.php?q=top100:699" data-tpbc="a">Other</a></li>\n                                </ul>\n                            </div>\n                        </li>\n\n                    </ul>\n                    <form class="d-flex" role="search" data-tpbc="form" action="q.php?cat=0">\n                        <input class="form-control me-2" type="search" placeholder="Search here..." aria-label="Search here..." autofocus required spellcheck="false">\n                        <button class="btn btn-success" type="submit" title="Search">\n                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">\n                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>\n                            </svg>\n                        </button>\n                    </form>\n                    <button class="btn btn-secondary ms-md-2 mt-2 mt-md-0 text" type="button" title="Settings" data-bs-toggle="modal" data-bs-target="#tpbcSettings" >\n                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gear-fill" viewBox="0 0 16 16">\n                            <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>\n                        </svg>\n                    </button>\n                </div>\n            </div>`,
       r.append(l);
       const i = document.createElement("main");
       i.classList.add("container-fluid", "p-2", `bg-${o}`),
       i.style = `min-height: 311px; /*background: url("${tpbServer}/images/tpb.jpg") no-repeat top center*/; background-blend-mode: multiply; background-position-y: center;`;
       const c = document.createElement("div");
       c.classList.add("container-fluid", "py-2"),
       c.innerHTML = `\n            <div class="row">\n                <div class="col">\n                    <div class="btn-group-vertical d-flex" role="group" aria-label="Vertical button group">\n                        <span class="w-100 rounded-top bg-success border-success text-center text-light fw-medium p-2">BROWSE TORRENTS</span>\n                        <div class="btn-group dropend rounded-0 border border-top-0" role="group">\n                            <button data-tpbc="button" data-cat="category:200" type="button" class="btn btn-dark w-100" >\n                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi" viewBox="0 0 16 16"><path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z"/></svg> Video</button>\n                            <button type="button" class="btn btn-dark dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false"></button>\n                            <ul class="dropdown-menu">\n                                <li><button data-tpbc="button" data-cat="category:201" type="button" class="dropdown-item" >Movie</button></li>\n                                <li><button data-tpbc="button" data-cat="category:202" type="button" class="dropdown-item" >Movies DVDR</button></li>\n                                <li><button data-tpbc="button" data-cat="category:203" type="button" class="dropdown-item" >Music Video</button></li>\n                                <li><button data-tpbc="button" data-cat="category:204" type="button" class="dropdown-item" >Movie Clip</button></li>\n                                <li><button data-tpbc="button" data-cat="category:205" type="button" class="dropdown-item" >TV Show</button></li>\n                                <li><button data-tpbc="button" data-cat="category:206" type="button" class="dropdown-item" >Handheld</button></li>\n                                <li><button data-tpbc="button" data-cat="category:207" type="button" class="dropdown-item" >HD - Movie</button></li>\n                                <li><button data-tpbc="button" data-cat="category:208" type="button" class="dropdown-item" >HD - TV Show</button></li>\n                                <li><button data-tpbc="button" data-cat="category:209" type="button" class="dropdown-item" >3D</button></li>\n                                <li><button data-tpbc="button" data-cat="category:210" type="button" class="dropdown-item" >CAM/TS</button></li>\n                                <li><button data-tpbc="button" data-cat="category:211" type="button" class="dropdown-item" >UHD/4k - Movie</button></li>\n                                <li><button data-tpbc="button" data-cat="category:212" type="button" class="dropdown-item" >UHD/4k - TV Show</button></li>\n                                <li><button data-tpbc="button" data-cat="category:299" type="button" class="dropdown-item" >Other</button></li>\n                            </ul>\n                        </div>\n\n                        <div class="btn-group dropend rounded-0 border" role="group">\n                            <button data-tpbc="button" data-cat="category:100" type="button" class="btn btn-dark w-100" >\n                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi" viewBox="0 0 16 16"><path d="M6 13c0 1.105-1.12 2-2.5 2S1 14.105 1 13s1.12-2 2.5-2 2.5.896 2.5 2m9-2c0 1.105-1.12 2-2.5 2s-2.5-.895-2.5-2 1.12-2 2.5-2 2.5.895 2.5 2"/><path fill-rule="evenodd" d="M14 11V2h1v9zM6 3v10H5V3z"/><path d="M5 2.905a1 1 0 0 1 .9-.995l8-.8a1 1 0 0 1 1.1.995V3L5 4z"/></svg> Audio</button>\n                            <button type="button" class="btn btn-dark dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false"></button>\n                            <ul class="dropdown-menu">\n                                <li><button data-tpbc="button" data-cat="category:101" type="button" class="dropdown-item" >Music</button></li>\n                                <li><button data-tpbc="button" data-cat="category:102" type="button" class="dropdown-item" >Audio Book</button></li>\n                                <li><button data-tpbc="button" data-cat="category:103" type="button" class="dropdown-item" >Sound Clip</button></li>\n                                <li><button data-tpbc="button" data-cat="category:104" type="button" class="dropdown-item" >FLAC</button></li>\n                                <li><button data-tpbc="button" data-cat="category:199" type="button" class="dropdown-item" >Other</button></li>\n                            </ul>\n                        </div>\n\n                        <div class="btn-group dropend rounded-0 border" role="group">\n                            <button data-tpbc="button" data-cat="category:300" type="button" class="btn btn-dark w-100" >\n                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi" viewBox="0 0 16 16"><path d="M6.555 1.375 0 2.237v5.45h6.555zM0 13.795l6.555.933V8.313H0zm7.278-5.4.026 6.378L16 16V8.395zM16 0 7.33 1.244v6.414H16z"/></svg> Application</button>\n                            <button type="button" class="btn btn-dark dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false"></button>\n                            <ul class="dropdown-menu">\n                                <li><button data-tpbc="button" data-cat="category:301" type="button" class="dropdown-item" >Windows</button></li>\n                                <li><button data-tpbc="button" data-cat="category:302" type="button" class="dropdown-item" >Mac</button></li>\n                                <li><button data-tpbc="button" data-cat="category:303" type="button" class="dropdown-item" >UNIX</button></li>\n                                <li><button data-tpbc="button" data-cat="category:304" type="button" class="dropdown-item" >Handheld</button></li>\n                                <li><button data-tpbc="button" data-cat="category:305" type="button" class="dropdown-item" >iOS (iPad/iPhone)</button></li>\n                                <li><button data-tpbc="button" data-cat="category:306" type="button" class="dropdown-item" >Android</button></li>\n                                <li><button data-tpbc="button" data-cat="category:399" type="button" class="dropdown-item" >Other OS</button></li>\n                            </ul>\n                        </div>\n\n                        <div class="btn-group dropend rounded-0 border" role="group">\n                            <button data-tpbc="button" data-cat="category:400" type="button" class="btn btn-dark w-100" >\n                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi" viewBox="0 0 16 16"><path d="M11.5 6.027a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m-1.5 1.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1m2.5-.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m-1.5 1.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1m-6.5-3h1v1h1v1h-1v1h-1v-1h-1v-1h1z"/><path d="M3.051 3.26a.5.5 0 0 1 .354-.613l1.932-.518a.5.5 0 0 1 .62.39c.655-.079 1.35-.117 2.043-.117.72 0 1.443.041 2.12.126a.5.5 0 0 1 .622-.399l1.932.518a.5.5 0 0 1 .306.729q.211.136.373.297c.408.408.78 1.05 1.095 1.772.32.733.599 1.591.805 2.466s.34 1.78.364 2.606c.024.816-.059 1.602-.328 2.21a1.42 1.42 0 0 1-1.445.83c-.636-.067-1.115-.394-1.513-.773-.245-.232-.496-.526-.739-.808-.126-.148-.25-.292-.368-.423-.728-.804-1.597-1.527-3.224-1.527s-2.496.723-3.224 1.527c-.119.131-.242.275-.368.423-.243.282-.494.575-.739.808-.398.38-.877.706-1.513.773a1.42 1.42 0 0 1-1.445-.83c-.27-.608-.352-1.395-.329-2.21.024-.826.16-1.73.365-2.606.206-.875.486-1.733.805-2.466.315-.722.687-1.364 1.094-1.772a2.3 2.3 0 0 1 .433-.335l-.028-.079zm2.036.412c-.877.185-1.469.443-1.733.708-.276.276-.587.783-.885 1.465a14 14 0 0 0-.748 2.295 12.4 12.4 0 0 0-.339 2.406c-.022.755.062 1.368.243 1.776a.42.42 0 0 0 .426.24c.327-.034.61-.199.929-.502.212-.202.4-.423.615-.674.133-.156.276-.323.44-.504C4.861 9.969 5.978 9.027 8 9.027s3.139.942 3.965 1.855c.164.181.307.348.44.504.214.251.403.472.615.674.318.303.601.468.929.503a.42.42 0 0 0 .426-.241c.18-.408.265-1.02.243-1.776a12.4 12.4 0 0 0-.339-2.406 14 14 0 0 0-.748-2.295c-.298-.682-.61-1.19-.885-1.465-.264-.265-.856-.523-1.733-.708-.85-.179-1.877-.27-2.913-.27s-2.063.091-2.913.27"/></svg> Game</button>\n                            <button type="button" class="btn btn-dark dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false"></button>\n                            <ul class="dropdown-menu">\n                                <li><button data-tpbc="button" data-cat="category:401" type="button" class="dropdown-item" >PC</button></li>\n                                <li><button data-tpbc="button" data-cat="category:402" type="button" class="dropdown-item" >Mac</button></li>\n                                <li><button data-tpbc="button" data-cat="category:403" type="button" class="dropdown-item" >PSx</button></li>\n                                <li><button data-tpbc="button" data-cat="category:404" type="button" class="dropdown-item" >XBOX360</button></li>\n                                <li><button data-tpbc="button" data-cat="category:405" type="button" class="dropdown-item" >Wii</button></li>\n                                <li><button data-tpbc="button" data-cat="category:406" type="button" class="dropdown-item" >Handheld</button></li>\n                                <li><button data-tpbc="button" data-cat="category:407" type="button" class="dropdown-item" >iOS (iPad/iPhone)</button></li>\n                                <li><button data-tpbc="button" data-cat="category:408" type="button" class="dropdown-item" >Android</button></li>\n                                <li><button data-tpbc="button" data-cat="category:499" type="button" class="dropdown-item" >Other</button></li>\n                            </ul>\n                        </div>\n\n                        <div class="btn-group dropend rounded-0 border ${a}" role="group">\n                            <button data-tpbc="button" data-cat="category:500" type="button" class="btn btn-dark w-100" >\n                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi" viewBox="0 0 16 16"><path fill-rule="evenodd" d="m4.736 1.968-.892 3.269-.014.058C2.113 5.568 1 6.006 1 6.5 1 7.328 4.134 8 8 8s7-.672 7-1.5c0-.494-1.113-.932-2.83-1.205l-.014-.058-.892-3.27c-.146-.533-.698-.849-1.239-.734C9.411 1.363 8.62 1.5 8 1.5s-1.411-.136-2.025-.267c-.541-.115-1.093.2-1.239.735m.015 3.867a.25.25 0 0 1 .274-.224c.9.092 1.91.143 2.975.143a30 30 0 0 0 2.975-.143.25.25 0 0 1 .05.498c-.918.093-1.944.145-3.025.145s-2.107-.052-3.025-.145a.25.25 0 0 1-.224-.274M3.5 10h2a.5.5 0 0 1 .5.5v1a1.5 1.5 0 0 1-3 0v-1a.5.5 0 0 1 .5-.5m-1.5.5q.001-.264.085-.5H2a.5.5 0 0 1 0-1h3.5a1.5 1.5 0 0 1 1.488 1.312 3.5 3.5 0 0 1 2.024 0A1.5 1.5 0 0 1 10.5 9H14a.5.5 0 0 1 0 1h-.085q.084.236.085.5v1a2.5 2.5 0 0 1-5 0v-.14l-.21-.07a2.5 2.5 0 0 0-1.58 0l-.21.07v.14a2.5 2.5 0 0 1-5 0zm8.5-.5h2a.5.5 0 0 1 .5.5v1a1.5 1.5 0 0 1-3 0v-1a.5.5 0 0 1 .5-.5"/></svg> Porn</button>\n                            <button type="button" class="btn btn-dark dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false"></button>\n                            <ul class="dropdown-menu">\n                                <li><button data-tpbc="button" data-cat="category:501" type="button" class="dropdown-item" >Movie</button></li>\n                                <li><button data-tpbc="button" data-cat="category:502" type="button" class="dropdown-item" >Movie DVDR</button></li>\n                                <li><button data-tpbc="button" data-cat="category:503" type="button" class="dropdown-item" >Pictures</button></li>\n                                <li><button data-tpbc="button" data-cat="category:504" type="button" class="dropdown-item" >Games</button></li>\n                                <li><button data-tpbc="button" data-cat="category:505" type="button" class="dropdown-item" >HD - Movie</button></li>\n                                <li><button data-tpbc="button" data-cat="category:506" type="button" class="dropdown-item" >Movie Clip</button></li>\n                                <li><button data-tpbc="button" data-cat="category:507" type="button" class="dropdown-item" >UHD/4k - Movie</button></li>\n                                <li><button data-tpbc="button" data-cat="category:599" type="button" class="dropdown-item" >Other</button></li>\n                            </ul>\n                        </div>\n\n                        <div class="btn-group dropend rounded-0 rounded-bottom border" role="group">\n                            <button data-tpbc="button" data-cat="category:600" type="button" class="btn btn-dark w-100" >\n                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-archive-fill" viewBox="0 0 16 16"><path d="M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15zM5.5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1M.8 1a.8.8 0 0 0-.8.8V3a.8.8 0 0 0 .8.8h14.4A.8.8 0 0 0 16 3V1.8a.8.8 0 0 0-.8-.8z"/></svg> Other</button>\n                            <button type="button" class="btn btn-dark dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false"></button>\n                            <ul class="dropdown-menu">\n                                <li><button data-tpbc="button" data-cat="category:601" type="button" class="dropdown-item" >eBook</button></li>\n                                <li><button data-tpbc="button" data-cat="category:602" type="button" class="dropdown-item" >Comic</button></li>\n                                <li><button data-tpbc="button" data-cat="category:603" type="button" class="dropdown-item" >Picture</button></li>\n                                <li><button data-tpbc="button" data-cat="category:604" type="button" class="dropdown-item" >Cover</button></li>\n                                <li><button data-tpbc="button" data-cat="category:605" type="button" class="dropdown-item" >Physible</button></li>\n                                <li><button data-tpbc="button" data-cat="category:699" type="button" class="dropdown-item" >Other</button></li>\n                            </ul>\n                        </div>\n\n                    </div>\n\n                    <div class="content-fluid text-center bg-${o}">\n                        <img class="img-fluid no-pointer-event" src="${tpbServer}/images/tpb.jpg" style="mix-blend-mode: multiply;" title="The Pirate Bay Cleaner" rel="nofollow">\n                    </div>\n                </div>\n                <div class="col-10">\n                    <div id="tpbcContent" class="container-fluid px-0"></div>\n                </div>\n            </div>`,
       i.append(c),
       r.append(i),
       r.innerHTML += '\n            <footer class="footer mt-auto py-3 bg-body-tertiary">\n                <div class="container text-center">\n                    <span class="text-body-secondary">\n                        <a href="https://www.buymeacoffee.com/boku" target="_blank"><img style="max-height:50px;" src="https://img.buymeacoffee.com/button-api/?text=Buy me a pizza&emoji=🍕&slug=boku&button_colour=dc3545&font_colour=ffffff&font_family=Comic&outline_colour=ffffff&coffee_colour=FFDD00" /></a>\n                    </span>\n                </div>\n            </footer>';
       let d = await GM.getValue("ShrinkDescription", !0) ? "" : "show";
       let p = await GM.getValue("ShrinkFileList", !0) ? "" : "show";
       r.innerHTML += `\n            <div class="modal fade" id="tpbcSettings" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">\n                <div class="modal-dialog modal-lg modal-dialog-centered">\n                    <div class="modal-content">\n                        <div class="modal-header">\n                            <h1 class="modal-title fs-5" id="staticBackdropLabel">The Pirate Bay <i>Cleaner</i> Settings</h1>\n                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>\n                        </div>\n                        <div class="modal-body"></div>\n                        <div class="modal-footer justify-content-between">\n                            <div>\n                                <a class="btn btn-secondary" role="button" href="https://greasyfork.org/scripts/1573/feedback" target="_blank" title="Bug Tracker">\n                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bug-fill" viewBox="0 0 16 16">\n                                        <path d="M4.978.855a.5.5 0 1 0-.956.29l.41 1.352A5 5 0 0 0 3 6h10a5 5 0 0 0-1.432-3.503l.41-1.352a.5.5 0 1 0-.956-.29l-.291.956A5 5 0 0 0 8 1a5 5 0 0 0-2.731.811l-.29-.956z"/>\n                                        <path d="M13 6v1H8.5v8.975A5 5 0 0 0 13 11h.5a.5.5 0 0 1 .5.5v.5a.5.5 0 1 0 1 0v-.5a1.5 1.5 0 0 0-1.5-1.5H13V9h1.5a.5.5 0 0 0 0-1H13V7h.5A1.5 1.5 0 0 0 15 5.5V5a.5.5 0 0 0-1 0v.5a.5.5 0 0 1-.5.5zm-5.5 9.975V7H3V6h-.5a.5.5 0 0 1-.5-.5V5a.5.5 0 0 0-1 0v.5A1.5 1.5 0 0 0 2.5 7H3v1H1.5a.5.5 0 0 0 0 1H3v1h-.5A1.5 1.5 0 0 0 1 11.5v.5a.5.5 0 1 0 1 0v-.5a.5.5 0 0 1 .5-.5H3a5 5 0 0 0 4.5 4.975"/>\n                                    </svg>\n                                </a>\n                                <a class="btn" role="button" href="https://www.buymeacoffee.com/boku" target="_blank" title="Buy me a pizza">\n                                    <img style="height:2.3125rem;" src="https://img.buymeacoffee.com/button-api/?text=Buy me a pizza&emoji=🍕&slug=boku&button_colour=dc3545&font_colour=ffffff&font_family=Comic&outline_colour=ffffff&coffee_colour=FFDD00" />\n                                </a>\n                            </div>\n                            <button type="button" class="btn btn-success" data-bs-dismiss="modal" data-tpbc="saveSettings">\n                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-floppy-fill" viewBox="0 0 16 16">\n                                <path d="M0 1.5A1.5 1.5 0 0 1 1.5 0H3v5.5A1.5 1.5 0 0 0 4.5 7h7A1.5 1.5 0 0 0 13 5.5V0h.086a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5H14v-5.5A1.5 1.5 0 0 0 12.5 9h-9A1.5 1.5 0 0 0 2 10.5V16h-.5A1.5 1.5 0 0 1 0 14.5z"/>\n                                <path d="M3 16h10v-5.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5zm9-16H4v5.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5zM9 1h2v4H9z"/>\n                                </svg>\n                            Save and Close</button>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div class="modal fade" id="torInfoMod" data-bs-backdrop="not-static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="torInfoModLabel" aria-hidden="true">\n              <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">\n                <div class="modal-content">\n                  <div class="modal-header">\n                    <h1 class="modal-title fs-5" id="torInfoModLabel"><div class="spinner-border" aria-hidden="true"></div><strong class="ms-3" role="status">Loading...</strong></h1>\n                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>\n                  </div>\n                  <div class="modal-body">\n                      <div class="mb-3">\n                          <h4 class="h4">Information <button class="btn pt-1 text-success" data-bs-toggle="collapse" data-bs-target="#collapseInfo">\n                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrows-vertical" viewBox="0 0 16 16"><path d="M8.354 14.854a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 13.293V2.707L6.354 3.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 2.707v10.586l1.146-1.147a.5.5 0 0 1 .708.708z"/></svg>\n                          </button></h4>\n                          <div class="collapse ${d}" id="collapseInfo">\n                              <div class="card card-body" style="white-space: pre-wrap;">\n                              </div>\n                          </div>\n                      </div>\n                      <div class="mb-3">\n                          <h4 class="h4">File List <button class="btn pt-1 text-success fw-bold" data-bs-toggle="collapse" data-bs-target="#collapseFiles">\n                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrows-vertical" viewBox="0 0 16 16"><path d="M8.354 14.854a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 13.293V2.707L6.354 3.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 2.707v10.586l1.146-1.147a.5.5 0 0 1 .708.708z"/></svg>\n                          </button></h4>\n                          <div class="collapse ${p}" id="collapseFiles">\n                              <div class="card card-body">\n                                  <ul class="list-group list-group-flush"></ul>\n                              </div>\n                          </div>\n                      </div>\n                  </div>\n                  <div class="modal-footer">\n                    <button type="button" class="btn btn-success" data-bs-dismiss="modal">Close</button>\n                  </div>\n                </div>\n              </div>\n            </div>\n            `,
       r.innerHTML += '<button id="scrollButton" class="btn btn-secondary fixed-bottom-left"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5"/></svg> Top</button>',
       t.append(r),
       loadSettings(),
       await getData("top100:recent");
       document.querySelectorAll('[data-tpbc="form"]').forEach((t=>{
           t.addEventListener("submit", (t=>{
               t.preventDefault(),
               getData(`search:${t.target[0].value.trim()}`)
           }
           ))
       }
       ));
       document.querySelectorAll('[data-tpbc="button"]').forEach((t=>{
           t.addEventListener("click", (async t=>{
               t.preventDefault(),
               t.target.dataset.cat,
               setActiveMenu(t.target),
               await getData(t.target.dataset.cat)
           }
           ))
       }
       ));
       document.querySelectorAll('[data-tpbc="saveSettings"]').forEach((t=>{
           t.addEventListener("click", (t=>{
               t.preventDefault(),
               setTimeout((()=>{
                   location.reload()
               }
               ), 300)
           }
           ))
       }
       ));
       document.querySelectorAll('[data-tpbc="a"]').forEach((t=>{
           t.addEventListener("click", (async e=>{
               e.preventDefault();
               const a = e.target.attributes.href.value;
               if ("refresh" === a)
                   location.reload();
               else
                   setActiveMenu(t),
                   await getData(a.split("=")[1])
           }
           ))
       }
       ))
   }
   window.onscroll = function() {
       var t = window.pageYOffset || document.documentElement.scrollTop
         , e = document.getElementById("scrollButton");
       e.style.opacity = t > 0 ? "1" : "0"
   }
   ,
   document.getElementById("scrollButton").addEventListener("click", (function() {
       window.scrollTo({
           top: 0,
           behavior: "smooth"
       })
   }
   ))
}
 , setActiveMenu = async(t=!1)=>new Promise((e=>{
   t || e(!1);
   try {
       const t = document.querySelectorAll('a[class~="nav-link"]');
       for (let e = 0; e < t.length; e++)
           t[e].classList.remove("text-success")
   } catch {}
   try {
       const e = document.querySelector('ul[class~="dropdown-menu"]').querySelectorAll("a");
       for (let t = 0; t < e.length; t++)
           e[t].classList.remove("text-success");
       if (t.classList.contains("dropdown-item")) {
           const e = t.closest("div").children;
           for (let t = 0; t < e.length; t++)
               "a" === e[t].tagName.toLowerCase() && e[t].classList.add("text-success")
       }
   } catch {}
   try {
       const e = document.querySelector('div[class~="btn-group-vertical"]').querySelectorAll("button");
       for (let t = 0; t < e.length; t++)
           e[t].classList.remove("text-success");
       if (t.classList.contains("dropdown-item")) {
           const e = t.closest('[role="group"]').children;
           for (let t = 0; t < e.length; t++)
               "button" === e[t].type && e[t].classList.add("text-success")
       }
   } catch {}
   t.classList.add("text-success"),
   e(!0)
}
))
 , setContent = async(t,e=0)=>new Promise((a=>{
   try {
       const o = document.getElementById("tpbcContent");
       0 === e ? o.innerHTML = t : o.innerHTML += t,
       a(!0)
   } catch {
       a(!1)
   }
}
))
 , formatBytes = async(t,e)=>new Promise((a=>{
   0 == t && a("0 Bytes");
   let o = e || 2
     , n = Math.floor(Math.log(t) / Math.log(1024));
   a(parseFloat((t / Math.pow(1024, n)).toFixed(o)) + " " + ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"][n])
}
))
 , getIcon = async t=>new Promise((e=>{
   let a = t;
   switch (t = parseInt(t) || t) {
   case 100:
       a = "Audio";
       break;
   case 101:
       a = "Music - Audio";
       break;
   case 199:
       a = "Other - Audio";
       break;
   case 200:
       a = "Video";
       break;
   case 201:
       a = "Movie - Video";
       break;
   case 202:
       a = "Movie DVDR - Video";
       break;
   case 203:
       a = "Music - Video";
       break;
   case 204:
       a = "Movie Clip - Video";
       break;
   case 206:
       a = "Handheld - Video";
       break;
   case 207:
       a = "HD Movie - Video";
       break;
   case 208:
       a = "HD TV Shows - Video";
       break;
   case 211:
       a = "UHD/4k Movie - Video";
       break;
   case 212:
       a = "UHD/4k TV Shows - Video";
       break;
   case 300:
       a = "Applications";
       break;
   case 301:
       a = "Windows - Application";
       break;
   case 302:
       a = "Mac - Application";
       break;
   case 303:
       a = "UNIX - Application";
       break;
   case 304:
       a = "Handheld - Application";
       break;
   case 305:
       a = "iOS (iPad/iPhone) - Application";
       break;
   case 306:
       a = "Android - Application";
       break;
   case 399:
       a = "Other - Application";
       break;
   case 400:
       a = "Games";
       break;
   case 401:
       a = "PC - Game";
       break;
   case 402:
       a = "Mac - Game";
       break;
   case 403:
       a = "PSx - Game";
       break;
   case 404:
       a = "XBOX360 - Game";
       break;
   case 405:
       a = "Wii - Game";
       break;
   case 406:
       a = "Handheld - Game";
       break;
   case 407:
       a = "iOS (iPad/iPhone) - Game";
       break;
   case 408:
       a = "Android - Game";
       break;
   case 499:
       a = "Other - Game";
       break;
   case 500:
       a = "Porn";
       break;
   case 501:
       a = "Movie - Porn";
       break;
   case 502:
       a = "Movie DVDR - Porn";
       break;
   case 503:
       a = "Pictures - Porn";
       break;
   case 504:
       a = "Games - Porn";
       break;
   case 505:
       a = "HD Movie - Porn";
       break;
   case 506:
       a = "Movie Clips - Porn";
       break;
   case 507:
       a = "UHD/4k Movie - Porn";
       break;
   case 599:
       a = "Other - Porn";
       break;
   case 600:
       a = "Other";
       break;
   case 601:
       a = "eBooks - Other";
       break;
   case 602:
       a = "Comics - Other";
       break;
   case 603:
       a = "Pictures - Other";
       break;
   case 604:
       a = "Covers - Other";
       break;
   case 605:
       a = "Physibles - Other";
       break;
   case 699:
       a = "Other - Other"
   }
   switch (!0) {
   case 102 == t:
       e('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-music-note-list" viewBox="0 0 16 16"><title>Book - Audio</title><path d="M12 13c0 1.105-1.12 2-2.5 2S7 14.105 7 13s1.12-2 2.5-2 2.5.895 2.5 2"/><path fill-rule="evenodd" d="M12 3v10h-1V3z"/><path d="M11 2.82a1 1 0 0 1 .804-.98l3-.6A1 1 0 0 1 16 2.22V4l-5 1z"/><path fill-rule="evenodd" d="M0 11.5a.5.5 0 0 1 .5-.5H4a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5m0-4A.5.5 0 0 1 .5 7H8a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5m0-4A.5.5 0 0 1 .5 3H8a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5"/></svg>');
       break;
   case 103 == t:
       e('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-volume-up" viewBox="0 0 16 16"><title>Sound Clip - Audio</title><path d="M11.536 14.01A8.47 8.47 0 0 0 14.026 8a8.47 8.47 0 0 0-2.49-6.01l-.708.707A7.48 7.48 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303z"/><path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.48 5.48 0 0 1 11.025 8a5.48 5.48 0 0 1-1.61 3.89z"/><path d="M10.025 8a4.5 4.5 0 0 1-1.318 3.182L8 10.475A3.5 3.5 0 0 0 9.025 8c0-.966-.392-1.841-1.025-2.475l.707-.707A4.5 4.5 0 0 1 10.025 8M7 4a.5.5 0 0 0-.812-.39L3.825 5.5H1.5A.5.5 0 0 0 1 6v4a.5.5 0 0 0 .5.5h2.325l2.363 1.89A.5.5 0 0 0 7 12zM4.312 6.39 6 5.04v5.92L4.312 9.61A.5.5 0 0 0 4 9.5H2v-3h2a.5.5 0 0 0 .312-.11"/></svg>');
       break;
   case 104 == t:
       e('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-soundwave" viewBox="0 0 16 16"><title>FLAC - Audio</title><path fill-rule="evenodd" d="M8.5 2a.5.5 0 0 1 .5.5v11a.5.5 0 0 1-1 0v-11a.5.5 0 0 1 .5-.5m-2 2a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5m4 0a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5m-6 1.5A.5.5 0 0 1 5 6v4a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m8 0a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m-10 1A.5.5 0 0 1 3 7v2a.5.5 0 0 1-1 0V7a.5.5 0 0 1 .5-.5m12 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0V7a.5.5 0 0 1 .5-.5"/></svg>');
       break;
   case 205 == t:
       e('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-badge-sd" viewBox="0 0 16 16"><title>TV Show - Video</title><path fill-rule="evenodd" d="M15 4a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm5.077 7.114c-1.524 0-2.263-.8-2.315-1.749h1.147c.079.466.527.809 1.234.809.739 0 1.13-.339 1.13-.83 0-.418-.3-.634-.923-.779l-.927-.215c-.932-.21-1.52-.747-1.52-1.657 0-1.098.918-1.815 2.24-1.815 1.371 0 2.162.77 2.22 1.692H6.238c-.075-.43-.466-.76-1.103-.76-.655 0-1.046.338-1.046.804 0 .36.294.598.821.712l.932.216c.971.22 1.613.685 1.613 1.691 0 1.117-.857 1.881-2.378 1.881M8.307 11V5.001h2.19c1.823 0 2.684 1.09 2.684 2.984 0 1.908-.874 3.015-2.685 3.015zm2.031-5.032h-.844v4.06h.844c1.116 0 1.622-.667 1.622-2.02 0-1.354-.51-2.04-1.622-2.04"/></svg>');
       break;
   case 207 == t:
   case 208 == t:
   case 505 == t:
       e(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-badge-hd" viewBox="0 0 16 16"><title>${a}</title><path d="M7.396 11V5.001H6.209v2.44H3.687V5H2.5v6h1.187V8.43h2.522V11zM8.5 5.001V11h2.188c1.811 0 2.685-1.107 2.685-3.015 0-1.894-.86-2.984-2.684-2.984zm1.187.967h.843c1.112 0 1.622.686 1.622 2.04 0 1.353-.505 2.02-1.622 2.02h-.843z"/><path d="M14 3a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"/></svg>`);
       break;
   case 209 == t:
       e('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-badge-3d" viewBox="0 0 16 16"><title>3D - Video</title><path d="M4.52 8.368h.664c.646 0 1.055.378 1.06.9.008.537-.427.919-1.086.919-.598-.004-1.037-.325-1.068-.756H3c.03.914.791 1.688 2.153 1.688 1.24 0 2.285-.66 2.272-1.798-.013-.953-.747-1.38-1.292-1.432v-.062c.44-.07 1.125-.527 1.108-1.375-.013-.906-.8-1.57-2.053-1.565-1.31.005-2.043.734-2.074 1.67h1.103c.022-.391.383-.751.936-.751.532 0 .928.33.928.813.004.479-.383.835-.928.835h-.632v.914zm3.606-3.367V11h2.189C12.125 11 13 9.893 13 7.985c0-1.894-.861-2.984-2.685-2.984zm1.187.967h.844c1.112 0 1.621.686 1.621 2.04 0 1.353-.505 2.02-1.621 2.02h-.844z"/><path d="M14 3a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"/></svg>');
       break;
   case 211 == t:
   case 212 == t:
   case 507 == t:
       e(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-badge-4k" viewBox="0 0 16 16"><title>${a}</title><path d="M4.807 5.001C4.021 6.298 3.203 7.6 2.5 8.917v.971h2.905V11h1.112V9.888h.733V8.93h-.733V5.001zm-1.23 3.93v-.032a47 47 0 0 1 1.766-3.001h.062V8.93zm9.831-3.93h-1.306L9.835 7.687h-.057V5H8.59v6h1.187V9.075l.615-.699L12.072 11H13.5l-2.232-3.415z"/><path d="M14 3a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"/></svg>`);
       break;
   case 302 == t:
   case 305 == t:
   case 402 == t:
   case 407 == t:
       e(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-apple" viewBox="0 0 16 16"><title>${a}</title><path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516s1.52.087 2.475-1.258.762-2.391.728-2.43m3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422s1.675-2.789 1.698-2.854-.597-.79-1.254-1.157a3.7 3.7 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56s.625 1.924 1.273 2.796c.576.984 1.34 1.667 1.659 1.899s1.219.386 1.843.067c.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758q.52-1.185.473-1.282"/><path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516s1.52.087 2.475-1.258.762-2.391.728-2.43m3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422s1.675-2.789 1.698-2.854-.597-.79-1.254-1.157a3.7 3.7 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56s.625 1.924 1.273 2.796c.576.984 1.34 1.667 1.659 1.899s1.219.386 1.843.067c.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758q.52-1.185.473-1.282"/></svg>`);
       break;
   case 306 == t:
   case 408 == t:
       e(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-android2" viewBox="0 0 16 16"><title>${a}</title><path d="m10.213 1.471.691-1.26q.069-.124-.048-.192-.128-.057-.195.058l-.7 1.27A4.8 4.8 0 0 0 8.005.941q-1.032 0-1.956.404l-.7-1.27Q5.281-.037 5.154.02q-.117.069-.049.193l.691 1.259a4.25 4.25 0 0 0-1.673 1.476A3.7 3.7 0 0 0 3.5 5.02h9q0-1.125-.623-2.072a4.27 4.27 0 0 0-1.664-1.476ZM6.22 3.303a.37.37 0 0 1-.267.11.35.35 0 0 1-.263-.11.37.37 0 0 1-.107-.264.37.37 0 0 1 .107-.265.35.35 0 0 1 .263-.11q.155 0 .267.11a.36.36 0 0 1 .112.265.36.36 0 0 1-.112.264m4.101 0a.35.35 0 0 1-.262.11.37.37 0 0 1-.268-.11.36.36 0 0 1-.112-.264q0-.154.112-.265a.37.37 0 0 1 .268-.11q.155 0 .262.11a.37.37 0 0 1 .107.265q0 .153-.107.264M3.5 11.77q0 .441.311.75.311.306.76.307h.758l.01 2.182q0 .414.292.703a.96.96 0 0 0 .7.288.97.97 0 0 0 .71-.288.95.95 0 0 0 .292-.703v-2.182h1.343v2.182q0 .414.292.703a.97.97 0 0 0 .71.288.97.97 0 0 0 .71-.288.95.95 0 0 0 .292-.703v-2.182h.76q.436 0 .749-.308.31-.307.311-.75V5.365h-9zm10.495-6.587a.98.98 0 0 0-.702.278.9.9 0 0 0-.293.685v4.063q0 .406.293.69a.97.97 0 0 0 .702.284q.42 0 .712-.284a.92.92 0 0 0 .293-.69V6.146a.9.9 0 0 0-.293-.685 1 1 0 0 0-.712-.278m-12.702.283a1 1 0 0 1 .712-.283q.41 0 .702.283a.9.9 0 0 1 .293.68v4.063a.93.93 0 0 1-.288.69.97.97 0 0 1-.707.284 1 1 0 0 1-.712-.284.92.92 0 0 1-.293-.69V6.146q0-.396.293-.68"/></svg>`);
       break;
   case 601 == t:
   case 602 == t:
       e(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-book" viewBox="0 0 16 16"><title>${a}</title><path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783"/></svg>`);
       break;
   case 503 == t:
   case 603 == t:
   case 604 == t:
       e(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-image" viewBox="0 0 16 16"><title>${a}</title><path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/><path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1z"/></svg>`);
       break;
   case 605 == t:
       e(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-printer-fill" viewBox="0 0 16 16"><title>${a}</title><path d="M5 1a2 2 0 0 0-2 2v1h10V3a2 2 0 0 0-2-2zm6 8H5a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1"/><path d="M0 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-1v-2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2H2a2 2 0 0 1-2-2zm2.5 1a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1"/></svg>`);
       break;
   case 699 == t:
       e(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-patch-question-fill" viewBox="0 0 16 16"><title>${a}</title><path d="M5.933.87a2.89 2.89 0 0 1 4.134 0l.622.638.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01zM7.002 11a1 1 0 1 0 2 0 1 1 0 0 0-2 0m1.602-2.027c.04-.534.198-.815.846-1.26.674-.475 1.05-1.09 1.05-1.986 0-1.325-.92-2.227-2.262-2.227-1.02 0-1.792.492-2.1 1.29A1.7 1.7 0 0 0 6 5.48c0 .393.203.64.545.64.272 0 .455-.147.564-.51.158-.592.525-.915 1.074-.915.61 0 1.03.446 1.03 1.084 0 .563-.208.885-.822 1.325-.619.433-.926.914-.926 1.64v.111c0 .428.208.745.585.745.336 0 .504-.24.554-.627"/></svg>`);
       break;
   case 99999 == t:
       e("");
       break;
   case t >= 100 && t < 200:
       e(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-music-note-beamed" viewBox="0 0 16 16"><title>${a}</title><path d="M6 13c0 1.105-1.12 2-2.5 2S1 14.105 1 13s1.12-2 2.5-2 2.5.896 2.5 2m9-2c0 1.105-1.12 2-2.5 2s-2.5-.895-2.5-2 1.12-2 2.5-2 2.5.895 2.5 2"/><path fill-rule="evenodd" d="M14 11V2h1v9zM6 3v10H5V3z"/><path d="M5 2.905a1 1 0 0 1 .9-.995l8-.8a1 1 0 0 1 1.1.995V3L5 4z"/></svg>`);
       break;
   case t >= 200 && t < 300:
       e(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-camera-reels" viewBox="0 0 16 16"><title>${a}</title><path d="M6 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0M1 3a2 2 0 1 0 4 0 2 2 0 0 0-4 0"/><path d="M9 6h.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 7.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 16H2a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2zm6 8.73V7.27l-3.5 1.555v4.35zM1 8v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1"/><path d="M9 6a3 3 0 1 0 0-6 3 3 0 0 0 0 6M7 3a2 2 0 1 1 4 0 2 2 0 0 1-4 0"/></svg>`);
       break;
   case t >= 300 && t < 400:
       e(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-windows" viewBox="0 0 16 16"><title>${a}</title><path d="M6.555 1.375 0 2.237v5.45h6.555zM0 13.795l6.555.933V8.313H0zm7.278-5.4.026 6.378L16 16V8.395zM16 0 7.33 1.244v6.414H16z"/></svg>`);
       break;
   case t >= 400 && t < 500:
   case 504 == t:
       e(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-controller" viewBox="0 0 16 16"><title>${a}</title><path d="M11.5 6.027a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m-1.5 1.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1m2.5-.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m-1.5 1.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1m-6.5-3h1v1h1v1h-1v1h-1v-1h-1v-1h1z"/><path d="M3.051 3.26a.5.5 0 0 1 .354-.613l1.932-.518a.5.5 0 0 1 .62.39c.655-.079 1.35-.117 2.043-.117.72 0 1.443.041 2.12.126a.5.5 0 0 1 .622-.399l1.932.518a.5.5 0 0 1 .306.729q.211.136.373.297c.408.408.78 1.05 1.095 1.772.32.733.599 1.591.805 2.466s.34 1.78.364 2.606c.024.816-.059 1.602-.328 2.21a1.42 1.42 0 0 1-1.445.83c-.636-.067-1.115-.394-1.513-.773-.245-.232-.496-.526-.739-.808-.126-.148-.25-.292-.368-.423-.728-.804-1.597-1.527-3.224-1.527s-2.496.723-3.224 1.527c-.119.131-.242.275-.368.423-.243.282-.494.575-.739.808-.398.38-.877.706-1.513.773a1.42 1.42 0 0 1-1.445-.83c-.27-.608-.352-1.395-.329-2.21.024-.826.16-1.73.365-2.606.206-.875.486-1.733.805-2.466.315-.722.687-1.364 1.094-1.772a2.3 2.3 0 0 1 .433-.335l-.028-.079zm2.036.412c-.877.185-1.469.443-1.733.708-.276.276-.587.783-.885 1.465a14 14 0 0 0-.748 2.295 12.4 12.4 0 0 0-.339 2.406c-.022.755.062 1.368.243 1.776a.42.42 0 0 0 .426.24c.327-.034.61-.199.929-.502.212-.202.4-.423.615-.674.133-.156.276-.323.44-.504C4.861 9.969 5.978 9.027 8 9.027s3.139.942 3.965 1.855c.164.181.307.348.44.504.214.251.403.472.615.674.318.303.601.468.929.503a.42.42 0 0 0 .426-.241c.18-.408.265-1.02.243-1.776a12.4 12.4 0 0 0-.339-2.406 14 14 0 0 0-.748-2.295c-.298-.682-.61-1.19-.885-1.465-.264-.265-.856-.523-1.733-.708-.85-.179-1.877-.27-2.913-.27s-2.063.091-2.913.27"/></svg>`);
       break;
   case t >= 500 && t < 600:
       e(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-incognito" viewBox="0 0 16 16"><title>${a}</title><path fill-rule="evenodd" d="m4.736 1.968-.892 3.269-.014.058C2.113 5.568 1 6.006 1 6.5 1 7.328 4.134 8 8 8s7-.672 7-1.5c0-.494-1.113-.932-2.83-1.205l-.014-.058-.892-3.27c-.146-.533-.698-.849-1.239-.734C9.411 1.363 8.62 1.5 8 1.5s-1.411-.136-2.025-.267c-.541-.115-1.093.2-1.239.735m.015 3.867a.25.25 0 0 1 .274-.224c.9.092 1.91.143 2.975.143a30 30 0 0 0 2.975-.143.25.25 0 0 1 .05.498c-.918.093-1.944.145-3.025.145s-2.107-.052-3.025-.145a.25.25 0 0 1-.224-.274M3.5 10h2a.5.5 0 0 1 .5.5v1a1.5 1.5 0 0 1-3 0v-1a.5.5 0 0 1 .5-.5m-1.5.5q.001-.264.085-.5H2a.5.5 0 0 1 0-1h3.5a1.5 1.5 0 0 1 1.488 1.312 3.5 3.5 0 0 1 2.024 0A1.5 1.5 0 0 1 10.5 9H14a.5.5 0 0 1 0 1h-.085q.084.236.085.5v1a2.5 2.5 0 0 1-5 0v-.14l-.21-.07a2.5 2.5 0 0 0-1.58 0l-.21.07v.14a2.5 2.5 0 0 1-5 0zm8.5-.5h2a.5.5 0 0 1 .5.5v1a1.5 1.5 0 0 1-3 0v-1a.5.5 0 0 1 .5-.5"/></svg>`);
       break;
   case t >= 600 && t < 700:
       e(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-archive-fill" viewBox="0 0 16 16"><title>${a}</title><path d="M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15zM5.5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1M.8 1a.8.8 0 0 0-.8.8V3a.8.8 0 0 0 .8.8h14.4A.8.8 0 0 0 16 3V1.8a.8.8 0 0 0-.8-.8z"/></svg>`);
       break;
   case "trusted" == t || "vip" == t || "helper" == t:
       e(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi skull-${a} me-2" viewBox="0 0 16 16"><title>${a}</title>\n                    <g style="" transform="matrix(1, 0, 0, 1, 1, 0)">\n                    <path d="M 6.53 0.322 C 4.252 0.322 2.405 2.169 2.405 4.443 C 2.405 5.967 3.235 7.295 4.467 8.01 L 4.467 10.26 L 5.102 10.26 L 5.102 8.685 L 5.644 8.685 L 5.644 10.26 L 6.268 10.26 L 6.268 8.685 L 6.81 8.685 L 6.81 10.26 L 7.446 10.26 L 7.446 8.685 L 7.987 8.685 L 7.987 10.26 L 8.592 10.26 L 8.592 8.01 C 9.824 7.295 10.656 5.967 10.656 4.443 C 10.656 2.169 8.809 0.322 6.53 0.322 Z M 5.009 6.59 C 4.444 6.59 3.987 6.132 3.987 5.569 C 3.987 5.005 4.444 4.548 5.009 4.548 C 5.574 4.548 6.032 5.005 6.032 5.569 C 6.032 6.132 5.574 6.59 5.009 6.59 Z M 5.887 7.84 L 6.544 6.703 L 7.2 7.84 L 5.887 7.84 Z M 8.077 6.59 C 7.512 6.59 7.055 6.132 7.055 5.569 C 7.055 5.005 7.512 4.548 8.077 4.548 C 8.642 4.548 9.1 5.005 9.1 5.569 C 9.1 6.132 8.642 6.59 8.077 6.59 Z"/>\n                    <path d="M 12.196 12.935 C 12.091 12.892 11.978 12.869 11.861 12.869 C 11.488 12.869 11.145 13.096 11.007 13.433 L 10.983 13.491 L 8.158 12.345 L 10.983 11.2 L 11.007 11.258 C 11.145 11.596 11.488 11.822 11.861 11.822 C 11.977 11.822 12.09 11.8 12.196 11.756 C 12.422 11.663 12.597 11.488 12.692 11.264 C 12.786 11.039 12.787 10.791 12.694 10.566 C 12.604 10.347 12.435 10.174 12.217 10.078 L 12.161 10.054 L 12.183 9.997 C 12.271 9.776 12.271 9.533 12.181 9.314 C 12.043 8.977 11.699 8.751 11.326 8.751 C 11.209 8.751 11.096 8.773 10.991 8.817 C 10.526 9.008 10.303 9.542 10.493 10.007 L 10.518 10.066 L 6.53 11.683 L 2.542 10.066 L 2.566 10.007 C 2.757 9.541 2.533 9.008 2.069 8.817 C 1.962 8.774 1.85 8.752 1.733 8.752 C 1.36 8.752 1.017 8.977 0.878 9.314 C 0.789 9.533 0.788 9.776 0.877 9.997 L 0.899 10.054 L 0.844 10.078 C 0.625 10.174 0.455 10.348 0.365 10.566 C 0.273 10.791 0.274 11.039 0.369 11.264 C 0.462 11.489 0.639 11.664 0.863 11.755 C 0.97 11.799 1.083 11.822 1.2 11.822 C 1.572 11.822 1.915 11.596 2.053 11.258 L 2.077 11.2 L 4.901 12.345 L 2.077 13.491 L 2.053 13.433 C 1.915 13.096 1.571 12.869 1.2 12.869 C 1.083 12.869 0.97 12.891 0.864 12.935 C 0.639 13.028 0.463 13.202 0.369 13.427 C 0.275 13.653 0.274 13.9 0.365 14.125 C 0.455 14.344 0.625 14.517 0.843 14.612 L 0.899 14.637 L 0.877 14.694 C 0.788 14.916 0.789 15.158 0.878 15.376 C 1.017 15.714 1.36 15.94 1.733 15.94 C 1.849 15.94 1.962 15.918 2.069 15.874 C 2.534 15.683 2.757 15.149 2.566 14.684 L 2.542 14.625 L 6.53 13.008 L 10.518 14.625 L 10.493 14.684 C 10.303 15.148 10.525 15.683 10.991 15.874 C 11.096 15.918 11.209 15.94 11.324 15.94 C 11.325 15.94 11.325 15.94 11.325 15.94 C 11.699 15.94 12.043 15.713 12.182 15.376 C 12.271 15.158 12.272 14.916 12.183 14.694 L 12.161 14.637 L 12.217 14.612 C 12.435 14.516 12.605 14.344 12.695 14.125 C 12.885 13.659 12.662 13.126 12.196 12.935 Z" />\n                    </g>\n                    </svg>`);
       break;
   case "moderator" == t:
       e(`<img class="img-fluid me-2" src="${tpbServer}/images/moderator.gif" title="Moderator">`);
       break;
   case "supermod" == t:
       e(`<img class="img-fluid me-2" src="${tpbServer}/images/supermod.png" title="Super Moderator">`);
       break;
   case "truadminsted" == t:
       e(`<img class="img-fluid me-2" src="${tpbServer}/images/admin.gif" title="Admin">`);
       break;
   case "imdb" == t:
       e('<svg xmlns="http://www.w3.org/2000/svg" width="32" height="16" preserveAspectRatio="xMidYMid meet" viewBox="0 0 575 289.83">\n                <defs>\n                <path d="M575 24.91C573.44 12.15 563.97 1.98 551.91 0C499.05 0 76.18 0 23.32 0C10.11 2.17 0 14.16 0 28.61C0 51.84 0 237.64 0 260.86C0 276.86 12.37 289.83 27.64 289.83C79.63 289.83 495.6 289.83 547.59 289.83C561.65 289.83 573.26 278.82 575 264.57C575 216.64 575 48.87 575 24.91Z" id="d1pwhf9wy2"></path>\n                <path d="M69.35 58.24L114.98 58.24L114.98 233.89L69.35 233.89L69.35 58.24Z" id="g5jjnq26yS"></path>\n                <path d="M201.2 139.15C197.28 112.38 195.1 97.5 194.67 94.53C192.76 80.2 190.94 67.73 189.2 57.09C185.25 57.09 165.54 57.09 130.04 57.09L130.04 232.74L170.01 232.74L170.15 116.76L186.97 232.74L215.44 232.74L231.39 114.18L231.54 232.74L271.38 232.74L271.38 57.09L211.77 57.09L201.2 139.15Z" id="i3Prh1JpXt"></path>\n                <path d="M346.71 93.63C347.21 95.87 347.47 100.95 347.47 108.89C347.47 115.7 347.47 170.18 347.47 176.99C347.47 188.68 346.71 195.84 345.2 198.48C343.68 201.12 339.64 202.43 333.09 202.43C333.09 190.9 333.09 98.66 333.09 87.13C338.06 87.13 341.45 87.66 343.25 88.7C345.05 89.75 346.21 91.39 346.71 93.63ZM367.32 230.95C372.75 229.76 377.31 227.66 381.01 224.67C384.7 221.67 387.29 217.52 388.77 212.21C390.26 206.91 391.14 196.38 391.14 180.63C391.14 174.47 391.14 125.12 391.14 118.95C391.14 102.33 390.49 91.19 389.48 85.53C388.46 79.86 385.93 74.71 381.88 70.09C377.82 65.47 371.9 62.15 364.12 60.13C356.33 58.11 343.63 57.09 321.54 57.09C319.27 57.09 307.93 57.09 287.5 57.09L287.5 232.74L342.78 232.74C355.52 232.34 363.7 231.75 367.32 230.95Z" id="a4ov9rRGQm"></path>\n                <path d="M464.76 204.7C463.92 206.93 460.24 208.06 457.46 208.06C454.74 208.06 452.93 206.98 452.01 204.81C451.09 202.65 450.64 197.72 450.64 190C450.64 185.36 450.64 148.22 450.64 143.58C450.64 135.58 451.04 130.59 451.85 128.6C452.65 126.63 454.41 125.63 457.13 125.63C459.91 125.63 463.64 126.76 464.6 129.03C465.55 131.3 466.03 136.15 466.03 143.58C466.03 146.58 466.03 161.58 466.03 188.59C465.74 197.84 465.32 203.21 464.76 204.7ZM406.68 231.21L447.76 231.21C449.47 224.5 450.41 220.77 450.6 220.02C454.32 224.52 458.41 227.9 462.9 230.14C467.37 232.39 474.06 233.51 479.24 233.51C486.45 233.51 492.67 231.62 497.92 227.83C503.16 224.05 506.5 219.57 507.92 214.42C509.34 209.26 510.05 201.42 510.05 190.88C510.05 185.95 510.05 146.53 510.05 141.6C510.05 131 509.81 124.08 509.34 120.83C508.87 117.58 507.47 114.27 505.14 110.88C502.81 107.49 499.42 104.86 494.98 102.98C490.54 101.1 485.3 100.16 479.26 100.16C474.01 100.16 467.29 101.21 462.81 103.28C458.34 105.35 454.28 108.49 450.64 112.7C450.64 108.89 450.64 89.85 450.64 55.56L406.68 55.56L406.68 231.21Z" id="fk968BpsX"></path>\n                </defs>\n                <g><g><g><use xlink:href="#d1pwhf9wy2" opacity="1" fill="#f6c700" fill-opacity="1"></use>\n                <g><use xlink:href="#d1pwhf9wy2" opacity="1" fill-opacity="0" stroke="#000000" stroke-width="1" stroke-opacity="0"></use></g></g>\n                <g><use xlink:href="#g5jjnq26yS" opacity="1" fill="#000000" fill-opacity="1"></use>\n                <g><use xlink:href="#g5jjnq26yS" opacity="1" fill-opacity="0" stroke="#000000" stroke-width="1" stroke-opacity="0"></use></g></g>\n                <g><use xlink:href="#i3Prh1JpXt" opacity="1" fill="#000000" fill-opacity="1"></use>\n                <g><use xlink:href="#i3Prh1JpXt" opacity="1" fill-opacity="0" stroke="#000000" stroke-width="1" stroke-opacity="0"></use></g></g>\n                <g><use xlink:href="#a4ov9rRGQm" opacity="1" fill="#000000" fill-opacity="1"></use>\n                <g><use xlink:href="#a4ov9rRGQm" opacity="1" fill-opacity="0" stroke="#000000" stroke-width="1" stroke-opacity="0"></use></g></g>\n                <g><use xlink:href="#fk968BpsX" opacity="1" fill="#000000" fill-opacity="1"></use>\n                <g><use xlink:href="#fk968BpsX" opacity="1" fill-opacity="0" stroke="#000000" stroke-width="1" stroke-opacity="0"></use></g></g></g></g>\n                </svg>');
       break;
   case "magnet" == t:
       e('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 133.151 120.754" width="32" height="16" >\n                <defs>\n                <radialGradient r="120.088" id="b" gradientUnits="userSpaceOnUse" gradientTransform="matrix(-1,0,0,-1,140.383,123.032)" cy="24.221" cx="39.756">\n                <stop offset="0" stop-color="#e88080"/>\n                <stop offset=".618" stop-color="#de4848"/>\n                <stop offset="1" stop-color="#d82a2a"/>\n                </radialGradient>\n                <linearGradient y2="583.931" y1="583.931" x2="-266.236" x1="-268.138" id="a" gradientUnits="userSpaceOnUse" gradientTransform="matrix(0,12.2047,12.2047,0,-7060.14,3307.92)">\n                <stop offset="0" stop-color="#919191"/>\n                <stop offset=".006" stop-color="#919191"/>\n                <stop offset="1" stop-color="#bf0d00"/>\n                </linearGradient>\n                <radialGradient xlink:href="#b" id="c" gradientUnits="userSpaceOnUse" gradientTransform="matrix(-1,0,0,-1,140.383,123.032)" cx="39.756" cy="24.221" r="120.088"/>\n                <linearGradient xlink:href="#a" id="d" gradientUnits="userSpaceOnUse" gradientTransform="matrix(0,12.2047,12.2047,0,-7060.14,3307.92)" x1="-268.138" y1="583.931" x2="-266.236" y2="583.931"/>\n                </defs>\n                <g transform="matrix(-0.96221313,0,0,-0.96221313,131.47243,118.74174)">\n                <path d="M67.697 119.816c34.942 0 61.557-25.644 64.317-60.226 1.58-19.809-.918-40.315-10.865-57.748-2.611-1.459-10.149 0-13.112 0-2.762 0-9.751-1.393-11.364 1.805-2.679 5.304.127 14.024 1.094 19.446 1.58 8.87 2.682 17.375 1.955 26.402-1.055 13.087-5.894 24.534-19.752 27.513-11.812 2.534-29.275 2.516-38.254-6.962-10.009-10.56-9.025-29.173-6.17-42.251 1.498-6.867 5.557-16.31 3.709-23.4C38.152.16 29.883 1.76 26.766 1.724 22.368 1.669 13.742-.486 11.5 3.723 6.034 13.971 2.801 24.95 1.681 36.504c-2.077 21.434.329 43.468 14.701 60.471 12.653 14.969 31.89 22.841 51.315 22.841" fill="url(#c)"/>\n                <path d="M131.271 37.805c-.921-9.047-2.576-18.107-5.783-26.644-.451-1.198-3.217-9.319-4.482-9.319h-5.464c-7.674 0-19.95-3.54-19.67 7.253.196 7.574 2.227 15.067 3.336 22.535.972 6.537.015 6.175 6.214 6.175h25.849m-97.403 0c.879-9.923 4.827-19.351 5.59-29.268.528-6.865-2.948-6.692-8.424-6.762-6.071-.075-12.141-.15-18.215-.229-1.897-.021-5.837 12.645-6.427 14.433-2.328 7.068-3.79 14.417-4.478 21.826h31.954" fill="#e5e5e5"/>\n                <path d="M133.151 52.608c0-10.226-.443-20.501-2.961-30.46-1.778-7.036-4.261-21.252-12.984-21.252-5.15 0-12.748-1.488-17.681 0-8.931.117-2.733 21.604-1.993 25.854 2.313 13.259 4.679 35.693-7.748 45.308-9.198 7.116-26.049 6.385-36.661 3.605-14.101-3.694-17.855-16.999-18.438-30.15-.482-10.933 2.844-21.026 4.875-31.644.629-3.289 1.903-8.387-.223-11.428C37.755.184 33.678.863 31.339.834c-3.758-.05-17.574-2.428-19.856 1.079-5.478 8.402-8.478 19.782-9.991 29.59-2.938 19.016-2.112 39.8 7.687 56.819 14.843 25.779 46.697 37.219 75.123 30.58 30.927-7.221 48.849-35.539 48.849-66.294m-1.727 0c0 34.868-23.729 64.123-59.447 66.145C37.28 120.713 6.675 96.957 2.45 62.03c-2.452-20.264.894-41.61 10.756-59.532 4.763.054 9.524.121 14.288.179 5.757.073 11.807-1.636 11.066 6.204-1.795 18.971-10.708 37.671-1.376 56.317 6.123 12.234 19.971 14.055 32.323 13.841 11.007-.192 22.358-2.571 27.422-13.456 7.411-15.931 2.739-34.001.395-50.421-.737-5.166-2.33-12.374 4.52-12.374h17.051c5.063 0 8.566 15.372 9.658 19.741 2.458 9.829 2.871 19.991 2.871 30.079" fill="url(#d)"/>\n                <path d="M13.842 83.873c0 2.83 9.374 10.294 11.391 12.021 10.726 9.183 24.172 14.539 38.305 15.052 14.944.539 29.649-3.849 42.247-11.796 4.328-2.729 8.4-5.854 12.21-9.27.515-.461 3.912-4.399 4.675-4.179.612.177-12.533 14.285-13.504 15.072-12.204 9.93-27.383 15.891-43.197 15.891-14.793 0-28.845-5.701-39.604-15.808-3.493-3.28-12.523-11.481-12.523-16.983" fill="#ffa3a3"/>\n                <path d="M34.692 64.009c.196 2.275 6.695 7.454 8.483 8.884 8.192 6.55 18.279 8.777 28.609 7.948 9.901-.796 26.275-5.766 29.778-16.91-3.592 11.425-14.2 19.624-25.682 21.923-15.078 3.015-39.553-3-41.188-21.845" fill="#b20d0d"/>\n                <path d="M102.4 8.009c2.229-4.608 16.587 7.405 16.066 9.742.063-.283-4.482-2.673-5.126-2.601-1.48.167 6.305 14.689 7.322 14.479-3.646.757-11.687-5.402-13.663-8.28-1.714-2.495-6.164-10.088-4.599-13.34M19.027 34.021c-1.422-1.771-3.179-3.533-5.267-4.493-4.374-2.012-3.681 2.63-6.319 3.368 1.683-.471 4.898-27.082 11.962-19.839 4.221 4.326 13.22 27.401-.376 20.964" fill="#fff"/>\n                </g>\n                </svg>');
       break;
   default:
       e("")
   }
}
))
 , filterList = ()=>{
   let t, e, a, o, n, s, r, l, i, c, d, p, b, h, u, g, m, w, v, f, y, C = 1;
   for (r = "",
   l = document.getElementById("720p").checked ? "720P" : "",
   i = document.getElementById("1080p").checked ? "1080P" : "",
   c = document.getElementById("2160p").checked ? "2160P" : "",
   d = document.getElementById("x264").checked ? "X264" : "",
   p = document.getElementById("h264").checked ? "H264" : "",
   b = document.getElementById("x265").checked ? "X265" : "",
   h = document.getElementById("h265").checked ? "H265" : "",
   u = document.getElementById("HDR").checked ? "HDR " : "",
   g = document.getElementById("HEVC").checked ? "HEVC" : "",
   m = document.getElementById("WEBRip").checked ? "WEBRIP" : "",
   w = document.getElementById("BluRay").checked ? "BLURAY" : "",
   0 == l.length && 0 == i.length && 0 == c.length && 0 == d.length && 0 == p.length && 0 == b.length && 0 == h.length && 0 == u.length && 0 == g.length && 0 == m.length && 0 == w.length && (C = 0),
   t = document.getElementById("tpbc-flist"),
   e = t.value.toUpperCase(),
   a = document.getElementsByClassName("d-table-row"),
   n = 0; n < a.length; n++)
       a[n].classList.remove("d-none"),
       v = 0,
       f = 0,
       o = a[n].getElementsByTagName("td")[1],
       y = o.textContent || o.innerText,
       s = y.toUpperCase(),
       C ? (l.length > 0 && -1 !== s.indexOf(l, 0) && (f = 1),
       i.length > 0 && -1 !== s.indexOf(i, 0) && (f = 1),
       c.length > 0 && -1 !== s.indexOf(c, 0) && (f = 1),
       d.length > 0 && -1 !== s.indexOf(d, 0) && (f = 1),
       p.length > 0 && -1 !== s.indexOf(p, 0) && (f = 1),
       b.length > 0 && -1 !== s.indexOf(b, 0) && (f = 1),
       h.length > 0 && -1 !== s.indexOf(h, 0) && (f = 1),
       u.length > 0 && -1 !== s.indexOf(u, 0) && (f = 1),
       g.length > 0 && -1 !== s.indexOf(g, 0) && (f = 1),
       m.length > 0 && -1 !== s.indexOf(m, 0) && (f = 1),
       w.length > 0 && -1 !== s.indexOf(w, 0) && (f = 1)) : f = 1,
       s.indexOf(e) > -1 && (v = 1),
       1 == f && 1 == v ? a[n].classList.remove("d-none") : a[n].classList.add("d-none")
}
 , tpbcSort = (t,e)=>{
   if (0 == e)
       return;
   const a = (t,a)=>4 == e ? t.children[a].dataset.tpbcTEpoch : 5 == e ? t.children[a].dataset.tpbcTSize : t.children[a].innerText || t.children[a].textContent
     , o = t.target
     , n = o.closest("table").querySelector("tbody");
   var s, r;
   Array.from(n.querySelectorAll("tr")).sort((s = Array.from(o.parentElement.children).indexOf(o),
   r = this.asc = !this.asc,
   (t,e)=>{
       return o = a(r ? t : e, s),
       n = a(r ? e : t, s),
       "" === o || "" === n || isNaN(o) || isNaN(n) ? o.toString().localeCompare(n) : o - n;
       var o, n
   }
   )).forEach((t=>n.appendChild(t)))
}
 , makeXXX = ()=>{
   const t = document.createElement("a");
   t.alt = "Porn",
   t.title = "Porn",
   t.setAttribute("role", "button"),
   t.href = "#PornNotify";
   return t.innerHTML = '<img class="ms-3" style="max-height:1.3125rem;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAA7AAAAOwBeShxvQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAYQSURBVFiFzZZdbFzFFcd/M/fe/bi7a3vXCqmdj35EqAY5fqChREpFSQAlilQCKLbkl0iRcCRecJRA1KalttVWqERNaPtUcKIgVELlQklRG0jjNiCFQGNXwbZipJDS1hiCa+8u3u+7e2f6sN6brO3dEFSp/b/NOTPn/7/nnjln4H8M8Xk36s5OIynEJqn1Dq31JmlZ64QQTUoprV03AfwdIc4ppU5GhXhbDA25/xUBU52dwQj0StN8wrLtmBUMYvj9nr+YzZKdnV18bAatf5YS4pdrhoZyX1hAsqurSxrGz/0NDV/yhcMAuI5DKZdDuS7KdXEdB+3W/NgpYF/T0NBvb0qABpHs6urz2/YPA7GYEEAhlcJJp1GlUj3Ny4fT+unG9vaDor9f3VCA7u+Xn01MvBSIxTr9kQilfJ5cPI4qlVC2TWH9enLr1+OuXInb1ASAkUxifvopgfFx/GNjyNzSrBdSuXduWdt6t3j22WJdAcnOzqcC0eh3/ZEITjpNLpEA0yS9eTPpe+9FBwJ1P1fkcoSHhwmfPQvFMlc+maUwn8UMWKOr3jy9oaaAZFdXl8+2fxNsbqYwP08+mUQ1NBDv6aG4dm1d4sWwpqeJPvccxQ+nKcxnPbuvIXi45U9/3L9EwFRnZ7DJND8ItbS0uoUCmZkZVFMT/963D9XYeFPkXvBEgsDjTyLiCc8mDemKICtXDw/PAciKI6L1Xl9jY6sAcvE4WBbxnp665PPJJPPJZE2/jkYpfG8fWJZnU64yDHzHPZFQbjIp05yJtLbGKqlPbd1Kevt2AJ7u6wPgwMAAAOlUil8dOcL7ExMA3N7RQU9vL+FIZFkh1gsvYb3y2rUsSKlWN/lscepUQQIk4VuWbceA8lWzbTJbtngHLk9Ocnly0lu/ePQo709MELRtfH4/l8bGOHHsWM1MFB9+AB0KXcuCUvKqIx6BhV8gtd5hBYO4joMqlch3dNSt9vdGRwHoO3SIvkOHqmzLImTj3lVV/OiSu8sToIXYZPj9lPJ5APLt7bWDAbZtAzA2OsrExYsAVelPp1KcPX2adCrl2dw776iK4SrV5gmQprkO8Lqc29JSV8DmbdsAePHYMS/1m7du9fxvnTnDrwcHeevMGc+m1qyqDqJ0CMAEEFI2AKiFnu7WKKYKPpmeBsC3MJScQoHpqSmgXLCVevndiRNcGhvj8b4+aI5W87vK8ARo19XFTAbXceoSV/DeyAgAP37mGQAOPPooFy9cqHtGK121rjQgWVbjfpadm/OmmjE/XzdYLlvubNHmZqLNzVW2AwMDPNTdDcBD3d3lr6fclKpgCBcWMgBcAVZUfObVq5RWrOCL4u777iMUDvONjRs9m5yartojpMxApRMKce56Z2B8vC6BvXCn47OzxBceI/Z19zwcifDt+++vuhnGX6uvqTSNS7CQAaXUSSmENyD84+OIXA4dDC4r4PaODkbOn+fJvXurbLUgMtklAoQpn4eFDESFeBuY8dRls4SHh73Nt7a1cettt3nr7t27aWtvx3EcHMehrb2d7t27awowXz6JyFybiFJK1fLV1UfhummY3LnzAEL8tLLWpslcb2/dMVxpNLVmAIC8fIXA93/kvQ0AfLb/9y1/eX2HlwGAxnD4F8C/KmtRKhEbHFxavdchHInUJ5+dw//U4SpyaUi35NNeujwB4vjxPLAf8C6s889PCOz/AfLylZokNck//Af+gwOIRPW4NgO+I2veeCPu8S4+mNy58ycIcbDyjALAsih+ZxvFhx+AkF2XWGSymC+fxHrtdVj0gDUD1siqN0/fWbV/cQDd3y9n3hk5l09kNi7xhUK4d21AffMO3NWt0BwrO+biyKmPMS6MYrw7UlVwHrnfmmpt+8q6Gz5KAfQ995gfad95lS9uWM5/s7ACvr+1fP3LGxeT1xRQwcdbth0u5YuP6YXBcbMQpuFafutIy59PPVFzz42CJB58sCk7n3tB5UrblVLyRvuhfM/NoO8PgQb/ruirr9Z+NH4eARXoPXusq1c+2oNyd5VKqk0rFdJKGwBCCldImTENOSlN+fwtX1szuFy6/y/xHxH8c+vRJ6ZwAAAAAElFTkSuQmCC" />',
   t.addEventListener("click", (t=>{
       t.preventDefault()
   }
   )),
   t
}
 , makeIMDb = t=>{
   if (null === t)
       return;
   const e = document.createElement("a");
   e.href = `https://www.imdb.com/title/${t}/`,
   e.target = "_blank",
   e.alt = "IMDb",
   e.title = "IMDb";
   return e.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="16" viewBox="0 0 575 289.83">\n                <defs>\n                <path d="M575 24.91C573.44 12.15 563.97 1.98 551.91 0C499.05 0 76.18 0 23.32 0C10.11 2.17 0 14.16 0 28.61C0 51.84 0 237.64 0 260.86C0 276.86 12.37 289.83 27.64 289.83C79.63 289.83 495.6 289.83 547.59 289.83C561.65 289.83 573.26 278.82 575 264.57C575 216.64 575 48.87 575 24.91Z" id="d1pwhf9wy2"></path>\n                <path d="M69.35 58.24L114.98 58.24L114.98 233.89L69.35 233.89L69.35 58.24Z" id="g5jjnq26yS"></path>\n                <path d="M201.2 139.15C197.28 112.38 195.1 97.5 194.67 94.53C192.76 80.2 190.94 67.73 189.2 57.09C185.25 57.09 165.54 57.09 130.04 57.09L130.04 232.74L170.01 232.74L170.15 116.76L186.97 232.74L215.44 232.74L231.39 114.18L231.54 232.74L271.38 232.74L271.38 57.09L211.77 57.09L201.2 139.15Z" id="i3Prh1JpXt"></path>\n                <path d="M346.71 93.63C347.21 95.87 347.47 100.95 347.47 108.89C347.47 115.7 347.47 170.18 347.47 176.99C347.47 188.68 346.71 195.84 345.2 198.48C343.68 201.12 339.64 202.43 333.09 202.43C333.09 190.9 333.09 98.66 333.09 87.13C338.06 87.13 341.45 87.66 343.25 88.7C345.05 89.75 346.21 91.39 346.71 93.63ZM367.32 230.95C372.75 229.76 377.31 227.66 381.01 224.67C384.7 221.67 387.29 217.52 388.77 212.21C390.26 206.91 391.14 196.38 391.14 180.63C391.14 174.47 391.14 125.12 391.14 118.95C391.14 102.33 390.49 91.19 389.48 85.53C388.46 79.86 385.93 74.71 381.88 70.09C377.82 65.47 371.9 62.15 364.12 60.13C356.33 58.11 343.63 57.09 321.54 57.09C319.27 57.09 307.93 57.09 287.5 57.09L287.5 232.74L342.78 232.74C355.52 232.34 363.7 231.75 367.32 230.95Z" id="a4ov9rRGQm"></path>\n                <path d="M464.76 204.7C463.92 206.93 460.24 208.06 457.46 208.06C454.74 208.06 452.93 206.98 452.01 204.81C451.09 202.65 450.64 197.72 450.64 190C450.64 185.36 450.64 148.22 450.64 143.58C450.64 135.58 451.04 130.59 451.85 128.6C452.65 126.63 454.41 125.63 457.13 125.63C459.91 125.63 463.64 126.76 464.6 129.03C465.55 131.3 466.03 136.15 466.03 143.58C466.03 146.58 466.03 161.58 466.03 188.59C465.74 197.84 465.32 203.21 464.76 204.7ZM406.68 231.21L447.76 231.21C449.47 224.5 450.41 220.77 450.6 220.02C454.32 224.52 458.41 227.9 462.9 230.14C467.37 232.39 474.06 233.51 479.24 233.51C486.45 233.51 492.67 231.62 497.92 227.83C503.16 224.05 506.5 219.57 507.92 214.42C509.34 209.26 510.05 201.42 510.05 190.88C510.05 185.95 510.05 146.53 510.05 141.6C510.05 131 509.81 124.08 509.34 120.83C508.87 117.58 507.47 114.27 505.14 110.88C502.81 107.49 499.42 104.86 494.98 102.98C490.54 101.1 485.3 100.16 479.26 100.16C474.01 100.16 467.29 101.21 462.81 103.28C458.34 105.35 454.28 108.49 450.64 112.7C450.64 108.89 450.64 89.85 450.64 55.56L406.68 55.56L406.68 231.21Z" id="fk968BpsX"></path>\n                </defs>\n                <g><g><g><use xlink:href="#d1pwhf9wy2" opacity="1" fill="#f6c700" fill-opacity="1"></use>\n                <g><use xlink:href="#d1pwhf9wy2" opacity="1" fill-opacity="0" stroke="#000000" stroke-width="1" stroke-opacity="0"></use></g></g>\n                <g><use xlink:href="#g5jjnq26yS" opacity="1" fill="#000000" fill-opacity="1"></use>\n                <g><use xlink:href="#g5jjnq26yS" opacity="1" fill-opacity="0" stroke="#000000" stroke-width="1" stroke-opacity="0"></use></g></g>\n                <g><use xlink:href="#i3Prh1JpXt" opacity="1" fill="#000000" fill-opacity="1"></use>\n                <g><use xlink:href="#i3Prh1JpXt" opacity="1" fill-opacity="0" stroke="#000000" stroke-width="1" stroke-opacity="0"></use></g></g>\n                <g><use xlink:href="#a4ov9rRGQm" opacity="1" fill="#000000" fill-opacity="1"></use>\n                <g><use xlink:href="#a4ov9rRGQm" opacity="1" fill-opacity="0" stroke="#000000" stroke-width="1" stroke-opacity="0"></use></g></g>\n                <g><use xlink:href="#fk968BpsX" opacity="1" fill="#000000" fill-opacity="1"></use>\n                <g><use xlink:href="#fk968BpsX" opacity="1" fill-opacity="0" stroke="#000000" stroke-width="1" stroke-opacity="0"></use></g></g></g></g>\n                </svg>',
   e
}
 , makeMagnet = (t,e)=>{
   if (null === t)
       return;
   const a = document.createElement("a");
   a.classList.add("ms-1"),
   a.href = `magnet:?xt=urn:btih:${t}&dn=${e}%20-%20Powered%20by%20The%20Pirate%20Bay%20Cleaner&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce&tr=udp%3A%2F%2Ftracker.bittor.pw%3A1337%2Fannounce&tr=udp%3A%2F%2Fpublic.popcorn-tracker.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.dler.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fexodus.desync.com%3A6969&tr=udp%3A%2F%2Fopen.demonii.com%3A1337%2Fannounce`,
   a.alt = "Download",
   a.title = "Download";
   return a.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="16" viewBox="0 0 133.151 120.754" >\n                <defs>\n                <radialGradient r="120.088" id="b" gradientUnits="userSpaceOnUse" gradientTransform="matrix(-1,0,0,-1,140.383,123.032)" cy="24.221" cx="39.756">\n                <stop offset="0" stop-color="#e88080"/>\n                <stop offset=".618" stop-color="#de4848"/>\n                <stop offset="1" stop-color="#d82a2a"/>\n                </radialGradient>\n                <linearGradient y2="583.931" y1="583.931" x2="-266.236" x1="-268.138" id="a" gradientUnits="userSpaceOnUse" gradientTransform="matrix(0,12.2047,12.2047,0,-7060.14,3307.92)">\n                <stop offset="0" stop-color="#919191"/>\n                <stop offset=".006" stop-color="#919191"/>\n                <stop offset="1" stop-color="#bf0d00"/>\n                </linearGradient>\n                <radialGradient xlink:href="#b" id="c" gradientUnits="userSpaceOnUse" gradientTransform="matrix(-1,0,0,-1,140.383,123.032)" cx="39.756" cy="24.221" r="120.088"/>\n                <linearGradient xlink:href="#a" id="d" gradientUnits="userSpaceOnUse" gradientTransform="matrix(0,12.2047,12.2047,0,-7060.14,3307.92)" x1="-268.138" y1="583.931" x2="-266.236" y2="583.931"/>\n                </defs>\n                <g transform="matrix(-0.96221313,0,0,-0.96221313,131.47243,118.74174)">\n                <path d="M67.697 119.816c34.942 0 61.557-25.644 64.317-60.226 1.58-19.809-.918-40.315-10.865-57.748-2.611-1.459-10.149 0-13.112 0-2.762 0-9.751-1.393-11.364 1.805-2.679 5.304.127 14.024 1.094 19.446 1.58 8.87 2.682 17.375 1.955 26.402-1.055 13.087-5.894 24.534-19.752 27.513-11.812 2.534-29.275 2.516-38.254-6.962-10.009-10.56-9.025-29.173-6.17-42.251 1.498-6.867 5.557-16.31 3.709-23.4C38.152.16 29.883 1.76 26.766 1.724 22.368 1.669 13.742-.486 11.5 3.723 6.034 13.971 2.801 24.95 1.681 36.504c-2.077 21.434.329 43.468 14.701 60.471 12.653 14.969 31.89 22.841 51.315 22.841" fill="url(#c)"/>\n                <path d="M131.271 37.805c-.921-9.047-2.576-18.107-5.783-26.644-.451-1.198-3.217-9.319-4.482-9.319h-5.464c-7.674 0-19.95-3.54-19.67 7.253.196 7.574 2.227 15.067 3.336 22.535.972 6.537.015 6.175 6.214 6.175h25.849m-97.403 0c.879-9.923 4.827-19.351 5.59-29.268.528-6.865-2.948-6.692-8.424-6.762-6.071-.075-12.141-.15-18.215-.229-1.897-.021-5.837 12.645-6.427 14.433-2.328 7.068-3.79 14.417-4.478 21.826h31.954" fill="#e5e5e5"/>\n                <path d="M133.151 52.608c0-10.226-.443-20.501-2.961-30.46-1.778-7.036-4.261-21.252-12.984-21.252-5.15 0-12.748-1.488-17.681 0-8.931.117-2.733 21.604-1.993 25.854 2.313 13.259 4.679 35.693-7.748 45.308-9.198 7.116-26.049 6.385-36.661 3.605-14.101-3.694-17.855-16.999-18.438-30.15-.482-10.933 2.844-21.026 4.875-31.644.629-3.289 1.903-8.387-.223-11.428C37.755.184 33.678.863 31.339.834c-3.758-.05-17.574-2.428-19.856 1.079-5.478 8.402-8.478 19.782-9.991 29.59-2.938 19.016-2.112 39.8 7.687 56.819 14.843 25.779 46.697 37.219 75.123 30.58 30.927-7.221 48.849-35.539 48.849-66.294m-1.727 0c0 34.868-23.729 64.123-59.447 66.145C37.28 120.713 6.675 96.957 2.45 62.03c-2.452-20.264.894-41.61 10.756-59.532 4.763.054 9.524.121 14.288.179 5.757.073 11.807-1.636 11.066 6.204-1.795 18.971-10.708 37.671-1.376 56.317 6.123 12.234 19.971 14.055 32.323 13.841 11.007-.192 22.358-2.571 27.422-13.456 7.411-15.931 2.739-34.001.395-50.421-.737-5.166-2.33-12.374 4.52-12.374h17.051c5.063 0 8.566 15.372 9.658 19.741 2.458 9.829 2.871 19.991 2.871 30.079" fill="url(#d)"/>\n                <path d="M13.842 83.873c0 2.83 9.374 10.294 11.391 12.021 10.726 9.183 24.172 14.539 38.305 15.052 14.944.539 29.649-3.849 42.247-11.796 4.328-2.729 8.4-5.854 12.21-9.27.515-.461 3.912-4.399 4.675-4.179.612.177-12.533 14.285-13.504 15.072-12.204 9.93-27.383 15.891-43.197 15.891-14.793 0-28.845-5.701-39.604-15.808-3.493-3.28-12.523-11.481-12.523-16.983" fill="#ffa3a3"/>\n                <path d="M34.692 64.009c.196 2.275 6.695 7.454 8.483 8.884 8.192 6.55 18.279 8.777 28.609 7.948 9.901-.796 26.275-5.766 29.778-16.91-3.592 11.425-14.2 19.624-25.682 21.923-15.078 3.015-39.553-3-41.188-21.845" fill="#b20d0d"/>\n                <path d="M102.4 8.009c2.229-4.608 16.587 7.405 16.066 9.742.063-.283-4.482-2.673-5.126-2.601-1.48.167 6.305 14.689 7.322 14.479-3.646.757-11.687-5.402-13.663-8.28-1.714-2.495-6.164-10.088-4.599-13.34M19.027 34.021c-1.422-1.771-3.179-3.533-5.267-4.493-4.374-2.012-3.681 2.63-6.319 3.368 1.683-.471 4.898-27.082 11.962-19.839 4.221 4.326 13.22 27.401-.376 20.964" fill="#fff"/>\n                </g>\n                </svg>',
   a.addEventListener("click", (t=>{
       (async()=>{
           if (!0 === await GM.getValue("RememberDownloaded", !0)) {
               const e = t.target.closest("tr")
                 , a = e.dataset.tpbcTInfohash
                 , o = await GM.getValue("DownloadedTorrents", "[]");
               let n = JSON.parse(o);
               n.push(a),
               n = [...new Set(n)],
               await GM.setValue("DownloadedTorrents", `${JSON.stringify(n)}`),
               e.classList.add("text-decoration-line-through"),
               console.debug(a, n)
           }
       }
       )()
   }
   )),
   a
}
 , pingTPB = async()=>new Promise((t=>{
   (async()=>{
       const e = await fetch("https://thepiratebay.org/browse.php");
       e.status >= 200 && e.status < 400 ? t(JSON.parse(`{"siteDown": false, "status": ${e.status} }`)) : t(JSON.parse(`{"siteDown": true, "status": ${e.status} }`))
   }
   )()
}
))
 , getData = async(t,e=!1)=>{
   const a = window.event
     , o = t.split(":");
   let n = o[0] || o
     , s = o[1] || 0
     , r = document.getElementById("h2") || "";
   try {
       r = r.textContent.trim().replace(" Torrents", "")
   } catch {}
   let l, i = o[2] || void 0, c = "", d = "", p = "", b = "", h = Number(s.split("_")[1] || -1);
   console.debug("getData:", n, s, i, h);
   const u = await pingTPB();
   if (u.siteDown) {
       document.title = "The Pirate Bay Cleaner :: OFFLINE";
       const t = 300;
       d = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-moon-stars-fill" viewBox="0 0 16 16"><path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278"/><path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.73 1.73 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.73 1.73 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.73 1.73 0 0 0 1.097-1.097zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.16 1.16 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.16 1.16 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732z"/></svg>',
       p = "The Pirate Bay is Currently Offline",
       await setContent(`<h2 class="h2" id="h2" TITLE="Status Code: ${u.status}">${d} ${p}</h2><hr>`, 0),
       await setContent(`<div class="h3" id="upCheck">Rechecking in <span>${t}</span> seconds.</div>`, 1);
       const e = document.querySelectorAll("form, button.btn, a.nav-link, input");
       for (let t = 0; t < e.length && !e[t].classList.contains("fixed-bottom-left"); t++)
           e[t].classList.add("disabled"),
           e[t].setAttribute("disabled", "disabled");
       const a = document.getElementById("upCheck").children[0];
       let o = Number(a.textContent);
       return void setInterval((()=>{
           o >= 0 ? a.textContent = o-- : location.reload()
       }
       ), 1e3)
   }
   switch (b = a.isTrusted ? a.target.textContent : r,
   n) {
   case "top100":
       switch (!0) {
       case "recent" == s:
           i = "0" === i || void 0 === i ? "" : `_${i}`,
           c = `${tpbApi}/precompiled/data_${n}_${s}${i}.json`,
           i = i.replace(/\D/g, ""),
           p = "Recent Torrents",
           d = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cloud-arrow-up-fill" viewBox="0 0 16 16"><path d="M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2m2.354 5.146a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0z"/></svg>';
           break;
       case s.startsWith("48h"):
           p = `${b} Torrents`,
           c = `${tpbApi}/precompiled/data_top100_${s}.json`,
           d = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock-history" viewBox="0 0 16 16"><path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022zm2.004.45a7 7 0 0 0-.985-.299l.219-.976q.576.129 1.126.342zm1.37.71a7 7 0 0 0-.439-.27l.493-.87a8 8 0 0 1 .979.654l-.615.789a7 7 0 0 0-.418-.302zm1.834 1.79a7 7 0 0 0-.653-.796l.724-.69q.406.429.747.91zm.744 1.352a7 7 0 0 0-.214-.468l.893-.45a8 8 0 0 1 .45 1.088l-.95.313a7 7 0 0 0-.179-.483m.53 2.507a7 7 0 0 0-.1-1.025l.985-.17q.1.58.116 1.17zm-.131 1.538q.05-.254.081-.51l.993.123a8 8 0 0 1-.23 1.155l-.964-.267q.069-.247.12-.501m-.952 2.379q.276-.436.486-.908l.914.405q-.24.54-.555 1.038zm-.964 1.205q.183-.183.35-.378l.758.653a8 8 0 0 1-.401.432z"/><path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0z"/><path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5"/></svg>';
           break;
       default:
           p = `${b} Torrents`,
           c = `${tpbApi}/precompiled/data_top100_${s}.json`,
           d = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trophy-fill" viewBox="0 0 16 16"><path d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5q0 .807-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33 33 0 0 1 2.5.5m.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935m10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935"/></svg>'
       }
       break;
   case "category":
       switch (i = i || 0,
       c = `${tpbApi}/q.php?q=${n}%3A${s}%3A${i}`,
       p = `${b} Torrents`,
       s) {
       case "100":
       case "101":
       case "102":
       case "103":
       case "104":
       case "199":
           d = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi" viewBox="0 0 16 16"><path d="M6 13c0 1.105-1.12 2-2.5 2S1 14.105 1 13s1.12-2 2.5-2 2.5.896 2.5 2m9-2c0 1.105-1.12 2-2.5 2s-2.5-.895-2.5-2 1.12-2 2.5-2 2.5.895 2.5 2"/><path fill-rule="evenodd" d="M14 11V2h1v9zM6 3v10H5V3z"/><path d="M5 2.905a1 1 0 0 1 .9-.995l8-.8a1 1 0 0 1 1.1.995V3L5 4z"/></svg>';
           break;
       case "200":
       case "201":
       case "202":
       case "203":
       case "204":
       case "205":
       case "206":
       case "207":
       case "208":
       case "209":
       case "210":
       case "211":
       case "212":
       case "299":
           d = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi" viewBox="0 0 16 16"><path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z"/></svg>';
           break;
       case "300":
       case "301":
       case "302":
       case "303":
       case "304":
       case "305":
       case "306":
       case "399":
           d = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi" viewBox="0 0 16 16"><path d="M6.555 1.375 0 2.237v5.45h6.555zM0 13.795l6.555.933V8.313H0zm7.278-5.4.026 6.378L16 16V8.395zM16 0 7.33 1.244v6.414H16z"/></svg>';
           break;
       case "400":
       case "401":
       case "402":
       case "403":
       case "404":
       case "405":
       case "406":
       case "407":
       case "408":
       case "499":
           d = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi" viewBox="0 0 16 16"><path d="M11.5 6.027a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m-1.5 1.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1m2.5-.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m-1.5 1.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1m-6.5-3h1v1h1v1h-1v1h-1v-1h-1v-1h1z"/><path d="M3.051 3.26a.5.5 0 0 1 .354-.613l1.932-.518a.5.5 0 0 1 .62.39c.655-.079 1.35-.117 2.043-.117.72 0 1.443.041 2.12.126a.5.5 0 0 1 .622-.399l1.932.518a.5.5 0 0 1 .306.729q.211.136.373.297c.408.408.78 1.05 1.095 1.772.32.733.599 1.591.805 2.466s.34 1.78.364 2.606c.024.816-.059 1.602-.328 2.21a1.42 1.42 0 0 1-1.445.83c-.636-.067-1.115-.394-1.513-.773-.245-.232-.496-.526-.739-.808-.126-.148-.25-.292-.368-.423-.728-.804-1.597-1.527-3.224-1.527s-2.496.723-3.224 1.527c-.119.131-.242.275-.368.423-.243.282-.494.575-.739.808-.398.38-.877.706-1.513.773a1.42 1.42 0 0 1-1.445-.83c-.27-.608-.352-1.395-.329-2.21.024-.826.16-1.73.365-2.606.206-.875.486-1.733.805-2.466.315-.722.687-1.364 1.094-1.772a2.3 2.3 0 0 1 .433-.335l-.028-.079zm2.036.412c-.877.185-1.469.443-1.733.708-.276.276-.587.783-.885 1.465a14 14 0 0 0-.748 2.295 12.4 12.4 0 0 0-.339 2.406c-.022.755.062 1.368.243 1.776a.42.42 0 0 0 .426.24c.327-.034.61-.199.929-.502.212-.202.4-.423.615-.674.133-.156.276-.323.44-.504C4.861 9.969 5.978 9.027 8 9.027s3.139.942 3.965 1.855c.164.181.307.348.44.504.214.251.403.472.615.674.318.303.601.468.929.503a.42.42 0 0 0 .426-.241c.18-.408.265-1.02.243-1.776a12.4 12.4 0 0 0-.339-2.406 14 14 0 0 0-.748-2.295c-.298-.682-.61-1.19-.885-1.465-.264-.265-.856-.523-1.733-.708-.85-.179-1.877-.27-2.913-.27s-2.063.091-2.913.27"/></svg>';
           break;
       case "500":
       case "501":
       case "502":
       case "503":
       case "504":
       case "505":
       case "506":
       case "507":
       case "599":
           d = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi" viewBox="0 0 16 16"><path fill-rule="evenodd" d="m4.736 1.968-.892 3.269-.014.058C2.113 5.568 1 6.006 1 6.5 1 7.328 4.134 8 8 8s7-.672 7-1.5c0-.494-1.113-.932-2.83-1.205l-.014-.058-.892-3.27c-.146-.533-.698-.849-1.239-.734C9.411 1.363 8.62 1.5 8 1.5s-1.411-.136-2.025-.267c-.541-.115-1.093.2-1.239.735m.015 3.867a.25.25 0 0 1 .274-.224c.9.092 1.91.143 2.975.143a30 30 0 0 0 2.975-.143.25.25 0 0 1 .05.498c-.918.093-1.944.145-3.025.145s-2.107-.052-3.025-.145a.25.25 0 0 1-.224-.274M3.5 10h2a.5.5 0 0 1 .5.5v1a1.5 1.5 0 0 1-3 0v-1a.5.5 0 0 1 .5-.5m-1.5.5q.001-.264.085-.5H2a.5.5 0 0 1 0-1h3.5a1.5 1.5 0 0 1 1.488 1.312 3.5 3.5 0 0 1 2.024 0A1.5 1.5 0 0 1 10.5 9H14a.5.5 0 0 1 0 1h-.085q.084.236.085.5v1a2.5 2.5 0 0 1-5 0v-.14l-.21-.07a2.5 2.5 0 0 0-1.58 0l-.21.07v.14a2.5 2.5 0 0 1-5 0zm8.5-.5h2a.5.5 0 0 1 .5.5v1a1.5 1.5 0 0 1-3 0v-1a.5.5 0 0 1 .5-.5"/></svg>';
           break;
       case "600":
       case "601":
       case "602":
       case "603":
       case "604":
       case "605":
       case "699":
           d = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-archive-fill" viewBox="0 0 16 16"><path d="M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15zM5.5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1M.8 1a.8.8 0 0 0-.8.8V3a.8.8 0 0 0 .8.8h14.4A.8.8 0 0 0 16 3V1.8a.8.8 0 0 0-.8-.8z"/></svg>';
           break;
       default:
           d = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi" viewBox="0 0 16 16"><path d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.73 1.73 0 0 0 4.593 5.69l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.69A1.73 1.73 0 0 0 2.31 4.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.73 1.73 0 0 0 3.407 2.31zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.16 1.16 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.16 1.16 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732z"/></svg>'
       }
       break;
   case "user":
       i = i || 0,
       p = `User: ${s} Torrents`,
       c = `${tpbApi}/q.php?q=${n}%3A${s}%3A${i}`,
       d = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16"><path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/></svg>';
       break;
   case "search":
       p = `Results for: ${s}`,
       c = `${tpbApi}/q.php?cat=0&q=${s}`,
       d = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/></svg>'
   }
   await setContent(`<h2 class="h2" id="h2">${d} ${p}</h2><hr>`, 0),
   await setContent('<div class=\'row\' id="tpbcFilter"><div class="col-auto"></div><div class="col-auto mt-1"></div></div>', 1),
   await setContent('<table class="table table-striped table-hover table-sm table-borderless">\n        <thead><tr>\n            <th scope="col" title="Category" ></th>\n            <th scope="col" title="Name" role="button">Name</th>\n            <th scope="cole"></th>\n            <th scope="col" title="Seeders" role="button">Se</th>\n            <th scope="col" title="Leechers" role="button">Le</th>\n            <th scope="col" title="Upload Date" role="button">Uploaded</th>\n            <th scope="col" title="Size" role="button">Size</th>\n            <th scope="col" title="Uploader" role="button">Uploader</th>\n        </tr></thead>\n    <tbody id="tpbcList">', 1),
   await setContent('<div id="tpbcLoader" class="d-flex align-items-center"><div class="spinner-border" aria-hidden="true"></div><strong class="ms-3" role="status">Loading...</strong></div>', 1);
   const g = await fetch(c, {
       cache: "no-cache"
   })
     , m = await g.text();
   l = m.includes("Database maintenance") ? await JSON.parse(`[{"id": "0","name": "${m}","info_hash": "0000000000000000000000000000000000000000","leechers": "0","seeders": "0","num_files": "0","size": "0","username": "","added": "0","status": "member","category": "0","imdb": "","total_found": "1"}]`) : await JSON.parse(m),
   console.debug(l);
   const w = await document.getElementById("tpbcList");
   for (let t = 0; t < l.length && !(!0 === await GM.getValue("RemovePorn", !0) && l[t].category >= 500 && l[t].category < 600) && (!0 !== await GM.getValue("RemoveZeroSeeds", !0) || !Number(0 === l[t].seeders)) && (!0 !== await GM.getValue("RemoveUntrusted", !0) || "member" != l[t].status); ++t) {
       if (!0 === await GM.getValue("HideUploader", !1)) {
           const e = (await GM.getValue("HideUploader_List", "")).split(",").filter((t=>t)).map((t=>t.trim().toLowerCase()))
             , a = [...new Set(e)]
             , o = l[t].username.toLowerCase();
           if (a.includes(o)) {
               console.debug("HideUploader", a, o);
               break
           }
       }
       if (!0 === await GM.getValue("KeywordFilter", !1)) {
           const e = (await GM.getValue("KeywordFilter_List", "")).split(",").filter((t=>t)).map((t=>t.trim().toLowerCase()))
             , a = [...new Set(e)]
             , o = l[t].name.toLowerCase();
           if (a.some((t=>o.includes(t))))
               break
       }
       if (!0 === await GM.getValue("KeywordKeeper", !1)) {
           const e = (await GM.getValue("KeywordKeeper_List", "")).split(",").filter((t=>t)).map((t=>t.trim().toUpperCase()))
             , a = [...new Set(e)]
             , o = l[t].name.toUpperCase();
           if (!a.some((t=>o.includes(t))))
               break
       }
       let e = "";
       try {
           if (!0 === await GM.getValue("RememberDownloaded", !0)) {
               const a = await GM.getValue("DownloadedTorrents", "[]")
                 , o = JSON.parse(a)
                 , n = l[t].info_hash;
               o.includes(n) && (e = "text-decoration-line-through")
           }
       } catch {}
       const a = await getIcon(l[t].category) || ""
         , o = document.createElement("svg");
       o.innerHTML = a;
       const n = o.querySelector("svg > svg > title") || ""
         , s = await formatBytes(l[t].size) || ""
         , r = await getIcon(l[t].status) || ""
         , i = (null == l[t].imdb || l[t].imdb,
       Number(l[t].category));
       let c = "";
       !isNaN(i) && i >= 500 && i < 600 && (c = "data-tpbc-t-porn"),
       w.innerHTML += `\n        <tr class="d-table-row ${e}" data-tpbc-t-id="${l[t].id}" data-tpbc-t-infohash="${l[t].info_hash}" data-tpbc-t-numfiles="${l[t].num_files}" data-tpbc-t-imdb="${l[t].imdb}" ${c} >\n            <td class="text-center" title="${n.textContent}">${a}</td>\n            <td><span role="button" class="torrent" data-bs-toggle="modal" data-bs-target="#torInfoMod" >${l[t].name.trim()}</span></td>\n            <td data-tpbc="icons" class="text-end"></td>\n            <td title="${l[t].seeders} Seeders">${l[t].seeders}</td>\n            <td title="${l[t].leechers} Leechers">${l[t].leechers}</td>\n            <td title="${new Date(1e3 * l[t].added).toLocaleString()}" data-tpbc-t-epoch="${l[t].added}">${new Date(1e3 * l[t].added).toLocaleString(void 0, {
           day: "2-digit",
           month: "2-digit",
           year: "numeric"
       })}</td>\n            <td title="${l[t].size} bytes" data-tpbc-t-size="${l[t].size}" >${s}</td>\n            <td role="button" data-tpbc="uploader" title="See all uploads by ${l[t].username}" >${r}${l[t].username}</td>\n        </tr>`
   }
   await setContent("</tbody></table>", 1);
   if (document.querySelectorAll("tr[data-tpbc-t-porn]").forEach((t=>{
       const e = t.children[1]
         , a = makeXXX();
       e.append(a)
   }
   )),
   !0 === await GM.getValue("AddIMDBIcon", !1)) {
       document.querySelectorAll('tr[data-tpbc-t-imdb^="tt"]').forEach((t=>{
           const e = t.children[2]
             , a = t.getAttribute("data-tpbc-t-imdb")
             , o = makeIMDb(a);
           e.append(o)
       }
       ))
   }
   if (document.querySelectorAll("tr[data-tpbc-t-infohash]").forEach((t=>{
       const e = t.getAttribute("data-tpbc-t-infohash");
       if ("0000000000000000000000000000000000000000" == e)
           return;
       const a = t.children[2]
         , o = t.children[1].textContent
         , n = makeMagnet(e, o);
       a.append(n)
   }
   )),
   void 0 !== i) {
       await setContent('\n        <nav aria-label="Page Navigation">\n            <ul class="pagination pagination-sm justify-content-center" id="pagination">', 1);
       const t = document.getElementById("pagination");
       for (let e = 1; e < 31; e++) {
           let a = document.createElement("li");
           a.classList.add("page-item");
           let o = document.createElement("a");
           o.classList.add("page-link", "border-bottom"),
           o.textContent = `${e}`,
           o.href = `/search.php?q=${n}:${s}:${e - 1}`,
           o.setAttribute("data-tpbc", "page"),
           e == +i + 1 && o.classList.add("active"),
           a.append(o),
           t.append(a)
       }
       await setContent("</ul></nav>", 1);
       if (document.querySelectorAll('[data-tpbc="page"]').forEach((t=>{
           t.addEventListener("click", (t=>{
               t.preventDefault();
               let e = t.target.href;
               e = e.split("=")[1],
               console.debug(e),
               getData(e)
           }
           ))
       }
       )),
       0 === w.children.length) {
           const t = document.querySelector('a[data-tpbc="page"].active').parentElement.nextSibling.firstChild;
           if ("29" !== t.textContent)
               return void t.click()
       }
   }
   const v = document.querySelectorAll('span[role="button"].torrent')
     , f = document.getElementById("torInfoMod");
   v.forEach((t=>{
       t.addEventListener("click", (async t=>{
           const e = t.target.closest("tr").dataset.tpbcTId;
           if ("0" == e)
               return void t.preventDefault();
           const a = await fetch(`${tpbApi}/t.php?id=${e}`)
             , o = await a.text()
             , n = await JSON.parse(o)
             , s = await fetch(`${tpbApi}/f.php?id=${e}`)
             , r = await s.text()
             , l = await JSON.parse(r);
           f.getElementsByTagName("h1")[0].textContent = n.name,
           document.getElementById("collapseInfo").children[0].innerHTML = n.descr;
           const i = document.querySelector('ul[class~="list-group-flush"]');
           let c = 1;
           for (let t in l) {
               let e = "Filelist not found"
                 , a = "0 bytes";
               l[t].name.length + l[t].name.length > 0 && (e = l[t].name,
               a = await formatBytes(l[t].size)),
               i.innerHTML += `<li class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"><span class="text-truncate"><span class="me-3">${c}.</span>${e}</span>\n                <span class="badge text-bg-success rounded-pill">${a}</span></li>`,
               c++
           }
       }
       ))
   }
   )),
   f.addEventListener("hide.bs.modal", (t=>{
       f.getElementsByTagName("h1")[0].innerHTML = '<div class="spinner-border" aria-hidden="true"></div><strong class="ms-3" role="status">Loading...</strong>',
       document.getElementById("collapseInfo").children[0].innerHTML = "",
       document.getElementById("collapseFiles").children[0].children[0].innerHTML = ""
   }
   ));
   const y = document.getElementById("tpbcFilter")
     , C = document.createElement("input");
   C.classList.add("form-control", "form-control-sm"),
   C.placeholder = "Filter names...",
   C.setAttribute("spellcheck", "false"),
   C.id = "tpbc-flist",
   C.type = "text",
   C.dataset.tpbc = "filter",
   C.addEventListener("keyup", (t=>{
       t.preventDefault(),
       filterList()
   }
   ));
   const k = ["720p", "1080p", "2160p", "x264", "h264", "x265", "h265", "WEBRip", "BluRay", "HDR", "HEVC"];
   for (let t = 0; t < k.length; t++) {
       const e = document.createElement("div");
       e.classList.add("form-check", "form-check-inline", "form-switch");
       const a = document.createElement("input");
       a.classList.add("form-check-input", "tpbc-list-entry", "form-check-input-red-x"),
       a.type = "checkbox",
       a.id = k[t],
       a.value = k[t],
       a.setAttribute("role", "switch");
       const o = document.createElement("label");
       o.setAttribute("for", k[t]),
       o.classList.add("form-check-label"),
       o.setAttribute("role", "button");
       const n = document.createTextNode(k[t]);
       o.appendChild(n),
       a.addEventListener("click", (t=>{
           filterList()
       }
       )),
       e.append(a),
       e.append(o),
       y.children[0].append(C),
       y.children[1].append(e)
   }
   const M = document.getElementsByTagName("th");
   for (let t = 0; t < M.length; t++)
       M[t].addEventListener("click", (e=>{
           tpbcSort(e, t)
       }
       ));
   document.querySelectorAll('[data-tpbc="uploader"]').forEach((t=>{
       t.addEventListener("click", (t=>{
           t.preventDefault();
           const e = t.target.innerText;
           if ("anonymous" === e.toLowerCase())
               return t.target.classList.add("shake"),
               void setTimeout((()=>{
                   t.target.classList.remove("shake")
               }
               ), 400);
           getData(`user:${e}`)
       }
       ))
   }
   ));
   const x = await document.getElementById("tpbcLoader");
   return x && x.remove(),
   !0
}
 , EffectiveSetting = async(t,e,a)=>{
   const o = document.getElementsByClassName("modal-body")[0];
   GM.setValue(`${t}`, e);
   const n = document.createElement("div");
   n.classList.add("form-check", "form-switch");
   const s = document.createElement("input");
   s.classList.add("form-check-input"),
   s.type = "checkbox",
   s.id = `cb${t}`,
   s.setAttribute("role", "switch"),
   e && s.setAttribute("checked", "checked"),
   s.addEventListener("click", (e=>{
       GM.setValue(`${t}`, e.target.checked)
   }
   ));
   const r = document.createElement("label");
   if (r.classList.add = "form-check-label",
   r.setAttribute("for", `cb${t}`),
   r.innerHTML = `${a}`,
   n.append(s, r),
   o.append(n),
   ["HideUploader", "KeywordFilter", "KeywordKeeper"].includes(t)) {
       const e = document.createElement("div")
         , a = document.createElement("textarea");
       a.classList.add("form-control", "mb-3"),
       a.setAttribute("rows", "3"),
       a.setAttribute("spellcheck", "false"),
       a.placeholder = "Using this feature may slow down page load times, use with caution.";
       const n = await GM.getValue(`${t}_List`, "");
       a.textContent = n,
       a.addEventListener("keyup", (e=>{
           const a = e.target.value.trim();
           console.debug(a),
           GM.setValue(`${t}_List`, a)
       }
       )),
       e.append(a),
       o.append(e)
   }
}
 , loadSettings = async()=>{
   await EffectiveSetting("RemoveUntrusted", await GM.getValue("RemoveUntrusted", !0), "Remove untrusted users (i.e. users without a trusted skull etc.)"),
   await EffectiveSetting("RemoveZeroSeeds", await GM.getValue("RemoveZeroSeeds", !0), "Remove torrents that have zero seeds."),
   await EffectiveSetting("ShrinkDescription", await GM.getValue("ShrinkDescription", !0), "Shrink (Hide/Show) the torrent description box."),
   await EffectiveSetting("ShrinkFileList", await GM.getValue("ShrinkFileList", !0), "Shrink (Hide/Show) the file list below the description box."),
   await EffectiveSetting("RememberDownloaded", await GM.getValue("RememberDownloaded", !0), "Strike-out <strike><i>example</i></strike> previously downloaded torrents (when magnet link clicked)"),
   await EffectiveSetting("RemovePorn", await GM.getValue("RemovePorn", !0), "Remove adult material (i.e. Porn, XXX, etc.)"),
   await EffectiveSetting("AddIMDBIcon", await GM.getValue("AddIMDBIcon", !1), `Add an icon that links to the IMDB page. ${await getIcon("imdb")}`),
   await EffectiveSetting("HideUploader", await GM.getValue("HideUploader", !1), "Remove users that you don't like torrents from (e.g. aXXo, YIFY, Anonymous etc.)"),
   await EffectiveSetting("KeywordFilter", await GM.getValue("KeywordFilter", !1), "Remove torrents that contain certain words (e.g. 480p, DVD, .TS. etc.)"),
   await EffectiveSetting("KeywordKeeper", await GM.getValue("KeywordKeeper", !1), "Keep torrents that contain certain words (e.g. 1080p, 720p, WEB etc.)")
}
 , ThePirateBayCleaner = ()=>{
   console.debug("Loading The Pirate Bay Cleaner"),
   document.title = "The Pirate Bay Cleaner",
   (async()=>{
       FixJsRedirect(await GM.getValue("FixJsRedirect", !0)),
       await GM.getValue("DownloadedTorrents", !1) || await GM.setValue("DownloadedTorrents", "[]"),
       !0 === await GM.getValue("NewGui", !0) && await NewGui(await GM.getValue("NewGui", !0), await GM.getValue("NewGuiDarkmode", !0))
   }
   )()
}
;
ThePirateBayCleaner();
