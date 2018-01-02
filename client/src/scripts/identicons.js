// Simple hash function
// see http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
function hashCode(s) {
  if (!s) return 0;
  var value = 0;
  for (var i = 0; i < s.length; i++) {
    var char = s.charCodeAt(i);
    value = (value << 5) - value + char;
    value = value & value;
  }
  return value;
}

exports.generate = function(id, options, generator) {
  var size = options.size;
  var hash = options.hash || hashCode;
  var value = hash(id);
  var bin = value.toString(2);
  generator.start(value);
  var n = 0;
  for (var x = 0; x < size; x++) {
    for (var y = 0; y < size * 2; y++) {
      if (+bin.charAt(n++ % bin.length)) {
        generator.rect(x, y);
        generator.rect(size * 2 - x - 2, y);
      }
    }
  }
  generator.end();
};

exports.generateSVGString = function(id, options) {
  var width = options.width;
  var size = options.size;
  var side = width / (size * 2 - 1);
  var color;
  var str =
    '<svg xmlns="http://www.w3.org/2000/svg" width="' +
    width +
    '" height="' +
    width +
    '">';
  exports.generate(id, options, {
    start: function start(value) {
      color =
        '#' +
        Math.abs(value)
          .toString(16)
          .substring(0, 6);
    },
    rect: function rect(x, y) {
      x = Math.floor(x * side);
      y = Math.floor(y * side);
      var xside = side + 1;
      str +=
        '<rect x="' +
        x +
        '" y="' +
        y +
        '" width="' +
        xside +
        '" height="' +
        xside +
        '" style="fill:' +
        color +
        '" />';
    },
    end: function end() {
      str += '</svg>';
    }
  });
  return str;
};

var base64 =
  typeof window !== 'undefined'
    ? window.btoa
    : function(str) {
        return new global['Buffer'](str).toString('base64');
      };

exports.generateSVGDataURIString = function(id, options) {
  var str = exports.generateSVGString(id, options);
  return 'data:image/svg+xml;base64,' + base64(str);
};

exports.generateSVGDOM = function(id, options) {
  var width = options.width;
  var size = options.size;
  var side = width / (size * 2 - 1);
  var color;
  var xmlns = 'http://www.w3.org/2000/svg';
  var svg = document.createElementNS(xmlns, 'svg');
  svg.setAttribute('width', String(width));
  svg.setAttribute('height', String(width));
  exports.generate(id, options, {
    start: function start(value) {
      color =
        '#' +
        Math.abs(value)
          .toString(16)
          .substring(0, 6);
    },
    rect: function rect(x, y) {
      var rect = document.createElementNS(xmlns, 'rect');
      rect.setAttribute('x', String(Math.floor(x * side)));
      rect.setAttribute('y', String(Math.floor(y * side)));
      rect.setAttribute('width', String(side + 1));
      rect.setAttribute('height', String(side + 1));
      rect.setAttribute('style', 'fill:' + color);
      svg.appendChild(rect);
    },
    end: function end() {}
  });
  return svg;
};
