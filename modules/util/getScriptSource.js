const EXPORTED_SYMBOLS = ['getScriptSource'];

/** Given a script, return its entire source as a plain string. */
function getScriptSource(aScript) {
  var requires = [];
  var offsets = [];
  var offset = 0;

  aScript.requires.forEach(function(req) {
    var contents = req.textContent;
    var lineCount = contents.split('\n').length;
    requires.push(contents);
    offset += lineCount;
    offsets.push(offset);
  });
  aScript.offsets = offsets;

  // These newlines are critical for error line calculation.  The last handles
  // a script whose final line is a line comment, to not break the wrapper
  // function.
  // The semicolons after requires fix a failure of javascript's semicolon
  // insertion rules (see #1491).
  var scriptSrc = requires.join(';\n') + ';\n' + aScript.textContent + '\n';

  return scriptSrc;
}
