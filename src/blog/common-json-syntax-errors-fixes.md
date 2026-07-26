---
title: "Common JSON Syntax Errors: Trailing Commas, Missing Quotes, and How to Fix Them"
description: "Trailing commas, unquoted keys and mismatched brackets are the usual culprits. Examples and fixes for the most common JSON errors."
date: 2026-07-25
tags: blog
metaTitle: "Common JSON Syntax Errors and How to Fix Them"
---

<article>
<h1>Common JSON Syntax Errors: Trailing Commas, Missing Quotes, and How to Fix Them</h1>
<p class="post-meta">Published {{ date | readableDate }} · 4 min read</p>

<p>JSON is unforgiving. One misplaced comma, one missing quotation mark, one unescaped backslash, and the entire file refuses to parse. The error message from most parsers gives you a line number but rarely tells you what the actual problem is. Here are the errors developers hit most often and exactly how to fix them.</p>

<h2>1. Trailing Commas</h2>

<p>This is the single most common JSON error, especially for developers coming from JavaScript, Python, or most modern programming languages where trailing commas are permitted or even preferred.</p>

<p>Invalid JSON:</p>
<pre style="background:var(--text-main); color:var(--input-bg); padding:1rem; border-radius:6px; overflow-x:auto;"><code>{
  "name": "Alice",
  "age": 30,
}</code></pre>

<p>Valid JSON:</p>
<pre style="background:var(--text-main); color:var(--input-bg); padding:1rem; border-radius:6px; overflow-x:auto;"><code>{
  "name": "Alice",
  "age": 30
}</code></pre>

<p>The fix: remove the comma after the last item in any object or array. JSON strict specification does not permit trailing commas.</p>

<h2>2. Unquoted Keys</h2>

<p>JSON requires all object keys to be strings enclosed in double quotes. This is different from JavaScript object literal syntax, which allows unquoted keys.</p>

<p>Invalid: <code>{name: "Alice"}</code></p>
<p>Valid: <code>{"name": "Alice"}</code></p>

<h2>3. Single Quotes Instead of Double Quotes</h2>

<p>JSON only accepts double quotation marks for strings. Single quotes cause an immediate parse failure.</p>

<p>Invalid: <code>{'name': 'Alice'}</code></p>
<p>Valid: <code>{"name": "Alice"}</code></p>

<div style="background:var(--accent-light); border-left: 4px solid var(--primary); padding: 1.25rem; border-radius: 4px; margin: 2rem 0;">
  <strong>Paste your broken JSON and fix it instantly.</strong> The formatter shows exactly where the error is and lets you copy the corrected version.
  <br><br>
  <a href="/json-formatter/" style="background:var(--primary); color:var(--on-primary); padding:0.65rem 1.5rem; border-radius:6px; text-decoration:none; font-weight:600; display:inline-block;">Open JSON Formatter</a>
</div>

<h2>4. Unescaped Special Characters in Strings</h2>

<p>Certain characters inside JSON string values must be escaped with a backslash. The most common are:</p>
<ul>
  <li>Double quote inside a string: <code>\"</code></li>
  <li>Backslash character itself: <code>\\</code></li>
  <li>Newline: <code>\n</code></li>
  <li>Tab: <code>\t</code></li>
</ul>

<p>Invalid: <code>{"message": "He said "hello""}</code></p>
<p>Valid: <code>{"message": "He said \"hello\""}</code></p>

<h2>5. Wrong Data Types</h2>

<p>JSON supports six specific data types: string, number, boolean (true/false), null, array, and object. True and false must be lowercase. Null must be lowercase. Undefined is not a valid JSON value.</p>

<p>Invalid: <code>{"active": True, "value": undefined}</code></p>
<p>Valid: <code>{"active": true, "value": null}</code></p>

<h2>6. Mismatched Brackets and Braces</h2>

<p>Every opening <code>{</code> needs a closing <code>}</code>. Every <code>[</code> needs a <code>]</code>. For complex nested JSON, brackets often get lost especially when editing manually. A formatter with bracket highlighting makes these errors immediately visible.</p>

<h2>The Fastest Way to Debug JSON</h2>

<p>Paste the JSON into a formatter that validates in real time. A good formatter will highlight the specific problem character and line without you needing to count brackets manually. Once the JSON is clean, use the prettify function so the structure becomes visually scannable before saving or sending.</p>


<h2>Comments Are Not Allowed</h2>

<p>This one catches almost everyone at least once. JSON has no comment syntax at all. Neither double slashes nor slash-star blocks are valid, even though your editor will happily let you type them and will probably colour them correctly on the way in. If you need to annotate a config file, add a real key such as "_comment", or move to a format that supports comments like YAML, and strip it before anything strict reads the file.</p>

<h2>Single Quotes and Unquoted Keys</h2>

<p>JSON wants double quotes on both keys and string values. Single quotes are a JavaScript habit that does not carry across. Unquoted keys are the same story. Writing {name: "Ada"} gives you a perfectly valid JavaScript object literal and a completely invalid JSON document. Parsers tend to point at the character just after the offending key, which makes the error look like it is in the wrong place.</p>

<h2>Values That Do Not Exist in JSON</h2>

<p>NaN, Infinity and undefined are all fine in JavaScript and none of them exist in JSON. Serialising an object containing them either throws or quietly converts them to null, depending on which tool you are using. If numbers are turning into nulls somewhere between two systems, start here.</p>

<p>Trailing commas belong to the same family of things JavaScript forgives and JSON does not. A comma after the final item in an array or object is a hard syntax error.</p>

<h2>Encoding and the Invisible BOM</h2>

<p>A byte order mark at the start of a UTF-8 file is invisible in most editors and fatal to some strict parsers. The error message is rarely helpful. You get something about an unexpected token at position 0, while position 0 looks like an entirely normal opening brace. If a file suddenly parses after you retype the first line, a BOM was sitting there.</p>

<h2>Duplicate Keys and Number Precision</h2>

<p>Duplicate keys are technically permitted by the specification, but the behaviour is undefined. Most parsers keep the last occurrence and discard the others without a word. That is a very quiet way to lose data.</p>

<p>Large integers are the other silent problem. JSON itself sets no precision limit, but JavaScript parses numbers as doubles, so anything above roughly nine quadrillion starts losing accuracy. Database IDs and snowflake-style identifiers are the usual casualties. Send those as strings.</p>

<h2>How to Read the Error Message</h2>

<p>A parser error gives you a position, not a diagnosis. The character it reports is where the parser gave up, which is often slightly after the point where you actually made the mistake. Work backwards from there and check three things: the nearest closing bracket, the nearest comma, and the nearest quote. One of those three is nearly always the culprit.</p>

</article>

<section class="related" style="margin-top: 3rem;">
  <h3>Related Developer Tools</h3>
  <ul>
    <li><a href="/uuid-generator/">UUID Generator</a></li>
    <li><a href="/character-counter/">Character Counter</a></li>
  </ul>
</section>
