/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {

        /**
         * @description check for allFeed objects key's values
         * and make sure that it's not empty or undefined
         * @param {String} key --> allFeeds object key
         */
        function checkIfAllFeedsObjectsAreDefined(key){
            const FILTERED_FEED = allFeeds.filter((item) => {
                return !(item[key]); // return array if key item is either empty or undefined/null
            });
            expect(FILTERED_FEED).toEqual([]);
         }

        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* ensure that allFeeds object urls are not undefined/empty */
        it('has defined urls', function(){
            checkIfAllFeedsObjectsAreDefined('url');
        });

        /* ensure that allFeeds object names are not undefined/empty */
        it('has defined names', function(){
        checkIfAllFeedsObjectsAreDefined('name');
        });

    });


    /* This suite is all about menu navigation sidebar,
    its default state, what happens when it's clicked */
    describe('The menu', function(){

        /**
         * @description Test checks whether menu is hidden or shown on clicking a menu icon
         * @param {boolean} condition --> boolean value true: menu is hidden, false: menu is shown
         */
        function hideMenuOnClick(condition){
            const SPY_EVENT = spyOnEvent('.menu-icon-link', 'click')
            $('.menu-icon-link').click();
            expect( 'click' ).toHaveBeenTriggeredOn( '.menu-icon-link' );
            expect( SPY_EVENT ).toHaveBeenTriggered();
            const IS_MENU_HIDDEN = $('body').hasClass('menu-hidden');
            expect(IS_MENU_HIDDEN).toBe(condition);
        }

        /* ensure that menu element is hidden by default */
        it('is hidden by default', function(){
            const IS_MENU_HIDDEN_BY_DEFAULT = $('body').hasClass('menu-hidden');
            expect(IS_MENU_HIDDEN_BY_DEFAULT).toBe(true);
        });

        /* ensure that the menu element toggles correctly */
        it('toggles menu on click', function(){
            //Show menu on first click
            hideMenuOnClick(false);
            //Hide menu on second click
            hideMenuOnClick(true);
        });

    });

    /* This test suite checks if feed by default has atleast one entry or not */
    describe('Initial Entries', function(){

        //Load feed data before running the test
        beforeEach(function(done) {
            loadFeed(0, function(){
                done();
            })
        });

        /* ensure that there is atleast one entry */
		it('has atleast one entry',function() {
            const FEED_ITEM_LENGTH = $('.feed').find('.entry').length;
            expect(FEED_ITEM_LENGTH).not.toBeLessThan(1);
		});

    });

    /* This suite check if feed data changes or not on new feed selection */
    describe('New Feed Selection', function(){
        let BEFORE_TEXT, AFTER_TEXT;

        /* First load default feed then new feed and store
        the respective first item text of the feed for comparison */
        beforeEach(function(done) {
           loadFeed(0, function(){
                BEFORE_TEXT = $('.feed').find('.entry')[0].innerText; //old feed first item text
                loadFeed(1, function(){
                    done();
                    AFTER_TEXT = $('.feed').find('.entry')[0].innerText; //new feed first item text
                });
           });
        });

        /* ensure feed data changes on new feed selection */
        it('content changes',function() {
            expect(BEFORE_TEXT !== AFTER_TEXT).toBe(true);
        });

    });
}());
