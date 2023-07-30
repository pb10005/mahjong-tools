enum PaiType {
    Man = 1,
    Pin = 2,
    Sou = 3,
    Ji = 4,
    Default = -1
};

import man1 from '$lib/images/pai-images/man1-66-90-s-emb.png';
import man2 from '$lib/images/pai-images/man2-66-90-s-emb.png';
import man3 from '$lib/images/pai-images/man3-66-90-s-emb.png';
import man4 from '$lib/images/pai-images/man4-66-90-s-emb.png';
import man5 from '$lib/images/pai-images/man5-66-90-s-emb.png';
import man5Red from '$lib/images/pai-images/aka3-66-90-s-emb.png';
import man6 from '$lib/images/pai-images/man6-66-90-s-emb.png';
import man7 from '$lib/images/pai-images/man7-66-90-s-emb.png';
import man8 from '$lib/images/pai-images/man8-66-90-s-emb.png';
import man9 from '$lib/images/pai-images/man9-66-90-s-emb.png';

import pin1 from '$lib/images/pai-images/pin1-66-90-s-emb.png';
import pin2 from '$lib/images/pai-images/pin2-66-90-s-emb.png';
import pin3 from '$lib/images/pai-images/pin3-66-90-s-emb.png';
import pin4 from '$lib/images/pai-images/pin4-66-90-s-emb.png';
import pin5 from '$lib/images/pai-images/pin5-66-90-s-emb.png';
import pin5Red from '$lib/images/pai-images/aka1-66-90-s-emb.png';
import pin6 from '$lib/images/pai-images/pin6-66-90-s-emb.png';
import pin7 from '$lib/images/pai-images/pin7-66-90-s-emb.png';
import pin8 from '$lib/images/pai-images/pin8-66-90-s-emb.png';
import pin9 from '$lib/images/pai-images/pin9-66-90-s-emb.png';

import sou1 from '$lib/images/pai-images/sou1-66-90-s-emb.png';
import sou2 from '$lib/images/pai-images/sou2-66-90-s-emb.png';
import sou3 from '$lib/images/pai-images/sou3-66-90-s-emb.png';
import sou4 from '$lib/images/pai-images/sou4-66-90-s-emb.png';
import sou5 from '$lib/images/pai-images/sou5-66-90-s-emb.png';
import sou5Red from '$lib/images/pai-images/aka2-66-90-s-emb.png';
import sou6 from '$lib/images/pai-images/sou6-66-90-s-emb.png';
import sou7 from '$lib/images/pai-images/sou7-66-90-s-emb.png';
import sou8 from '$lib/images/pai-images/sou8-66-90-s-emb.png';
import sou9 from '$lib/images/pai-images/sou9-66-90-s-emb.png';

import ji1 from '$lib/images/pai-images/ji1-66-90-s-emb.png';
import ji2 from '$lib/images/pai-images/ji2-66-90-s-emb.png';
import ji3 from '$lib/images/pai-images/ji3-66-90-s-emb.png';
import ji4 from '$lib/images/pai-images/ji4-66-90-s-emb.png';
import ji5 from '$lib/images/pai-images/ji6-66-90-s-emb.png';
import ji6 from '$lib/images/pai-images/ji5-66-90-s-emb.png';
import ji7 from '$lib/images/pai-images/ji7-66-90-s-emb.png';

const paiMap: { [key: string]: string } = {
    '1m': man1,
    '2m': man2,
    '3m': man3,
    '4m': man4,
    '5m': man5,
    '6m': man6,
    '7m': man7,
    '8m': man8,
    '9m': man9,
    '1p': pin1,
    '2p': pin2,
    '3p': pin3,
    '4p': pin4,
    '5p': pin5,
    '6p': pin6,
    '7p': pin7,
    '8p': pin8,
    '9p': pin9,
    '1s': sou1,
    '2s': sou2,
    '3s': sou3,
    '4s': sou4,
    '5s': sou5,
    '6s': sou6,
    '7s': sou7,
    '8s': sou8,
    '9s': sou9,
    '1z': ji1,
    '2z': ji2,
    '3z': ji3,
    '4z': ji4,
    '5z': ji5,
    '6z': ji6,
    '7z': ji7,
}

export class PaizuBuilder {
    private hand: string[] = [];
    constructor(handString: string) {
        let tmp: string[] = handString.split('');
        let pais: string[] = [];

        while (tmp.length > 0) {
            const chr = tmp.shift();
            if (!chr) break;

            if (chr === 'm') {
                this.hand = [...this.hand, ...pais.map(p => `${p}m`)];
                pais = [];
            } else if (chr === 'p') {
                this.hand = [...this.hand, ...pais.map(p => `${p}p`)];
                pais = [];
            } else if (chr === 's') {
                this.hand = [...this.hand, ...pais.map(p => `${p}s`)];
                pais = [];
            } else if (chr === 'z') {
                this.hand = [...this.hand, ...pais.map(p => `${p}z`)];
                pais = [];
            } else {
                pais.push(chr);
            }
        }
    }

    *build() {
        for (const pai of this.hand) {
            yield paiMap[pai];
        }
    }
};
