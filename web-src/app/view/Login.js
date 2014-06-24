// Generated by CoffeeScript 1.3.3

Ext.define('WSI.view.Login', {
  extend: 'Ext.form.Panel',
  xtype: 'wesawitlogin',
  config: {
    scrollable: false
  },
  initialize: function() {
    var loginButton, loginFieldset;
    loginFieldset = {
      xtype: 'fieldset',
      margin: '0 0 5 0',
      items: [
        {
          xtype: 'emailfield',
          placeHolder: 'username or email',
          name: 'login',
          style: 'font-size:15px;'
        }, {
          xtype: 'passwordfield',
          id: 'wesawitpasswordfield',
          name: 'password',
          placeHolder: 'password',
          style: 'font-size:15px;'
        }
      ]
    };
    loginButton = {
      xtype: 'component',
      html: '<div class="form-group-toggle create" style="text-align: center;font-size: 18px;padding-top:5px;padding-bottom:5px;">Login</div>',
      listeners: {
        tap: {
          element: 'element',
          fn: function(e) {
            return this.getParent().onSubmitForm();
          }
        }
      }
    };
    return this.add([loginFieldset, loginButton]);
  },
  onSubmitForm: function() {
    return this.fireEvent('submitForm');
  }
});
