'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('OpenHDS App', function() {

  it('should redirect index.html to index.html#/', function() {
    browser.get('app/index.html');
    browser.getLocationAbsUrl().then(function(url) {
        expect(url.split('#')[1]).toBe('/');
      });
  });

});
