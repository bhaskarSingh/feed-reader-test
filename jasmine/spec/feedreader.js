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


        /* check if allFeeds object urls are defined/empty or not */
        it('has defined urls', function(){
            checkIfAllFeedsObjectsAreDefined('url');
        });

        /* check if allFeeds object name are defined/empty or not */
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

        /* check if the menu element is hidden by default or not */
        it('is hidden by default', function(){
            const isMenuHiddenDefault = $('body').hasClass('menu-hidden');
            expect(isMenuHiddenDefault).toBe(true);
        });

        /* check if the menu element is shown on first click or not */
        it('show on first click', function(){
            hideMenuOnClick(false);
        });

        /* check if the menu element hides on second click or not */
        it('hide on second click', function(){
            hideMenuOnClick(true);
        });

    });

    /* TODO: Write a new test suite named "Initial Entries" */

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

    /* TODO: Write a new test suite named "New Feed Selection" */

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
}());
