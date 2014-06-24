// Generated by CoffeeScript 1.3.3

Ext.define('WSI.view.Main', {
  extend: 'Ext.Container',
  xtype: 'maincontainer',
  requires: ['WSI.view.EventsListContainer'],
  config: {
    layout: {
      type: 'card'
    },
    items: [
      {
        xtype: 'eventslistcontainer'
      }
    ]
  },
  initialize: function() {
    return this.callParent(arguments);
  }
});
