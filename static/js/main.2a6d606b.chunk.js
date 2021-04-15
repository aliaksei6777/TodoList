(this["webpackJsonpit-incubator-todolist-ts"]=this["webpackJsonpit-incubator-todolist-ts"]||[]).push([[0],{63:function(e,t,a){e.exports=a(76)},68:function(e,t,a){},69:function(e,t,a){},76:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),c=a(8),l=a.n(c);a(68),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(69);var r=a(27),o=a(117),u=a(107),s=a(108),d=i.a.memo((function(e){console.log("additemForm");var t=Object(n.useState)(""),a=Object(r.a)(t,2),c=a[0],l=a[1],d=Object(n.useState)(null),m=Object(r.a)(d,2),T=m[0],b=m[1],O=function(){var t=c.trim();t?(e.addItem(t),l("")):b("Title is required!")};return i.a.createElement("div",null,i.a.createElement(o.a,{variant:"outlined",label:"title",error:!!T,helperText:T,value:c,onChange:function(e){l(e.currentTarget.value)},onKeyPress:function(e){null!==T&&b(null),"Enter"===e.key&&O()}}),i.a.createElement(u.a,{color:"primary",onClick:O},i.a.createElement(s.a,null)))})),m=a(111),T=a(77),b=a(112),O=a(113),f=a(115),E=a(110),k=a(116),j=a(114),h=a(10),v=a(39),g=a(118),p=[],C=a(20),D={},S=a(26),L=i.a.memo((function(e){console.log("EditableSpan");var t=Object(n.useState)(!1),a=Object(r.a)(t,2),c=a[0],l=a[1],u=Object(n.useState)(e.title),s=Object(r.a)(u,2),d=s[0],m=s[1],T=function(){l(!1),e.changeTitle(d)};return c?i.a.createElement(o.a,{value:d,autoFocus:!0,onChange:function(e){m(e.currentTarget.value)},onKeyPress:function(e){"Enter"===e.key&&T()},onBlur:T}):i.a.createElement("span",{onDoubleClick:function(){return l(!0)}},e.title)})),A=a(109),I=a(119),y=i.a.memo((function(e){var t=e.task,a=e.id,c=e.changeTaskTitle,l=e.changeTaskStatus,r=e.removeTask;console.log("Task");var o=Object(n.useCallback)((function(){return r(a,t.id)}),[r,t.id,a]),s=Object(n.useCallback)((function(e){return l(a,t.id,e.currentTarget.checked)}),[l,t.id,a]),d=Object(n.useCallback)((function(e){c(a,t.id,e)}),[c,t.id,a]);return i.a.createElement("div",{key:t.id},i.a.createElement(I.a,{onChange:s,checked:t.isDone}),i.a.createElement(L,{title:t.title,changeTitle:d}),i.a.createElement(u.a,{onClick:o},i.a.createElement(A.a,null)))})),w=i.a.memo((function(e){var t=e.tasks;"active"===e.filter&&(t=t.filter((function(e){return!1===e.isDone}))),"completed"===e.filter&&(t=t.filter((function(e){return!0===e.isDone})));var a=t.map((function(t){return i.a.createElement(y,{key:t.id,task:t,id:e.id,changeTaskTitle:e.changeTaskTitle,changeTaskStatus:e.changeTaskStatus,removeTask:e.removeTask})})),c=Object(n.useCallback)((function(t){return e.addTask(e.id,t)}),[e.addTask,e.id]),l=Object(n.useCallback)((function(t){e.changeTodoListTitle(e.id,t)}),[e.changeTodoListTitle,e.id]),r=Object(n.useCallback)((function(){e.changeTodoListFilter(e.id,"all")}),[e.changeTodoListFilter,e.id]),o=Object(n.useCallback)((function(){e.changeTodoListFilter(e.id,"active")}),[e.changeTodoListFilter,e.id]),s=Object(n.useCallback)((function(){e.changeTodoListFilter(e.id,"completed")}),[e.changeTodoListFilter,e.id]);return i.a.createElement("div",null,i.a.createElement("h3",null,i.a.createElement(L,{title:e.title,changeTitle:l}),i.a.createElement(u.a,{onClick:function(){return e.removeTodoList(e.id)}},i.a.createElement(A.a,null))),i.a.createElement(d,{addItem:c}),i.a.createElement("ul",null,a),i.a.createElement("div",null,i.a.createElement(E.a,{onClick:r,size:"small",variant:"all"===e.filter?"contained":"text"},"All"),i.a.createElement(E.a,{onClick:o,size:"small",variant:"active"===e.filter?"contained":"text",color:"primary"},"Active"),i.a.createElement(E.a,{onClick:s,size:"small",variant:"completed"===e.filter?"contained":"text",color:"secondary"},"Completed")))}));var F=function(){var e=Object(S.c)((function(e){return e.todolists})),t=Object(S.c)((function(e){return e.tasks})),a=Object(S.b)(),c=Object(n.useCallback)((function(e,t){a(function(e,t){return{type:"ADD-TASK",id:e,title:t}}(e,t))}),[a]),l=Object(n.useCallback)((function(e,t){a(function(e,t){return{type:"REMOVE-TASK",id:e,taskID:t}}(e,t))}),[a]),r=Object(n.useCallback)((function(e,t,n){a(function(e,t,a){return{type:"CHANGE-TASK-STATUS",id:e,taskID:t,isDone:a}}(e,t,n))}),[a]),o=Object(n.useCallback)((function(e,t,n){a(function(e,t,a){return{type:"CHANGE-TASK-TITLE",id:e,taskID:t,title:a}}(e,t,n))}),[a]),s=Object(n.useCallback)((function(e){a(function(e){return{type:"ADD-TODOLIST",id:Object(g.a)(),title:e}}(e))}),[a]),h=Object(n.useCallback)((function(e,t){a(function(e,t){return{type:"CHANGE-TODOLIST-FILTER",id:e,filter:t}}(e,t))}),[a]),v=Object(n.useCallback)((function(e){a(function(e){return{type:"REMOVE-TODOLIST",id:e}}(e))}),[a]),p=Object(n.useCallback)((function(e,t){a(function(e,t){return{type:"CHANGE-TODOLIST-TITLE",id:e,title:t}}(e,t))}),[a]),C=e.map((function(e){return i.a.createElement(m.a,{item:!0,key:e.id},i.a.createElement(T.a,{style:{padding:"10px"}},i.a.createElement(w,{key:e.id,id:e.id,title:e.title,tasks:t[e.id],filter:e.filter,removeTask:l,changeTodoListFilter:h,addTask:c,changeTaskStatus:r,removeTodoList:v,changeTaskTitle:o,changeTodoListTitle:p})))}));return i.a.createElement("div",{className:"App"},i.a.createElement(b.a,{position:"static"},i.a.createElement(O.a,null,i.a.createElement(u.a,{edge:"start",color:"inherit","aria-label":"menu"},i.a.createElement(j.a,null)),i.a.createElement(f.a,{variant:"h6"}),i.a.createElement(E.a,{color:"inherit"},"Login"))),i.a.createElement(k.a,{fixed:!0},i.a.createElement(m.a,{container:!0,style:{padding:"20px"}},i.a.createElement("div",null,i.a.createElement("h3",null,"add new todolist"),i.a.createElement("div",null,i.a.createElement(d,{addItem:s})))),i.a.createElement(m.a,{container:!0,spacing:3},C)))},K=a(32),N=Object(K.b)({tasks:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:D,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"REMOVE-TASK":return Object(h.a)(Object(h.a)({},e),{},Object(C.a)({},t.id,e[t.id].filter((function(e){return e.id!==t.taskID}))));case"ADD-TASK":return Object(h.a)(Object(h.a)({},e),{},Object(C.a)({},t.id,[].concat(Object(v.a)(e[t.id]),[{id:Object(g.a)(),title:t.title,isDone:!1}])));case"CHANGE-TASK-STATUS":return Object(h.a)(Object(h.a)({},e),{},Object(C.a)({},t.id,e[t.id].map((function(e){return e.id===t.taskID?Object(h.a)(Object(h.a)({},e),{},{isDone:t.isDone}):e}))));case"CHANGE-TASK-TITLE":return Object(h.a)(Object(h.a)({},e),{},Object(C.a)({},t.id,e[t.id].map((function(e){return e.id===t.taskID?Object(h.a)(Object(h.a)({},e),{},{title:t.title}):e}))));case"ADD-TODOLIST":return Object(h.a)(Object(h.a)({},e),{},Object(C.a)({},t.id,[]));case"REMOVE-TODOLIST":var a=Object(h.a)({},e);return delete a[t.id],a;default:return e}},todolists:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:p,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"REMOVE-TODOLIST":return e.filter((function(e){return e.id!==t.id}));case"ADD-TODOLIST":return[].concat(Object(v.a)(e),[{id:t.id,title:t.title,filter:"all"}]);case"CHANGE-TODOLIST-TITLE":return e.map((function(e){return e.id===t.id?Object(h.a)(Object(h.a)({},e),{},{title:t.title}):Object(h.a)({},e)}));case"CHANGE-TODOLIST-FILTER":return e.map((function(e){return e.id===t.id?Object(h.a)(Object(h.a)({},e),{},{filter:t.filter}):e}));default:return e}}}),x=Object(K.c)(N);window.store=x,l.a.render(i.a.createElement(S.a,{store:x},i.a.createElement(F,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[63,1,2]]]);
//# sourceMappingURL=main.2a6d606b.chunk.js.map