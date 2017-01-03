(function() {
  'use strict';

  var globals = typeof window === 'undefined' ? global : window;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = ({}).hasOwnProperty;

  var unalias = function(alias, loaderPath) {
    var result = aliases[alias] || aliases[alias + '/index.js'];
    return result || alias;
  };

  var _reg = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (_reg.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = unalias(name, loaderPath);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has.call(cache, dirIndex)) return cache[dirIndex].exports;
    if (has.call(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '" from ' + '"' + loaderPath + '"');
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  require.register = require.define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  require.list = function() {
    var result = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        result.push(item);
      }
    }
    return result;
  };

  require.brunch = true;
  require._cache = cache;
  globals.require = require;
})();
require.register("views/about", function(exports, require, module) {
var __templateData = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div id=\"about_card\" class=\"card\"><div class=\"card-image\"><img src=\"images/duniter_250x250.png\"/></div><div class=\"card-content\"><span class=\"card-title grey-text text-darken-4\">{{ 'help.about_duniter.subtitle' | translate }}</span><p>{{ 'help.about_duniter.version' | translate }}<i>{{ version }}</i></p></div><div class=\"card-action\"><a href=\"https://duniter.org\" onclick=\"openExternal(this.href); return false\"><i class=\"fa fa-2x fa-globe\"></i><span>duniter.org</span></a><a href=\"https://github.com/duniter\" onclick=\"openExternal(this.href); return false\"><i class=\"fa fa-2x fa-github\"></i><span>github/duniter</span></a><a href=\"https://forum.duniter.org\" onclick=\"openExternal(this.href); return false\"><i class=\"fa fa-2x fa-comment-o\"></i><span>{{ 'help.about_duniter.forum' | translate }}</span></a><a href=\"https://jappix.com?r=duniter@muc.duniter.org\" onclick=\"openExternal(this.href); return false\"><i class=\"fa fa-2x fa-comments-o\"></i><span>{{ 'help.about_duniter.chat' | translate }}</span></a></div></div>");;return buf.join("");
};
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/error", function(exports, require, module) {
var __templateData = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<main><div class=\"container\"><div class=\"row\"><div class=\"s12 center\"><div class=\"card orange darken-1\"><div class=\"card-content white-text\"><i class=\"material-icons medium\">error</i><p>{{ errorMsg | translate }}</p></div><div class=\"card-action\"><div class=\"row\"><a href=\"#/\" translate=\"err.back_index\" class=\"btn-large orange darken-3 waves-light waves-effect\"></a></div></div></div></div></div></div></main>");;return buf.join("");
};
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/includes/blockchain", function(exports, require, module) {
var __templateData = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div class=\"row\"><div class=\"input-field col s6 m4\"><i class=\"prefix fa fa-chain\"></i><input id=\"medianTimeBlocks\" type=\"number\" ng-model=\"$parent.conf.medianTimeBlocks\"/><label for=\"medianTimeBlocks\">{{ 'configuration.create_parameters.medianTimeBlocks' | translate }}</label></div><div class=\"input-field col s6 m4\"><i class=\"prefix fa fa-hourglass-end\"></i><input id=\"avgGenTime\" type=\"number\" ng-model=\"$parent.conf.avgGenTime\"/><label for=\"avgGenTime\">{{ 'configuration.create_parameters.avgGenTime' | translate }}</label></div><div class=\"input-field col s6 m4\"><i class=\"prefix fa fa-cubes\"></i><input id=\"dtDiffEval\" type=\"number\" ng-model=\"$parent.conf.dtDiffEval\"/><label for=\"dtDiffEval\">{{ 'configuration.create_parameters.dtDiffEval' | translate }}</label></div><div class=\"input-field col s6 m4\"><i class=\"prefix fa fa-graduation-cap\"></i><input id=\"blocksRot\" type=\"number\" ng-model=\"$parent.conf.blocksRot\"/><label for=\"blocksRot\">{{ 'configuration.create_parameters.blocksRot' | translate }}</label></div><div class=\"input-field col s6 m4\"><i class=\"prefix fa fa-rotate-left\"></i><input id=\"percentRot\" type=\"number\" ng-model=\"$parent.conf.percentRot\"/><label for=\"percentRot\">{{ 'configuration.create_parameters.percentRot' | translate }}</label></div></div>");;return buf.join("");
};
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/includes/key", function(exports, require, module) {
var __templateData = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div class=\"row\"><div class=\"input-field col s12\"><i class=\"material-icons prefix\">vpn_key</i><input id=\"idty_entropy\" type=\"password\" ng-model=\"$parent.conf.idty_entropy\" data-position=\"top\" data-tooltip=\"{{ 'configuration.create_uid.entropy.tooltip' | translate }}\" class=\"tooltipped\"/><label for=\"idty_entropy\">{{ 'crypto.secret_key' | translate }}</label></div><div class=\"input-field col s12\"><i class=\"material-icons prefix\">vpn_key</i><input id=\"idty_password\" type=\"password\" ng-model=\"$parent.conf.idty_password\" data-position=\"top\" data-tooltip=\"{{ 'configuration.create_uid.password.tooltip' | translate }}\" class=\"tooltipped\"/><label for=\"idty_password\">Password</label></div><div class=\"input-field col s12\"><select disabled=\"disabled\"><option value=\"\" disabled=\"disabled\" translate=\"general.choose_option\"></option><option value=\"1\" selected=\"selected\" translate=\"configuration.create_uid.nrp_algo_choose_1\"></option><label>{{ 'configuration.create_uid.nrp_algo_choose' | translate }}</label></select></div><div class=\"input-field col s12\"><div ng-if=\"pubkey_preview\" class=\"container\"><h5 translate=\"configuration.create_uid.pubkey_preview\"></h5><pre class=\"pubkey\">{{ pubkey_preview }}</pre></div></div></div>");;return buf.join("");
};
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/includes/money", function(exports, require, module) {
var __templateData = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div class=\"row\"><div class=\"input-field col s12\"><i class=\"prefix fa fa-quote-left\"></i><input id=\"currency\" type=\"text\" ng-model=\"$parent.conf.currency\"/><label for=\"currency\">{{ 'configuration.create_parameters.currency' | translate }}</label></div><div class=\"input-field col s6 m4\"><i class=\"prefix fa fa-line-chart\"></i><input id=\"c\" type=\"number\" ng-model=\"$parent.conf.c\"/><label for=\"c\">{{ 'configuration.create_parameters.c' | translate }}</label></div><div class=\"input-field col s6 m4\"><i class=\"prefix fa fa-hourglass-end\"></i><input id=\"dt\" type=\"number\" ng-model=\"$parent.conf.dt\"/><label for=\"dt\">{{ 'configuration.create_parameters.dt' | translate }}</label></div><div class=\"input-field col s6 m4\"><i class=\"prefix fa fa-money\"></i><input id=\"ud0\" type=\"number\" ng-model=\"$parent.conf.ud0\"/><label for=\"ud0\">{{ 'configuration.create_parameters.ud0' | translate }}</label></div></div>");;return buf.join("");
};
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/includes/network_local", function(exports, require, module) {
var __templateData = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

;return buf.join("");
};
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/includes/network_remote", function(exports, require, module) {
var __templateData = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

;return buf.join("");
};
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/includes/wot", function(exports, require, module) {
var __templateData = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div class=\"row\"><div class=\"input-field col s6 m4\"><i class=\"prefix fa fa-database\"></i><input id=\"sigStock\" type=\"number\" ng-model=\"$parent.conf.sigStock\"/><label for=\"sigStock\">{{ 'configuration.create_parameters.sigStock' | translate }}</label></div><div class=\"input-field col s6 m4\"><i class=\"prefix fa fa-hourglass-end\"></i><input id=\"sigPeriod\" type=\"number\" ng-model=\"$parent.conf.sigPeriod\"/><label for=\"sigPeriod\">{{ 'configuration.create_parameters.sigPeriod' | translate }}</label></div><div class=\"input-field col s6 m4\"><i class=\"prefix fa fa-battery-3\"></i><input id=\"sigValidity\" type=\"number\" ng-model=\"$parent.conf.sigValidity\"/><label for=\"sigValidity\">{{ 'configuration.create_parameters.sigValidity' | translate }}</label></div><div class=\"input-field col s6 m4\"><i class=\"prefix fa fa-battery-3\"></i><input id=\"msValidity\" type=\"number\" ng-model=\"$parent.conf.msValidity\"/><label for=\"msValidity\">{{ 'configuration.create_parameters.msValidity' | translate }}</label></div><div class=\"input-field col s6 m4\"><i class=\"prefix fa fa-certificate\"></i><input id=\"sigQty\" type=\"number\" ng-model=\"$parent.conf.sigQty\"/><label for=\"sigQty\">{{ 'configuration.create_parameters.sigQty' | translate }}</label></div><div class=\"input-field col s6 m4\"><i class=\"prefix fa fa-object-ungroup\"></i><input id=\"sigWindow\" type=\"number\" ng-model=\"$parent.conf.sigWindow\"/><label for=\"sigWindow\">{{ 'configuration.create_parameters.sigWindow' | translate }}</label></div><div class=\"input-field col s6 m4\"><i class=\"prefix fa fa-map-marker\"></i><input id=\"stepMax\" type=\"number\" ng-model=\"$parent.conf.stepMax\"/><label for=\"stepMax\">{{ 'configuration.create_parameters.stepMax' | translate }}</label></div><div class=\"input-field col s6 m4\"><i class=\"prefix fa fa-users\"></i><input id=\"xpercent\" type=\"number\" ng-model=\"$parent.conf.xpercent\"/><label for=\"xpercent\">{{ 'configuration.create_parameters.xpercent' | translate }}</label></div></div>");;return buf.join("");
};
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/index", function(exports, require, module) {
var __templateData = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<main class=\"valign-wrapper\"><div class=\"container\"><div class=\"row\"><div class=\"s12 center\"><div class=\"preloader-wrapper active\"><div class=\"spinner-layer spinner-blue-only\"><div class=\"circle-clipper left\"><div class=\"circle\"></div></div></div></div><p>{{ message | translate:'{number: current_number}' }}</p></div></div></div></main>");;return buf.join("");
};
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/init/choose", function(exports, require, module) {
var __templateData = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<main><div class=\"container\"><div class=\"row\"><div class=\"s12 center\"><div class=\"card teal\"><div class=\"card-content white-text\"><h1 translate=\"configuration.init.choose.title\" class=\"card-title\"></h1><p translate=\"configuration.init.choose.message\"></p></div><div class=\"card-action\"><div class=\"row\"><button ui-sref=\"configure.create.uid\" class=\"btn-large waves-effect waves-light\"><i class=\"left fa fa-plus\"></i><span translate=\"configuration.init.choose.create\"></span></button></div><div class=\"row\"><button ui-sref=\"sync\" class=\"btn-large waves-effect waves-light\"><i class=\"left fa fa-code-fork\"></i><span translate=\"configuration.init.choose.connect\" class=\"truncate\"></span></button></div><div class=\"row\"><button type=\"file\" ngf-select=\"uploadFiles($file, $invalidFiles)\" accept=\"zip/*\" ngf-max-size=\"100MB\" class=\"btn-large waves-effect waves-light\"><i class=\"left fa fa-download\"></i><span translate=\"configuration.init.choose.import\"></span></button></div></div></div></div></div></div></main>");;return buf.join("");
};
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/init/create/create_network", function(exports, require, module) {
var __templateData = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div class=\"container\"><div class=\"row\"><form class=\"s12 center\"><div class=\"card\"><div class=\"card-action\"><i class=\"fa fa-globe fa-5x\"></i><h1 translate=\"configuration.create_network.title\" class=\"card-title\"></h1><div class=\"row\"><buttn ng-click=\"autoconfig()\" class=\"btn-large waves-effect waves-light\"><i class=\"left fa fa-magic\"></i><span translate=\"configuration.create_network.button.autoconf\"></span></buttn></div><div class=\"row\"><div class=\"col s12 m6 common-network\"><h1 translate=\"configuration.create_network.ipv6.title\" class=\"card-title\"></h1><p translate=\"configuration.create_network.ipv6.message\"></p><select ng-model=\"$parent.conf.local_ipv6\" class=\"browser-default\"><option value=\"\" selected=\"selected\" translate=\"configuration.create_network.none\"></option><option ng-repeat=\"inet in local_neti | filter : 'IPv6'\" value=\"{{ inet.addr }}\" ng-selected=\"{{inet.addr == $parent.conf.local_ipv6}}\">{{ inet.name }}</option></select><label>{{ 'configuration.create_network.local_ipv6' | translate }}</label></div><div class=\"col s12 m6 common-network\"><h1 translate=\"configuration.create_network.ipv4.title\" class=\"card-title\"></h1><p translate=\"configuration.create_network.ipv4.message\"></p><div class=\"col s12 m6\"><select ng-model=\"$parent.conf.local_ipv4\" class=\"browser-default\"><option value=\"\" translate=\"configuration.create_network.none\"></option><option ng-repeat=\"inet in local_neti | filter : 'IPv4'\" value=\"{{ inet.addr }}\" ng-selected=\"{{inet.addr == $parent.conf.local_ipv4}}\">{{ inet.name }}</option></select><label>{{ 'configuration.create_network.local_ipv4' | translate }}</label></div><div class=\"col s12 m6\"><select ng-model=\"$parent.conf.remote_ipv4\" class=\"browser-default\"><option value=\"\" selected=\"selected\" translate=\"configuration.create_network.none\"></option><option ng-repeat=\"inet in remote_neti | filter : 'IPv4'\" value=\"{{ inet.addr }}\" ng-selected=\"{{inet.addr == $parent.conf.remote_ipv4}}\">{{ inet.name }}</option></select><label>{{ 'configuration.create_network.remote_ipv4' | translate }}</label></div><div class=\"row\"></div><div class=\"col s12 m4 upnp\"><input id=\"upnp\" type=\"checkbox\" ng-model=\"$parent.conf.upnp\" class=\"filled-in\"/><label for=\"upnp\">{{ 'configuration.create_network.upnp' | translate }}</label></div></div><div class=\"row\"></div><div class=\"col s12 m6 common-network\"><h1 translate=\"configuration.create_network.port.title\" class=\"card-title\"></h1><p translate=\"configuration.create_network.port.message\"></p><div class=\"input-field col s6\"><i class=\"prefix fa fa-plug\"></i><input id=\"rport\" type=\"number\" ng-model=\"$parent.conf.rport\"/><label for=\"rport\">{{ 'configuration.create_network.port' | translate }}</label></div></div><div class=\"col s12 m6 common-network\"><h1 translate=\"configuration.create_network.dns.title\" class=\"card-title\"></h1><p translate=\"configuration.create_network.dns.message\"></p><div class=\"input-field\"><i class=\"prefix material-icons\">language</i><input id=\"dns\" type=\"text\" ng-model=\"$parent.conf.dns\"/><label for=\"dns\">{{ 'configuration.create_network.dns' | translate }}</label></div></div></div><div class=\"row\"><div class=\"col s12\"><button ui-sref=\"configure.create.parameters\" class=\"btn-large waves-effect waves-light button-next\"><i class=\"left fa fa-check\"></i><span translate=\"configuration.create_network.button.validate\"></span></button><button ui-sref=\"index\" class=\"orange btn-large waves-effect waves-light button-cancel\"><i class=\"left fa fa-sign-out\"></i><span translate=\"configuration.create_currency.cancel\"></span></button></div></div></div></div></form></div></div>");;return buf.join("");
};
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/init/create/create_parameters", function(exports, require, module) {
var __templateData = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div class=\"container\"><div class=\"row\"><form class=\"s12 center\"><div class=\"card\"><div class=\"card-content\"><i class=\"fa fa-balance-scale fa-5x\"></i><h1 translate=\"configuration.create_parameters.title\" class=\"card-title\"></h1><p translate=\"configuration.create_parameters.message\"></p></div><div class=\"card-action\"><h1 translate=\"configuration.create_parameters.currency.title\" class=\"card-title\"></h1><p translate=\"configuration.create_parameters.currency.message\"></p><div class=\"row\"><div class=\"input-field col s12\"><i class=\"prefix fa fa-quote-left\"></i><input id=\"currency\" type=\"text\" ng-model=\"$parent.conf.currency\"/><label for=\"currency\">{{ 'configuration.create_parameters.currency' | translate }}</label></div><div class=\"input-field col s6 m4\"><i class=\"prefix fa fa-line-chart\"></i><input id=\"c\" type=\"number\" ng-model=\"$parent.conf.c\"/><label for=\"c\">{{ 'configuration.create_parameters.c' | translate }}</label></div><div class=\"input-field col s6 m4\"><i class=\"prefix fa fa-hourglass-end\"></i><input id=\"dt\" type=\"number\" ng-model=\"$parent.conf.dt\"/><label for=\"dt\">{{ 'configuration.create_parameters.dt' | translate }}</label></div><div class=\"input-field col s6 m4\"><i class=\"prefix fa fa-money\"></i><input id=\"ud0\" type=\"number\" ng-model=\"$parent.conf.ud0\"/><label for=\"ud0\">{{ 'configuration.create_parameters.ud0' | translate }}</label></div></div></div><div class=\"card-action\"><h1 translate=\"configuration.create_parameters.wot.title\" class=\"card-title\"></h1><p translate=\"configuration.create_parameters.wot.message\"></p><div class=\"row\"><div class=\"input-field col s6 m4\"><i class=\"prefix fa fa-database\"></i><input id=\"sigStock\" type=\"number\" ng-model=\"$parent.conf.sigStock\"/><label for=\"sigStock\">{{ 'configuration.create_parameters.sigStock' | translate }}</label></div><div class=\"input-field col s6 m4\"><i class=\"prefix fa fa-hourglass-end\"></i><input id=\"sigPeriod\" type=\"number\" ng-model=\"$parent.conf.sigPeriod\"/><label for=\"sigPeriod\">{{ 'configuration.create_parameters.sigPeriod' | translate }}</label></div><div class=\"input-field col s6 m4\"><i class=\"prefix fa fa-battery-3\"></i><input id=\"sigValidity\" type=\"number\" ng-model=\"$parent.conf.sigValidity\"/><label for=\"sigValidity\">{{ 'configuration.create_parameters.sigValidity' | translate }}</label></div><div class=\"input-field col s6 m4\"><i class=\"prefix fa fa-battery-3\"></i><input id=\"msValidity\" type=\"number\" ng-model=\"$parent.conf.msValidity\"/><label for=\"msValidity\">{{ 'configuration.create_parameters.msValidity' | translate }}</label></div><div class=\"input-field col s6 m4\"><i class=\"prefix fa fa-certificate\"></i><input id=\"sigQty\" type=\"number\" ng-model=\"$parent.conf.sigQty\"/><label for=\"sigQty\">{{ 'configuration.create_parameters.sigQty' | translate }}</label></div><div class=\"input-field col s6 m4\"><i class=\"prefix fa fa-object-ungroup\"></i><input id=\"sigWindow\" type=\"number\" ng-model=\"$parent.conf.sigWindow\"/><label for=\"sigWindow\">{{ 'configuration.create_parameters.sigWindow' | translate }}</label></div><div class=\"input-field col s6 m4\"><i class=\"prefix fa fa-map-marker\"></i><input id=\"stepMax\" type=\"number\" ng-model=\"$parent.conf.stepMax\"/><label for=\"stepMax\">{{ 'configuration.create_parameters.stepMax' | translate }}</label></div><div class=\"input-field col s6 m4\"><i class=\"prefix fa fa-users\"></i><input id=\"xpercent\" type=\"number\" ng-model=\"$parent.conf.xpercent\"/><label for=\"xpercent\">{{ 'configuration.create_parameters.xpercent' | translate }}</label></div></div></div><div class=\"card-action\"><h1 translate=\"configuration.create_parameters.blockchain.title\" class=\"card-title\"></h1><p translate=\"configuration.create_parameters.blockchain.message\"></p><div class=\"row\"><div class=\"input-field col s6 m4\"><i class=\"prefix fa fa-chain\"></i><input id=\"medianTimeBlocks\" type=\"number\" ng-model=\"$parent.conf.medianTimeBlocks\"/><label for=\"medianTimeBlocks\">{{ 'configuration.create_parameters.medianTimeBlocks' | translate }}</label></div><div class=\"input-field col s6 m4\"><i class=\"prefix fa fa-hourglass-end\"></i><input id=\"avgGenTime\" type=\"number\" ng-model=\"$parent.conf.avgGenTime\"/><label for=\"avgGenTime\">{{ 'configuration.create_parameters.avgGenTime' | translate }}</label></div><div class=\"input-field col s6 m4\"><i class=\"prefix fa fa-cubes\"></i><input id=\"dtDiffEval\" type=\"number\" ng-model=\"$parent.conf.dtDiffEval\"/><label for=\"dtDiffEval\">{{ 'configuration.create_parameters.dtDiffEval' | translate }}</label></div><div class=\"input-field col s6 m4\"><i class=\"prefix fa fa-graduation-cap\"></i><input id=\"blocksRot\" type=\"number\" ng-model=\"$parent.conf.blocksRot\"/><label for=\"blocksRot\">{{ 'configuration.create_parameters.blocksRot' | translate }}</label></div><div class=\"input-field col s6 m4\"><i class=\"prefix fa fa-rotate-left\"></i><input id=\"percentRot\" type=\"number\" ng-model=\"$parent.conf.percentRot\"/><label for=\"percentRot\">{{ 'configuration.create_parameters.percentRot' | translate }}</label></div></div></div><div class=\"card-action\"><div class=\"row\"><div class=\"col s12\"><button ui-sref=\"index\" class=\"orange btn-large waves-effect waves-light button-cancel\"><i class=\"left fa fa-sign-out\"></i><span translate=\"configuration.create_currency.cancel\"></span></button><button ui-sref=\"configure.create.root\" class=\"btn-large waves-effect waves-light button-next\"><i class=\"left fa fa-check\"></i><span translate=\"configuration.create_parameters.button.validate\"></span></button></div></div></div></div></form></div></div>");;return buf.join("");
};
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/init/create/create_root", function(exports, require, module) {
var __templateData = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div class=\"container\"><div class=\"row\"><form class=\"s12 center\"><div class=\"card\"><div class=\"card-content\"><i class=\"fa fa-cube fa-5x\"></i><h1 translate=\"configuration.create_root.title\" class=\"card-title\"></h1><p translate=\"configuration.create_root.message\"></p></div><div class=\"card-action\"><div class=\"row\"><div class=\"col s12 m4\"><button ng-class=\"{ disabled: started }\" ng-disabled=\"started\" ng-click=\"start()\" class=\"btn-large waves-effect waves-light\"><i class=\"left fa fa-play\"></i><span translate=\"configuration.create_root.button.start\"></span></button></div><div class=\"col s12 m4\"><button ng-class=\"{ disabled: !started }\" ng-disabled=\"!started\" ng-click=\"stop()\" class=\"btn-large waves-effect waves-light\"><i class=\"left fa fa-stop\"></i><span translate=\"configuration.create_root.button.stop\"></span></button></div><div class=\"col s12 m4\"><button ng-class=\"{ disabled: !started }\" ng-disabled=\"!started\" ng-click=\"try()\" class=\"btn-large waves-effect waves-light\"><i class=\"left fa fa-cube\"></i><span translate=\"configuration.create_root.button.generate\"></span></button></div></div></div><div class=\"card-action\"><div ng-if=\"host_listening\" class=\"container\"><h5 translate=\"configuration.create_root.host_listening\"></h5><pre class=\"host_listening\">{{ host_listening }}</pre></div><pre ng-show=\"generated\" class=\"card-panel teal white-text code left-align small\">{{ generated }}</pre><blockquote ng-show=\"message\" class=\"card-panel left-align\">{{ message | translate }}</blockquote></div><div class=\"card-action\"><div class=\"row\"><div class=\"col s12\"><button ng-class=\"{ disabled: !(generated) }\" ng-disabled=\"!(generated)\" ng-click=\"accept()\" class=\"btn-large waves-effect waves-light\"><i class=\"left fa fa-rocket\"></i><span translate=\"configuration.create_root.button.accept_and_send\"></span></button></div></div><div class=\"row\"><div class=\"col s12\"><button ng-click=\"cancelAndReset()\" class=\"btn-large orange waves-effect waves-light\"><i class=\"left fa fa-sign-out\"></i><span translate=\"configuration.create_root.button.cancel\"></span></button></div></div></div></div></form></div></div>");;return buf.join("");
};
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/init/create/create_uid", function(exports, require, module) {
var __templateData = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div class=\"container\"><div class=\"row\"><form class=\"s12 center\"><div class=\"card idty_card\"><div class=\"card-content\"><i class=\"fa fa-user fa-5x\"></i><h1 translate=\"configuration.create_uid.title\" class=\"card-title\"></h1><p translate=\"configuration.create_uid.message\"></p></div><div class=\"card-action\"><div class=\"row\"><div class=\"input-field col s12\"><i class=\"prefix fa fa-user\"></i><input id=\"idty_uid\" type=\"text\" ng-model=\"$parent.conf.idty_uid\" data-position=\"top\" data-tooltip=\"{{ 'configuration.create_uid.uid.tooltip' | translate }}\" class=\"tooltipped\"/><label for=\"idty_uid\">User ID</label></div></div><div class=\"row\"><div class=\"input-field col s12\"><i class=\"material-icons prefix\">vpn_key</i><input id=\"idty_entropy\" type=\"password\" ng-model=\"$parent.conf.idty_entropy\" data-position=\"top\" data-tooltip=\"{{ 'configuration.create_uid.entropy.tooltip' | translate }}\" class=\"tooltipped\"/><label for=\"idty_entropy\">{{ 'crypto.secret_key' | translate }}</label></div><div class=\"input-field col s12\"><i class=\"material-icons prefix\">vpn_key</i><input id=\"idty_password\" type=\"password\" ng-model=\"$parent.conf.idty_password\" data-position=\"top\" data-tooltip=\"{{ 'configuration.create_uid.password.tooltip' | translate }}\" class=\"tooltipped\"/><label for=\"idty_password\">Password</label></div><div class=\"input-field col s12\"><select disabled=\"disabled\"><option value=\"\" disabled=\"disabled\" translate=\"general.choose_option\"></option><option value=\"1\" selected=\"selected\" translate=\"configuration.create_uid.nrp_algo_choose_1\"></option><label>{{ 'configuration.create_uid.nrp_algo_choose' | translate }}</label></select></div><div class=\"input-field col s12\"><div ng-if=\"pubkey_preview\" class=\"container\"><h5 translate=\"configuration.create_uid.pubkey_preview\"></h5><pre class=\"pubkey\">{{ pubkey_preview }}</pre></div></div></div><div class=\"row\"><div class=\"col s12\"><button ui-sref=\"index\" class=\"orange btn-large waves-effect waves-light button-cancel\"><i class=\"left fa fa-sign-out\"></i><span translate=\"configuration.create_currency.cancel\"></span></button><button ng-disabled=\"!$parent.conf.idty_uid || !$parent.conf.idty_entropy || !$parent.conf.idty_password\" ng-click=\"accept()\" class=\"button-next btn-large waves-effect waves-light\"><i class=\"left fa fa-check\"></i><span translate=\"configuration.create_uid.create_button\"></span></button></div></div></div></div></form></div></div>");;return buf.join("");
};
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/init/layout", function(exports, require, module) {
var __templateData = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<main ui-view=\"\"></main><div id=\"modal1\" class=\"modal\"><div class=\"modal-content\"><h4>{{ 'configuration.create_uid.modal_title' | translate }}</h4><p>{{ 'configuration.create_uid.modal_message' | translate }}</p></div><div class=\"modal-footer\"><a class=\"btn modal-action modal-close waves-effect waves-light btn-flat\">{{ 'configuration.create_uid.modal_disagree' | translate }}</a><a ui-sref=\"configure.create.network\" class=\"btn modal-action modal-close waves-effect waves-orange\"><i class=\"material-icons left\">done</i>" + (jade.escape(null == (jade_interp = "{{ 'configuration.create_uid.modal_agree' | translate }}") ? "" : jade_interp)) + "</a></div></div>");;return buf.join("");
};
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/init/sync/sync", function(exports, require, module) {
var __templateData = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<main><div class=\"container\"><div class=\"row\"><div class=\"s12 center\"><div class=\"card\"><div class=\"card-content\"><i class=\"fa fa-cloud-download fa-5x\"></i><h1 translate=\"sync.title\" class=\"card-title\"></h1><p translate=\"sync.message\"></p></div><div class=\"card-action\"><form class=\"row\"><div class=\"input-field col s12 m3\"><p><input type=\"radio\" name=\"groupeMode\" value=\"simplified\" id=\"radio1\" ng-model=\"sync_mode\" ng-disabled=\"synchronizing\"/><label for=\"radio1\">{{ 'sync.mode.simplified' | translate }}</label></p><p><input type=\"radio\" name=\"groupeMode\" value=\"manual\" id=\"radio2\" ng-model=\"sync_mode\" ng-disabled=\"synchronizing\"/><label for=\"radio2\">{{ 'sync.mode.manual' | translate }}</label></p></div><div class=\"input-field col s12 m6\"><div ng-show=\"sync_mode == 'simplified'\" class=\"input-field col s12\"><select ng-model=\"simplified_host\" ng-change=\"checkNode()\" ng-disabled=\"synchronizing\" class=\"browser-default\"><option value=\"\" disabled=\"disabled\" selected=\"selected\">{{ 'sync.simplified.default_option' | translate }}</option><optgroup label=\"{{ 'sync.simplified.currency' | translate }} « TestNet »\"><option value=\"duniter.org:8999\">duniter.org {{ 'sync.simplified.main_mirror' | translate }}</option><option value=\"testnet.duniter.inso.ovh:80\">testnet.duniter.inso.ovh:80</option></optgroup></select><label>{{ 'sync.simplified.choose' | translate }}</label></div><div ng-show=\"sync_mode != 'simplified'\" class=\"input-field col s8\"><i class=\"prefix material-icons\">language</i><input id=\"host\" type=\"text\" ng-model=\"host\"/><label for=\"host\">{{ 'sync.host' | translate }}</label></div><div ng-show=\"sync_mode != 'simplified'\" class=\"input-field col s4\"><i class=\"prefix fa fa-plug\"></i><input id=\"port\" type=\"number\" ng-model=\"port\"/><label for=\"port\">{{ 'sync.port' | translate }}</label></div></div><div class=\"col s12 m3\"><div ng-if=\"checking\" class=\"preloader-wrapper active small\"><div class=\"spinner-layer spinner-blue-only\"><div class=\"circle-clipper left\"><div class=\"circle\"></div></div></div></div><div ng-show=\"sync_mode != 'simplified'\" class=\"input-field\"><button ng-show=\"!checking\" ng-disabled=\"synchronizing || (sync_mode != 'simplified' &amp;&amp; !(host &amp;&amp; port))\" ng-click=\"checkNode()\" class=\"btn-large waves-effect waves-light\"><i class=\"left fa fa-wifi\"></i><span translate=\"sync.check\"></span></button></div></div></form><div class=\"row\"><div class=\"col s12\"><blockquote ng-show=\"sync_error\" class=\"card-panel left-align\">{{ sync_error | translate }}</blockquote><blockquote ng-show=\"sync_message\" class=\"info card-panel left-align\">{{ sync_message }}</blockquote></div></div><div class=\"row\"><button ng-disabled=\"!checked_host || synchronizing\" ng-click=\"startSync()\" class=\"btn-large waves-effect waves-light\"><i class=\"left fa fa-cloud-download\"></i><span translate=\"sync.start\"></span></button></div><div ng-show=\"synchronizing\" class=\"row\"><div class=\"col s8 m9\"><div class=\"progress\"><div style=\"width: {{ down_percent }}%\" class=\"determinate\"></div></div></div><div class=\"col s4 m3 left-align\"><span>Downloading... ({{ down_percent }}%)</span></div><div class=\"col s8 m9\"><div class=\"progress\"><div style=\"width: {{ apply_percent }}%\" class=\"determinate\"></div></div></div><div class=\"col s4 m3 left-align\"><span>Applying... ({{ apply_percent }}%)</span></div></div><blockquote ng-show=\"sync_failed\" class=\"card-panel left-align\">{{ 'sync.failed' | translate }}</blockquote></div></div></div></div></div></main>");;return buf.join("");
};
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/logs", function(exports, require, module) {
var __templateData = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<ul id=\"slide-out\" class=\"side-nav\"><li><div class=\"card hide-on-med-and-up\"><div class=\"card-image\"><img src=\"images/menu_bg.jpg\"/><p class=\"card-title\"><span class=\"menu-title\">meta_brouzouf</span><span class=\"menu-speach\">22 members</span><span class=\"menu-footer\">DuniterUI v0.21.0</span></p></div></div></li><li><a ui-sref=\"home\" class=\"waves-effect waves-teal\"><i class=\"fa fa-2x fa-photo\"></i>" + (jade.escape(null == (jade_interp = 'Overview') ? "" : jade_interp)) + "</a></li><li><a ui-sref=\"graphs.blockchain\" class=\"waves-effect waves-teal\"><i class=\"fa fa-2x fa-area-chart\"></i>" + (jade.escape(null == (jade_interp = 'Charts') ? "" : jade_interp)) + "</a></li><li><a href=\"#!\" class=\"waves-effect waves-teal\"><i class=\"fa fa-2x fa-heartbeat\"></i>" + (jade.escape(null == (jade_interp = 'Status') ? "" : jade_interp)) + "</a></li><li><a ui-sref=\"settings.data\" class=\"waves-effect waves-teal\"><i class=\"fa fa-2x fa-gear\"></i>" + (jade.escape(null == (jade_interp = 'Settings') ? "" : jade_interp)) + "</a></li></ul><div id=\"card-logs\" class=\"card\"><div class=\"card-action left-align\"><p><input id=\"follow-logs\" type=\"checkbox\" ng-model=\"follow\" class=\"filled-in\"/><label for=\"follow-logs\">{{ 'home.tabs.logs.follow.logs' | translate }}</label><input id=\"pause-logs\" type=\"checkbox\" ng-model=\"pause\" class=\"filled-in\"/><label for=\"pause-logs\">{{ 'home.tabs.logs.pause.logs' | translate }}</label><input id=\"level-error\" type=\"checkbox\" ng-model=\"levels.error\" class=\"filled-in\"/><label for=\"level-error\">{{ 'home.tabs.logs.level.error' | translate }}</label><input id=\"level-warn\" type=\"checkbox\" ng-model=\"levels.warn\" class=\"filled-in\"/><label for=\"level-warn\">{{ 'home.tabs.logs.level.warn' | translate }}</label><input id=\"level-info\" type=\"checkbox\" ng-model=\"levels.info\" class=\"filled-in\"/><label for=\"level-info\">{{ 'home.tabs.logs.level.info' | translate }}</label><input id=\"level-debug\" type=\"checkbox\" ng-model=\"levels.debug\" class=\"filled-in\"/><label for=\"level-debug\">{{ 'home.tabs.logs.level.debug' | translate }}</label><input id=\"level-trace\" type=\"checkbox\" ng-model=\"levels.trace\" class=\"filled-in\"/><label for=\"level-trace\">{{ 'home.tabs.logs.level.trace' | translate }}</label></p><p>{{ 'graphs.blockchain.range' | translate }}</p><div class=\"range-field\"><input type=\"range\" min=\"10\" max=\"10000\" ng-model=\"logsSize\" ng-mouseup=\"changeSize()\"/></div></div></div><pre id=\"logs\"><p ng-repeat=\"log in logs track by $index\"><span class=\"log-time\">{{ log.timestamp }}&nbsp;</span><span class=\"log-level {{ log.level }}\">{{ log.level }}&nbsp;</span><span class=\"log-msg {{ log.level }}\">{{ log.msg }}</span></p></pre>");;return buf.join("");
};
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/main/graphs/blockchain", function(exports, require, module) {
var __templateData = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div class=\"container\"><div class=\"row\"><div class=\"card\"><div class=\"card-action\"><div class=\"row\"><div class=\"col s12\"><div class=\"container\"><p>{{ 'graphs.blockchain.range' | translate }}</p><div class=\"range-field\"><input type=\"range\" min=\"30\" max=\"600\" ng-model=\"blocksCount\" ng-mouseup=\"updateGraphs()\"/></div><!--.input-field.col.s6.m4--><!--  input#time.filled-in(type=\"checkbox\" ng-model=\"withTime\")--><!--  label(for=\"time\") {{ 'graphs.blockchain.with.time' | translate }}--><!-- Too heavy for now--><!--.input-field.col.s6.m4--><!--  input#speed.filled-in(type=\"checkbox\" ng-model=\"withSpeed\")--><!--  label(for=\"speed\") {{ 'graphs.blockchain.with.speed' | translate }}--><!--.input-field.col.s6.m4--><!--  input#difficulty.filled-in(type=\"checkbox\" ng-model=\"withDifficulty\")--><!--  label(for=\"difficulty\") {{ 'graphs.blockchain.with.difficulty' | translate }}--></div><div ng-if=\"loading\" class=\"s12 center\"><div class=\"row\"></div><div class=\"row\"></div><div class=\"preloader-wrapper active\"><div class=\"spinner-layer spinner-blue-only\"><div class=\"circle-clipper left\"><div class=\"circle\"></div></div></div></div><p>{{ message | translate:'{number: current_number}' }}</p></div></div><div id=\"timeGraph\"></div><!--#speedGraph--><div id=\"difficultyGraph\"></div></div></div></div></div></div>");;return buf.join("");
};
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/main/graphs/graphs", function(exports, require, module) {
var __templateData = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div id=\"modalReset\" class=\"modal\"><div class=\"modal-content\"><h4>{{ 'graphs.data.modal_title' | translate }}</h4><p>{{ 'graphs.data.modal_message' | translate }}</p></div><div class=\"modal-footer\"><a class=\"btn modal-action modal-close waves-effect waves-light btn-flat\">{{ 'graphs.data.modal_disagree' | translate }}</a><a ng-click=\"fullReset()\" class=\"btn modal-action modal-close waves-effect waves-light orange\"><i class=\"material-icons left\">done</i>" + (jade.escape(null == (jade_interp = "{{ 'graphs.data.modal_agree' | translate }}") ? "" : jade_interp)) + "</a></div></div><main class=\"home-main main-screen\"><div class=\"container\"><div class=\"row\"><div class=\"col s12\"><ul class=\"tabs\"><li class=\"tab col s6\"><a href=\"#main.graphs.blockchain\"><i class=\"fa fa-chain\">&nbsp;</i>" + (jade.escape(null == (jade_interp = " {{ 'graphs.tabs.blockchain' | translate }}") ? "" : jade_interp)) + "</a></li><li class=\"tab col s6 disabled\"><a href=\"#main.graphs.currency\"><i class=\"fa fa-money\">&nbsp;</i>" + (jade.escape(null == (jade_interp = " {{ 'graphs.tabs.currency' | translate }}") ? "" : jade_interp)) + "</a></li></ul></div></div></div><div ui-view=\"\" class=\"ui-scrollable\"></div></main>");;return buf.join("");
};
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/main/home/home", function(exports, require, module) {
var __templateData = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<main class=\"home-main main-screen\"><div class=\"container\"><div class=\"row\"><div class=\"col s12\"><ul class=\"tabs\"><li class=\"tab col s3\"><a href=\"#main.home.overview\"><i class=\"fa fa-photo\">&nbsp;</i>" + (jade.escape(null == (jade_interp = " {{ 'home.tabs.overview' | translate }}") ? "" : jade_interp)) + "</a></li><li class=\"tab col s3\"><a href=\"#main.home.network\"><i class=\"fa fa-globe\">&nbsp;</i>" + (jade.escape(null == (jade_interp = " {{ 'home.tabs.network' | translate }}") ? "" : jade_interp)) + "</a></li></ul></div></div></div><div ui-view=\"\" class=\"ui-scrollable\"></div></main>");;return buf.join("");
};
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/main/home/tabs/logs", function(exports, require, module) {
var __templateData = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div class=\"row\"><div class=\"s12 center\"><div class=\"card logs\"><div class=\"card-action left-align\"><p><input id=\"follow-logs\" type=\"checkbox\" ng-model=\"follow\" class=\"filled-in\"/><label for=\"follow-logs\">{{ 'home.tabs.logs.follow.logs' | translate }}</label><input id=\"pause-logs\" type=\"checkbox\" ng-model=\"pause\" class=\"filled-in\"/><label for=\"pause-logs\">{{ 'home.tabs.logs.pause.logs' | translate }}</label><input id=\"level-error\" type=\"checkbox\" ng-model=\"levels.error\" class=\"filled-in\"/><label for=\"level-error\">{{ 'home.tabs.logs.level.error' | translate }}</label><input id=\"level-warn\" type=\"checkbox\" ng-model=\"levels.warn\" class=\"filled-in\"/><label for=\"level-warn\">{{ 'home.tabs.logs.level.warn' | translate }}</label><input id=\"level-info\" type=\"checkbox\" ng-model=\"levels.info\" class=\"filled-in\"/><label for=\"level-info\">{{ 'home.tabs.logs.level.info' | translate }}</label><input id=\"level-debug\" type=\"checkbox\" ng-model=\"levels.debug\" class=\"filled-in\"/><label for=\"level-debug\">{{ 'home.tabs.logs.level.debug' | translate }}</label><input id=\"level-trace\" type=\"checkbox\" ng-model=\"levels.trace\" class=\"filled-in\"/><label for=\"level-trace\">{{ 'home.tabs.logs.level.trace' | translate }}</label></p><p>{{ 'graphs.blockchain.range' | translate }}</p><div class=\"range-field\"><input type=\"range\" min=\"10\" max=\"10000\" ng-model=\"logsSize\" ng-mouseup=\"changeSize()\"/></div></div><div class=\"card-action left-align ui-scrollable\"><pre id=\"logs\"><p ng-repeat=\"log in logs track by $index\"><span class=\"log-time\">{{ log.timestamp }}&nbsp;</span><span class=\"log-level {{ log.level }}\">{{ log.level }}&nbsp;</span><span class=\"log-msg {{ log.level }}\">{{ log.msg }}</span></p></pre></div></div></div></div>");;return buf.join("");
};
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/main/home/tabs/network", function(exports, require, module) {
var __templateData = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div class=\"container\"><div class=\"row\"><div class=\"col s12\"><div class=\"card\"><div class=\"card-action center\"><button ng-click=\"update()\" class=\"teal btn-large waves-effect waves-light\"><i class=\"left fa fa-repeat\"></i><span translate=\"home.tabs.network.button.update\"></span></button></div><div class=\"card-action\"><div ng-if=\"searching\" class=\"center\"><div class=\"preloader-wrapper active\"><div class=\"spinner-layer spinner-blue-only\"><div class=\"circle-clipper left\"><div class=\"circle\"></div></div></div></div></div><table ng-if=\"!searching\" class=\"bordered\"><thead><tr><th>Pubkey</th><th>Status</th><th>Endpoint</th></tr></thead><tbody><tr ng-repeat=\"peer in peers track by $index\"><td>{{ peer.pubkey.substr(0,6) }}</td><td>{{ peer.status }}</td><td>{{ peer.endpoints[0] }}</td></tr></tbody></table></div></div></div></div></div>");;return buf.join("");
};
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/main/home/tabs/overview", function(exports, require, module) {
var __templateData = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div class=\"container\"><div ng-show=\"should_reconfigure\" class=\"row\"><div class=\"card network-alert\"><blockquote class=\"card-content left-align\"><div class=\"center\"><i class=\"fa fa-globe fa-5x\"></i><h6 translate=\"configuration.create_network.title\" class=\"card-title\"></h6></div><div class=\"left-align\"><p>{{ 'home.tabs.overview.should_reconfigure' | translate }}</p></div><div ng-if=\"!reconfiguring\" class=\"center\"><button ng-click=\"reconfigure_network()\" class=\"btn-large waves-effect waves-light\"><i class=\"left fa fa-magic\"></i><span translate=\"configuration.create_network.button.autoconf\"></span></button></div><div ng-if=\"reconfiguring\" class=\"center\"><div class=\"preloader-wrapper active\"><div class=\"spinner-layer spinner-blue-only\"><div class=\"circle-clipper left\"><div class=\"circle\"></div></div></div></div></div></blockquote></div></div><div class=\"row\"><div class=\"col s12\"><div class=\"card-panel currency\"><h1>{{ current_currency }}</h1></div></div></div><div class=\"row home\"><div class=\"col s6 m3\"><div class=\"card sync\"><div class=\"card-content\"><div ng-show=\"is_pulling\" class=\"card-title\"><p>{{ 'home.pulling.network' | translate }} {{ network_percent }}%</p><div class=\"progress\"><div style=\"width: {{ network_percent }}%\" class=\"determinate\"></div></div><p>{{ 'home.pulling.peer' | translate }} {{ peer_percent }}%</p><div class=\"progress\"><div style=\"width: {{ peer_percent }}%\" class=\"determinate\"></div></div></div><div ng-show=\"has_pulled &amp;&amp; !is_pulling\" class=\"iconic card-title\"><i class=\"green-text material-icons\">done</i></div><div ng-show=\"!has_pulled &amp;&amp; !is_pulling\" class=\"iconic card-title\"><i class=\"grey-text material-icons\">schedule</i></div></div><div class=\"card-action\"><p ng-show=\"!is_pulling\">{{ sync_state | translate }} {{ sync_time }}</p><p ng-show=\"is_pulling\">{{ sync_state | translate }}</p></div></div></div><div class=\"col s6 m3\"><div id=\"server_state\" class=\"card\"><div class=\"card-content\"><div class=\"card-title\"><i ng-if=\"server_stopped\" class=\"red-text material-icons\">stop</i><i ng-if=\"server_started\" class=\"green-text material-icons\">play_arrow</i><div ng-if=\"!server_started &amp;&amp; !server_stopped\" class=\"preloader-wrapper active\"><div class=\"spinner-layer spinner-blue-only\"><div class=\"circle-clipper left\"><div class=\"circle\"></div></div></div></div></div></div><div class=\"card-action\"><p>{{ 'home.state' | translate }} &nbsp;<span ng-if=\"server_started\" class=\"green-text\">{{ 'home.state.started' | translate }}</span><span ng-if=\"server_stopped\" class=\"red-text\">{{ 'home.state.stopped' | translate }}</span><span ng-if=\"!server_started &amp;&amp; !server_stopped\" class=\"blue-text\">...</span></p></div></div></div><div class=\"col s6 m3\"><div class=\"card\"><div class=\"card-content\"><i class=\"fa fa-chain fa-5x\"></i><div class=\"card-title\"><span>{{ current_number }}</span></div></div><div class=\"card-action\"><p>{{ 'home.current_number' | translate }}</p></div></div></div><div class=\"col s6 m3\"><div class=\"card\"><div class=\"card-content\"><i class=\"fa fa-users fa-5x\"></i><div class=\"card-title\"><span>{{ current_membersCount }}</span></div></div><div class=\"card-action\"><p>{{ 'home.current_membersCount' | translate }}</p></div></div></div><div class=\"col s6 m3\"><div class=\"card card-time\"><div class=\"card-content\"><i class=\"fa fa-hourglass-half fa-5x\"></i><div class=\"card-title\"><p>{{ current_medianTime | mt_date }}</p><p>{{ current_medianTime | mt_time }}</p></div></div><div class=\"card-action\"><p>{{ 'home.current_medianTime' | translate }}</p></div></div></div><div class=\"col s6 m3\"><div class=\"card\"><div class=\"card-content\"><i class=\"fa fa-graduation-cap fa-5x\"></i><div class=\"card-title\"><span>{{ current_powMin }}</span></div></div><div class=\"card-action\"><p>{{ 'home.current_powMin' | translate }}</p></div></div></div><div class=\"col s6 m3\"><div class=\"card\"><div class=\"card-content\"><i class=\"fa fa-money fa-5x\"></i><div class=\"card-title\"><span>{{ monetaryMass }}&nbsp;UD</span></div></div><div class=\"card-action\"><p>{{ 'home.current.mmass' | translate }}</p></div></div></div><div class=\"col s6 m3\"><div class=\"card proof-card\"><div class=\"card-content\"><i class=\"fa fa-dashboard fa-5x\"></i><div class=\"card-title\"><span class=\"proof-mesure\">{{ pow_total }}</span><span class=\"proof-unit\">{{ 'home.pow.unit' | translate }}</span></div></div><div class=\"card-action\"><div ng-show=\"!pow_waiting &amp;&amp; lastNearPoW\"><p class=\"hash\"><span>{{ lastNearPoW.slice(0,8) }}</span><div class=\"progress\"><div class=\"indeterminate\"></div></div></p></div><div ng-show=\"pow_mirror\"><p><span>{{ 'home.pow.is_mirror' | translate }}</span></p></div><div ng-show=\"!pow_mirror &amp;&amp; pow_waiting\"><p><span>{{ 'home.pow.is_waiting' | translate }}</span></p></div></div></div></div></div></div>");;return buf.join("");
};
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/main/main", function(exports, require, module) {
var __templateData = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<ul id=\"slide-out\" class=\"side-nav\"><li><div class=\"card hide-on-med-and-up\"><div class=\"card-image\"><img src=\"images/menu_bg.jpg\"/><p class=\"card-title\"><span class=\"menu-title\">meta_brouzouf</span><span class=\"menu-speach\">22 members</span><span class=\"menu-footer\">DuniterUI v0.21.0</span></p></div></div></li><li><a ui-sref=\"home\" class=\"waves-effect waves-teal\"><i class=\"fa fa-2x fa-photo\"></i>" + (jade.escape(null == (jade_interp = 'Overview') ? "" : jade_interp)) + "</a></li><li><a ui-sref=\"graphs.blockchain\" class=\"waves-effect waves-teal\"><i class=\"fa fa-2x fa-area-chart\"></i>" + (jade.escape(null == (jade_interp = 'Charts') ? "" : jade_interp)) + "</a></li><li><a href=\"#!\" class=\"waves-effect waves-teal\"><i class=\"fa fa-2x fa-heartbeat\"></i>" + (jade.escape(null == (jade_interp = 'Status') ? "" : jade_interp)) + "</a></li><li><a ui-sref=\"settings.data\" class=\"waves-effect waves-teal\"><i class=\"fa fa-2x fa-gear\"></i>" + (jade.escape(null == (jade_interp = 'Settings') ? "" : jade_interp)) + "</a></li></ul><ul id=\"about\" class=\"dropdown-content\"><li><button ng-click=\"showAbout()\" class=\"btn-flat left-align\"><i class=\"material-icons left\">info_outline</i><span>{{ 'help.about_duniter' | translate }}</span></button></li><li ng-repeat=\"entry in notifications.help\"><button ng-click=\"entry.onclick()\" class=\"btn-flat left-align\"><i class=\"material-icons left\">{{ entry.icon }}</i><span data-badge=\"1\">{{ entry.message | translate }}</span></button></li></ul><ul id=\"serveractions\" class=\"dropdown-content\"><li><button ng-click=\"restartServer()\" class=\"btn-flat left-align\"><i class=\"material-icons left\">replay</i><span>{{ 'home.menu.server.restart' | translate }}</span></button></li><li><button ng-click=\"startServer()\" ng-class=\"{ disabled : server_started || !server_stopped }\" ng-disabled=\"server_started\" class=\"btn-flat left-align\"><i class=\"material-icons left\">play_arrow</i><span>{{ 'home.menu.server.start' | translate }}</span></button></li><li><button ng-click=\"stopServer()\" ng-class=\"{ disabled : server_stopped || !server_started }\" ng-disabled=\"server_stopped\" class=\"btn-flat left-align\"><i class=\"material-icons left\">stop</i><span>{{ 'home.menu.server.stop' | translate }}</span></button></li></ul><nav><div class=\"nav-wrapper\"><span data-activates=\"slide-out\" class=\"waves-effect waves-light button-collapse stop-nav full hide-on-med-and-up\"><i class=\"mdi-navigation-menu\"></i></span><!--<a href=\"#\" class=\"brand-logo left\">Logo</a>--><ul class=\"left hide-on-small-and-down\"><li ng-class=\"{ active: menu == 'home' }\"><a ui-sref=\"main.home.overview\" class=\"waves-effect waves-light\"><i class=\"fa fa-2x fa-home left\"></i><span>{{ 'top.menu.overview' | translate }}</span></a></li><li ng-class=\"{ active: menu == 'graphs' }\"><a ui-sref=\"main.graphs.blockchain\" class=\"waves-effect waves-light\"><i class=\"fa fa-2x fa-database left\"></i><span>{{ 'top.menu.data' | translate }}</span></a></li><li ng-class=\"{ active: menu == 'settings' }\"><a ui-sref=\"main.settings.logs\" class=\"waves-effect waves-light\"><i class=\"fa fa-2x fa-gear left\"></i><span>{{ 'top.menu.settings' | translate }}</span></a></li></ul><ul class=\"right\"><li><a ng-click=\"openWallet()\" class=\"waves-effect waves-light\"><i class=\"fa fa-2x fa-suitcase left\"></i><span>{{ 'top.menu.wallet' | translate }}</span></a></li><li><a href=\"#!\" data-activates=\"about\" data-badge=\"{{ notifications.help.length }}\" class=\"waves-effect waves-light dropdown-button\"><i class=\"material-icons\">info_outline</i></a></li><li><a href=\"#!\" data-activates=\"serveractions\" class=\"waves-effect waves-light dropdown-button\"><i class=\"material-icons\">more_vert</i></a></li></ul></div></nav><div ui-view=\"\"></div>");;return buf.join("");
};
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/main/settings/settings", function(exports, require, module) {
var __templateData = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div id=\"modalReset\" class=\"modal\"><div class=\"modal-content\"><h4>{{ 'settings.data.modal_title' | translate }}</h4><p>{{ 'settings.data.modal_message' | translate }}</p></div><div class=\"modal-footer\"><a class=\"btn modal-action modal-close waves-effect waves-light btn-flat\">{{ 'settings.data.modal_disagree' | translate }}</a><a ng-click=\"fullReset()\" class=\"btn modal-action modal-close waves-effect waves-light orange\"><i class=\"material-icons left\">done</i>" + (jade.escape(null == (jade_interp = "{{ 'settings.data.modal_agree' | translate }}") ? "" : jade_interp)) + "</a></div></div><main class=\"home-main main-screen\"><div class=\"container\"><div class=\"row\"><div class=\"col s12\"><ul class=\"tabs\"><li class=\"tab col s2\"><a href=\"#main.settings.logs\"><i class=\"fa fa-newspaper-o\">&nbsp;</i>" + (jade.escape(null == (jade_interp = " {{ 'settings.tabs.logs' | translate }}") ? "" : jade_interp)) + "</a></li><li class=\"tab col s2\"><a href=\"#main.settings.backup\"><i class=\"fa fa-folder-open\">&nbsp;</i>" + (jade.escape(null == (jade_interp = " {{ 'settings.tabs.backup' | translate }}") ? "" : jade_interp)) + "</a></li><li class=\"tab col s2\"><a href=\"#main.settings.data\"><i class=\"fa fa-database\">&nbsp;</i>" + (jade.escape(null == (jade_interp = " {{ 'settings.tabs.data' | translate }}") ? "" : jade_interp)) + "</a></li><li class=\"tab col s2\"><a href=\"#main.settings.crypto\"><i class=\"fa fa-key\">&nbsp;</i>" + (jade.escape(null == (jade_interp = " {{ 'settings.tabs.identity' | translate }}") ? "" : jade_interp)) + "</a></li><li class=\"tab col s2\"><a href=\"#main.settings.network\"><i class=\"fa fa-globe\">&nbsp;</i>" + (jade.escape(null == (jade_interp = " {{ 'settings.tabs.network' | translate }}") ? "" : jade_interp)) + "</a></li><li class=\"tab col s2\"><a href=\"#main.settings.currency\"><i class=\"fa fa-balance-scale\">&nbsp;</i>" + (jade.escape(null == (jade_interp = " {{ 'settings.tabs.currency' | translate }}") ? "" : jade_interp)) + "</a></li><li class=\"tab col s2\"><a href=\"#main.settings.cpu\"><i class=\"fa fa-dashboard\">&nbsp;</i>" + (jade.escape(null == (jade_interp = " {{ 'settings.tabs.cpu' | translate }}") ? "" : jade_interp)) + "</a></li></ul></div></div></div><div ui-view=\"\" class=\"ui-scrollable\"></div></main>");;return buf.join("");
};
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/main/settings/tabs/backup", function(exports, require, module) {
var __templateData = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div class=\"container\"><div class=\"row\"><form class=\"s12 center\"><div class=\"card\"><div class=\"card-action\"><i class=\"fa fa-folder-open fa-5x\"></i><h1 translate=\"settings.data.backup.title\" class=\"card-title\"></h1><p translate=\"settings.data.backup.message\"></p><blockquote translate=\"settings.data.backup.warning\" class=\"left-align blue lighten-5\"></blockquote><div class=\"row\"><div class=\"col s12 m6\"><a ng-href=\"{{ export_link }}\" class=\"blue btn-large waves-effect waves-light\"><i class=\"left fa fa-save\"></i><span translate=\"settings.data.backup.button.export\"></span></a></div><div class=\"col s12 m6\"><button type=\"file\" ngf-select=\"uploadFiles($file, $invalidFiles)\" accept=\"zip/*\" ngf-max-size=\"100MB\" class=\"btn-large waves-effect waves-light\"><i class=\"left fa fa-download\"></i><span translate=\"settings.data.backup.button.import\"></span></button></div></div></div></div></form></div></div>");;return buf.join("");
};
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/main/settings/tabs/cpu", function(exports, require, module) {
var __templateData = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div class=\"container\"><div class=\"row\"><form class=\"s12 center\"><div class=\"card\"><div class=\"card-action\"><i class=\"fa fa-dashboard fa-5x\"></i><h1 translate=\"settings.cpu.title\" class=\"card-title\"></h1><p translate=\"settings.cpu.message\"></p><blockquote translate=\"settings.cpu.warning\" class=\"left-align blue lighten-5\"></blockquote><div class=\"row\"><p>{{ 'settings.cpu.range' | translate }}</p><div class=\"range-field\"><input ng-disabled=\"savingCPU\" type=\"range\" min=\"0\" max=\"100\" ng-model=\"cpuPower\" ng-mouseup=\"updateCPUpower()\"/></div></div><h1 class=\"card-title\">{{ 'settings.cpu.power' | translate }} {{ cpuPower }}%</h1></div></div></form></div></div>");;return buf.join("");
};
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/main/settings/tabs/crypto", function(exports, require, module) {
var __templateData = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div class=\"container\"><div class=\"row\"><form class=\"s12 center\"><div class=\"card\"><div class=\"card-action\"><i class=\"fa fa-key fa-5x\"></i><h1 translate=\"settings.key.title\" class=\"card-title\"></h1><div class=\"container\"><pre class=\"pubkey\">{{ pubkey }}</pre></div><p>{{ 'settings.key.pubkey.description' | translate }}</p><div class=\"container\"><div class=\"row\"><button ng-click=\"changeKey = true\" class=\"btn-large waves-effect waves-light\"><i class=\"fa fa-refresh left\"></i><span translate=\"settings.key.button.change\"></span></button></div></div><div ng-show=\"changeKey\" class=\"container\"><div class=\"row\"><div class=\"input-field col s12\"><i class=\"material-icons prefix\">vpn_key</i><input id=\"idty_entropy\" type=\"password\" ng-model=\"$parent.conf.idty_entropy\" data-position=\"top\" data-tooltip=\"{{ 'configuration.create_uid.entropy.tooltip' | translate }}\" class=\"tooltipped\"/><label for=\"idty_entropy\">{{ 'crypto.secret_key' | translate }}</label></div><div class=\"input-field col s12\"><i class=\"material-icons prefix\">vpn_key</i><input id=\"idty_password\" type=\"password\" ng-model=\"$parent.conf.idty_password\" data-position=\"top\" data-tooltip=\"{{ 'configuration.create_uid.password.tooltip' | translate }}\" class=\"tooltipped\"/><label for=\"idty_password\">Password</label></div><div class=\"input-field col s12\"><select disabled=\"disabled\"><option value=\"\" disabled=\"disabled\" translate=\"general.choose_option\"></option><option value=\"1\" selected=\"selected\" translate=\"configuration.create_uid.nrp_algo_choose_1\"></option><label>{{ 'configuration.create_uid.nrp_algo_choose' | translate }}</label></select></div><div class=\"input-field col s12\"><div ng-if=\"pubkey_preview\" class=\"container\"><h5 translate=\"configuration.create_uid.pubkey_preview\"></h5><pre class=\"pubkey\">{{ pubkey_preview }}</pre></div></div></div><div class=\"row\"><button ng-disabled=\"!$parent.conf.idty_entropy || !$parent.conf.idty_password\" ng-click=\"accept()\" class=\"btn-large waves-effect waves-light\"><i class=\"fa fa-check left\"></i><span translate=\"settings.key.button.validate\"></span></button></div></div></div></div></form></div></div>");;return buf.join("");
};
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/main/settings/tabs/currency", function(exports, require, module) {
var __templateData = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div class=\"container\"><div class=\"row\"><form class=\"s12 center\"><div class=\"card\"><div class=\"card-action\"><i class=\"fa fa-balance-scale fa-5x\"></i><h1 translate=\"configuration.create_parameters.currency.title\" class=\"card-title\"></h1><div class=\"row\"><div class=\"input-field col s12\"><i class=\"prefix fa fa-quote-left\"></i><input id=\"currency\" type=\"text\" ng-model=\"$parent.conf.currency\"/><label for=\"currency\">{{ 'configuration.create_parameters.currency' | translate }}</label></div><div class=\"input-field col s6 m4\"><i class=\"prefix fa fa-line-chart\"></i><input id=\"c\" type=\"number\" ng-model=\"$parent.conf.c\"/><label for=\"c\">{{ 'configuration.create_parameters.c' | translate }}</label></div><div class=\"input-field col s6 m4\"><i class=\"prefix fa fa-hourglass-end\"></i><input id=\"dt\" type=\"number\" ng-model=\"$parent.conf.dt\"/><label for=\"dt\">{{ 'configuration.create_parameters.dt' | translate }}</label></div><div class=\"input-field col s6 m4\"><i class=\"prefix fa fa-money\"></i><input id=\"ud0\" type=\"number\" ng-model=\"$parent.conf.ud0\"/><label for=\"ud0\">{{ 'configuration.create_parameters.ud0' | translate }}</label></div></div><h1 translate=\"configuration.create_parameters.wot.title\" class=\"card-title\"></h1><div class=\"row\"><div class=\"input-field col s6 m4\"><i class=\"prefix fa fa-database\"></i><input id=\"sigStock\" type=\"number\" ng-model=\"$parent.conf.sigStock\"/><label for=\"sigStock\">{{ 'configuration.create_parameters.sigStock' | translate }}</label></div><div class=\"input-field col s6 m4\"><i class=\"prefix fa fa-hourglass-end\"></i><input id=\"sigPeriod\" type=\"number\" ng-model=\"$parent.conf.sigPeriod\"/><label for=\"sigPeriod\">{{ 'configuration.create_parameters.sigPeriod' | translate }}</label></div><div class=\"input-field col s6 m4\"><i class=\"prefix fa fa-battery-3\"></i><input id=\"sigValidity\" type=\"number\" ng-model=\"$parent.conf.sigValidity\"/><label for=\"sigValidity\">{{ 'configuration.create_parameters.sigValidity' | translate }}</label></div><div class=\"input-field col s6 m4\"><i class=\"prefix fa fa-battery-3\"></i><input id=\"msValidity\" type=\"number\" ng-model=\"$parent.conf.msValidity\"/><label for=\"msValidity\">{{ 'configuration.create_parameters.msValidity' | translate }}</label></div><div class=\"input-field col s6 m4\"><i class=\"prefix fa fa-certificate\"></i><input id=\"sigQty\" type=\"number\" ng-model=\"$parent.conf.sigQty\"/><label for=\"sigQty\">{{ 'configuration.create_parameters.sigQty' | translate }}</label></div><div class=\"input-field col s6 m4\"><i class=\"prefix fa fa-object-ungroup\"></i><input id=\"sigWindow\" type=\"number\" ng-model=\"$parent.conf.sigWindow\"/><label for=\"sigWindow\">{{ 'configuration.create_parameters.sigWindow' | translate }}</label></div><div class=\"input-field col s6 m4\"><i class=\"prefix fa fa-map-marker\"></i><input id=\"stepMax\" type=\"number\" ng-model=\"$parent.conf.stepMax\"/><label for=\"stepMax\">{{ 'configuration.create_parameters.stepMax' | translate }}</label></div><div class=\"input-field col s6 m4\"><i class=\"prefix fa fa-users\"></i><input id=\"xpercent\" type=\"number\" ng-model=\"$parent.conf.xpercent\"/><label for=\"xpercent\">{{ 'configuration.create_parameters.xpercent' | translate }}</label></div></div><h1 translate=\"configuration.create_parameters.blockchain.title\" class=\"card-title\"></h1><div class=\"row\"><div class=\"input-field col s6 m4\"><i class=\"prefix fa fa-chain\"></i><input id=\"medianTimeBlocks\" type=\"number\" ng-model=\"$parent.conf.medianTimeBlocks\"/><label for=\"medianTimeBlocks\">{{ 'configuration.create_parameters.medianTimeBlocks' | translate }}</label></div><div class=\"input-field col s6 m4\"><i class=\"prefix fa fa-hourglass-end\"></i><input id=\"avgGenTime\" type=\"number\" ng-model=\"$parent.conf.avgGenTime\"/><label for=\"avgGenTime\">{{ 'configuration.create_parameters.avgGenTime' | translate }}</label></div><div class=\"input-field col s6 m4\"><i class=\"prefix fa fa-cubes\"></i><input id=\"dtDiffEval\" type=\"number\" ng-model=\"$parent.conf.dtDiffEval\"/><label for=\"dtDiffEval\">{{ 'configuration.create_parameters.dtDiffEval' | translate }}</label></div><div class=\"input-field col s6 m4\"><i class=\"prefix fa fa-graduation-cap\"></i><input id=\"blocksRot\" type=\"number\" ng-model=\"$parent.conf.blocksRot\"/><label for=\"blocksRot\">{{ 'configuration.create_parameters.blocksRot' | translate }}</label></div><div class=\"input-field col s6 m4\"><i class=\"prefix fa fa-rotate-left\"></i><input id=\"percentRot\" type=\"number\" ng-model=\"$parent.conf.percentRot\"/><label for=\"percentRot\">{{ 'configuration.create_parameters.percentRot' | translate }}</label></div></div></div></div></form></div></div>");;return buf.join("");
};
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/main/settings/tabs/data", function(exports, require, module) {
var __templateData = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div class=\"container\"><div class=\"row\"><form class=\"s12 center\"><div class=\"card\"><div class=\"card-action\"><i class=\"fa fa-database fa-5x\"></i><h1 translate=\"settings.data.reset.title\" class=\"card-title\"></h1><p translate=\"settings.data.reset.message\"></p><blockquote translate=\"settings.data.reset.experimental\" class=\"left-align red lighten-5\"></blockquote><div class=\"row\"><div class=\"col s12\"><select ng-model=\"remote_host\" class=\"browser-default\"><option value=\"\" selected=\"selected\" translate=\"settings.data.reset.peer.none_option\"></option><option ng-repeat=\"p in peers\" value=\"{{ p.host_port }}\">{{ p.name }}</option></select><label>{{ 'settings.data.reset.peer.label' | translate }}</label></div></div><div class=\"row\"><div class=\"col s12 m6\"><button ng-click=\"resetNode()\" class=\"orange btn-large waves-effect waves-light\"><i class=\"left fa fa-warning\"></i><span translate=\"settings.data.reset.button\"></span></button></div><div class=\"col s12 m6\"><button ng-disabled=\"!remote_host\" ng-click=\"resetNodeAndSync()\" class=\"btn-large waves-effect waves-light\"><i class=\"left fa fa-check\"></i><span translate=\"settings.data.reset_sync.button\"></span></button></div></div></div></div></form></div></div>");;return buf.join("");
};
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/main/settings/tabs/logs", function(exports, require, module) {
var __templateData = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div class=\"container\"><div class=\"row\"><div class=\"s12 center\"><div class=\"card\"><div class=\"card-action\"><i class=\"fa fa-newspaper-o fa-5x\"></i><h1 translate=\"settings.logs.title\" class=\"card-title\"></h1><p translate=\"settings.logs.consult.message\"></p><div class=\"row\"><div class=\"col s12\"><a ui-sref=\"logs\" target=\"_blank\" class=\"btn-large waves-effect waves-light\"><i class=\"fa fa-2x fa-search left\"></i><span>{{ 'settings.logs.consult.button' | translate }}</span></a></div></div></div><div class=\"card-action\"><blockquote translate=\"settings.logs.share.message\" class=\"left-align blue lighten-5\"></blockquote><div class=\"row\"><div class=\"col s12\"><a ng-click=\"shareLogs()\" ng-class=\"{ disabled: generating }\" class=\"blue btn-large waves-effect waves-light\"><i class=\"left fa fa-globe\"></i><span translate=\"settings.logs.share.button\"></span></a><pre ng-show=\"link || generating\" class=\"pre\"><div ng-if=\"generating\" class=\"preloader-wrapper active small\"><div class=\"spinner-layer spinner-blue-only\"><div class=\"circle-clipper left\"><div class=\"circle\"></div></div></div></div><div ng-if=\"generating\">{{ 'settings.logs.share.generating' | translate }}</div><a ng-href=\"{{ link }}\" target=\"_blank\">{{ link }}</a></pre><blockquote ng-show=\"error\" class=\"left-align red lighten-5\">{{ 'settings.logs.share.error' | translate }} <b>{{ error }}</b></blockquote></div></div></div></div></div></div></div>");;return buf.join("");
};
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/main/settings/tabs/network", function(exports, require, module) {
var __templateData = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div class=\"container\"><div class=\"row\"><form class=\"s12 center\"><div class=\"card\"><div class=\"card-action\"><i class=\"fa fa-globe fa-5x\"></i><h1 translate=\"configuration.create_network.title\" class=\"card-title\"></h1><div class=\"row\"><buttn ng-click=\"autoconfig()\" class=\"btn-large waves-effect waves-light\"><i class=\"left fa fa-magic\"></i><span translate=\"configuration.create_network.button.autoconf\"></span></buttn></div><div class=\"row\"><div class=\"col s12 m6 common-network\"><h1 translate=\"configuration.create_network.ipv6.title\" class=\"card-title\"></h1><p translate=\"configuration.create_network.ipv6.message\"></p><select ng-model=\"$parent.conf.local_ipv6\" class=\"browser-default\"><option value=\"\" selected=\"selected\" translate=\"configuration.create_network.none\"></option><option ng-repeat=\"inet in local_neti | filter : 'IPv6'\" value=\"{{ inet.addr }}\" ng-selected=\"{{inet.addr == $parent.conf.local_ipv6}}\">{{ inet.name }}</option></select><label>{{ 'configuration.create_network.local_ipv6' | translate }}</label></div><div class=\"col s12 m6 common-network\"><h1 translate=\"configuration.create_network.ipv4.title\" class=\"card-title\"></h1><p translate=\"configuration.create_network.ipv4.message\"></p><div class=\"col s12 m6\"><select ng-model=\"$parent.conf.local_ipv4\" class=\"browser-default\"><option value=\"\" translate=\"configuration.create_network.none\"></option><option ng-repeat=\"inet in local_neti | filter : 'IPv4'\" value=\"{{ inet.addr }}\" ng-selected=\"{{inet.addr == $parent.conf.local_ipv4}}\">{{ inet.name }}</option></select><label>{{ 'configuration.create_network.local_ipv4' | translate }}</label></div><div class=\"col s12 m6\"><select ng-model=\"$parent.conf.remote_ipv4\" class=\"browser-default\"><option value=\"\" selected=\"selected\" translate=\"configuration.create_network.none\"></option><option ng-repeat=\"inet in remote_neti | filter : 'IPv4'\" value=\"{{ inet.addr }}\" ng-selected=\"{{inet.addr == $parent.conf.remote_ipv4}}\">{{ inet.name }}</option></select><label>{{ 'configuration.create_network.remote_ipv4' | translate }}</label></div><div class=\"row\"></div><div class=\"col s12 m4 upnp\"><input id=\"upnp\" type=\"checkbox\" ng-model=\"$parent.conf.upnp\" class=\"filled-in\"/><label for=\"upnp\">{{ 'configuration.create_network.upnp' | translate }}</label></div></div><div class=\"row\"></div><div class=\"col s12 m6 common-network\"><h1 translate=\"configuration.create_network.port.title\" class=\"card-title\"></h1><p translate=\"configuration.create_network.port.message\"></p><div class=\"input-field col s6\"><i class=\"prefix fa fa-plug\"></i><input id=\"rport\" type=\"number\" ng-model=\"$parent.conf.rport\"/><label for=\"rport\">{{ 'configuration.create_network.port' | translate }}</label></div></div><div class=\"col s12 m6 common-network\"><h1 translate=\"configuration.create_network.dns.title\" class=\"card-title\"></h1><p translate=\"configuration.create_network.dns.message\"></p><div class=\"input-field\"><i class=\"prefix material-icons\">language</i><input id=\"dns\" type=\"text\" ng-model=\"$parent.conf.dns\"/><label for=\"dns\">{{ 'configuration.create_network.dns' | translate }}</label></div></div></div><div class=\"row\"><button ng-click=\"saveConf()\" class=\"btn-large waves-effect waves-light\"><i class=\"left fa fa-check\"></i><span translate=\"settings.network.button.validate\"></span></button></div></div></div></form></div></div>");;return buf.join("");
};
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/menu", function(exports, require, module) {
var __templateData = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<ul id=\"slide-out\" class=\"side-nav\"><li><div class=\"card hide-on-med-and-up\"><div class=\"card-image\"><img src=\"images/menu_bg.jpg\"/><p class=\"card-title\"><span class=\"menu-title\">meta_brouzouf</span><span class=\"menu-speach\">22 members</span><span class=\"menu-footer\">DuniterUI v0.21.0</span></p></div></div></li><li><a ui-sref=\"home\" class=\"waves-effect waves-teal\"><i class=\"fa fa-2x fa-photo\"></i>" + (jade.escape(null == (jade_interp = 'Overview') ? "" : jade_interp)) + "</a></li><li><a ui-sref=\"graphs.blockchain\" class=\"waves-effect waves-teal\"><i class=\"fa fa-2x fa-area-chart\"></i>" + (jade.escape(null == (jade_interp = 'Charts') ? "" : jade_interp)) + "</a></li><li><a href=\"#!\" class=\"waves-effect waves-teal\"><i class=\"fa fa-2x fa-heartbeat\"></i>" + (jade.escape(null == (jade_interp = 'Status') ? "" : jade_interp)) + "</a></li><li><a ui-sref=\"settings.data\" class=\"waves-effect waves-teal\"><i class=\"fa fa-2x fa-gear\"></i>" + (jade.escape(null == (jade_interp = 'Settings') ? "" : jade_interp)) + "</a></li></ul>");;return buf.join("");
};
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;
//# sourceMappingURL=templates.js.map