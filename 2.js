document.addEventListener("contextmenu",function(e){e.preventDefault()}),document.addEventListener("selectstart",function(e){e.preventDefault()}),document.addEventListener("copy",function(e){e.preventDefault()}),document.addEventListener("dragstart",function(e){var n=e.target;("IMG"===n.nodeName||"A"===n.nodeName)&&e.preventDefault()}),window.addEventListener("keydown",function(e){("F12"===e.key||e.ctrlKey&&e.shiftKey&&"C"===e.key||e.ctrlKey&&e.shiftKey&&"I"===e.key||e.ctrlKey&&e.shiftKey&&"J"===e.key||e.ctrlKey&&"U"===e.key)&&e.preventDefault()}),Object.defineProperty(window,"self",{get:function(){return window},configurable:!1}),window.onbeforeunload=function(){return"Are you sure you want to leave?"},function(){var e=/./;e.toString=function(){this.opened=!0},console.log("%c",e);var n=console.log;console.log=function(){(!(arguments.length>0)||"%c"!==arguments[0])&&n.apply(console,arguments)}}();var oldCheck,keyPressTime=0,keyPressInterval=null;window.addEventListener("keydown",function(e){e.ctrlKey||e.altKey||e.metaKey||e.shiftKey?(keyPressTime=0,null!==keyPressInterval&&(clearInterval(keyPressInterval),keyPressInterval=null)):0===keyPressTime&&(keyPressTime=new Date().getTime(),keyPressInterval=setInterval(function(){new Date().getTime()-keyPressTime<1e3&&console.clear(),keyPressTime=0,clearInterval(keyPressInterval),keyPressInterval=null},1e3))}),document.oncontextmenu=function(){if(oldCheck)return oldCheck.apply(this,arguments)};var blockInspectElement=function(e){var n=e.target.nodeName;3===e.detail&&0>["INPUT","TEXTAREA","BUTTON"].indexOf(n)&&(e.preventDefault(),e.stopPropagation())};document.addEventListener("mousedown",function(e){2===e.button&&(oldCheck=document.oncontextmenu,document.oncontextmenu=null,setTimeout(function(){document.oncontextmenu=oldCheck,oldCheck=null},1e3))}),document.addEventListener("mouseup",blockInspectElement),document.addEventListener("contextmenu",blockInspectElement),Object.defineProperty(document,"scripts",{get:function(){throw Error("Scripts cannot be accessed.")}}),Object.defineProperty(window,"document",{get:function(){throw Error("Document cannot be accessed.")}}),Object.freeze(window.location),Object.freeze(window.document),Object.freeze(window.history),Object.freeze(window.navigator),Object.freeze(window.localStorage),Object.freeze(window.sessionStorage),window.prompt=function(){},window.alert=function(){};var randomizedScriptElement=document.createElement("script");document.head.appendChild(randomizedScriptElement),Object.defineProperty(randomizedScriptElement,"innerHTML",{get:function(){return""},set:function(e){randomizedScriptElement.innerHTML=e}}),Object.defineProperty(randomizedScriptElement,"outerHTML",{get:function(){return""},set:function(e){randomizedScriptElement.outerHTML=e}});
