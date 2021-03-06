// Generated by CoffeeScript 1.3.3

Ext.define('WSI.view.WhereContainer', {
  extend: 'Ext.Panel',
  xtype: 'wherecontainer',
  id: 'wherecontainer',
  config: {
    fullscreen: true,
    padding: '0 10 0 10',
    width: '100%',
    scrollable: false,
    listeners: {
      activate: function() {
        return this.popSuggestionsList();
      }
    }
  },
  initialize: function() {
    var nearbyList, searchSuggList;
    nearbyList = {
      xtype: 'list',
      baseCls: 'locations-list',
      cls: ['nearby'],
      height: 135,
      padding: 0,
      margin: 0,
      itemHeight: 35,
      variableHeights: false,
      itemTpl: Ext.create('Ext.XTemplate', "<div class='place-result-thumb-container'>{[this.imageHtml(values, 25, 25)]}</div>", "{locationName}", {
        imageHtml: function(values, w, h) {
          var html;
          html = "<img src='";
          if (false && (values.photos != null)) {
            html += values.photos[0].raw_reference.fife_url;
            if (values.photos[0].width >= values.photos[0].height) {
              h *= values.photos[0].height / values.photos[0].width;
            } else {
              w *= values.photos[0].width / values.photos[0].height;
            }
            html += "' width='" + w + "' height='" + h + "' />";
          } else {
            html += values.icon;
            html += "' width='" + w + "' height='" + h + "' />";
          }
          return html;
        }
      }),
      data: [
        {
          locationName: '',
          locationVicinity: '',
          locationLat: '',
          locationLng: '',
          reference: '',
          photos: null,
          icon: ''
        }
      ],
      listeners: {
        initialize: function(c) {
          c.getStore().removeAll(true, true);
          return c.setHtml('<div class="x-loading-spinner-outer" style="margin-top: 40px;"><div class="x-loading-spinner" style="margin: 0px auto;"><span class="x-loading-top"></span><span class="x-loading-right"></span><span class="x-loading-bottom"></span><span class="x-loading-left"></span></div></div>');
        },
        refresh: function(c) {
          var removeLoadingSpinner;
          removeLoadingSpinner = function() {
            return c.setHtml('');
          };
          return setTimeout(removeLoadingSpinner, 500);
        },
        itemtap: function(list, index, target, record) {
          return this.getParent().chooseLocation(record.raw.locationName, record.raw.locationVicinity, record.raw.locationLat, record.raw.locationLng, record.raw.locationType);
        }
      }
    };
    searchSuggList = {
      xtype: 'list',
      baseCls: 'locations-list',
      cls: ['autocomplete'],
      height: 100,
      padding: 0,
      margin: 0,
      itemHeight: 35,
      variableHeights: false,
      itemTpl: Ext.create('Ext.XTemplate', "{[values.locationName]}{[(values.locationVicinity != '' ? ', <span class=\"vicinity\">' + values.locationVicinity + '</span>' : '')]}"),
      data: [
        {
          locationName: '',
          locationVicinity: '',
          locationLat: '',
          locationLng: '',
          reference: ''
        }
      ],
      listeners: {
        initialize: function(c) {
          return c.getStore().removeAll(true, true);
        },
        itemtap: function(list, index, target, record) {
          return this.getParent().chooseLocation(record.raw.locationName, record.raw.locationVicinity, record.raw.locationLat, record.raw.locationLng, record.raw.locationType, record.raw.reference);
        }
      }
    };
    return this.add([
      {
        xtype: 'component',
        margin: '10 0 0 0',
        html: '<div class="event-details-facts" style="padding: 10px !important;text-transform: none !important;">Nearby Locations</div>'
      }, nearbyList, {
        xtype: 'component',
        height: 10,
        style: {
          fontSize: '13px',
          fontWeight: 'normal',
          background: '#f5f5f5',
          border: '1px solid #aaa',
          borderTop: 'none',
          borderBottomLeftRadius: '4px',
          borderBottomRightRadius: '4px'
        }
      }, {
        xtype: 'component',
        margin: '10 0 0 0',
        html: '<div class="event-details-facts" style="padding: 10px !important;text-transform: none !important;">Or, search for a location below:</div>'
      }, {
        xtype: 'textfield',
        cls: 'event-details-facts',
        margin: '0 0 0 0',
        style: {
          border: '1px solid #aaa',
          borderBottom: 'none',
          opacity: 1,
          display: 'block',
          color: '#333',
          borderRadius: '0px',
          background: '#eee'
        },
        placeHolder: 'Enter location',
        listeners: {
          action: function() {
            return false;
          },
          keyup: function() {
            var input, loc, maxRadius, s2, _i, _len, _ref;
            if (typeof searchSuggList.getStore === "function") {
              searchSuggList.getStore().removeAll(true, true);
            }
            s2 = new Array();
            input = this.getValue();
            _ref = window.util.customLocations;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              loc = _ref[_i];
              if (input.toUpperCase().replace(' ', '') === loc[0].toUpperCase().replace(' ', '')) {
                maxRadius = Math.max((loc[1] - loc[3]) * 68.88 * 1609.344, (loc[2] - loc[4]) * -1 * 59.95 * 1609.344) / 2;
                s2.push({
                  'locationName': loc[0],
                  'locationVicinity': 'UCLA, Los Angeles',
                  'locationLat': loc[3] + (loc[1] - loc[3]) / 2,
                  'locationLng': loc[4] + (loc[2] - loc[4]) / 2,
                  'locationType': "custom_radius:" + (parseInt(maxRadius))
                });
              }
            }
            return Ext.Ajax.request({
              url: 'https://maps.googleapis.com/maps/api/place/autocomplete/json?types=establishment|geocode&radius=1000&location=' + window.localStorage.getItem('locationLat') + ',' + window.localStorage.getItem('locationLng') + '&sensor=true&key=---REMOVED---',
              params: {
                'input': input
              },
              timeout: 30000,
              method: 'GET',
              scope: this,
              success: function(response) {
                var isAddress, locationName, p, resp, _j, _len1, _ref1, _ref2;
                resp = Ext.JSON.decode(response.responseText);
                if (resp.status === 'OK') {
                  searchSuggList = this.getParent().getItems().getAt(5);
                  _ref1 = resp.predictions;
                  for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
                    p = _ref1[_j];
                    isAddress = p.terms[0].value === "" + parseInt(p.terms[0].value);
                    locationName = isAddress ? p.terms[0].value + " " + ((_ref2 = p.terms[1]) != null ? _ref2.value : void 0) : p.terms[0].value;
                    s2.push({
                      'locationName': locationName,
                      'locationVicinity': p.description.replace(locationName + ', ', ''),
                      'locationLat': '0',
                      'locationLng': '0',
                      'reference': p.reference
                    });
                  }
                  return searchSuggList.getStore().setData(s2);
                }
              }
            });
          }
        }
      }, searchSuggList, {
        xtype: 'component',
        height: 10,
        style: {
          fontSize: '13px',
          fontWeight: 'normal',
          background: '#f5f5f5',
          border: '1px solid #aaa',
          borderTop: 'none',
          borderBottomLeftRadius: '4px',
          borderBottomRightRadius: '4px'
        }
      }
    ]);
  },
  chooseLocation: function(locationName, locationVicinity, locationLat, locationLng, locationType, reference) {
    if (locationType == null) {
      locationType = '';
    }
    if (reference == null) {
      reference = '';
    }
    return this.fireEvent('newEventChooseLocation', locationName, locationVicinity, locationLat, locationLng, locationType, reference, true);
  },
  popSuggestionsList: function() {
    return this.fireEvent('generateSuggestions', this.getAt(1));
  }
});
