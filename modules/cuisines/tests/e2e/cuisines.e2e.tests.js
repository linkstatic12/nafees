'use strict';

describe('Cuisines E2E Tests:', function () {
  describe('Test Cuisines page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/cuisines');
      expect(element.all(by.repeater('cuisine in cuisines')).count()).toEqual(0);
    });
  });
});
