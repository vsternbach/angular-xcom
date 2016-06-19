/**
 * Created by voland on 4/2/16.
 */

interface IIntercomMessage {
    topic: string;
    timestamp: string;
    service?: string;
    method?: string;
    arguments?: any[];
}

interface IIntercomService {
    publish(message: IIntercomMessage): void;
    subscribe(message: string, callback?: any): void;
}

export class Intercom implements ng.IServiceProvider {
    private _instance: string;
    private _target: string;
    private _subjects: any;

    constructor() {
        this._subjects = {};
        this.$get.$inject = ['$injector'];
        window.addEventListener('message', (m) => {
            let message = m.data;
            this._applyCallbacks(message);
        });
        console.log('Intercom initialized');
    }

    // Configuration function
    public config(instanceId: string, targetWindow: string) {
        this._instance = instanceId;
        this._target = targetWindow;
        console.log(`LogzioIntercom instance ${instanceId} is configured with target ${targetWindow}`);
    }


    private _getTargetWindow(): ng.IWindowService {
        return this._target === 'parent' ? window.parent : window.frames[this._target].contentWindow;
    }
    
    private _applyCallbacks(message: IIntercomMessage) {
        if (message.topic) {
            this._validateTopic(message.topic);
            this._subjects[message.topic].forEach((callback: Function) => callback(message));
        }
    }

    private _validateTopic(topic: string) {
        if (!this._subjects[topic]) {
            this._subjects[topic] = [];
        }
    }
    
    // Provider's factory function
    public $get($injector: ng.auto.IInjectorService): IIntercomService {
        function defaultCallback(message: IIntercomMessage) {
            let service = $injector.get(message.service);
            let method = service[message.method];
            method.apply(service, message.arguments);
        }
        return {
            publish: (message) => {
                this._getTargetWindow().postMessage(message, '*');
                this._applyCallbacks(message);
            },
            subscribe: (messageTopic, callback) => {
                this._validateTopic(messageTopic);
                this._subjects[messageTopic].push(callback || defaultCallback);
                console.log(this._instance, this._subjects);
            }
        };
    }
}

export default angular.module('ngIntercom', []).provider('Intercom', Intercom);