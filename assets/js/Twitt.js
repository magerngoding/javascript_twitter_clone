class Twitt {

    constructor() {
        this._twitts = null;
    }

    getTwitts() {
        if (this._twitts === null) {
            try {
                const storedTwitts = localStorage.getItem('twitts');
                this._twitts = storedTwitts ? JSON.parse(storedTwitts) : [];
            }
            catch (error) {
                return this._twitts = [];
            }
        }
        return this._twitts;
    }

    saveTwitt(twittData) {

        // melakukan prosess validasi
        const { twittContent, twittFeeling } = twittData;

        // typeof pendeteksi tipe data
        if (typeof twittContent !== 'string' || twittContent.trim() === '') {
            return {
                success: false,
                error: 'Twitt Content is missing'
            }
        }

        if (twittContent.length > 150) {
            return {
                success: false,
                error: 'Content is too long'
            }
        }

        if (typeof twittFeeling !== 'string' || twittFeeling.trim() === '') {
            return {
                success: false,
                error: 'Feeling is missing'
            }
        }

        const newTwitt = {
            id: Date.now(),
            isActive: true,
            ...twittData
        }

        const twitts = this.getTwitts();
        twitts.push(newTwitt);

        try {
            localStorage.setItem('twitts', JSON.stringify(twitts));
            return {
                success: true,
            }
        }
        catch (error) {
            return {
                success: false,
            }
        }
    }
}