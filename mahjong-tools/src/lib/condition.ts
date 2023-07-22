type CurrentTopPlayer = {
	name: string;
	finishable: boolean;
};

export const calculateCurrentTop = (points: { [key: string]: number }, continuePoint: number) => {
	let tmpTop = 'south';
	let point = points['south'];
	for (const key of ['south', 'west', 'north', 'east']) {
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
			if (key === selfName) tmpPoints[key] = points[key] + 3 * koPoint + 100 * homba + sharedPoint;
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
	else return 'none';
};

export const simulateRon = (
	points: { [key: string]: number },
	selfName: string,
	opponentName: string,
	homba: number,
	point: number,
	sharedPoint: number,
	continuePoint: number
) => {
	let tmpPoints = Object.assign({}, points);
	tmpPoints[selfName] = points[selfName] + point + 300 * homba + sharedPoint;
	tmpPoints[opponentName] = points[opponentName] - point - 300 * homba - sharedPoint;

	const currentTop = calculateCurrentTop(tmpPoints, continuePoint);
	if (currentTop.finishable) return currentTop.name;
	else return 'none';
};

export const calculateTsumoCondition = (
	isOya: boolean,
	selfName: string,
	points: { [key: string]: number },
	continuePoint: number,
	sharedPoint: number,
	homba: number
) => {
	if (isOya) {
		// 親の場合
		if (
			simulateTsumo(isOya, points, selfName, homba, 0, 500, sharedPoint, continuePoint) === selfName
		)
			return 'アガリ(500オール)';
		if (
			simulateTsumo(isOya, points, selfName, homba, 0, 700, sharedPoint, continuePoint) === selfName
		)
			return 'ピンフツモ(700オール)';
		if (
			simulateTsumo(isOya, points, selfName, homba, 0, 1000, sharedPoint, continuePoint) ===
			selfName
		)
			return '2飜(1000オール)';
		if (
			simulateTsumo(isOya, points, selfName, homba, 0, 1600, sharedPoint, continuePoint) ===
			selfName
		)
			return '七対子ツモ(1600オール)';
		if (
			simulateTsumo(isOya, points, selfName, homba, 0, 2000, sharedPoint, continuePoint) ===
			selfName
		)
			return '3飜(2000オール)';
		if (
			simulateTsumo(isOya, points, selfName, homba, 0, 2600, sharedPoint, continuePoint) ===
			selfName
		)
			return 'ピンフ4飜(2600オール)';
		if (
			simulateTsumo(isOya, points, selfName, homba, 0, 3200, sharedPoint, continuePoint) ===
			selfName
		)
			return '七対子4飜(3200オール)';
		if (
			simulateTsumo(isOya, points, selfName, homba, 0, 4000, sharedPoint, continuePoint) ===
			selfName
		)
			return '満貫(4000オール)';
		if (
			simulateTsumo(isOya, points, selfName, homba, 0, 6000, sharedPoint, continuePoint) ===
			selfName
		)
			return '跳満(6000オール)';
		if (
			simulateTsumo(isOya, points, selfName, homba, 0, 8000, sharedPoint, continuePoint) ===
			selfName
		)
			return '倍満(8000オール)';
		if (
			simulateTsumo(isOya, points, selfName, homba, 0, 12000, sharedPoint, continuePoint) ===
			selfName
		)
			return '三倍満(12000オール)';
		if (
			simulateTsumo(isOya, points, selfName, homba, 0, 16000, sharedPoint, continuePoint) ===
			selfName
		)
			return '役満(16000オール)';

		return '目無し';
	} else {
		// 子の場合
		if (
			simulateTsumo(isOya, points, selfName, homba, 500, 300, sharedPoint, continuePoint) ===
			selfName
		)
			return 'アガリ(300-500)';
		if (
			simulateTsumo(isOya, points, selfName, homba, 700, 400, sharedPoint, continuePoint) ===
			selfName
		)
			return 'ピンフツモ(400-700)';
		if (
			simulateTsumo(isOya, points, selfName, homba, 1000, 500, sharedPoint, continuePoint) ===
			selfName
		)
			return '2飜(500-1000)';
		if (
			simulateTsumo(isOya, points, selfName, homba, 1600, 800, sharedPoint, continuePoint) ===
			selfName
		)
			return '七対子ツモ(800-1600)';
		if (
			simulateTsumo(isOya, points, selfName, homba, 2000, 1000, sharedPoint, continuePoint) ===
			selfName
		)
			return '3飜(1000-2000)';
		if (
			simulateTsumo(isOya, points, selfName, homba, 2600, 1300, sharedPoint, continuePoint) ===
			selfName
		)
			return 'ピンフ4飜(1300-2600)';
		if (
			simulateTsumo(isOya, points, selfName, homba, 3200, 1600, sharedPoint, continuePoint) ===
			selfName
		)
			return '七対子4飜(1600-3200)';
		if (
			simulateTsumo(isOya, points, selfName, homba, 4000, 2000, sharedPoint, continuePoint) ===
			selfName
		)
			return '満貫(2000-4000)';
		if (
			simulateTsumo(isOya, points, selfName, homba, 6000, 3000, sharedPoint, continuePoint) ===
			selfName
		)
			return '跳満(3000-6000)';
		if (
			simulateTsumo(isOya, points, selfName, homba, 8000, 4000, sharedPoint, continuePoint) ===
			selfName
		)
			return '倍満(4000-8000)';
		if (
			simulateTsumo(isOya, points, selfName, homba, 12000, 6000, sharedPoint, continuePoint) ===
			selfName
		)
			return '三倍満(6000-12000)';
		if (
			simulateTsumo(isOya, points, selfName, homba, 16000, 8000, sharedPoint, continuePoint) ===
			selfName
		)
			return '役満(8000-16000)';
		return '目無し';
	}
};

export const calculateRonCondition = (
	isOya: boolean,
	selfName: string,
	points: { [key: string]: number },
	continuePoint: number,
	sharedPoint: number,
	homba: number
) => {
	const currentTop = calculateCurrentTop(points, continuePoint);

	const opponentName = currentTop.name === selfName ? '' : currentTop.name;
	// 現在のトップから直撃をとる
	if (isOya) {
		// 親の場合
		if (
			simulateRon(points, selfName, opponentName, homba, 1500, sharedPoint, continuePoint) ===
			selfName
		)
			return '30符1飜(1500点)';
		if (
			simulateRon(points, selfName, opponentName, homba, 2000, sharedPoint, continuePoint) ===
			selfName
		)
			return '40符1飜(2000点)';
		if (
			simulateRon(points, selfName, opponentName, homba, 2400, sharedPoint, continuePoint) ===
			selfName
		)
			return '七対子2飜(2400点)';
		if (
			simulateRon(points, selfName, opponentName, homba, 2900, sharedPoint, continuePoint) ===
			selfName
		)
			return '30符2飜(2900点)';
		if (
			simulateRon(points, selfName, opponentName, homba, 3900, sharedPoint, continuePoint) ===
			selfName
		)
			return '40符2飜(3900点)';
		if (
			simulateRon(points, selfName, opponentName, homba, 4800, sharedPoint, continuePoint) ===
			selfName
		)
			return '七対子3飜(4800点)';
		if (
			simulateRon(points, selfName, opponentName, homba, 5800, sharedPoint, continuePoint) ===
			selfName
		)
			return '30符3飜(5800点)';
		if (
			simulateRon(points, selfName, opponentName, homba, 7700, sharedPoint, continuePoint) ===
			selfName
		)
			return '40符3飜(7700点)';
		if (
			simulateRon(points, selfName, opponentName, homba, 9600, sharedPoint, continuePoint) ===
			selfName
		)
			return '七対子4飜(9600点)';
		if (
			simulateRon(points, selfName, opponentName, homba, 12000, sharedPoint, continuePoint) ===
			selfName
		)
			return '満貫(12000点)';
		if (
			simulateRon(points, selfName, opponentName, homba, 18000, sharedPoint, continuePoint) ===
			selfName
		)
			return '跳満(18000点)';
		if (
			simulateRon(points, selfName, opponentName, homba, 24000, sharedPoint, continuePoint) ===
			selfName
		)
			return '倍満(24000点)';
		if (
			simulateRon(points, selfName, opponentName, homba, 36000, sharedPoint, continuePoint) ===
			selfName
		)
			return '三倍満(36000点)';
		if (
			simulateRon(points, selfName, opponentName, homba, 48000, sharedPoint, continuePoint) ===
			selfName
		)
			return '役満(48000点)';
		return '目無し';
	} else {
		// 子の場合
		if (
			simulateRon(points, selfName, opponentName, homba, 1000, sharedPoint, continuePoint) ===
			selfName
		)
			return '30符1飜(1000点)';
		if (
			simulateRon(points, selfName, opponentName, homba, 1300, sharedPoint, continuePoint) ===
			selfName
		)
			return '40符1飜(1300点)';
		if (
			simulateRon(points, selfName, opponentName, homba, 1600, sharedPoint, continuePoint) ===
			selfName
		)
			return '七対子2飜(1600点)';
		if (
			simulateRon(points, selfName, opponentName, homba, 2000, sharedPoint, continuePoint) ===
			selfName
		)
			return '30符2飜(2000点)';
		if (
			simulateRon(points, selfName, opponentName, homba, 2600, sharedPoint, continuePoint) ===
			selfName
		)
			return '40符2飜(2600点)';
		if (
			simulateRon(points, selfName, opponentName, homba, 3200, sharedPoint, continuePoint) ===
			selfName
		)
			return '七対子3飜(3200点)';
		if (
			simulateRon(points, selfName, opponentName, homba, 3900, sharedPoint, continuePoint) ===
			selfName
		)
			return '30符3飜(3900点)';
		if (
			simulateRon(points, selfName, opponentName, homba, 5200, sharedPoint, continuePoint) ===
			selfName
		)
			return '40符3飜(5200点)';
		if (
			simulateRon(points, selfName, opponentName, homba, 6400, sharedPoint, continuePoint) ===
			selfName
		)
			return '七対子4飜(6400点)';
		if (
			simulateRon(points, selfName, opponentName, homba, 8000, sharedPoint, continuePoint) ===
			selfName
		)
			return '満貫(8000点)';
		if (
			simulateRon(points, selfName, opponentName, homba, 12000, sharedPoint, continuePoint) ===
			selfName
		)
			return '跳満(12000点)';
		if (
			simulateRon(points, selfName, opponentName, homba, 16000, sharedPoint, continuePoint) ===
			selfName
		)
			return '倍満(16000点)';
		if (
			simulateRon(points, selfName, opponentName, homba, 24000, sharedPoint, continuePoint) ===
			selfName
		)
			return '三倍満(24000点)';
		if (
			simulateRon(points, selfName, opponentName, homba, 32000, sharedPoint, continuePoint) ===
			selfName
		)
			return '役満(32000点)';
		return '目無し';
	}
};
