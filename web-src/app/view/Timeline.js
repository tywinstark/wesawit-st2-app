// Generated by CoffeeScript 1.3.3
var Timeline,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Timeline = (function() {

  function Timeline(dom) {
    this.dom = dom;
    this.reload_events = __bind(this.reload_events, this);

    this.clear = __bind(this.clear, this);

    this.draw = __bind(this.draw, this);

    this.update_positions = __bind(this.update_positions, this);

    this.zoom_in = __bind(this.zoom_in, this);

    this.initialize = __bind(this.initialize, this);

    this.initialize();
  }

  Timeline.prototype.initialized = false;

  Timeline.prototype.width = null;

  Timeline.prototype.height = null;

  Timeline.prototype.mouse_x = 0;

  Timeline.prototype.mouse_y = 0;

  Timeline.prototype.mouse_down = false;

  Timeline.prototype.mouse_over = true;

  Timeline.prototype.zoom = 50;

  Timeline.prototype.zoom_vel = 0;

  Timeline.prototype.zoom_min = 0.79;

  Timeline.prototype.zoom_max = 30000;

  Timeline.prototype.zoom_vel_min = -0.05;

  Timeline.prototype.zoom_vel_max = 15;

  Timeline.prototype.year_x_offset = -344.45;

  Timeline.prototype.year_x_vel = -2;

  Timeline.prototype.x_offset_min = -430;

  Timeline.prototype.x_offset_max = 0;

  Timeline.prototype.bar_height = 4;

  Timeline.prototype.selection_start = 300;

  Timeline.prototype.selection_stop = 640;

  Timeline.prototype.currently_loaded_days = '';

  Timeline.prototype.selected_days = '';

  Timeline.prototype.start_date = '';

  Timeline.prototype.end_date = '';

  Timeline.prototype.months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

  Timeline.prototype.days_in_month = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  Timeline.prototype.g = null;

  Timeline.prototype.initialize = function() {
    /*
        @dom.bind 'swipe', (e) =>
          alert 'swiped'
          prev_x = @mouse_x
          prev_y = @mouse_y
          @mouse_x = e.pageX - @dom.position().left
          @mouse_y = e.pageY - @dom.position().top
          if @mouse_x > 0 and @mouse_y > 0
            @shift((@mouse_x - prev_x) * 0.3 / @zoom)
        @dom.bind 'mousedown', (e) =>
          @mouse_down = true
        @dom.bind 'mouseup', (e) =>
          @mouse_down = false
        @dom.bind 'mousewheel', (event, delta, deltaX, deltaY) =>
          @zoom_in( deltaY * @zoom / 7 )
          @shift(deltaX * 10 / @zoom) # this may need to be adjust more. the main use of this is for macs (two-finger scroll)
          false # stop the normal mousewheel action (from scrolling down page)
    */
    this.g = this.dom.getContext("2d");
    this.width = 400;
    this.height = 100;
    /*
        @gradient = @g.createLinearGradient 0, 0, @width, 0
        @gradient.addColorStop 0,   "rgba(136,136,136,0)"
        @gradient.addColorStop 0.05, "rgba(136,136,136,1)"
        @gradient.addColorStop 0.95, "rgba(136,136,136,1)"
        @gradient.addColorStop 1, "rgba(136,136,136,0)"
    */

    this.gradient = '#aaaaaa';
    this.interval = setInterval(this.draw, 10);
    return this.initialized = true;
  };

  Timeline.prototype.zoom_in = function(amount) {
    this.zoom_vel += amount;
    if (this.zoom_vel > this.zoom_vel_max * this.zoom) {
      this.zoom_vel = this.zoom_vel_max * this.zoom;
    }
    if (this.zoom_vel < this.zoom_vel_min * this.zoom) {
      return this.zoom_vel = this.zoom_vel_min * this.zoom;
    }
  };

  Timeline.prototype.shift = function(amount) {
    return this.year_x_vel += amount;
  };

  Timeline.prototype.update_positions = function() {
    if (this.always_out) {
      this.zoom_vel = -(this.zoom / 70);
    }
    this.zoom += this.zoom_vel;
    this.year_x_offset += this.year_x_vel;
    if (this.zoom < this.zoom_min && this.zoom_vel < 0) {
      this.zoom = this.zoom_min;
    } else if (this.zoom > this.zoom_max && this.zoom_vel > 0) {
      this.zoom = this.zoom_max;
    }
    if (this.year_x_offset < this.x_offset_min && this.year_x_vel < 0) {
      this.year_x_offset = this.x_offset_min;
      this.year_x_vel = Math.abs(this.year_x_vel) * 0.3;
    } else if (this.year_x_offset > this.x_offset_max && this.year_x_vel > 0) {
      this.year_x_offset = this.x_offset_max;
      this.year_x_vel = -1 * Math.abs(this.year_x_vel) * 0.3;
    }
    this.zoom_vel *= 0.9;
    return this.year_x_vel *= 0.8;
  };

  Timeline.prototype.draw = function() {
    var anchor_y, h, h_offset, half_height, half_width, hpos, i, i_offset, ipos, j, j_offset, jpos, selected_range, std_offset, _i, _j, _k, _ref;
    this.update_positions();
    this.clear();
    std_offset = this.year_x_offset * this.zoom;
    half_width = this.width / 2;
    half_height = this.height / 2;
    this.g.fillStyle = this.gradient;
    this.g.fillRect(0, parseInt(half_height) - parseInt(this.bar_height / 2) + 8, this.width, parseInt(this.bar_height));
    this.g.font = "19px 'Helvetica Neue', HelveticaNeue, Helvetica-Neue, Helvetica, 'BBAlpha Sans', sans-serif";
    this.g.fillText('Drag left or right. Pinch to zoom in or out.', half_width - 164, this.height - 20);
    this.g.fillStyle = "#FF4E00";
    this.g.fillRect(this.selection_start, parseInt(half_height) - parseInt(this.bar_height / 2) + 8, this.selection_stop - this.selection_start, parseInt(this.bar_height));
    this.selected_days = '';
    this.start_date = '';
    this.end_date = '';
    anchor_y = Math.floor(half_height) - parseInt(this.bar_height / 2) - 10 + 15;
    for (h = _i = 0; _i <= 75; h = ++_i) {
      h_offset = 5.7 * h * this.zoom;
      hpos = Math.floor(half_width + std_offset + h_offset);
      if (hpos > -this.width && hpos < this.width) {
        this.g.font = "600 " + (Math.max(Math.min(Math.floor(this.zoom), 65), 3)) + "px 'Helvetica Neue', HelveticaNeue, Helvetica-Neue, Helvetica, 'BBAlpha Sans', sans-serif";
        if (this.zoom / 150 <= 0.75 && hpos > (this.selection_start - Math.min(this.zoom, 65) * 2) && hpos < this.selection_stop) {
          this.selected_days += "" + (h + 1950) + "-YEAR-YEAR|";
          if (this.start_date === '') {
            this.start_date = "" + (h + 1950) + "-01-01";
            this.end_date = "" + (h + 1950) + "-12-31";
          } else {
            this.end_date = "" + (h + 1950) + "-12-31";
          }
          this.g.fillStyle = "#FF4E00";
          this.g.fillText(1950 + h, hpos, anchor_y);
        } else {
          this.g.fillStyle = this.gradient;
          this.g.fillText(1950 + h, hpos, anchor_y);
        }
      }
      if (this.zoom / 20 > 3) {
        for (i = _j = 0; _j <= 11; i = ++_j) {
          i_offset = 0.47 * i * this.zoom;
          ipos = Math.floor(this.width / 2 + std_offset + h_offset + i_offset) + 10;
          if (ipos > -this.width && ipos < this.width) {
            this.g.font = "600 " + (Math.min(Math.floor(this.zoom / 20), 45)) + "px 'Helvetica Neue', HelveticaNeue, Helvetica-Neue, Helvetica, 'BBAlpha Sans', sans-serif";
            if (this.zoom / 150 > 0.75 && this.zoom / 150 <= 7 && ipos > this.selection_start - Math.min(this.zoom / 20, 45) * 1.75 && ipos < this.selection_stop) {
              this.selected_days += "" + (h + 1950) + "-" + (i + 1) + "-MONTH|";
              if (this.start_date === '') {
                this.start_date = "" + (h + 1950) + "-" + (i + 1 < 10 ? "0" + (i + 1) : i + 1) + "-01";
              }
              this.end_date = "" + (h + 1950) + "-" + (i + 1 < 10 ? "0" + (i + 1) : i + 1) + "-" + (this.days_in_month[i] < 10 ? "0" + this.days_in_month[i] : this.days_in_month[i]);
              this.g.fillStyle = "#FF4E00";
              this.g.fillText(this.months[i], ipos, anchor_y);
            } else {
              this.g.fillStyle = this.gradient;
              this.g.fillText(this.months[i], ipos, anchor_y);
            }
          }
          if (this.zoom / 150 > 5) {
            this.g.font = "600 " + (Math.min(Math.floor(this.zoom / 150), 25)) + "px 'Helvetica Neue', HelveticaNeue, Helvetica-Neue, Helvetica, 'BBAlpha Sans', sans-serif";
            this.g.fillStyle = this.gradient;
            for (j = _k = 0, _ref = this.days_in_month[i] - 1; 0 <= _ref ? _k <= _ref : _k >= _ref; j = 0 <= _ref ? ++_k : --_k) {
              j_offset = 0.015 * j * this.zoom;
              jpos = Math.floor(half_width + std_offset + 0.0002 * this.zoom + j_offset + i_offset + h_offset);
              if (jpos > -half_width && jpos < this.width) {
                if (this.zoom / 150 > 7 && jpos > this.selection_start - Math.min(this.zoom / 150, 25) && jpos < this.selection_stop) {
                  this.selected_days += "" + (h + 1950) + "-" + (i + 1) + "-" + (j + 1) + "|";
                  if (this.start_date === '') {
                    this.start_date = "" + (h + 1950) + "-" + ((i + 1) < 10 ? "0" + (i + 1) : i + 1) + "-" + ((j + 1) < 10 ? "0" + (j + 1) : j + 1);
                    this.end_date = "" + (h + 1950) + "-" + ((i + 1) < 10 ? "0" + (i + 1) : i + 1) + "-" + ((j + 1) < 10 ? "0" + (j + 1) : j + 1);
                  } else {
                    this.end_date = "" + (h + 1950) + "-" + ((i + 1) < 10 ? "0" + (i + 1) : i + 1) + "-" + ((j + 1) < 10 ? "0" + (j + 1) : j + 1);
                  }
                  this.g.fillStyle = "#FF4E00";
                  this.g.fillText(j + 1, jpos, anchor_y);
                  this.g.fillStyle = "rgb(136,136,136)";
                } else {
                  this.g.fillText(j + 1, jpos, anchor_y);
                }
              }
            }
          }
        }
      }
    }
    if (this.start_date !== '') {
      selected_range = this.months[Math.floor(this.start_date.substr(5, 2)) - 1] + ' ' + this.start_date.substr(8, 2) + ', ' + this.start_date.substr(0, 4);
      if (this.start_date !== this.end_date) {
        selected_range += ' to ' + this.months[Math.floor(this.end_date.substr(5, 2)) - 1] + ' ' + this.end_date.substr(8, 2) + ', ' + this.end_date.substr(0, 4);
      }
      this.g.fillStyle = "#FF4E00";
      this.g.font = "normal 24px 'Helvetica Neue', HelveticaNeue, Helvetica-Neue, Helvetica, 'BBAlpha Sans', sans-serif";
      return this.reload_events();
    }
  };

  Timeline.prototype.clear = function() {
    return this.g.clearRect(0, 0, this.width, this.height);
  };

  Timeline.prototype.reload_events = function() {
    if (Math.abs(this.zoom_vel) < 1.5 && Math.abs(this.year_x_vel) < 0.025) {
      if (!Ext.getStore('Events').isLoading() && this.selected_days !== '' && this.selected_days !== this.currently_loaded_days && this.start_date !== '' && this.end_date !== '') {
        this.currently_loaded_days = this.selected_days;
        Ext.getStore('Events').getModel().getProxy().getExtraParams().startDate = this.start_date.replace(/-/g, '');
        Ext.getStore('Events').getModel().getProxy().getExtraParams().endDate = this.end_date.replace(/-/g, '');
        Ext.getStore('Events').removeAll();
        return Ext.getStore('Events').loadPage(1);
      }
    }
  };

  return Timeline;

})();

Ext.define('WSI.view.Timeline', {
  extend: 'Ext.Container',
  xtype: 'timeline',
  config: {
    layout: 'fit',
    docked: 'top',
    html: ["<canvas id='timeline-canvas' width='400' height='100'></canvas>"].join(''),
    oldSort: 'top',
    oldCategory: 'all',
    oldCountry: 'world',
    /*
        plugins: [
          {
            xclass: 'Ext.plugin.Pinchemu',
            helpers: true #enable touches visualization
          }
        ]
    */

    listeners: {
      dragstart: {
        element: 'element',
        fn: function(e) {
          if (e.previousDeltaX !== 0) {
            return this.timeline.shift(e.previousDeltaX * 0.3 / this.timeline.zoom);
          }
        }
      },
      drag: {
        element: 'element',
        fn: function(e) {
          if (e.previousDeltaX !== 0) {
            return this.timeline.shift(e.previousDeltaX * 0.3 / this.timeline.zoom);
          }
        }
      },
      pinchstart: {
        element: 'element',
        fn: function(e) {
          return this.timeline.zoom_in((1 - e.scale) * this.timeline.zoom / -7);
        }
      },
      pinch: {
        element: 'element',
        fn: function(e) {
          return this.timeline.zoom_in((1 - e.scale) * this.timeline.zoom / -7);
        }
      },
      painted: function() {
        if (Ext.feature.has.Canvas) {
          if (Ext.getStore('Events').getModel().getProxy().getExtraParams().sort !== 'custom_range') {
            this.oldSort = Ext.getStore('Events').getModel().getProxy().getExtraParams().sort;
            Ext.getStore('Events').getModel().getProxy().getExtraParams().sort = 'custom_range';
          }
          if (Ext.getStore('Events').getModel().getProxy().getExtraParams().category !== 'all') {
            this.oldCategory = Ext.getStore('Events').getModel().getProxy().getExtraParams().category;
            Ext.getStore('Events').getModel().getProxy().getExtraParams().category = 'all';
          }
          if (Ext.getStore('Events').getModel().getProxy().getExtraParams().country !== 'world') {
            this.oldCountry = Ext.getStore('Events').getModel().getProxy().getExtraParams().country;
            Ext.getStore('Events').getModel().getProxy().getExtraParams().country = 'world';
          }
          Ext.getStore('Events').getModel().getProxy().getExtraParams().searchTerm = '';
          if (!(this.timeline != null)) {
            return this.timeline = new Timeline(Ext.get('timeline-canvas').dom);
          } else {
            return this.timeline.interval = setInterval(this.timeline.draw, 10);
          }
        } else {
          return Ext.Msg.alert('Canvas not supported', "Sorry, the Timeline feature is not compatible with your device.");
        }
      },
      erased: function() {
        Ext.getStore('Events').getModel().getProxy().getExtraParams().sort = this.oldSort;
        Ext.getStore('Events').getModel().getProxy().getExtraParams().category = this.oldCategory;
        Ext.getStore('Events').getModel().getProxy().getExtraParams().country = this.oldCountry;
        Ext.getStore('Events').getModel().getProxy().getExtraParams().startDate = '';
        Ext.getStore('Events').getModel().getProxy().getExtraParams().endDate = '';
        Ext.getStore('Events').removeAll();
        Ext.getStore('Events').loadPage(1);
        return clearInterval(this.timeline.interval);
      }
    }
  }
});
