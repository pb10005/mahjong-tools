type MahjongRule = {
    roundUpMangan: boolean;
    kazoeAvailable: boolean;
};

export const agariMap: { [key: string]: string } = {
    'pt': 'ピンフツモ',
    'pr': 'ピンフロン',
    'ctt': '七対子ツモ',
    'ctr': '七対子ロン',
    'ot': 'その他ツモ',
    'omr': 'その他門前ロン', 
    'onr': 'その他鳴きロン', 
    'ymt': '役満ツモ', 
    'ymr': '役満ロン', 
};

export const getScore = (isOya: boolean, isTsumo: boolean, fu: number, yaku: number, isYakuman: number, options?: MahjongRule) => {
    if (isOya) {
        // 親の場合
        if (isTsumo) {
            // ツモの場合
            if(isYakuman) return '16000オール';
            if (yaku === 1) {
                if (fu === 30) return '500オール';
                if (fu === 40) return '700オール';
                if (fu === 50) return '800オール';
                if (fu === 60) return '1000オール';
                if (fu === 70) return '1200オール';
                if (fu === 80) return '1300オール';
                if (fu === 90) return '1500オール';
                if (fu === 100) return '1600オール';
                if (fu === 110) return '1800オール';
            }
            if (yaku === 2) {
                if (fu === 20) return '700オール';
                if (fu === 25) return '800オール';
                if (fu === 30) return '1000オール';
                if (fu === 40) return '1300オール';
                if (fu === 50) return '1600オール';
                if (fu === 60) return '2000オール';
                if (fu === 70) return '2300オール';
                if (fu === 80) return '2600オール';
                if (fu === 90) return '2900オール';
                if (fu === 100) return '3200オール';
                if (fu === 110) return '3600オール';
            }
            if (yaku === 3) {
                if (fu === 20) return '1300オール';
                if (fu === 25) return '1600オール';
                if (fu === 30) return '2000オール';
                if (fu === 40) return '2600オール';
                if (fu === 50) return '3200オール';
                if (fu === 60) {
                    if(options?.roundUpMangan) return '4000オール';
                    else return '3900オール';
                }
                if (fu >= 70) return '4000オール';
            }
            if (yaku === 4) {
                if (fu === 20) return '2600オール';
                if (fu === 25) return '3200オール';
                if (fu === 30) {
                    if(options?.roundUpMangan) return '4000オール';
                    else return '3900オール';
                }
                if (fu >= 40) return '4000オール';
            }
            if (yaku === 5) return '4000オール';
            if (yaku >= 6 && yaku <= 7) return '6000オール';
            if (yaku >= 8 && yaku <= 10) return '8000オール';
            if (yaku >= 11 && yaku <= 12) return '12000オール';
            if (yaku >= 13)  {
                if(options?.kazoeAvailable) return '16000オール';
                else return '12000オール';
            }
        } else {
            // ロンの場合
            if(isYakuman) return '48000';
            if (yaku === 1) {
                if (fu === 30) return '1500';
                if (fu === 40) return '2000';
                if (fu === 50) return '2400';
                if (fu === 60) return '2900';
                if (fu === 70) return '3400';
                if (fu === 80) return '3900';
                if (fu === 90) return '4400';
                if (fu === 100) return '4800';
                if (fu === 110) return '5300';
            }
            if (yaku === 2) {
                if (fu === 25) return '2400';
                if (fu === 30) return '2900';
                if (fu === 40) return '3900';
                if (fu === 50) return '4800';
                if (fu === 60) return '5800';
                if (fu === 70) return '6800';
                if (fu === 80) return '7700';
                if (fu === 90) return '8700';
                if (fu === 100) return '9600';
                if (fu === 110) return '10600';
            }
            if (yaku === 3) {
                if (fu === 25) return '4800';
                if (fu === 30) return '5800';
                if (fu === 40) return '7700';
                if (fu === 50) return '9600';
                if (fu === 60) {
                    if(options?.roundUpMangan) return '12000';
                    else return '11600';
                }
                if (fu >= 70) return '12000';
            }
            if (yaku === 4) {
                if (fu === 25) return '9600';
                if (fu === 30) {
                    if(options?.roundUpMangan) return '12000';
                    else return '11600';
                }
                if (fu >= 40) return '12000';
            }
            if (yaku === 5) return '12000';
            if (yaku >= 6 && yaku <= 7) return '18000';
            if (yaku >= 8 && yaku <= 10) return '24000';
            if (yaku >= 11 && yaku <= 12) return '36000';
            if (yaku >= 13) {
                if(options?.kazoeAvailable) return '48000';
                else return '36000';
            }
        }
    } else {
        // 子の場合
        if (isTsumo) {
            if(isYakuman) return '800-16000';
            if (yaku === 1) {
                if (fu === 30) return '300-500';
                if (fu === 40) return '400-700';
                if (fu === 50) return '400-800';
                if (fu === 60) return '500-1000';
                if (fu === 70) return '600-1200';
                if (fu === 80) return '700-1300';
                if (fu === 90) return '800-1500';
                if (fu === 100) return '800-1600';
                if (fu === 110) return '900-1800';
            }
            if (yaku === 2) {
                if (fu === 20) return '400-700';
                if (fu === 25) return '400-800';
                if (fu === 30) return '500-1000';
                if (fu === 40) return '700-1300';
                if (fu === 50) return '800-1600';
                if (fu === 60) return '1000-2000';
                if (fu === 70) return '1200-2300';
                if (fu === 80) return '1300-2600';
                if (fu === 90) return '1500-2900';
                if (fu === 100) return '1600-3200';
                if (fu === 110) return '1800-3600';
            }
            if (yaku === 3) {
                if (fu === 20) return '700-1300';
                if (fu === 25) return '800-1600';
                if (fu === 30) return '1000-2000';
                if (fu === 40) return '1300-2600';
                if (fu === 50) return '1600-3200';
                if (fu === 60) {
                    if(options?.roundUpMangan) return '2000-4000';
                    else return '2000-3900';
                }
                if (fu >= 70) return '2000-4000';
            }
            if (yaku === 4) {
                if (fu === 20) return '1300-2600';
                if (fu === 25) return '1600-3200';
                if (fu === 30)  {
                    if(options?.roundUpMangan) return '2000-4000';
                    else return '2000-3900';
                }
                if (fu >= 40) return '2000-4000';
            }
            if (yaku === 5) return '2000-4000';
            if (yaku >= 6 && yaku <= 7) return '3000-6000';
            if (yaku >= 8 && yaku <= 10) return '4000-8000';
            if (yaku >= 11 && yaku <= 12) return '6000-12000';
            if (yaku >= 13) { 
                if(options?.kazoeAvailable) return '8000-16000';
                else return '6000-12000';
            }
        } else {
            // ロンの場合
            if(isYakuman) return '32000';
            if (yaku === 1) {
                if (fu === 30) return '1000';
                if (fu === 40) return '1300';
                if (fu === 50) return '1600';
                if (fu === 60) return '2000';
                if (fu === 70) return '2300';
                if (fu === 80) return '2600';
                if (fu === 90) return '2900';
                if (fu === 100) return '3200';
                if (fu === 110) return '3600';
            }
            if (yaku === 2) {
                if (fu === 25) return '1600';
                if (fu === 30) return '2000';
                if (fu === 40) return '2600';
                if (fu === 50) return '3200';
                if (fu === 60) return '3900';
                if (fu === 70) return '4500';
                if (fu === 80) return '5200';
                if (fu === 90) return '5800';
                if (fu === 100) return '6400';
                if (fu === 110) return '7100';
            }
            if (yaku === 3) {
                if (fu === 25) return '3200';
                if (fu === 30) return '3900';
                if (fu === 40) return '5200';
                if (fu === 50) return '6400';
                if (fu === 60) {
                    if(options?.roundUpMangan) return '8000';
                    else return '7700';
                }
                if (fu >= 70) return '8000';
            }
            if (yaku === 4) {
                if (fu === 25) return '6400';
                if (fu === 30) {
                    if(options?.roundUpMangan) return '8000';   
                    else return '7700';
                }
                if (fu >= 40) return '8000';
            }
            if (yaku === 5) return '8000';
            if (yaku >= 6 && yaku <= 7) return '12000';
            if (yaku >= 8 && yaku <= 10) return '16000';
            if (yaku >= 11 && yaku <= 12) return '24000';
            if (yaku >= 13) {
                if(options?.kazoeAvailable) return '32000';
                else return '24000';
            }
        }
    }
};