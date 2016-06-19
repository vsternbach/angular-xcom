/**
 * Created by voland on 4/2/16.
 */
import 'angular';
import ngIntercom from './../src/intercom.service';
console.log(ngIntercom);
const ngApp = 'app';
// configure the main module
angular
    .module(ngApp, [
        ngIntercom.name
    ])
    .config(appConfig)
    .run(appRun);

function appConfig (IntercomProvider) {
    IntercomProvider.config('testFrame');
}
appConfig.$inject = ['IntercomProvider'];

function appRun (Intercom) {
    Intercom.publish();
    Intercom.subscribe();
}
appRun.$inject = ['Intercom'];

// bootstrap angular
angular.element(document).ready(() => {
    angular.bootstrap(document, [ngApp]);
});
