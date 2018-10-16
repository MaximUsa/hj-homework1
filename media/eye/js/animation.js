'use strict';

const eyeBall = document.querySelector('.big-book__eye');
const eyePupil = document.querySelector('.big-book__pupil');

window.addEventListener('mousemove', event => {

    const bodyBCR = document.body.getBoundingClientRect();


    const windowSize = {
        width: window.innerWidth,
        height: document.documentElement.clientHeight
    };


    const eyeBallBCR = eyeBall.getBoundingClientRect();
    const eyeBallSize = {
        width: eyeBallBCR.width,
        height: eyeBallBCR.height
    };


    const eyeBallCenterPosition = {
        x: (eyeBallBCR.left - bodyBCR.left) + (eyeBallSize.width / 2),
        y: (eyeBallBCR.top - bodyBCR.top) + (eyeBallSize.height / 2)
    };


    const mousePos = {
        x: event.pageX,
        y: event.pageY
    };

    const pupilPositionX = function() {

        const positionXOffsetRange = {

            from: -eyeBallCenterPosition.x,
            to: windowSize.width - eyeBallCenterPosition.x
        };


        const differenceX = mousePos.x - eyeBallCenterPosition.x;


        const positionXPercent = (function() {

            if (differenceX < 0) {
                return (-(differenceX / positionXOffsetRange.from) * 100);

            } else if (differenceX > 0) {
                return ((differenceX / positionXOffsetRange.to) * 100);
            }

            return 0;
        })();

        return positionXPercent;
    };

    const pupilPositionY = function() {

        const differenceY = mousePos.y - eyeBallCenterPosition.y;
        const positionYPercent = (function() {
            if (differenceY < 0) {
                const eyeBallOffsetFromWindowTop = (eyeBallBCR.top + (eyeBallSize.height / 2));
                return ((differenceY / eyeBallOffsetFromWindowTop) * 100);

            } else if (differenceY > 0) {

                const eyeBallOffsetFromWindowBottom = windowSize.height - (eyeBallBCR.bottom - (eyeBallSize.height / 2));
                return ((differenceY / eyeBallOffsetFromWindowBottom) * 100);
            }

            return 0;
        })();

        return positionYPercent;
    };

    const pupilPositionXPercent = pupilPositionX();
    const pupilPositionYPercent = pupilPositionY();

    const pupilSize = function() {

        const pointX = pupilPositionXPercent * Math.sign(pupilPositionXPercent);
        const pointY = pupilPositionYPercent * Math.sign(pupilPositionYPercent);
        const calculatedSize = ((100 - ((pointX + pointY) / 2)) * 0.03);

        return calculatedSize >= 1 ? calculatedSize : 1;
    };

    eyePupil.style.setProperty('--pupil-x', `${pupilPositionXPercent * 0.3}px`);
    eyePupil.style.setProperty('--pupil-y', `${pupilPositionYPercent * 0.3}px`);
    eyePupil.style.setProperty('--pupil-size', pupilSize());
});