type CurrentTopPlayer = {
    name: string;
    finishable: boolean;
};

export const calculateCurrentTop = (points: { [key: string]: number }, continuePoint: number) => {
    let tmpTop = 'east';
    let point = points['east'];
    for (const key in points) {
        if (points[tmpTop] < points[key]) {
            tmpTop = key;
            point = points[key];
        }
    }
    return {
        name: tmpTop,
        finishable: point >= continuePoint
    } as CurrentTopPlayer;
};

export const simulateTsumo = (
    isOya: boolean,
    points: { [key: string]: number },
    selfName: string,
    homba: number,
    oyaPoint: number,
    koPoint: number,
    sharedPoint: number,
    continuePoint: number
) => {
    let tmpPoints = Object.assign({}, points);

    if (isOya) {
        for (const key in tmpPoints) {
            if (key === selfName)
                tmpPoints[key] = points[key] + 3 * koPoint + 100 * homba + sharedPoint;
            else tmpPoints[key] = points[key] - koPoint - 100 * homba;
        }
    } else {
        for (const key in tmpPoints) {
            if (key === selfName)
                tmpPoints[key] = points[key] + oyaPoint + 2 * koPoint + 100 * homba + sharedPoint;
            else if (key === 'east') tmpPoints[key] = points[key] - oyaPoint - 100 * homba;
            else tmpPoints[key] = points[key] - koPoint - 100 * homba;
        }
    }
    const currentTop = calculateCurrentTop(tmpPoints, continuePoint);
    if (currentTop.finishable) return currentTop.name;
    else return "none";
};

export const calculateTsumoCondition = (
    isOya: boolean,
    selfName: string,
    points: { [key: string]: number },
    continuePoint: number,
    sharedPoint: number,
    homba: number,
) => {
    if (isOya) {
        if (simulateTsumo(isOya, points, selfName, homba, 0, 500, sharedPoint, continuePoint) === selfName)
            return 'アガリ(500オール)';
        if (simulateTsumo(isOya, points, selfName, homba, 0, 700, sharedPoint, continuePoint) === selfName)
            return 'ピンフツモ(700オール)';
        if (simulateTsumo(isOya, points, selfName, homba, 0, 1000, sharedPoint, continuePoint) === selfName)
            return '2飜(1000オール)';
        if (simulateTsumo(isOya, points, selfName, homba, 0, 2000, sharedPoint, continuePoint) === selfName)
            return '3飜(2000オール)';
        if (simulateTsumo(isOya, points, selfName, homba, 0, 2600, sharedPoint, continuePoint) === selfName)
            return 'ピンフ4飜(2600オール)';
        if (simulateTsumo(isOya, points, selfName, homba, 0, 4000, sharedPoint, continuePoint) === selfName)
            return '満貫(4000オール)';
        if (simulateTsumo(isOya, points, selfName, homba, 0, 6000, sharedPoint, continuePoint) === selfName)
            return '跳満(6000オール)';
        if (simulateTsumo(isOya, points, selfName, homba, 0, 8000, sharedPoint, continuePoint) === selfName)
            return '倍満(8000オール)';
        if (simulateTsumo(isOya, points, selfName, homba, 0, 12000, sharedPoint, continuePoint) === selfName)
            return '三倍満(12000オール)';
        if (simulateTsumo(isOya, points, selfName, homba, 0, 16000, sharedPoint, continuePoint) === selfName)
            return '役満(16000オール)';

        return '目無し';
    } else {
        if (simulateTsumo(isOya, points, selfName, homba, 500, 300, sharedPoint, continuePoint) === selfName)
            return 'アガリ(300-500)';
        if (simulateTsumo(isOya, points, selfName, homba, 700, 400, sharedPoint, continuePoint) === selfName)
            return 'ピンフツモ(400-700)';
        if (simulateTsumo(isOya, points, selfName, homba, 1000, 500, sharedPoint, continuePoint) === selfName)
            return '2飜(500-1000)';
        if (simulateTsumo(isOya, points, selfName, homba, 2000, 1000, sharedPoint, continuePoint) === selfName)
            return '3飜(1000-2000)';
        if (simulateTsumo(isOya, points, selfName, homba, 2600, 1300, sharedPoint, continuePoint) === selfName)
            return 'ピンフ4飜(1300-2600)';
        if (simulateTsumo(isOya, points, selfName, homba, 4000, 2000, sharedPoint, continuePoint) === selfName)
            return '満貫(2000-4000)';
        if (simulateTsumo(isOya, points, selfName, homba, 6000, 3000, sharedPoint, continuePoint) === selfName)
            return '跳満(3000-6000)';
        if (simulateTsumo(isOya, points, selfName, homba, 8000, 4000, sharedPoint, continuePoint) === selfName)
            return '倍満(4000-8000)';
        if (simulateTsumo(isOya, points, selfName, homba, 12000, 6000, sharedPoint, continuePoint) === selfName)
            return '三倍満(6000-12000)';
        if (simulateTsumo(isOya, points, selfName, homba, 16000, 8000, sharedPoint, continuePoint) === selfName)
            return '役満(8000-16000)';
        return '目無し';
    }
};
