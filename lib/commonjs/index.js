"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Overlay", {
  enumerable: true,
  get: function () {
    return _Overlay.default;
  }
});
Object.defineProperty(exports, "Sheet", {
  enumerable: true,
  get: function () {
    return _Sheet.default;
  }
});
Object.defineProperty(exports, "Button", {
  enumerable: true,
  get: function () {
    return _Button.default;
  }
});
Object.defineProperty(exports, "ShareSheet", {
  enumerable: true,
  get: function () {
    return _ShareSheet.default;
  }
});
Object.defineProperty(exports, "Social", {
  enumerable: true,
  get: function () {
    return _types.Social;
  }
});
Object.defineProperty(exports, "ShareAsset", {
  enumerable: true,
  get: function () {
    return _types.ShareAsset;
  }
});
exports.default = void 0;

var _reactNative = require("react-native");

var _Overlay = _interopRequireDefault(require("./components/Overlay"));

var _Sheet = _interopRequireDefault(require("./components/Sheet"));

var _Button = _interopRequireDefault(require("./components/Button"));

var _ShareSheet = _interopRequireDefault(require("./components/ShareSheet"));

var _requireAndAskPermissions = _interopRequireDefault(require("./helpers/requireAndAskPermissions"));

var _types = require("./types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const RNShare = {
  Button: _Button.default,
  ShareSheet: _ShareSheet.default,
  Overlay: _Overlay.default,
  Sheet: _Sheet.default,
  Social: {
    FACEBOOK: _reactNative.NativeModules.RNShare.FACEBOOK || _types.Social.Facebook,
    FACEBOOK_STORIES: _reactNative.NativeModules.RNShare.FACEBOOKSTORIES || _types.Social.FacebookStories,
    PAGESMANAGER: _reactNative.NativeModules.RNShare.PAGESMANAGER || _types.Social.Pagesmanager,
    TWITTER: _reactNative.NativeModules.RNShare.TWITTER || _types.Social.Twitter,
    WHATSAPP: _reactNative.NativeModules.RNShare.WHATSAPP || _types.Social.Whatsapp,
    WHATSAPPBUSINESS: _reactNative.NativeModules.RNShare.WHATSAPPBUSINESS || _types.Social.Whatsappbusiness,
    INSTAGRAM: _reactNative.NativeModules.RNShare.INSTAGRAM || _types.Social.Instagram,
    INSTAGRAM_STORIES: _reactNative.NativeModules.RNShare.INSTAGRAMSTORIES || _types.Social.InstagramStories,
    GOOGLEPLUS: _reactNative.NativeModules.RNShare.GOOGLEPLUS || _types.Social.Googleplus,
    EMAIL: _reactNative.NativeModules.RNShare.EMAIL || _types.Social.Email,
    PINTEREST: _reactNative.NativeModules.RNShare.PINTEREST || _types.Social.Pinterest,
    LINKEDIN: _reactNative.NativeModules.RNShare.LINKEDIN || _types.Social.Linkedin,
    SMS: _reactNative.NativeModules.RNShare.SMS || _types.Social.Sms,
    TELEGRAM: _reactNative.NativeModules.RNShare.TELEGRAM || _types.Social.Telegram,
    MESSENGER: _reactNative.NativeModules.RNShare.MESSENGER || _types.Social.Messenger,
    SNAPCHAT: _reactNative.NativeModules.RNShare.SNAPCHAT || _types.Social.Snapchat,
    VIBER: _reactNative.NativeModules.RNShare.VIBER || _types.Social.Viber
  },

  open(options) {
    return new Promise((resolve, reject) => {
      (0, _requireAndAskPermissions.default)(options).then(() => {
        if (_reactNative.Platform.OS === 'ios' && options.url && !options.urls) {
          // Backward compatibility with { Share } from react-native
          const url = options.url;
          delete options.url;
          options.urls = [url];

          if (options.filename && !options.filenames) {
            options.filenames = [options.filename];
            delete options.filename;
          }
        }

        _reactNative.NativeModules.RNShare.open(options, error => {
          return reject({
            error
          });
        }, (success, message) => {
          if (success) {
            return resolve({
              success,
              message
            });
          } else if (options.failOnCancel === false) {
            return resolve({
              dismissedAction: true,
              success,
              message
            });
          } else {
            reject(new Error('User did not share'));
          }
        });
      }).catch(e => reject(e));
    });
  },

  shareSingle(options) {
    if (_reactNative.Platform.OS === 'ios' || _reactNative.Platform.OS === 'android') {
      return new Promise((resolve, reject) => {
        (0, _requireAndAskPermissions.default)(options).then(() => {
          if (options.url) {
            options.urls = [options.url];
          }

          _reactNative.NativeModules.RNShare.shareSingle(options, error => {
            return reject({
              error
            });
          }, (success, message) => {
            return resolve({
              success: Boolean(success),
              message
            });
          });
        }).catch(e => reject(e));
      });
    } else {
      throw new Error('Not implemented');
    }
  },

  isPackageInstalled(packageName) {
    if (_reactNative.Platform.OS === 'android') {
      return new Promise((resolve, reject) => {
        _reactNative.NativeModules.RNShare.isPackageInstalled(packageName, error => {
          return reject({
            error
          });
        }, isInstalled => {
          return resolve({
            isInstalled,
            message: 'Package is Installed'
          });
        });
      });
    } else {
      throw new Error('Not implemented');
    }
  }

};
var _default = RNShare;
exports.default = _default;
//# sourceMappingURL=index.js.map