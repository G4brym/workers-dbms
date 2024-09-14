const templates = {};

//------------- START "base.html" -------------
templates["base.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "<!DOCTYPE html>\n<html lang=\"en\" data-theme=\"light\">\n<head>\n\t<meta charset=\"utf-8\"/>\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n    <meta name=\"color-scheme\" content=\"light\">\n\t<title>";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "title"), env.opts.autoescape);
output += "</title>\n\t<meta name=\"description\" content=\"Workers Database Management System\"/>\n\n\t<link rel=\"stylesheet\" href=\"https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css\"/>\n\t<style>\n\t\thtml, body {\n\t\t\theight: 100%;\n\t\t}\n\t\tbody {\n\t\t\tdisplay: flex;\n\t\t\tflex-direction: column;\n\t\t}\n\t\tfooter {\n\t\t\tmargin-bottom: 0;\n\t\t\tmargin-top: auto;\n\t\t\ttext-align: end;\n\t\t}\n\t\tfooter small {\n\t\t\tfont-size: small;\n\t\t}\n\t\theader .title {\n\t\t\ttext-decoration: none;\n\t\t}\n\t\theader .title:hover {\n\t\t\ttext-decoration: none;\n\t\t}\n\t</style>\n\t";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("css"))(env, context, frame, runtime, function(t_2,t_1) {
if(t_2) { cb(t_2); return; }
output += t_1;
output += "\n</head>\n\n<body>\n<header class=\"container\">\n\t";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("header"))(env, context, frame, runtime, function(t_4,t_3) {
if(t_4) { cb(t_4); return; }
output += t_3;
output += "\n</header>\n\n<main class=\"container\">\n\t";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("main"))(env, context, frame, runtime, function(t_6,t_5) {
if(t_6) { cb(t_6); return; }
output += t_5;
output += "\n</main>\n\n<footer class=\"container\">\n\t<small><a href=\"https://massadas.com\" target=\"_blank\">massadas.com</a></small>\n</footer>\n\n";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("js"))(env, context, frame, runtime, function(t_8,t_7) {
if(t_8) { cb(t_8); return; }
output += t_7;
output += "\n</body>\n</html>\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})})})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_css(env, context, frame, runtime, cb) {
var lineno = 33;
var colno = 4;
var output = "";
try {
var frame = frame.push(true);
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_header(env, context, frame, runtime, cb) {
var lineno = 38;
var colno = 4;
var output = "";
try {
var frame = frame.push(true);
output += "\n\t<hgroup>\n\t\t<a href=\"/databases\" class=\"title\"><h1>workers-dbms</h1></a>\n\t</hgroup>\n\t";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_main(env, context, frame, runtime, cb) {
var lineno = 46;
var colno = 4;
var output = "";
try {
var frame = frame.push(true);
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_js(env, context, frame, runtime, cb) {
var lineno = 53;
var colno = 3;
var output = "";
try {
var frame = frame.push(true);
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
b_css: b_css,
b_header: b_header,
b_main: b_main,
b_js: b_js,
root: root
};

})();
//------------- END "base.html" -------------

//------------- START "create.html" -------------
templates["create.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
env.getTemplate("base.html", true, "create.html", false, function(t_3,t_2) {
if(t_3) { cb(t_3); return; }
parentTemplate = t_2
for(var t_1 in parentTemplate.blocks) {
context.addBlock(t_1, parentTemplate.blocks[t_1]);
}
output += "\n";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("main"))(env, context, frame, runtime, function(t_5,t_4) {
if(t_5) { cb(t_5); return; }
output += t_4;
output += "\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_main(env, context, frame, runtime, cb) {
var lineno = 1;
var colno = 3;
var output = "";
try {
var frame = frame.push(true);
output += "\n<div style=\"max-width: 512px; margin: auto\">\n\t<form method=\"post\" action=\"\">\n\t\t";
if(runtime.contextOrFrameLookup(context, frame, "errors")) {
output += "\n\t\t";
frame = frame.push();
var t_8 = runtime.contextOrFrameLookup(context, frame, "errors");
if(t_8) {t_8 = runtime.fromIterator(t_8);
var t_7 = t_8.length;
for(var t_6=0; t_6 < t_8.length; t_6++) {
var t_9 = t_8[t_6];
frame.set("error", t_9);
frame.set("loop.index", t_6 + 1);
frame.set("loop.index0", t_6);
frame.set("loop.revindex", t_7 - t_6);
frame.set("loop.revindex0", t_7 - t_6 - 1);
frame.set("loop.first", t_6 === 0);
frame.set("loop.last", t_6 === t_7 - 1);
frame.set("loop.length", t_7);
output += "\n\t\t<div class=\"small text-danger\">";
output += runtime.suppressValue(runtime.memberLookup((t_9),"message"), env.opts.autoescape);
output += "</div>\n\t\t";
;
}
}
frame = frame.pop();
output += "\n\t\t";
;
}
output += "\n\n\t\t<fieldset>\n\t\t\t";
frame = frame.push();
var t_12 = runtime.contextOrFrameLookup(context, frame, "fields");
if(t_12) {t_12 = runtime.fromIterator(t_12);
var t_11 = t_12.length;
for(var t_10=0; t_10 < t_12.length; t_10++) {
var t_13 = t_12[t_10];
frame.set("field", t_13);
frame.set("loop.index", t_10 + 1);
frame.set("loop.index0", t_10);
frame.set("loop.revindex", t_11 - t_10);
frame.set("loop.revindex0", t_11 - t_10 - 1);
frame.set("loop.first", t_10 === 0);
frame.set("loop.last", t_10 === t_11 - 1);
frame.set("loop.length", t_11);
output += "\n\t\t\t<label for=\"";
output += runtime.suppressValue(runtime.memberLookup((t_13),"name"), env.opts.autoescape);
output += "\">\n\t\t\t\t";
output += runtime.suppressValue(runtime.memberLookup((t_13),"name"), env.opts.autoescape);
output += "\n\t\t\t\t";
output += runtime.suppressValue(env.getFilter("safe").call(context, runtime.memberLookup((t_13),"html")), env.opts.autoescape);
output += "\n\t\t\t\t";
if(runtime.memberLookup((t_13),"errors")) {
output += "\n\t\t\t\t";
frame = frame.push();
var t_16 = runtime.memberLookup((t_13),"errors");
if(t_16) {t_16 = runtime.fromIterator(t_16);
var t_15 = t_16.length;
for(var t_14=0; t_14 < t_16.length; t_14++) {
var t_17 = t_16[t_14];
frame.set("error", t_17);
frame.set("loop.index", t_14 + 1);
frame.set("loop.index0", t_14);
frame.set("loop.revindex", t_15 - t_14);
frame.set("loop.revindex0", t_15 - t_14 - 1);
frame.set("loop.first", t_14 === 0);
frame.set("loop.last", t_14 === t_15 - 1);
frame.set("loop.length", t_15);
output += "\n\t\t\t\t<small>\n\t\t\t\t\t";
output += runtime.suppressValue(runtime.memberLookup((t_17),"message"), env.opts.autoescape);
output += "\n\t\t\t\t</small>\n\t\t\t\t";
;
}
}
frame = frame.pop();
output += "\n\t\t\t\t";
;
}
output += "\n\t\t\t</label>\n\n\t\t\t";
;
}
}
frame = frame.pop();
output += "\n\t\t\t<button type=\"submit\" style=\"width: auto\">Save</button>\n\t\t</fieldset>\n\t</form>\n</div>\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
b_main: b_main,
root: root
};

})();
//------------- END "create.html" -------------

//------------- START "databases/details.html" -------------
templates["databases/details.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
env.getTemplate("base.html", true, "databases/details.html", false, function(t_3,t_2) {
if(t_3) { cb(t_3); return; }
parentTemplate = t_2
for(var t_1 in parentTemplate.blocks) {
context.addBlock(t_1, parentTemplate.blocks[t_1]);
}
output += "\n";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("main"))(env, context, frame, runtime, function(t_5,t_4) {
if(t_5) { cb(t_5); return; }
output += t_4;
output += "\n\n";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("js"))(env, context, frame, runtime, function(t_7,t_6) {
if(t_7) { cb(t_7); return; }
output += t_6;
output += "\n\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_main(env, context, frame, runtime, cb) {
var lineno = 1;
var colno = 3;
var output = "";
try {
var frame = frame.push(true);
output += "\n<div style=\"display: flex; flex-direction: column;\">\n\t<h3>";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "object")),"id"), env.opts.autoescape);
output += "</h3>\n\n\t<div style=\"display: flex; flex-direction: column\">\n\t\t<article>\n\t\t\tHTTPS Endpoint: <b>";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "endpoints")),"https"), env.opts.autoescape);
output += "</b>\n\t\t</article>\n\t\t<article>\n\t\t\tWebsocket Endpoint: <b>soon</b>\n\t\t</article>\n\t</div>\n\t<div class=\"grid\">\n\t\t<article>\n\t\t\tDatabase Size: ";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "stats")),"databaseSize"), env.opts.autoescape);
output += "<small>MB</small>\n\t\t</article>\n\t\t<article>\n\t\t\tTables: ";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "stats")),"tables")),"length"), env.opts.autoescape);
output += "\n\t\t</article>\n\t</div>\n\n\t";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "stats")),"tables")),"length") > 0) {
output += "\n\t<div>\n\t\t<article>\n\t\t\t<table>\n\t\t\t\t<thead>\n\t\t\t\t<tr>\n\t\t\t\t\t<th scope=\"col\">Table Name</th>\n\t\t\t\t\t<th scope=\"col\">Columns</th>\n\t\t\t\t</tr>\n\t\t\t\t</thead>\n\t\t\t\t<tbody>\n\t\t\t\t";
frame = frame.push();
var t_10 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "stats")),"tables");
if(t_10) {t_10 = runtime.fromIterator(t_10);
var t_9 = t_10.length;
for(var t_8=0; t_8 < t_10.length; t_8++) {
var t_11 = t_10[t_8];
frame.set("table", t_11);
frame.set("loop.index", t_8 + 1);
frame.set("loop.index0", t_8);
frame.set("loop.revindex", t_9 - t_8);
frame.set("loop.revindex0", t_9 - t_8 - 1);
frame.set("loop.first", t_8 === 0);
frame.set("loop.last", t_8 === t_9 - 1);
frame.set("loop.length", t_9);
output += "\n\t\t\t\t<tr>\n\t\t\t\t\t<th scope=\"row\">";
output += runtime.suppressValue(runtime.memberLookup((t_11),"tbl_name"), env.opts.autoescape);
output += "</th>\n\t\t\t\t\t<th scope=\"row\">";
output += runtime.suppressValue(runtime.memberLookup((t_11),"columns"), env.opts.autoescape);
output += "</th>\n\t\t\t\t</tr>\n\t\t\t\t";
;
}
}
frame = frame.pop();
output += "\n\t\t\t</table>\n\t\t</article>\n\t</div>\n\t";
;
}
output += "\n\n\t<div>\n\t\t<article>\n\t\t\t<h6>Query Database</h6>\n\t\t\t<textarea id=\"query\">select 1</textarea>\n\t\t\t<button id=\"query-run\" style=\"width: auto\">Run</button>\n\t\t\t<button id=\"query-loading\" style=\"display: none\" aria-busy=\"true\"></button>\n\n\t\t\t<div id=\"result\" style=\"margin-top: 1em;\"></div>\n\t\t</article>\n\t</div>\n\n\n</div>\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_js(env, context, frame, runtime, cb) {
var lineno = 59;
var colno = 3;
var output = "";
try {
var frame = frame.push(true);
output += "\n<script src=\"\nhttps://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.min.js\n\"></script>\n<script>\n\tvar queryTextbox = $(\"#query\");\n\tvar queryResult = $(\"#result\");\n\tvar buttonQueryLoading = $(\"#query-loading\");\n\tvar buttonQueryRun = $(\"#query-run\");\n\tbuttonQueryRun.on(\"click\", function (event) {\n\t\tbuttonQueryLoading.show();\n\t\tbuttonQueryRun.hide();\n\t\tconsole.log(queryTextbox.val())\n\n\t\t$.ajax({\n\t\t\turl: \"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "endpoints")),"https"), env.opts.autoescape);
output += "\",\n\t\t\tmethod: 'post',\n\t\t\tdata: JSON.stringify({\n\t\t\t\tquery: queryTextbox.val()\n\t\t\t}),\n\t\t\tcontentType: \"application/json; charset=utf-8\",\n\t\t\ttraditional: true,\n\t\t\tsuccess: function (result) {\n\t\t\t\tif (result.length > 0) {\n\t\t\t\t\tvar table = `\n<table><thead><tr>\n${Object.keys(result[0]).map((obj) => '<th scope=\"col\">' + obj + '</th>').join('')}\n</tr></thead><tbody>\n${result.map((obj) => '<tr>' + Object.values(obj).map((inner) => '<th scope=\"row\">' + inner + '</th>').join('') + '</tr>').join('')}\n</tbody></table>`\n\n\t\t\t\t\tqueryResult.html(table)\n\t\t\t\t} else {\n\t\t\t\t\tqueryResult.html('No rows returned')\n\t\t\t\t}\n\n\t\t\t\tbuttonQueryLoading.hide();\n\t\t\t\tbuttonQueryRun.show();\n\t\t\t}\n\t\t});\n\t});\n</script>\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
b_main: b_main,
b_js: b_js,
root: root
};

})();
//------------- END "databases/details.html" -------------

//------------- START "databases/list.html" -------------
templates["databases/list.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
env.getTemplate("base.html", true, "databases/list.html", false, function(t_3,t_2) {
if(t_3) { cb(t_3); return; }
parentTemplate = t_2
for(var t_1 in parentTemplate.blocks) {
context.addBlock(t_1, parentTemplate.blocks[t_1]);
}
output += "\n";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("main"))(env, context, frame, runtime, function(t_5,t_4) {
if(t_5) { cb(t_5); return; }
output += t_4;
output += "\n\n";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("css"))(env, context, frame, runtime, function(t_7,t_6) {
if(t_7) { cb(t_7); return; }
output += t_6;
output += "\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_main(env, context, frame, runtime, cb) {
var lineno = 1;
var colno = 3;
var output = "";
try {
var frame = frame.push(true);
output += "\n<div style=\"display: flex; flex-wrap: wrap\">\n\n\t";
frame = frame.push();
var t_10 = runtime.contextOrFrameLookup(context, frame, "objectList");
if(t_10) {t_10 = runtime.fromIterator(t_10);
var t_9 = t_10.length;
for(var t_8=0; t_8 < t_10.length; t_8++) {
var t_11 = t_10[t_8];
frame.set("row", t_11);
frame.set("loop.index", t_8 + 1);
frame.set("loop.index0", t_8);
frame.set("loop.revindex", t_9 - t_8);
frame.set("loop.revindex0", t_9 - t_8 - 1);
frame.set("loop.first", t_8 === 0);
frame.set("loop.last", t_8 === t_9 - 1);
frame.set("loop.length", t_9);
output += "\n\t<div class=\"db\">\n\t\t<article>\n\t\t\t<h2>";
output += runtime.suppressValue(runtime.memberLookup((t_11),"id"), env.opts.autoescape);
output += "</h2>\n\t\t\t<a href=\"/databases/manage/";
output += runtime.suppressValue(runtime.memberLookup((t_11),"id"), env.opts.autoescape);
output += "\">Manage Database</a>\n\t\t</article>\n\t</div>\n\t";
;
}
}
frame = frame.pop();
output += "\n\n\t<div class=\"db\">\n\t\t<article>\n\t\t\t<h2>+</h2>\n\t\t\t<a href=\"/databases/new\">Create new Database</a>\n\t\t</article>\n\t</div>\n\n</div>\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_css(env, context, frame, runtime, cb) {
var lineno = 23;
var colno = 3;
var output = "";
try {
var frame = frame.push(true);
output += "\n<style>\n\t.db {\n\t\tflex-basis: 33.33%;\n\t}\n\n\t.db article {\n\t\tmargin: 8px;\n\t}\n</style>\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
b_main: b_main,
b_css: b_css,
root: root
};

})();
//------------- END "databases/list.html" -------------

//------------- START "home.html" -------------
templates["home.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
env.getTemplate("base.html", true, "home.html", false, function(t_3,t_2) {
if(t_3) { cb(t_3); return; }
parentTemplate = t_2
for(var t_1 in parentTemplate.blocks) {
context.addBlock(t_1, parentTemplate.blocks[t_1]);
}
output += "\n";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("main"))(env, context, frame, runtime, function(t_5,t_4) {
if(t_5) { cb(t_5); return; }
output += t_4;
output += "\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_main(env, context, frame, runtime, cb) {
var lineno = 1;
var colno = 3;
var output = "";
try {
var frame = frame.push(true);
output += "\n<div>WIP</div>\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
b_main: b_main,
root: root
};

})();
//------------- END "home.html" -------------

//------------- START "layout.html" -------------
templates["layout.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n\t<meta charset=\"utf-8\"/>\n\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"/>\n\t<title>";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "title"), env.opts.autoescape);
output += "</title>\n\t<meta name=\"description\" content=\"Workers Database Management System\"/>\n\n\t<link rel=\"stylesheet\" href=\"https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css\"/>\n</head>\n\n<body>\n<!-- Header -->\n<header>\n\t";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("header"))(env, context, frame, runtime, function(t_2,t_1) {
if(t_2) { cb(t_2); return; }
output += t_1;
output += "\n</header>\n<!-- ./ Header -->\n\n<!-- Main -->\n<main>\n\t";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("main"))(env, context, frame, runtime, function(t_4,t_3) {
if(t_4) { cb(t_4); return; }
output += t_3;
output += "\n\t<!-- Preview -->\n\t<section id=\"preview\">\n\t\t<h2>Preview</h2>\n\t\t<p>\n\t\t\tSed ultricies dolor non ante vulputate hendrerit. Vivamus sit amet suscipit sapien. Nulla\n\t\t\tiaculis eros a elit pharetra egestas.\n\t\t</p>\n\t\t<form>\n\t\t\t<input\n\t\t\t\ttype=\"text\"\n\t\t\t\tname=\"firstname\"\n\t\t\t\tplaceholder=\"First name\"\n\t\t\t\taria-label=\"First name\"\n\t\t\t\trequired\n\t\t\t/>\n\t\t\t<input\n\t\t\t\ttype=\"email\"\n\t\t\t\tname=\"email\"\n\t\t\t\tplaceholder=\"Email address\"\n\t\t\t\taria-label=\"Email address\"\n\t\t\t\tautocomplete=\"email\"\n\t\t\t\trequired\n\t\t\t/>\n\t\t\t<button type=\"submit\">Subscribe</button>\n\t\t\t<fieldset>\n\t\t\t\t<label for=\"terms\">\n\t\t\t\t\t<input type=\"checkbox\" role=\"switch\" id=\"terms\" name=\"terms\"/>\n\t\t\t\t\tI agree to the\n\t\t\t\t\t<a href=\"#\" onclick=\"event.preventDefault()\">Privacy Policy</a>\n\t\t\t\t</label>\n\t\t\t</fieldset>\n\t\t</form>\n\t</section>\n\t<!-- ./ Preview -->\n\n\t<!-- Typography-->\n\t<section id=\"typography\">\n\t\t<h2>Typography</h2>\n\t\t<p>\n\t\t\tAliquam lobortis vitae nibh nec rhoncus. Morbi mattis neque eget efficitur feugiat.\n\t\t\tVivamus porta nunc a erat mattis, mattis feugiat turpis pretium. Quisque sed tristique\n\t\t\tfelis.\n\t\t</p>\n\n\t\t<!-- Blockquote-->\n\t\t<blockquote>\n\t\t\t\"Maecenas vehicula metus tellus, vitae congue turpis hendrerit non. Nam at dui sit amet\n\t\t\tipsum cursus ornare.\"\n\t\t\t<footer>\n\t\t\t\t<cite>- Phasellus eget lacinia</cite>\n\t\t\t</footer>\n\t\t</blockquote>\n\n\t\t<!-- Lists-->\n\t\t<h3>Lists</h3>\n\t\t<ul>\n\t\t\t<li>Aliquam lobortis lacus eu libero ornare facilisis.</li>\n\t\t\t<li>Nam et magna at libero scelerisque egestas.</li>\n\t\t\t<li>Suspendisse id nisl ut leo finibus vehicula quis eu ex.</li>\n\t\t\t<li>Proin ultricies turpis et volutpat vehicula.</li>\n\t\t</ul>\n\n\t\t<!-- Inline text elements-->\n\t\t<h3>Inline text elements</h3>\n\t\t<p><a href=\"#\" onclick=\"event.preventDefault()\">Link</a></p>\n\t\t<p><strong>Bold</strong></p>\n\t\t<p><em>Italic</em></p>\n\t\t<p><u>Underline</u></p>\n\t\t<p>\n\t\t\t<del>Deleted</del>\n\t\t</p>\n\t\t<p>\n\t\t\t<ins>Inserted</ins>\n\t\t</p>\n\t\t<p><s>Strikethrough</s></p>\n\t\t<p><small>Small </small></p>\n\t\t<p>Text <sub>Sub</sub></p>\n\t\t<p>Text <sup>Sup</sup></p>\n\t\t<p>\n\t\t\t<abbr title=\"Abbreviation\" data-tooltip=\"Abbreviation\">Abbr.</abbr>\n\t\t</p>\n\t\t<p><kbd>Kbd</kbd></p>\n\t\t<p>\n\t\t\t<mark>Highlighted</mark>\n\t\t</p>\n\n\t\t<!-- Headings-->\n\t\t<h3>Heading 3</h3>\n\t\t<p>\n\t\t\tInteger bibendum malesuada libero vel eleifend. Fusce iaculis turpis ipsum, at efficitur\n\t\t\tsem scelerisque vel. Aliquam auctor diam ut purus cursus fringilla. Class aptent taciti\n\t\t\tsociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.\n\t\t</p>\n\t\t<h4>Heading 4</h4>\n\t\t<p>\n\t\t\tCras fermentum velit vitae auctor aliquet. Nunc non congue urna, at blandit nibh. Donec ac\n\t\t\tfermentum felis. Vivamus tincidunt arcu ut lacus hendrerit, eget mattis dui finibus.\n\t\t</p>\n\t\t<h5>Heading 5</h5>\n\t\t<p>\n\t\t\tDonec nec egestas nulla. Sed varius placerat felis eu suscipit. Mauris maximus ante in\n\t\t\tconsequat luctus. Morbi euismod sagittis efficitur. Aenean non eros orci. Vivamus ut diam\n\t\t\tsem.\n\t\t</p>\n\t\t<h6>Heading 6</h6>\n\t\t<p>\n\t\t\tUt sed quam non mauris placerat consequat vitae id risus. Vestibulum tincidunt nulla ut\n\t\t\ttortor posuere, vitae malesuada tortor molestie. Sed nec interdum dolor. Vestibulum id\n\t\t\tauctor nisi, a efficitur sem. Aliquam sollicitudin efficitur turpis, sollicitudin\n\t\t\thendrerit ligula semper id. Nunc risus felis, egestas eu tristique eget, convallis in\n\t\t\tvelit.\n\t\t</p>\n\n\t\t<!-- Medias-->\n\t\t<figure>\n\t\t\t<img\n\t\t\t\tsrc=\"img/aleksandar-jason-a562ZEFKW8I-unsplash-2000x1000.jpg\"\n\t\t\t\talt=\"Minimal landscape\"\n\t\t\t/>\n\t\t\t<figcaption>\n\t\t\t\tImage from\n\t\t\t\t<a href=\"https://unsplash.com/photos/a562ZEFKW8I\" target=\"_blank\">unsplash.com</a>\n\t\t\t</figcaption>\n\t\t</figure>\n\t</section>\n\t<!-- ./ Typography-->\n\n\t<!-- Form elements-->\n\t<section id=\"form\">\n\t\t<form>\n\t\t\t<h2>Form elements</h2>\n\n\t\t\t<!-- Search -->\n\t\t\t<label for=\"search\">Search</label>\n\t\t\t<input type=\"search\" id=\"search\" name=\"search\" placeholder=\"Search\"/>\n\n\t\t\t<!-- Text -->\n\t\t\t<label for=\"text\">Text</label>\n\t\t\t<input type=\"text\" id=\"text\" name=\"text\" placeholder=\"Text\"/>\n\t\t\t<small>Curabitur consequat lacus at lacus porta finibus.</small>\n\n\t\t\t<!-- Select -->\n\t\t\t<label for=\"select\">Select</label>\n\t\t\t<select id=\"select\" name=\"select\" required>\n\t\t\t\t<option value=\"\" selected>Select…</option>\n\t\t\t\t<option>…</option>\n\t\t\t</select>\n\n\t\t\t<!-- File browser -->\n\t\t\t<label for=\"file\"\n\t\t\t>File browser\n\t\t\t\t<input type=\"file\" id=\"file\" name=\"file\"/>\n\t\t\t</label>\n\n\t\t\t<!-- Range slider control -->\n\t\t\t<label for=\"range\"\n\t\t\t>Range slider\n\t\t\t\t<input type=\"range\" min=\"0\" max=\"100\" value=\"50\" id=\"range\" name=\"range\"/>\n\t\t\t</label>\n\n\t\t\t<!-- States -->\n\n\t\t\t<label for=\"valid\">\n\t\t\t\tValid\n\t\t\t\t<input type=\"text\" id=\"valid\" name=\"valid\" placeholder=\"Valid\" aria-invalid=\"false\"/>\n\t\t\t</label>\n\t\t\t<label for=\"invalid\">\n\t\t\t\tInvalid\n\t\t\t\t<input\n\t\t\t\t\ttype=\"text\"\n\t\t\t\t\tid=\"invalid\"\n\t\t\t\t\tname=\"invalid\"\n\t\t\t\t\tplaceholder=\"Invalid\"\n\t\t\t\t\taria-invalid=\"true\"\n\t\t\t\t/>\n\t\t\t</label>\n\t\t\t<label for=\"disabled\">\n\t\t\t\tDisabled\n\t\t\t\t<input type=\"text\" id=\"disabled\" name=\"disabled\" placeholder=\"Disabled\" disabled/>\n\t\t\t</label>\n\n\t\t\t<!-- Date-->\n\t\t\t<label for=\"date\"\n\t\t\t>Date\n\t\t\t\t<input type=\"date\" id=\"date\" name=\"date\"/>\n\t\t\t</label>\n\n\t\t\t<!-- Time-->\n\t\t\t<label for=\"time\"\n\t\t\t>Time\n\t\t\t\t<input type=\"time\" id=\"time\" name=\"time\"/>\n\t\t\t</label>\n\n\t\t\t<!-- Color-->\n\t\t\t<label for=\"color\"\n\t\t\t>Color\n\t\t\t\t<input type=\"color\" id=\"color\" name=\"color\" value=\"#0eaaaa\"/>\n\t\t\t</label>\n\n\t\t\t<!-- Checkboxes -->\n\t\t\t<fieldset>\n\t\t\t\t<legend><strong>Checkboxes</strong></legend>\n\t\t\t\t<label for=\"checkbox-1\">\n\t\t\t\t\t<input type=\"checkbox\" id=\"checkbox-1\" name=\"checkbox-1\" checked/>\n\t\t\t\t\tCheckbox\n\t\t\t\t</label>\n\t\t\t\t<label for=\"checkbox-2\">\n\t\t\t\t\t<input type=\"checkbox\" id=\"checkbox-2\" name=\"checkbox-2\"/>\n\t\t\t\t\tCheckbox\n\t\t\t\t</label>\n\t\t\t</fieldset>\n\n\t\t\t<!-- Radio buttons -->\n\t\t\t<fieldset>\n\t\t\t\t<legend><strong>Radio buttons</strong></legend>\n\t\t\t\t<label for=\"radio-1\">\n\t\t\t\t\t<input type=\"radio\" id=\"radio-1\" name=\"radio\" value=\"radio-1\" checked/>\n\t\t\t\t\tRadio button\n\t\t\t\t</label>\n\t\t\t\t<label for=\"radio-2\">\n\t\t\t\t\t<input type=\"radio\" id=\"radio-2\" name=\"radio\" value=\"radio-2\"/>\n\t\t\t\t\tRadio button\n\t\t\t\t</label>\n\t\t\t</fieldset>\n\n\t\t\t<!-- Switch -->\n\t\t\t<fieldset>\n\t\t\t\t<legend><strong>Switches</strong></legend>\n\t\t\t\t<label for=\"switch-1\">\n\t\t\t\t\t<input type=\"checkbox\" id=\"switch-1\" name=\"switch-1\" role=\"switch\" checked/>\n\t\t\t\t\tSwitch\n\t\t\t\t</label>\n\t\t\t\t<label for=\"switch-2\">\n\t\t\t\t\t<input type=\"checkbox\" id=\"switch-2\" name=\"switch-2\" role=\"switch\"/>\n\t\t\t\t\tSwitch\n\t\t\t\t</label>\n\t\t\t</fieldset>\n\n\t\t\t<!-- Buttons -->\n\t\t\t<input type=\"reset\" value=\"Reset\" onclick=\"event.preventDefault()\"/>\n\t\t\t<input type=\"submit\" value=\"Submit\" onclick=\"event.preventDefault()\"/>\n\t\t</form>\n\t</section>\n\t<!-- ./ Form elements-->\n\n\t<!-- Modal -->\n\t<section id=\"modal\">\n\t\t<h2>Modal</h2>\n\t\t<button class=\"contrast\" onclick=\"modalExample.showModal()\">Launch demo modal</button>\n\t</section>\n\t<!-- ./ Modal -->\n\n\t<!-- Accordions -->\n\t<section id=\"accordions\">\n\t\t<h2>Accordions</h2>\n\t\t<details>\n\t\t\t<summary>Accordion 1</summary>\n\t\t\t<p>\n\t\t\t\tLorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque urna diam,\n\t\t\t\ttincidunt nec porta sed, auctor id velit. Etiam venenatis nisl ut orci consequat, vitae\n\t\t\t\ttempus quam commodo. Nulla non mauris ipsum. Aliquam eu posuere orci. Nulla convallis\n\t\t\t\tlectus rutrum quam hendrerit, in facilisis elit sollicitudin. Mauris pulvinar pulvinar\n\t\t\t\tmi, dictum tristique elit auctor quis. Maecenas ac ipsum ultrices, porta turpis sit\n\t\t\t\tamet, congue turpis.\n\t\t\t</p>\n\t\t</details>\n\t\t<details open>\n\t\t\t<summary>Accordion 2</summary>\n\t\t\t<ul>\n\t\t\t\t<li>Vestibulum id elit quis massa interdum sodales.</li>\n\t\t\t\t<li>Nunc quis eros vel odio pretium tincidunt nec quis neque.</li>\n\t\t\t\t<li>Quisque sed eros non eros ornare elementum.</li>\n\t\t\t\t<li>Cras sed libero aliquet, porta dolor quis, dapibus ipsum.</li>\n\t\t\t</ul>\n\t\t</details>\n\t</section>\n\t<!-- ./ Accordions -->\n\n\t<!-- Article-->\n\t<article id=\"article\">\n\t\t<h2>Article</h2>\n\t\t<p>\n\t\t\tNullam dui arcu, malesuada et sodales eu, efficitur vitae dolor. Sed ultricies dolor non\n\t\t\tante vulputate hendrerit. Vivamus sit amet suscipit sapien. Nulla iaculis eros a elit\n\t\t\tpharetra egestas. Nunc placerat facilisis cursus. Sed vestibulum metus eget dolor pharetra\n\t\t\trutrum.\n\t\t</p>\n\t\t<footer>\n\t\t\t<small>Duis nec elit placerat, suscipit nibh quis, finibus neque.</small>\n\t\t</footer>\n\t</article>\n\t<!-- ./ Article-->\n\n\t<!-- Group -->\n\t<section id=\"group\">\n\t\t<h2>Group</h2>\n\t\t<form>\n\t\t\t<fieldset role=\"group\">\n\t\t\t\t<input name=\"email\" type=\"email\" placeholder=\"Enter your email\" autocomplete=\"email\"/>\n\t\t\t\t<input type=\"submit\" value=\"Subscribe\"/>\n\t\t\t</fieldset>\n\t\t</form>\n\t</section>\n\t<!-- ./ Group -->\n\n\t<!-- Progress -->\n\t<section id=\"progress\">\n\t\t<h2>Progress bar</h2>\n\t\t<progress id=\"progress-1\" value=\"25\" max=\"100\"></progress>\n\t\t<progress id=\"progress-2\"></progress>\n\t</section>\n\t<!-- ./ Progress -->\n\n\t<!-- Loading -->\n\t<section id=\"loading\">\n\t\t<h2>Loading</h2>\n\t\t<article aria-busy=\"true\"></article>\n\t\t<button aria-busy=\"true\">Please wait…</button>\n\t</section>\n\t<!-- ./ Loading -->\n</main>\n<!-- ./ Main -->\n\n<!-- Footer -->\n<footer>\n\t<small><a href=\"https://massadas.com\">massadas.com</a></small>\n</footer>\n<!-- ./ Footer -->\n\n</body>\n</html>\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_header(env, context, frame, runtime, cb) {
var lineno = 14;
var colno = 4;
var output = "";
try {
var frame = frame.push(true);
output += "\n\t<hgroup>\n\t\t<h1>Pico</h1>\n\t\t<p>A class-less example, without dependencies.</p>\n\t</hgroup>\n\t<nav>\n\t\t<ul>\n\t\t\t<li><a href=\"#\" data-theme-switcher=\"auto\">Auto</a></li>\n\t\t\t<li><a href=\"#\" data-theme-switcher=\"light\">Light</a></li>\n\t\t\t<li><a href=\"#\" data-theme-switcher=\"dark\">Dark</a></li>\n\t\t</ul>\n\t</nav>\n\t";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_main(env, context, frame, runtime, cb) {
var lineno = 32;
var colno = 4;
var output = "";
try {
var frame = frame.push(true);
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
b_header: b_header,
b_main: b_main,
root: root
};

})();
//------------- END "layout.html" -------------

//------------- START "list.html" -------------
templates["list.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
env.getTemplate("base.html", true, "list.html", false, function(t_3,t_2) {
if(t_3) { cb(t_3); return; }
parentTemplate = t_2
for(var t_1 in parentTemplate.blocks) {
context.addBlock(t_1, parentTemplate.blocks[t_1]);
}
output += "\n";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("main"))(env, context, frame, runtime, function(t_5,t_4) {
if(t_5) { cb(t_5); return; }
output += t_4;
output += "\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_main(env, context, frame, runtime, cb) {
var lineno = 1;
var colno = 3;
var output = "";
try {
var frame = frame.push(true);
output += "\n<div class=\"row\">\n\t<a href=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "baseUrl"), env.opts.autoescape);
output += "/novo\" class=\"btn btn-primary float-sm-end\">New</a>\n\t";
if(runtime.contextOrFrameLookup(context, frame, "objectList")) {
output += "\n\t<table class=\"table table-hover\">\n\t\t<thead>\n\t\t<tr>\n\n\t\t\t";
frame = frame.push();
var t_8 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "objectList")),0);
if(t_8) {t_8 = runtime.fromIterator(t_8);
var t_6;
if(runtime.isArray(t_8)) {
var t_7 = t_8.length;
for(t_6=0; t_6 < t_8.length; t_6++) {
var t_9 = t_8[t_6][0];
frame.set("[object Object]", t_8[t_6][0]);
var t_10 = t_8[t_6][1];
frame.set("[object Object]", t_8[t_6][1]);
frame.set("loop.index", t_6 + 1);
frame.set("loop.index0", t_6);
frame.set("loop.revindex", t_7 - t_6);
frame.set("loop.revindex0", t_7 - t_6 - 1);
frame.set("loop.first", t_6 === 0);
frame.set("loop.last", t_6 === t_7 - 1);
frame.set("loop.length", t_7);
output += "\n\t\t\t<th scope=\"col\">";
output += runtime.suppressValue(t_9, env.opts.autoescape);
output += "</th>\n\t\t\t";
;
}
} else {
t_6 = -1;
var t_7 = runtime.keys(t_8).length;
for(var t_11 in t_8) {
t_6++;
var t_12 = t_8[t_11];
frame.set("key", t_11);
frame.set("value", t_12);
frame.set("loop.index", t_6 + 1);
frame.set("loop.index0", t_6);
frame.set("loop.revindex", t_7 - t_6);
frame.set("loop.revindex0", t_7 - t_6 - 1);
frame.set("loop.first", t_6 === 0);
frame.set("loop.last", t_6 === t_7 - 1);
frame.set("loop.length", t_7);
output += "\n\t\t\t<th scope=\"col\">";
output += runtime.suppressValue(t_11, env.opts.autoescape);
output += "</th>\n\t\t\t";
;
}
}
}
frame = frame.pop();
output += "\n\n\t\t</tr>\n\t\t</thead>\n\t\t<tbody>\n\n\t\t";
frame = frame.push();
var t_15 = runtime.contextOrFrameLookup(context, frame, "objectList");
if(t_15) {t_15 = runtime.fromIterator(t_15);
var t_14 = t_15.length;
for(var t_13=0; t_13 < t_15.length; t_13++) {
var t_16 = t_15[t_13];
frame.set("row", t_16);
frame.set("loop.index", t_13 + 1);
frame.set("loop.index0", t_13);
frame.set("loop.revindex", t_14 - t_13);
frame.set("loop.revindex0", t_14 - t_13 - 1);
frame.set("loop.first", t_13 === 0);
frame.set("loop.last", t_13 === t_14 - 1);
frame.set("loop.length", t_14);
output += "\n\t\t<tr onclick=\"window.location.href = `";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "baseUrl"), env.opts.autoescape);
output += "/";
output += runtime.suppressValue(runtime.memberLookup((t_16),"id"), env.opts.autoescape);
output += "`\" style=\"cursor: pointer\">\n\n\t\t\t";
frame = frame.push();
var t_19 = t_16;
if(t_19) {t_19 = runtime.fromIterator(t_19);
var t_17;
if(runtime.isArray(t_19)) {
var t_18 = t_19.length;
for(t_17=0; t_17 < t_19.length; t_17++) {
var t_20 = t_19[t_17][0];
frame.set("[object Object]", t_19[t_17][0]);
var t_21 = t_19[t_17][1];
frame.set("[object Object]", t_19[t_17][1]);
frame.set("loop.index", t_17 + 1);
frame.set("loop.index0", t_17);
frame.set("loop.revindex", t_18 - t_17);
frame.set("loop.revindex0", t_18 - t_17 - 1);
frame.set("loop.first", t_17 === 0);
frame.set("loop.last", t_17 === t_18 - 1);
frame.set("loop.length", t_18);
output += "\n\t\t\t<td>\n\t\t\t\t";
output += runtime.suppressValue(t_21, env.opts.autoescape);
output += "\n\t\t\t</td>\n\t\t\t";
;
}
} else {
t_17 = -1;
var t_18 = runtime.keys(t_19).length;
for(var t_22 in t_19) {
t_17++;
var t_23 = t_19[t_22];
frame.set("key", t_22);
frame.set("value", t_23);
frame.set("loop.index", t_17 + 1);
frame.set("loop.index0", t_17);
frame.set("loop.revindex", t_18 - t_17);
frame.set("loop.revindex0", t_18 - t_17 - 1);
frame.set("loop.first", t_17 === 0);
frame.set("loop.last", t_17 === t_18 - 1);
frame.set("loop.length", t_18);
output += "\n\t\t\t<td>\n\t\t\t\t";
output += runtime.suppressValue(t_23, env.opts.autoescape);
output += "\n\t\t\t</td>\n\t\t\t";
;
}
}
}
frame = frame.pop();
output += "\n\t\t</tr>\n\t\t";
;
}
}
frame = frame.pop();
output += "\n\n\t\t</tbody>\n\t</table>\n\n\t";
;
}
else {
output += "\n\tNothing to show\n\t";
;
}
output += "\n</div>\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
b_main: b_main,
root: root
};

})();
//------------- END "list.html" -------------

export default templates;