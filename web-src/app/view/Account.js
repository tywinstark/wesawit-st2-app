// Generated by CoffeeScript 1.3.3

Ext.define('WSI.view.Account', {
  extend: 'Ext.form.Panel',
  xtype: 'account',
  id: 'account',
  requires: ['WSI.view.Login', 'WSI.view.FeedbackForm', 'WSI.view.WesawitRegister'],
  config: {
    scrollable: {
      direction: 'vertical',
      indicators: false,
      directionLock: true
    },
    layout: 'vbox',
    margin: '0 5 0 5',
    padding: 0
  },
  initialize: function() {
    this.callParent(arguments);
    return this.populateWithProperItems();
  },
  populateWithProperItems: function() {
    var facebookCap, feedbackCap, feedbackForm, loginCap, loginForm, registerCap, registerForm, wesawitLoginButton, wesawitRegisterButton;
    wesawitLoginButton = {
      xtype: 'button',
      width: '80%',
      id: 'wesawitloginbutton',
      text: 'With your WeSawIt account',
      ui: 'cssnerd-variable-gray-toolbar',
      style: {
        backgroundColor: '#888'
      },
      handler: this.onWesawitLoginButtonTap,
      scope: this
    };
    wesawitRegisterButton = {
      xtype: 'button',
      width: '80%',
      text: 'Create a WeSawIt account',
      ui: 'cssnerd-variable-gray-toolbar',
      handler: this.onWesawitRegisterButtonTap,
      scope: this
    };
    facebookCap = {
      xtype: 'container',
      layout: 'vbox',
      margin: '5 0 0 0',
      html: '<div class="form-group-toggle facebook"><small>Log in with </small>Facebook</div>',
      listeners: {
        tap: {
          element: 'element',
          fn: function(e) {
            return this.getParent().onFacebookLoginButtonTap();
          }
        }
      }
    };
    loginForm = {
      xtype: 'container',
      layout: 'vbox',
      pack: 'center',
      align: 'center',
      baseCls: 'form-group',
      items: [
        {
          xtype: 'wesawitlogin'
        }
      ]
    };
    loginCap = {
      xtype: 'container',
      layout: 'vbox',
      margin: '10 0 0 0',
      html: '<div class="form-group-toggle"><small>Log in with </small>WeSawIt <img src="resources/images/disclosure.png" width="11" height="15" /></div>',
      disableTap: false,
      listeners: {
        tap: {
          element: 'element',
          fn: function(e) {
            if (!this.config.disableTap) {
              if (!(this.getParent().getItems().getAt(3).getCls() != null) || this.getParent().getItems().getAt(3).getCls()[0] !== 'show-group') {
                this.addCls('turn-disclosure');
                if (Ext.os.is.Android) {
                  this.getParent().getScrollable().getScroller().scrollTo(0, 280, true);
                }
                return this.getParent().getItems().getAt(3).addCls('show-group');
              } else {
                this.removeCls('turn-disclosure');
                return this.getParent().getItems().getAt(3).removeCls('show-group');
              }
            }
          }
        }
      }
    };
    registerForm = {
      xtype: 'container',
      layout: 'vbox',
      pack: 'center',
      align: 'center',
      baseCls: 'form-group',
      items: [
        {
          xtype: 'wesawitregister'
        }
      ]
    };
    registerCap = {
      xtype: 'container',
      layout: 'vbox',
      margin: '10 0 0 0',
      html: '<div class="form-group-toggle create"><small>Get a </small>WeSawIt<small> account</small> <img src="resources/images/disclosure-white.png" width="11" height="15" /></div>',
      disableTap: false,
      listeners: {
        tap: {
          element: 'element',
          fn: function(e) {
            if (!this.config.disableTap) {
              if (!(this.getParent().getItems().getAt(5).getCls() != null) || this.getParent().getItems().getAt(5).getCls()[0] !== 'show-group') {
                this.addCls('turn-disclosure');
                if (Ext.os.is.Android) {
                  this.getParent().getScrollable().getScroller().scrollTo(0, 310, true);
                }
                return this.getParent().getItems().getAt(5).addCls('show-group');
              } else {
                this.removeCls('turn-disclosure');
                return this.getParent().getItems().getAt(5).removeCls('show-group');
              }
            }
          }
        }
      }
    };
    feedbackForm = {
      xtype: 'container',
      layout: 'vbox',
      pack: 'center',
      align: 'center',
      baseCls: 'form-group',
      items: [
        {
          xtype: 'feedbackform'
        }
      ]
    };
    feedbackCap = {
      xtype: 'container',
      layout: 'vbox',
      margin: '10 0 0 0',
      html: '<div class="form-group-toggle">Feedback / Questions <img src="resources/images/disclosure.png" width="11" height="15" /></div>',
      listeners: {
        tap: {
          element: 'element',
          fn: function(e) {
            if (!this.config.disableTap) {
              if (!(this.getParent().getItems().getAt(7).getCls() != null) || this.getParent().getItems().getAt(7).getCls()[0] !== 'show-group') {
                this.addCls('turn-disclosure');
                if (Ext.os.is.Android) {
                  this.getParent().getScrollable().getScroller().scrollTo(0, 330, true);
                }
                return this.getParent().getItems().getAt(7).addCls('show-group');
              } else {
                this.removeCls('turn-disclosure');
                return this.getParent().getItems().getAt(7).removeCls('show-group');
              }
            }
          }
        }
      }
    };
    if (window.localStorage.getItem('fbid') != null) {
      this.add({
        xtype: 'component',
        html: "<div class='event-details-description' style='font-size: 12px !important; color: #444 !important; padding: 10px 10px !important; width: 100% !important; text-align:center;padding: 10px;font-size: 14px; border-top-left-radius:4px;border-top-right-radius:4px;'><div class='list-item-thumb' style='height:120px;width:120px;border-radius:4px;opacity: 1;margin: 0px auto 7px auto;float:none;background-image:url(https://graph.facebook.com/" + (window.localStorage.getItem('fbid')) + "/picture?type=large);'></div>logged in as <span style='color: #FF621C;font-weight:bold;'>" + (window.localStorage.getItem('username')) + "</span></div>"
      });
    } else if (window.localStorage.getItem('wsitoken') != null) {
      this.add({
        xtype: 'component',
        html: "<div class='event-details-description' style='font-size: 12px !important; color: #444 !important; padding: 10px 10px !important; width: 100% !important; text-align:center;padding: 10px;font-size: 14px; border-top-left-radius:4px;border-top-right-radius:4px;'>logged in as <span style='color: #FF621C;font-weight:bold;'>" + (window.localStorage.getItem('username')) + "</span></div>"
      });
    }
    if (window.localStorage.getItem('wsitoken') != null) {
      this.add({
        xtype: 'container',
        layout: 'vbox',
        html: '<div class="form-group-toggle">Log out</div>',
        listeners: {
          tap: {
            element: 'element',
            fn: function(e) {
              return this.getParent().onWesawitLogoutButtonTap();
            }
          }
        }
      });
      feedbackCap.listeners = {
        tap: {
          element: 'element',
          fn: function(e) {
            if (!this.config.disableTap) {
              if (!(this.getParent().getItems().getAt(this.getParent().getItems().length - 2).getCls() != null) || this.getParent().getItems().getAt(this.getParent().getItems().length - 2).getCls()[0] !== 'show-group') {
                this.addCls('turn-disclosure');
                return this.getParent().getItems().getAt(this.getParent().getItems().length - 2).addCls('show-group');
              } else {
                this.removeCls('turn-disclosure');
                return this.getParent().getItems().getAt(this.getParent().getItems().length - 2).removeCls('show-group');
              }
            }
          }
        }
      };
      return this.add([
        feedbackCap, feedbackForm, {
          xtype: 'component',
          height: 100
        }
      ]);
    } else {
      return this.add([
        {
          xtype: 'component',
          html: 'Please log in',
          hidden: true,
          style: {
            color: '#444',
            fontWeight: 'normal',
            textShadow: '0px -1px 1px #fff',
            padding: '10px 0px 10px 0px',
            fontSize: '20px',
            textAlign: 'left'
          }
        }, facebookCap, loginCap, loginForm, registerCap, registerForm, feedbackCap, feedbackForm, {
          xtype: 'component',
          height: 100
        }
      ]);
    }
  },
  onFacebookLoginButtonTap: function() {
    return this.fireEvent('facebookLoginButtonTap');
  },
  onWesawitLogoutButtonTap: function() {
    return this.fireEvent('wesawitLogoutButtonTap');
  }
});
