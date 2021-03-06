import './styles/App.scss';

import {Application} from 'pixi.js';
import EventEmitter from 'eventemitter3';
import {Sound} from './modules/sound';
import {Resource} from './modules/resource';
import {resize} from './modules/screen';
import {select} from '@kayac/utils';

const {defineProperties, assign, freeze} = Object;

export function App() {
    const app =
        new Application({
            resolution: devicePixelRatio,
            antialias: true,
        });

    //  Resource
    const resource = Resource(app);
    //  Sound
    const sound = Sound(app);

    //  Scenes
    const scenes = {};

    //  Modules
    defineProperties(app, {
        resource: {
            get: () => resource,
        },
        sound: {
            get: () => sound,
        },
        scenes: {
            get: () => scenes,
        },
    });

    //  EventCore
    const eventCore = new EventEmitter();

    //  Functions
    assign(app, {
        //  EventEmitter ==================
        on(event, listener) {
            eventCore.on(event, listener);
        },
        once(event, listener) {
            eventCore.once(event, listener);
        },
        off(event, listener) {
            eventCore.off(event, listener);
        },
        emit(event, ...args) {
            eventCore.emit(event, ...args);
        },
        //  Screen Management ==================
        resize() {
            resize(app);
            app.emit('resize');
        },
    });

    //  Event Binding
    global.addEventListener('resize', app.resize);
    global.addEventListener('orientationchange', app.resize);

    //  Init Canvas
    select('#preload').remove();
    select('#app').prepend(app.view);
    app.resize();

    return freeze(app);
}
