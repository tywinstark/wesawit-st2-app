// Generated by CoffeeScript 1.3.3

Ext.define('WSI.store.EventsPast', {
  extend: 'WSI.store.Events',
  config: {
    proxy: {
      type: 'ajax',
      extraParams: {
        sort: 'backward'
      }
    }
  }
});
