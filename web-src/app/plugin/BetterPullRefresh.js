// Generated by CoffeeScript 1.3.3

Ext.define('WSI.plugin.BetterPullRefresh', {
  extend: 'Ext.plugin.PullRefresh',
  alias: 'plugin.betterpullrefresh',
  requires: ['Ext.plugin.PullRefresh'],
  loadStore: function() {
    var list, scroller, store, _ref;
    list = this.getList();
    store = (_ref = list.getStore()) != null ? _ref : list.store;
    scroller = list.getScrollable().getScroller();
    this.setViewState('loading');
    this.isReleased = false;
    store.on({
      load: function() {
        scroller.minPosition.y = 0;
        scroller.scrollTo(null, 0, true);
        return this.resetRefreshState();
      },
      delay: 100,
      single: true,
      scope: this
    });
    if (this.getRefreshFn != null) {
      this.getRefreshFn().call(this, this);
    } else {
      this.fetchLatest();
    }
    return true;
  }
});
