// Generated by CoffeeScript 1.3.3

Ext.define('WSI.view.EventsListContainer', {
  extend: 'Ext.tab.Panel',
  xtype: 'eventslistcontainer',
  requires: ['WSI.view.EventsList', 'WSI.view.AccountContainer'],
  config: {
    layout: {
      type: 'card',
      animation: false
    },
    tabBarPosition: 'bottom',
    lastActiveTabBeforeCaptureActionSheetShown: 0,
    listeners: {
      activeitemchange: function(tabPanel, value, oldValue) {
        if (value === this.getAt(1)) {
          this.config.lastActiveTabBeforeCaptureActionSheetShown = 0;
          if (this.getAt(1).getActiveItem().getId() !== 'eventdetailscontainer' && this.getAt(1).getActiveItem().getId() !== 'whostherecontainer') {
            this.fireEvent('showCreateEventButton');
            this.fireEvent('hideTopToolbarHomeButton');
            this.fireEvent('hideMoreActionsButton');
            this.fireEvent('resetTopToolbarTitle');
          } else {
            this.fireEvent('hideCreateEventButton');
            this.fireEvent('showTopToolbarHomeButton');
            this.fireEvent('showMoreActionsButton');
            this.fireEvent('revertTopToolbarTitle');
          }
          return this.getAt(3).hide();
        } else if (value === this.getAt(3)) {
          this.config.lastActiveTabBeforeCaptureActionSheetShown = 2;
          this.fireEvent('hideCreateEventButton');
          this.fireEvent('hideTopToolbarHomeButton');
          this.fireEvent('hideMoreActionsButton');
          return this.fireEvent('resetTopToolbarTitle');
        } else if (value === this.getAt(2)) {
          this.fireEvent('hideCreateEventButton');
          this.fireEvent('hideTopToolbarHomeButton');
          this.fireEvent('hideMoreActionsButton');
          return false;
        }
      }
    }
  },
  initialize: function() {
    var browseTab, cameraTab, eventsListFuture, eventsListPast, eventsListPresent, listViewCarousel, search, settingsTab, sliderMenu;
    this.callParent(arguments);
    search = {
      xtype: 'formpanel',
      id: 'searchToolbar',
      layout: 'vbox',
      scrollable: false,
      listeners: {
        scope: this,
        activate: function(c) {
          if (c.getAt(0).getAt(1).getData().length === 0) {
            this.fireEvent('populateUiForSearch');
          }
          c.getAt(0).getAt(0).focus();
          return true;
        }
      },
      items: [
        {
          xtype: 'container',
          layout: 'hbox',
          docked: 'top',
          flex: 0,
          padding: '0 5 5 5',
          height: 43,
          style: 'background: #f0f0f0;',
          items: [
            {
              xtype: 'searchfield',
              id: 'eventsearch',
              name: 'eventsearch',
              flex: 4,
              margin: '0 5 0 0',
              cls: 'event-details-facts',
              style: {
                border: '1px solid #aaa',
                borderBottomRightRadius: '4px',
                borderBottomLeftRadius: '4px',
                opacity: 1,
                display: 'block',
                color: '#333'
              },
              placeHolder: 'Search',
              listeners: {
                keyup: function(field, e, eOpts) {
                  Ext.getStore('EventsSearch').getProxy().getExtraParams().searchTerm = field.getValue();
                  Ext.getStore('EventsSearch').removeAll(true, true);
                  if (Ext.getStore('EventsSearch').getProxy().getExtraParams().searchTerm !== '' || Ext.getStore('EventsSearch').getProxy().getExtraParams().category !== 'all') {
                    return Ext.getStore('EventsSearch').loadPage(1);
                  }
                },
                clearicontap: function() {
                  Ext.getStore('EventsSearch').getProxy().getExtraParams().searchTerm = '';
                  Ext.getStore('EventsSearch').removeAll(true, true);
                  if (Ext.getStore('EventsSearch').getProxy().getExtraParams().searchTerm !== '' || Ext.getStore('EventsSearch').getProxy().getExtraParams().category !== 'all') {
                    Ext.getStore('EventsSearch').loadPage(1);
                  }
                  return this.focus();
                }
              }
            }, {
              xtype: 'component',
              flex: 3,
              tpl: ['<select onclick="this.className = \'active\';" onchange="this.className = \'\';Ext.getStore(\'EventsSearch\').getProxy().getExtraParams().category = this.value; if ( ! (this.value == \'all\' && Ext.getStore(\'EventsSearch\').getProxy().getExtraParams().searchTerm == \'\' )  ) Ext.getStore(\'EventsSearch\').removeAll(true,true); if ( ! (this.value == \'all\' && Ext.getStore(\'EventsSearch\').getProxy().getExtraParams().searchTerm == \'\' )  ) Ext.getStore(\'EventsSearch\').loadPage(1);">', '<tpl for=".">', '<option value="{value}">{text}</option>', '</tpl>', '</select>'],
              data: new Array()
            }
          ]
        }, {
          xtype: 'eventslist',
          id: 'eventslistsearch',
          flex: 1,
          width: '100%',
          cls: 'searchlist',
          itemHeight: 80,
          store: Ext.getStore('EventsSearch'),
          emptyText: "<div style='width:100%;text-align:center;font-size:13px;color:#666;text-shadow:none;font-weight:bold;'>no events found</div>",
          plugins: false,
          listeners: {
            itemtap: function(list, index, target, record, e, eOpts) {
              return this.onViewEvent(record);
            },
            scope: this
          }
        }
      ]
    };
    eventsListPresent = {
      xtype: 'eventslist',
      id: 'eventslistpresent',
      store: Ext.getStore('EventsCurrent'),
      listeners: {
        itemtap: function(list, index, target, record, e, eOpts) {
          return this.onViewEvent(record);
        },
        scope: this
      }
    };
    eventsListPast = {
      xtype: 'eventslist',
      id: 'eventslistpast',
      store: Ext.getStore('EventsPast'),
      listeners: {
        itemtap: function(list, index, target, record, e, eOpts) {
          return this.onViewEvent(record);
        },
        scope: this
      }
    };
    eventsListFuture = {
      xtype: 'eventslist',
      id: 'eventslistfuture',
      store: Ext.getStore('EventsFuture'),
      listeners: {
        itemtap: function(list, index, target, record, e, eOpts) {
          return this.onViewEvent(record);
        },
        scope: this
      }
    };
    sliderMenu = {
      xtype: 'toolbar',
      id: 'sliderMenu',
      docked: 'top',
      ui: 'orange',
      height: 35,
      margin: 0,
      padding: '0 0 2 0',
      layout: {
        type: 'hbox',
        pack: 'center'
      },
      html: '<div class="sliderMenuPointer"></div>',
      items: [
        {
          xtype: 'component',
          html: '<div class="x-button sliderMenuSearch"><span class="x-button-icon x-icon-mask search" style="margin: 0px auto"></span></div>',
          width: '25%',
          margin: 0,
          padding: '5 0 5 0',
          style: {
            textAlign: 'center'
          },
          listeners: {
            tap: {
              element: 'element',
              fn: function(e) {
                return this.getParent().getParent().getAt(1).setActiveItem(0);
              }
            }
          }
        }, {
          xtype: 'component',
          html: 'Past',
          width: '25%',
          margin: 0,
          padding: '8 0 8 0',
          style: {
            textAlign: 'center'
          },
          listeners: {
            tap: {
              element: 'element',
              fn: function(e) {
                return this.getParent().getParent().getAt(1).setActiveItem(1);
              }
            }
          }
        }, {
          xtype: 'component',
          html: 'Trending',
          width: '25%',
          margin: 0,
          padding: '8 0 8 0',
          style: {
            textAlign: 'center'
          },
          listeners: {
            tap: {
              element: 'element',
              fn: function(e) {
                return this.getParent().getParent().getAt(1).setActiveItem(2);
              }
            }
          }
        }, {
          xtype: 'component',
          html: 'Upcoming',
          width: '25%',
          margin: 0,
          padding: '8 0 8 0',
          style: {
            textAlign: 'center'
          },
          listeners: {
            tap: {
              element: 'element',
              fn: function(e) {
                return this.getParent().getParent().getAt(1).setActiveItem(3);
              }
            }
          }
        }
      ]
    };
    listViewCarousel = {
      xtype: 'carousel',
      direction: 'horizontal',
      indicator: false,
      scrollable: {
        indicators: false,
        direction: 'horizontal',
        momentumEasing: {
          momentum: {
            acceleration: 1000000,
            friction: 0.0001
          }
        },
        outOfBoundRestrictFactor: 0.0001
      },
      activeItem: 2,
      items: [search, eventsListPast, eventsListPresent, eventsListFuture],
      listeners: {
        initialize: function(container) {
          var tabPos, _ref;
          tabPos = [13, 38, 63, 88];
          return (_ref = document.getElementsByClassName('sliderMenuPointer')[0]) != null ? _ref.style.left = tabPos[container.getActiveIndex()] + '%' : void 0;
        },
        activeitemchange: function(container, value, oldValue, eOpts) {
          /*
                    if container.listReloadTimeout?
                      clearInterval container.listReloadTimeout
                      delete container.listReloadTimeout
                    if value.getStore?().lastTimeLoadCalled? and (new Date()).getTime() - value.getStore().lastTimeLoadCalled.getTime() > 60000
                      reloadFn = do (value) =>=>
                        value.getStore().load()
                      container.listReloadTimeout = setTimeout reloadFn, 1000
          */

          var tabPos, _ref;
          tabPos = [13, 38, 63, 88];
          return (_ref = document.getElementsByClassName('sliderMenuPointer')[0]) != null ? _ref.style.left = tabPos[container.getActiveIndex()] + '%' : void 0;
        },
        scope: this
      }
    };
    browseTab = {
      xtype: 'container',
      layout: 'card',
      iconCls: 'browse',
      id: 'browseTab',
      style: ' background: #222;',
      items: [
        {
          xtype: 'container',
          layout: 'fit',
          fullscreen: true,
          items: [sliderMenu, listViewCarousel]
        }
      ]
    };
    cameraTab = {
      xtype: 'container',
      layout: 'fit',
      iconCls: 'camera',
      scope: this,
      tab: {
        listeners: {
          tap: function(c) {
            return c.up().up().fireEvent('captureMediaButtonTap');
          }
        }
      }
    };
    settingsTab = {
      xtype: 'accountcontainer',
      iconCls: 'config',
      badgeText: !(window.localStorage.getItem('wsitoken') != null) ? 'Log in here' : ''
    };
    return this.add([browseTab, cameraTab, settingsTab]);
  },
  onViewEvent: function(record) {
    return this.fireEvent('viewEventCommand', this, record);
  },
  onShowLoading: function(tabBarIndex) {
    return this.fireEvent('showLoading', tabBarIndex);
  },
  onHideLoading: function(tabBarIndex) {
    return this.fireEvent('hideLoading', tabBarIndex);
  }
});
