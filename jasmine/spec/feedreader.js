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
            const isAllFeedDefined = allFeeds.filter((item) => {
                return !(item[key]); // return array if key item is either empty or undefined/null
            });
            expect(isAllFeedDefined).toEqual([]);
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
            const spyEvent = spyOnEvent('.menu-icon-link', 'click')
            $('.menu-icon-link').click();
            expect( 'click' ).toHaveBeenTriggeredOn( '.menu-icon-link' );
            expect( spyEvent ).toHaveBeenTriggered();
            const isMenuHidden = $('body').hasClass('menu-hidden');
            expect(isMenuHidden).toBe(condition);
        }

        /* ensure that menu element is hidden by default */
        it('is hidden by default', function(){
            const isMenuHiddenDefault = $('body').hasClass('menu-hidden');
            expect(isMenuHiddenDefault).toBe(true);
        });

        /* ensure that the menu element is shown on first click */
        it('show on first click', function(){
            hideMenuOnClick(false);
        });

        /* ensure that the menu element hides on second click */
        it('hide on second click', function(){
            hideMenuOnClick(true);
        });

    });

    /* This test suite checks if feed by default has atleast one entry or not */
    describe('Initial Entries', function(){
        /* Set default timeout interval to 11 seconds
        from 5 seconds so that that feed data can load successfully */
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 11000;

        beforeEach(function(done) {
            // Wait for 10 seconds for feed to load data
            setTimeout(function(){
			    done();
            }, 10000);
        });

        /* ensure that there is atleast one entry */
		it('has atleast one entry',function(done) {
            const feedItemLength = $('.feed').find('.entry').length;
            console.log(feedItemLength);
            expect(feedItemLength).not.toBeLessThan(1);
			done();
		});

    });

    /* TODO: Write a new test suite named "New Feed Selection" */

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
}());
