import {move} from '../../../effect';
import {NavButton} from './NavButton';

export function Nav(it) {
    const background = Background(it.getChildByName('background'));

    const buttons =
        it.children
            .filter(({name}) => ['back', 'exchange', 'setting', 'information', 'home'].includes(name))
            .map(NavButton);

    const [
        backButton,
        exchangeButton,
        settingButton,
        infoButton,
        homeButton,
    ] = buttons;

    backButton.on('click', () => it.emit('close'));

    exchangeButton.on('click', () => it.emit('open', 'exchange'));
    settingButton.on('click', () => it.emit('open', 'setting'));
    infoButton.on('click', () => it.emit('open', 'information'));

    homeButton.on('click', () => app.alert.leave());

    let isOpen = false;

    async function open() {
        app.sound.play('spin');

        await background.open();

        await Promise.all(
            buttons.map((btn) => btn.open())
        );

        isOpen = true;
    }

    async function close() {
        app.sound.play('spin');

        await Promise.all(
            buttons.map((btn) => btn.close())
        );

        await background.close();

        isOpen = false;
    }

    function Background(it) {
        const config = {
            targets: it,
            duration: 500,
            easing: 'easeInOutExpo',
        };

        async function moveTo(options) {
            await move({
                ...(config),
                ...(options),
            }).finished;
        }

        const width = it.width;

        async function open() {
            if (it.interactive) return;

            await moveTo({x: `-= ${width}`});

            it.interactive = true;
        }

        async function close() {
            if (!it.interactive) return;

            await moveTo({x: `+= ${width}`});
            it.interactive = false;
        }

        return Object.assign(it, {open, close});
    }

    return Object.assign(it, {open, close, isOpen});
}